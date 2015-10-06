(function(window, document, $, undefined) {
    'use strict';

    // Call function right away passing Custom Global namespace or empty object if not yet initialized
    var PRB = (function(PRB) {

        PRB.Main = (function() {
		
			var cities,
				current_city = 1,
				window_height,
				slide_show_height;

			function infoIcon(){
				// on click of icon
				$('.info-icon').click(function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active').parents('.row').find('.overlay').fadeOut();
						return false;
					}
					
					// show overlay
					$(this).addClass('active').parents('.row').find('.overlay').fadeIn();
					
					var $overlay_content = $(this).parents('.row').find('.overlay-content'),
						o_height = $overlay_content.height(),
						s_height = 750,
						offset = parseInt((s_height - o_height) / 2);
						
					$overlay_content.css("margin-top",offset + "px");
				});
				// on click of overlay
				$('.overlay').click(function(){
					// hide overlay
					$(this).fadeOut().parents('.row').find('.info-icon').removeClass('active');
					
				});
			}
			
			function getCities() {
				$.getJSON('./json/cities.txt', function(response) {
					cities = response;
					renderCities();
				});		
			}
			
			function renderCities() {
				// find the map
				var $map = $('.populous-cities .map');
				// for each city
				$.each(cities, function(index, city){
					// determine the color to use
					var color;
					var population = parseFloat(city.population);
					if(population >= 15){
						color = population > 20 ? 'color6' : 'color1'; 
					} else {
						color = population < 10 ? 'color2' : 'color7'; 
					}
					//determine the left location
					var left = city.x_cord;
					//determine the top location
					var top = city.y_cord;
					// create a map icon
					$map.append('<div class="icon color-bg ' + color + '" style="left:' + left +'px; top:'+ top + 'px;">' + (index+1) + '</div>');
				});		
				// show the current city
				showCity(current_city);
					
				// add left and right controls
				activateCityControls();
				
			}
			function showCity(index) {
				var index = index - 1,
					city = cities[index],
					country_code = city.country_code.toLowerCase(),
					city_name = city.city,
					country = city.country,
					population = city.population,
					percentage = city.percentage;
				
				if(index < 0 || index >= cities.length){
					return false;
				}
			
				// find the slider
				var $slider = $('.populous-cities .slider');
				// hide the slider
				$slider.stop(true,true).fadeOut();
				// find the map
				var $map = $('.populous-cities .map');
				
				// update the slide with new data
				// change the flag src
				$slider.find('.flag').html('<img src="./img/flags/flag-' + country_code + '.png" />');
				// change the graph src
				$slider.find('.graph').html('<img src="./img/graphs/circle-' + percentage + '.png" />');
				// change the text
				var template = [
					'<div class="location">',
						(index+1) + '.<br />',
						'<b>' + city_name + '</b><br />',
						country,
					'</div>',
					'<div class="population lower">',
						'Population:<br />',
						'<b>' + population + ' million</b>',
					'</div>'
				];
				template = template.join("\n");
				$slider.find('.content').html(template);

				// show the slider
				$slider.stop(true,true).fadeIn();
				
				// deselect the active map icon
				$map.find('.icon.active').removeClass('active');
				// select the new map icon
				$map.find('.icon').eq(index).addClass('active');
			}
			function activateCityControls(){
				// find the slider
				var $slider = $('.populous-cities .slider');
				var $map = $('.populous-cities .map');

				// if next control is clicked
				$slider.find('.next').click(function(){
					// are we on the last slide
					if( current_city == cities.length){	
						// show the first
						current_city = 1;
					} else {	
					// otherwise show the next
						current_city++;
					}
					showCity(current_city);
				});
				// if prev control is clicked
				$slider.find('.prev').click(function(){
					// are we on the first slide
					if (current_city == 1){	
						// show the last
						current_city = cities.length;
					} else {	
					// otherwise show the previous
						current_city--;
					}
					showCity(current_city);
				});
				// if a map icon is clicked
				$map.find('.icon').click(function(){
					// get the icons value
					current_city = parseInt($(this).text());
					// show that city
					showCity(current_city);
				});
			}
			
			function regionalOverlays() {
				$('.chart img').click(function(event){
					event.preventDefault();
					if( $(this).hasClass('active') ){
						$(this).parents('.chart').find('.chart-overlay').click();
						return false;
					}
					//get the class of the image (which country)
					var country = $(this).attr('class');
					// add the class to the overlay
					var $overlay = $(this).parents('.chart').find('.chart-overlay');
					$overlay.removeAttr('class').addClass('chart-overlay').addClass(country).stop(true,true).fadeIn();
					// darken the other elements
					var $parent = $(this).parents('.chart');
					$parent.find('img').addClass("dark").removeClass('active');
					$parent.find('h2').addClass("dark");
					// undarken this img and the overlay
					$overlay.removeClass("dark");
					$(this).removeClass("dark").addClass('active');
				});
				$('.chart .chart-overlay').click(function(){
					$(this).parents('.chart').find('.dark').removeClass("dark");
					$(this).parents('.chart').find('.active').removeClass("active");
					$(this).fadeOut();
				});
			}
			function slideShow(){
				$('.slide-show-button').click(function(event){
					event.preventDefault();
					window.open('popup.html','popup','width=1020,height=800,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
				});

			}
			function slideShowOverlay(){
				// record the height of the slide show
				slide_show_height = $('.slide-show').css('max-height').replace('px','');
				// record the height of the browser
				window_height = $(window).height();
				// add the proper top margin to the slide show
				slideShowMargin();
				
				// if the window changes sizes
				$(window).resize(function(event) {
					// record the height of the window
					window_height = $(window).height();
					// add the proper top margin to the slide show
					slideShowMargin();
				}); 
				$('.slide-show-button').click(function(event){
					event.preventDefault();
					$('.slide-show-wrapper').stop(true,true).fadeIn();
				});
				$('.slide-show-close').click(function(event){
					event.preventDefault();
					$('.slide-show-wrapper').stop(true,true).fadeOut();
				});
			}
			function slideShowMargin() {
				if(window_height>slide_show_height){
					$('.slide-show').css("margin-top" , (window_height - slide_show_height) / 2 + 'px');
				}
			}
			
			function regionalTFR() {
				$('.tfr .orb').click(function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');
						$('.tfr .results').removeAttr('class').addClass('results');
					} else {
						// highlight the orb
						$('.tfr .orb.active').removeClass('active');
						$(this).addClass('active');
						// show the results
						$('.tfr .results').removeAttr('class').addClass('results').addClass($(this).parent().attr('class'));
					}
				});
				$('.tfr .orbs p').click(function(){
					if($(this).parent().find('.orb').hasClass('active')){
						$(this).parent().find('.orb').removeClass('active');
						$('.tfr .results').removeAttr('class').addClass('results');
					} else {
						// highlight the orb
						$('.tfr .orb.active').removeClass('active');
						$(this).parent().find('.orb').addClass('active');
						// show the results
						$('.tfr .results').removeAttr('class').addClass('results').addClass($(this).parent().attr('class'));
					}
				});
				
				
			}	
		
			function init() {
				$(function() {
					infoIcon();
					
					getCities();
					
					regionalOverlays();
					
					slideShow();
					
					regionalTFR();
				});
				
			}
		
		
		    //return functions and variables that you want accessible outside
            return {
                init : init
            };
        })();

        return PRB;

    }(window.PRB || {}));
    
    //update the Global Custom name space with new functionality and variables
    window.PRB = PRB;
    
    // Run as soon as this file loads
    PRB.Main.init();



}(window, document, jQuery));
