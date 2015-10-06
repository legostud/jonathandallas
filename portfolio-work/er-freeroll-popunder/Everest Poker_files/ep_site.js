// We'll put all our local JS in the EP namespace to reduce possible namespace conflicts
var EP = {
    // server is just a meta tag for the server this file is used on
    server: 'everestpoker.com',
    _initialized: null,
    
    init: function () {
        this.download_link = null;
        
        this.set_promotional_links();
        this.set_download_links();
        
        
    
        
        /*
           To generalize for using multiple floating layers, use classes instead
           of ids and add handling to each class member found. This would require
           selecting the close and move handle as children of the current object.
        */
        // We no longer use the draggable floating div on the home page
        // this section can be removed any time after initial release
        //jq('#floating_layer').draggable({
        //    handle: '#floating_layer_handle',
        //    opacity: 0.7
        //});
        //jq('#close_floating_layer').click(function () {
        //    jq('#floating_layer').hide();
        //});
        
        this._initialized = true;
    },
    
    // elapsed time until expires, in minutes
    set_cookie: function (name, value, elapsed) {
        var expires = "";
        if (elapsed) {
            var date = new Date();
            date.setTime(date.getTime()+(elapsed*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expires + "; path=/";
    },
    
    /*
     name optional - if provided return the value of named cookie or null,
     otherwise return hash of all cookies
    */
    read_cookies: function (name) {
        var cookies = document.cookie.split(/; */);
        var cookie_hash = {};
        
        for(var i=0;i < cookies.length;i++) {
            var cookie = cookies[i];
            var c_pair = cookie.match(/^(\w+)=(.*)/);
            
            // IE doesn't always include the = when there is no value
            if (! c_pair) {
                c_pair = cookie.match(/^(\w+)/);
                if (! c_pair) { continue; }
            }
            // if we get here and c_pair doesn't have at least two elements
            // then we have failed to usefully parse this cookie
            if (c_pair.length < 2) { continue; }
            
            // If the cookies value is false here it is undefined, set it to
            // an empty string, which is generally more useful (urls etc)
            var val = c_pair[2] ? c_pair[2] : '';
            
            if (name) {
                if (c_pair[1] == name) { return val; }
            }
            else { cookie_hash[c_pair[1]] = val; }
        }
        
        if (name) { return null }
        else { return cookie_hash }
    },
    
    erase_cookie: function (name) {
        createCookie(name,"",-1);
    },
    
    
    /*
      This section enables special handling of various classes of links.
    */
    
    set_promotional_links: function () {
        jq("a.promo_link").click(function (event) {
            var cookies = EP.read_cookies();
            
            var a = cookies.a ? cookies.a : 'V101';
            var m = cookies.m ? cookies.m : '';
            
            // construct URL
            var url = jq(this)[0].href;
            if (url.match(/\?/)) {
                url = url + '&adv=' + a + '&mid=' + m;
            }
            else {
                url = url + '?adv=' + a + '&mid=' + m;
            }
            
            // open window
            var promoWindow = window.open(url, 'promo_link');
            promoWindow.focus();
            
            return false;
        });
    },
    
    set_download_links: function () {
        jq("a.download_link").each(function (iter, link) {
            
            if (! EP.download_link) {
                var host = window.location.host;
                var cookies = EP.read_cookies();
                
                // cookie(s)?
                var a = cookies.a ? cookies.a : 'V101';
                var m = cookies.m ? cookies.m : '';
                var i = cookies.i ? cookies.i : '';
                
                // construct URL
                url = 'http://' + host + '/downloads/' + a + '/Everest Poker.exe'
                    + '?IMID=' + i + '&MID=' + m;
                
                EP.download_link = url;
            }
            
            link.href = EP.download_link;
        });
    },
    
    
    /*
      This section sets up functions generally called from JS specific to a page
    */
    
    // EP.gvpop('http://localhost');
    gvpop: function (url, type, width, height) {
        if (url === undefined) {
            return null;
        }
        type   = type   ?  type  : 'under';
        width  = width  ?  width : 720;
        height = height ? height : 300;
        // console.log(type, width, height);
                        
        var cookies = EP.read_cookies();
        if (cookies.ep_pt) { return false; }
        
        var a = cookies.a ? cookies.a : 'V101';
        var m = cookies.m ? cookies.m : '';
        
        var full_url = url + '&adv=' + a + '&mid=' + m;
        // console.log(full_url);
        var window_args = 'directories=0,height=' + height + ',width=' + width
            + ',hotkeys=0,location=0,menubar=0,resizable=0,scrollbars=0,toolbar=0';
        
        var popWindow = window.open(full_url, '_blank', window_args);
        if (popWindow) {
            if (type == 'under') {
                // console.log('poping under');
                popWindow.blur();
                // console.log(res);
                window.focus(); // should be this window
            }
            else {
                // console.log('popup')
                popWindow.focus();
            }
            
            EP.set_cookie('ep_pt', 'true', 60);
            
            return popWindow;
        }
        else { return null; }
    }
}

jq(function(){
    EP.init();
    resetArjel();
});

function resetArjel() { 
    jq('#arjel-topbanner').prependTo( jq('body') );
    jq('#visual-portal-wrapper').css("margin-top","20px");
    jq('#site-header').css("margin-top","25px");
}

function addVerticalSpacing() {
    //Check to make sure the optimost span id="opmodule_body" does not exist
    if (!jq("#opmodule_body").length) {
    	var viewportHeight;
    	// Figure out the height of the browser window itself
    	if (typeof window.innerWidth != 'undefined') {
    		// (mozilla/netscape/opera/IE7)
    		viewportHeight = window.innerHeight
    	} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
    		// (IE6 in standards compliant mode)
    		viewportHeight = document.documentElement.clientHeight
    	} else {
    		// (older IE)
    		viewportHeight = document.getElementsByTagName('body')[0].clientHeight
    	}
    	// Figure out the height of the container holder the pages content
    	var containerHeight;
    	containerHeight = document.getElementById('visual-portal-wrapper').offsetHeight;
    	/* Uncomment the following "alert" line for debugging only*/
    	//alert ("Viewport: " + viewportHeight + " and Container: " + containerHeight);
    	// Compare the heights and calculate added spacing if needed
    	if (viewportHeight > containerHeight) {
    		var addedSpace;
    		addedSpace = (viewportHeight - containerHeight);
    		document.getElementById('clear-space-after-content').style.height = addedSpace + "px";
    	}
    }
}
function bonusReceived() {
	//get a list of cookies and values for everestpoker
	var cookies = EP.read_cookies();
	
	jq(".screen-name").each( function() {
		//get the value screen name cookie or redirect to the invalid page
		var screen_name = cookies.screenname ? cookies.screenname : window.location = "invalid";
		jq(this).html(screen_name);

	});
	jq(".bonus-code").each( function () {
		//get the value of the bonus-code cookie or redirect to the invalid page
		var bonus_code = cookies.bonuscode ? cookies.bonuscode : window.location = "invalid";
		jq(this).html(bonus_code);		
	});
}