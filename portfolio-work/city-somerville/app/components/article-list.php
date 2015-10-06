<?php
$month = "";
$day = "";
$src = $artListShowImage ? "/img/mock/july4.jpg" : "";
$groupTitle = $groupTitle ? $groupTitle : "";
$groupTitleSrc = $groupTitleSrc ? $groupTitleSrc : "";
$description = $description ? $description : "";
$articleListTitles = $articleListTitles ? $articleListTitles : ["Garbage Collection","Street Sweeping","Recycling","Road & Street Closures","Yard Waste Collection","Speed Bump Installation"];
?>

<?php 
	  $collapsableClass = "";
	  if(count($articleListTitles) > 6): ?>
		<?php $collapsableClass = "has-more js-has-more"; ?>
<?php endif; ?>

<div class="article-list component <?php echo $collapsableClass ?>">

	<?php if($groupTitle): ?>
		<h3 class="article-list__group-title">
			<?php if($groupTitleSrc): ?>
				<a href="<?php echo $groupTitleSrc ?>">
			<?php endif; ?>
				<?php echo $groupTitle ?>
			<?php if($groupTitleSrc): ?>
				</a>
			<?php endif; ?>
		</h3>
	<?php endif; ?>

	<ul class="article-list__items">
		<?php
		 foreach($articleListTitles as $value): ?>
			<li class="article-list__item">
				<?php 
					$title = $value;
					$description = $description;
					$href = "/department-detail.php";
					include 'modules/article-module.php';
				?>
			</li>
		<?php endforeach; ?>
	</ul>

	<?php if(count($articleListTitles) > 6): ?>
		<div class="button-row">
			<a href="" class="accordion-link button-link pull-right has-more--trigger js-has-more--trigger">
				<span class="accordion-link__more">View More</span>
				<span class="accordion-link__less">View Less</span>
			</a>
		</div>
	<?php endif; ?>
</div>
