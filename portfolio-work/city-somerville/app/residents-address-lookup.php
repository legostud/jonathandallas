<!DOCTYPE html>
<html>
<head>
<title>Address Information Lookup</title>
<?php 
	include 'components/head.php';
?>
</head>
<body>
	<?php include 'components/header.php' ?>
	<div class="page-header">
		<style>
			.page-banner {
				background-image:url('/img/hp-search-bg-small.png');
			}
			@media screen and (min-width: 691px) {
				.page-banner {
					background-image:url('/img/hp-search-bg-large.png');
				}
			}
		</style>
		<?php
			$pageBannerTitle = "Address Information Lookup";
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
					<div class="page-share">
						<span class='st_fblike_large' displayText='Facebook Like'></span>
						<span class='st_sharethis_large' displayText='ShareThis'></span>
					</div>
					<?php
						$location = "header";
						$tokens = "Address-Lookup";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<?php include 'components/address-look-up.php' ?>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<?php include 'components/address-table.php' ?>
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
