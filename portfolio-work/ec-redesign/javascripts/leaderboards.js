/**
 * Leaderboard: an object representing one leaderboard on the page. More than
 * one can be instantiated (i.e. a category's weekly and monthly leaderboards).
 * 
 * @param {String} parentId: The ID of the parent DIV
 * @param {String} url: The 'base' URL of the web service providing the data
 *  (e.g. http://cms.everestgaming.com:6644/leaderboard/ec/)
 * @param {Integer} maxRows: The maximum number of rows to load. Should be
 *  equal to or greater than the number of displayed rows. A value of 0 or
 *  null will load all rows.
 * @param {Boolean} paginate: If true (default), a paginated leaderboard is
 *  displayed showing every rank. If false, only a single page is displayed,
 *  limited to the number of rows in the table.
 * @param {Boolean} sortable: If true (default), clicking a column header
 *  will sort the table by that column.
 * @param {Boolean} filterable: If true, a 'filter' field appears in the 
 *  table.
 * @param {URI} language: The URL to a language file to use in the display.
 * @param {String} period: The initial period to display. Defaults to latest.
 * @param {Boolean} plainData: If true, the JSON call returns an array of 
 *  normal arrays instead of literal arrays, reducing bandwidth. Use only with
 *  very large sets of data; small sets can take longer with this option. 
 * @param {Boolean} lazyLoad: If true, the leaderboard is initialized but not
 *  populated; a separate call to Leaderboard.update() is required.
 */
