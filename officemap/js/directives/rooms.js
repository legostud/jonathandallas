angular.module('mapApp')
.directive("mapAppRoom", function(){
	return {
		restrict: "E",  // element
		templateUrl: "templates/room.html"
	}
})