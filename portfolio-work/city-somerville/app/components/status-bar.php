   			<section class="status-bar-wrapper">
   				<section class="status-bar">
					<div class="calendar calendar--sr status-bar__item--date">
						<h6 class="calendar__title">Today:</h6>
						<?php 
							$month = "MAR";
							$day = "24";
							include '/modules/date-display.php';
						?>
						<a href="calendar-landing.php">
							<svg class="status-bar__calendar-icon">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#calendar"></use>
							</svg>
						</a>
					</div>
					<ul class="status-bar__items">
						<li class="status-bar__item">
							<div class="status-bar__wrapper">
								<h3 class="status-bar__title js-equal-height"><a href="#">Trash &amp; Recyling</a></h3>
								<svg class="status-bar__icon">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#trash-can"></use>
								</svg>
								<div class="status-bar__status">
									On Schedule
									<svg class="status-bar__check">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#check-mark-3"></use>
									</svg>
								</div>
							</div>
						</li>
						<li class="status-bar__item">
						<div class="status-bar__wrapper">
							<h3 class="status-bar__title js-equal-height"><a href="#">Street Sweeping</a></h3>
							<svg class="status-bar__icon">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#streetsweeping-icon"></use>
							</svg>
							<div class="status-bar__status">
								In Effect
								<svg class="status-bar__check">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#check-mark-3"></use>
								</svg>
							</div>
						</li>
						<li class="status-bar__item">
							<div class="status-bar__wrapper">
								<h3 class="status-bar__title js-equal-height"><a href="#">Schools</a></h3>
								<svg class="status-bar__icon">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#backpack"></use>
								</svg>
								<div class="status-bar__status status-bar__status--unchecked">
									Closed
									<svg class="status-bar__x">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#x-mark-3"></use>
									</svg>
								</div>
							</div>
						</li>
						<li class="status-bar__item">
							<div class="status-bar__wrapper">
								<h3 class="status-bar__title js-equal-height"><a href="#">Snow Emergency</a></h3>
								<svg class="status-bar__icon">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#snowflake"></use>
								</svg>
								<div class="status-bar__status">
									In Effect
									<svg class="status-bar__check">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#check-mark-3"></use>
									</svg>
								</div>
							</div>
						</li>
						<li class="status-bar__mores">
							<div class="status-bar__more-wrapper">
								<div class="status-bar__more">
									<svg class="status-bar__icon">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#cone13"></use>
									</svg>
									<h3 class="status-bar__title"><a href="#">View detour updates</a></h3>
								</div>
								<div class="status-bar__more">
									<svg class="status-bar__icon">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#bar-chart"></use>
									</svg>
									<h3 class="status-bar__title"><a href="#">See Data Dashboard</a></h3>
								</div>
							</div>
						</li>
					</ul>
				</section>
   			</section>
