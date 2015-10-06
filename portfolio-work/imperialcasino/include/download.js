var browserType = navigator.appName;

if ( browserType == "Netscape" ) {
	document.getElementById('ieInstructions').style.display = "none";
	document.getElementById('ffInstructions').style.display = "inline";
}
