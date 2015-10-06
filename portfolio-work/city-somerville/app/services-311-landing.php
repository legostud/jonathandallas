<!DOCTYPE html>
<html>
<head>
<title>311 Service Center</title>
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
			$pageBannerTitle = "311 Service Center";
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
						$tokens = "311-Service-Center";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="column">
				<div class="services-311-content">				
					<div class="services-311-contact">
						<ul class="services-311-contact__items">
							<li class="services-311-contact__item services-311-contact__item--icon">
								<svg class="services-311-contact__item--icon">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#phone"></use>
								</svg>
							</li>
							<li class="services-311-contact__item services-311-contact__item--phoneNumbers">
								<h3>Call 311 <span>or</span> 617-666-3311</h3>
							</li>
							<li class="services-311-contact__item services-311-contact__item--openHours">
								<span>24/7</span>
							</li>
						</ul>
						<div class="services-311-apps">
							<h4 class="services-311-apps__title">Download the App</h4>
							<ul class="services-311-apps__items">
								<li class="services-311-apps__item">
									<a href="https://itunes.apple.com/us/app/commonwealth-connect/id585785702?mt=8">
										<svg class="services-311-apps__icon services-311-apps__icon--apple">
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#apple-os"></use>
										</svg>
									</a>
								</li>
								<li class="services-311-apps__item">
									<a href="https://play.google.com/store/apps/details?id=gov.cityofboston.commonwealthconnect">
										<svg class="services-311-apps__icon services-311-apps__icon--android">
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#android-os"></use>
										</svg>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="requests-answers">
						<div class="requests-answers__title column"><h2>What Would You Like To Do?</h2></div>
						<div class="column column--50">
							<div class="key-services__items submit-requests">
								<div class="key-services__item js-clickable">
									<div class="key-services__icon">
										<svg>
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#phone"></use>
										</svg>
									</div>
									<a href="#/test" target="_blank" class="key-services__content js-clickable-link">
										Submit a Request <span>Get started at (URL Name Goes Here)</span>
									</a>
									<div class="key-services__external-icon">
										<svg>
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#external-link"></use>
										</svg>
									</div>
								</div>
								<div class="requests-answers__content">
									<?php 
										$groupTitle = "Common Requests";
										include 'components/link-list.php'
									?>
								</div>
							</div>
						</div>
						<div class="column column--50">
							<div class="key-services__items get-answers">
								<div class="key-services__item js-clickable">
									<div class="key-services__icon">
										<svg>
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#phone"></use>
										</svg>
									</div>
									<a href="#/test" target="_blank" class="key-services__content js-clickable-link">
										Get Answers <span>See if our FAQ page has the answer you're looking for ></span>
									</a>
									<div class="key-services__external-icon">
										<svg>
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#external-link"></use>
										</svg>
									</div>
								</div>
								<div class="requests-answers__content">
									<?php 
										$groupTitle = "Common FAQs";
										include 'components/link-list.php'
									?>
								</div>
							</div>
						</div>
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
