////////
/*
Combined file of main.js, onload.js, cookie.js and utilities.js
STAPLES Object Wrapper, bind with Onload, Cookie and Utilities name spaces respectively
including global main.js functions 
*/
///////////////////////////////////////
/// onload.js merging starts here ///
///////////////////////////////////////
(function(window, document, $, undefined) {
    'use strict';

    // Call function right away passing STAPLES or empty object if not yet initialized
    var STAPLES = (function(STAPLES) {

        STAPLES.Onload = (function() {
            
            // Declare Variables
			var onLoadPrimaryFunctions = new Array(),
				onLoadSecondaryFunctions = new Array(),
				DOMready = false;
				
            // Init variables
            function init() {
				$(document).ready(function(){
					DOMready = true;
					loadFunctions();
				});	
            }

			// add a function to the queue
			function addLoadEvent(func,defer) {    
				//if the func parameter isn't a function exit
				if( typeof(func) !== 'function'){
					return false;
				}
				//if the DOM ready signal has already occured, run the function
				if(DOMready){
					func && func();
					return;
				}
				//if the defer value is missing, assume it's not defered
				if( typeof(defer) === 'undefined'){
					defer = false;
				}
				
				//Add the window.load event to the first primary call if it doesn't exist
				//Not sure why this is required - Jonathan Dallas 10/31/2012
				if (onLoadPrimaryFunctions.length == 0) {
					if ( typeof(window.onload) !== 'function') {
						onLoadPrimaryFunctions[0] = window.onload;
						window.onload = null;
					}
				}
				
				//if the function is defered add it to the secondary queue otherwise add it to the primary queue.
				if(defer){
					onLoadSecondaryFunctions[onLoadSecondaryFunctions.length] = func;
				}
				else {
					onLoadPrimaryFunctions[onLoadPrimaryFunctions.length] = func;
				}
			}
			
			//load the stored functions
			function loadFunctions() {
				//load the primary functions first
				for (var func in onLoadPrimaryFunctions) {
					if(onLoadPrimaryFunctions[func]) {
						onLoadPrimaryFunctions[func]();
					}
				}
				//then load all of the secondary functions
				for (var func in onLoadSecondaryFunctions) {
					if(onLoadSecondaryFunctions[func]) {
						onLoadSecondaryFunctions[func]();
					}
				}
			}

            //return functions and variables that you want accessible outside
            return {
                init : init,
				addLoadEvent : addLoadEvent
            };		
        })();

        return STAPLES;

    }(window.STAPLES || {}));
    
    //update the Global STAPLES name space with new functionality and variables
    window.STAPLES = STAPLES;
    
    // Run as soon as this file loads
    STAPLES.Onload.init();

}(window, document, jQuery));		
///////////////////////////////////////
/// cookies.js merging starts here ///
///////////////////////////////////////
(function(window, document, $, undefined) {
    'use strict';

    // Call function right away passing STAPLES or empty object if not yet initialized
    var STAPLES = (function(STAPLES) {

        STAPLES.Cookies = (function() {
            
            // Declare Variables
            var cookies,
                cookiepage = '/sbd/content/help/cookieerror.html',
                thispage = document.location.toString(),
                redirectpage = '';

            // Init variables
            function init() {
                //check if the browser allows cookies
				detectCookieProblems();
				//find all cookies
                cookies = getCookies();
            }
            function updateCookies() {
            	cookies = getCookies();
            }

            function detectCookieProblems() {
                if (!cookiesEnabled() && thispage.indexOf(cookiepage) < 0) {
                    document.cookie='testcookie=1; path=/; ';
                    if(!document.cookie){
                      redirectpage=cookiepage;
                    }
                }

                // detect if the browser will play nice, if not, send them where they need to go /////////////////////
                if ((!document.getElementById) && cookies['UnsupportedBrowser'] != 'True' && redirectpage.length <=0  && thispage.indexOf(cookiepage) < 0 ) {
                        redirectpage = "/sbd/cre/resources/browserupgrade/index.html";
                }
                else if ((!document.getElementById) && cookies['UnsupportedBrowser'] != 'True' && thispage.indexOf(cookiepage) < 0 && redirectpage.length > 0 ) {
                        redirectpage = "/sbd/cre/resources/browserupgrade/cookies.html";
                }
                    
                // do the redirect
                if (redirectpage.length > 0) {
                    document.location=redirectpage;
                }
            }

            // unescape text /////////////////
            function cookiesMyUnescape (str) {
                str = "" + str;
                while (true) {
                    var i = str . indexOf ('+');
                    if (i < 0) break;
                    str = str.substring(0, i) + '%20' + str.substring(i + 1, str.length);
                }
                return unescape (str);
            }

            function cookiesEnabled(){
                var cookieEnabled = false;
                    
                // If the browser can use navigator.cookieEnabled
                if (typeof navigator.cookieEnabled != "undefined"){
                    // check if cookies enabled using navigator.cookieEnabled
                    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
                }else{
                    // Fallback to the old way which is to check document.cookie
                        // if document.cookie contains cookies
                    document.cookie='testcookie=1; path=/; ';
                    if (document.cookie && thispage.indexOf(cookiepage) < 0) {
                        // change cookies enabled to true
                        cookieEnabled = true;
                    }
                }
                return (cookieEnabled);
            }

            // get all cookies
            function getCookies() {
                var args = new Object();
                var mycookie = document.cookie;
                var mypattern = /([^=\sx]+)\s*=\s*([^;]+)\s*/;
                var result;
                while (result = mycookie.match(mypattern)) {
                    args[result[1]] = cookiesMyUnescape(result[2]);
                    mycookie = mycookie.substr(result.index+result[0].length);
                }
                return args;
            }

            // Retrieves the value of a cookie already existing on a user's machine.
            function getCookie(strCookieName) 
            {     
                if (cookies[strCookieName]) {
                    return cookies[strCookieName];
                } else {
                    return null;
                }   
            }

            // Description: set a new cookie with an expiration time - used to be called subSetCookieHelper
            // name: cookie name
            // value: cookie value
            // yearsValid: years cookie is good for
            // returns: None
            function setCookie(name, value, yearsValid) {
                if (yearsValid == null || yearsValid == "") {
                    setSessionCookie(name, value);
                }
                else {
                    var expireDate = new Date(),
						msecs = expireDate.getTime();
                    
					expireDate.setTime(msecs + (yearsValid * 365 * 24 * 3600 * 1000));
                    expireDate = expireDate.toGMTString();
                   
                    document.cookie = escape(name) + "=" + escape(value) + ";expires=" + expireDate + ";path=/";
                }
            }

            // Description: set a new session cookie, used by setCookie() if no expiration set
            // name: cookie name
            // value: cookie value
            // returns: None
            function setSessionCookie(name, value) {
                document.cookie = escape(name) + "=" + escape(value) + "; path=/";
            }


            //return functions and variables that you want accessible outside
            return {
                init : init,
                getCookies: getCookies,
                getCookie: getCookie, 
                setCookie : setCookie,
                detectCookieProblems : detectCookieProblems,
                updateCookies : updateCookies
            };
        })();

        return STAPLES;

    }(window.STAPLES || {}));
    
    //update the Global STAPLES name space with new functionality and variables
    window.STAPLES = STAPLES;
    
    // Run as soon as this file loads
    STAPLES.Cookies.init();

}(window, document, jQuery));        
///////////////////////////////////////
/// utilities.js merging starts here ///
///////////////////////////////////////
(function(window, document, $, undefined) {
    'use strict';

    // Call function right away passing STAPLES or empty object if not yet initialized
    var STAPLES = (function(STAPLES) {

		STAPLES.Utilities = (function() {
			
			// Declare Variables
			var var1;

			// Init variables
			function init() {
			}
			
			// Description: load scripts without blocking
			// url: script URL to load
			// callback: callback function to run after download completes
			// returns: false if error
			function loadScriptAsync(url, callback) {
				if (!url) {
					return false;
				}

				$.ajax({
					url: url,
					dataType: "script",
					timeout: propertyValues.ajaxTimeout,
					success: function(data, textStatus, jqXHR) {callback && callback();},
					error: function(jqXHR, textStatus, errorThrown) {
						try {
							console.log("failed to load: " + url + 
							"\nStatus: " + textStatus +
							"\nHTTP Error: " + errorThrown);
						}
						catch(err) {}

						return false;
					}

				});
			}
			// Description: load XML doc from url
			// url: xml URL to load
			// returns: false if error, xml data if success
			function loadXMLDoc(url, callback){
				if(!url){
					return false;
				}
				try {
					$.ajax({
						url: url,
						type: 'GET',
						dataType: 'xml',
						timeout: 25000, //propertyValues.ajaxTimeout
						error: function(jqXHR, textStatus, errorThrown){
							try {
								console.log("failed to load: " + url + 
								"\nStatus: " + textStatus +
								"\nHTTP Error: " + errorThrown);
							}
							catch(err) {}
							return false;
						},
						success: function(data, textStatus, jqXHR) {callback && callback(data);}
					});
				} catch (e){
					console.log('ulilities.js: invalid return on ' + url);
					return false;
				}
			}
			// Description: parse XML string
			// txt: xml data to parse
			// returns: xml object
			function parseXMLString(data){
				if ( !data || typeof data !== "string" ) {
					return null;
				}		
				//revert any skuItemDelimiters back to non XML tags (FF17 bug)
				data = data.replace( /<>/g, "&lt;&gt;");
				
				//All IE browsers are using ActiveXObject to manipulate XML so parsing has to be the same
				if( window.ActiveXObject ) {
					return parseActiveXObject(data);
				}
				// try processing using FireFox's XML object.
				try{
					var parser=new DOMParser();
					var xmlTxt=new XML(data);
					return parser.parseFromString(xmlTxt,"text/xml");
				} 
				// process using jQuerry or throw an error
				catch(err){
					return $.parseXML( data );
				}
			}
			
			function parseActiveXObject(data){
				// 01/11/2010: put this back in if next line fails --> xmlDoc = new ActiveXObject("MSXML2.DOMDocument.6.0");
				var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
				// test code end
				xmlDoc.async = "false";
				xmlDoc.loadXML(data);
				return xmlDoc;
			}
			
			//return functions and variables that you want accessible outside
			return {
				init : init,
				loadScriptAsync : loadScriptAsync,
				loadXMLDoc : loadXMLDoc,
				parseXMLString : parseXMLString
			};
		})();

        return STAPLES;

    }(window.STAPLES || {}));
    
	//update the Global STAPLES name space with new functionality and variables
	window.STAPLES = STAPLES;
    
	// Run as soon as this file loads
	STAPLES.Utilities.init();

}(window, document, jQuery));
// ======================= combined code of onload.js, cookies.js, utilities.js ends here =====================


/* ================================================== 
	Staples.com 6.0.7 main.js
================================================== */

//////////
// Browser check
//////////

	//Added for performance testing
	var alertAddToCartOverlay=true;
	var alertSwatchClick = true;
	var alertSelectDropDown = true;
	var alertCreateCookie=true;
	//Added as part of ST-239 to track the partnumber
	var variantPartnumber='';
	//Added as a part of ST-310B to track certona recommendations in quickview
    var quickviewCertonaRecommendationTrackingSwitch='OFF';
	var debugMode = STAPLES.Cookies.getCookie('personalizationDebugMode');

	function getPageId() {
		var pageId = Math.floor(Math.random() * 1000000000000000) + '';
		var localDate = new Date();
		var year = localDate.getFullYear() + '';
		var month = (localDate.getMonth() + 1) + '';
		var day = localDate.getDate() + '';
		var hour = localDate.getHours() + '';
		pageId = 'res' + year.substring(2) + lpad(month,2) + lpad(day,2) + lpad(hour,2) + pageId;
		return pageId;
                }
			
	var resxPageId  = getPageId();
	
	//used by samhome page Gold.xml data.
	function addCartUrl (caller,link) {
		var callerVal = $(caller).siblings("input").val();
		
		if (callerVal) {
			callerVal = parseInt(callerVal.replace(/[^0-9]/,''));
		} else {
			callerVal = 1;
		}
		link = link.replace(/(quantity_(\d+)=)\d*/,"$1" + callerVal + "&cmArea_$2=" + $(caller).attr('cmArea'));

		$(caller).siblings("input").val(callerVal);
		$(caller).attr('href',link)
		
		//launch in window.parent to break out of overlay
		window.parent.location = link;
		return false;
	}


	//Detect details about IE8 and checks if it is in compatibility mode
	function IEVersion(){
		var _n=navigator,_w=window,_d=document;
		var version="NA";
		var na=_n.userAgent;
		var ieDocMode="NA";
		var ie8BrowserMode="NA";
		// Look for msie and make sure its not opera in disguise
		if(/msie/i.test(na) && (!_w.opera)){
			// also check for spoofers by checking known IE objects
			if(_w.attachEvent && _w.ActiveXObject){		
				// Get version displayed in UA although if its IE 8 running in 7 or compat mode it will appear as 7
				version = (na.match( /.+ie\s([\d.]+)/i ) || [])[1];
				// Its IE 8 pretending to be IE 7 or in compat mode		
				if(parseInt(version)==7){				
					// documentMode is only supported in IE 8 so we know if its here its really IE 8
					if(_d.documentMode){
						version = 8; //reset? change if you need to
						// IE in Compat mode will mention Trident in the useragent
						if(/trident\/\d/i.test(na)){
							ie8BrowserMode = "Compat Mode";
						// if it doesn't then its running in IE 7 mode
						}else{
							ie8BrowserMode = "IE 7 Mode";
						}
					}
				}else if(parseInt(version)==8){
					// IE 8 will always have documentMode available
					if(_d.documentMode){ ie8BrowserMode = "IE 8 Mode";}
				}
				// If we are in IE 8 (any mode) or previous versions of IE we check for the documentMode or compatMode for pre 8 versions			
				ieDocMode = (_d.documentMode) ? _d.documentMode : (_d.compatMode && _d.compatMode=="CSS1Compat") ? 7 : 5;//default to quirks mode IE5				   			
			}
		}
					 
		return {
			"UserAgent" : na,
			"Version" : version,
			"BrowserMode" : ie8BrowserMode,
			"DocMode": ieDocMode
		}			
	}
	
	function postLoadWriterPrTab(string){
		if($("#prTabIframe_"+pr_page_id)){
			$("#prTabIframe_"+pr_page_id).load(function(){
				//console.log(string);
				$("#prTabIframe_"+pr_page_id).contents().find('html body').html(string);
				//console.log($("#prIframe_0").contents().find('html body').html());
			});
        }
    }
	
	
//////////
// Init
//////////

var debugMessages = new Array(0);

function stopErrors() {
    return true;
}
	
function errRedirect(url) {
    window.onerror = stopErrors;
    window.location = url;
}

// globalTimeout used by all ajax calls, 2 seconds
var globalTimeout = propertyValues.ajaxTimeout;

// This function gets the server name
function getServerName() {
    var filepath = window.location.toString();
    var pattern = /\/\/([^\/]+)\/?/;
    var result = filepath.match(pattern);
    if (result != null) {
        return result[1];
    }
}
var serverName = getServerName();
  
var isSecure = (location.protocol === 'https:');

  
//Function to link with hourglass and loading message
function jsSubmitLink(url) 
{
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
	if(typeof quickviewCertonaRecommendationTrackingSwitch!= "undefined" && quickviewCertonaRecommendationTrackingSwitch=='ON'){
	      quickviewCertonaRecommendationTrackingSwitch='OFF';
	      url=url+'&externalize=certona';
	}
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
    if (url.indexOf('http') != 0) {
        url = 'http://' + serverName + url;
    }
    window.location = url;
    document.body.style.cursor='wait';
    status=propertyValues.loading;
}

var isOverlay = false;

