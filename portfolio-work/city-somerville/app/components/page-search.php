<section class="page-search component">
	<h4><?php echo $psTitle ?></h4>
	<form action="search.php" method="GET">
		<input name="filter" type="hidden" value="<?php echo $psFilter ?>" />
		<label class="page-search__input-wrapper">
			<input name="keyword" type="text" class="page-search__input">
			<svg class="page-search__icon"><use xlink:href="/img/svg-sprite.svg#magnifier"></use></svg>
		</label>
		<button class="page-search__button go-button">GO</button>
	</form>
</section>
