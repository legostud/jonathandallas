

function Counter(loadingText, decimalSym, separatorSym, currencyPos, divPrefix) {
    this.loadingText      = loadingText;
    this.decimalSymbol    = decimalSym;
    this.separatorSymbol  = separatorSym;
    this.currencyPosition = currencyPos;
    this.parentPrefix     = divPrefix || "div_"; // prefix of div containg jackpot amount

    this.jackpots         = {};     // jackpot data
    this.timeoutID        = null;   // for canceling timeout
    this.running          = false;  // is the counter running?
    this.minInterval      = 300;    // in milliseconds
    this.maxInterval      = 700;    // in milliseconds
    this.numGroups        = 4;      // update jackpots in groups
    this.curGroupNum      = 1;      // which group is getting updated this timeout
    this.decimalPlaces    = 2;      // decimal places in displayed jackpot amount
    this.currency         = 'DOLLAR';
    this.currencySymbol   = {
        "POUND"  :  unescape('%A3'),
        "DOLLAR" : '$',
        "EURO"   : unescape('%u20AC'),
        "YEN"    : unescape('%A5')
    };
}

// starts counter creation process
function initializeJP(rssURL) {
    try      { loadXMLDoc(rssURL);  }
    catch(e) {	alert("XHR failed"); }
    counter.start();
}

function timer() {
    counter.updateJackpots();
    counter.timeoutId = window.setTimeout(timer, counter.generateInterval());
}

Counter.prototype = {
    start: function() {
        if (this.running) return true;

        this.running = true;
        this.timeoutId = window.setTimeout(timer, this.generateInterval());
    },

    generateInterval: function() {
        return Math.floor(Math.random() * (this.maxInterval - this.minInterval + 1) +
                          this.minInterval);
    },

    stop: function() {
        if (!this.running) return;

        this.running = false;
        window.clearTimeout(this.timeoutId);
        this.timeoutId = 0;
    },

    // given a list of jackpot ids, hide any others we already know about
    onlyDisplay: function() {
        var include = {};
        for (var x=0; x<arguments.length; x++) {
            include[arguments[x]] = true;
        }
        for (var id in this.jackpots) {
            if (include[id]) next;
            this.jackpots[id].display = false;
        }
    },

    displayAll: function() {
        for (var id in this.jackpots) {
            this.jackpots[id].display = true;
        }
    },

    updateJackpots: function() {
        var x=0;
        for (var id in this.jackpots) {
            var jp = this.jackpots[id];

            // display every x jackpots
            x++;
            if (x > this.numGroups) x = 1;
            if (x != this.curGroupNum) {
                jp.lastUpdated = new Date();
                continue;
            }
            if (!jp.display) continue; // jackpots can be hidden

            var now = new Date();
	    jp.amount += jp.growth * ((now - jp.lastUpdated) / 1000);
            var node = document.getElementById(jp.id) || alert("Error getting node " + jp.id);;
            node.innerHTML = this.displayValue(jp.amount);
            jp.lastUpdated = now;
        }
        this.curGroupNum++;
        if (this.curGroupNum > this.numGroups) this.curGroupNum = 1;
    },

    displayValue: function(amount) {
        //limit to two decimal places and convert to String
        var s = this.formatSeparators((Math.round(amount * 100) / 100).toFixed(this.decimalPlaces),
                                      '.', this.decimalSymbol,
                                      (this.separatorSymbol == " " ? "&nbsp;" : this.separatorSymbol));

        var currency = this.currencySymbol[this.currency];
        return this.currencyPosition == "L" ?
                currency + "&nbsp;" + s :
                s + "&nbsp;" + currency;
    },

    // formatSeparators
    // The value to be formatted shouldn't have any formatting already.
    //
    // s - A number or number as a string
    // inD - Input decimal (string value). Example: '.'
    // outD - Output decimal (string value). Example: '.'
    // sep - Output separator (string value). Example: ','
    formatSeparators: function(s, inD, outD, sep) {
        s += '';
        var dpos = s.indexOf(inD);
        var sEnd = '';
        if (dpos != -1) {
            sEnd = outD + s.substring(dpos + 1, s.length);
            s = s.substring(0, dpos);
        }
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(s)) {
            s = s.replace(rgx, '$1' + sep + '$2');
        }
        return s + sEnd;
    },

    addJackpot: function(id, type, amount, growth) {
        // if no parent, the jackpot can't be displayed so skip it
        var parent = document.getElementById(this.parentPrefix + id);
        if (!parent) {
            return false;
        }

        var jp = { id    : id,     parent : parent,
                   type  : type,   amount : amount,
                   growth: growth, display: true,
                   lastUpdated: new Date() };
        this.jackpots[id] = jp;

        // don't overwrite an existing node;
        if (document.getElementById(id)) return;

        var valueNode = document.createElement("span");
        valueNode.id        = id;
        valueNode.className = "jpc";
        valueNode.innerHTML = this.loadingText;
        parent.appendChild(valueNode);
    },

    display: function() {
        
    }


};

// global request and XML document objects
var req;
var isIE = window.ActiveXObject ? true : false;

// retrieve XML document (reusable generic function);
// parameter is URL string (relative or complete) to
// an .xml file whose Content-Type is a valid XML
// type, such as text/xml; XML source must be from
// same domain as HTML file
function loadXMLDoc(url) {
    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = processReqChange;
        req.open("GET", url, true);
        req.send(null);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = processReqChange;
            req.open("GET", url, true);
            req.send();
        }
    }
}

// handle onreadystatechange event of req object
function processReqChange() {
    // only if req shows "loaded"
    if (req.readyState != 4) return;
    // only if "OK"
    if (req.status == 200) { readJackpots(req); return; }

    alert("There was a problem retrieving the XML data:\n" + req.statusText);
}

// callback when XHR is successful
function readJackpots(req) {
    var items = req.responseXML.getElementsByTagName("item");
    for (var i = 0; i < items.length; i++) {
        var id     = getElementTextNS("", "title", items[i], 0);
        var amount = parseFloat(getElementTextNS("gv", "amount", items[i], 0)) || 17500;
        var type   = getElementTextNS("gv", "type", items[i], 0) || "progressive";
        var growth = (type == "progressive") ? parseFloat(getElementTextNS("gv", "growth", items[i], 0)) : 0;

        counter.addJackpot(id, type, amount, growth);
    }
}

// retrieve text of an XML document element, including
// elements using namespaces
function getElementTextNS(prefix, local, parentElem, index) {
    var result = "";
    if (prefix && isIE) {
    // IE/Windows way of handling namespaces
        result = parentElem.getElementsByTagName(prefix + ":" + local)[index];
    } else {
        // the namespace versions of this method 
        // (getElementsByTagNameNS()) operate
        // differently in Safari and Mozilla, but both
        // return value with just local name, provided 
        // there aren't conflicts with non-namespace element
        // names
		result = parentElem.getElementsByTagName(local)[index];
		//Firefox 3 uses the following method
		if(!result && prefix) {
		   result = parentElem.getElementsByTagName(prefix + ":" + local)[index];
		}
    }

    if (result) {
        // get text, accounting for possible
        // whitespace (carriage return) text nodes
        var buffer = "";
        for (var x=0; x<result.childNodes.length; x++) {
            buffer += result.childNodes[x].nodeValue;
        }
        return buffer;
    }

    return "n/a";
}