function setUpHeader(cartclicky) {
    // break out of frame
    if ( 	cartclicky != 'cartoverlay' &&
    		cartclicky != 'overlay' &&
        pageId != 'partner' &&
        pageId != 'yourorder' &&
        pageId != 'emailcoupon' &&
        isOverlay &&
        !(querystring.framebreak && querystring.framebreak == 'false')
        ) {
        top.location.href = window.location.href;
        return false;
    }
		if($.browser.msie && $.browser.version < 8){
			var ieDetails = IEVersion(); 
			if(ieDetails.Version < 8) { //check if IE8 is in compatibility mode
				var hideUpdate = STAPLES.Cookies.getCookie('hideupdate');
				
				if(hideUpdate == null) {
					var updateIEWrapper = $('#updateiewrapper');
					updateIEWrapper.hover(function(){
						$(this).children('a').css({'background-position':'left bottom', 'background-color': '#111b5d','color':'#fff'});
					},function(){
						$(this).children('a').css({'background-position':'left top', 'background-color': '#f9fae7', 'color':'#000'});
					});
					
					$('#updateiex').click(function(){
						STAPLES.Cookies.setCookie('hideupdate', true);
						updateIEWrapper.css('display','none');
					});
					
					updateIEWrapper.css('display','block');
				}
			}
		}
		
		
		
		
		
		
    var welcomeMsg = STAPLES.Cookies.getCookie('WelcomeMsg');
    // create logout link if user is logged in
    if	(
        !isguest('StaplesUser')
        ||
        (
            STAPLES.Cookies.getCookie('STAPLES50_REENTRY') == 'null'
            &&
            STAPLES.Cookies.getCookie('STAPLES_REENTRY_OFF') != 'null'
            )

        )
        {
        var wmsg = $('#wmsg');
        $('#hlogout').html('<a href="'+propertyValues.POST_DOMAIN+'StaplesLogoff?langId='+propertyValues.DEF_LANG_ID+'&storeId='+propertyValues.DEF_STORE_ID+'&catalogId='+propertyValues.DEF_CATALOG_ID+'" rel=\"nofollow\"><b>' + propertyValues.logout + '<\/b><\/a>');

        var counterCheck = 0;
        //if samhome fill in account manager info
        if(!isguest('StaplesUserInfo') && pageId == "samhome" && propertyValues.samHeaderShowuserdataSwitch == 'ON'){
        	var strCustNum = STAPLES.Cookies.getCookie('DirectCustomerNumber');
            var samuserInfo = '<ul><li id="liuserinfo"><b>'+propertyValues.samuserInfo+'</b> ';
            if(staplesUserInfo.acctmgremail && staplesUserInfo.acctmgremail !== ""){
                if (!isKiosk) {
                    samuserInfo += '<a href="mailto:';
                    samuserInfo += staplesUserInfo.acctmgremail;
                    samuserInfo += '" id="acctmgremail">';
                    samuserInfo += staplesUserInfo.acctmgremail;
                    samuserInfo += '</a> '
                } else {
                    samuserInfo += staplesUserInfo.acctmgremail + ' ';
                }
                ++counterCheck;
            }
            if(staplesUserInfo.acctmgrphone && staplesUserInfo.acctmgrphone !== ""){
                samuserInfo += formatUSPhone(staplesUserInfo.acctmgrphone);
                ++counterCheck;
            }
            if(staplesUserInfo.acctmgrext && staplesUserInfo.acctmgrext !== ""){
                samuserInfo += ' ext ';
                samuserInfo += staplesUserInfo.acctmgrext;
                ++counterCheck;
            }
            if ( strCustNum != null ) {
            	samuserInfo += ' <strong>Rewards # ';
                samuserInfo += strCustNum + "</strong>";
                ++counterCheck;
            }
            samuserInfo +='</li></ul>';
            if(counterCheck > 0){
                $('#bmsging').html(samuserInfo);
            }
        }
				
        //if samhome and no account manager, or not samhome
				
        if (counterCheck == 0) {
	    
	    if (welcomeMsg != null && !(welcomeMsg == '""')  && welcomeMsg !== undefined){
		    welcomeMsg = myunescape(welcomeMsg).replace(/[^a-zA-Z 0-9\.\-_']+/g, "");
		    if(welcomeMsg.length > 25) {
			    welcomeMsg = welcomeMsg.substr(0, 25);
		    }	
		    var welcomeMsgOutput = propertyValues.welcomeuserloggedin.replace(/\{0\}/g,welcomeMsg);
                $('#liwmsg').html("<div id='lginwmsg'>"+welcomeMsgOutput+"<\/div>");
            } else {
                wmsg.html(propertyValues.welcomedefaultloggedin);
            }
					
        }
        wmsg.attr('href','#').click(function(){
            return false;
        });
    } else {// replace text when user is logged out
        $('#hlogin').html(propertyValues.login);
    }
    
    //5/18/11 Poole- added the code below for YOMS BR4 Order Capture Pilot
    var badAuth = '***The authorization code passed is incorrect***';
    var pilotOff = '***Pilot mode is off***';
    var pilotMode = '***You are in pilot mode!!***';
    var missingParms = '***One or more url parameters are missing***';
    if (staplesUserInfo.OCPilotErr!= null && staplesUserInfo.OCPilotErr!= ""){
    $('#liwmsg').html('<div id=\"lginwmsg\"><b>' + eval (staplesUserInfo.OCPilotErr) + '</b><\/div>');
    }else if(staplesUserInfo.ocMode != null && staplesUserInfo.ocMode != ""){
    $('#liwmsg').html('<div id=\"lginwmsg\"><b>' + pilotMode +'</b><\/div>');			
    }
    //END YOMS BR4 Order Capture Pilot code

    //fill in cart from cookie
    var cartDetails = parseCart('StaplesCart');
    var ItemDetails = cartDetails['Items'].split(" ",2);
    var overlay="";
    if (cartclicky == 'overlay') {
    	overlay="overlay";
    }
    var thecart = $('#cart'+overlay);
    var thecarti = $('#carti'+overlay);
    var thecartp = $('#cartp'+overlay);
    var cartimage = thecarti.find('a > img');

    var cartclick = thecart.find('dt > a').attr('href');
    
    var checkoutExclusionPagesArr = propertyValues.checkoutExclusionPages.split(',');
    if (cartclicky == 'overlay') {
    	 if(window.parent.document.getElementById('hcartitems') !=null){
    	    	window.parent.document.getElementById('hcartitems').innerHTML='';
    	        window.parent.document.getElementById('hcartitems').innerHTML=ItemDetails[0];
    	       }
    	       if(window.document.getElementById('hcartitemsoverlay') !=null){
    	       		window.document.getElementById('hcartitemsoverlay').innerHTML='';
    	             window.document.getElementById('hcarttotaloverlay').innerHTML='';
    	             window.document.getElementById('hcartitemsoverlay').innerHTML=ItemDetails[0];
    	             window.document.getElementById('hcarttotaloverlay').innerHTML=cartDetails['Total'];	
    	       }    
    } 
    else if (isValueInArray(checkoutExclusionPagesArr,pageId)) {
        //disable cart click
        thecart.addClass('cartclickdisabled');
        cartimage.attr('src', propertyValues.ICON_PATH + 'hdr_cart_disabled.png');
        thecart.click(function() {
            return false;
        });
    } else if (pageId == 'partner') {
        thecart.click(function() {
            window.parent.location = cartclick;
            return false;
        });
    } else {
        thecart.click(function() {
            window.location = cartclick;
            return false;
        });
    }
    if(cartclicky == 'overlay'){
    	
	    $("#hcartitemsoverlay").append().after(' ' + ItemDetails[1]);
	
	  
	}
   
    //condition check provided to avoid repainting header mini cart   
    if(cartclicky != 'overlay'){
	    $("#hcartitems").append(ItemDetails[0]).after(' ' + ItemDetails[1]);
	
	    fillElement('hcarttotal', cartDetails['Total'] );
	}
   
    //how wide is the header, cart and logo
    var amountWidth = thecartp.find('a').totalWidth() + 16;
    var cartpWidth = thecartp.totalWidth();

    if (amountWidth > cartpWidth ) {
        var cartWidth = thecarti.totalWidth() + amountWidth + 2;
    } else {
        var cartWidth = thecarti.totalWidth() + cartpWidth + 2;
		
    }
		
    var widthAdjust = $('#hdr').superWidth() - cartWidth - $('#logo').superWidth();

    //readjust the search box and cart
    $('#searchkey').css('width', widthAdjust - 174);
    $('#sform').css('width', widthAdjust - 68);
	$('#cart').css('width',cartWidth);
    thecart.css('width',cartWidth);

    if (staplesUserInfo.mypage) {
        $('#mypage').removeClass('hide');
        $('#mccnt_mpg').removeClass('hide_simple');
    } else {
        //$('#mypage').remove();
        $('#mccnt_mpg').remove();
    }
    /* start--ST 590 SAM Phone Number */
    if (staplesUserInfo.mypage) {
        $('#samuser').removeClass('hide');
        $('#sohouser').addClass('hide');
    } else { 
       $('#samuser').addClass('hide');
       $('#sohouser').removeClass('hide');
    }
    /* end--ST 590 SAM Phone Number */

    if (isMsie7) {
        $("#chead > ul > li").hover(
            function(){
                $(this).children("a").addClass("ie7navitem").end().children("ul").addClass("ie7navUL");
            }
            ,
            function(){
                $(this).children("a").removeClass("ie7navitem").end().children("ul").removeClass("ie7navUL");
            }
            );
    }
		

		//Certona Tagging for search and autocomplete
		if (propertyValues.analyticsSwitch == "ON") {
			$('#hsearch').submit(function(){
				s_findMethod("Search", "Basic Search");
			});
			
			// for no search results page
			 STAPLES.Onload.addLoadEvent(function() {
				$('#searchNoResultsForm').submit(function(){
					s_findMethod("Search", "Basic Search");
				});
			});
		}// end certona tagging
		
        // listeners for ink and toner search in header to switch options
        $('#inksearchselected span').click(function(event){ 
			showinktoner(event); 
		});
        
		$('#inksearchoptions input').click(function(event){
			changeoption(event);
		});

        // if kiosk mode remove government and feedback header links
        if(isKiosk){
            // fed gov link
            $('#govLink').html("&nbsp;");
            // feedback link
            $('li.toolsFeedback').hide();
            // chat link in header
            $(".toolsChat").hide();
         }
        setupAutocomplete(cartclicky);

	}
	
function setupAutocomplete(cartclicky) {
	_autoSearch = false;
    var showSearchAutocomplete = (propertyValues.searchAutocomplete == 'ON') ? true : false;
    if (showSearchAutocomplete && cartclicky != 'overlay' && pageId != 'partner' && !isOverlay) {
        $("#searchkey")
        .autocomplete('/autocomplete',{selectFirst: false,inputClass:"",loadingClass:"", horizontalOffset:"-3", width:"383px", resultsClass:"mainACResults ac_results"})
	    .result(function(e, item, form){setAutoSearch(item, form);});
        
        if (pageId.indexOf('searchnoresults') !== -1 ) {
        	// need to wrap in addLoadEvent since section loads later than header
        	STAPLES.Onload.addLoadEvent(function() {
        		$("#nsearchkey")
            	.autocomplete('/autocomplete',{selectFirst: false,inputClass:"",loadingClass:""})
            	.result(function(e, item, form){setAutoSearch(item, form);});
        	});
		}
}

    // add auto-complete for ink and toner searches
    var showInkTonerAutocomplete = (propertyValues.inkTonerAutocomplete == 'ON') ? true : false;
    if (showInkTonerAutocomplete && cartclicky != 'overlay' && pageId != 'partner' && !isOverlay) {  
        // add on ink and toner pages
    	if (pageId.indexOf('pmm') != -1 || pageId.indexOf('modelnumbersearchresults') != -1) {
        	STAPLES.Onload.addLoadEvent(function() {
        		$("#cartridge")
        	    .autocomplete('/icartridgeAutocomplete',{selectFirst: false,inputClass:"",loadingClass:"", width:"310px"})
        	    .result(function(e, item, form){setAutoSearch(item, form);});
            	
            	$("#modelsearchkey")
        	    .autocomplete('/modelAutocomplete',{selectFirst: false,inputClass:"",loadingClass:"", width:"310px"})
        	    .result(function(e, item, form){setAutoSearch(item, form);});
        	})
        }      
    	/*BEGIN: ST4 - ST571:Add autocomplete feature in ink and toner search field in header section.
        Also Updated gen/headertabsinc.jsp file for changing the ids of "cartridge" -> "cartridgeheader" and "model" -> "modelheader" input fields
        to avoid any conflict with same ids on Ink&Toner search result page */           
        STAPLES.Onload.addLoadEvent(function() {
        	$("#cartridgeheader")
        	.autocomplete('/icartridgeAutocomplete',{selectFirst: false,inputClass:"",loadingClass:"", horizontalOffset:"-5" ,width:"310px", resultsClass:"mainACResults ac_results"})
        	.result(function(e, item, form){setAutoSearch(item, form);});
        	
        	$("#modelheader")
        	.autocomplete('/modelAutocomplete',{selectFirst: false,inputClass:"",loadingClass:"", horizontalOffset:"-5" ,width:"310px", resultsClass:"mainACResults ac_results"})
        	.result(function(e, item, form){setAutoSearch(item, form);});
        })
        /*END: ST4 - ST571*/              
    }
}

function setUpFooter() {
    // listern for email signup form in footer
    var emailsignupBTN = document.getElementById('emailsignup').getElementsByTagName('span')[0];
    addListener(emailsignupBTN, 'click', showform, false);
    if (isKiosk) {
        $('#_bapw-link').hide();
        $("#footer_bar #chat").html("");
        hideSLBlink();
    }  
    //Start ST 561: hide the social leader board on Kiosk mode    
    if(propertyValues.socialLeaderBoardSwitch == "ON"){    	
    	if(propertyValues.socialLeaderBoardSecurePagesSwitch == "OFF"){    			    	
    		if(isSecure){
    			hideSLBlink();
    		}
    	}    	
    }else{
    	hideSLBlink();
    }
}	

function hideSLBlink(){
	$('#lb_community, #show_community').hide();
	adjustFooterHieghtAfterSlbHide();
}

function adjustFooterHieghtAfterSlbHide(){
	$('#footer_social, #footer_links, #footer_cards').css('height','320px');    
}


//End ST 561: hide the social leader board on Kiosk mode

function setAutoSearch (item, form) {
    _autoSearch = true;

    // some forms don't have an id, but have a name 
    var formName = form.attr("id"); 
    formName = formName ? formName : form.attr("name"); 

    // don't submit analytics for ink toner search
    if (typeof formName !== 'undefined' && formName.indexOf("Printermodel") === -1 && formName.indexOf("Cartridge") === -1) {
        if (propertyValues.analyticsSwitch == "ON") {
            s_findMethod("Search", "AutoComplete"); 
        }
    } 

    $(".autocompletesearchkey").remove();
    form.append("<input type='hidden' class='autocompletesearchkey' name='autocompletesearchkey' value='" + item[0] + "' />");

    // if the form is for printer model submit use default form action
    if (typeof formName !== 'undefined' && formName.indexOf("Printermodel") > -1) {
        formSub(formName);
    } 
    // otherwise call submitSearch for SEO optomization
    else {
        submitSearch(formName, item[0]);
    }
    
}

   /**
    * Mimics the Java concept of a MessageFormat, where a static string denotes specific portions of the value to be replaced by dynamic content
    * Syntax: Replacement String, 
    *   var replacementString = "You are: First Name={0}, Last Name={1}.  Welcome {2} {1}!";
    *   var dynamicText = new Array( "John", "Smith", "Mr.");
    *   //where the following call will result in the the final outputted text
    *   var formattedMessage = formatMessageHelper( replacementString, dynamicText );
    *   //formattedMessage="You are: First Name=John, Last Name=Smith.  Welcome Mr. Smith!";
    * 
    * @author Paras Mehta 8/4/2011
    */
    var formatMessageDynamicMatchPattern = "{[0]}";
	function formatMessageHelper(stringWithDynamicReplacements, dynamicTextStringArray){
	    if( ! stringWithDynamicReplacements ){
	        alert("Doesn't appear that you are using this function appropriately, pass in a valid stringWithDynamicReplacements, not null.  stringWithDynamicReplacements=" + stringWithDynamicReplacements );
	        return stringWithDynamicReplacements;
	    }
	    if( ! dynamicTextStringArray ){
	        alert("Doesn't appear that you are using this function appropriately, pass in a valid dynamicTextStringArray, not null.  dynamicTextStringArray=" + dynamicTextStringArray );
	        return stringWithDynamicReplacements;
	    }
	    var formattedString = stringWithDynamicReplacements;
	    var i = 0;
	    var currentReplStringIdentifier = formatMessageDynamicMatchPattern.replace("[0]", i );
	    while ( i < dynamicTextStringArray.length ){
	        //Look in the String to see if there is a request to replace a value with the string array passed in
	        while (  formattedString.indexOf( currentReplStringIdentifier ) > -1 ){
    	        //Replace the String identifier with the 
    	        /*
    	        alert(i + ": Replacement String, formattedString=" +  formattedString
    	            + "\n Replacement String searching for, currentReplStringIdentifier=" + currentReplStringIdentifier 
    	            + "\n Replaced template String with value =" + dynamicTextStringArray[i].toString() );
    	            */
    	        formattedString = formattedString.replace( currentReplStringIdentifier, dynamicTextStringArray[i].toString() );
    	        
    	    }
    	    
	        //Continue, regardless of a match, to see if there is another dynamic text replacement possible
	        //Update the counter and look for the next string to replace
	        i++;
	        currentReplStringIdentifier = formatMessageDynamicMatchPattern.replace("[0]", i );
	    }
	    
	    return formattedString;
	}

	
/*  activateActiveX 1.2
		Copyright 2006 Jason Garber and Tavis Tucker
		This software is licensed under the CC-LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
	*/

	
/*
	activateActiveX : Activates ActiveX content for Internet Explorer 6.0+ to avoid requiring a user to click before using an object
	
	Source : <http://sixtwothree.org/blog/archives/2006/05/20/activateactivex-12/>
	*/
	
function activateActiveX() {
    if ( !document.getElementsByTagName || !document.body.outerHTML || !document.compatMode ) return false;
    var elems = new Array( "object", "applet" );
    var i = elems.length;
    while ( i-- > 0 ) {
        var objects = document.getElementsByTagName( elems[i] );
        var j = objects.length;
        while ( j-- > 0 ) {
            var params = "";
            var k = objects[j].childNodes.length;
            while ( k-- > 0 ) {
                params += objects[j].childNodes[k].outerHTML;
            }
            objects[j].outerHTML = objects[j].outerHTML.replace( "</" + elems[i].toUpperCase() + ">", params + "</" + elems[i].toUpperCase() + ">" );
        }
    }
}
	
	
STAPLES.Onload.addLoadEvent(activateActiveX);	
	
//////////
// String decoding helpers
//////////

	
// unescape text /////////////////
function myunescape (str) {
    str = "" + str;
    while (true) {
        var i = str . indexOf ('+');
        if (i < 0) break;
        str = str.substring(0, i) + '%20' + str.substring(i + 1, str.length);
    }
    return unescape (str);
}
	
function getArgs() {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length ; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0,pos);
        var value = pairs[i].substring(pos+1);
        args[argname] = myunescape(value);
    }
    return args;
}
	
var querystring = getArgs();
	
STAPLES.Onload.addLoadEvent(function() {
    if (querystring.debugmsg) {
        $("#debug").append("<br />DEBUGMSG: " + querystring.debugmsg);
    }
});



//////////
// Header
//////////

	
// parse for cart shipping message /////////////
function parseCart(cookieName) {
	STAPLES.Cookies.updateCookies();
    var returnObject = new Object();
    try {
        var cartString = STAPLES.Cookies.getCookie(cookieName);
        var pattern = /^([^\;]+)\;([^\;]+)\;([^\;]+)$/;
        var result = cartString.match(pattern);
        if (result != null) {
            returnObject['OrderID'] = result[1];
            returnObject['Items'] = result[2];
            returnObject['Total'] = result[3];
        } else {
            returnObject['OrderID'] = '0';
            returnObject['Items'] = '0 items';
            returnObject['Total'] = '$0.00';
        }
    } catch(e) {
        returnObject['OrderID'] = '0';
        returnObject['Items'] = '0 items';
        returnObject['Total'] = '$0.00';
    }
    return returnObject;
}
// end parse cart
	
// user control for static ////////////
function isguest(CookieId) {
    try {
        if (STAPLES.Cookies.getCookie(CookieId) != null && STAPLES.Cookies.getCookie(CookieId) != '' &&  STAPLES.Cookies.getCookie(CookieId) != 'guest') {
            return false;
        } else {
            return true;
        }
    } catch(e) {}
}
// end user control


// pull in staplesUserInfo /////////////
function fillStaplesUserInfo(cookieName) {
    var returnObject = new Object();
    var jsonStr = STAPLES.Cookies.getCookie(cookieName);
    if (jsonStr) {
        returnObject = eval('(' + jsonStr + ')');
    }
    return returnObject;
}
// end parse cart
	
//set Home page for Sam user
	
function setHomePage(){
    var homeURL;
    var currState=false;
    if($('#SAMmakehomepage').is(':checked')){
        currState=true;
        homeURL = propertyValues.POST_DOMAIN+"/StaplesMemberUnsecure?change=startingPage&reqStartingPage=samhome&URL=makehomepage&errorUrl=makehomepage&storeId="+propertyValues.DEF_STORE_ID+"&langId="+propertyValues.DEF_LANG_ID+"&catalogId="+propertyValues.DEF_CATALOG_ID;
    }
    else{
        homeURL = propertyValues.POST_DOMAIN+"StaplesMemberUnsecure?change=startingPage&reqStartingPage=home&URL=makehomepage&errorUrl=makehomepage&storeId="+propertyValues.DEF_STORE_ID+"&langId="+propertyValues.DEF_LANG_ID+"&catalogId="+propertyValues.DEF_CATALOG_ID;
    }
    $('#SAMmakehomepage').attr('disabled',true);
    try {
        //load the targetanchor
        $.ajax({
            url: homeURL,
            type: 'GET',
            dataType: 'html',
            error: function(){
                //if it doesn't load in the allotted timeout, do something here
                $('#SAMmakehomepage').removeAttr('disabled');
                currState ? $('#SAMmakehomepage').removeAttr('checked') : $('#SAMmakehomepage').attr('checked',true);
            },
            success: function(returnObj){
                //cache the new flyout
                $('#SAMmakehomepage').removeAttr('disabled');
            }
        })
    } catch (e) {
    //the call was bad, do something here
		
    }
	
}
	
	
var staplesUserInfo = new Object();
staplesUserInfo = fillStaplesUserInfo('StaplesUserInfo');

//Put focus on search box on home page
if (pageId == 'home') {
    STAPLES.Onload.addLoadEvent(function() {
        $('#searchkey').focus();
    });
}
// SAM HEADER SET UP
function setUpSamHead() {
    var rewardStyle = '';
    if (propertyValues.samHeaderMakestartpageSwitch == 'ON') {
        if ( staplesUserInfo.HOMEPAGE == 'samhome' ) {
            chkBoxHtml = '<input type="checkbox" name="makehomepage" checked="checked"  id="SAMmakehomepage" onclick="javascript:setHomePage();">';
        } else {
            chkBoxHtml = '<input type="checkbox" name="makehomepage"  id="SAMmakehomepage" onclick="javascript:setHomePage();">';
        }
        var makestartpage ='<li id="samHomeSet">';
        makestartpage +='<form name="homepageform1" id="homepageform1">';
        makestartpage += chkBoxHtml;
        makestartpage +='<label for="SAMmakehomepage" class="checklabelheader">'+propertyValues.HomePage.MakeHomePage+'</label>';
        makestartpage +='</form></li>';
        $("#bmsging ul").append(makestartpage);
    } else {
        rewardStyle = "width:392px";
    }
		
    if (propertyValues.samHeaderShowuserdataSwitch == 'ON') {
        var strCustNum = STAPLES.Cookies.getCookie('DirectCustomerNumber');
        var rewardClass=staplesUserInfo.tier;
        var userdata ='<li id="usrreward" '
        userdata += 'class="' + rewardClass + '" ';
        if (rewardStyle != "") {
            userdata += 'style="' + rewardStyle + '" ';
        }
        userdata +='><span class="usrinfo">';
        if ( staplesUserInfo.custfname && staplesUserInfo.custfname !== 0 ) {
            userdata +='<span class="usrpgnme">';
            userdata += staplesUserInfo.custfname;
            userdata += '&rsquo;s Page</span>';
        }
        if ( strCustNum != null ) {
            userdata +='<span class="rewardnum"><strong>'+propertyValues.HomePage.Rewards+'</strong>' + strCustNum + '</span>';
        }
        /* if ( staplesUserInfo.ytdpurchases && staplesUserInfo.ytdpurchases !== 0 ) {
				userdata +='| Year-to-Date Rewards <strong class="rwdvalue">$';
				userdata +=staplesUserInfo.ytdpurchases;
				userdata +='</strong>';
			   }*/
        userdata +='</span></li>';
        $('#ffd').replaceWith(userdata);
    }
}


//////////
// Sidenav
//////////

var sidenavOpenState = false;
var sidenavFlyoutOpenState = false;
var showap;
var showallprodsUl
var leftnavLi;

function setUpSAP() {

    //cache the left nav
    var leftnav = $("#showallprods");
    showallprodsUl = $("#showallprods > ul");
	
    //cache all the left nav main LIs
    leftnavLi = $("#showallprods > ul > li");
		
    //cache the show all products link
    showap = $("#showap");



    //home page
    if (pageId == 'home') {
        //should not be clickable
        $("#showap").click(function(){
            return false;
        });
    } else if (pageId == 'partner') {
    //should be clickable - do nothing
    } else {
        //all others
        //set up the show all products click
        showap.click(
            function(){
                if (sidenavOpenState) {
                    closeShowAllProducts();
                } else {
                    sidenavOpenState = true;
                    $(this).addClass('showapOn');
                    showallprodsUl.addClass('showul');
						
						//Put I frame under the show all products drop down
                    if (isMsie6) {
							var showul = $('#showallprods');
                            $('#sdbrGlobal').prepend('<iframe frameborder="0" class="showuliframe" style="height:'+showul.outerHeight()+'px; margin-top:-10px; width:'+showul.outerWidth()+'px; position:absolute; left:0; top:0; z-index:-1;"></iframe>');
                    }
                    //CR71257 - requirement was changed AGAIN to do this
                    //set the entire document to close the show all products
                    $(document).bind('click.showap',function(e) {
                        var clickObj = $(e.target);
                        var parents = clickObj.parents();
                        var doClose = true;
                        parents.each(function(){
                            if (this.tagName == "DIV" && this.id == "showallprods") {
                                doClose = false;
                                return false;
                            }
                        });
                        if (doClose) {
                            closeShowAllProducts();
                        }
                    });
                }
                return false;
            });
			
    }
		
}

var ajaxFlyouts = ((pageId == 'home' && propertyValues.Flyout.homePageFlyoutAjaxSwitch == 'ON') || (pageId != 'partner' && pageId != 'home' && propertyValues.Flyout.nonHomePageFlyoutAjaxSwitch == 'ON'));

    STAPLES.Onload.addLoadEvent(setupLeftNav);
	
var footerNavHolder;
var freqItemsLoaded =false;
function setupLeftNav(){
    if (ajaxFlyouts) {
    footerNavHolder=$("#sideNavLinks");
    if (footerNavHolder) {
        var a = propertyValues.POST_DOMAIN + 'StaplesB2CPAS/gen/allproductsnavinc.jsp?pageMode=standalone&DC_lang=' + propertyValues.DEF_LANG_ID + '&storeId=' + propertyValues.DEF_STORE_ID + '&catalogId=' + propertyValues.DEF_CATALOG_ID;
        try{
            $.ajax({
                    url: a,
                    type: "GET",
                    dataType: "html",
                    error: function() {},
                    success: function(c) {
                        footerNavHolder.append(c);
                        setUpSidenavAutocomplete();
                }
                });
            } catch (b) {}
        }
    } else {
        setUpSidenavAutocomplete();
    }
}
	
	
// sidenav flyouts init functionality	
function setUpSidenav() {
    if (typeof(leftnavLi) == "undefined") {
        setUpSAP();
    }

    //cache the left nav
    var leftnav = $("#showallprods");
    showallprodsUl = $("#showallprods > ul");

    //cache the show all products link
    showap = $("#showap");

    //apply hover to each LI to open flyouts and such
    leftnavLi.hoverIntent({
        sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
        interval: 100,   // number = milliseconds of polling interval
        over: function(){		
			
            openFlyout($(this))				
			
        },  // function = onMouseOver callback (required)
        timeout: 0,   // number = milliseconds delay before onMouseOut function call
        out: function(){
           closeFlyout($(this))			
        }    // function = onMouseOut callback (required)
    });
			
};
	
function setUpSidenavAutocomplete() {
    var showInkTonerAutocomplete = (propertyValues.inkTonerAutocomplete == "ON") ? true : false;
    // make sure switch is on and autocomplete plugin available
    if (showInkTonerAutocomplete && $().autocomplete) {
        $("#cartridgeFlyout").autocomplete("/icartridgeAutocomplete", {
            selectFirst: false,
            inputClass: "",
            loadingClass: "",
            width: "310px"
        }).result(function(e, item, form){setAutoSearch(item, form);});
        $("#modelsearchkeyFlyout").autocomplete("/modelAutocomplete", {
            selectFirst: false,
            inputClass: "",
            loadingClass: "",
            width: "310px"
        }).result(function(e, item, form){setAutoSearch(item, form);});
    }
}
	
function openFlyout (liObj) {
    var currentLi = $(liObj);
    currentLi.addClass('selected');
    var flyoutDiv = currentLi.data('flyout');
    //Modified for ink and toner as part of BP2
    if(currentLi.attr("id") =="flyout_inkandtoner_FO" && !freqItemsLoaded ){
    	
    	$.ajax({
			url: propertyValues.POST_DOMAIN+'inkandtonerflyout?DC_lang='+propertyValues.DEF_LANG_ID+'&storeId='+propertyValues.DEF_STORE_ID+'&catalogId='+propertyValues.DEF_CATALOG_ID,
			type: 'GET',
			dataType: 'text',
			timeout: globalTimeout,
			success: function(returntxt){
    		 if(!freqItemsLoaded){ 
				freqItemsLoaded= true;
      		    if(returntxt!= null && trim(returntxt).length>0 ){
				var flyOutId=(currentLi.attr("id").replace(/(FO)/g,"div"));
				var returnDiv=$("#" + flyOutId);
				var flywrap = returnDiv.find('div.flywrap');
			         
			            flywrap.prepend(returntxt);                                                      
			            STAPLES.Personalization.prepCarousel('matchTool_Carousel',false);  
			}
    		    }

			}
    	});
    	
    	
    }
	if (ajaxFlyouts){
        if ( ! flyoutDiv) {
            //find the content in the footer
            var flyOutId=(currentLi.attr("id").replace(/(FO)/g,"div"));
            var returnDiv=$("#" + flyOutId);
           
            //cache it
            currentLi.data('flyout',returnDiv);
            //append it
            currentLi.append(returnDiv);
        } else {
            //append the cached content
            currentLi.append(flyoutDiv);
        }
        showFlyOut(currentLi);
		
    } else {
        //find and cache an existing flyout - for hard coded non-ajax content already existing on page
        if ( ! flyoutDiv) {
            currentLi.data('flyout',currentLi.find("div.flyout"));
			flyoutDiv = currentLi.data('flyout');
        }
		
        //if there is no flyout, go ajax it
        if (! $(flyoutDiv)[0]) {
        //do nothing
        } else {
            //show the current flyout
            showFlyOut(currentLi);
        }
    }
}

