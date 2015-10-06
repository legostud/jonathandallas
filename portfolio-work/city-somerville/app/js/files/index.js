var Somerville = Somerville || {};

Somerville.Main = function(window, document, $, undefined) {
	"use strict"

	var breakPointLargeMin = 831;
	
	// load modules 
	var showHides = require("./show-hide.js"),
		mediaGallery = require("./media-gallery.js"),
		googleMap = require("./google-map.js"),
		sidebarNav = require("./sidebar-nav.js"),
		responsiveTables = require("./responsive-tables.js");

	function initBreakPoints() {
		breakPointLargeMin = $('.breakpoint-l-min').length ? $('.breakpoint-l-min').width() : breakPointLargeMin;
	}
	
	function decoratedHeadings() {
		// find all decorated headings
		$('.heading-decorated').each(function(){
			// if it has a decorated-inner span tag
			if($(this).find('.heading-decorated__inner').length){
				// do nothing
				return;
			} else { // otherwise
				// wrap the content in a decorated-inner tag
				$(this).wrapInner("<span class='heading-decorated__inner'></span>");
			}
		});
	}

	function customSelectBox() {
		$('.js-custom-select').each(function(){
			$(this).select2({
				minimumResultsForSearch: Infinity
			});
		});
	}

	function initSiteAlert() {
		$('.js-alert-message').each(function(){
			var $el = $(this);
			// get the unique id of the alert
			var saID = $el.data('alert-id');
			// attempt to get the id from the site alert cookie
			var saCookie = getCookie("alertMessage" + saID);
			// if successful and cookies' id and alerts ids match
			if(saCookie !== "" && parseInt(saCookie) === saID) {
				// do nothing
				return;
			}
			// show the alert message
			$el.addClass('is-visible');
			
			// if the user closes the alert message
			$el.click(function(e) {
				e.preventDefault();
				// hide the alert message
				$(this).removeClass('is-visible');
				// set a site alert cookie with the alerts' id value.
				setCookie("alertMessage" + saID, saID, 365);
			});
		});
	}
	
	function initContactSidebar(){
		$('.js-contact-sb').each(function(){
			var $el = $(this),
				isMobile = false,
				resizeTimeout;
			
			$el.find('.js-accordion-link').click(function(e){
				if(window.innerWidth < breakPointLargeMin) {
					e.preventDefault();
					// toggle the expanded state
					$el.toggleClass('is-expanded').find('.js-accordion-content').stop(true,true).slideToggle();
				}
			});

			$(window).resize(function() {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(function() {
					if (window.innerWidth < breakPointLargeMin) {
						if (!isMobile) {
							$el.removeClass('is-expanded').find('.js-accordion-content').stop(true,true).slideUp();
							isMobile = true;
						}
					}
					else if (window.innerWidth >= breakPointLargeMin) {
						if (isMobile) {
							$el.addClass('is-expanded').find('.js-accordion-content').stop(true,true).slideDown();
							isMobile = false;
						}
					}
				}, 200);
			});
		});
	}

	function initAccordions(){
		$('.js-accordion-module').each(function(){
			var $el = $(this);
			// Add click event to the controls
			$el.find('.js-accordion-link').click(function(e){
				e.preventDefault();
				// if it is the contact side bar

				// toggle the expanded state
				$el.toggleClass('is-expanded').find('.js-accordion-content').stop(true,true).slideToggle();
			});
		});
	}
	function initClickable(){
		$('.js-clickable').each(function(){
			// if the this is clicked
			$(this).click(function(event){
				event.preventDefault();

				var $el = $(this).find('.js-clickable-link').first();
				// find the destination
				var dest = $el.attr("href");
				// if the target attribute exists
				if("_blank" === $el.attr("target")) {
					// launch new tab/window
					window.open(dest);
				} else {
					// otherwise redirect to a new page 
					window.location = dest;
				}
			});
		});
	}

	function initMatchHeight(){
		$('.js-equal-height').matchHeight();
	}

	function initFeedback(){
		$('.js-leave-feedback-link').click(function(){
			$(this).parent().toggleClass('is-visible');
		});

	}

	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
	}

	function getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}

	function textResizer(){
	    $('.js-text-resizer__item').on('click', function() {
	        $('.is-active').removeClass('is-active')
	        $(this).addClass('is-active');
	        var size = $(this).data('size');
	        $('html').attr('class', function(i, c){
            	return c.replace(/(^|\s)font-\S+/g, '');
			}).addClass('font-' + size);
	    });
	}

	function init() {
		google.maps.event.addDomListener(window, 'load', googleMap.init());
		//wait for the DOM to be ready
		$(function(){
			mediaGallery.init();
			showHides.init();
			sidebarNav.init();
			// initialize breakpoint values
			initBreakPoints();
			//style the decorated headings.
			decoratedHeadings();
			// setup custom select boxes
			customSelectBox();
			// show alert message
			initSiteAlert();
			// setup accordion module
			initAccordions();
			// collapse Contact Sidebar
			initContactSidebar();
			// initialize clickable componets
			initClickable();
			// initailize text resizer tool
			textResizer();
			// match Height elements
			initMatchHeight();
			// feedback module
			initFeedback();
		});
	}

	return {
		init:init
	};


}(window, document, jQuery);

Somerville.Main.init();


/* async loading of Gmaps
var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=googleMap.init';
  document.body.appendChild(script);
*/