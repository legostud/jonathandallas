// We'll put all our local JS in the EP namespace to reduce possible namespace conflicts
var EP = {
    // server is just a meta tag for the server this file is used on
    server: 'dallasdesigns.org',
    _initialized: null,
    
    init: function () {
 		//alert('initialize');
        this.find_cookies();
		this.download_link = null;
        //this.set_download_links();
        this._initialized = true;
    },
    find_cookies: function () {
 		alert('find cookies');
		var partner_id_tag = "adv"; //PID
		var marketing_id_tag = "mid"; //MID
		var internal_marketing_id_tag = "imid"; //IMID
		//look for variables in the current URL
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		var clean = /[\W_]/g;
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			//look for the partner ID
			if (pair[0] == partner_id_tag) {
	            EP.set_cookie('a', pair[1] , 100000);
			}
			if (pair[0] == marketing_id_tag) {
	            EP.set_cookie('m', pair[1] , 100000);
				alert('mid' + pair[1]);
			}
			if (pair[0] == internal_marketing_id_tag) {
	            EP.set_cookie('i', pair[1] , 100000);
            }
		}
	},
	// elapsed time until expires, in minutes
    set_cookie: function (name, value, elapsed) {
 		//alert('set cookies: ' + value);
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
		//alert('read cookies: ' + name);
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
    }
}

$(function(){
    EP.init();
});


function goto_site(domain) {
	var cookies = EP.read_cookies();
	
	// cookie(s)?
	var a = cookies.a ? cookies.a : '';
	var m = cookies.m ? cookies.m : '';
	var i = cookies.i ? cookies.i : '';
		
    url = domain + '?adv=' + a + '&IMID=' + i + '&MID=' + m;
	//alert(url);
	
	window.location = url;

}