function closeShowAllProducts() {
    if ( !sidenavFlyoutOpenState ) {
        sidenavOpenState = false;
			//remove iframe from behind show all products div
			if(isMsie6) {
                $('#sdbrGlobal .showuliframe').remove();
        }
        showap.removeClass('showapOn');
        showallprodsUl.removeClass('showul');
        //CR71257 - requirement was changed AGAIN to do this
        $(document).unbind('click.showap');
    }
	
}	


function closeFlyout (liObj) {
    liObj.removeClass('selected');
    
    // if the autocomplete dropdown is open, don't close the ink toner flyout
    if (propertyValues.inkTonerAutocomplete == 'ON' && liObj.attr("id") == "flyout_inkandtoner_FO") {
        // if autocomplete dropdown open in flyout do no close flyout
        var open = false;
        $(".ac_results").each(function() {
            if ($(this).css("display") == "block")
                open = true;
        })
        if (open) {
            return;
        }
    }
    
    var hasdata = liObj.data('flyout');
    if (hasdata) {
        hasdata.addClass('hide');
        if (ajaxFlyouts){
            //move the content back to the footer
            footerNavHolder.append(hasdata);
        }
        sidenavFlyoutOpenState = false;
    } else {
        sidenavFlyoutOpenState = false;
    }
		
		if(isMsie6) { //removes iframe under flyouts
			$('#showallprods .flyoutiframe').remove();
		}
}
	
function showFlyOut(liObj) {
    sidenavFlyoutOpenState = true;
	
    //hide all flyouts
    leftnavLi.find("div.flyout").addClass('hide');

    var flyoutDiv = liObj.data('flyout');

    //lazy load images once per flyout
    if (! liObj.data('lazyloaded') ) {
        flyoutDiv.find("img[src$='"+propertyValues.BACKGROUND_IMAGE_PATH+"blank.gif'][name]").each( function() {
            $(this).attr('src',$(this).attr('name'));
            $(this).removeAttr('name');
        });
        liObj.data('lazyloaded',true);
    }
		
    //cache info about the liObj
    if (! liObj.data('positioninfo') ) {
        var liObjPosData = {
            offsetTop: liObj.offset().top,
            positionTop: liObj.position().top,
            totalHeight: liObj.totalHeight(),
            flyoutDivTotalHeight: flyoutDiv.totalHeight(),
            divitObj: flyoutDiv.find('span.divit')
        };
        liObj.data('positioninfo',liObjPosData);
    } else {
        var liObjPosData = liObj.data('positioninfo');
    }

    //var leftnav = liObj.parent();
    //leftnav is at 38 hard code for efficiency instead of $(leftnav).position().top
    var leftnavposition = 41;
		
    //start top
    var destPos = -1;
		
    var relTopViewPort = $(window).scrollTop() - liObjPosData.offsetTop + liObjPosData.positionTop;

    //don't allow flyout above viewport
    if ( relTopViewPort + 10  > destPos ) {
        destPos = relTopViewPort + 10;
    }

    //don't allow flyout above leftnav
    if ( pageId != 'home' && leftnavposition > destPos) {
        destPos = leftnavposition + 5;
    }

    //don't allow top of flyout below top of the LI
    if ( liObjPosData.positionTop < destPos) {
        destPos = liObjPosData.positionTop - 10;
    }

    //don't allow bottom of flyout above bottom of LI
    if ( (destPos + liObjPosData.flyoutDivTotalHeight) < (liObjPosData.totalHeight + liObjPosData.positionTop + 6) ) {
    	//move the flyout down a couple of pixels (more for IE7) so that the new border style works better
    	if(getIEVersion() == 7){
	    	destPos = (liObjPosData.totalHeight + liObjPosData.positionTop + 2) - liObjPosData.flyoutDivTotalHeight;
    	}else{
        	destPos = (liObjPosData.totalHeight + liObjPosData.positionTop + 12) - liObjPosData.flyoutDivTotalHeight;
    }
    }

    var divitPos = liObjPosData.positionTop - destPos - 10 + (liObjPosData.totalHeight / 2);
		
    //flyoutDiv.find('span.divit').css('top',divitPos); -- perf tuned for IE
    liObjPosData.divitObj.attr('style','top:'+divitPos+'px');

    //flyoutDiv.css('top', destPos ).removeClass('hide'); -- perf tuned for IE
    flyoutDiv.attr('style','top:'+destPos+'px').attr('class','flyout');
	
    if (isMsie6 || isMsie7) {
        //poke closer with a stick
        liObj.find("a.closer").attr('style','right:5px');
    }

		//fixes combo box z-index issue in ie6 by placing an iframe beneath the flyout
		if(isMsie6) {
			var flyoutAd = flyoutDiv.find('.bnrnav img').eq(0);
			if(flyoutAd.length > 0 && flyoutAd.height() <= 5) { //check height of lazy loaded images to see if the image is loaded
				foHeight = flyoutDiv.outerHeight() + 90; //=flyoutAd.height() once its loaded
			} else {
				foHeight = flyoutDiv.outerHeight();
			}
			if(pageId =='home') { //corrects an uncorrected double float margin & positioning offset on the home page
				var leftPos = parseInt(flyoutDiv.css('left')) * 2;
				var topPos =  parseInt(flyoutDiv.css('top')) + 46;
			} else {
				var leftPos = parseInt(flyoutDiv.css('left'));
				var topPos =  parseInt(flyoutDiv.css('top'));
			}
			$('#showallprods').prepend('<iframe frameborder="0" class="flyoutiframe" style="height:'+foHeight+'px;  border:none; width:'+flyoutDiv.outerWidth()+'px; position:absolute; left:'+leftPos+'px; top:'+topPos+'px; z-index:1;"></iframe>');
		}
		
}


//////////
// Event capture
//////////
	
// Capture enter in forms
function formskeypress(e) {
    if (window.event) {
	        if (window.event.keyCode == 13 && window.event.srcElement.form.action) {
                if (!window.event.srcElement.form.enteroverride) {
	                //added check for main search form since otherwise
	                //autocomplete submit functionality gets overridden by this function
	                if (window.event.srcElement.form.name != "hsearch") {
	                    window.event.returnValue = false;
                    formSub(window.event.srcElement.form.name);
                } else {
	                    // functionality from formSub for search
	                    document.body.style.cursor='wait';
	                    status=propertyValues.loading;
	                    if (isKiosk) {
	                        loadlink();
                }
            }
	            } else {
	                window.event.returnValue = false;
	                eval(window.event.srcElement.form.enteroverride.value);
        }

	        }
    } else {
	        if (e.which == 13 && e.target.form.action) {
                if (!e.target.form.enteroverride) {
	                if (e.target.form.name != "hsearch") {
	                    e.preventDefault();
                    formSub(e.target.form.name);
                } else {
	                    // functionality from formSub for search
	                    document.body.style.cursor='wait';
	                    status=propertyValues.loading;
	                    if (isKiosk) {
	                        loadlink();
                }
            }
	            } else {
	                e.preventDefault();
	                eval(e.target.form.enteroverride.value);
        }

    }
}
	}
	
// Hook up enter capturing
function formsenterhook() {
    if (document.getElementById) {
        if (document.captureEvents) document.captureEvents(Event.KEYPRESS);
        for (f=0; f < document.forms.length; f++) {
            for (i=0; i < document.forms[f].elements.length; i++) {
                if (document.forms[f].elements[i].type != "textarea" ) {
                    document.forms[f].elements[i].onkeypress = formskeypress;
                }
            }
        }
        var a = document.getElementsByTagName("a");
        for(i=0; i < a.length; i++) {
            if ( a[i].className.match(/^d\d+$/) ) {
                a[i].onkeypress = buttonskeypress;
            }
        }
    }
}

STAPLES.Onload.addLoadEvent(formsenterhook);
	
// Capture spacebar in buttons
function buttonskeypress(e) {
    if (window.event) {
        if (window.event.keyCode == 32) {
            window.event.returnValue = false;
            if (window.event.srcElement.href > '') window.location = window.event.srcElement.href;
        }
    } else {
        if (e.which == 32) {
            e.preventDefault();
            if (e.target.href > '') window.location = e.target.href;
        }
    }
	
}

//////////
// Kiosk
//////////

var isKiosk = false;
if (STAPLES.Cookies.getCookie('KIOSK_NBR') || STAPLES.Cookies.getCookie('STORE_NBR')) {
    isKiosk = true;
    //Added to prevent auto refresh due to document.write; SKU Page redesign
    if(document.getElementById('skuskuset')!= 'undefined' && document.getElementById('skuskuset')!= null){
    $(document).ready(function() {
	    var e = document.createElement('script');
	    e.setAttribute('type', 'text/javascript');
	    e.setAttribute('src', propertyValues.JAVASCRIPT_PATH+'kiosk.js');
	    document.getElementById('skuskuset').appendChild(e);	
    });
    }
    else{
		document.write('<scr'+'ipt src="'+propertyValues.JAVASCRIPT_PATH+'kiosk.js" type="text/javascript"></scr'+'ipt>');
}
}

//////////
// Forms
//////////
	
// set field to 1 on focus
function qtyOne(thefield) {
	
    if (thefield.value=="") thefield.value = "1";
    thefield.select();
}
	
// clear template value on focus
function autoclear(thefield,thedefault) {
    if (thefield.value==thedefault) thefield.value = "";
}
	
// reset the form 
function formReset(fName) {
    eval("document." + fName + ".reset();");
}
	
// submit with action (action deprecated) + only allows one submit per form 
// w/ hourglass cursor to fix IE6 progress bar bug and status message
var submittedformcount = 0;
function formSub(fName,fAction) {
    if (submittedformcount == 0) {
        submittedformcount++;
        if (fAction > "") eval("document." + fName + ".action = '" + fAction + "';");
        // next line is for lowercasing search terms
        eval("if(typeof document." + fName + ".keyword != 'undefined') {document." + fName + ".keyword.value = document." + fName + ".keyword.value.toLowerCase();}");
        eval("document." + fName + ".submit();");
        document.body.style.cursor='wait';
        status=propertyValues.loading;
        if (isKiosk) {
            loadlink();
        }
    }
}
	
	
/*
	* This method will be used for all JS actions that need to set the action of a form.
	* This will also be used when a button is no longer supposed to function, and should set the action of the form to an empty string.
	* The formElement should be called using the following notation, document.[formName]
	*/
function setFormAction(formElement) 
{    
    // if (document.layers && document.layers[objectId] != null) document.layers[objectId].visibility = Value;
    if ( this != null && formElement.action != "" )
    {
        formElement.action="";
    }
}
	
/**
	* This function is used disable the anchor tag (button) from actually submitting again
	**/
		
function disableSrcForElement( formElement) 
{
    if ( formElement != null && formElement.src != "" )
    {
        formElement.src="";
    }
}
	
//THIS METHOD REPLACES THE SUBMITTED ORDER PAGE IN THE HISTORY WITH THE HOMEPAGE
function redirect(url) {
    location.replace(url);
}	
	
/**
	* This Method clears the value of the passed parameter element
	*/
function clearElementValue( formElement )
{
    if ( formElement != null ){
        formElement.value="";
    }
}
	
	
/**
	* This Method was moved from itmerow1inc.jsp
	*/
function addSingleItemtoCart(url, qtyElement, partNumElement, catentElement, cmAreaElement,qtyCheckFlag) {
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
	deleteCertonaCookie();
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
    if(url != null && qtyElement != null && partNumElement != null && catentElement != null && eval(qtyElement).value != '') {
        var params = '&' + eval(qtyElement).name + '=' + eval(qtyElement).value
        + '&' + eval(partNumElement).name + '=' + eval(partNumElement).value
        + '&' + eval(catentElement).name + '=' + eval(catentElement).value
        + '&' + eval(cmAreaElement).name + '=' + eval(cmAreaElement).value;
			
        window.location.href = url + params;
    }
}

function addSingleItemtoCartFromClassPage(position,maxLeadTime,minLeadTime,partNumber,catentryId) {
   
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
	deleteCertonaCookie();
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
	partNumberIdentifier = 'document.ClassForm.partNumber_' + position;
	cartOverlaySwitch = false;
	quantityIdentifier = 'document.ClassForm.quantity1_' + position;
	var cmArea=document.ClassForm.cmArea.value;
	var quantity=eval(quantityIdentifier).value;
	addToCartFromClassURL = unescape(initialClassURL);
	
   if (cartOverlaySwitch == 'true') {
        addToCartFromClassURL = unescape(initialClassURL);
        quantityIdentifier = 'document.ClassForm.quantity_' + position;
        cmAreaIdentifier = 'document.ClassForm.cmArea_'+ position;
        addToCartFromClassURL = addToCartFromClassURL + '&ajaxCall=true';
        addToCartFromClassURL = addToCartFromClassURL + '&ST_maxLeadTime_1='+ maxLeadTime;
        addToCartFromClassURL = addToCartFromClassURL + '&ST_minLeadTime_1='+ minLeadTime;
        addToCartFromClassURL = addToCartFromClassURL + '&quantity_1='+eval(quantityIdentifier).value;
        addToCartFromClassURL = addToCartFromClassURL + '&partNumber_1='+partNumber;
        addToCartFromClassURL = addToCartFromClassURL + '&catentryId_1='+catentryId;
        addToCartFromClassURL = addToCartFromClassURL + '&cmArea_1='+document.ClassForm.cmArea.value;
        cartOverlay(addToCartFromClassURL);
    } else {
        if (position!= null) {
            addInputFieldAndValueToForm("ST_maxLeadTime_1",maxLeadTime,"ClassForm");
            addInputFieldAndValueToForm("ST_minLeadTime_1",minLeadTime,"ClassForm");
            addInputFieldAndValueToForm("URL","yourorder","ClassForm");
            quantityIdentifier = 'document.ClassForm.quantity_' + position;
            cmAreaIdentifier = 'document.ClassForm.cmArea_'+ position;
            addInputFieldAndValueToForm("quantity_1",eval(quantityIdentifier).value,"ClassForm");
            addInputFieldAndValueToForm("partNumber_1",partNumber,"ClassForm");
            addInputFieldAndValueToForm("catentryId_1",catentryId,"ClassForm");
            addInputFieldAndValueToForm("cmArea_1",document.ClassForm.cmArea.value,"ClassForm");
            document.ClassForm.action = propertyValues.POST_DOMAIN+"StaplesAddToCart";
            document.ClassForm.submit();
        }
}
}

/**
	*This method adds a new input hidden field to a specified form in the document.
	*/
function addInputFieldAndValueToForm(fieldName,fieldValue,formName) {
    var field = document.createElement("input");
    field.setAttribute("type","hidden");
    field.setAttribute("name",fieldName);
    field.setAttribute("value",fieldValue);
    //add new element to the existing form
    document.getElementById(formName).appendChild(field);
}

	
/**
	* This Method is required for reqbndlchoice.jsp
	*/
	
function addSingleItemtoCartForReqBndl(fName,counter,element ) {
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
	deleteCertonaCookie();
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
    if(fName != null && counter != null && element != null) {
        formName=eval( "document." + fName);
        formElement=eval( "document." + fName + "." + element );
        formElement.value=counter;
        formName.submit();
			
			
    }
}
	
	
/**
	* This method adds an item to a favorites list
	*/
function addSingleItemToFavorites( destUrl, partNumber, catEntryId ) {
    currentUrl = window.location;
    currentUrl = escape( currentUrl );
    var params = '&partNumber=' + partNumber + '&catentryId=' + catEntryId + '&errorUrl=genericerror.jsp&rUrl=' + currentUrl;
    var url = destUrl + params;
    window.location.href = url;
}
	
/**
	* This method adds an item to a favorites list in class page
	*/
function addSingleItemToFavoritesInClassPage(partNumber, catEntryId) {
    currentUrl = window.location.href;
    addInputFieldAndValueToForm("partNumber",partNumber,"ClassForm");
    addInputFieldAndValueToForm("catentryId",catEntryId,"ClassForm");
    addInputFieldAndValueToForm("errorUrl","genericerror.jsp","ClassForm");
    addInputFieldAndValueToForm("rUrl",currentUrl,"ClassForm");
    document.ClassForm.action = propertyValues.POST_DOMAIN+"StaplesAddToFavorite";
    document.ClassForm.submit();
}
	
function setValueFromDDL(fName, optDDLName ) {
    //derive the action from the selected value in the DDL
    box = eval( "document." + fName + "." + optDDLName );
    actionURL = box.options[box.selectedIndex].value;
   
    formSub(fName,actionURL);
}

//////////
// Popups
//////////
	
// execute popup
var popArray = new Array(8);
for (i=0; i <popArray.length; ++i) {
    popArray[i] = new Array(8);
}
//					scrollbars				titlebar			width				height
popArray[0][0] = 'yes';
popArray[0][1] = 'no';
popArray[0][2] = 415;
popArray[0][3] = 330;
popArray[1][0] = 'yes';
popArray[1][1] = 'no';
popArray[1][2] = 630;
popArray[1][3] = 486;
popArray[2][0] = 'no';
popArray[2][1] = 'no';
popArray[2][2] = 570;
popArray[2][3] = 460;
popArray[3][0] = 'yes';
popArray[3][1] = 'yes';
popArray[3][2] = 800;
popArray[3][3] = 580;
popArray[4][0] = 'no';
popArray[4][1] = 'no';
popArray[4][2] = 590;
popArray[4][3] = 590;		//	see price in cart
popArray[5][0] = 'no';
popArray[5][1] = 'no';
popArray[5][2] = 760;
popArray[5][3] = 505;		// 	s7 more views & tours
popArray[6][0] = 'no';
popArray[6][1] = 'no';
popArray[6][2] = 504;
popArray[6][3] = 324;		// 	store lookup map
popArray[7][0] = 'no';
popArray[7][1] = 'no';
popArray[7][2] = 660;
popArray[7][3] = 722;		// 	seen in Favourite list
	
		
function pop(pURL, pName, sIndex) {
    var browserAvailWidth = window.screen.availWidth;
    var browserAvailHeight = window.screen.availHeight;
    var popupLeft = (((browserAvailWidth / 2) - (popArray[sIndex][2] / 2)) - 5);
    var popupTop = (((browserAvailHeight / 2) - (popArray[sIndex][3] / 2)) - 5);
    newPop = open(pURL,pName,'directories=no,scrollbars=' + popArray[sIndex][0] + ',status=no,toolbar=no,titlebar=' + popArray[sIndex][1] + ',location=no,menubar=no,resizable=no,width=' + popArray[sIndex][2] + ',height=' + popArray[sIndex][3] + ',left=' + popupLeft + ',top=' + popupTop);
    newPop.focus();
}
	
// launch link in new window
function newwindow(newUrl) {
    window.open(newUrl);
}
	
// close popup 
function popclose() {
    self.close();
}
	
//just for partpopup.jsp and leavingsitepopup, changing it here for reusability
	
function updateOpener(url) {
    opener.location.href = url;
    popclose();
}

//just for leavingsitepopup.jsp, adding it here for reusability

function LeavingSitePopup(url) {
    //window.open(url);
    var sIndex = 2;
    var browserAvailWidth = window.screen.availWidth;
    var browserAvailHeight = window.screen.availHeight;
    var popupLeft = (((browserAvailWidth / 2) - (popArray[sIndex][2] / 2)) - 5);
    var popupTop = (((browserAvailHeight / 2) - (popArray[sIndex][3] / 2)) - 5);
    newPop = open(url,'leavingsitepopup','directories=no,scrollbars=' + popArray[sIndex][0] + ',status=no,toolbar=no,titlebar=' + popArray[sIndex][1] + ',location=no,menubar=no,resizable=no,width=' + popArray[sIndex][2] + ',height=' + popArray[sIndex][3] + ',left=' + popupLeft + ',top=' + popupTop);
    newPop.focus();
}

//////////
// Printing
//////////

// print this page
function printpage() {
    window.print();
}
	
//print overlay only
//require jqprint plugin
//require div id divOverlay
function printOverlay()
{
$('#divOverlay').jqprint();
} 
	
//////////
// Browser specific stuff
//////////
	
var userAgent = navigator.userAgent.toLowerCase();
// Detect IE, some special effects are IE specific/IE ignored
var isMsie = /msie/.test( userAgent ) && !/opera/.test( userAgent );
var isMsie6 = /msie 6/.test( userAgent ) && !/opera/.test( userAgent );
var isMsie7 = /msie 7/.test( userAgent ) && !/opera/.test( userAgent );	
var isFF2 = /firefox/.test (userAgent) && /2\.0/.test( userAgent );
	
//Firefox 2 weird footer behavior
function resetFooter() {
    if (isFF2) {
        setTimeout ( function() {
            var footerDiv = document.getElementById('ftr');
            footerDiv.style.visibility = 'hidden';
            footerDiv.style.position = 'absolute';
            footerDiv.style.top = '0';
            setTimeout ( function () {
                var footerDiv = document.getElementById('ftr');
                footerDiv.style.position = 'relative';
                footerDiv.style.visibility = 'visible';
            }, 100 );
			
        }, 1000 );
    }
}
	
//IE UI behaviours can go here
if (isMsie) {
    STAPLES.Onload.addLoadEvent(function() {
        //IE specific stuff
        $('div.p01 select').hover(
            function(){
                $(this).css('width','auto');
            },
            function(){
                $(this).css('width','');
            }
            );
    });
}




