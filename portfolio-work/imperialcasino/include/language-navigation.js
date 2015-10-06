/************************************
This page must be edited using DREAMWEAVER set to open and save files in UTF-8 format only 
DO NOT, DO NOT, DO NOT use any other software
This is so the EL and JA characters display properly
***************************************/

var currentURL = window.location.href;
var urlparts = currentURL.split("/");
var defaultLang;

//If the language code is not found in the URL use the variable assigned on the home page
if (!urlparts[3]) urlparts[3] = lastVisitedLanguage;

/* Switch statement to determine default language selection */
switch ( urlparts[3] ) {
	case "en": defaultLang = '0'; break;
	case "da": defaultLang = '1'; break;
	case "de": defaultLang = '2'; break;
	case "el": defaultLang = '3'; break;
	case "es": defaultLang = '4'; break;
	case "fr": defaultLang = '5'; break;
	case "it": defaultLang = '6'; break;
	case "ja": defaultLang = '7'; break;
	case "nl": defaultLang = '8'; break;
	case "no": defaultLang = '9'; break;
	case "pt": defaultLang = '10'; break;
	case "sv": defaultLang = '11'; break;
//	case "ch": defaultLang = '13'; break;
//	case "zh": defaultLang = '14'; break;
	default: defaultLang = '0';
}

/* Write out HTML for select options */
document.write("<select id=\"language_choice\" onChange=\"changeUrl(currentURL);\" class=\"language_selectbox\">");
document.write("<option value=\"/en\">English</option>");
document.write("<option value=\"/da\">Dansk</option>");
document.write("<option value=\"/de\">Deutsch</option>");
document.write("<option value=\"/el\">Ελληνικά</option>");
document.write("<option value=\"/es\">Español</option>");
document.write("<option value=\"/fr\">Français</option>");
document.write("<option value=\"/it\">Italiano</option>");
document.write("<option value=\"/ja\">日本語</option>");
document.write("<option value=\"/nl\">Nederlands</option>");
document.write("<option value=\"/no\">Norsk</option>");
document.write("<option value=\"/pt\">Português</option>");
document.write("<option value=\"/sv\">Svenska</option>");
document.write("</select>");

/* Set default language as selected language */
document.getElementById('language_choice')[defaultLang].selected = "1";

/* Language Redirection */
/* This is used to rebuild the URL with the selected language */
function changeUrl(host) {
	/* Get the language selected from the drop down */
	redirect = document.getElementById("language_choice").value; 

	/* Get the full URL passed to the function and split it into array based on "/" */
	var urlpathway = host;
	var urlparts = urlpathway.split("/");
	
	/* Replace the current language with the one selected */
	urlparts[3] = redirect;
	
	/* Rebuild the URL and redirect to the page with the proper language; loop through the rest of the URL elements */
	var newURL = urlparts[3];
	var i = 4;
	while ( urlparts[i] ) {	
		newURL += '/' + urlparts[i];
		if ( urlparts[i] == "promotions" && !urlparts[i+1] ) { newURL += '/'; }
		i++;
	}
	
	window.location = newURL;
}