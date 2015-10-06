(function() {
    'use strict';

    var cosPagerFactory= function($log) {
        this.setDataSize = function(pagerData, data) {
            pagerData.totalItems = data.length;
            calcLastPage(pagerData);
        };

        this.setPage = function(pagerData, int) {
            if (isInt(int)) {
                var target = parseInt(int, 10);
                if (target > 0 && target <= pagerData.lastPage) {
                    pagerData.currentPage = target;
                }
            }
        };
        this.changePage = function(pagerData, int) {
            if (isInt(int)) {
                var target = parseInt(int, 10),
                    newTarget = pagerData.currentPage + target;
                if (newTarget > 0 && newTarget <= pagerData.lastPage) {
                    pagerData.currentPage = newTarget;
                }
            }
        };
        this.setPageSize = function(pagerData, int) {
            if (isInt(int)) {
                var size = parseInt(int, 10);
                pagerData.perPage = (size > 0 ? size : pagerData.perPage);
                calcLastPage(pagerData);
            }
        };
        this.loadMore = function(pagerData, howMany) {
            howMany = howMany || pagerData.perPage;
            pagerData.perPage += howMany;
        };

        this.firstPage = function(pagerData) {
            pagerData.currentPage = 1;
        };
        this.lastPage = function(pagerData) {
            pagerData.currentPage = pagerData.lastPage;
        };
        this.nextPage = function(pagerData) {
            if (pagerData.currentPage < pagerData.lastPage) {
                pagerData.currentPage += 1;
            }
        };
        this.previousPage = function(pagerData) {
            if (pagerData.currentPage > 1) {
                pagerData.currentPage -= 1;
            }
        };

        function isInt(int) {
            if (parseInt(int, 10)) {
                return true;
            } else {
                $log.debug('method requires an integer or string representation of an integer');
                return false;
            }
        }

        function calcLastPage(pagerData) {
            pagerData.lastPage = Math.ceil(pagerData.totalItems / pagerData.perPage);
        }
    };

    var module;
    try {
        module = angular.module('cosSearchServices');
    } catch (e) {
        module = angular.module('cosSearchServices', []);
    }
    module.service('cosPagerLogic', ['$log', cosPagerFactory]);
})();