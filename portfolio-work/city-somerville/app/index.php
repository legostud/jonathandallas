<!DOCTYPE html>
<html>
<head>
<title>homepage</title>
<?php 
	include 'components/head.php';
?>
</head>
<body class="home">
	<?php include 'components/header.php' ?>
	<div class="main-content">
		<?php include 'components/hp-site-search.php' ?>
		<?php include 'components/status-bar.php' ?>
		<div class="main-content__top-container component">
			<div class="columns">
				<div class="column column--50">
					<?php 
						$ksTitle = "Key Services";
						include 'components/key-services.php';
					?>
				</div>
				<div class="column column--50">
					<?php include 'components/latest-news.php' ?>
				</div>
			</div>
		</div>
		<div class="main-content__container" ng-app="cosComponentApp" ng-cloak>
			<div class="columns">
				<div class="column column--50">
					<?php 
						$programShowThree = false; 
						include 'components/programs.php';
					?>
					<?php include 'components/newsletter.php' ?>
				</div>
				<div class="column column--50">
					<?php
						$eventsShowImages = true;
						include 'components/upcoming-events.php'; 
					?>
				</div>
			</div>
			<?php include 'components/media-gallery.php' ?>
			<?php include 'components/hours-address.php' ?>
		</div>
	</div>	
	<section class="google-map js-google-map"></section>
	<?php include 'components/footer.php' ?>
	<?php include 'components/foot.php' ?>
</body>
</html>