// As part of BP2 changed the method.Set field to 1 on focus
function qtyOne(thefield,partNumber,catentryid) {	
	if(partNumber==null){
	if (thefield.value=="") thefield.value = "1";
	thefield.select();
	}else{
		if (thefield.value=="") thefield.value = "1";
		thefield.select();
	updateShopCartParams(thefield,partNumber,catentryid);
	}	
}
/*  As part of BP2.This method updates the required parameters,which is set as hidden variable in the calling jsp (itemrow1inc.jsp)and these are passed to addtocart method,addtocartwithoverlay
in case of multiple item addition*/
function updateShopCartParams(quantity,selectedPartNumber,selectedCatentryId,suppAccTabFlag){
var selectedQuantity=null;
var id = $('#partNumberList').val();

if(typeof id =="undefined" || id ==""){	
//creating hidden variables to store the details of items added
$('<input>').attr({  
	type: 'hidden',  
	id: 'partNumberList',  
	name: 'partNumberList' }).appendTo(document.body); 
$('<input>').attr({  
	type: 'hidden',  
	id: 'quantityList',  
	name: 'quantityList' }).appendTo(document.body); 
$('<input>').attr({  
	type: 'hidden',  
	id: 'catentryIdList',  
	name: 'catentryIdList' }).appendTo(document.body); 

	
}if(suppAccTabFlag){
	selectedQuantity=quantity;
}else{
	selectedQuantity=quantity.value;
}

//Retreiving the details from hidden variables set in jsp in case of multiple item addition	
var partNumberList=$('#partNumberList').val();
var quantityList=$('#quantityList').val();
var catentryList=$('#catentryIdList').val();


//flag used to check if that partNumber is already present in the list
var partNumberInListflag=false;
var posOfDel=0;
//check if catentryIdList length <1,Then just assign the  value to variables(no appending operation needs to be done to previously chosen values).
if(catentryList.length<1){
	partNumberList=selectedPartNumber;
	quantityList=selectedQuantity;
	catentryList=selectedCatentryId;
	
}
//appending operation need to be done to previously selected values, if catentryIdList>1,in case of multiple items addition 
else {
	var splitpartNumberList = partNumberList.split("|");
	var splitquantityList = quantityList.split("|");
	var splitcatentryList = catentryList.split("|");
	for(i = 0; i < splitpartNumberList.length; i++){
		//If a particular item is already chosen, then update the quantity only. (Its details is already in list).
		if(splitcatentryList[i]==(selectedCatentryId)){
			partNumberInListflag=true;
			posOfDel=i;
			if(selectedQuantity>0){
				splitquantityList[posOfDel]=selectedQuantity;
			}
			//If user enters the quantity as zero, then remove that particular set of values from the corresponding lists.
			else if (selectedQuantity =="0" || selectedQuantity==""){
				splitpartNumberList.splice(posOfDel,1);
				splitquantityList.splice(posOfDel,1);
				splitcatentryList.splice(posOfDel,1);
			}
			break;
		}
	}
	//If partNumber is not already present in List,then append to previously chosen values.
	if(!partNumberInListflag){
		partNumberList=partNumberList+'|'+selectedPartNumber;
		quantityList=quantityList+'|'+selectedQuantity;
		catentryList=catentryList+'|'+selectedCatentryId;
		
	}else{
		partNumberList=splitpartNumberList.join('|');
		quantityList=splitquantityList.join('|');
		catentryList=splitcatentryList.join('|');
	}
}
//setting the values back to the hidden variable , which is used in addtocartwithoverlay()
$('#partNumberList').val(partNumberList); 
$('#quantityList').val(quantityList); 
$('#catentryIdList').val(catentryList); 

}
//As part of BP2, created a new method for zipcode check 
function zipCodeCheck(){
	return STAPLES.Cookies.getCookie('zipcode');
}
//As part of BP2, created a new method to retrieve details of multiple items
function retrieveDetailsForMultipleItems(partNumberSupp,catentryIdSupp,quantitySupp){
		var params="";
	 //variables are populated in jsps with add to cart button,using method updateShopCartParams()
		var partNumberList=$('#partNumberList').val();
		var quantityList=$('#quantityList').val();
		quantity=quantityList;
		var catentryList=$('#catentryIdList').val();
		//if quantity is not entered then addtocart operation should not occur,then return.
		if(typeof quantity =="undefined" || quantity ==""){
		return ;
		}
	      //Splitting  the value of hidden variables and storing it in arrays
	      var splitpartNumberList = partNumberList.split("|");
	      var splitquantityList = quantityList.split("|");
	      var splitcatentryList = catentryList.split("|");
	      var count=0;
	      //creating parameters which needs to be passed along with url.
	      for(i = 0; i < splitpartNumberList.length; i++){
	    	count = i+1;
	    	 //handling bad quantity entered scenario
	    	 if(isNaN(parseInt(splitquantityList[i])) ||  parseInt(splitquantityList[i])==0){	
	    		 splitquantityList[i]=1;
	 		}
	    	 
	         params= params + '&' + 'partNumber' + '_'+count+'=' + splitpartNumberList[i]+'&' + 'quantity'+ '_'+count+'=' + splitquantityList[i]+'&'+'catentryId'+'_'+count+'='+splitcatentryList[i];
	      }

	      if( typeof partNumberSupp !="undefined" && partNumberSupp !=""){
	    	   count=count+1;
	    	  params= params + '&' + 'partNumber' + '_'+count+'=' + partNumberSupp+'&' + 'quantity'+ '_'+count+'=' + quantitySupp+'&'+'catentryId'+'_'+count+'='+catentryIdSupp;
	      }
	   
	      return params;
}
//****Added as part of ST-239***//
function assignVariantPartnumber(partnumber){
	variantPartnumber=partnumber;
}
//As part of BP2, On click of 'AddToCart' button function addToCartWithOverlay() is called.
function addToCartWithOverlay(url,id,partNumber,catentryId,quantity,yourOrderOverlayFlag) {
	//Call s_prodSlot for omniture tracking.
	var searchResults ="";
	if($(quantity).closest("#searchresultset").length != 0){
		searchResults = "searchitems";
		if(document.getElementById(catentryId+"1") != null && document.getElementById(catentryId+"2") != null){
			s_prodSlot(document.getElementById(catentryId+"1").value, document.getElementById(catentryId+"2").value ) ;
		}
	}
	//Call s_previouslyOrderedItemSearchClick for omniture tracking
	if($(quantity).closest("#previouslyPurchasedTab").length != 0){
		s_previouslyOrderedItemSearchClick();
	}
	var skuQuantityBlank = false;
    // Added as part of ST 310 for Certona identification.
    var urlAdditionalParam="";
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
	//reseting and setting externalize cookie to track certona recommendations
    deleteCertonaCookie();
    if(url.indexOf('certonaRecommendationTrackingSwitch=ON')!=-1){
      STAPLES.Cookies.setCookie("externalize","certona");
    }
    if(typeof quickviewCertonaRecommendationTrackingSwitch!= "undefined" && quickviewCertonaRecommendationTrackingSwitch=='ON'){
      quickviewCertonaRecommendationTrackingSwitch='OFF';
      STAPLES.Cookies.setCookie("externalize","certona");
    }
    //Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
	//Added for performance testing
	 var t_addToCartOverlay_start =  (new Date()).getTime();
	 //Added as part of ST-239 . This is to identify the variant for each partnumber.
	 if ( typeof(variantPartnumber) != "undefined" ){
		 variantPartnumber=partNumber;
	 }
	var popUpPosition="";
	//Defined a new variable to set omniture values for atc done from personalization carousel in ATC overlay
	var checkCarouselInOverlay="";
	//checking if user does addtocart from upper part of sku page after updating quantity field of suppliers and accesories tab(then primary sku and accessories should be added to cart)
	var suppliersAndAccessoriesTab=false;
	var suppliersAndAccessories=$('#partNumberList').val();
	//if true ,then add the primary sku and accessory sku to cart, by calling updateShopCartParams()
	if(suppliersAndAccessories != null && suppliersAndAccessories!="" && typeof suppliersAndAccessories != "undefined"  && id=='skuitem'){	
		var quantity2=retrieveQuantity(id,catentryId,quantity,partNumber);	
		
		suppliersAndAccessoriesTab=true;
	}
	//checking if add to cart is done from qobin overlay.
	
	var yourOrderOverlay=document.getElementById('yourorderoverlay');
   //when user does atc from personalization carousel in qobin overlay ,close qobin overlay and then call addtocartwithoverlay again
	if(yourOrderOverlay != null && typeof yourOrderOverlay != "undefined" && yourOrderOverlay.value =='true'){
		var overlayQuantity=retrieveQuantity(id,catentryId,quantity,partNumber);
		 parent.closeyourorderoverlay(url,id,partNumber,catentryId,overlayQuantity); 
	}
	
	//defining the style for the mask 
	popUpPosition=styleForAddToCart();
	//Pop up with 'please wait message'.
	//createPopup(propertyValues.AddToCart.PleaseWait,propertyValues.AddToCart.waitMessage, popUpPosition, false);
	//retrieving the value to check if addtocart is done from an overlay page
	var overlayFlag=document.getElementById('overlayFlag');

 	var params="";
 	var ajaxAddToCart ="true";
 	//to retrieve zipcode
 	var zipcode=zipCodeCheck();
 	//add to cart is coming from page where quantity is not defaulted(in case of simultaneously adding multiple items to cart)
 	if(partNumber==null ){
 		
 	params=retrieveDetailsForMultipleItems(); 
 	}else if(suppliersAndAccessoriesTab && id=='skuitem'){
 		
 		var quantity2=retrieveQuantity(id,catentryId,quantity,partNumber);
 		params=retrieveDetailsForMultipleItems(partNumber,catentryId,quantity2);
 		if(typeof initialAddToCartURL !="undefined" && initialAddToCartURL !=""){			
				url = unescape(initialAddToCartURL);
				}
 	}
	
//partNumber is not null ie it comes from class or sku pages etc
	else{
		if(yourOrderOverlayFlag){
			params= params + '&' + 'partNumber' +'=' + partNumber+'&' + 'quantity'+'=' +quantity +'&'+'catentryId'+'='+catentryId;
		}
		else{
		//retrieving quantity 	
		var quantity2=retrieveQuantity(id,catentryId,quantity,partNumber);
			if(typeof initialAddToCartURL !="undefined" && initialAddToCartURL !=""){			
			url = unescape(initialAddToCartURL);
			} 
    	 params= params + '&' + 'partNumber' +'=' + partNumber+'&' + 'quantity'+'=' +quantity2 +'&'+'catentryId'+'='+catentryId;    
    	 
		}
	}
 
 /* Condition added for ST 465, Support Track 5 - Display "Please add a Quantity" Message when adding from Favorites List or Config Bundle or Easy ReOrder Page. 
    All these pages have Single Add to Cart Button for multiple items and thus var 'params' will be null or undefined */
 	if(params == null || params == "" || params == "undefined"){
 			skuQuantityBlank = true;
 		}
		
 	// Show the wait pop up message for Add to cart Overlay for all the pages except when we are adding blank Quantity from Favorites List or Config Bundle or Easy ReOrder Page
 	if(!skuQuantityBlank){
			createPopup(propertyValues.AddToCart.PleaseWait,propertyValues.AddToCart.waitMessage, popUpPosition, false);
		}

	var variantId="";
		if ( typeof(variantPartnumber) != "undefined" ){
			variantId= "variant_cart_overlay_box_"+variantPartnumber;
		}
		var recruleId= document.getElementById(variantId);
		var recrule="0";
		if((typeof(recruleId)!= "undefined") && (null != recruleId)){
			recrule = recruleId.value;
		}	
	//Checking if zipcode is present.If not,then redirect to zipcode page.If quantity is 0, then redirect to yourorder page.
 	if(typeof zipcode  =="undefined" || zipcode =="" || quantity2== 0){
		
		window.location.href=url + params;
	}
 	else{
 		//Checking if overlay switch is ON.It ON ,then display addtocartoverlay.If not then redirct to yourorder page
		if (propertyValues.cartOverLayFlag == "ON"){
			 var pageRefreshFlag=document.getElementById('pageRefreshFlag');
    		 //Checking if atc done from personalization carousel in ATC overlay for omniture requirement
    		  if(id=='carouselitem'){
    			  if(typeof pageRefreshFlag != "undefined" && pageRefreshFlag != null && pageRefreshFlag.value =='true') {
    				  checkCarouselInOverlay=true;  
    			  }  
    		  } 
    	// addToCart is selected from an overlay page.First close overlay before displaying AddToCart overlay
        	  if(typeof overlayFlag != "undefined" && overlayFlag != null && overlayFlag.value =='true')
                { 
        		  removeMask();
                }
   
     // In case of blank quantity field, we will show the "Please add a Quantity" Message from Favorites List or Config Bundle or Easy ReOrder Page (Pages which have Single Add to Cart Button for multiple items)
     // In all other pages, the Ajax call will be made.	  
      		if(skuQuantityBlank)
			{  
      			createPopup(propertyValues.AddToCart.Attention,propertyValues.AddToCart.addToCartQuantityMessage,popUpPosition, false);
			}
      		else{
        	  //ajax call to staplesaddtocart command
            $.ajax({
				url: url + params+'&'+'ajaxflag'+'='+ajaxAddToCart,
				type: 'POST',
  				dataType: 'xml',
  				// Added empty data {} to ajax call for the addtocart issue in FF 3.0 through net
  				data: '  ',
				timeout: globalTimeout,
  				 error: function(x, t, m) {
            	
              	$("#popup").remove();	
              	//defining the style for the mask with 'please wait message'.
              	popUpPosition=styleForAddToCart();
  					 if(t==="timeout") 
  					{                  
  						createPopup(propertyValues.AddToCart.Attention,propertyValues.AddToCart.addToCartTimeOutMessage, popUpPosition, true);
  	                } 

  					else {
  	                    createPopup(propertyValues.AddToCart.Attention,propertyValues.AddToCart.addToCartErrorMessage,popUpPosition, true);
  	                }
				},
  				success: function(returnXML){	
				
  						var type="";
  						var errorUrl="";
  						////////////////////////////////////////////////////////////////////////////////////////
  						//						XML is expected as
  						//							<xml>	
  						//								<checkForRedirection>	
  						//								<type>basketBuilder/errorCondition</type>
  						//								<errorRedirectUrl>errorUrl</errorRedirectUrl>
  						//								</checkForRedirection>		
  						//							</xml>
  						/////////////////////////////////////////////////////////////////////////////////////////
  						$(returnXML).find('checkForRedirection').each( function(){
  							errorUrl=$(this).find('errorRedirectUrl').text();
  							type=$(this).find('type').text();						
  						})
  						//Checking if error url is present
  						if( errorUrl!= null && trim(errorUrl).length>0 ){
  							//If normal error condition like OOS etc, then appending of serverName etc needs to done before redirection
  							if (type === 'errorCondition'){
  								 window.location.href = 'http://'+  serverName + propertyValues.POST_DOMAIN +errorUrl;
  			                   }else{
  			                	   //in case of basketbuilder the appending of servername and '/office/supplies' is not needed
  								window.location.href = errorUrl;
					}
  						}
					//Call ajax to cartoverlay.jsp for displaying AddToCart overlay
					else{
						var page=resxPageId;
						var url = propertyValues.POST_DOMAIN+'cartoverlay?pageId='+page+params;
						url = 'http://' + serverName + url;
  						 popUpPosition= styleForAddToCart();
						
  							//making ajax call to cartoverlay.jsp
  						 //Changes for ST-239
  						if(searchResults == "searchitems"){
  							id= "searchitems";
  						}
  						
  							displayCartOverlay(url,params,popUpPosition,id,checkCarouselInOverlay,partNumber,recrule);
  			
  						}
  						}			
  					});
		}
		}
  				//cartoverlay flag is false.So overlay neednot be displayed(Redirection to yourorder page occurs).
  			else{
  					window.location.href=url + params;
  			}
  			}
 	 var t_addToCartOverlay_end = new Date().getTime();   
 	  if( alertAddToCartOverlay){
          var etime=t_addToCartOverlay_end-t_addToCartOverlay_start;            
         $("#debug").append('<br /> PerfAddtocartOverlay =' + etime);
    }
		}

//As part of BP2,created a new method to check if a particular parent div exists or not.If it does not exists it returns null 
function find_pid(currentDiv, parentid){
	var p=document.getElementById(currentDiv);
	if(p!=null && p!="undefined"){
		while(p=p.parentNode){
			// check if parent div exits
			if(typeof p.id!="undefined" && p.id!=null){
				var  index=p.id.indexOf(parentid);
				//if parent div =,which is the div of featured items
				if(p.id && index!=-1){
					return p;
				}
			}		
		}
	}
	return null;
}
//As part of BP2, added a new method for omniture population of onclick of See price in cart from featureditems carousel
function omnitureForSeePriceInCart(){
	var cartOverlayCheck=document.getElementById('pageRefreshFlag');
	var findMethod="";
	var divId="";
	var currentId="seepriceincart";
	var parentDiv='inline_box';
	var result= find_pid(currentId, 'inline_box');
	s.linkTrackVars='eVar3,eVar17,eVar45';
//if result is not null, then it is a featured items carousel.
	if(result != null){	
		findMethod="StaplesRec";
		divId=result.id;
	}else if(typeof cartOverlayCheck != "undefined" && cartOverlayCheck != null && cartOverlayCheck.value =='true'){		
		// checking if see price in cart is clicked from cartoverlay page

		findMethod="Recommendations";
		divId="cart_overlay_box";
		var variantId="";
		if ( typeof(variantPartnumber) != "undefined" ){
			variantId= "variant_cart_overlay_box_"+variantPartnumber;
		}
		var recruleId= document.getElementById(variantId);
		var recrule;
		if((typeof(recruleId)!= "undefined") && (null != recruleId)){
			recrule = recruleId.value;
	}	
		if(recrule)		
			s.eVar45=recrule;		
		else
			s.eVar45='no recRule';
	}	
	s.events="";
	s.eVar3=findMethod;
	s.eVar17=findMethod+":"+divId;
	s.tl(true,'o','See price in cart');
}
//As part of BP2, created a new method for omniture requirements of addtocartoverlay.
function omnitureForCartOverlay(id,checkCarouselInOverlay,partNumber,recrule){
	var overlayFlag=document.getElementById('overlayFlag');	
	
	var atcMethod="";
	var findMethod="";
	var omnitureList = new Array (2);
	//checking 'id 'value,to populate atcmethod and findmethod for omniture requirement 
	
	//checking if ATC is done from Suppliers and Accessories tab in sku page
	if(id=='item2'){			
		atcMethod="Sku Set Page Accessory";
		findMethod="Cross-Sell";		
	}
	//checking if ATC is done from Also Consider tab in sku page
	if(id=='item1'){	
		atcMethod="Sku Page Also Consider";
		findMethod="Up-Sell";
	}

	if(id=='searchitems'){
        	findMethod="Search";
        	s.eVar17="";
	}

	//checking if ATC is done from Featured or personalization carousel
	if(id=='carouselitem'){
		//checking if ATC is done from personalization carousel in ATC overlay
		if(checkCarouselInOverlay){
			atcMethod="ATC Overlay: Cross-Sell";
			findMethod="Recommendations";
			s.eVar17="Recommendations:cart_overlay_box";
			if(recrule)		
				s.eVar45=recrule;		
			else
				s.eVar45='no recRule';
		}else{
			
			var currentId=partNumber;
			var parentDiv='inline_box';
			var result= find_pid(currentId, 'inline_box');
			//If result is null , then div 'inline_box' is not parent div, so it is a personalization carousel
			if(result == null){				
				findMethod="Recommendations";
				
				if(pageId=='class'){
					atcMethod="Class Page";
					
					//Check for recommendations in the class page, if not recommendations set findMethod as 'Browse'
					var divResult= find_pid(currentId, 'class_box');
					if(divResult == null){
						findMethod="Browse";
					}
				}if(pageId=='category'){
					atcMethod="Category Page";
				}
			}else{
				//It is a featured items carousel
				//findMethod="StaplesRec";
				//s.eVar17="StaplesRec:"+result.id;
				if(pageId=='class'){
					atcMethod="Class Page";
				}if(pageId=='category'){
					atcMethod="Category Page";
				}
			}
		}
	}
	omnitureList [0] = atcMethod;
	omnitureList [1] = findMethod;
	return omnitureList;	
}
//As part of BP2,added a new method for displaying cartoverlay.jsp
function displayCartOverlay(url,params,popUpPosition,id,checkCarouselInOverlay,partNumber,recrule){

	var omnitureList="";
	
	 //Variables for omniture requirement 
	 var atcMethod="";
	 var findMethod="";
	 //call omnitureForCartOverlay method for populating the variables required for omniture requirements in addtocartoverlay
	 omnitureList=omnitureForCartOverlay(id,checkCarouselInOverlay,partNumber,recrule);
	//populating atcMethod,findMethod to be passed as data to ajax call to cartoverlay
	 if(omnitureList.length >0){
			atcMethod=omnitureList[0];
			findMethod=omnitureList[1];	
	 }
						//get window height & width
							var H = $(document).height();
							var W = $(window).width();
							//get window scroll value if any
							var adjustTop = $(window).scrollTop();
							//calculate midpoint to align the overlay
							var mid = (W/2);
							var left = (mid - 390);
						$.ajax({
				            url: url,
				            cache:false,
				            type:"POST",
				            timeout : globalTimeout,
				            dataType: "html",
				            data:{atcMethod:atcMethod,findMethod:findMethod},
				            success: function(data){
							 //append the data to the body tag
				            	$("#popup").remove();
				            	$("body").append(data);
				            	//set the top and left values of the add to cart window once it's in DOM
				           		$("div.addtocart").css('left', left);
				           		if (adjustTop > 0){
					           		$(".addtocart").css('top', adjustTop + 20);
					           	}
				         
       	 setTimeout("$('#mask, #close').click(function(){removeMask(true);}); STAPLES.Personalization.prepCarousel('cart_overlay_box',true);STAPLES.Personalization.prepCarousel('item_box',true);", 100);
				            },
        	 error: function(x, t, m) {       	
			$("#popup").remove();				
			 if(t==="timeout") 
			{                  
				createPopup(propertyValues.AddToCart.Attention,propertyValues.AddToCart.addToCartTimeOutMessage, popUpPosition, true);
				            }
			else {
                createPopup(propertyValues.AddToCart.Attention,propertyValues.AddToCart.addToCartErrorMessage,popUpPosition, true);
            }
        }
				          
				        });
			}
//As part of BP2,a new method for defining style for Addtocart
function styleForAddToCart(){
	//get window height & width
	var H = $(document).height();
	var W = $(window).width();	
	//get window scroll value if any
	var adjustTop = $(window).scrollTop();	
	//calculate midpoint to align the overlay
	var mid = (W/2);
	var left = (mid - 390);	
	//mask the basckground
	createMask(H);
    var $maskDiv = $('#mask');
	var popUpPosition = {
		"left":left + 150,
		"top": adjustTop + 100		
						}			
	return popUpPosition;
}

