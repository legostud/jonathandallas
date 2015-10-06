<!DOCTYPE html>
<html>
<head>
<title>Contact Us</title>
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
			$pageBannerTitle = "Contact Us";
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
						$tokens = "Contact-Us";
						include 'modules/breadcrumbs.php';
					?>
				</div>
			</div>
			<div class="column contact-us">
				<div class="contact-us-content">
					<div class="city-hall">
						<section class="component hours-address">
							<?php //class options "is-open" or "is-closed" ?>
							<h2 class="is-open">City Hall Hours &amp; Address&nbsp;
								<span class="hours-address__status">
									Open
									<svg class="hours-address__status-icon">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#check-mark-3"></use>
									</svg>
						<?php /* if we're closed show this icon instead
									<svg class="hours-address__status-icon">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#x-mark-3"></use>
									</svg>
						*/ ?>
								</span>
							</h2>
							<div class="hours-address__tip">
								Contact 311 (Open 24/7)
							</div>
							<div class="hours-address__read-more"><a href="#" class="cta-primary">See all City Services</a></div>
							<div class="columns">
								<div class="column column--33">
									<section class="hours-address__hours">
										<h3>Hours</h3>
										<p>Monday - Wednesday <span class="hours-address__time">8:30 AM - 4:30 PM</span><br />
										Thursday <span class="hours-address__time">8:30 AM - 7:30 PM</span><br />
										Friday <span class="hours-address__time">8:30 AM - 12:30 PM</span></p>
										<h3>Off Hours</h3>
										<p>Contact 311 24/7
										</p>
									</section>
								</div>
								<div class="column column--33">
									<section class="hours-address__address js-linkable-component">
										<a href="https://www.google.com/maps/place/93+Highland+Ave,+Somerville,+MA+02143/@42.386813,-71.0986037,17z/data=!3m1!4b1!4m2!3m1!1s0x89e37732be7dff63:0x708b82a622b7d375"  target="_blank" class="js-linkable-link">
											<h3>Address</h3>
											<p>93 Highland Ave<br />
											Somerville, MA<br />
											02143</p>
										</a>
									</section>
								</div>
								<div class="helpful-sb column column--33">
									<?php 
										$helpfulTitle = "Cross Promotion Component";
										$helpfulDescription = "Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci.";
										$helpfulLink = "Go";
										include 'components/helpful-content.php' ?>
								</div>
							</div>
						</section>
					</div>
					<div class="reach-us component">
						<h2 class="reach-us__title">Reach us by Phone</h2>
						<svg class="services-311-contact__item--icon">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#phone"></use>
						</svg>
						<ul class="services-311-contact__items">
							<li class="services-311-contact__item services-311-contact__item--phoneNumbers">
								Call 311 (617-666-3311 from outside of Somerville)
							</li>
							<li class="services-311-contact__item services-311-contact__item--phoneNumbers">
								TTY/Hearing Impaired (only) dial 866-808-4851
							</li>							
						</ul>
						<p></p>
						<p></p>
					</div>
					<div class="leave-message">
					<h2>Leave us a Message</h2>
						<fieldset>
							<form class="form-elements" action="" method="">
								<p class="department"><label for="dropdown">Department</label><br />
									<select name="department" class="js-custom-select">
										<option value="All Departments" selected>All Departments</option>
										<option value="Department Name">Department Name</option>
										<option value="Department Name">Department Name</option>
										<option value="Department Name">Department Name</option>
									</select>
								</p>
								<p class="name"><label class="required" for="text_field">Name</label><br />
								  <input type="text" id="text_field" class="half" />
								</p>
								<p class="email"><label class="required" for="text_field">Email</label><br />
								  <input type="text" id="text_field" class="half" />
								</p>
								<p class="address"><label for="text_field">Address</label><br />
								  <input type="text" id="text_field" class="full" />
								</p>
								<p class="message"><label class="required" for="text_area">Message</label><br>
									<textarea id="text_area" class="full"></textarea>
								</p>
								<div class="note full">Fields marked with <span class="required"></span> are required
								</div>
								<p>
									<input class="small-btn" type="submit" value="Send" />
								</p>
							</form>
						</fieldset>
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