function Leaderboard(parentId, url, maxRows, paginate, sortable, filterable, 
                    language, period, plainData, lazyLoad) {	

    this.parent = $(parentId);
    
    // Bail if there's no such ID
    if (this.parent.length === 0)
       return;

    paginate = !(paginate === false);
    this.sortable = !(sortable === false);
    this.plainData = plainData === true;
    
    // Add 'sort by img alt' functions to DataTables
    if (this.sortable) {
	var getAlt = function(a){
	    var x = a.match(/alt=["|'](.*?)["|']/);
	    return x == null ? '' : x[1].toLowerCase();
	};
	
	jQuery.fn.dataTableExt.oSort['alt-string-asc'] = function(a, b){
	    var x = getAlt(a), y = getAlt(b);
	    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	
	jQuery.fn.dataTableExt.oSort['alt-string-desc'] = function(a, b){
            var x = getAlt(a), y = getAlt(b);
	    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	};
    }

    this.url = url;
    if (this.url[this.url.length-1] != '/')
	this.url += '/';
    
    this.maxRows = maxRows === null ? 0 : maxRows;
    
    this.parent = this.parent.first();
    this.thead = this.parent.find("thead").first();
    if (this.thead.length === 0) { 
        this.parent.find("th").parent().wrap("<thead />");
        this.thead = this.parent.find("thead").first().detach();
        this.thead.prependTo(this.parent.find("table").first());    
    }
    this.table = this.parent.find("table").first();
    this.tbody = this.table.find("tbody");
    this.numRows = this.tbody.find("tr").length;
    this.numRows = this.numRows > 1 ? this.numRows : 25;
    
    // Get actual column order from the table in the template.
    // Also generate blank 'filler' for rounding out last page.
    var _this = this;
    this.colnames = [];
    this.filler = "";
    this.parent.find("th").each(function(x) {
        _this.colnames.push($(this).attr('class'));
        _this.filler+="<td class='"+_this.colnames[x]+"'>&nbsp;</td>";
    });
	
    // Language data. See http://datatables.net/usage/i18n
    if (typeof(language) == 'string') 
	language = {"sUrl": language};
    else {
	if (language == null) 
	    language = {
		"sZeroRecords": "No leaderboard data available, try again later"
	    };
        
	if (language["oPaginate"] == undefined)
	    language["oPaginate"] = {
                "sFirst": "&lt;&lt;",
                "sPrevious": "&lt;",
                "sNext": "&gt;",
                "sLast": "&gt;&gt;"
            };
    }

    var settings = {
        "bProcessing": false,
        "bPaginate": paginate,
        "sPaginationType": "full_numbers",
        "bFilter": filterable === true,
        "bLengthChange": false,
        "bSort": this.sortable,
        "bInfo": false,
        "oLanguage": language,
        "aoColumnDefs": _this._getCols()
    };
	
    // No pagination, so set the length of the page to the content.
    if (!paginate) {
        if (this.maxRows > 0)
            this.numRows = this.maxRows;
        else
            this.maxRows = this.numRows;
    }
    else
	// Add callback to pad out pages with fewer rows
	settings['fnDrawCallback'] = function(x) {
            for (var i = _this.tbody.find('tr').length; i < _this.numRows; i++) {
                var eo = i % 2 ? 'even' : 'odd';
                _this.tbody.append("<tr class='filler "+eo+"'>" + _this.filler + "</tr>");
            }
        };

    settings["iDisplayLength"] = this.numRows;
    this.table = this.table.dataTable(settings);
    
    $.fn.dataTableExt.oPagination.iFullNumbersShowPages = 10;
    
    this.table.fnClearTable();
    
    // Find 'Period' and 'Last Updated' elements
    this.period = this.parent.find("span.period").first();
    this.lastUpdated = this.parent.find("span.lastUpdated").first();
    
    // Find history-related elements
    var histEl = this.parent.find(".history");
    this.historyList = histEl.find("select.historyList").first();
    this.next = histEl.find("div.next").first();
    this.prev = histEl.find("div.previous").first();
    
    // Add the history <select> element if needed
    // (workaround for Plone stripping it out)
    if (this.historyList.length == 0 && histEl.length > 0) {
        histEl.find(".historyList").append('<select class="historyList"><option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option></select>');
	this.historyList = histEl.find("select.historyList").first();
    }
    
    // History event handlers
    this.next.click(function() {
	_this.setHistorySelection(_this.historyIdx-1);
    });
    
    this.prev.click(function() {
        _this.setHistorySelection(_this.historyIdx+1);
    });
    
    this.historyList.change(function() {
        _this.updateBoard(this.options[this.selectedIndex].value);
    });
   
    this.history = [];
    this.firstPeriod = period;
	
    // Initialize the board (if not lazy loading)
    this.initialized = false;
    if (!(lazyLoad === true))
    	this.init();
};


/**
 * Do the actual Leaderboard initialization, used with 'lazy loading'.
 * 
 */
Leaderboard.prototype.init = function() {
    if (this.initialized === true)
	return false;
    this.initialized = true;
    this.updateHistory();
    this.historyIdx = 0;
    this.lastPeriod = '';
    this.updateBoard(this.firstPeriod);
    return true;
};

/**
 * "Private" method for generating the column renderers. The first row of the 
 * table is used as a template; each cell's class attribute is duplicated, and 
 * if the cell contains an image, the URL/path and extension are applied to the 
 * cell's value (for flags based on country, etc.).
 */
Leaderboard.prototype._getCols = function() {
    var renderers = [];
    var _this = this;
    var firstrow = this.table.find("td").first().parent();
    firstrow.find("td").each(function(x) {
	var renderer = {
	    'sClass': _this.colnames[x],
	    'aTargets': [x]
	};
	var img = $(this).find("img").first();
	if (img.length > 0) {
	    var src = img.attr('src');
            var urlEnd = src.substr(0,src.lastIndexOf("/")+1);
            var extStart = src.substr(src.lastIndexOf("."));
	    renderer["fnRender"] = function(obj) {
		if (obj.aData[x] == null)
		    return "";
		var d = obj.aData[x].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    		if (d.length == 2)
                    return "<img src='" + urlEnd + d + extStart + "' alt='" + d + "'/>";
		return "";
            };
            if (_this.sortable)
                renderer["sType"] = "alt-string";
	}
	renderers.push(renderer);
	$(this).html("");
    });
    return renderers;
};


/**
 * Populate a leaderboard display
 * 
 * @param {Object} data The leaderboard JSON data
 */
Leaderboard.prototype.fillTable = function(data) {
    this.table.fnClearTable();
    var ents = [];
    if (this.plainData) 
	ents = data['entries'];
    else {
	for (var i = 0; i < data['entries'].length; i++) {
	    var entry = data['entries'][i];
	    var entAr = [];
	    for (var j = 0; j < this.colnames.length; j++) 
		entAr.push(entry[this.colnames[j]]);
	    ents.push(entAr);
	}
    }
    
    this.table.fnAddData(ents);
    
    this.lastUpdated.html(data['modified']);
    this.period.html(data['start'] + " - " + data['end']);
};


/**
 * Construct the history dropdown list.
 * 
 * @param {Array} data: The history as an array of two-item arrays. data[x][0]
 *  is the display name, data[x][1] is the dropdown option's value.
 */
Leaderboard.prototype.makeHistoryDropdown = function (data) {
//	if (this.historyList.length === 0)
    if (data.length === 0)
	return;
    data.reverse();
    this.history = []; //data[0];
    this.historyList.html("");
    for (var i = 0; i < data.length; i++) {
	this.history.push(data[i][1]);
	this.historyList.append("<option value='" + data[i][1] + "'>" + 
		                data[i][0]+" - " + data[i][1]+ "</option>");
    }
};


/**
 * Change the month displayed in the history dropdown, which will cause
 * the leaderboard to update.
 * 
 * @param {int} idx - The index into the history list of the date to display.
 */
Leaderboard.prototype.setHistorySelection = function (idx) {
    if (this.historyList.length === 0)
	return;
    if (idx >= 0 && idx < this.history.length) {
        this.historyList.val(this.history[idx]);
	this.historyIdx = idx;
	this.updateBoard(this.history[idx]);
    }
};


/**
 * Refresh leaderboard content. 
 * 
 * @param {String} period: The ending date of a leaderboard period. If none
 *  is provided the latest is retrieved.
 */
Leaderboard.prototype.updateBoard = function(period){
    if (period == this.lastPeriod) 
	return;
	
    var _this = this;
    var thisUrl = this.url + (period == null ? 'current' : period);
    
    thisUrl += "?callback=?";
    
    if (this.plainData)
	thisUrl += "&columns=" + this.colnames.join('+');
    
    if (this.maxRows)
        thisUrl += "&last=" + this.maxRows;
		
    $.getJSON(thisUrl, function(data){
      _this.fillTable(data);
    });
    
    try {
	// IE fix
	this.historyIdx = this.history.indexOf(period);
    } 
    catch (e) {
	if (!(typeof this.historyIdx) == 'number')
    	    this.historyIdx = 0;
    }
	
    if (this.historyIdx <= 0) 
        this.historyIdx = 0;
    else if (this.historyIdx >= this.history.length)
        this.historyIdx = this.history.length - 1;

    if (this.history.length < 2) {
	this.next.hide();
	this.prev.hide();
    }
    else {
	if (this.historyIdx === 0) 
	    this.next.hide();
	else 
	    this.next.show();
	
	if (this.historyIdx == this.history.length - 1) 
	    this.prev.hide();
	else 
	    this.prev.show();
    }     
    
    this.lastPeriod = period;
};


/**
 * The external call to build the history dropdown list.
 */
Leaderboard.prototype.updateHistory = function () {
    var _this = this;
    $.getJSON(this.url + "periods/?callback=?", function(data) {
        _this.makeHistoryDropdown(data);
    });
};


/**
 * Version number.
 */
Leaderboard.prototype.vers = "1.31";
