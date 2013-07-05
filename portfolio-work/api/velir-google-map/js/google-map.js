(function(window, document, $, undefined) {
	'use strict';

	// Call function right away passing Custom Global namespace or empty object if not yet initialized
	var VELIR = (function(VELIR) {

		VELIR.GoogleMap = (function() {

			var velir_location, // location of the Velir marker icon
				centerLatlng, // where to center the map on the page
				MY_MAPTYPE_ID = 'velir_style',
				featureOpts = [], // map styling
				mapOptions = {}, // map control styling
				map_object, // DOM object containing the map
				map_object_id = 'map-canvas',
				map, // the Google map
				velir_marker, // marker object on the map
				x_cord, // x location of marker relative to the map
				y_cord, // y location of marker relative to the map
				x_offset, // x location of the map relative to the page
				y_offset, // y location of the map relative to the page
				customMapType,
				map_wrapper_class = 'google-map'; // class name of the object wrapping the map_object


			function setFeatureOptions() {

				featureOpts = [
					{
						"featureType": "landscape",
						"stylers": [
							{ "hue": "#eeff00" },
							{ "saturation": -100 },
							{ "lightness": -1 }
						]
					},{
						"featureType": "road",
						"stylers": [
							{ "saturation": -100 },
							{ "lightness": -24 }
						]
					},{
						"featureType": "poi",
						"stylers": [
							{ "hue": "#80ff00" },
							{ "lightness": -3 },
							{ "gamma": 0.89 },
							{ "saturation": -7 }
						]
					},{
						"featureType": "water",
						"stylers": [
							{ "hue": "#00ffc4" },
							{ "lightness": 12 }
						]
					},{
						"featureType": "landscape.man_made",
						"stylers": [
							{ "saturation": -100 },
							{ "lightness": -3 }
						]
					},{
						"featureType": "road",
						"elementType": "labels",
						"stylers": [
							{ "lightness": 30 }
						]
					},{
						"featureType": "poi",
						"elementType": "labels",
						"stylers": [
							{ "lightness": -2 }
						]
					},{
						"featureType": "poi.business",
						"stylers": [
							{ "saturation": 26 },
							{ "lightness": -10 },
							{ "hue": "#88ff00" }
						]
					}
				];
			}

			function setMapOptions() {
			  	mapOptions = {
					zoom: 16,
					center: centerLatlng,
				    panControl: true,
				    panControlOptions: {
				        position: google.maps.ControlPosition.TOP_RIGHT
				    },
				    zoomControl: true,
				    zoomControlOptions: {
				        style: google.maps.ZoomControlStyle.LARGE,
				        position: google.maps.ControlPosition.TOP_RIGHT
				    },
				    scaleControl: false,
				    scrollwheel: false,
				    mapTypeControl: false,
			       	//mapTypeId: google.maps.MapTypeId.ROADMAP
			    	mapTypeId: MY_MAPTYPE_ID
				};
			}

			function createVelirMarker(){
				velir_marker = new google.maps.Marker({
				  	position: velir_location,
				  	map: map,
				  	title: 'Velir'
				});		
			}

			function activateVelirMarker(){
				google.maps.event.addListener(velir_marker, 'mouseup', function() {
					var w = $('.' + map_wrapper_class + ' .overlay').width();
					var h = $('.' + map_wrapper_class + ' .overlay').height();
					$('.' + map_wrapper_class + ' .overlay')
						.css("left",x_cord - w - 25)
						.css("top",y_cord - h / 2)
						.fadeIn();
				});
			}

			function activateMapListener(){
				google.maps.event.addDomListener(map_object, 'mousedown', function(event){
					// hide the overlay
					$('.' + map_wrapper_class + ' .overlay').hide();
					//figure out where the map is located on the page
					x_offset = $('.' + map_wrapper_class).offset().left;
					y_offset = $('.' + map_wrapper_class).offset().top;
					x_cord = event.pageX - x_offset;
					y_cord = event.pageY - y_offset;

				});
			}

			// load the google javascript and then call postLoadInit when completed
			function loadScript() {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' 
					+ 'callback=VELIR.GoogleMap.postLoadInit';
				document.head.appendChild(script);
			}

			function postLoadInit() {
				// set the Lat and Lng of the velir marker  
				velir_location = new google.maps.LatLng(42.394424,-71.121260);
				// set the Lat and Lng for where to center the map
				centerLatlng = new google.maps.LatLng(42.394424,-71.1265);
				// style the map
				setFeatureOptions();
				// arrange the map and controls
				setMapOptions();
				// wait for the DOM and then do the rest
				$(function(){
					// check if the page has a map object on it.
					if( $('#' + map_object_id).length == 0 ){
						// do nothing - no where to build the map
						return false;
					}
					postDOMInit();
				});
			}

			function postDOMInit(){
				// save the map object
				map_object = document.getElementById(map_object_id);
				// create a new google map
				map = new google.maps.Map(map_object,mapOptions);
				// create a new style guide for the map	
				customMapType = new google.maps.StyledMapType(featureOpts, {name: "Velir"});
				// set the new map style as the map type
				map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
				// create the Velir marker
				createVelirMarker();
				// initialize the various cordinates
				x_cord = ($('.' + map_wrapper_class).width()/2) + ($('.' + map_wrapper_class + ' .overlay').width()/2) + 20;
				y_cord = $('.' + map_wrapper_class).height()/2 - 20;
				// determine where to show the overlay
				activateMapListener();
				// activate the mouse up handler on the velir marker
				activateVelirMarker();
				// show the overlay
				google.maps.event.trigger(velir_marker, 'mouseup');
			}

			function init(){
				// add the Google JS file to the page which starts the process
				loadScript();
			}

			//return functions and variables that you want accessible outside
			return {
				init : init,
				postLoadInit : postLoadInit,
				map_wrapper_class : map_wrapper_class
			};
		})();

        return VELIR;

    }(window.VELIR || {}));
    
	//update the Global Custom name space with new functionality and variables
	window.VELIR = VELIR;
    
	// Run as soon as this file loads
	VELIR.GoogleMap.init();

}(window, document, jQuery));

