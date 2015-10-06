// JavaScript Document

function addVerticalSpacing() {
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
	containerHeight = document.getElementById('main-wrapper').offsetHeight;
	/* Uncomment the following "alert" line for debugging only*/
	//alert ("Viewport: " + viewportHeight + " and Container: " + containerHeight);
	// Compare the heights and calculate added spacing if needed
	if (viewportHeight > containerHeight) {
		var addedSpace;
		addedSpace = (viewportHeight - containerHeight - 80); //need to offset for the height of the footer
		document.getElementById('clear-space-after-content').style.height = addedSpace + "px";
	}
}