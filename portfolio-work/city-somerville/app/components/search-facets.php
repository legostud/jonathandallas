<?php
    $content_types = ['Alert', 'Event', 'FAQs', 'News', 'Program'];
    $departments = ['Animal Control', 'City Clerk', 'Communications', 'Constituent Services (311)', 'Department of Public Works'];
?>
<section class="search-facets" ng-class="{'is-expanded':search.showFacets, 'has-overflow':search.showOverflow}">
    <div class="search-facets__display-toggle accordion-link"><a href="" ng-click="search.toggleFacetDisplay()">Show/Hide Facets</a></div>
    <div class="search-facets__pdf">
        <label><input type="checkbox" ng-model="search.searchModel.query.includePDFs"/> Include PDF's in results</label>
    </div>
    <h2 class="search-facets__header">Filter By</h2>
    <section class="search-facets__facet" ng-repeat="facet in search.searchModel.data.availableFacets">
        <div class="search-facets__facet-header">
            <a href="" class="search-facets__clear" ng-show="search.searchModel.query[facet.key].length > 0" ng-click="search.clearFacet(facet)">[Clear]</a>
            <h3>{{facet.displayName}}</h3>
        </div>
        <ul class="search-facets__items">
            <li class="search-facets__item" ng-repeat="item in facet.facets"><label><input type="checkbox" ng-model="item.selected" ng-click="search.toggleFacetItem(item, facet)"/>{{item.displayName}}</label></li>
        </ul>
    </section>
    <section class="search-facets__facet">
        <div class="search-facets__facet-header">
            <a href="" class="search-facets__clear" ng-click="search.clearDateFacet()" ng-show="search.hasDateSelected">[Clear]</a>
            <h3>Date Range</h3>
        </div>
        <ul class="search-facets__items calendar-picker__calendar">
            <li class="search-facets__item"><label for="timestampStart" ng-click="search.openCalendar($event)"><input id="timestampStart" type="text" placeholder="mm/dd/yyyy" datepicker-popup="{{search.calendarModel.timestampStart.format}}" is-open="search.calendarModel.timestampStart.isOpen" ng-model="search.searchModel.query.timestampStart"/></label> to</li>
            <li class="search-facets__item"><label for="timestampEnd" ng-click="search.openCalendar($event)"><input id="timestampEnd" type="text" placeholder="mm/dd/yyyy" datepicker-popup="{{search.calendarModel.timestampStart.format}}" is-open="search.calendarModel.timestampEnd.isOpen" ng-model="search.searchModel.query.timestampEnd"/></label></li>
        </ul>
    </section>
</section>