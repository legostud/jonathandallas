var NELUG = (function() {
	var currentState = 'mobile',  // values should be 'mobile','tablet','full'
		leftColumnExists = false,
		rightColumnExists = false,
		storiesExist = false,
		searchExists = false;
	
	function getScreenWidth() {
		return (window.innerWidth > 0) ? window.innerWidth : screen.width;
	}
	
	function getState() {
		return currentState;
	}
	
	function menuDropDown() {
		//show/hide menu items when menu button is clicked
		$('header nav .menu-link').click(function(e) {
			e.preventDefault();
			$('header nav .global-nav').toggle();
		});
	}
	
	function resize() {
		var width = getScreenWidth(),
			newState = '';
	
		if (width >= 800) {
			newState = 'full';
		}
		else if (width < 800 && width >= 500) {
			newState = 'tablet';
		}
		else { 
			newState = 'mobile';
		}
		// no change is state
		if (newState == currentState){
			return false;
		}
		// state has changed do the following
		
		// if the state has changed from mobile
		if (currentState == 'mobile') {
			increaseLogo();
		}
		
		//if the new state has changed to mobile
		if (newState == 'mobile') {
			decreaseLogo();
		}
		
		//if the new state has changed to full
		if (newState == 'tablet') {
			if(!leftColumnExists){
				addLeftColumn();
			}
		}

		//if the new state has changed to full
		if (newState == 'full') {
			//add the right column data
			if(!rightColumnExists){
				addRightColumn();
			}
			//add the left column data if it hasn't already been
			if(!leftColumnExists){
				addLeftColumn();
			}
			//add more stories if not already done
			if(!storiesExist){
				addStories();
			}
			
			//add search feature
			if(!searchExists){
				addSearch();
			}
		}
				
		currentState = newState;
		
		return true;
	}
	
	//get the left column data from nelug.org and add it to the page
	function addLeftColumn(){
		$('.content-wrapper .col2').load('nelug.html #gl_navigation');
		leftColumnExists = true;
	}

	//get the right column data from nelug.org and add it to the page
	function addRightColumn(){
		$('.content-wrapper .col3').load('nelug.html #gl_extra');
		rightColumnExists = true;
	}
	
	function addSearch() {
		$('header .search').load('nelug.html .header-flag-n-search form');
		searchExists = true;
	}

	function addStories() {
		$('.content-wrapper .col1 .stories').load('nelug.html .stories article');
		storiesExist = true;
	}
	
	//Show the high res logo
	function increaseLogo() {
		$('header .logo img').remove();
		$('header .logo').append('<img src="img/logo-full.gif" height="100%" width="100%" />');
	}
	//Show the low res photo
	function decreaseLogo() {
		$('header .logo img').remove();
		$('header .logo').append('<img src="img/logo.gif" height="100%" width="100%" />');
	}
	
	function setup() {
		resize();
		menuDropDown();
		
		$(window).resize(resize);
	}
	
	return {
		getState : getState,
		screenWidth : getScreenWidth,
		setup : setup
	};
})();

$(document).ready(function(){
	NELUG.setup();
});


