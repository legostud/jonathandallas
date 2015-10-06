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
			$pageBannerTitle = "Services A-Z";
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
				<div class="helpful-sb column column--25">
					<?php
					 	$relatedTitle = "Top Requested Services";
					 	$relatedItems = ["Disposal & Recycling Procedures","Trash Brochure","Yard Waste"];
						include 'components/related-links.php'; ?>					
					<?php 
						$helpfulTitle = "Cross Promotion Component";
						$helpfulDescription = "Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci.";
						$helpfulLink = "Go";
						include 'components/helpful-content.php' ?>
				</div>
				<div class="column column--75">

					<?php 
						$psTitle = "Search Services";
						include "components/page-search.php";
					?>
					
					<?php
						$groupTitle = "A to Z Listing";
						$groupTitleSrc ="http://www.google.com";
						$articleListTitles = ["Abatements (Property Tax)","Animal Adoption","Archives","Assessing","Auditing","Birth Certificates","Budgeting","Business Assistance","Census Collection","City Cable","Curb Cuts","Dead Animal Removal","Death Certificates","Disability Compliance","Drainlayer Permitting","Education","Electrical Lights and Lines Repair","Election Polling","Electronic Waste Recycling","Emergency Alerts","Emergency Management","Employee Benefits","Engineering Information Requests","Fire Investigation","Fire Prevention","Firefighting","Found Pets","Grants","Haitian Creole Translation & Assistance","Hazardous Waste Pickup & Drop-off","Health Inspections","Housing Assistance","Hydrant Permitting","Immigrant Outreach","Landlord Mediation","Law Enforcement","Legal Disputes & Litigation","Libraries","Lost Pets","Marriage Certificates","Motor Vehicle Excise Tax Collection","Parking Enforcement","Parks Maintenance","Personal Property Taxes","Planning","Playground Maintenance","Portuguese Translation & Assistance","Press Contacts","Procurement","Property Tax Collection","Property Value Assessment","Public Education","Public Event Permits","Public Health Nursing","Rabies Vaccines","Real Estate Taxes","Recycling Pickup","Report Animal Concerns","Report Problems","Request Services","Rodent Control","Senior Citizen Services","Sewer and Drainage Repair","Sewer Permits","Snow Removal (Plowing, Salting, and Sanding)","Social Media (City Accounts)","Spanish Translation & Assistance","Street Sweeping","Tobacco Control","Trash Pickup","Tree Trimming","Voter Registration","Water Billing","Water Bills","Website","Weights & Measures Inspections","White Goods Pickup","Workers' Compensation","Yard Waste Pickup & Drop-off","Zoning"];
						$description = ""; 
						@include "components/link-list.php";
					?>
				</div>
			</div>
		</div>
	</div>	

	<?php include 'components/footer.php' ?>
	<?php include 'components/foot.php' ?>

</body>
</html>
