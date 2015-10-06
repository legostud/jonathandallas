<!DOCTYPE html>
<html>
<head>
<title>Be Somerville</title>
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
			$pageBannerTitle = "Be Somerville";
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
						$tokens = "Be&nbsp;Somerville";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns columns--reversed">
				<div class="column">
					<?php
						$spotlightTitle = "Spotlight Content";
						$buttonText = "Action";
						$spotlightDescription =
							"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</p>
							<p>Proin sodales pulvinar tempor. Com sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>";
						include 'components/spotlight.php';
					?>
					<h2>Interact With The City</h2>
					<?php include 'components/tabbed-content-image-content.php' ?>
					<?php
						$eventsShowImages = true;
						$eventsCityResidents = true;
						include 'components/upcoming-events-images.php'
					?>

					<h2>Keep in Touch</h2>
					<div class="contact component">
						<?php include 'components/social-media-feed.php' ?>
						<?php include 'components/newsletter.php' ?>
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