//method to trim the given string
String.prototype.trim = function () {
		return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

//Method used for formating the search key. All special characters and space 
//will be converted to '+'
function formatSearchTerm(searchKey){
  //replace all special characters with '+'
  searchKey =  searchKey.replace(/[^a-zA-Z0-9]+/g,'+');
 
  //To remove + , if it is the last character
  if(searchKey.charAt(searchKey.length - 1) == "+"){
        searchKey = searchKey.slice(0,-1);
  }
  //To remove +, if it is the first character
  if(searchKey.charAt(0) == "+"){
  	searchKey = searchKey.slice(1) ;
  }
  if(searchKey == ""){
		searchKey = "+" ;
	}
  return searchKey ;
}

//Method used for search submit. This will format the search term and create SEO URL
//Also search key ,store ID,Language ID and Catalog ID will be filtered from the URL 
//The same method will be called for all searches
function submitSearch(formId , searchKey){
	//trim the spaces in search term
	searchKey = searchKey.trim().replace(/\s+/g, ' ');
	//if searchKey is only white spaces or no characters entered , no need to submit the form to initiate search.
	if(searchKey == ""){
		return false;
	}
	// setting 'searchKey' to variable 'searchTerm', since the second part of the URL
	// need to encode before submit
	var searchTerm = searchKey;
	//to format the search key
	searchKey = formatSearchTerm(searchKey);
	//encoding search term and replacing (,), * with respective encode values
	searchTerm = encodeURIComponent(searchTerm).replace(/[!']/g, escape).split("%25").join("%2525").replace(/\/|%2F/ig,'%252F').replace(/\*/g,'%252A').replace(/\)/g,'%2529').replace(/\(/g,'%2528').replace(/\?|%3F/ig,'%253F').replace(/\+|%2B/ig,'%252B').replace(/\_/g,'%255F');
	//replace all spaces with '+'
	searchTerm = searchTerm.replace(/%20/g, "+");

	// the below code is used to trim down all the unwanted parameters from the URL. For .com, 
	//storeId, catalogId,langId are not required as parameters(after directory_<<searchTerm>>?) while submit 
	$('form#'+ formId +' input').each(function(){
        var nameAttr = $(this).attr("name");  
        $(this).filter(function() {       
            return  nameAttr == 'searchkey' || nameAttr == 'storeId'|| nameAttr == 'langId' || nameAttr == 'catalogId';
        }).prop("disabled", true);
    }); 
	
	//submitting the form with the required SEO URL
	document.forms[formId].action = '/'+searchKey+'/directory_'+searchTerm;
	document.forms[formId].submit();
}

//As part of BP2,a new method for retreiving quantity
function retrieveQuantity(id,position,quantity,partNumber){	
	if(id=="carouselitem"){
		id="";
		position=partNumber;
	}

	var quantity2=null;
	if(id!=null && position!=null && document.getElementById(id+position)!=null){
		quantity2=document.getElementById(id+position).value; 		
		if(typeof quantity2=="undefined" || quantity2== null || quantity2== ""){
			var callerVal = $(quantity).siblings("input").val();		
			if(callerVal){
				quantity2=callerVal;
			}else{
				quantity2=1;
			}
		}
		/* As per Brian's comment if the qty is 0 we should not add an item to cart and the existing flow would be followed.
		 * If user gives -  Less than 1 for decimal (0.2): 1 item added to cart
					  -		Non Numeric(j): 1 item added to cart
					  -		Decimal(1.3): 1 item added to cart
					  -		0 items: 0 item added to cart.
		 */
		if(quantity2!=0){
			if(isNaN(parseInt(quantity2,10))|| parseInt(quantity2)==0){	
				quantity2=1;
			}
		}
	
	}
	return quantity2;
}
//This function is used to create the background mask for the QuickView and AddToCart overlays - width should be 100% in all cases
function createMask(height){
	//set height for recommend page
	(pageId == 'reqrec')?height+=150:height;
	//create the mask
	//append the mask to the body tag
	var mask1= document.getElementById("mask");
	if(mask1 == 'undefined' || mask1 == null){
	$("body").append("<div id='mask'></div>");
	$("#mask").css({"width":"100%","height":height});
}
	
}
//To create pop up for addtocartwithoverlay.
function createPopup(errTitle,errMsg, position, viewCartButton){
    var popUpHtml = '<div id="popup"><h4 class="a200"><span>'+errTitle+'</span><a title="Close" class="clsBtn hide" href="javascript:void(0);">Close</a></h4><div class="errmsg"><p>' + errMsg + '</p></div></div>';
    $("body").append(popUpHtml);
    if(viewCartButton == true)
    {              $("#popup .clsBtn").removeClass('hide');
                    $("#popup div.errmsg").append('<a title="View Title" href="JavaScript:closeOverlayAndProceedToCart();">View Cart</a>');
               
    }
  //ST 465 changes: start
    else if(viewCartButton == false && errMsg == propertyValues.AddToCart.addToCartQuantityMessage){
   	 $("#popup .clsBtn").removeClass('hide');
   }
  //ST 465 changes: end
	 $("#popup").css({
                'top':position.top,
                'left':position.left,
                'position':'absolute'
            });
	$("#popup a.clsBtn, #popup div.errmsg a, #mask").click(function(e){		
		removeMask();
	});		
}
//to remove the mask created for overlay.
function removeMask(refreshPage){ 
	
	        $("#mask").remove();  
	        $(".quickViewOverlay").remove(); 
	        if((typeof(quickView) != 'undefined') && quickView === true) {
	        	quickView = undefined;
	        }
	        $("body").css('overflow','auto');
	        $("body #popup").empty().remove();
	        if(pageId=='yourorder'){
	        	closeoverlay(refreshPage);         	
	    }
	        $(".addtocart").remove();
	 } 	   
//////////
// UI Controls
//////////
	
function hideme(elementID) {
    $('#' + elementID).addClass('hide');
}
	
function showme(elementID) {
	if($('#divOverlay').length){
		$('#divOverlay #' + elementID).removeClass('hide');
	}else{
    $('#' + elementID).removeClass('hide');
}
}
	
	
function reloadcaptchaimg(path)
{
    img = document.getElementById('captchaimg');
    img.src = path + '?' + Math.random();
    document.getElementById('captchaanswer').value='';
}
	
// fill HTML element ////////
function fillElement(elementId,fillStr) {
    try {
        var elementHtml = document.getElementById(elementId);
        elementHtml.innerHTML = fillStr;
    } catch(e) {}
}
// end fill HTML  
	
//Super height and width, return adjusted based on ie6 or other
jQuery.fn.superWidth = function() {

    if (isMsie6 && false) {
		
        var ieLeftBorder = parseInt(this.css('border-left-width'));
        var ieRightBorder = parseInt(this.css('border-right-width'));
        var ieLeftPadding = parseInt(this.css('padding-left'));
        var ieRightPadding = parseInt(this.css('padding-right'));
			
        ieLeftBorder = ieLeftBorder ? ieLeftBorder : 0 ;
        ieRightBorder = ieRightBorder ? ieRightBorder : 0 ;
        ieLeftPadding = ieLeftPadding ? ieLeftPadding : 0 ;
        ieRightPadding = ieRightPadding ? ieRightPadding : 0 ;
			

        return this.width() + ieLeftBorder + ieRightBorder + ieLeftPadding + ieRightPadding;
		
    } else {
        return this.width();
    }
};

jQuery.fn.superHeight = function() {

    if (isMsie6 && false) {
		
        return this.totalHeight();

		
    } else {
        return this.height();
    }
};

jQuery.fn.totalWidth = function() {

    //if (isMsie6) {
		
    var ieLeftBorder = parseInt(this.css('border-left-width'));
    var ieRightBorder = parseInt(this.css('border-right-width'));
    var ieLeftPadding = parseInt(this.css('padding-left'));
    var ieRightPadding = parseInt(this.css('padding-right'));
			
    ieLeftBorder = ieLeftBorder ? ieLeftBorder : 0 ;
    ieRightBorder = ieRightBorder ? ieRightBorder : 0 ;
    ieLeftPadding = ieLeftPadding ? ieLeftPadding : 0 ;
    ieRightPadding = ieRightPadding ? ieRightPadding : 0 ;
			

    return this.width() + ieLeftBorder + ieRightBorder + ieLeftPadding + ieRightPadding;
		
//} else {
//	return this.width();
//}
};


jQuery.fn.totalHeight = function() {
		
    var ieTopBorder = parseInt(this.css('border-top-width'));
    var ieBottomBorder = parseInt(this.css('border-bottom-width'));
    var ieTopPadding = parseInt(this.css('padding-top'));
    var ieBottomPadding = parseInt(this.css('padding-bottom'));
			
    ieTopBorder = ieTopBorder ? ieTopBorder : 0 ;
    ieBottomBorder = ieBottomBorder ? ieBottomBorder : 0 ;
    ieTopPadding = ieTopPadding ? ieTopPadding : 0 ;
    ieBottomPadding = ieBottomPadding ? ieBottomPadding : 0 ;
			
    return this.height() + ieTopBorder + ieBottomBorder + ieTopPadding + ieBottomPadding;

};
		
var vipChooser = STAPLES.Cookies.getCookie('vip');
var resonanceSegment = STAPLES.Cookies.getCookie('ResonanceSegment');
var defaultPersonalizationDisplay = true;
var showPrivateSavingsBanner = true;
var showRightRail= true;
	
	
function certtakeover (takeoverId, replacementId) {
	
    var takeover = document.getElementById(takeoverId);
    if (takeover) {
        var replacement = document.createElement('div');
        replacement.id = replacementId;
        var takeoverClone = takeover.cloneNode(true);
        takeoverClone.id = takeoverId + "_clone";
        takeoverClone.style.display = 'none';
        var takeoverCloneCode = takeoverClone.innerHTML;
        takeoverClone.innerHTML = '';
        takeover.parentNode.appendChild(takeoverClone);
        takeoverClone.innerHTML = takeoverCloneCode;
        takeover.innerHTML = '';
        takeover.appendChild(replacement);
        hideme(takeoverClone.id);
        showme(takeoverId);
    }
	      
}
	
function disableLink(anchorObj) {
    var cnt = anchorObj.html();
    var sClass = anchorObj.attr('class');
    anchorObj.replaceWith("<a href='#' onclick='return false;' class='"+sClass+"' style='cursor: default;'>"+cnt+"</a>");
}	

jQuery.fromXMLString = function(strXML){
    if (window.DOMParser && !$.browser.msie) {
        return jQuery(new DOMParser().parseFromString(strXML, "text/xml"));
    } else if (window.ActiveXObject) {
        var doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.async = "false";
        doc.loadXML(strXML);
        return jQuery(doc);
    } else {
        return jQuery(strXML);
    }
};

//////////
// Overlays
//////////


function popOverlay(pURL, sIndex) {
    //wrapping the overlay function allowing to use same sizes as defined for pop function in popArray
	removeMask();
	parent.closeoverlay(); 
	
    overlay(pURL,popArray[sIndex][2],popArray[sIndex][3],popArray[sIndex][0]);

}

function overlay(theUrl,theWidth,theHeight,scrollBars){
    //calling an overlay from an overlay
    if ( top.location.href!= window.location.href ) {
        //parent.closeoverlay();
        parent.overlay(theUrl,theWidth,theHeight,scrollBars);
        return false;
    }

    var scrollLock;
    var hasBlanket = false;
	
    if (document.getElementById('blanket')) {
        hasBlanket = true;
    }
		
    $('#pseudobody').remove();
		
    if (typeof scrollBars == "undefined") {
        scrollBars = 'no';
    }

    var scrollHeight = $(document).superHeight();

    scrollLock = $(document).scrollTop();
		
    var overlayCode = '';
		
    if (! hasBlanket) {
        overlayCode += "<div id='blanket' style='height: "+scrollHeight + "px'></div>";
    }
    if(pageId == "samhome"){
        overlayCode += "<div id='pseudobody' style='height: "+scrollHeight + "px'>";
    }else{
        overlayCode += "<div id='pseudobody' onclick='closeoverlay()' style='height: "+scrollHeight + "px'>";
    }
    overlayCode += "<div id='overlaydiv' style='height: "+theHeight+"px; width: "+theWidth+"px; margin-top: "+(50 + scrollLock)+"px'>";
    if (scrollBars == 'yes') {
        overlayCode += "<iframe id='overlayframe' scrolling='yes' style='overflow-x: hidden;' frameborder='0' src='"+propertyValues.JAVASCRIPT_PATH+'overlayloader.html?theUrl=' + escape(theUrl) + '&historyCount=' + window.history.length+"'></iframe>";
    } else {
        overlayCode += "<iframe id='overlayframe' scrolling='no' style='overflow: hidden;' frameborder='0' src='"+propertyValues.JAVASCRIPT_PATH+'overlayloader.html?theUrl=' + escape(theUrl) + '&historyCount=' + window.history.length+"'></iframe>";
    }
			
			
    overlayCode += "</div>";
			
			
    overlayCode += "</div>";

    $('body').append(overlayCode);

}



function closeoverlay(refreshFlag){
    $('#pseudobody').remove();
    $('#blanket').remove();
    //As part of BP2, to refresh the page in case of addtocart from your order page .
    if(pageId=='yourorder'&& refreshFlag){
    	var pageRefreshFlag=document.getElementById('pageRefreshFlag');
    	if(typeof pageRefreshFlag != "undefined" && pageRefreshFlag != null && pageRefreshFlag.value =='true'){
    		location.reload();
    	}
    }
}
//As part of BP2, added a new method for closing yourorderoverlay when addtocart is done from yourorderoverlay
function closeyourorderoverlay(url,id,partNumber,catentryId,quantity){
	
	$('#pseudobody').remove();
    $('#blanket').remove();
    //calling addtocartwithoverlay to display cartoverlay 
    addToCartWithOverlay(url,id,partNumber,catentryId,quantity,true);
}

//resize the overlay background when the page finishes loading
if (pageId == "yourorder") {
    STAPLES.Onload.addLoadEvent(function() {
        var scrollHeight = $(document).superHeight();
        $('#pseudobody').css('height',scrollHeight);
        $('#blanket').css('height',scrollHeight);
    });
}
		
// adding close functionality on close button for overlays
STAPLES.Onload.addLoadEvent(function() {
    $('.closebt, .cancelbt').click(function (){
        self.parent.closeoverlay();
        return false;
    });
});


function launchZoom() {
    popOverlay(imgPathZoom + '&imageClickSequence=' + currentIndex,5);
}
	
function tabToZoom() {
    window.location=parent.imgPathZoom + '&imageClickSequence=' + parent.currentIndex;
}

//////////
// SEO
//////////

	
//SEO Phase3A-Paras-05/22/2009- need onclick handler to move analytics attribute into URL (anchor's href)
function onClickHijack(e) {
	
    e = e || window.event;
    var t = e.target || e.srcElement;
    var flyoutSearchText;
    var matchToolClick = false; 
    //check the parentNode if the current node is not an anchor tag
    rewriteURL = false;
    if(t && t.nodeName == "LI" && $(t).attr("id") == 'tab3'){
        rewriteURL = true;
    	s_comparisonTrack();
    }
    if ( t && t.nodeName == "A" || t.id=="catridgesearch" || t.id=="modelsearch" || t.nodeName=="LABEL" ){
    	//Added as part of BP2, for omniture changes on click of product in ATC overlay
    	var r=t.getAttribute("href");
    	var addToCartOverLay = document.getElementById("pageRefreshFlag");
    	if(r!=null && addToCartOverLay!=null && addToCartOverLay.value== 'true' && t.id=='carouselitem'){
    		var productUrl =r.split("_");
	    	var partNumber = productUrl[1];	
	    	var products=partNumber;	
	    	
	    	s_atcOverlayRecom('ATC Overlay','Product Detail',products);
    	}
    	
    	rewriteURL = true;
        if(t.id=="catridgesearch"){
        	flyoutSearchText=propertyValues.Flyout.flyoutSearchTextCartridge;
        	matchToolClick = true;
        }
        else if(t.id=="modelsearch"){
        	flyoutSearchText=propertyValues.Flyout.flyoutSearchTextPrinter;
        	matchToolClick = true;
        }
    } else if ( t && t.parentNode && t.parentNode.nodeName=="A" ) {
        rewriteURL = true;
        //switch reference to parent anchor tag where rewrite will occur (image with anchor tag, category name that is bold)
        t = t.parentNode;
    }
   
    if ( rewriteURL ) {
        var cm_tagtext=t.getAttribute("manual_cm_area");
        var cm_type = "cmArea";
        if ( cm_tagtext && typeof t.href!='undefined') {
            t.removeAttribute("manual_cm_area");
        }
        //tagging for flyouts
        var parents = $(t).parents();
        var flyoutname;
        parents.each(function(){
        	if(this.tagName == "LI" && this.id == "tab3"){
        		s_comparisonTrack();
        	}
        	if (this.tagName == "P" && 
        			($(this).attr('class')== "compareChk selected" || $(this).attr('class') == "compareChk selected highLightSpan")){
        		s_comparisonTrack();
        	}
        	if(this.id == "matchTool_Carousel"){
        		flyoutSearchText=propertyValues.Flyout.flyoutSearchTexInkandToner;
        		matchToolClick = true;
        	}
            if (this.tagName == "LI" && this.id.match(/^flyout_/)) {
                flyoutname = $(this).children('a').eq(0).text();
            }
            if (this.tagName == "DIV" && this.id == "showallprods") {
                if (propertyValues.analyticsSwitch == "ON") {
                    var flyoutCategory = propertyValues.Flyout.flyoutAnalytics;
                    flyoutCategory=flyoutCategory.replace(/\{0\}/g,flyoutname);
                    if ( matchToolClick == true){
                    	flyoutCategory=flyoutCategory.replace(/\{1\}/g,flyoutSearchText);
                    }else{
                    flyoutCategory=flyoutCategory.replace(/\{1\}/g,$(t).text());
                }
                    s_flyoutTrack(flyoutCategory,matchToolClick);
                }
					
                return false;
            }
        });

        if ( cm_tagtext  && typeof t.href!= 'undefined') {
            if ( t.href.indexOf("javascript:loadlink('") > -1 ) {
                indxEndOfURL = t.href.indexOf("');");
                //Next, check if URL has a '?' or not
                newLink = t.href.substring(0,indxEndOfURL)+((t.href.indexOf("?") > -1)?"&":"?")+cm_type+"="+cm_tagtext+t.href.substring(indxEndOfURL);
            } else {
                newLink = t.href + ((t.href.indexOf("?") > -1)?"&":"?")+cm_type+"="+cm_tagtext;
            }
            }
        }
    }
	

//////////
// String manipulation and testing
//////////

function isValueInArray(arr, val) {
    var inArray = false;
    for (var i = 0; i < arr.length; i++) {
        if (val == arr[i]) {
            inArray = true;
            return inArray;
        }
    }
    return inArray;
}

function lpad(input, length) {
    var str = input + '';
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}


// trim /////////////////////
function trim(str) {
    return jQuery.trim(str);
}
// end trim	
	
	
//// Constants used for this JS file
var strDigits = "0123456789";
var strLowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
var strUpperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var strCreditCardDelimiter = "-"
var strPhoneNumberDelimiters = "()- ";
var strZipCodeDelimiters = "-";
var numDigitsInUSPhoneNumber = 10;
	  
//Default Empty value 
var defaultEmptyOK = false;
	 
/**
	*Returns a string without a series of characters specified.
	**/
function strStripCharsInBag(strUnformattedString, strBag) {   
    var u;
    var returnString = "";
    for (u = 0; u < strUnformattedString.length; u++)
    {
        var c = strUnformattedString.charAt(u);
        if (strBag.indexOf(c) == -1)
        {
            returnString += c;
        }
    }
    return returnString;
}
	  
/**
	* COMMON JAVASCRIPT FUNCTIONS
	**/
	
// isInteger 
// 
// Returns true if all characters in string s are numbers.
// EXAMPLE FUNCTION CALL:     RESULT:
// isInteger ("5")            true 
// isInteger ("")             defaultEmptyOK
// isInteger ("-5")           false
// isInteger ("", true)       true
// isInteger ("", false)      false
// isInteger ("5", false)     true
	
function isInteger (s) {   
    var i;
	
    if (isEmpty(s))
        if (isInteger.arguments.length == 1) return defaultEmptyOK;
        else return (isInteger.arguments[1] == true);
    // Search through string's characters one by one
    // until we find a non-numeric character.
    // When we do, return false; if we don't, return true.
	
    for (i = 0; i < s.length; i++)
    {
        // Check that current character is number.
        var c = s.charAt(i);
	
        if (!isDigit(c)) return false;
    }
	
    // All characters are numbers.
    return true;
}
	
/**
	* Check whether string s is empty.
	**/
function isEmpty(s) {   
    return ((s == null) || (s.length == 0))
}
	
/**
	*  Returns true if character c is a digit (0 .. 9).
	**/
function isDigit (c)
{
    return ((c >= "0") && (c <= "9"))
}
	
/**
	*  Function formats the string based on the function arguments
	**/
function reformat (s){
    var arg;
    var sPos = 0;
    var argPos=0;
    var resultString = "";
	
    for (var i = 1; i < reformat.arguments.length; i++) {
        arg = reformat.arguments[i];
        if (i % 2 == 1) {
            if(argPos < s.length)
                resultString += arg;
        }
        else {
            resultString += s.substring(sPos, sPos + arg);
            sPos += arg;
            argPos+=arg;
        }
    }
    return resultString;
}
	
/**
	* This function strips out the invalid characters and formats 
	* the content based on the card type.
	**/
function formatCCNumber(cardNumberObj,cardType,mode){
		
    if(mode==false){
        var cardNumberVal=cardNumberObj.value;
        var strippedCCNumber="";
        var formattedCCNumber="";
			
        if (isEmpty(cardNumberObj.value)) return true;
        //Strip all the characters except the numbers
        for (i = 0; i < cardNumberVal.length; i++)
        {
            // Check that current character is number.
            var c =cardNumberVal.charAt(i);
		
            if (isDigit(c)) strippedCCNumber += c;
        }
					
        if(cardType=="AMEX"){
            formattedCCNumber=reformat (strippedCCNumber, "", 4, strCreditCardDelimiter, 6, strCreditCardDelimiter, 6);
        }
        else{
            formattedCCNumber=reformat (strippedCCNumber, "", 4, strCreditCardDelimiter, 4, strCreditCardDelimiter, 4,strCreditCardDelimiter, 4);
        }
        cardNumberObj.value=formattedCCNumber;
			
    }
}	
	
/**
	* Validates the String with the US phone number and 
	* formats to (xxx) xxx-xxxx
	* Modified by Rajib ( made it simple. Any issue pls talk to me
	**/
function checkUSPhone (phoneNoObj, emptyOK)
{
    if (checkUSPhone.arguments.length == 1) emptyOK = defaultEmptyOK;
    var phoneNoVal=phoneNoObj.value;
    if (isEmpty(phoneNoVal)) return true;
    if (emptyOK == true) return true;
    else
    {
        var normalizedPhone ="";
        //Strip all the characters except the numbers
        for (i = 0; i < phoneNoVal.length; i++)
        {
            // Check that current character is number.
            var c =phoneNoVal.charAt(i);
            if (isDigit(c)) normalizedPhone += c;
        }
	
        if ( ( normalizedPhone.length > 3 )	&&  ( normalizedPhone.length <= 6 ) )
        {
            var len=normalizedPhone.length - 3;
            phoneNoObj.value=reformat (normalizedPhone, "(", 3, ") ",len)
            return true;
        }
        else if ( normalizedPhone.length > 6 )
        {
            var len=normalizedPhone.length - 6;
            phoneNoObj.value=reformat (normalizedPhone, "(", 3, ") ", 3, "-", len )
            return true;
        }
        else
        {
            phoneNoObj.value=normalizedPhone;
            return true;
        }
    }
}
	
function formatUSPhone (phoneNo)
{
    //if (checkUSPhone.arguments.length == 1) emptyOK = defaultEmptyOK;
    //var phoneNoVal=phoneNoObj.value;
    if (isEmpty(phoneNo)) return true;
    //if (emptyOK == true) return true;
    else
    {
        var normalizedPhone ="";
        //Strip all the characters except the numbers
        for (i = 0; i < phoneNo.length; i++)
        {
            // Check that current character is number.
            var c =phoneNo.charAt(i);
            if (isDigit(c)) normalizedPhone += c;
        }
	
        if ( ( normalizedPhone.length > 3 )	&&  ( normalizedPhone.length <= 6 ) )
        {
            var len=normalizedPhone.length - 3;
            phoneNo=reformat (normalizedPhone, "1-", 3, "-",len)
            return phoneNo;
        }
        else if ( normalizedPhone.length > 6 )
        {
            var len=normalizedPhone.length - 6;
            phoneNo=reformat (normalizedPhone, "1-", 3, "-", 3, "-", len )
            return phoneNo;
        }
        else
        {
            phoneNo=normalizedPhone;
            return phoneNo;
        }
    }
}
	
/**
	* This function strips out the invalid characters and formats 
	* the us zip code.
	**/
function formatUSZipCode(zipCodeObj,mode){
		
    if(mode==false){
        var zipCodeVal=zipCodeObj.value;
        var strippedZipCode="";
        var formattedZipCode="";
			
        if (isEmpty(zipCodeObj.value)) return true;
        //Strip all the characters except the numbers
        for (i = 0; i < zipCodeVal.length; i++)
        {
            // Check that current character is number.
            var c =zipCodeVal.charAt(i);
		
            if (isDigit(c)) strippedZipCode += c;
        }
			
        //reformat if greater than by 5
        if( strippedZipCode.length > 5)
        {
            formattedZipCode=reformat (strippedZipCode, "", 5, strZipCodeDelimiters,4 );
            zipCodeObj.value=formattedZipCode;
        }
        else
        {
            zipCodeObj.value=strippedZipCode;
        }
    }
}	
	
	
	
/**
	 * This function formats the given amount into the specifed format,
	 * 	formatNumber(3, "$0.00") returns $3.00
	 *	formatNumber(3.14159265, "##0.####") returns 3.1416
	 *	formatNumber(3.14, "0.0###%") returns 314.0%
	 *	formatNumber(314159, ",##0.####") returns 314,159
	 *	formatNumber(31415962, "$,##0.00") returns $31,415,962.00
	 *	formatNumber(0.5, "#.00##") returns 0.50
	 *	formatNumber(0.5, "0.00##") returns 0.50
	 *	formatNumber(0.5, "00.00##") returns 00.50
	 *	formatNumber(4.44444, "0.00") returns 4.44
	 *	formatNumber(5.55555, "0.00") returns 5.56
	 *	formatNumber(9.99999, "0.00") returns 10.00
	 * 
	*/
	
// CONSTANTS
	
var separator = ",";  // use comma as 000's separator
var decpoint = ".";  // use period as decimal point
var percent = "%";
var currency = "$";  // use dollar sign for currency
	
function formatNumber(number, format) {  // use: formatNumber(number, "format")
	
    if (number - 0 != number) return null;  // if number is NaN return null
    var useSeparator = format.indexOf(separator) != -1;  // use separators in number
    var usePercent = format.indexOf(percent) != -1;  // convert output to percentage
    var useCurrency = format.indexOf(currency) != -1;  // use currency format
    var isNegative = (number < 0);
    number = Math.abs (number);
    if (usePercent) number *= 100;
    format = strip(format, separator + percent + currency);  // remove key characters
    number = "" + number;  // convert number input to string
	
    // split input value into LHS and RHS using decpoint as divider
    var dec = number.indexOf(decpoint) != -1;
    var nleftEnd = (dec) ? number.substring(0, number.indexOf(".")) : number;
    var nrightEnd = (dec) ? number.substring(number.indexOf(".") + 1) : "";
	
    // split format string into LHS and RHS using decpoint as divider
    dec = format.indexOf(decpoint) != -1;
    var sleftEnd = (dec) ? format.substring(0, format.indexOf(".")) : format;
    var srightEnd = (dec) ? format.substring(format.indexOf(".") + 1) : "";
	
    // adjust decimal places by cropping or adding zeros to LHS of number
    if (srightEnd.length < nrightEnd.length) {
        var nextChar = nrightEnd.charAt(srightEnd.length) - 0;
        nrightEnd = nrightEnd.substring(0, srightEnd.length);
        if (nextChar >= 5) nrightEnd = "" + ((nrightEnd - 0) + 1);  // round up
	
		
        while (srightEnd.length > nrightEnd.length) {
            nrightEnd = "0" + nrightEnd;
        }
	
        if (srightEnd.length < nrightEnd.length) {
            nrightEnd = nrightEnd.substring(1);
            nleftEnd = (nleftEnd - 0) + 1;
        }
    } else {
        for (var i=nrightEnd.length; srightEnd.length > nrightEnd.length; i++) {
            if (srightEnd.charAt(i) == "0") nrightEnd += "0";  // append zero to RHS of number
            else break;
        }
    }
	
    // adjust leading zeros
    sleftEnd = strip(sleftEnd, "#");  // remove hashes from LHS of format
    while (sleftEnd.length > nleftEnd.length) {
        nleftEnd = "0" + nleftEnd;  // prepend zero to LHS of number
    }
	
    if (useSeparator) nleftEnd = separate(nleftEnd, separator);  // add separator
    var output = nleftEnd + ((nrightEnd != "") ? "." + nrightEnd : "");  // combine parts
    output = ((useCurrency) ? currency : "") + output + ((usePercent) ? percent : "");
    if (isNegative) {
        // patch suggested by Tom Denn 25/4/2001
        output = (useCurrency) ? "(" + output + ")" : "-" + output;
    }
    return output;
}
	
function strip(input, chars) {  // strip all characters in 'chars' from input
    var output = "";  // initialise output string
    for (var i=0; i < input.length; i++)
        if (chars.indexOf(input.charAt(i)) == -1)
            output += input.charAt(i);
    return output;
}
	
function separate(input, separator) {  // format input using 'separator' to mark 000's
    input = "" + input;
    var output = "";  // initialise output string
    for (var i=0; i < input.length; i++) {
        if (i != 0 && (input.length - i) % 3 == 0) output += separator;
        output += input.charAt(i);
    }
    return output;
}

//Following javascripts added as part of enabling timer for browse path project testing
//  timerDisplay is used to store the table for display
var timerDisplay='';
	 
//function used to append the timer results for each javascript method call
function javascriptTest(methodName,starttime,endtime){
    if(timerDisplay==''){
        timerDisplay='<table border="1"><tr><td>MethodName</td><td>starttime</td><td>endtime</td><td>time taken in ms</td></tr>';
    }
    var diff =endtime-starttime
    timerDisplay=timerDisplay+'<tr>'
    timerDisplay=timerDisplay+'<td>'+methodName+'</td>';
    timerDisplay=timerDisplay+'<td>'+starttime+'</td>';
    timerDisplay=timerDisplay+'<td>'+endtime+'</td>';
    timerDisplay=timerDisplay+'<td>'+diff+'</td>';
    timerDisplay=timerDisplay+'<tr>';
}
	
//function used to append the timer table result to the footer div timerResultDisplay
function resultDisplay(){
    timerDisplay=timerDisplay+'</table>';
    document.getElementById('timerResultDisplay').innerHTML=timerDisplay;
    document.getElementById('timerResultDisplay').style.display ="block";
}

//////////
// Add to cart 6.1
//////////
	
function addToCartxx(url, formId,qtyElement, partNumElement, catentElement, cmAreaElement, qtyCheckFlag) {
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
	deleteCertonaCookie();
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
    //var formName = document.skuForm;
    var formAccess = document.getElementById('skuForm_access_');
    var formSpecs = document.getElementById('skuForm_specs_>');
    var formName = document.getElementById(formId);
    
    var frmName = '';
    if (formName != null) {
        frmName = formName.name;
    }
    var params = '';
    var suffix = '';
    var elementName = '';
    
    if (url != null && qtyElement != null && partNumElement != null && catentElement != null && qtyElement!= null) {
        var params = '&' + eval(qtyElement).name + '=' + eval(qtyElement).value
        + '&' + eval(partNumElement).name + '=' + eval(partNumElement).value
        + '&' + eval(catentElement).name + '=' + eval(catentElement).value
        + '&' + eval(cmAreaElement).name + '=' + eval(cmAreaElement).value;
		
        url = url + params;
    }
		
    params = _addToCart(formName, params);
    if (frmName.indexOf('skuForm_') > -1 && frmName.indexOf('skuForm_access_') < 0 && frmName.indexOf('skuForm_specs_')< 0) {
        if (formAccess != null) {
            params = _addToCart(formAccess, params);
        }
		
        if (formSpecs != null) {
            params = _addToCart(formSpecs, params);
        }
    }
		
    if (params != '') {
        params=params+'&ajaxCall=true';
        
        //window.location.href = url + params;
        cartOverlay(url+params);
    }
}
	  
function cartOverlay(urlStr) {
    try {
        $.ajax({
            url: urlStr,
            type: 'POST',
            dataType: 'xml',
            timeout: globalTimeout,
            error: function(){
                //if the document fails to load in the alloted time or xml parse error, do something here.
                debugMessages.push('Personalization: timeout or xml parse error on ' + urlStr);
                $("#debug").append('<br />Personalization: timeout or xml parse error on ' + urlStr);
            },
            success: function(returnXml){
                var innerContent='';
                var headline='';
                var addtocartstatus='';
			
                $(returnXml).find('scheme').each( function(){
                    headline=$(this).find('headline').text();
                    addtocartstatus=$(this).find('status').text();
			
                    if (addtocartstatus =='true') {
                        var innerContent=$(this).find('content').text();
                        popOverlay(innerContent,1);
                    } else {
                        window.location.href=$(this).find('content').text();
                    }
                })
            }
        })
    } catch (e) {
        //If the call is bad, do something here.
        debugMessages.push('Add to cart : invalid return on ' + urlStr);
        $("#debug").append('<br />Personalization: invalid return on ' + urlStr);
    }
}
	  
function _addToCart(form, params) {
   
    //var formName = document.skuForm;
    var formName = form;
    //alert("formName_addTo "+formName);
    var frmName = formName.name;
    //alert("frmName /////"+frmName);
    //var params = '';
    var suffix = '';
    var elementName = '';
    //alert("formName.elements.length"+formName.elements.length);
    for (var i = 0; i < formName.elements.length; i++) {
        elementName = formName.elements[i].name;
        if (	(elementName.indexOf('quantity_') > -1 ) ||
            ( elementName.indexOf('partNumber_') > -1) ||
            (elementName.indexOf('minLeadTime_') > -1) ||
            (elementName.indexOf('maxLeadTime_') > -1) ||
            (elementName.indexOf('cmArea_') > -1 )
            ) {
            suffix = elementName.substring((elementName.lastIndexOf('_') + 1), elementName.length);
            var str = "document." + frmName + ".quantity_" + suffix + ".value";
            if (!eval("document." + frmName + ".quantity_" + suffix)) {
                str = "document." + frmName + ".ST_NI_quantity_" + suffix + ".value";
            }
            if (!eval("document." + frmName + ".quantity_" + suffix) && !eval("document." + frmName + ".ST_NI_quantity_" + suffix)) {
                str = "document." + frmName + ".ST_RI_quantity_" + suffix + ".value";
            }
            //Check if quantity does not exist for sku then quantity_suffix object won't exists
            if (eval("document." + frmName + ".quantity_" + suffix) || eval("document." + frmName + ".ST_NI_quantity_" + suffix) || eval("document." + frmName + ".ST_RI_quantity_" + suffix)) {
                if ( formName.elements[i].value != '' && eval(str) != '') {
                    elementName = elementName.substring(0, elementName.lastIndexOf('_')) + '_1';
                    params  += '&'
                    + elementName
                    + '='
                    + formName.elements[i].value;
                //alert("elementName "+elementName);
                //alert("elementValue "+formName.elements[i].value);
                }
            }
        }
    }
    return params;
}
	  
function addToCartFromClassPage(url,qtyElement, partNumber, catentryId, cmArea, qtyCheckFlag, minLeadTime, maxLeadTime) {
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
	deleteCertonaCookie();
	//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
    var formAccess = document.getElementById('skuForm_access_');
    var formSpecs = document.getElementById('skuForm_specs_>');
    var frmName = '';
    var params = '';
    var suffix = '';
    var elementName = '';
    //alert("Debug starts!!!");
    if(url != null && qtyElement != null && partNumber != null && catentryId != null && cmArea!= null) {
        //alert("Ohh entered here");
        var params = '&quantity_1=' + eval(qtyElement).value
        + '&partNumber_1=' + partNumber
        + '&catEntryId_1=' + catentryId
        + '&cmArea_1=' + eval(cmArea).value
        + '&ST_minLeadTime_1=' + minLeadTime
        + '&ST_maxLeadTime_1=' + maxLeadTime;
	
        url = url + params;
    }
    //alert("came here?");
    //alert(url);
    //params = _addToCart(formName, params);
    //
	
    if (params != '') {
        params=params+'&ajaxCall=true';
        //alert("parameters ==="+url+params);
        //window.location.href = url + params;
        cartOverlay(url+params);
    }
}
	 
function closeOverlayAndProceedToCart() {
	var staplesDisplayCartLink=document.getElementById('staplesDisplayCartLink').value;	

	window.location.href = staplesDisplayCartLink;
	//was this initially
   // parent.location.href='/webapp/wcs/stores/servlet/StaplesDisplayCart?URL=yourorder';
}
	 
function formatURL(url){	  
    url = url.replace(/&amp;/g,"&");
    url = url.replace(/&lt;/g,"<");
    url =  url.replace(/&gt;/g,">");
    window.location.href = url;
}	  
		
//appendHash is used to append the hashvalues that came from the class page
//filterlist, sortcolumn, pagenumber etc., are added to the URL 	
function appendHash(url,compareList) { 		
    var hashvalue=location.hash;
    var urlAry=new Array();
		
    if (compareList!=undefined && compareList.length>0) {
        urlAry[urlAry.length]='compareList=['+compareList+']';
    }
		
    if (hashvalue!=undefined && hashvalue.length>1) {
        var jsonStg='"'+hashvalue.substring(1).replace(/&/g,',"');
        jsonStg=jsonStg.replace(/=/g,'":');
        jsonHash=eval('({'+jsonStg+'})');
        if (jsonHash.sortName!=undefined && trim(jsonHash.sortName)!='') {
            urlAry[urlAry.length]='sortName="'+jsonHash.sortName+'"&sortOrder="'+jsonHash.sortOrder+'"&sortDatatype="'+jsonHash.sortDatatype+'"';
        }
        if (jsonHash.pagenum!=undefined && jsonHash.pagenum>0) {
            urlAry[urlAry.length]='pagenum='+jsonHash.pagenum;
        }
        if (jsonHash.filterList!=undefined && jsonHash.filterList!='') {
            urlAry[urlAry.length]='filterList=['+jsonHash.filterList.join(',') +']';
        }
    }
    //alert(url+'#'+urlAry.join('&'));
    window.location.href =url+'#'+urlAry.join('&');
}  
	
///////////////////////
// Category/Class description more/less toggle
///////////////////////
var catDesc = "this Category";						// Category description duh overwrite page level
		
function moreLessToggle() {
    var toggleLink = $("a.mlt"); 					// The element doing the toggling & put it in memory
    var toggleTarget = $("h2.seo");    				// The element affected by the toggle & put it in memory
    var toggledClass = "long";    					// The class being toggled
		
    var moreAbout = (propertyValues.moreAbout+" " + catDesc + " \u2192");   	// Copy for more
    var lessAbout = (propertyValues.lessAbout+" "+ catDesc + " \u2190");    	// Copy for less
		
    // By default, the toggleLink text says "Back to top", so let's overwrite it as needed
    if (toggleTarget.hasClass(toggledClass)) {
        toggleLink.text(lessAbout);
    } else {
        toggleLink.text(moreAbout);
    }
	
    toggleLink.click(function(){    										// Target the element on click
        toggleTarget.toggleClass(toggledClass);    							// Apply the class as needed
        $(this).text($(this).text() == moreAbout ? lessAbout : moreAbout);  // Change out the text as needed
        return false;    													// Override the anchor value
    });
}	
STAPLES.Onload.addLoadEvent(moreLessToggle);	
	

// -->

////////////////////////////////////////
//Sapient Offshore JS functions 
///////////////////////////////////////
//Sapient new More Less Toggle Function Starts

function moreLessToggleNew() {
	var catDesc = $("#intro h1").text(),										// Category description duh overwrite page level
	toggleLink = $("a.moreLT"), 											// The element doing the toggling & put it in memory
 toggleTarget = $("h2.seo"),    											// The element affected by the toggle & put it in memory
 toggledClass = "long",    												// The class being toggled
 moreAbout = (propertyValues.moreAbout+" "+ catDesc),   					// Copy for more
 lessAbout = (propertyValues.lessAbout+" "+ catDesc);    					// Copy for less
	//toggleLink.text(moreAbout);
 // By default, the toggleLink class is "moreSeo", so change it as "lessSeo"
 /*if (toggleTarget.hasClass(toggledClass)) {
     toggleLink.addClass('lessSeo');			
 } else {
     toggleLink.removeClass('lessSeo');
 }
	*/
 toggleLink.click(function(){    									// Target the element on click
     toggleTarget.toggleClass(toggledClass);    							// Apply the class as needed
			  
     if (toggleTarget.hasClass(toggledClass)) {							// Apply the class as needed
         toggleLink.addClass('lessSeo');
     } else {
         toggleLink.removeClass('lessSeo');
     }
     $(this).text($(this).text() == moreAbout ? lessAbout : moreAbout);  // Change out the text as needed
     return false;    													// Override the anchor value
 });
}	
//used to retain the product tab view (grid/list) on search results
function bindSearchToTabView() {
	$("#hsearch").submit(function() {
 		addViewParamToForm($(this));
	});
	// click 'search' on enter - otherwise submit event is not triggered for above
	$("#searchkey").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#searchgo").click();
	    }}
	);
}
	
