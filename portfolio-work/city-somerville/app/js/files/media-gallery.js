module.exports = function(window, document, $, undefined){
	"use strict";

	var mediaGalleryClass = "js-media-gallery-carousel",
		mediumBreakpoint,
		narrowView = true,
		carousels = new Array();

	function initSlider($el){
		var slider;
		// if the browser is narrow 
		if(window.innerWidth < mediumBreakpoint){
			// create the slider
			slider = createSlider($el);
		} else {
			// otherwise record the browser is wide
			narrowView = false;
		}
		$( window ).resize(function() {
			// if we cross into the narrow view
			if(!narrowView && window.innerWidth < mediumBreakpoint){
				// create the slider
				slider = createSlider($el);
				// otherwise record the browser is narrow
				narrowView = true;
			} 
			// if we cross into the wide view
			if(narrowView && window.innerWidth >= mediumBreakpoint){
				// destroy the slider
				slider.destroySlider();
				// otherwise record the browser is wide
				narrowView = false;
			}

		});

		//$el.data('carousel-index',carousels.length);
		//carousels.push(temp);
	}
	function createSlider($el) {
		return $el.bxSlider({
				pager:false
				//slideWidth:300,
				//maxSlides:3
			});
	}
	function destorySlider(index) {
		carousels[index].destorySlider();
	}

	function init() {
		//wait for the DOM to be ready
		$(function(){
			// set the medium break point value
			mediumBreakpoint = $('.breakpoint-m-min').width();
			// for each media gallery on the page
			$('.' + mediaGalleryClass).each(function(){
				var $el = $(this);
				initSlider($el);
			});
		});
	}

	return {
		init:init
	};

}(window, document, jQuery);
