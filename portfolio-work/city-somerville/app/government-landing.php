<!DOCTYPE html>
<html>
<head>
<title>Government Landing</title>
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
			$pageBannerTitle = "Government Landing";
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
						$tokens = "Government Landing";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="columns columns">
				<div class="column column--75">
					<div class="rich-text-editor component">
						<h3><a href="#">Mayor's Office</a></h3>
					 
						<p>The Mayor is elected every two years (on the odd-numbered years) and is responsible for all executive decision making.  All City departments report to the Mayor who also appoints all members of the boards and commissions.</p>
						 
						<h3><a href="#">Board of Aldermen</a></h3>
						 
						<p>The Board of Aldermen is the City's legislative branch.  Members are elected every two years (on the odd-numbered years.)  Four members serve at-large.  Seven members represent individual wards. The Board passes ordinances about a broad range of issues, from setting zoning laws to creating boards and commissions. The Board also has the authority to cut funds from the budget presented yearly by the Mayor.</p>
						 
						<h3><a href="#">School Committee</a></h3>
						 
						<p>The School Committee oversees the city's school system, working with Superintendent to set broad policies and developing a recommended budget for submission to the Mayor. The Committee is composed of seven members elected by ward every two years (on the odd-numbered years.). The Mayor and the President of The Board of Aldermen are ex-officio members with full voting rights.</p> 
						 
						<h3><a href="#">Boards and Commissions</a></h3>
						 
						<p>Boards and commissions exist to advise or, in some cases, rule on important City business. Members are appointed by the Mayor and approved by the Board of Aldermen.</p>  
						 
						<h3><a href="#">City Departments</a></h3>
						 
						<p>Day-to-day City operations are managed by a number of departments, each with a director or commissioner reporting to the Mayor.</p>						
					</div>
				</div>
				<div class="column column--25">
					<?php 
						$helpfulTitle = "Employee Look Up";
						$helpfulDescription = "A quick way to find City employees through the Employee Address Book";
						$helpfulLink = "GO";
						include "components/helpful-content.php";
					?>
					<?php 
						$helpfulTitle = "Forms Library";
						$helpfulDescription = "Looking for a specific form? Visit our Forms Library to find it";
						$helpfulLink = "GO";
						include "components/helpful-content.php";
					?>
				</div>
			</div>
		</div>
	</div>	

	<?php
		$location = "footer";
		$tokens = "Government-Landing";
		include 'modules/breadcrumbs.php';
	?>
	<?php include 'components/footer.php' ?>
	<?php include 'components/foot.php' ?>
</body>
</html>
