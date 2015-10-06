module.exports = function(window, document, $, undefined){
	"use strict";

	var mapContainerClass = "js-google-map",
		latlngCityHall = "",
		latlngDPW = "",
		latlngParking = "",
		latlngSafety = "",
		googleMap,
		currentInfoWindow,
		zoom = 13;

	function setZoom() {
		if($('.breakpoint-m-min').width() <= window.innerWidth){
			zoom = 14;
		}
	}

	function setLocations(){
		latlngCityHall = new google.maps.LatLng(42.387206, -71.098169);
		latlngDPW = new google.maps.LatLng(42.396894, -71.107441);
		latlngParking = new google.maps.LatLng(42.400127, -71.125263);
		latlngSafety = new google.maps.LatLng(42.379218, -71.092590);
	}

	function createMap(){
		var mapContainer = $('.' + mapContainerClass)[0];

		var mapOptions = {
			scrollwheel: false,
			zoom: zoom,
			center: latlngCityHall
		};

		googleMap = new google.maps.Map(mapContainer,mapOptions);
	}

	function createMarkers(){
		createMarker("City Hall",latlngCityHall);
		createMarker("DPW",latlngDPW);
		createMarker("Parking and Traffic",latlngParking);
		createMarker("Public Safety",latlngSafety);
	}
	function createMarker(title, position){
		var infoWindow = new google.maps.InfoWindow({
			content: '<div class="info-window">' + title + '</div>'
		});

		var marker = new google.maps.Marker({
			position: position,
			title:title
		});

		marker.setMap(googleMap);

		google.maps.event.addListener(marker, 'click', function() {
			if (currentInfoWindow) {
				currentInfoWindow.close();
			}
			currentInfoWindow = infoWindow;
			infoWindow.open(googleMap,marker);
		});
	}

	function init(){
		//wait for dom ready
		$(function(){
			if($('.' + mapContainerClass).length) {
				setZoom();
				setLocations();
				createMap();
				createMarkers();
			}
		});

	}
	return {
		init:init
	}

}(window,document,jQuery);