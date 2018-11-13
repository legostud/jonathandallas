
var chat_switch = "ON";
var chat_locale_switch = "ON";
var chat_open_time = "8:00";
var chat_closed_time = "20:00";
var chat_open_days = "23456";
		
function chatActive(dateStamp) {
	var pass = 'false';
	var daylen = 1440; // 1440 mins in a day.
	var hourlen = 60; // 60 mins in an hour
	if (chat_switch.toUpperCase() == "ON" && chat_locale_switch.toUpperCase() == "ON") {
		var daysarray = chat_open_days.split('');
		var chat_open_time_array = chat_open_time.split(':');
		var chat_closed_time_array = chat_closed_time.split(':');
		var starttime = (parseInt(chat_open_time_array[0],10) * hourlen) + parseInt(chat_open_time_array[1],10);
		var worklen = ((parseInt(chat_closed_time_array[0],10) * hourlen) + parseInt(chat_closed_time_array[1],10)) - starttime;
		var mydate = new Date(dateStamp);
		var myminutes = (mydate.getDay() * daylen) + (mydate.getHours() * hourlen) + mydate.getMinutes();
		for (var currentday in daysarray) {
			var calcday = parseInt(daysarray[currentday]) - 1;
			if (myminutes >= (starttime + (daylen * calcday)) && myminutes <= (starttime + (daylen * calcday) + worklen)) {
				pass = 'true';
				break;
			}
	            }
		}
	return pass;
		}
	
	
	var propertyValues = new Object;
	propertyValues = ( {
	
	timeStamp: 1369382404280,

	scodeSwitch: 'OFF',
	mBoxSwitch: 'ON',
	
	
	
	
	DEF_LANG_ID: '-1',
	DEF_STORE_ID: '10001',
	
	DEF_CATALOG_ID: '10051',
	DEF_CATALOG_IDENTIFIER: '2',
	
	CONTENT_PATH: '/sbd/content',
	HTML_PATH: '/sbd/html',
	ICON_PATH: '/sbd/img/ico/',
	COMMON_ICON_PATH: '/sbdpas/img/ico/',
	CSS_PATH: '/sbdpas/css/',
	JAVASCRIPT_PATH: '/sbdpas/js/',
	HELP_PATH: '/sbd/help',
	PDF_PATH: '/sbd/pdf',
	IMAGE_PATH: '/sbd/img/',
	PRODUCT_IMAGE_PATH: '/sbd/img/prod/',
	POST_DOMAIN: '/office/supplies/',
	BACKGROUND_IMAGE_PATH: '/sbd/img/bg/',
	COMMON_BACKGROUND_IMAGE_PATH: '/sbdpas/img/bg/',
	XSL_PATH: '/office/supplies/StaplesB2CPAS/cat/',
	FORESEE_PATH: '/sbdpas/js/foresee/',
	
	
        s7secure: 'https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com',
        s7kiosksecure: 'https://origin-d5.scene7.com',
        s7nonsecure: 'http://s7d5.scene7.com',
	
		
        s7path: '/is/image/Staples/{0}_sc7',
        s7noimagepath: '/is/image/Staples/{0}',
        s7reddotpath: '/is/image/Staples/reddot?{3}&$imgsrc={0}&$headline=SAVE&$symbol=%24&$dollars={1}&$cents={2}',

	cookiepage: '/sbd/sbd/content/help/cookieerror.html',
	redirectpage: '/sbd/sbd/cre/resources/browserupgrade/index.html',
	
	
	samuserInfo: 'Contact',
	
        loading: 'Loading...',

		
        logout: 'Log out',

		
		login: 'Log in',		
        
		
		welcomedefaultloggedin: 'You are logged in.',
		
		
		welcomeuserloggedin: '<b>Welcome</b>, {0}',		
		
		
        closewindow: 'Close Window',
	
	wait: 'Wait',
	moreAbout: 'More about',
	lessAbout: 'Less about',
	
    addtocart: 'Add to Cart',
	visitStaples: 'Visit Staples.com',
	learnMore: 'Learn More',
	
	
	
	Qty: 'Qty',
	AddToFav:'Add To Favorites',
	
	
	CartItem: 'item',
	CartItems: 'items',
	
	
	cartOverLayFlag: 'ON',
	
		reviewsMasterSwitch: 'ON',	
		
		
		reviewsFeaturedItemsThreshold: '0',
	
		checkoutExclusionPages: 'yourorder,shippinginfo,paymentinfo,revieworder,orderconf,orderconfprnt,kioskexpresscheckout,kioskrevieworder,checkoutenteraddress,checkoutreviewandpay',
		
		
	isChatOpen: chatActive('May 24, 2013 20:42:09'),
		masterChatSwitch: 'ON',
		showChatOnSku: 'ON',
		showChatOnHome: 'ON',
		
	analyticsSwitch: 'ON',
	
	
	analyticsEnv: 'PROD',
	analyticsReportSuiteDev: 'staplescomdev',
	analyticsReportSuiteProd: 'staplescomprod',
	
    	
	socialLeaderBoardSwitch: 'ON',	
	socialLeaderBoardSecurePagesSwitch: 'OFF',
	      
		
	searchAutocomplete: 'ON',
	
		
	inkTonerAutocomplete: 'ON',

		
	flyoutAnalytics: 'Flyout:{0}:{1}',	

		
	samHeaderMakestartpageSwitch: 'ON',
	samHeaderShowuserdataSwitch: 'ON',

	
	ajaxLoggingSwitch: 'ON',
	
	ajaxPerformanceSwitch: 'OFF',
	
        ajaxTimeout: '10000',

	
			
	
	 paginateAjaxErrorString: 'The last pagination operation failed.',
	filterAjaxErrorString: 'The last filter operation failed. ',  
	sortAjaxErrorString: 'The last sort operation failed.',
	
	
	compAjaxErrorString: 'The last operation failed.',
	
	badAuth: '***The authorization code passed is incorrect***',
	pilotOff: '***Pilot mode is off***',
	pilotMode: '***You are in pilot mode!!***',
	missingParms: '***One or more url parameters are missing***',
	ERR_REQUIRED: 'This is a required field. Please enter the information.',
	ERR_EMAIL_INVALID_FORMAT: 'Your email address must be entered in a valid format. Please check it and try again.',
	ERR_PHONE_TEN_DIGITS: 'It must be 10 digits (xxx-xxx-xxxx), including an area code. Please check it and try again.',
	ERR_ZIP_BETWEEN_FIVE_NINE_DIGITS: 'Please verify that you are entering a valid zip code',
	ERR_CC_CANNOT_BE_AUTHENTICATED: 'The credit card cannot be authenticated with the information provided.',
	ERR_CCIN_FOUR_DIGITS: 'It must be 4 digits. Please check it and try again.',
	ERR_CCIN_THREE_DIGITS: 'It must be 3 digits. Please check it and try again.',
	ERR_NOT_FUTURE_DATE: 'The expiration month and year must be set to the future',
	ERR_NOT_ALL_ZEROES: 'It cannot be all zeros. Please check it and try again.',
	ERR_PAY_NOTE_TOO_LONG: 'The note cannot be more than 32 characters in length',
	GENERIC_ERROR_HEADER: 'Sorry, but an error has been made.',
	GENERIC_ERROR_LINE_2: 'Please check the following field(s):',
	ERR_CC_NUM_INVAL_FOR_TYPE: 'Please check the credit card information and try again. If this problem persists, please call us at 1-800-3STAPLE (1-800-378-2753)to speak with an associate',
	
	
	miniCompExpand: 'Expand to See More',
	
	
    Comparison:{
	alertcompareItem: 'Please select at least 2 items to compare',
	alertselectItemLimit: 'You may only select up to three items to compare',
	alertselectMoreItem: 'Please select one more item to compare',
	TryAgain: 'Try again',
	
	selected: 'You&#039;ve selected these items to compare'
	},

 	
    HomePage:{
	MakeHomePage: 'Make Home Page',
	Rewards: 'Rewards#'
	},
	
	
	
    AddToCart:{	
	Attention: 'Attention',
	PleaseWait: 'Please wait..',
	ViewCart: 'View Cart',
	ATCOverlay: 'ATC Overlay',
	
	Close: 'Close',
	ProductDetail: 'Product Detail',
	waitMessage:'Please wait while we add the items to your cart.',
	addToCartErrorMessage:'We are unable to process your request at this time.Please close this window and try again.',
	addToCartQuantityMessage:'Please add a quantity.',
	addToCartTimeOutMessage:'We may encounter an error while adding items to cart. Please view your cart for details.'
	},

	
    Flyout:{
		
	flyoutCmsp: 'merchandising-_-Flyout {0}-_-{1}',
	flyoutAnalytics: 'Flyout:{0}:{1}',
	flyoutSearchTextCartridge: 'Cartridge Number Search',
	flyoutSearchTextPrinter: 'Printer Model Number Search',
	flyoutSearchTextInkandToner: 'Ink & Toner I&#039;ve Ordered Before',
	flyoutTimeoutOpenMS: '200',
	flyoutTimeoutCloseMS: '1000',		
	flyoutPreloadMaxIndex: '3',
	homePageFlyoutAjaxSwitch: 'OFF',
	nonHomePageFlyoutAjaxSwitch: 'ON'
	},
	 //Carousel Static Data
    Carousel:{
	
        previous: '&laquo; Previous',
        next: 'Next &raquo;',
        label_bmsm: 'Buy More Save More',

		
        carouselitemcounter: '{0}-{1} of {2} items',
        carouselitemtotal: '{0} of {0} items',

		
        expand: 'Expand to See All',
        collapse: 'Collapse'
 	},
	
    Personalization:{
	source: 'Personalization source:',
	noproducts: 'Personalization: no products on'
	 },
	
    Autocomplete:{
	selectSearch: 'Please hit enter when ready',
	keywordMatches: 'Keyword Matches',
		department: 'Department',
		shopByBrand: 'Shop by Brand',
	weeklyDeals: 'Weekly Deals',
		previouslyPurchasedItems: 'Previously Purchased Items',
		brandDepartmentResultsSwitch:true,
		productResultsSwitch:true,
		maxProdLinks : '3',
		brandDepartmentURL: '/ws/tpahead-json',
		productURL: '/office/supplies/StaplesB2CPAS/cat/autocompletedata.jsp',
		endicaMinChars: 1,
		endicaMaxChars: 20
	  },
	
    SKU:{
	xslLoaderr: 'Stylesheet not loaded.Error in line',
	seeDetails: 'See Details'
 	},
	
    SearchPage:{
	convertListIteam: 'Update Results',
	toggleListItemmore: 'More',
	toggleListItemless: 'Less',
	requiredFieldError: 'Please enter values in both fields',
	validationError: 'The &#039;From&#039; value should be less than &#039;To&#039; value'
	 },
	
    CheckoutreviewandpayPage:{
	giftscardsalreadyapplied: 'The maximum number of Staples Gift Cards has already been applied.',
	invalidgiftcardnumber: 'We&#39;re sorry, this is an invalid gift Card Number, please try again.',
	invalidpin: 'We&#39;re sorry, this is an invalid PIN, please try again.',
	giftcardapplied: '<p><strong>Gift card value applied.</strong></p><p>Amount due: $',
	enteradditionalgiftcards: '.</p><p>Enter additional gift cards or select a credit card for remaining balance; if necessary</p>',
	submityourorder: '.</p><p>Please submit your order</p>',
	balance: 'Balance $',
	giftcardremoved: 'The Staples Gift Card has been removed.',
	clickapply: 'You must click &#39;Apply&#39; if you wish to use the gift card/rebate card entered for this order.',
	notastaplesgiftcard: 'We&#39;re sorry this is not a Staples Gift Card.',
	rebatecardsalreadyapplied: 'The maximum number of Staples Rebate Credit Cards has already been applied.',
	invalidrebatecardnumber: 'We&#39;re sorry, this is an invalid rebate card number, please try again.',
	invalidcid: 'We&#39;re sorry, this is an invalid CID, please try again',
	rebatecardexpirationmonth: 'The Staples Rebate Credit Card expiration date must be entered.',
	expirationmonth: 'We&#39;re sorry, the expiration month and year must be set to the future.',
	rebatecardapplied: '<p>Rebate card value applied. Amount due: $',
	enteradditionalrebatecards: '.</p> <p>Enter additional cards or select a credit card for remaining balance; if necessary</p>',
	rebatecardremoved: 'The Staples Rebate Credit Card has been removed.',
	notastaplesrebatecard: 'We&#39;re sorry this is not a Staples Rebate Card.',
	requiredfiledenterinfo: 'This is a required field. Please enter the information.',
	checkcardinfoandtryagain: 'Please check the credit card information and try again. If this problem persists, please call us at 1-800-3STAPLE (1-800-378-2753) to speak with an associate.',
	cidmustbenumeric: 'The Prepaid Gift Card CID must be numeric.',
	numbermustbe4digit: '&lt;p&gt;Card ID Number must be 4 digits.&lt;/p&gt;&lt;p&gt;Please check it and try again.&lt;/p&gt;',
	idnumbermustbe3digit: 'Card ID Number must be 3 digits. Please check it and try again.',
	prepaidcardexpiration: 'The Prepaid Gift Card expiration date must be entered.',
	prapaidexpirationmonth: 'The expiration month and year must be set to the future',
	prepaidcardnotapplied: 'The Prepaid Gift Card has not been applied.',
	creditcardcidmustbenumeric: 'The Credit Card CID must be numeric.',
	selectedcreditcidnumeric: 'The selected Credit Card CID must be numeric.',
	invalidairmilenumber: 'An error has occurred: The collector number you entered is invalid.					'
	 }

});
