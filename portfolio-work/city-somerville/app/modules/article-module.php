<?php $event = isset($event) ? $event : false; ?>
<article class="article-content">
	<?php if( ($month && $day) || $src): ?>
		<div class="article-content__media">
			<?php // image has to be at least 510px wide to work on mobile.
				if($src): ?>
				<img src="<?php echo $src ?>" alt="" width="510" class="article-content__image" /><?php endif; ?>
			<?php if($month && $day): ?>
				<div class="article-content__date">
					<?php include 'modules/date-display.php'; ?>
				</div>
			<?php endif; ?>
		</div>
	<?php endif; ?>
	<h3 class="article-content__title">
		<?php if($href){ ?>
			<a class="cta-secondary" href="<?php echo $href ?>"><?php echo $title ?></a>
		<?php } else { 
				echo $title; 
			} 
		?>
	</h3>
	<?php if($event): ?>
		<p class="article-content__event-time"><?php echo $eventInfo ?></p>
	<?php endif; ?>
	<?php if($description): ?>
		<p class="article-content__description"><?php echo $description ?></p>
	<?php endif; ?>
</article>
