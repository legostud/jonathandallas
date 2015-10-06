(function() {
    'use strict';

    var cosSearchService = function($http, $log, $q, apiEndpoints) {
        function requestHandler(config) {
            var response = $q.defer(),
                cacheBustedConfig = angular.extend({},{params:{'_':Date.now()}},config);

            $http(cacheBustedConfig).then(successHandler, errorHandler);

            return response.promise;

            function successHandler(results) {
                response.resolve(results)
            }
            function errorHandler(error) {
                $log.debug(error);
                response.reject(error);
            }
        }

        this.search = function (params) {
            var query = {
                method: 'GET',
                params: params,
                url: apiEndpoints.API_BASE + apiEndpoints.SEARCH_ENDPOINT
            };
            return requestHandler(query);
        }

        this.events = function (params,endpoint) {
            var query = {
                method: 'GET',
                params: params,
                url: apiEndpoints.API_BASE + endpoint
            };
            return requestHandler(query);
        }
    };

    var module;
    try {
        module = angular.module('cosSearchServices');
    } catch (e) {
        module = angular.module('cosSearchServices', []);
    }
    module.service('cosSearchService', ['$http', '$log', '$q', 'apiEndpoints', cosSearchService]);
})();