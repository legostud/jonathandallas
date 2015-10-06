<style>
	.hp-site-search {
		background-image:url('img/castle-small.png');
	}
	@media screen and (min-width: 691px){
		.hp-site-search {
			background-image:url('img/castle-large.png'), url('img/castle-small.png');
		}
	}

</style>

<section class="hp-site-search page-banner js-hp-site-search component">
	<div class="page-banner__inner">
		<div class="hp-site-search__content-area page-banner__content-area">
			<div class="hp-site-search__content">
				<h1 class="hp-site-search__title">What can we help you find?</h1>
				<form action="search.php" method="GET">
					<input type="text" name="keyword" class="hp-site-search__input" placeholder="Search" />
					<button class="hp-site-search__button go-button">GO</button>
					<div class="hp-site-search__select-wrapper">
					<span class="searchIn">Search in:</span>
						<select name="domain" class="hp-site-search__select js-custom-select screen-reader-only">
							<option value="City of Somerville">SomervilleMA.gov</option>
							<option value="ParkSomerville">ParkSomerville</option>
							<option value="Domain Name">Domain Name</option>
						</select>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>