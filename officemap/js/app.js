angular.module('mapApp',
	['ngRoute',
	'employeeApp',
	'overlayApp',
	'roomApp',
	'printerApp',
	'officeMapApp'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	.when('/', {
		template: '',
		controller: 'appCtrl'
	})
	.when('/room/:id', {
		templateUrl: 'templates/room.html',
		controller: 'overlayCtrl'
	})
	.when('/printer/:id', {
	  	templateUrl: 'templates/printer.html',
	  	controller: 'overlayCtrl'
	})
	.when('/employee/:id', {
	  	templateUrl: 'templates/employee.html',
	  	controller: 'overlayCtrl'
	})
	.otherwise({
		redirectTo:'/'
	});
}])
.controller('appCtrl',['$scope',function($scope) {
	$scope.overlay.top = "100%";
	$scope.overlay.left = "100%";
}]);;
