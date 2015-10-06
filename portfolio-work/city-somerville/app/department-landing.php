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
			$pageBannerTitle = "Departments &amp; Divisions";
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
						$tokens = "Your&nbsp;Government Departments";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns columns--reversed">
				<div class="column column--25">
					<?php
					 	$relatedTitle = "Top Departments";
					 	$relatedItems = ["Animal Control","Finance","Personnel"];
						include 'components/related-links.php'; 
					?>
				</div>
				
				<div class="column column--75">
					<?php 
						$psTitle = "Search Departments";
						include "components/page-search.php";
					?>
					
					<?php
						$groupTitle = "Department of Public Works";
						$groupTitleSrc ="http://www.google.com";
						$articleListTitles = ["Buildings & Grounds","Electrical Lights & Lines","Engineering","Highway","Sanitation","Water & Sewer","Weights & Measures"];
						$description = "";
						$groupTitleSrcText = "view department";
						@include "components/link-list.php";
					?>
					<section class="department-list">
						<?php
							$groupTitle = "Health and Human Services";
							$articleListTitles = ["Executive Office on Disability &amp; Compliance","Office of Somerville Commissions","Public Health Nursing","Shape Up Somerville","SomerStreets Program"];
							$description = ""; 
							$groupTitleSrcText = "view department";
							@include "components/link-list.php";
						?>
					</section>

					<section class="department-list">
						<?php
							$groupTitle = "Strategic Planning and Community Development, Recycling & Yard Waste";
							$articleListTitles = ["Economic Development","Housing","Inspectional Services","Parks &amp; Open Space","Planning &amp; Zoning","Transportation &amp; Infrastructure"];
							$description = ""; 
							$groupTitleSrcText = "view department";
							@include "components/link-list.php";
						?>
					</section>
				</div>
			</div>
		</div>
	</div>	
	<?php
		$location = "footer";
		$tokens = "Departments";
		include 'modules/breadcrumbs.php';
	?>

	<?php include 'components/footer.php' ?>
	<?php include 'components/foot.php' ?>

</body>
</html>
