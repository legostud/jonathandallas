<?php
    $spotlightTitle = isset($spotlightTitle) ? $spotlightTitle : "Welcome To Somerville";
?>

<h2 class="spotlight__title"><?php echo $spotlightTitle ?></h2>
<article class="spotlight component">
	<div class="spotlight__media">
		<div class="video-wrapper">
			<iframe width="400" height="300" src="https://www.youtube.com/embed/_dwcXIFpswo" frameborder="0" allowfullscreen></iframe>
		</div>
	</div>
	<div class="spotlight__description">
		<?php if($spotlightDescriptionTitle): ?>
			<h3 class="spotlight__description-header"><?php echo $spotlightDescriptionTitle ?></h3>
		<?php endif; ?>

		<?php if($spotlightDescription): ?>
			<?php echo $spotlightDescription ?>
		<?php endif; ?>
		<?php if($buttonText): ?>
			<a class="button-primary" href="#"><?php echo $buttonText ?></a>
		<?php endif; ?>
	</div>
</article>