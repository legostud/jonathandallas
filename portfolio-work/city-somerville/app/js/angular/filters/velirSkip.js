(function() {
    'use strict';
    var skip = function() {
        return function (array, count) {
            if ( array instanceof Array ) {
                return array.slice(count);
            }
            return array;
        };
    };

    angular.module('velirSkip',[]).filter('skip', [skip]);
})();