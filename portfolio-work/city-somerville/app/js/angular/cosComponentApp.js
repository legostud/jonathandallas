(function(){
	var app = angular.module('cosComponentApp', [
			'cosSearchServices',
			'ui.select',
			'ui.bootstrap'
		])
		.constant('apiEndpoints' ,{
			API_BASE: '', //'/api',
			SEARCH_ENDPOINT: 'js/angular/testJson.json'//'/search'
		})
		.config(['uiSelectConfig', function(uiSelectConfig) {
			uiSelectConfig.theme = 'select2';
		}]);

	app.controller('TabCtrl', ['$scope', function ($scope) {
		this.currentTab = 1;

		this.selectTab = function(setTab){
			this.currentTab = setTab;
		};
		this.isSelected = function(checkTab) {
			return this.currentTab === checkTab;
		};

	}]);

	app.controller('filterController', ['$scope','cosSearchService', function ($scope, searchServices) {
		
		var resultsPerPage = 7,
			currentDateTime = new Date(Date.now());
		
		$scope.search = {
			date: currentDateTime,
			limit: resultsPerPage,
			filters: {}
		};


		$scope.filterComparator = function (actual, expected) {
			if (expected === undefined || expected == '' || expected == $scope.search.Default1 || expected == $scope.search.Default2) {
				return true;
			}
			return angular.equals(actual, expected);
		};
		// populate filters
		searchServices.events({},'js/angular/testJsonFilter.json').then(
			function(success){
				// if success - set results
				$scope.filters = success.data.filters;
				//$scope.filter = success.data.filters[0];
				angular.forEach($scope.filters, function(filter, key) {
					$scope.search.filters[filter.title] = filter.options[0].value;
				});
			},
			function(error){
				// if error - set results to empty array
				$scope.filters = [];
			}
		);

		// perform the search to retrieve events
		function searchingEvents() {
			if(Object.keys($scope.search.filters).length == 0){
				//wait until filters are loaded.
				return;
			}

			// form post data object
			var params = {
				date:$scope.search.date.getTime(),
				numResults:$scope.search.limit
			};
			// get all of the filters
			var i = 1;
			angular.forEach($scope.search.filters, function(filter, key) {		
				params["filter"+i] = filter;
				i++;
			});

			// fetch results
			searchServices.events(params,'js/angular/testJsonResults.json').then(
				function(success){
					// if success - set results
					$scope.results = success.data.results;
				}, 
				function(error){
					// if error - set results to empty array
					$scope.results = [];
				}
			);
		}

		function resetLimit() {
			$scope.search.limit = resultsPerPage;
		};

		$scope.$watch('search.limit',searchingEvents);
		$scope.$watchCollection('search.filters',searchingEvents);
		$scope.$watch('search.date',searchingEvents);

		$scope.resetClicked = function () {
			// reset the number of results shown
			resetLimit();
			//reset the filters back to default value
			angular.forEach($scope.filters, function(filter, key) {
				$scope.search.filters[filter.title] = filter.options[0];
			});
		};
		$scope.viewMore = function() {
			// future work
			$scope.search.limit = $scope.search.limit + resultsPerPage;
		};

	}]);
})();