//adds input field to form with view param
function addViewParamToForm(form) {
	var viewClass = getSearchViewTypeGridList();
	if(pageId!='searchresults'){
	if (viewClass) {
		form.append("<input type='hidden' name='searchViewTypeGridList' value='" + viewClass + "'>");
	} else {
		return;
	}
}
}

// returns the search view type class
function getSearchViewTypeGridList() {
	return $("#productDetail").attr("class");
}

STAPLES.Onload.addLoadEvent(moreLessToggleNew);
//Sapient new More Less Toggle Function Ends
// BP2 change starts
 
 var xmlStrAsObj;
 
 var TABS = {
		////////////////////////////////////////////////////////////////////////////////////////
		//	Function Name		:	tabInit()
		//	Description			:	This function initilize the tab views depending upon the values 
		//							passed in the hidden input parameters and bind the handlers on 
		//							switching the tabs
		//	Input Parameters	:	None
		//	Output Parameters	:	None
		/////////////////////////////////////////////////////////////////////////////////////////	
		tabInit:function(){
          	//Initializing the Column parameters  
        	var $producViewDetails = $("input[name=tabparams]").val();           
        	columnDetails =  $producViewDetails.replace(/[a-z,A-Z]/g,'');
        	//Assigning values to viewDetails on initial load of page
        	viewDetails = $producViewDetails.split(" ")[0];
        	var $items = $("#productDetail li.prd");
			
        	if(pageId != 'searchresults'){
						for(i=(+columnDetails);i < $items.length; i=i+ (+columnDetails)){          
							$($items[i]).before('<br />');
						}
					}else{                                             
						
						var columnDetailsSearch = columnDetails || 3;// making default column 3 if column detail does not exist
						for(i=(+columnDetailsSearch);i < $items.length; i=i+ (+columnDetailsSearch)){          
							$($items[i]).before('<br />');
						}
						//adds tab view param on search submit
						bindSearchToTabView();
						// adjust promo details depending on view - no adjustment needed if list
                        var currentViewType = getSearchViewTypeGridList();
                        if (currentViewType.indexOf("gridView") != -1) {
                            TABS.tabViewChildrenAdjust(currentViewType);
                        }else if (currentViewType.indexOf("compareView") != -1) {
                        	$("div.content #middleContainer > div.perpage").hide();
                        	$("#therail").hide();
                        	$("#tabheader").find("label").show();
		 					$("#tabfooter").find("label").show();
                        }
						
						$("div.tabmodule div.tabs li.views").click(function(e){
							e.preventDefault();
							if($(e.target).closest("#tabfooter").length > 0){
								window.scrollTo(0,700);
							}                                             
							var currentTabIndex = $(this).attr("class").split("_")[1],
							tabContentID = $(this).find("a").attr("rev"),
							viewDetails = $(this).find("a").attr("rel"),
							viewClass;
					
							if(!$(this).hasClass("selected")){
								$("div.tabs").find("li.selected").removeClass("selected");
								$("div.tabs").find("li.tab_" + currentTabIndex).addClass("selected");
							}                                            
					
							viewClass = TABS.tabViewChildrenAdjust(viewDetails);  
							
							// Show and hide the corresponding tabs
							TABS.showTabs(tabContentID,viewClass);
						});
					}     
		}, 
        // moved out of tabInit where it was used only for clicking view change button
        // now it needs to be used on page load to maintain Grid/List view
        tabViewChildrenAdjust: function(viewDetails) {
            if (viewDetails.indexOf("gridView") != -1) {
								$("#productDetail").children("li.promorow.yeller").hide();
								viewClass = viewDetails + columnDetails;
							}else{
								$("#productDetail").children("li.promorow.yeller").show();
								viewClass = viewDetails;
							}
            return viewClass;
		},   
      	////////////////////////////////////////////////////////////////////////////////////////
		//	Function Name		:	tabClick()
		//	Description			:	This function shows the tab's content when the user clicks on List View/Grid View/Compare Items
      	//							tab in class page.It is also called to maintain the view(List/grid/Compare Items) 
      	//							when user does actions like sorting,filtering,pagination.
		//	Input Parameters	:	$obj,methodFrom,footerFlag(This will be true when the user clicks on tabs(list/grid/compare items) at the bottom section and false when clicks 
		//							on the tabs at top section.)
		//	Output Parameters	:	None
		/////////////////////////////////////////////////////////////////////////////////////////	
      	tabClick: function($obj,methodFrom,footerFlag){

			if(methodFrom == 'listClick'){
				s_searchDisplayView("List") 
			}
			else if(methodFrom == 'gridClick'){
				s_searchDisplayView("Grid") 
			}
			
			var t_tabClick_start = new Date().getTime();
			//This check is to avoid the logic inside the function tabClick() to execute when the user clicks on the tab(List/Grid/Compare Items)
			//which is currently clicked(tab is selected) by user.
			if (!($obj.hasClass("selected")) || typeof(footerFlag) == 'undefined'){
	            var currentTabIndex = $obj.attr("class").split("_")[1],
	            tabContentID = $obj.find("a").attr("accesskey");
	            viewDetails = $obj.find("a").attr("rel");
	            var viewClass = '';
	            if(!$obj.hasClass("selected")){
	            	$(".tabs").find("li.selected").removeClass("selected");
	                $(".tabs").find("li.tab_" + currentTabIndex).addClass("selected");
	            }
	            //This condition will be true for sorting,filtering,refresh and back button functionalities
	            if(typeof(footerFlag) == 'undefined'){
	            	var $items = $("#productDetail li.prd");
	                for(i=eval(columnDetails);i < $items.length; i=i+ eval(columnDetails)){ 
	                	$($items[i]).before('<br />');
	                }
            	}
	            if(viewDetails == "gridView" || viewDetails == "gridView3" ){     
	                viewClass = viewDetails + trim(columnDetails);
	            }else if(viewDetails == "listView"){
	                viewClass = viewDetails;
	            }
	            TABS.showTabs(tabContentID,viewClass,methodFrom,footerFlag);
	            var t_tabClick_end = new Date().getTime();
	    	 	if( alertTabChange ){
	        		var etime=t_tabClick_end-t_tabClick_start;		
					$("#debug").append('<br /> PerfForTabClick =' + etime);
	      	 	}
			}
		},
      	//////////////////////////////////////////////////////////////////////////////////////////
		//	Function Name		:	showTabs()
    	//	Description			:	This function defines the handlers behavior showing the tabs 
    	//							content and called when clicking on the tabs.
    	//	Input Parameters	:	showDivId, applyClass,methodFrom,footerFlag
    	//	Output Parameters	:	None
    	//////////////////////////////////////////////////////////////////////////////////////////
		showTabs: function (showDivId,applyClass,methodFrom,footerFlag){
			var $tabContainer =  $(".tabContainer"),
			$showDiv= $(showDivId);
			if(applyClass != ""){
				$showDiv.children("ul").removeClass().addClass(applyClass); 
            }

			if(showDivId == "#compareitems"){
				hideClasses();
				
				if(methodFrom != "searchCompareClick"){
					
				displayComparisonCarousel(methodFrom);
					
				if(compareItems!=null && compareItems.length > 0){
					displayComparisonResults();
				}
				//Replacing the holding boxes of items with empty holding boxes and removing the comparison results section if it is present
				else{
					populateEmptyHoldingBoxes();
				}
				}
				else{
					
					//method to display the comparison chart in search results page when user clicks the comparison tab
					displaySearchComparisonView();
					if (typeof(footerFlag) != 'undefined'){//footerFlag will be true/false when the user clicks on the tabs(List/Grid/Compare items) section
						hasChangeAction = false;
						displayBasedOnHash(xmlStrAsObj,false,true,'TABS.tabClick');
						
					}

				}
			}else{
				if(pageId == 'class')
                 {
                   showClasses();
                }

				if (typeof(footerFlag) != 'undefined'){//footerFlag will be true/false when the user clicks on the tabs(List/Grid/Compare items) section
					applyCompareAndSort();
					//Infosys BP2 change for viewClass
					hasChangeAction = false;
					displayBasedOnHash(xmlStrAsObj,false,true,'TABS.tabClick');
					//Infosys BP2 change ends
				}
			}
			if($showDiv.hasClass("hide_simple")){
				$tabContainer.children().not(".hide_simple").addClass("hide_simple");
				$showDiv.removeClass("hide_simple");
			}
			if(pageId == 'searchresults'){
				//For style changes when user clicks compare tab in search results page
	 			if(methodFrom == "searchCompareClick")
	 			{
	 				// To hide right rail
	 				$("#therail").hide();
	 				//To increase the size of product grid conatiner
	 				$("#productGridContainer").animate({
	 												   width:"700px"
	 													},1000, function(){
	 														// to show labels for page number and sorting next to compare tab 
	 														$("#tabheader").find("label").show();
	 								 						$("#tabfooter").find("label").show();
	 														});
	 					//To increase the width of pagenation bar in comparison carousel
	 					$("#compareitems div.perpage").width("698px");
	 					/* BEGIN:update for restruturing the page : added parent middle conatiner which is containing header perpage,gridcontainer, footer perpage and relevance container
								Restructuring is done due to controll of all the middle containers between the left and right rail
						*/
						$("div.content #middleContainer > div.perpage").hide();
						/* END*/
	 				
	 			}else
	 			{
	 					// To check if List/Grid tab is clicked after clicking compare tab. This style changes is used only
	 					// when user click List/Grid tab from comparison view. #therail is hidden in comparison view.
	 					if(!$("#therail").is(":visible"))
	 					{
	 						// To show right rail
	 						$("#therail").show();
	 						//To decrease the size of product grid conatiner
	 						$("#productGridContainer").animate({
	 												   width:"540px"
	 													},1000);
	 						// to hide labels for page number and sorting next to compare tab
	 						$("#tabheader").find("label").hide();
							$("#tabfooter").find("label").hide();
	 						
							//To decrease the width of pagenation bar in comparison carousel
	 						 $("#compareitems div.perpage").width("540px");
							 /* BEGIN:update for restruturing the page : added parent middle conatiner which is containing header perpage,gridcontainer, footer perpage and relevance container
								Restructuring is done due to controll of all the middle containers between the left and right rail
							*/
							$("div.content #middleContainer > div.perpage").show();
							
							/* END*/
	 					}
	 			}	
		  }
			if(showDivId == "#compareitems"){
				if(methodFrom != "searchCompareClick"){
        	  //Calling this method to align the items in a carousel format
        	  STAPLES.Personalization.prepCarousel('inline_box1',true);
        	  //Resetting the anchored page
        	  anchoredPage = '0'; 
        	  if(!footerFlag){//Checking whether the tabClick method is invoked from 'Compare Items'header tab
  	      		window.scrollTo(0,findPos( document.getElementById('intro')));//To move the page to the introduction section  
        	  }
			}

			}
			
			if(footerFlag){ //Checking whether the tabClick method is invoked from the footer tabs
	        	window.scrollTo(0,findPos( document.getElementById('tabheader')));//To move the page to the tabs header section
			}
		}           
  }

 // Adding check to see if the tabs are present before adding event handler
 if(pageId == 'class' || pageId =='searchresults'){
 	 STAPLES.Onload.addLoadEvent(TABS.tabInit);
 }

