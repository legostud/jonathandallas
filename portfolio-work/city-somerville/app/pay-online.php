<!DOCTYPE html>
<html>
<head>
<title>Department Landing</title>
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
			$pageBannerTitle = "Pay Online";
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
						$tokens = "Pay-Online";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns">
				<div class="column column--75">
					<?php 
						$ksTitle = "";
						include "components/key-services.php"; 
					?>
				</div>
				<div class="column column--25">
					<!-- left empty -->
				</div>
			</div>
		</div>
	</div>	

	<?php include 'components/footer.php' ?>
	<?php include 'components/foot.php' ?>

</body>
</html>
