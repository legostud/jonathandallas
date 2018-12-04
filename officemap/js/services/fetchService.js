angular.module('fetchService',[])
	.service('SelectDataService',SelectDataService);


function SelectDataService($http) {
	var sds = this,
 		urls = {
 			employees:'/officemap/json/employees.json',
 			locations:'/officemap/json/locations.json',
 			printers:'/officemap/json/printers.json',
 			rooms:'/officemap/json/rooms.json'
 		};

	sds.getData = function(request){
		var url = urls[request];
		
		var dataPromise = $http.get(url).then(function(response){
			return response.data;
		});

		dataPromise.catch(function(error){
			console.log("invalid path", error);
		});

		return dataPromise;
	};
}
