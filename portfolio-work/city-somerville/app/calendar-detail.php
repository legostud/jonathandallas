<!DOCTYPE html>
<html>
<head>
<title>Calendar Detail</title>
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
			$pageBannerTitle = "Event Title";
			$pageBannerDescription = "Friday, March 27, 2015.<br />
						6:00 PM<br />
						East Somerville Community School";
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
		<div class="main-content__container" ng-app="cosComponentApp" ng-cloak>
			<div class="columns">
				<div class="column">
				<?php include "components/page-share.php" ?>
					<?php
						$location = "header";
						$tokens = "Calendar-Landing";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns">
				<div class="column column--75">
					<h2 class="calendar-detail__title">About the Event</h2>
					<div class="calendar-detail__print">
						<a class="calendar-detail__print--button button-secondary" href="javascript:window.print()">Print</a>
					</div>

					<?php include 'components/calendar-detail-content.php' ?>

					<?php include 'components/calendar-add-embed.php' ?>
					
					<!-- NOTE: This button is duplicated on this page -->
					<a href="#" class="button-primary calendar-detail__register-button">I'm Going!</a>

					<?php include 'components/location-component.php' ?>
				</div>

				<div class="column column--25">
					<!-- NOTE: This button is duplicated on this page -->
					<a href="#" class="button-primary calendar-detail__register-button">I'm Going!</a>
					<?php include 'components/contact-sidebar.php'; ?>
					<?php include 'components/department-sidebar.php'; ?>
				</div>
			</div>
			<div class="columns">
				<div class="column column--100">
					<?php
						$eventsShowImages = true;
						$eventsCityResidents = true;
						include 'components/upcoming-events-images.php'; 
					?>
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
