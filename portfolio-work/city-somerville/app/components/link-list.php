<?php
$month = "";
$day = "";
$src = isset($artListShowImage) ? "/img/mock/july4.jpg" : "";
$groupTitle = isset($groupTitle) ? $groupTitle : "";
$groupTitleSrc = isset($groupTitleSrc) ? $groupTitleSrc : "";
$description = isset($description) ? $description : "";
$articleListTitles = isset($articleListTitles) ? $articleListTitles : ["Garbage Collection","Street Sweeping","Recycling","Road & Street Closures","Yard Waste Collection","Speed Bump Installation"];
?>

<?php 
	  $collapsableClass = "";
	  if(count($articleListTitles) > 6): ?>
		<?php $collapsableClass = "has-more js-has-more"; ?>
<?php endif; ?>

<div class="link-list component <?php echo $collapsableClass ?>">

	<?php if($groupTitle): ?>
		<?php if($groupTitleSrc){ ?>
			<h3 class="link-list__group-title link-list__group-title--with-link">
				<span class="link-list__group-title-text">
					<a href="#"><?php echo $groupTitle ?></a>
				</span>
				<span class="link-list__group-link">
					<a class="cta-secondary" href="<?php echo $groupTitleSrc ?>">
						<?php if($groupTitleSrcText){ ?>
							<?php echo $groupTitleSrcText ?>
						<?php } else { ?>
							View Service
						<?php } ?>
					</a>
				</span>
			</h3>
		<?php } else { ?>
			<h3 class="link-list__group-title">
				<a href="#" class="link-list__group-title-text"><?php echo $groupTitle ?></a>
			</h3>
		<?php } ?>
	<?php endif; ?>

	<ul class="link-list__items">
		<?php
		 foreach($articleListTitles as $value): ?>
			<li class="link-list__item">
				<h3>
					<a class="cta-secondary" href="/department-detail.php"><?php echo $value ?></a>
				</h3>
			</li>
		<?php endforeach; ?>
	</ul>

	<?php if(count($articleListTitles) > 6): ?>
		<div class="button-row">
			<a href="#" class="accordion-link button-link pull-right has-more--trigger js-has-more--trigger">
				<span class="accordion-link__more">View More</span>
				<span class="accordion-link__less">View Less</span>
			</a>
		</div>
	<?php endif; ?>
</div>
