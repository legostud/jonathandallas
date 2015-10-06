(function() {
    'use strict';

    // Supports: IE9+
    var searchMapper = function() {
        return function (searchString) {
            if (typeof searchString !== "string") {
                return searchString;
            }
            var pairs = (searchString.indexOf('?') == 0
                            ? searchString.slice(1).split('&')
                            : searchString.split('&')),
                data = {};

            pairs.map(
                // First, split each pair into key-value arrays
                function(curr) {
                    if (curr) {
                        return curr.split('=')
                    }
                })
                .map(
                // Then, map those pairs as actual key-value for return
                function(arr){
                    data[arr[0]] = arr[1];
                });

            return data;
        };
    };

    angular.module('velirSearchMapper',[]).filter('searchMapper', [searchMapper]);
})();
