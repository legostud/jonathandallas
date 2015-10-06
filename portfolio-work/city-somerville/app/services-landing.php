<!DOCTYPE html>
<html>
<head>
<title>Services Landing</title>
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
						$tokens = "Services";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns columns--reversed">
				<div class="column column--25">
					<?php
					 	$relatedTitle = "Top Requested Services";
					 	$relatedItems = ["Disposal","Trash Brochure","Yard Waste"];
						include 'components/related-links.php'; 
					?>
				</div>
				
				<div class="column column--75">
					<?php 
						$psTitle = "Search Services";
						include "components/page-search.php";
					?>
					
					<section class="services-list">
						<?php
							$groupTitle = "Cars, Parking &amp Bikes";
							$articleListTitles = ["Parking Permits","Parking Tickets","Vehicle Excise Tax","Street Sweeping","Snow Emergencies","Detours & Construction"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Trash, Recycling & Yard Waste";
							$articleListTitles = ["Trash Day Lookup","Recycling Guide","Yard Waste","Hazardous Waste","Bulky Items","Electronic Waste","Compost","TVs & Monitors"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Streets & Sidewalks";
							$articleListTitles = ["Potholes","Sidewalk Repairs","Streetlights","Detours & Construction","Street Trees"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Payments, Appeals & Online Services";
							$articleListTitles = ["Parking Tickets","Excise Tax","Licenses","Permits","Water Bills","Appeal Parking Ticket","Citation Info"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Records, Permits & Licenses";
							$articleListTitles = ["Marriage Licenses","Birth Records","Business Permits","Dog Licenses"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Environment, Trees & Water";
							$articleListTitles = ["Tree trim","Tree request","Water Bills","Sewer Backup","Community Gardens"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Business & Economic Development";
							$articleListTitles = ["Licenses","Permits","Sitefinder","Business Assistance","Business Service Center"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>
						
					<section class="services-list">
						<?php
							$groupTitle = "Government, Civic Services & Voting";
							$articleListTitles = ["Parking Tickets","Excise Tax","Licenses","Permits","Water Bills","Appeal Parking Ticket","Citation Info"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Property & Housing";
							$articleListTitles = ["Taxes","Assessments","Residential Exemption","Affordable Housing","Lead Abatement","Tenant Resources"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Schools, Learning & Libraries";
							$articleListTitles = ["K-12 Schools","Adult Learning","Libraries","After-school programs","Recreation programs","ESOL Classes"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Public Safety";
							$articleListTitles = ["Emergency Alerts Signup","Police, Fire","Child Safety Seats","Animal Control","Health Inspections","Register Electronic Devices","Snow Emergency Info"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Health, Wellness & Social Services";
							$articleListTitles = ["Missing?"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Communications & Information Services";
							$articleListTitles = ["Emergency Alerts Signup","E-News, Media Contacts","Social Media","City Cable TV, Data Dashboard","FAQs","Advertising","New Resident Info"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "Arts, Culture & Recreation";
							$articleListTitles = ["Recreation programs","Arts Council","Libraries","Event Planning","Facility Rentals"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

					<section class="services-list">
						<?php
							$groupTitle = "311 Service Center";
							$articleListTitles = ["Service requests","Information","Mobile Apps"];
							$description = ""; 
							@include "components/link-list.php";
						?>
					</section>

				</div>
			</div>
		</div>
	</div>	
	<?php
		$location = "footer";
		$tokens = "Services";
		include 'modules/breadcrumbs.php';
	?>

	<?php include 'components/footer.php' ?>
	<?php include 'components/foot.php' ?>

</body>
</html>