var SWATCH = {
	    thumbNailHover: function() {
	        var $thmbNail = $("#productDetail").find(".p02new").children(".pic");
	        SWATCH.quickView($thmbNail);
			
	        $thmbNail.find("input.comparechkbx").click(function(){
	            var checkedStatus = this.checked;			
	            if(checkedStatus){
					$(this).closest("p.compareChk").addClass("highLightSpan");
	            } else {
					$(this).closest("p.compareChk").removeClass("highLightSpan");
	            }
	        });
	    },
	    
	    
	    quickView : function($prdctList)
	    {	
			$prdctList.find("img").hover(function() {			
				var imgHeight = $(this).height(),//getting image height
				bgQvTop = imgHeight - 50,
				$thmbNailBox =  $(this).closest("div");
	            $thmbNailBox.find("div.bgQuickView").show().css('top', bgQvTop).end();
	    },
			function() {			
			   var $thmbNailBox =  $(this).closest("div");		  		
			   $thmbNailBox.find("div.bgQuickView").hide();
				   $thmbNailBox.find("div.bgQuickView").hover(function()
					{
					$(this).show();
		            },
					function(){
					$(this).hide();
		        });	
	        });
	    },
	    collectionSwatchClick:function($alink,$skuSetId,colFlag,methodFrom){
	    	var t_swatchclickcol_start =  (new Date()).getTime();
	    	if($skuSetId == ''){
	    		$skuSetId = STAPLES.SKU.getSkuSetIdFromXml();
		    }
	    	STAPLES.SKU.collectionSwatchClick($alink,$skuSetId,colFlag);
	    	//Added this to fix the issue of title change in IE browser
			if (window.ActiveXObject){
			  if(getIEVersion() < 9){
				  updateTitle(); 
			  }
            }
	    	//This is to make the clicked parent collection in the collection carousel as highlighted
	    	if(methodFrom === "collectionSwatchClick"){
	    		var divId='#'+$alink+'_'+$skuSetId;
	    		$(divId).parent().addClass("selected");
	    	}
	    	if((typeof(quickView) == 'undefined') || quickView !== true){
	    		STAPLES.SKU.displayHashForCollection($alink,methodFrom);
	    	}
	    	var t_swatchclickcol_end = new Date().getTime();   
		 	  if( alertSwatchClick){
		         var ecoltime=t_swatchclickcol_end-t_swatchclickcol_start;            
		         $("#debug").append('<br /> PerfSwatchClick for collection =' + ecoltime);
	        }

            if(methodFrom === "collectionSwatchClick"){
            	STAPLES.SKU.enableDisableCartCollections(true);
            }
	    },
	    swatchClick: function($alink,methodFrom) {
	    	var t_swatchclick_start =  (new Date()).getTime();
	    	var idVal = '#'+$alink;
			var $a = ($(idVal).find("a"));
	        var $skuNumId = $a.attr('rel').split("_");// we get sku num and id spilleted by "_"
	        var $skuNum=$skuNumId[0],// this gives sku num
	        $skuId=$skuNumId[1],//this gives sku id		 	
	        $divQty = $a.closest("div").parent(), //getting parent div container which has 'swatchUnselected' class
		    $parentLI =  $a.closest("li.prd");
	        
		  
		    	
				if((typeof(quickView) != 'undefined') && quickView === true){
					STAPLES.SKU.captureSelect($skuId,$skuNum,"quickview");
                    }
				else
				{
					STAPLES.SKU.captureSelect($skuId,$skuNum,"skuset");//Third parameter is to identify whether the call is from sku/skuset page or quickview
		    	//Added this to fix the issue of title change in IE browser
					if (window.ActiveXObject){
						if(getIEVersion() < 9){
							updateTitle();
						}
					}
					STAPLES.SKU.displayHash("swatch_"+$skuId,methodFrom);
				}
		    var t_swatchclick_end = new Date().getTime();   
		 	  if( alertSwatchClick){
		         var etime=t_swatchclick_end-t_swatchclick_start;            
		         $("#debug").append('<br /> PerfSwatchClick =' + etime);
	        }

	    },
	    selectDropdown:function(methodFrom,optId){//dropdown functionality
	    	var t_selectdropdown_start =  (new Date()).getTime();
	    	var $optionRel;
	    	if(optId == undefined){
	    		$optionRel=	$(".sideBarWrapper select[name^=skuSetSelection]").find("option:selected").attr("rel");
				if((typeof(quickView) != 'undefined') && quickView === true) 
					$optionRel=$("#divOverlay .sideBarWrapper select[name^=skuSetSelection]").find("option:selected").attr("rel");
                } 
	    	else{
	    		var idVal = '#'+optId;
	    		$optionRel = $(idVal).attr("rel");
	    	}
                
	    	//var $dropDown = $(idVal).parents("[name=skuSetSelection]");
	    	//var $selectedIndex= $dropDown.attr("selectedIndex");// getting selected Index and caching it to "data" function for better performance
	    	// if($selectedIndex>=0)
	        //{
	            // getting value of 'rel' attribute from selected option
	    		var $skuNumId = $optionRel.split("_"),// we get sku num and id spilleted by "_"
	            $skuNum=$skuNumId[0],// this gives sku num
	            $skuId=$skuNumId[1];//this gives sku id		
	            //$divQty = $dropDown.closest("div").parent(), //getting parent div container which has 'swatchUnselected' class
	            //$parentLI =  $dropDown.closest("li.prd"); //getting parent LI which has all product information.This object has to be passed in swtchLoad function for data updation based on SWATCH selection   
		      
		    	
				if((typeof(quickView) != 'undefined') && quickView === true){
					STAPLES.SKU.captureSelect($skuId,$skuNum,"quickview");
					/*if (window.ActiveXObject){
						if(getIEVersion() < 9){
							$('#divOverlay select').fixSelect();
						}
					}*/
                    if(!isSecure){
                        STAPLES.SKU.ATCDropdownInit();
                    }   
                   
				}else{
					STAPLES.SKU.captureSelect($skuId,$skuNum,"skuset");//Third parameter is to identify whether the call is from sku/skuset page or quickview
					//Added this to fix the issue of title change in IE browser
					if (window.ActiveXObject){
						if(getIEVersion() < 9){
							updateTitle();
							/*$('select#skuSelectControl').fixSelect();*/
						}
					}
					STAPLES.SKU.displayHash("dropdown_"+$skuId,methodFrom);
					if(!isSecure){
						STAPLES.SKU.ATCDropdownInit();
					}   
				}
        //}
        var t_selectdropdown_end = new Date().getTime();   
					if( alertSelectDropDown){
						var etime=t_selectdropdown_end-t_selectdropdown_start;            
						$("#debug").append('<br /> PerfSelectDropdown =' + etime);
					}	
		        
				var skuSelect = $("#skuSelectControl");
				STAPLES.SKU.enableDisableCart(skuSelect);    
		},
		spanDropdown:function(methodFrom,$object){//dropdown functionality
	    	if($object == undefined){
				return false;
			}
	    	var t_selectdropdown_start = (new Date()).getTime();
            var objectClass = $object.attr("class");
			// we get sku num and id spilleted by "_"
			var skuNumId = objectClass.split("_"), 
				skuNum = skuNumId[0],// this gives sku num
	            skuId = skuNumId[1];//this gives sku id		
	            
			if((typeof(quickView) != 'undefined') && quickView === true){
				STAPLES.SKU.captureSelect(skuId,skuNum,"quickview");
				if (window.ActiveXObject){
					if(getIEVersion() < 9){
						$('#divOverlay select').fixSelect();
					}
				}
			}else {
				STAPLES.SKU.captureSelect(skuId,skuNum,"skuset");//Third parameter is to identify whether the call is from sku/skuset page or quickview
				//Added this to fix the issue of title change in IE browser
				if (window.ActiveXObject){
					if(getIEVersion() < 9){
						updateTitle();
						/*$('select#skuSelectControl').fixSelect();*/
					}
				}
				STAPLES.SKU.displayHash("dropdown_"+skuId,methodFrom);
			}
			var t_selectdropdown_end = new Date().getTime();   
				
			if( alertSelectDropDown){
				var etime=t_selectdropdown_end-t_selectdropdown_start;            
				$("#debug").append('<br /> PerfSelectDropdown =' + etime);
			}	
		
			var skuSelect = $(".skuSelectControl");
			STAPLES.SKU.enableDisableCart(skuSelect);    
		},
		activateDropDown:function(id){
			$(id +' a').click(function(event){
				event.preventDefault();
				SWATCH.spanDropdown('selectDropdown',$(this));
			});
		}
	}
STAPLES.Onload.addLoadEvent(function() {
    SWATCH.thumbNailHover();
});
	
////////////////////////////////////////////////////////////////////////////////////////
//Function Name		:	selectSingleNodeForNonIE()
//Description		:   Infosys BP2-Method used to fetch a single node from XML
//Input Parameters	:	tempXmlDoc, elementPath
//Output Parameters	:	node selected
///////////////////////////////////////////////////////////////////////////////////////// 

function selectSingleNodeForNonIE(tempXmlDoc, elementPath){ 
	if (document.implementation && document.implementation.createDocument){         
		var nodes=tempXmlDoc.evaluate(elementPath, tempXmlDoc, null, XPathResult.ANY_TYPE, null);
		var results=nodes.iterateNext();
		return results;       
	}
}

function selectSingleNode(xmlDoc, xPath) {
    if (xmlDoc == null) return null;
    var nodes = xmlDoc.selectNodes(xPath);
    if (nodes.length > 0) {
        return nodes[0];
    }
    return null;
} 
// Sapient QuickView Overlay //


	////////////////////////////////////////////////////////////////////////////////////////
	//	Function Name		:	showOverlay()
	//	Description			:	This function measures the height and width of the browser
	//							viewport. It places a mask over the viewport and then 
	//							displays the QuickView overlay via an ajax call.
	//	Input Parameters	:	None
	//	Output Parameters	:	None
	/////////////////////////////////////////////////////////////////////////////////////////
	
function showOverlay(partNumber){
	var file = 'main.js';
	var methodName = 'showOverlay';
	var t_displayResult_start = new Date().getTime();
	var errorURL = 'http://' + serverName +propertyValues.POST_DOMAIN+'logging?catalogId='+propertyValues.DEF_CATALOG_ID+'&langId='+propertyValues.DEF_LANG_ID+'&storeId='+propertyValues.DEF_STORE_ID;
	//url of quickview template
    var url = propertyValues.POST_DOMAIN+'quickview?catalogId='+propertyValues.DEF_CATALOG_ID+'&langId='+propertyValues.DEF_LANG_ID+'&storeId='+propertyValues.DEF_STORE_ID+'&partNumber='+partNumber;
    //Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
    if(typeof quickviewCertonaRecommendationTrackingSwitch!= "undefined" && quickviewCertonaRecommendationTrackingSwitch=='ON'){
    	quickviewCertonaRecommendationTrackingSwitch='OFF';
    	url=url+'&certonaRecommendationTrackingSwitch=ON';	
    }   
   //Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes
	url = 'http://' + serverName + url;
    
    //get window height & width
    var H = $(document).height();
    var W = $(window).width();
    
    //get window scroll value if any
    var adjustTop = $(window).scrollTop();
    
    //calculate midpoint of the viewport to align the overlay
    var mid = (W/2);
    var left = (mid - 390);
    
    //create the mask
    
	createMask(H);
	 if (window.ActiveXObject){
		if(getIEVersion() < 9){
   	  		updateTitle();
		}
     }
    //End of BP2
	if(typeof(STAPLES.SKU.xmlSkuSetString)=='undefined' || STAPLES.SKU.xmlSkuSetString === undefined || STAPLES.SKU.xmlSkuSetString === null){	
		STAPLES.Utilities.loadXMLDoc(propertyValues.XSL_PATH+"skuset.xsl",STAPLES.SKU.skuXlsTransform);
	}
	if(typeof(STAPLES.SKU.xmlSkuSidebarString)=='undefined' || STAPLES.SKU.xmlSkuSidebarString === undefined || STAPLES.SKU.xmlSkuSidebarString === null){	
		STAPLES.Utilities.loadXMLDoc(propertyValues.XSL_PATH+"skusidebar.xsl",STAPLES.SKU.skuSideXlsTransform);
	}
    $.ajax({
    url: url,
    cache:false,
    type:"get",
    dataType: "html",
    timeout: 20000,
    success: function(data){
          
    	  setTimeout("$('#mask, #close').click(function(){$('#mask').remove();$('.quickViewOverlay').remove();quickView = false;xmlSkuDoc = undefined;});", 1000);
          
          //append the Quickview window to the body tag
          $("body").prepend(data);
          
          //set the top and left values of the Quickview window once it's in DOM
          $(".quickViewOverlay").css('left', left);
          if (adjustTop > 0){
                $(".quickViewOverlay").css('top', adjustTop + 20);
         }

          //set static height on quickview overlay, so if a long promo message is expanded, the quickview overlay stays the inital height
          //and adds a scroll bar
          var pdWrapperHeight = $('.quickViewOverlay .productDetailsWrapper').height();
          var sidebarHeight = $('.quickViewOverlay .sideBarWrapper').height();

          if (pdWrapperHeight < sidebarHeight) {
            $(".quickViewScroll").css('height', (sidebarHeight + 30) + 'px');
          }
          else {
            $(".quickViewScroll").css('height', (pdWrapperHeight+ 30) + 'px'); 
          }

          if (window.ActiveXObject){
        	  if(getIEVersion() >= 9){
        		  removeHashForIE9();
        	  }
              /*else if(getIEVersion() < 9){
							$('#divOverlay select').fixSelect();
						}*/
						}
					
	},
    error: function(){debugMessages.push('QuickviewPage: timeout or xml parse error on ' + url);
	$("#debug").append('<br />QuickviewPage: timeout or xml parse error on ' + url);	
		if (propertyValues.ajaxLoggingSwitch =='ON'){
			var ajaxExecutionTime= (new Date().getTime())-t_displayResult_start;
			errorURL=errorURL+'&methodName='+methodName+'&fileName='+file+'&ajaxURL='+encodeURIComponent(url)+'&timeTaken='+ajaxExecutionTime+'&perfLogSwitch='+propertyValues.ajaxPerformanceSwitch;
			$.ajax({
		 url: errorURL,
    	 type: 'POST',
    	 dataType: 'xml',
	     timeout: 20000,
		 success:function(){
				$("#pseudoblanket").removeClass('hide');
				$("#ajaxErrorMsg").removeClass('hide');
		 		$("dl.error dd").html(propertyValues.compAjaxErrorString+" <a href=\"javascript:getTheURLAndProceed();\">Try again</a>");
		 }
	})
}

removeMask();}
});
}

STAPLES.Onload.addLoadEvent(function(){
	$(window).resize(function(){
		if((typeof(quickView) != 'undefined') && quickView === true) {
	    var W = $(window).width();
	    
	    //get window scroll value if any
	    var adjustTop = $(window).scrollTop();
	    
	    //calculate midpoint of the viewport to align the overlay
	    var mid = (W/2);
	    var left = (mid - 390);
	    $(".quickViewOverlay").css('left', left);
		}
	});
});
    
//TODO: remove me
//capture the Quickview button click and call the showOverlay function
//STAPLES.Onload.addLoadEvent(function(){
//	$("div.quickView a, div.bgQuickView a").click(function(event){       
		//prevent default click behavior
//		event.preventDefault();
//		QV.showOverlay();		
//	});
//});

// Sapient add to cart Overlay //
var ADDTOCART = {

    ////////////////////////////////////////////////////////////////////////////////////////
    //	Function Name		:	showCartOverlay()
    //	Description			:	This function measures the height and width of the browser
    //							viewport. It places a mask over the viewport and then
    //							displays the Add to cart overlay via an ajax call.
    //	Input Parameters	:	None
    //	Output Parameters	:	None
    /////////////////////////////////////////////////////////////////////////////////////////
	
	showCartOverlay:function(){
		//url of add to cart template
		var url = "addToCart.html";
		//get window height & width
		var H = $(document).height();
		var W = $(window).width();
		
		//get window scroll value if any
		var adjustTop = $(window).scrollTop();
		
		//calculate midpoint to align the overlay
		var mid = (W/2);
		var left = (mid - 390);
		
		//mask the basckground
		createMask(W, H);
        var $maskDiv = $('#mask');
		
		var popUpPosition = {
			"left":left + 150,
			"top": adjustTop + 100		
			}
        /*$maskDiv.append('<img class="loader" alt="loading" src="sbd/img/ico/ajax-loader.gif"/>');		      
		
        $maskDiv.find("img.loader").css({
            'top':adjustTop + 300,
            'left':left + 350,
            'position':'absolute'
        });*/
		ADDTOCART.createPopup(propertyValues.AddToCart.waitMessage, popUpPosition, false);
		$("#popup").find("a.clsBtn").css("visibility","hidden");
		$.ajax({
            url: url,
            cache:false,
            type:"get",
            timeout : 0,
            dataType: "html",
            success: function(data){
                //append the data to the body tag
               ADDTOCART.createDelay(1000);
               $("#popup").remove();
               $("body").append(data);
            	
            	//set the top and left values of the add to cart window once it's in DOM
           		$("div.addtocart").css('left', left);
           		if (adjustTop > 0){
	           		$(".addtocart").css('top', adjustTop + 20);
	           	}
	           	//re-bind the controls with enough delay to allow the insert to finish
	           	//run prepcarousel func for the carousels in the addtocart overlay 
				//setTimeout("ADDTOCART.removeMask()", 100);
                setTimeout("$('#mask, #close').click(function(){ADDTOCART.removeMask();}); STAPLES.Personalization.prepCarousel('also_box',true);STAPLES.Personalization.prepCarousel('item_box',true);", 100);
            },
            error: function(x, t, m) {
				$("#popup").remove();				
               if(t==="timeout") 
				{                   
					ADDTOCART.createPopup(propertyValues.AddToCart.addToCartTimeOutMessage, popUpPosition, true);
                } 
				else {
                    ADDTOCART.createPopup(propertyValues.AddToCart.addToCartErrorMessage,popUpPosition, false);
                }
            }
         });
    },
	
	createPopup: function(errMsg, position, viewCartButton){
		var popUpHtml = '<div id="popup"><h4 class="a200"><span>Attention</span><a title="Close" class="clsBtn" href="#">'+propertyValues.AddToCart.Close+'</a></h4><div class="errmsg"><p>' + errMsg + '</p></div></div>';
		$("body").append(popUpHtml);
		if(viewCartButton == true)
		{
			$("#popup div.errmsg").append('<a title="View Title" href="#">'+propertyValues.AddToCart.ViewCart+'</a>');
		}
		 $("#popup").css({
                    'top':position.top,
                    'left':position.left,
                    'position':'absolute'
                });
		$("#popup a.clsBtn, #popup div.errmsg a, #mask").click(function(e){
			e.preventDefault();
			ADDTOCART.removeMask();
		});		
	},
    removeMask: function(){          
        $("#mask").remove();
        //$('.addtocart').find('.p01').removeClass('ready');
        $(".addtocart").remove();
        $("body").css('overflow','auto');
        $("body #popup").empty().remove();
    },
    // This is the dummy function crested in order to create the delay.should be removed while integrating in actual scenarioo
    createDelay: function(millis){
		
        var date = new Date();
        var curDate = null;
        do {
            curDate = new Date();
        }while(curDate-date < millis);
		
    }  
}

var SEARCH = {
   openTab : function($anchrObj){	
		$anchrObj.closest(".content").find("div.container").addClass("hide");
		$anchrObj.closest(".content").find("a.arrow").removeClass("open").addClass("close");
		$anchrObj.next().removeClass("hide");
        $anchrObj.removeClass("close").addClass("open");
    },
    closeTab : function($anchrObj){		
        $anchrObj.next().addClass("hide");
        $anchrObj.removeClass("open").addClass("close");

    }
}

STAPLES.Onload.addLoadEvent(function(){
  $("#prvlditems a.arrow, #pnrtools a.arrow").click(function(e){
		e.preventDefault();	 
		if($(this).next().hasClass("hide"))
		{
				SEARCH.openTab($(this));
		}else
		{
			SEARCH.closeTab($(this));
		}		
	});
});
STAPLES.Onload.addLoadEvent(function(){
$("#searchresults div.content").find("a.clsbtn").click(function(e){
		e.preventDefault();	
		$(this).parent().addClass("hide");
		$(this).parent().prev().removeClass("open").addClass("close");
	});					  
});


