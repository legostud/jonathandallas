angular.module('locationApp',['fetchService'])
.controller('locationCtrl',locationCtrl);

function locationCtrl($scope,SelectDataService) {
	SelectDataService.getData('locations').then(function(data) {
		data.map(function(item){
			$scope.locations[item.seat_num] = item;
		});	
	});
}
