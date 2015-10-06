<?php
    $tokens = explode(" ", $tokens);
?>
<div class="breadcrumbs breadcrumbs--<?php echo $location ?> component">
    <div class="breadcrumbs__items">
		<span class="breadcrumbs__home breadcrumbs__item">
			<a href="/" title="Home">
				<span class="breadcrumbs__home-text">Home</span>
				<svg class="breadcrumbs__home-icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg-sprite.svg#home"></use>
				</svg>
			</a>
		</span>
		<?php foreach($tokens as $value): // need to add logic to remove the <a> tag from the last item ?> 
		<span class="breadcrumbs__item"><a href="#"><?php echo $value ?></a></span>
		<?php endforeach; ?>
    </div>
</div>
