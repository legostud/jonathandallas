<!DOCTYPE html>
<html>
<head>
<title>Residents Landing</title>
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
					background-image:url('/img/castle-large.png'), url('/img/castle-small.png');
				}
			}
		</style>
		<?php
			$pageBannerTitle = "Residents";
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
	<div class="main-content residents">
		<div class="main-content__container" ng-app="cosComponentApp" ng-cloak>
			<div class="columns">
				<div class="column">
					<?php include "components/page-share.php" ?>
					<?php
						$location = "header";
						$tokens = "Resident-Landing";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<h2 class="residents__title">Resident Services</h2>
					<?php include 'components/tabbed-content-image-content.php' ?>
					<?php 
						$spotlightTitle = "Welcome To Somerville";
						$spotlightDescriptionTitle = "Welcome Kit";
						$buttonText = "Request A Welcome Kit";
						$spotlightDescription =
							"<p>To help you get settled in, we’ve put together a Welcome Kit with useful information about our city and its governmental services. We hope the informational guides and brochures will help make your transition to a new community a little smoother.</p>
							<p>You can expect to find disposal and recycling information, information on obtaining permits  and important parking policies,  street cleaning and snow removal regulations and more.</p>";
						include 'components/spotlight.php';
					?>
				</div>
			</div>
			<div class="columns">
				<div class="column column--50">
					<?php include 'components/address-look-up.php' ?>
				</div>
				<div class="column column--50">
					<?php include 'components/residents-alerts.php' ?>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<h2 class="residents__title">Keep in Touch</h2>
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
