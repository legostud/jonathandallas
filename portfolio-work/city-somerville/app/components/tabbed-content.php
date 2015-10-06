<div class="tabbed-content component" ng-controller="TabCtrl as tab" >
    <section>
    	<ul class="tabbed-content__tabs">
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(1)}" ng-click="tab.selectTab(1)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#gear"></use></svg>
				<h3>Services</h3>
			</li>
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(2)}" ng-click="tab.selectTab(2)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#note"></use></svg>
				<h3>Forms</h3>
			</li>
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(3)}" ng-click="tab.selectTab(3)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#help"></use></svg>
				<h3>Some long content</h3>
			</li>
			<li class="tabbed-content__tab" ng-class="{active:tab.isSelected(4)}" ng-click="tab.selectTab(4)">
				<svg class="tabbed-content__tab-icon"><use xlink:href="/img/svg-sprite.svg#video-play"></use></svg>
				<h3>Media</h3>
			</li>
		</ul>
	</section>

	<section class="tabbed-content__panels">
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(1)">
			<h3 class="accordion-link js-accordion-link">Services</h3>
			<div class="accordion-content js-accordion-content">
				<?php 
					$articleListTitles = ["Garbage Collection","Street Sweeping","Recycling","Road & Street Closures","Yard Waste Collection","Speed Bump Installation"];
					$description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.  A maxime, illo molestiae labore harum saepe quod laudantium iste natus ducimus ipsum voluptate, enim nihil impedit quae suscipit est hic fuga."; 
					@include "components/article-list.php";
				?>
				<?php 
					$message = "View All Services";
					$url = "#/services.php";
					include "modules/read-more.php";
				?>
			</div>
		</div>
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(2)">
			<h3 class="accordion-link js-accordion-link">Forms</h3>
			<div class="accordion-content js-accordion-content">
				<?php 
					$articleListTitles = ["Garbage Collection2","Street Sweeping","Recycling","Road & Street Closures","Yard Waste Collection","Speed Bump Installation"];
					$description = "Lorem ipsum dolor sit enim nihil impedit quae suscipit est hic fuga.";
					@include "components/article-list.php";
				?>
				<?php 
					$message = "View All Forms";
					$url = "#/forms.php";
					include "modules/read-more.php";
				?>
			</div>
		</div>
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(3)">
			<h3 class="accordion-link js-accordion-link">FAQs</h3>
			<div class="accordion-content js-accordion-content">
				<?php 
					$articleListTitles = ["Garbage Collection3","Street Sweeping","Recycling","Road & Street Closures","Yard Waste Collection","Speed Bump Installation"];
					$description = "Lorem ipsum dolor sit amet illo molestiae labore harum saepe quod laudantium iste natus ducimus ipsum voluptate, enim nihil impedit quae suscipit est hic fuga."; 
					@include "components/article-list.php";
				?>
				<?php 
					$message = "View All FAQs";
					$url = "#/FAQ.php";
					include "modules/read-more.php";
				?>
			</div>
		</div>
		<div class="tabbed-content__panel js-accordion-module" ng-show="tab.isSelected(4)">
			<h3 class="accordion-link js-accordion-link">Media</h3>
			<div class="accordion-content js-accordion-content">
			<?php 
				$articleListTitles = ["Garbage Collection4","Street Sweeping","Recycling","Road & Street Closures","Yard Waste Collection","Speed Bump Installation"];
				$description = "A maxime, illo molestiae labore harum saepe quod laudantium iste natus ducimus ipsum voluptate, enim nihil impedit quae suscipit est hic fuga.";
				@include "components/article-list.php";
			?>
			<?php 
				$message = "View All Media";
				$url = "#/media.php";
				include "modules/read-more.php";
			?>
			</div>
		</div>
	</section>
</div>