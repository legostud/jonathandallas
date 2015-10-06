<!DOCTYPE html>
<html>
<head>
<title>search</title>
<?php 
	include 'components/head.php';
?>
</head>
<body>
	<?php include 'components/header.php' ?>
	<div class="main-content">
 		<div class="main-content__container search-page" ng-app="cosSearchApp" ng-cloak ng-controller="cosSearchCtrl as search">
	 		<div class="columns">
				<div class="column column--75">
					<?php
						$location = "header";
						$tokens = "Search";
						include 'modules/breadcrumbs.php';
					?>
					<div class="search-header component">
						<div class="search-header__heading">
							<h1>Search Results </h1>
							<h3 class="search-header__header">within</h3><ui-select 
								class="ui-select-custom" 
								ng-model="search.searchModel.query.domain" 
								search-enabled="false">
								<ui-select-match>{{$select.selected.display}}</ui-select-match>
								<ui-select-choices repeat="domain.value as domain in search.domainOptions">
									<div>{{domain.display}}</div>
								</ui-select-choices>
							</ui-select>
						</div>
						<div style="clear:both;"></div>
					</div>
				</div>
				<div class="column column--25">
					<?php include 'components/related-links.php' ?>

				</div>
			</div>
			<div class="search-page__body">
				<?php include 'components/search-facets.php' ?>
				<?php include 'components/search-results.php' ?>
			</div>
  		</div>
	</div>

	<?php
		$location = "footer";
		$tokens = "Search";
		include 'modules/breadcrumbs.php';
	?>
	<?php include 'components/footer.php' ?>
	<?php include 'components/foot.php' ?>
	<script type="text/javascript" src="js/angular/searchApp.js"></script>
	<script type="text/javascript" src="js/angular/controllers/cosSearchCtrl.js"></script>
	<script type="text/javascript" src="js/angular/services/cosFacetService.js"></script>
	<script type="text/javascript" src="js/angular/services/cosPagerFactory.js"></script>
	<script type="text/javascript" src="js/angular/services/cosSearchService.js"></script>
	<script type="text/javascript" src="js/angular/filters/velirSearchMapper.js"></script>
	<script type="text/javascript" src="js/angular/filters/velirSkip.js"></script>
</body>
</html>
