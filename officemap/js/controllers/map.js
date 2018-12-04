angular.module('officeMapApp',[])
.controller('mapCtrl',mapCtrl);

function mapCtrl($scope, $location){
	// master list of all seats and data.
	$scope.seats = {};
	$scope.locations = null;
	$scope.overlay = {
		top:"100%",
		left:"100%"
	};
	$scope.outputCoords = function(e) {
		try {
			console.log(',{\n"seat_num":,\n'
				+ '"x_cord":' + parseInt(e.offsetX) + ',\n'
				+ '"y_cord":' + parseInt(e.offsetY) + '\n}\n'
			);
		} catch(err) { }
	}
	$scope.closeOverlay = function(e) {
		$location.url('/');
	}
}