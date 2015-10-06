;(function(window, document, $, undefined) {
	'use strict';

	var ns = nspace("velir.main");

	velir.main = function(){

		var defaults = {}

		function windowShade() {
			var active_class = "is-active",
				shade_class = "dc-menu__shade",
				hidden_class = "is-up",
				visible_class = "is-down",
				box_shadow = 5;
				
			// find the height of each shade
			$('.'+shade_class).each(function(){
				// apply the height as the bottom position when visible.
				$(this).css('top','-' + ($(this).outerHeight() - $(this).parent().outerHeight() + box_shadow ) +'px');
			});	
			
			$(".js-shade-link").click(function(event){
				event.preventDefault();
				if( $(this).hasClass(active_class) ){
					// unmark this tab as active
					$(this).removeClass(active_class);
					// hide stuff in the shade
					collapseStuff();
				} else {
					// remove active class
					$(".js-shade-link").removeClass(active_class);
					// mark this tab active
					$(this).addClass(active_class);
					// hide stuff in the shade
					collapseStuff();
					// show new shade
					$('.'+$(this).data('shade')).removeClass(hidden_class).addClass(visible_class);
				}
				// inner function
				function collapseStuff(){
					// hide all shades
					$('.'+shade_class).addClass(hidden_class).removeClass(visible_class);
					// collapse all shade accordions
					$('.'+shade_class + ' .is-expanded .js-accordion-link').click();
					// collapse all selectboxes.
					$('.'+shade_class + ' .is-open .js-dropdown-link').click();
				}
			});
			$('.'+shade_class + ' .js-close-button').click(function(event){
				event.preventDefault();
				$(".js-shade-link." + active_class).click();
			});
			
			// Close the shade if the user moves their mouse away
			window.shade_timeout = '';
			$('.'+shade_class).hover(function(){
				window.clearTimeout(shade_timeout);
			},function(){
				window.clearTimeout(shade_timeout);
				shade_timeout = window.setTimeout(function(){
					$(".js-shade-link." + active_class).click();
				}, 2000);
			});
		}
		
		function addThis() {
			// create configurations in global namespace
			window.addthis_config = {
			   //ui_click:true,
			   services_expanded:'twitter,facebook,linkedin,google_plusone_share,tumblr,pinterest'
			}

			$.ajax({
				url:"http://s7.addthis.com/js/250/addthis_widget.js",
				dataType: "script",
				timeeout:2000,
				success:function(){
					$('.js-addThis-toolbox').fadeIn('slow').fixTo('.main');;
				}
			
			});
			
		}
		function accordion() {
			$('.js-accordion-link').click(function(event){
				event.preventDefault();
				if($(this).parent().hasClass('is-expanded')){
					$(this).parent()
						.removeClass('is-expanded')
						.find('.js-accordion-content').first().stop(true,true).slideUp();
				} else {
					$(this).parent()
						.addClass('is-expanded')
						.find('.js-accordion-content').first().stop(true,true).slideDown();
				}
			});
		}
		
		function radioButtons() {
			if(Modernizr.borderradius){
				$(".dc-component__radio-button input[type='radio']").each(function(){
					if( $(this).attr("checked") ){
						$(this).parent('label').addClass('is-checked');
					}
					$(this).click(function(){
						$(this).parent().siblings().removeClass('is-checked');
						$(this).parent('label').addClass('is-checked');
					});
				});
				
			}
		}
		function checkBoxes() {
			if(Modernizr.csstransforms){
				$(".js_dc_check_box input[type='checkbox']").each(function(){
					if( $(this).attr("checked") ){
						$(this).parent('label').addClass('is-checked');
					}
					$(this).click(function(event){
						$(this).parent('label').toggleClass('is-checked');
					});
				});
				
			}
		}
		
		function selectBoxes() {
			var default_message = "Please select";
			
			// for each select box  
			$('.dc-component__select-box').each(function(){
				$(this).find('input[type="checkbox"]').each(function(){
					if( $(this).attr("checked") ){
						$(this).parent('label').addClass('is-checked');
					}
				});
				// display first selected item
				firstSelected($(this).find('.dc-component__select-box__options'));
			});
			// handle option click event
			$('.dc-component__select-box__options input[type="checkbox"]').click(function(event){
				var $label = $(this).parent('label');
				if ( $(this).parents('.dc-component__select-box').hasClass('js-multi-select') ) {
					// toggle the is-selected class
					$label.toggleClass('is-checked');
				} else {
					//unselect other options
					$label.parent('li').siblings()
						.find('.is-checked').removeClass('is-checked')
						.find('input[type="checkbox"]').attr("checked",false);
					// make active
					$label.toggleClass('is-checked');
					// close the select box
					$(this).parents('.dc-component__select-box').find('.dc-component__select-box__selected-item').click();
				}
				// display first selected item
				firstSelected( $(this).parents('.dc-component__select-box__options') );
			});	

			// Close the select box if the user moves their mouse away
			window.select_timeout = '';
			$('.dc-component__select-box').hover(function(){
				window.clearTimeout(select_timeout);
			},function(){
				window.clearTimeout(select_timeout);
				select_timeout = window.setTimeout(function(){
					$('.dc-component__select-box.is-open .js-dropdown-link').click();
				}, 1000);
			});

			// inner function
			// display first selected item or default message
			function firstSelected($options_wrapper){
				// is there at least one selected item
				if($options_wrapper.find('label.is-checked').length > 0) {
					// make the select link message equal to the first option selected
					$options_wrapper.parent().find('.dc-component__select-box__selected-item').html($options_wrapper.find('label.is-checked').first().text());
				} else {
					$options_wrapper.parent().find('.dc-component__select-box__selected-item').html(default_message);
				}
			}
			

		}
		
		function dropdownLinks(){
			// content to show is assumed to be after the link
			// add click handler to drop down links
			$('.js-dropdown-link').click(function(event){
				event.preventDefault();
				if ($(this).parent().hasClass('is-open') ) {
					$(this).parent().removeClass('is-open');
				} else {
					$(this).parent().addClass('is-open');
				}
			});
		}
		
		function init(options){
			defaults = $.extend( {}, defaults, options );
			
			
			// DOM Ready
			$(function(){
				if($().toggleContent && $('.js-toggle-box').length > 0) {
					$('.js-toggle-box').toggleContent();
				}
				
				if($(".dc-menu__link").length > 0){
					windowShade();
				}
				
				addThis();
				
				accordion();
				
				radioButtons();
				
				selectBoxes();
				
				checkBoxes();
				
				dropdownLinks();
				
			});
		}

		return {
			init : init
		};

    };
        
}(window, document, jQuery));

var main = new velir.main();
main.init();

/* waits until everything is loaded, not just DOM is ready */
$(window).load(function() {

  $('.bg-image').addClass('bg-image--hd');

});

