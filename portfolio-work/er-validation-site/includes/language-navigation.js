/************************************
This page must be edited using DREAMWEAVER set to open and save files in UTF-8 format only 
DO NOT, DO NOT, DO NOT use any other software
This is so the EL and JA characters display properly
***************************************/

//Get the current language from the language meta tag
var defaultLang = getLanguageCode();
//Write the html pulldown to the screen with the current language selected
createPulldown();

// Determine the current language
function getLanguageCode() {
	var metas = document.getElementsByTagName('meta');
	var i;
	for (i=0; i<metas.length; i++)
		if (metas[i].getAttribute('name') == "language")
			return metas[i].getAttribute('content');
	return "fr";
}
// Display and language selector
function createPulldown() {
	// output the HTML for the pulldown
	document.write("<select id=\"language_choice\" onChange=\"changeUrl();\" class=\"language_selectbox\">");
	document.write("<option value=\"en\">English</option>");
	document.write("<option value=\"fr\">Français</option>");
	document.write("</select>");
	// change the language code to an index value
	//alert(defaultLang);
	switch ( defaultLang ) {
		case "en": index = '0'; break;
		case "fr": index = '1'; break;
		default: index = '1';
	}
	// Set default language as selected language
	document.getElementById('language_choice')[index].selected = "1";
}

// Change the page between languages
function changeUrl() {
	//Get the current URL
	var currentURL = window.location.href;
	// Trim the currentUrl of any variables
	currentURL = trimURL(currentURL);
	// Get the language selected from the drop down
	var language = document.getElementById('language_choice').value;
	//append the language code to the end of the URL
	window.location = currentURL + "?l=" + language;
}
//Remove variables in the URL
function trimURL(currentURL) {
	var pattern = new RegExp("\\?");
	if (currentURL.match(pattern) )
		return currentURL.substring(0,currentURL.match(pattern).index);
	return currentURL;
}