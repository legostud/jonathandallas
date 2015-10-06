//Code requires Util.js file;

var HELPERS = {
	download_link : function (opts) {
		var options = $.extend({
			self : null,
			follow : false
		}, opts);
		_self = options.self;
		options.url = _self.attr('href');
		if (!_self.hasClass('init')) {
			var host = window.location.host;

			cookies = UTILS.cookie.mget(['i', 'm', 'a']);
			var pid = cookies.a ? cookies.a : 'V101';
			var mid = cookies.m ? cookies.m : '';
			var imid = cookies.i ? cookies.i : '';

			// If existing set IMID using value found in options.url
                        var regex_imid = /IMID=(\w+)/i;
                        if (regex_imid.test(options.url)) {
                            imid = options.url.match(regex_imid)[1];
                        }
			
			options.url = 'http://' + host + '/downloads/' + pid + '/Everest Casino.exe' + '?IMID=' + imid + '&MID=' + mid;
			
			_self.attr('href', options.url).addClass('init');
		}
		if (options.follow) {
			window.location.href = options.url;
		}
	},
	bonusReceived : function() {
	   cookies = UTILS.cookie.mget(['screenname', 'bonuscode']);
	   $('.screen-name').each( function () { 
	       //get the value of the screen name or redirect to invalid page
	       var screen_name = cookies.screenname ? cookies.screenname : window.location = "invalid";
	       $(this).html(screen_name);
	   });
	   $('.bonus-code').each( function () { 
	       //get the value of the bonus code or redirect to invalid page
	       var bonus_code = cookies.bonuscode ? cookies.bonuscode : window.location = "invalid";
	       $(this).html(bonus_code);
	   });
	}	
};

var EVC =
{
    Site: {}
};

EVC.Site = function() {
    this.initialize();
};

EVC.Site.prototype = {
    initialize: function() {
    
    
    },
    run: function() {
        var app = this;
        
        //Wait for the DOM to load
        $(function(){ 
            // Change any download href values
            $('.download-link a, a.download-link').each(function () {
        		HELPERS.download_link({self : $(this)});
        	});

            $('.download-link a, a.download-link').click(function () {
                var event_category = 'Downloads';
                var event_action   = 'Download .EXE';
                var event_label    = String($(this).attr('class').split(' ').slice(-2, -1)); 
	        
                if ( event_label != 'download-link' && event_label != 'internal-link' && event_label != 'external-link' ) { 
		    _gaq.push(['_trackEvent', event_category, event_action, event_label]);
                } else {
                    _gaq.push(['_trackEvent', event_category, event_action]);
		}
            });
     
            // Add Affiliate/Advertiser ID to Google Analytics
            cookies = UTILS.cookie.mget(['a']);
            if (cookies.a) {
                _gaq.push(['_setCustomVar', 1, 'Advertiser ID', cookies.a, 1 ]);
            }
          
            // Update the copyright date with the correct year
            $(".current-year").text((new Date).getFullYear());
            
            //Update variables on the Bonus Recieved page or redirect them
            //HELPERS.bonusReceived();
            
            //Increment the Jackpot total
            $('#h-jackpot .currency-number').numberCounter();
            
        });
    }
    //remove last comma or IE 8 will through an error

};

var siteJs = new EVC.Site;
siteJs.run();
