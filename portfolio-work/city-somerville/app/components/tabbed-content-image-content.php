<div class="tabbed-content component" ng-controller="TabCtrl as tab" >
    <section>
    	<ul class="tabbed-content__tabs">
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(1)}" ng-click="tab.selectTab(1)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#gear"></use></svg>
				<h3>Live</h3>
			</li>
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(2)}" ng-click="tab.selectTab(2)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#note"></use></svg>
				<h3>Work</h3>
			</li>
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(3)}" ng-click="tab.selectTab(3)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#help"></use></svg>
				<h3>Play</h3>
			</li>
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(4)}" ng-click="tab.selectTab(4)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#video-play"></use></svg>
				<h3>Raise a Family</h3>
			</li>
		</ul>
	</section>

	<section class="tabbed-content__panels">
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(1)">
			<h3 class="accordion-link js-accordion-link">Services</h3>
			<div class="accordion-content js-accordion-content">
				<article class="article-content">
						<div class="article-content__media">
							<img src="/img/mock/july4.jpg" alt="" width="510" class="article-content__image" />
						</div>
					<h4 class="article-content__title">Title 1</h4>
					<p class="article-content__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo.</p>
					<a class="cta-primary pull-right" href="/">Learn more</a>
				</article>
			</div>
		</div>
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(2)">
			<h3 class="accordion-link js-accordion-link">Forms</h3>
			<div class="accordion-content js-accordion-content">
				<article class="article-content">
						<div class="article-content__media">
							<img src="/img/mock/july4.jpg" alt="" width="510" class="article-content__image" />
						</div>
					<h4 class="article-content__title">Title 2</h4>
					<p class="article-content__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo.</p>
					<a class="cta-primary pull-right" href="/">Learn more</a>
				</article>
			</div>
		</div>
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(3)">
			<h3 class="accordion-link js-accordion-link">FAQs</h3>
			<div class="accordion-content js-accordion-content">
				<article class="article-content">
						<div class="article-content__media">
							<img src="/img/mock/july4.jpg" alt="" width="510" class="article-content__image" />
						</div>
					<h4 class="article-content__title">Title 3</h4>
					<p class="article-content__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo.</p>
					<a class="cta-primary pull-right" href="/">Learn more</a>
				</article>
			</div>
		</div>
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(4)">
			<h3 class="accordion-link js-accordion-link">Media</h3>
			<div class="accordion-content js-accordion-content">
				<article class="article-content">
						<div class="article-content__media">
							<img src="/img/mock/july4.jpg" alt="" width="510" class="article-content__image" />
						</div>
					<h4 class="article-content__title">Title 4</h4>
					<p class="article-content__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo.</p>
					<a class="cta-primary pull-right" href="/">Learn more</a>
				</article>
			</div>
		</div>
	</section>
</div>