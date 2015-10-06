(function() {
    'use strict';

    var cosFacetService = function() {
        this.updateSelectedFacets = function(availableFacetsList, selectedFacetsList) {
            angular.forEach(availableFacetsList, function(item, key) {
                item.selected = (selectedFacetsList.indexOf(item.value) != -1);
            });
        };

        this.toggleFacetItem = function(facetItemValue, facet) {
            var index;
            if (typeof facetItemValue == 'object') {
                $log.error("Facet item should be a value, not the whole object");
            } else {
                index = facet.indexOf(facetItemValue);
                index > -1 ? facet.splice(index, 1) : facet.push(facetItemValue);
            }
        };

        this.clearFacet = function(facet) {
            facet = [];
        };
    };

    var module;
    try {
        module = angular.module('cosSearchServices');
    } catch (e) {
        module = angular.module('cosSearchServices', []);
    }
    module.service('cosFacetService', [cosFacetService]);
})();