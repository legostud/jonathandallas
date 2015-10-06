<!DOCTYPE html>
<html>
<head>
<title>Calendar Landing</title>
<?php 
	include 'components/head.php';
?>
</head>
<body>
	<?php include 'components/header.php' ?>
	<div class="page-header">
		<style>
			.page-banner {
				background-image:url('/img/castle-small.png');
			}
			@media screen and (min-width: 691px) {
				.page-banner {
					background-image:url('/img/castle-large.png');
				}
			}
		</style>
		<?php
			$pageBannerTitle = "Featured Event Name";
			$pageBannerDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.";
			$pageBannerUrl = "calendar-details.php";
			include 'modules/page-banner.php';
		?>
		<div class="page-header__container">
			<?php 
				$alertPage = true;
				$alertId = 654321;
				include 'components/site-alert.php'; 
			?>
		</div>	
	</div>
	<div class="main-content">
		<div class="main-content__container calendar-landing" ng-app="cosComponentApp" ng-cloak>
			<div class="columns">
				<div class="column">
					<div class="page-share">
						<span class='st_fblike_large' displayText='Facebook Like'></span>
						<span class='st_sharethis_large' displayText='ShareThis'></span>
					</div>
					<?php
						$location = "header";
						$tokens = "Calendar-Landing";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div ng-controller="filterController">
				<div class="columns">
					<div class="column column--25">
						<div class="not-calendar-picker">
							<section class="component add-your-event">
								<form action="contact-us.php" method="GET">
									<input name="departments" value="events" type="hidden" />
									<button class="button-primary">Add Your Event</button>
								</form>
							</section>
							<?php 
								$psTitle = "Search Events";
								include "components/page-search.php";
							?>
						</div>
						<?php include "components/calendar-picker.php"; ?>
					</div>
					<div class="column column--75">
						<div class="filter-by component form-elements">
							<h2 class="heading-decorated">Filter By</h2>
							<div class="filter-bar">
								<div class="filter-bar__filters">
									<div class="filter-bar__filter" ng-repeat="filter in filters">
										<label class="filter-bar__label" for="filter1">{{filter.title}}</label>
										<ui-select 
											class="ui-select-custom"
											ng-model="search.filters[filter.title]" 
											search-enabled="false">
											<ui-select-match>{{$select.selected.display}}</ui-select-match>
											<ui-select-choices repeat="option.value as option in filter.options">
												<div>{{option.display}}</div>
											</ui-select-choices>
										</ui-select>
									</div>
								</div>
								<div class="filter-bar__reset">
									<a href class="reset-filters" ng-click="resetClicked();">Start Over</a>
								</div>
							</div>
							<!-- Filter Bar -->
							<h3>All Upcoming Events, Starting on {{search.date | date:'longDate'}}</h3>
							<div class="filter-results">
								<div class="filter-results__articles" ng-repeat="result in results | orderBy:time | limitTo:search.limit">
									<?php 
										$event = TRUE;
										$title = "{{result.title}}";
										$description = "{{result.description}}";
										$src = "{{result.src}}";
										$eventInfo = "{{result.date | date:'h:mm a'}} / {{result.location}}";
										$href = "{{result.href}}";
										$month = "";
										$day = "";
										@include "modules/article-module.php" 
									?>
									<div ng-if="$index==4">
										<?php @include "components/newsletter.php" ?>
									</div>
									<div ng-if="$last && results.length < 4">
										<?php @include "components/newsletter.php" ?>
									</div>
								</div>
							</div>
							<!-- filter results -->
							<div class="filter-show-more" ng-if="results.length!=0">
								<a name="view-more" class="accordion-link" ng-click="viewMore();">
									View More
								</a>
							</div>
							<p ng-if="results.length==0">
								No Results Found
							</p>
						</div>
					</div>
				</div>
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

</body>
</html>
