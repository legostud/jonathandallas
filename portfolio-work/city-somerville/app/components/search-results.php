<section class="search-results">
	<header>
		<h3 class="search-results__header">Search<div class="search-results__search-input">
			<label class="page-search__input-wrapper">
				<input name="keyword" type="text" class="page-search__input" ng-model="search.searchModel.query.keyword" ng-model-options="{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }">
				<svg class="page-search__icon"><use xlink:href="/img/svg-sprite.svg#magnifier"></use></svg>
			</label>
		</div></h3>
		<div class="search-results__info">
			<span>Showing {{((search.searchModel.pagination.currentPage-1) * search.searchModel.pagination.perPage + 1) + "-" + (search.searchModel.pagination.currentPage * search.searchModel.pagination.perPage)}} of {{search.searchModel.pagination.totalItems}} results for "{{search.searchModel.query.keyword || 'trash collection'}}"</span>
			<div class="search-results__sorting">
				Sort by: <a href 
					class="search-results__sorting-option" 
					ng-class="search.sortingOptionClasses.relevance" 
					ng-click="search.sortBy('Relevance')">Relevance</a> | <a href 
					class="search-results__sorting-option" 
					ng-class="search.sortingOptionClasses.date" 
					ng-click="search.sortBy('Date')">Date</a>
			</div>
		</div>
	</header>
	<ul class="search-results__list">
		<li class="search-results__item" ng-repeat="result in search.searchModel.data.source | limitTo:search.searchModel.pagination.perPage">
			<h3 class="search-results__item-title"><a href="#">{{result.title}}</a></h3>
			<div class="search-results__item-metadata"><span class="search-results__item-date">{{result.published | date:'shortDate'}}</span> / <span class="search-results__item-type">{{result.contentType}}</span></div>
			<div class="search-results__item-description">{{result.description}}</div>
		</li>
	</ul>
	<footer>
		<ol class="pagination">
			<li class="pagination__direction pagination__direction--first" ng-click="search.firstPage()" ng-class="{'is-hidden':(search.searchModel.pagination.currentPage == 1)}">First</li>
			<li class="pagination__direction pagination__direction--left" ng-click="search.previousPage()" ng-class="{'is-disabled':(search.searchModel.pagination.currentPage == 1)}">Previous</li>
			<!-- Extra listings when at the end of the list -->
			<li class="pagination__page" ng-if="(search.searchModel.pagination.currentPage == search.searchModel.pagination.lastPage) && (search.searchModel.pagination.lastPage > 4) && (search.searchModel.pagination.currentPage > 4)" ng-click="search.changePage(-4)">{{search.searchModel.pagination.currentPage - 4}}</li>
			<li class="pagination__page" ng-if="(search.searchModel.pagination.currentPage >= (search.searchModel.pagination.lastPage-1)) && (search.searchModel.pagination.lastPage > 3) && (search.searchModel.pagination.currentPage > 3)" ng-click="search.changePage(-3)">{{search.searchModel.pagination.currentPage - 3}}</li>
			<!-- Core five displayed page numbers -->
			<li class="pagination__page" ng-if="search.searchModel.pagination.currentPage > 2" ng-click="search.changePage(-2)">{{search.searchModel.pagination.currentPage - 2}}</li>
			<li class="pagination__page" ng-if="search.searchModel.pagination.currentPage > 1" ng-click="search.changePage(-1)">{{search.searchModel.pagination.currentPage - 1}}</li>
			<li class="pagination__page pagination__active-page">{{search.searchModel.pagination.currentPage}}</li>
			<li class="pagination__page" ng-if="search.searchModel.pagination.currentPage < search.searchModel.pagination.lastPage" ng-click="search.changePage(1)">{{search.searchModel.pagination.currentPage + 1}}</li>
			<li class="pagination__page" ng-if="search.searchModel.pagination.currentPage < (search.searchModel.pagination.lastPage - 1)" ng-click="search.changePage(2)">{{search.searchModel.pagination.currentPage + 2}}</li>
			<!-- Extra listings for the start of the list -->
			<li class="pagination__page" ng-if="(search.searchModel.pagination.currentPage < 3) && (search.searchModel.pagination.lastPage > 3) && (search.searchModel.pagination.currentPage + 3 <= search.searchModel.pagination.lastPage)" ng-click="search.changePage(3)">{{search.searchModel.pagination.currentPage + 3}}</li>
			<li class="pagination__page" ng-if="(search.searchModel.pagination.currentPage < 2) && (search.searchModel.pagination.lastPage > 4) && (search.searchModel.pagination.currentPage + 4 <= search.searchModel.pagination.lastPage)" ng-click="search.changePage(4)">{{search.searchModel.pagination.currentPage + 4}}</li>
			<li class="pagination__direction pagination__direction--right" ng-click="search.nextPage()" ng-class="{'is-disabled':(search.searchModel.pagination.currentPage == search.searchModel.pagination.lastPage)}">Next</li>
			<li class="pagination__direction pagination__direction--first" ng-click="search.lastPage()" ng-class="{'is-hidden':(search.searchModel.pagination.currentPage == search.searchModel.pagination.lastPage)}">Last</li>
			<li class="pagination__load-more" ng-click="search.loadMore()">Load More</li>
		</ol>
	</footer>
</section>