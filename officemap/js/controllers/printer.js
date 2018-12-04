angular.module('printerApp',['fetchService'])
.controller('printerCtrl', printerCtrl);

function printerCtrl($scope, SelectDataService) {
	SelectDataService.getData('printers').then(function(data) {
		$scope.printers = data;
		data.map(function(item){
			$scope.seats[item.seat_num] = item;
		});	
	});
}
