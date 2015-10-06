<section class="component hours-address">
	<?php //class options "is-open" or "is-closed" ?>
	<h2 class="heading-decorated is-open">City Hall Hours &amp; Address&nbsp;
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
		<div class="column column--50">
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
		<div class="column column--50">
			<section class="hours-address__address js-linkable-component">
				<a href="https://www.google.com/maps/place/93+Highland+Ave,+Somerville,+MA+02143/@42.386813,-71.0986037,17z/data=!3m1!4b1!4m2!3m1!1s0x89e37732be7dff63:0x708b82a622b7d375"  target="_blank" class="js-linkable-link">
					<h3>Address</h3>
					<p>93 Highland Ave<br />
					Somerville, MA<br />
					02143</p>
				</a>
			</section>
		</div>
	</div>
</section>