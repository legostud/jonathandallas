angular.module('employeeApp',['fetchService'])
.controller('employeeCtrl', employeeCtrl);

function employeeCtrl($scope,SelectDataService) {
	SelectDataService.getData('employees').then(function(data) {
		$scope.employees = data;
		data.map(function(item){
			$scope.seats[item.seat_num] = item;
		});	
	});
}
