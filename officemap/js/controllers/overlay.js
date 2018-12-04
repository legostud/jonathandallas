angular.module('overlayApp',['fetchService'])
.controller('overlayCtrl', overlayCtrl);


function overlayCtrl($scope,SelectDataService,$routeParams,$location) {
	if($scope.locations === null){
		SelectDataService.getData('locations').then(function(data) {
			$scope.locations = {};
			data.map(function(item){
				$scope.locations[item.seat_num] = item;
			});	
			updateOverlay();
		});
	} else {
		updateOverlay();
	}
	function updateOverlay(){
		var data = $scope.seats[$routeParams.id];
		if(typeof(data) === "undefined"){
			// hide the overlay
			$scope.overlay.content = {name:"Not Found"};
			$scope.overlay.top = "10px";
			$scope.overlay.left = "20px";
			// focus the page on the overlay
			window.scrollTo(-80,10);
			// exit
			return;
		}
		var location = $scope.locations[$routeParams.id];
		if(typeof(location) === "undefined"){
			var location = {
				y_cord:"10px",
				x_cord:"20px"
			};
		}
		// update the overlay content
		$scope.overlay.content = {
			name: data.name,
			phone: data.phone,
			title: data.title,
			email: data.email,
			department: data.department
		};
		$scope.overlay.top = location.y_cord + "px";
		$scope.overlay.left = location.x_cord + "px";
		// focus the page on the overlay
		window.scrollTo(location.x_cord-100,location.y_cord - 25);

		$scope.hideOverlay = function(){
			$location.url = "/";
		};
	}
};
