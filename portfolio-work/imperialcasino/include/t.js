// =====================

var T = new Object();
// T version
T.v = 1.0;
// T base url
var TURL = '/t/';
// T group 
T.group = 'ic'; 

// =====================

var TImageArray = new Array;
var TIndex = 0;

function TCollectVars() {

	var dCurrent = new Date();

	// hostname
	//T.host = window.location.hostname;
	// absolute path
	//T.path = window.location.pathname;
	// title
	T.title = document.title;

	// search string
	//T.search = window.location.search;
	// referrer
	if ( (window.document.referrer != "" ) && ( window.document.referrer != "-" ) ) {
		if ( !( navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) < 4 ) ) {
			T.referrer = window.document.referrer;
		}
	}

	// timestamp - prevents caching of generated URL
	T.ts = dCurrent.getTime();
	// timezone
	T.tz = dCurrent.getTimezoneOffset()/60*-1;
	// base hour?
	T.bh = dCurrent.getHours();

	// language
	T.ln = ((navigator.appName == "Netscape")?navigator.language:navigator.userLanguage);

	// screen info
	if ( typeof(screen) == "object" ) {
		T.colors = screen.colorDeth;
		T.res = screen.width+"x"+screen.height;
	}

	// java enabled?
	if ( typeof(navigator.javaEnabled()) == "boolean" ) {
		T.java = navigator.javaEnabled()?1:0;
	}
	// javascript enabled
	T.js = 1;
	// javascript version
	if ( typeof(TVersion) != "undefined" ){
		T.jsv = TVersion;
	}
}

function TCreateImage( url ) {
	if ( document.images ){
		TImageArray[TIndex] = new Image;
		TImageArray[TIndex].src = url;
		TIndex++;
	}
	else {
		document.write( '<IMG BORDER=0 NAME="TImage'+TIndex+'" WIDTH=1 HEIGHT=1 SRC="'+url+'">' );
	}
}

function TCollectMetaTags() {
	var docElements;
	if ( document.all ) {
		docElements = document.all.tags("meta");
	}
	else if ( document.documentElement ) {
		docElements = document.getElementsByTagName("meta");
	}
	if ( typeof(docElements) != "undefined" ) {
		for ( var i = 1; i <= docElements.length; i++ ) {
			metaTag = docElements.item(i-1);
			if ( metaTag.name ) {
				if ( metaTag.name.indexOf('T.') == 0 ) {
					T[ 'M.'+metaTag.name.substring(2) ] = metaTag.content;
				}
			}
		}
	}
}

function TBuildParam( name, value, sep ){
	return ( sep + name + "=" + escape( value ) );
}

function TBuildURL() {
	var url = TURL;
	var sep = '?';
	for ( name in T ) {
		if ( T[name] ) {
			url += TBuildParam( name, T[name], sep );
			sep = '&';
		}
	}
	return url;
}

function t() {
	TCollectVars();
	TCollectMetaTags();
	var url = TBuildURL();
	TCreateImage( url );
	return true;
}

// let's do it
t();	
