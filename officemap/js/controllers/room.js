angular.module('roomApp',['fetchService'])
.controller('roomCtrl',roomCtrl);

function roomCtrl($scope, SelectDataService) {
	SelectDataService.getData('rooms').then(function(data) {
		$scope.rooms = data;
		data.map(function(item){
			$scope.seats[item.seat_num] = item;
		});	
	});
}
	