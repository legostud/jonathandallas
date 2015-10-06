(function() {
    'use strict';

    var cosSearchCtrl = function($filter, $scope, facetService, searchService, pager) {
        var self = this,
            contentTypeWatcher,
            dateWatcher,
            departmentWatcher,
            pageWatcher,
            queryWatcher,
            sortingWatcher;

        this.searchModel = {
            data: {
                source: [],
                availableFacets: {
                    contentType: {
                        displayName: '',
                        facets: []
                    },
                    department: {
                        displayName: '',
                        facets: []
                    }
                }
            },
            pagination: {
                currentPage: 1,
                lastPage: 1,
                perPage: 10,
                totalItems: 0
            },
            query: {
                contentType: [],
                department: [],
                domain: 'City of Somerville',
                includePDFs: false,
                keyword: '',
                sorting: 'Date',
                timestampEnd: '',
                timestampStart: ''
            }
        };

        this.domainOptions = [
            {value:"City of Somerville",display: 'SomervilleMA.gov'},
            {value:"ParkSomerville", display:'ParkSomerville'},
            {value:"Domain Name", display:'Domain Name'}
        ];

        this.calendarModel = {
            timestampStart: {
                format: 'MM/dd/yyyy',
                isOpen: false
            },
            timestampEnd: {
                format: 'MM/dd/yyyy',
                isOpen: false
            }
        };

        this.sortingOptionClasses = {
            date: [],
            relevance: []
        };

        this.hasDateSelected = false;
        this.showFacets = false;
        this.showOverflow = false;

        function init() {
            paramMapper();
            makeSearch();
            initWatchers();
        }

        this.changePage = function(pageNum) {
            pager.changePage(self.searchModel.pagination, pageNum);
        };
        this.firstPage = function() {
            pager.firstPage(self.searchModel.pagination);
        };
        this.lastPage = function() {
            pager.lastPage(self.searchModel.pagination);
        };
        this.nextPage = function() {
            pager.nextPage(self.searchModel.pagination);
        };
        this.previousPage = function() {
            pager.previousPage(self.searchModel.pagination);
        };

        this.loadMore = function() {
            pager.loadMore(self.searchModel.pagination, 10);
        };

        this.sortBy = function(field) {
            // Descending first
            //this.searchModel.query.sorting  = (this.searchModel.query.sorting.indexOf(field) === 1 ? '' : '-') + field;

            // Ascending first
            this.searchModel.query.sorting  = (this.searchModel.query.sorting === field ? '-' : '') + field;
        };

        this.toggleFacetItem = function(facetItem, facet) {
            facetService.toggleFacetItem(facetItem.value, self.searchModel.query[facet.key]);
        };

        this.clearFacet = function(facet) {
            self.searchModel.query[facet.key] = [];
            angular.forEach(facet.facets, function(item, key) {
                item.selected = false;
            });
        };
        this.clearDateFacet = function() {
            self.searchModel.query.timestampEnd = '';
            self.searchModel.query.timestampStart = '';
        };

        this.openCalendar = function(event) {
            this.showOverflow = true;
            angular.forEach(this.calendarModel, function(cal, key) {
                if (event.currentTarget.htmlFor == key) {
                    cal.isOpen = !cal.isOpen;
                } else {
                    cal.isOpen = false;
                }
            });
        };

        this.toggleFacetDisplay = function() {
            this.showFacets = !this.showFacets;
            if (!this.showFacets) {
                this.showOverflow = false;
            }
        };

        function updateData (success) {
            success.data.results = success.data.results || [];
            self.searchModel.data.source = success.data.results;
            updateSelectedFacets(success.data.availableFacets); // Mark selected facets
            self.searchModel.data.availableFacets = success.data.availableFacets;

            pager.setDataSize(self.searchModel.pagination, success.data.results);
        }
        function searchError(error) {
            // Do error things
        }

        function updateSelectedFacets(availableFacetsList) {
            angular.forEach(availableFacetsList, function(facet, facetKey) {
                facetService.updateSelectedFacets(facet.facets, self.searchModel.query[facet.key]);
            });
        }

        function paramMapper() {
            if (location.search.length) {
                var searchParams = $filter('searchMapper')(location.search);
                if (angular.isDefined(searchParams.contentType)) {
                    searchParams.contentType = searchParams.contentType.split(',');
                }
                if (angular.isDefined(searchParams.department)) {
                    searchParams.department = searchParams.department.split(',');
                }

                angular.extend(self.searchModel.query, searchParams);
            }
        }

        function initWatchers() {
            contentTypeWatcher = $scope.$watchCollection(angular.bind(this,function(){return self.searchModel.query.contentType}), makeSearch);
            dateWatcher = $scope.$watchGroup([
                angular.bind(this,function(){return self.searchModel.query.timestampEnd}),
                angular.bind(this,function(){return self.searchModel.query.timestampStart})
            ], dateSelected);
            departmentWatcher = $scope.$watchCollection(angular.bind(this,function(){return self.searchModel.query.department}), makeSearch);
            pageWatcher = $scope.$watchCollection(angular.bind(this,function(){return self.searchModel.pagination}), makeSearch);
            queryWatcher = $scope.$watchGroup([
                angular.bind(this,function(){return self.searchModel.query.includePDFs}),
                angular.bind(this,function(){return self.searchModel.query.keyword}),
                angular.bind(this,function(){return self.searchModel.query.sorting}),
                angular.bind(this,function(){return self.searchModel.query.timestampEnd}),
                angular.bind(this,function(){return self.searchModel.query.timestampStart})
            ], makeSearch);
            sortingWatcher = $scope.$watch(angular.bind(this,function(){return self.searchModel.query.sorting}), updateSortingClasses);
        }

        function makeSearch() {
            searchService.search(self.searchModel.query).then(updateData,searchError);
        }

        function dateSelected() {
            self.hasDateSelected = false;
            if (self.searchModel.query.timestampEnd || self.searchModel.query.timestampStart) {
                self.hasDateSelected = true;
            }
        }

        function updateSortingClasses() {
            var classes = {
                'active': 'search-results__sorting-option--is-active',
                'ascending': 'search-results__sorting-option--is-ascending',
                'descending': 'search-results__sorting-option--is-descending'
            };
            var sorting;

            // Clean out old classes first
            self.sortingOptionClasses.date = [];
            self.sortingOptionClasses.relevance = [];

            if (self.searchModel.query.sorting.indexOf('Relevance')!=-1) {
                sorting = 'relevance';
            } else {
                sorting = 'date';
            }
            self.sortingOptionClasses[sorting].push(classes.active);
            if (self.searchModel.query.sorting.indexOf('-')==-1) {
                self.sortingOptionClasses[sorting].push(classes.ascending);
            } else {
                self.sortingOptionClasses[sorting].push(classes.descending);
            }
        }

        init();
    };

    var module;
    try {
        module = angular.module('cosSearchControllers');
    } catch (e) {
        module = angular.module('cosSearchControllers', []);
    }
    module.controller('cosSearchCtrl', ['$filter', '$scope', 'cosFacetService', 'cosSearchService', 'cosPagerLogic', cosSearchCtrl]);
})();
