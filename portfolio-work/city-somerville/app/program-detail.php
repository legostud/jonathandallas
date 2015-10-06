<!DOCTYPE html>
<html>
<head>
<title>Program Detail</title>
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
			$pageBannerTitle = "Program Name";
			$pageBannerDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.";
			$pageBannerUrl = "program-detail.php";
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
						$tokens = "Program-Landing";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns">
				<div class="column column--75">
					<h2>About</h2>
					
					<div class="rich-text-editor">		
						<img class="img-left" src="http://placehold.it/200x150/" />
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta nostrum dolorum veritatis deserunt veniam maiores modi iure, aliquid, beatae libero magnam vel nam ullam quos aspernatur ipsa. Nemo, distinctio, perspiciatis.</p>

						<blockquote class="pull-quote">Ea adipisci repudiandae, vitae sit ab dolorum pariatur, laborum fugit quo temporibus quam doloribus.</blockquote>

						<p>Accusantium, quis! Sed ullam esse a voluptatibus ut id dolore nisi, aspernatur suscipit odit quasi ad maxime iusto quibusdam temporibus nostrum unde sunt distinctio molestias, quisquam, molestiae? Aut ipsam, ex.</p>
						
						<p>Maxime facilis eaque veniam quibusdam laborum qui cum nostrum atque est soluta libero amet obcaecati aliquid consequuntur accusantium porro doloremque consequatur odit, consectetur. Illo veritatis vero consequatur saepe similique quisquam!</p>

						<p>Error adipisci a voluptatem, quibusdam hic voluptas sequi beatae unde velit quaerat. Harum, consectetur quibusdam dolores sit esse deserunt soluta ullam eaque quam expedita id, qui mollitia facilis rem, quas.</p>
					</div>
					
					<h2>Component Title: Tabbed Interface</h2>
					<?php include 'components/tabbed-content.php' ?>
				</div>

				<div class="column column--25">
					<?php include 'components/contact-sidebar.php'; ?>
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
			<div class="columns">
				<div class="column column--75">
					<h2>Keep in Touch</h2>
					<?php include 'components/newsletter.php' ?>
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
