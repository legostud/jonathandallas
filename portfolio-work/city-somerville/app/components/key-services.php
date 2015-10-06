	<section class="key-services component">
		<?php if($ksTitle): ?>
			<h2><?php echo $ksTitle ?></h2>
		<?php endif; ?>
		<ul class="key-services__items">
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#phone"></use>
					</svg>
				</div>
				<a href="#/test" target="_blank" class="key-services__content js-clickable-link">
					Make a 311 Service Request
				</a>
				<div class="key-services__external-icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#external-link"></use>
					</svg>
				</div>
			</li>
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#credit-card"></use>
					</svg>
				</div>
				<a href="#" class="key-services__content js-clickable-link">
					Pay a Bill
				</a>
			</li>
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#cone13"></use>
					</svg>
				</div>
				<a href="#" class="key-services__content js-clickable-link">
					Go to Traffic &amp; Parking
				</a>
			</li>
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#warning"></use>
					</svg>
				</div>
				<a href="#" class="key-services__content js-clickable-link">
					Sign up for Alerts
				</a>			
			</li>
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#trash-can"></use>
					</svg>
				</div>
				<a href="#" class="key-services__content js-clickable-link">
					Get Trash &amp; Recycling Information
				</a>
			</li>
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#user"></use>
					</svg>
				</div>
				<a href="#" class="key-services__content js-clickable-link">
					Register to Vote
				</a>
			</li>
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#map"></use>
					</svg>
				</div>
				<a href="#" class="key-services__content js-clickable-link">
					En Español<br />
					Em Português<br />
					Nan Kreyòl yisyen
				</a>
			</li>
			<li class="key-services__item js-clickable">
				<div class="key-services__icon">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#help"></use>
					</svg>
				</div>
				<a href="#" class="key-services__content js-clickable-link">
					View FAQs
				</a>
			</li>
		</ul>
		<?php 
			$message = "View all City Services";
			include '/modules/read-more.php'; 
		?>
	</section>