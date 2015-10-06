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
			$pageBannerTitle = "Department A";
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
						$tokens = "Department A";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns columns--reversed">
				<div class="column column--25">
					<?php include 'components/contact-sidebar.php'; ?>
					<?php
					 	$relatedTitle = "Divisions";
					 	$relatedItems = ["Buildings & Grounds","Electrical Lights & Lines","Engineering","Highway","Sanitation","Water & Sewer","Weights & Measures"];
						include 'components/related-links.php'; 
					?>
					<?php include 'components/social-media-feed.php'; ?>
				</div>
				<div class="column column--75">
					<div class="rich-text-editor component">
						<h2>About the Department</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, earum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem laboriosam voluptatibus alias, omnis ipsam consectetur expedita nostrum veritatis dolores in molestiae praesentium non.</p>
						<div class="js-accordion-module">
							<div class="js-accordion-content rich-text-editor__accordion-content">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, earum.</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem laboriosam voluptatibus alias, omnis ipsam consectetur expedita nostrum veritatis dolores in molestiae praesentium non.</p>
							</div>
							<div class="rich-text-editor__accordion-link">
								<span class="accordion-link js-accordion-link">
									<span class="accordion-link__more">View More</span>
									<span class="accordion-link__less">View Less</span>
								</span>
							</div>
						</div>
					</div>

					<?php include 'components/tabbed-content.php' ?>
					<?php include 'components/upcoming-events.php' ?>
					<?php 
						$programShowThree = true;
						include 'components/programs.php';
					?>
					<?php include 'components/highlights.php'; ?>
				</div>
			</div>
			<div class="columns">
				<div class="column column--100">
					<?php include 'components/social-media-feed.php' ?>
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