// JQ Print plugin embedded for Printing Quick View Overlay Only
//-----------------------------------------------------------------------
//eros@recoding.it
//jqprint 0.3
//requires jQuery 1.3.x
//------------------------------------------------------------------------
(function($) {
	var opt;
	$.fn.jqprint = function (options) {
		opt = $.extend({}, $.fn.jqprint.defaults, options);
		var $element = (this instanceof jQuery) ? this : $(this);
		if (opt.operaSupport && $.browser.opera)
		{
			var tab = window.open("","jqPrint-preview");
			tab.document.open();
			var doc = tab.document;
	    }
		else
		{
			var $iframe = $("<iframe />");
			if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }
			$iframe.appendTo("body");
			var doc = $iframe[0].contentWindow.document;
	    }
		if (opt.importCSS)
		{
			if ($("link[media=print]").length > 0)
			{
				$("link[media=print]").each( function() {
					doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
				});
			}
			else
			{
				$("link").each( function() {
					doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
				});
			}
		}
		if (opt.printContainer) { doc.write($element.outer()); }
		else { $element.each( function() { doc.write($(this).html()); }); }
		doc.close();
		(opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
		setTimeout( function() { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
	}
	$.fn.jqprint.defaults = {
	debug: false,
	importCSS: true,
	printContainer: true,
	operaSupport: true
	};
	//Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
	jQuery.fn.outer = function() {
	return $($('<div></div>').html(this.clone())).html();
	}
})(jQuery); 
    	        
/* Sapient JS Code Ends */

function displayPrice(idObject){
    $(idObject).parents('.pricenew').css('zIndex',8010); 
    $(idObject).parents(".theprice").siblings(".mathflyout").removeClass('hide');
    	    }
    	    
function hidePrice(idObject){
    $(idObject).parents('.pricenew').css('zIndex',0);
    $(idObject).parents(".theprice").siblings(".mathflyout").addClass('hide');
	    }
	    
//checkoutreviewandpay.jsp hide payment information
function togglePaymentInfo(){
	var ccPaymentInfoDivs = $(".ccpaymentinfo"); // The credit card payment information elements, not all under one div.
	var arPaymentInfoDivs = $(".arpaymentinfo");
	var paymentErrorDiv = $("#PaymentInfoError");	
	
	//default state is to hide the credit card payment information 
	if($("#crpaymentradiobtn").is(":checked")){
		ccPaymentInfoDivs.show();
	} else {
		ccPaymentInfoDivs.hide(); //The credit card payment information section.
	}
	if(!($("#arpaymentradiobtn").is(":checked"))) {
		arPaymentInfoDivs.hide();		
	}
	
	// show the credit card payment information when the pay by credit card radio btn is selected
	var crPaymentRadioBtn = $("#crpaymentradiobtn");
	crPaymentRadioBtn.click(function(){
		ccPaymentInfoDivs.show();
		arPaymentInfoDivs.hide();
		paymentErrorDiv.hide();
		 $("#PaymentInformation .a500 img").remove();
		toggleMMOPSummaryTotals();
	});

	// hide the credit card payment info section when open account payment is selected
	var arPaymentRadioBtn = $("#arpaymentradiobtn");
	arPaymentRadioBtn.click(function(){
		arPaymentInfoDivs.show();
		ccPaymentInfoDivs.hide();
		paymentErrorDiv.hide();
		 $("#PaymentInformation .a500 img").remove();
		toggleMMOPSummaryTotals();
	});
}
function toggleMMOPSummaryTotals() {
	// displayMMOP flag is set in checkoutreviewpayDetails.jsp
	// show mmop totals in order summary section only if respective payment methods are applied 
	if (displayMMOP) {
		var pattern = new RegExp("[\$\,]","g");	
		var txtSGCAmt = $("#sgcAmountApplied").text().replace(pattern,"");
		var txtSRCCAmt = $("#srccAmountApplied").text().replace(pattern,"");
		if (txtSGCAmt == 0) {
			$("#sgcTotal").hide();		
		} else {
			$("#sgcTotal").show();
		}
		if (txtSRCCAmt == 0) {			
			$("#srccTotal").hide();
		} else {
			("#srccTotal").show();
		}
	}
}

STAPLES.Onload.addLoadEvent(togglePaymentInfo);

////////////////////////////////////////////////////////////////////////////////////////
//Function Name		:	findPos
//Description		:	Method used to find the position(from top) of the html element
//Input Parameters	:	obj
//Output Parameters	:	None
//Author			:Infosys -BP2
///////////////////////////////////////////////////////////////////////////////////////// 	
function findPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return curtop;
}
////////////////////////////////////////////////////////////////////////////////////////
//Function Name		:	updateTitle
//Description		:	Method used to reset the title with original title 
//Input Parameters	:	None
//Output Parameters	:	None
//Author			:Infosys -BP2
///////////////////////////////////////////////////////////////////////////////////////// 
function updateTitle(){
	if(pageId == 'skuskuset'){
    	 var originalTitle = document.title;
    	 if(document.title.indexOf("#id")!=-1){
    		 originalTitle = document.title.split("#id")[0];
    	 }
    	 if(document.title.indexOf("#collAttr")!=-1){
    		 originalTitle = document.title.split("#collAttr")[0];
    	 }
    	document.attachEvent('onpropertychange', function (evt)  {
    			 if(evt.propertyName === 'title' && document.title !== originalTitle){  
    	    		document.title=originalTitle;     
    			 } 
        });
     }
     else{
    	 var originalTitle = document.title.split("#")[0];	 
         document.attachEvent('onpropertychange', function (evt)  {
    	     if(evt.propertyName === 'title' && document.title !== originalTitle){  
    	    		document.title=originalTitle;     
    	     } 
        });
     }
}

////////////////////////////////////////////////////////////////////////////////////////
//Function Name		:	getIEVersion
//Description		:	Method used to get the Internet Explorer browser version
//Input Parameters	:	None
//Output Parameters	:	version
//Author			:Infosys -BP2
///////////////////////////////////////////////////////////////////////////////////////// 
function getIEVersion(){
	var version = 0;    
	if (navigator.appVersion.indexOf("MSIE") != -1){ 
		version = parseFloat(navigator.appVersion.split("MSIE")[1]);    
		return version;  
	}
}
////////////////////////////////////////////////////////////////////////////////////////
//Function Name		:	removeHashForIE9
//Description		:	Method used to remove the hash from title in ie9
//Input Parameters	:	None
//Output Parameters	:	None
//Author			:	Infosys -BP2
///////////////////////////////////////////////////////////////////////////////////////// 
function removeHashForIE9(){
	if(document.title.indexOf("#id")!=-1){
		document.title = document.title.split("#id")[0];
 	}else if(document.title.indexOf("#collAttrId")!=-1){
 		document.title = document.title.split("#collAttrId")[0];
 	}else if(document.title.indexOf("viewDetails")!=-1){
 		document.title = document.title.split("#")[0];
 	}
}

//Added for BR4
function ESDOverlay(orderId){
	var file = 'main.js';
	var methodName = arguments.callee.name;
	var t_displayResult_start = new Date().getTime();
	var errorURL = 'http://' + serverName +'/office/supplies/logging?catalogId=10051&langId=-1&storeId=10001';
	//url of quickview template
    var url = '/office/supplies/ESDOverlay?orderId='+orderId;
	url = 'http://' + serverName + url;
    
    //get window height & width
    var H = $(document).height();
    var W = $(window).width();
    
    //get window scroll value if any
    var adjustTop = $(window).scrollTop();
    
    //calculate midpoint of the viewport to align the overlay
    var mid = (W/2);
    var left = (mid - 390);
    
    //create the mask
    
	createMask(H);
	 //if (window.ActiveXObject){
		//if(getIEVersion() < 9){
   	  		//updateTitle();
		//}
     //}
    //End of BP2
    
    $.ajax({
	    url: url,
	    cache:false,
	    type:"get",
	    dataType: "html",
	    timeout: 20000,
	    success: function(data){
	          //append the Quickview window to the body tag
	          $("body").prepend(data);
	          //set the top and left values of the Quickview window once it's in DOM
	          $(".esdOverlay").css('left', left);
	          if (adjustTop > 0){
	                $(".esdOverlay").css('top', adjustTop + 20);
	         }		
		},
	    error: function(){
			alert("error");
			debugMessages.push('QuickviewPage: timeout or xml parse error on ' + url);
			$("#debug").append('<br />QuickviewPage: timeout or xml parse error on ' + url);	
			if (propertyValues.ajaxLoggingSwitch =='ON'){
				var ajaxExecutionTime= (new Date().getTime())-t_displayResult_start;
				errorURL=errorURL+'&methodName='+methodName+'&fileName='+file+'&ajaxURL='+encodeURIComponent(url)+'&timeTaken='+ajaxExecutionTime+'&perfLogSwitch='+propertyValues.ajaxPerformanceSwitch;
				$.ajax({
					 url: errorURL,
			    	 type: 'POST',
			    	 dataType: 'xml',
				     timeout: 20000,
					 success:function(){
							$("#pseudoblanket").removeClass('hide');
							$("#ajaxErrorMsg").removeClass('hide');
					 		$("dl.error dd").html(propertyValues.compAjaxErrorString+" <a href=\"javascript:getTheURLAndProceed();\">Try again</a>");
					 }
				})
			}
			removeESDMask();
	    }
    });
}

function removeESDMask(refreshPage){ 
    $("#mask").remove();  
    $("body").css('overflow','auto');
    $("body #popup").empty().remove();
}
// -->

////////////////////////////////////////////////////////////////////////////////////////
//Function Name		:	customerSegmentCookieCreate
//Description		:	Method used to trigger an ajax call to contact LEAP service
//Input Parameters	:	URL
//Output Parameters	:	None
//Author			:	Infosys -T&T
///////////////////////////////////////////////////////////////////////////////////////// 
function customerSegmentCookieCreate(urlStr){
	var t_LEAPService_start =  (new Date()).getTime();

	try {
		
		$.ajax({
		    url: urlStr,
		    type: 'GET',
		    dataType: 'html',
		    timeout: globalTimeout,
		    //alert("urlStr:"+urlStr);
		//alert("globalTimeout:"+globalTimeout);
		    error: function(){
			//if the document fails to load in the alloted time or xml parse error, do something here.
			debugMessages.push('LEAP: timeout or xml parse error on ' + urlStr);
			$("#debug").append('<br />LEAP: timeout or xml parse error on ' + urlStr);				
		    },
		    success: function(returnXml){	
		    	var t_LEAPService_end =  (new Date()).getTime();
				if(alertCreateCookie){
					var etime=t_LEAPService_end-t_LEAPService_start;		
					$("#debug").append('<br /> PerfForLEAP AJAX call =' + etime);
				 }
		    }
		
		}) 
	} catch (e) {
	
		//If the call is bad, do something here.
		debugMessages.push('LEAP: invalid return on ' + urlStr);			
		$("#debug").append('<br />LEAP: invalid return on ' + urlStr);
	}
	
	
}

////////////////////////////////////////////////////////////////////////////////////////
//Function Name		:	altStyleTableRows
//Description		:	method used to style rows alternatively - used for personal info page
//Input Parameters	:	id of table to style
//Output Parameters	:	None
//Author			:	M.Mashkevich
/////////////////////////////////////////////////////////////////////////////////////////
function altStyleTableRows(id) {
	var rows = $("#" + id).find("tr"), i;

	for (i = 0; i < rows.length; i++) {
		if (i % 2 == 0) {
			rows.eq(i).addClass("evenrowcolor");
		} else {
			rows.eq(i).addClass("oddrowcolor");
		}
	}
}

if (pageId == "personalinfo") {
	STAPLES.Onload.addLoadEvent(function() {
		altStyleTableRows('alternatecolor');
	});
}

/////////////////////////////////////////////////////////////////////////////////
// Below functions are used for the ink toner search in the header             //
// Originally devloped by creative team as part of header/footer A/B testing   //
/////////////////////////////////////////////////////////////////////////////////

// global variables
var eTarget, eTargetParent, eRelatedTarget;

function setEventTargets(event) {
    event.target ? eTarget = event.target : eTarget = event.srcElement;
    event.relatedTarget ? eRelatedTarget = event.relatedTarget : eRelatedTarget = event.toElement;
    eTargetParent = eTarget.parentNode;
}

function addListener(obj, triggerEvent, callFunction, capture) {
    obj.addEventListener ? obj.addEventListener(triggerEvent, callFunction, capture) : obj.attachEvent('on' + triggerEvent, callFunction);
}

function removeListener(obj, triggerEvent, callFunction, capture) {
    obj.removeEventListener ? obj.removeEventListener(triggerEvent, callFunction, capture) : obj.detachEvent('on' + triggerEvent, callFunction);
}

function showinktoner(event){
    setEventTargets(event);
	if( $('#searchby').hasClass('open') ){
		$('#searchby').removeClass('open');
		$('#inksearchoptions').removeClass('display');
	} else {
		$('#searchby').addClass('open');
		$('#inksearchoptions').addClass('display');
	}
}
    
    function changeoption(event){
        setEventTargets(event);
    
        var inktoner = document.getElementById('inksearchselected').getElementsByTagName('span')[0];
        
        // elements of search options used for populating selection view
        var optionsElements = $("#inksearchoptions li");

        // pattern used to extract just title text
        var regexPatt = />.*/i;

        // get the text using pattern 
        if (optionsElements.length > 0) {
            var cartridgeTitle = $.trim(regexPatt.exec(optionsElements[0].innerHTML)[0].substring(1));
            var printerModelTitle = $.trim(regexPatt.exec(optionsElements[1].innerHTML)[0].substring(1));
        }

        if (eTarget.value == 'model'){
            var form1 = document.getElementById('headCartForm');
            form1.hasAttribute ? form1.setAttribute('class', 'no_display') : form1.className = 'no_display';
            
            var form2 = document.getElementById('headModelForm');
            form2.hasAttribute ? form2.setAttribute('class', 'display') : form2.className = 'display';
            
            inktoner.innerHTML = printerModelTitle;
            
        }
        else if (eTarget.value == 'cartridge'){
            var form1 = document.getElementById('headCartForm');
            form1.hasAttribute ? form1.setAttribute('class', 'display') : form1.className = 'display';
            
            var form2 = document.getElementById('headModelForm');
            form2.hasAttribute ? form2.setAttribute('class', 'no_display') : form2.className = 'no_display';
            
            inktoner.innerHTML = cartridgeTitle;
        }

        
        var searchby = document.getElementById('searchby');
        searchby.hasAttribute ? searchby.setAttribute('class', '') : searchby.className = '';
        
        var searchoptions = document.getElementById('inksearchoptions');
        searchoptions.hasAttribute ? searchoptions.setAttribute('class', '') : searchoptions.className = '';
        
    }


/////////////////////////////////////////////////////////////////////////////////
// Below functions are used for the email subscription from in footer          //
// Originally devloped by creative team as part of header/footer A/B testing   //
/////////////////////////////////////////////////////////////////////////////////

function showform(){
    var emailsignup = document.getElementById('emailsignup');
    emailsignup.hasAttribute ? emailsignup.setAttribute('class', 'z_open') : emailsignup.className = 'z_open';
    
    var emailsignupBTN = emailsignup.getElementsByTagName('span')[0];
    removeListener(emailsignupBTN, 'click', showform, false);
    addListener(emailsignupBTN, 'click', hideform, false);
}

function hideform(){
    var emailsignup = document.getElementById('emailsignup');
    emailsignup.hasAttribute ? emailsignup.setAttribute('class', '') : emailsignup.className = '';
    
    var emailsignupBTN = emailsignup.getElementsByTagName('span')[0];
    removeListener(emailsignupBTN, 'click', hideform, false);
    addListener(emailsignupBTN, 'click', showform, false);
}
//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--Start of changes
function setQuickviewCertonaRecommendationTrackingSwitch(CertonaSwitch){
	if(CertonaSwitch=='ON'){
	  quickviewCertonaRecommendationTrackingSwitch='ON';
	 }
}
function deleteCertonaCookie() {
	  document.cookie = escape('externalize')+'='+escape('certona')+';expires=01/01/2001 00:00:00;path=/';
}
//Added by cognizant on 07-09-2012 as part of ST-310B for tracking certona recommendations--End of changes

/* Ananda - As part of ROPS project get the storeavailability message from MVS call
 * to display the store availability message in sku page.
 * Method:loadStoreAvailability
 */

function loadStoreAvailability(urlStr){
	var t_ROPSService_start =  (new Date()).getTime();	
	var ropsAjaxTimeout = 10000;//Standard Ajax timeout is 10 secs as per prod for the service call over ESB.
	try {
		
		$.ajax({
		    url: urlStr,
		    type: 'GET',
		    dataType: 'html',
		    timeout: ropsAjaxTimeout,
		    error: function(){
			//if the document fails to load in the alloted time or xml parse error, do something here.
			debugMessages.push('MVS: timeout or xml parse error on ' + urlStr);
			$("#debug").append('<br />MVS: timeout or xml parse error on ' + urlStr);				
			},
		    success: function(returntxt){								
		    	var response = $('<div/>').html(returntxt);
		    	if(returntxt!=null && response.find("#availMsg").html()!=null && response.find("#availMsg").html().length>0){		    		
		    		var availableMsg = response.find("#availMsg").html();
			    	var ropsButton = response.find("#ropsButton").html();
			    	$("#availableMsg").removeClass("hide");
			    	if(availableMsg!=null && trim(availableMsg).length>0){
			    		$("#availableMsg").html(availableMsg);
			    	}
			    	if(ropsButton!=null && trim(ropsButton).length>0){
			    		$("#ropsButton").html(ropsButton);
			    	}
			    	var t_MVSService_end =  (new Date()).getTime();
					var etime=t_MVSService_end-t_ROPSService_start;		
					$("#debug").append('<br /> PerfFormMVS AJAX call =' + etime);

		    	}else{
		    		$("#debug").append('<br /> No MVS call made or the SKU is not ROPS Enabled.');
		    	}

                 //Fix for flash reloading issue CR112899: when the ajax call is made, the scene7 flash reloads in FF and Chrome.
                 //If the user is moused over the viewer image at the time of the ajax call being made, the flash reloads
                 //at the incorrect wider width (the width of the original viewer + the width of the flyout), putting the product 
                 //image at the middle of the page. To circumvent the issue, we need to remove the swf after the Ajax call succeeds and 
                 //recreate the whole flash call in the page again. 
                /* swfobject.removeSWF(myName);
                $('div#innerflashcontainer').append('<div id="scene7_player"></div>');
                if((typeof(quickView) != 'undefined') && quickView === true) {
                    swfobject.embedSWF(viewerUrl, 'scene7_player', '220', '200', '9.0.124.0', false, flashvars, params, attributes);
                }
                else {
                    swfobject.embedSWF(viewerUrl, 'scene7_player', '380', '303', '9.0.124.0', false, flashvars, params, attributes);
                }*/
                }
		}) 
	} catch (e) {
		//If the call is bad, do something here.		
		debugMessages.push('MVS: invalid return on ' + urlStr);			
		$("#debug").append('<br />MVS: invalid return on ' + urlStr);
	}	
	
}

/* Start ST 556: Homepage Takeover overlay */
// Function for Homepage Takeover
function createHomePageTakeoverOverlay() {
	var queue = [];			
	$('#searchkey').blur();	
	$('body').append($('#takeover'));	
	$('#takeover_content_img img').css('visibility','hidden');
	$('#takeover > div.takeover_overlay').css({opacity: 0}).show().animate({opacity: 0.6});
	function queue_animation() {
		if (queue.length > 0) {
			keyframe = queue.shift();
			if (keyframe[1] = 'fadeIn') {
				$(keyframe[0]).fadeIn(keyframe[2], function() {
					setTimeout(function() { queue_animation(); }, jQuery.fx.off?0:(keyframe[3] || 1000));
				});
			}
		}
	}
	queue.push(Array('#takeover > div.takeover_content', 'fadeIn', 1000));	
	queue_animation();
	$(' #takeover div.takeover_overlay,').click(function() {
		$('#takeover').remove();					
		return false;		
	})
}

// Function to set the image position to Center 
function setImagePosition() {
	//set the top and left position of the overlay image
	if($(window).width() > 0 && $('#takeover_content_img').width()>0) {
		x_pos = $(window).width()/2 - $('#takeover_content_img').width()/2;
		x_pos = x_pos+"px";
		h_pos = $(window).height()/2 - $('#takeover_content_img').height()/2;
		h_pos = h_pos+"px";
		$('#takeover_content_img').css({'left':x_pos,'top':h_pos});
		if($('#takeover_content_img object').length > 0) {
			$('#takeover_content_img object').css({'left':'0px','top':'0px'});
		} else {
			$('#takeover_content_img img').css({'left':'0px','top':'0px'});
		}
	}
	$('#takeover, #takeover div.takeover_overlay').css({height: $(document).height()+250});
	$('#takeover_content_img img').css('visibility','visible');
	$('#takeover').css('z-index',' 99900');		
	$('#takeover_content_img').css('opacity',0);
	$('#takeover_content_img img').css('opacity',0);
	if(hasOnlyFlashImage()) {
		$('#takeover_content_img').hide();
	}	
	homepageInrtval = setInterval(function() {
		clearInterval(homepageInrtval);
		getHighestW($('#takeover_content_img'),function(wx,hx) {
			var leftA = ($(window).width()-wx)/2;
			var topA = ($(window).height()-hx)/2;
			$('#takeover_content_img').css('left',leftA); 
			$('#takeover_content_img').css('top',topA+$(window).scrollTop());
			$(document).scrollTop(0);			
			$(document).scroll(function() {
				$('#takeover_content_img').css('top',topA+$(window).scrollTop());
			})				
			$('#takeover_content_img').show();
			$('#takeover_content_img').animate({opacity:1},200);
			$('#takeover_content_img img').animate({opacity:1},200);
		});
	},1000)		
};

// Function For Flash Image
function hasOnlyFlashImage(){
	if($('#takeover_content_img').children('*').length==1 && $('#takeover_content_img').children('object').length==1) {		
		return true;		
	}
	return false;
}

// Calculating the highest width
function getHighestW(div,loadComplete) {
	var imgWs=[];
	var imgHs=[];
	var img=0;
	//whether there is any Image 
	if(div.find('img').length>0) {
		div.find('img').load(function() {
			img++;
			if (img==div.find('img').length) {  
				div.find("*").each(function(n) {
					imgWs[n]=($(this).width()); 
					imgHs[n]=($(this).height()); 
				}) 
				imgWs.sort(function(a,b){return b-a});
				imgHs.sort(function(a,b){return b-a});
				loadComplete(imgWs[0],imgHs[0]);
			}	
		});
	}
	// When No Image found
	div.find("*").each(function(n) {
		imgWs[n]=parseInt($(this).width());
		imgHs[n]=parseInt($(this).height()); 
	})  
	imgWs.sort(function(a,b){return b-a});
	imgHs.sort(function(a,b){return b-a});	
	loadComplete(imgWs[0],imgHs[0]);
}

// Start of changes for ST566B Added by cognizant
function checkIfCampainHasChanged() {
	var lastUpdateTime_fromDB = $('#lastupdateTime').attr('value');
	if(lastUpdateTime_fromDB) {
		var lastUpdateTime_cookie = STAPLES.Cookies.getCookie("z_hpt_lastUpdateTime");	
		if(!lastUpdateTime_cookie || lastUpdateTime_cookie != lastUpdateTime_fromDB){
			STAPLES.Cookies.setCookie("z_hpt_lastUpdateTime",lastUpdateTime_fromDB,38);
			deleteCookie("z_homepage_takeover");			
		}
	}
}

// Delete Cookie for the Homepage Takeover depending on the Last Updated Time
function deleteCookie(cookieName) {	
	document.cookie = escape(cookieName)+'='+escape('0')+';expires=01/01/2001 00:00:00;path=/';	
};

//Adding Function to Close HTML Takeover Content (This content comes from the Creative team)
//Needs to be removed if no Flash Takeover will be performed.
//function z_close_takeover() {
	//$("#takeover").remove();
//}
//End of changes for ST566B Added by cognizant

// Function to set the home page takeover overlay
STAPLES.Onload.addLoadEvent(function() {	
	//Start of changes for ST566B Added by cognizant
	checkIfCampainHasChanged();
	//End of changes for ST566B Added by cognizant
	var z_show_takeover = true;
	//setting up the Cookies for Homepage Takeover
	if (typeof(STAPLES.Cookies.getCookies) == 'function' && STAPLES.Cookies.getCookies().z_homepage_takeover) {
		if ($.inArray(STAPLES.Cookies.getCookies().z_homepage_takeover, '1'.split(',')) != -1) { 
			z_show_takeover = false; 
		}
	}			
	if (z_show_takeover) {					
		STAPLES.Cookies.setCookie("z_homepage_takeover",1,38);							
		createHomePageTakeoverOverlay();		
		setImagePosition();			
	}	
});	
/*END ST556: Homepage takeover overlay*/
