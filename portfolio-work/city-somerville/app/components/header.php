<?php 
	$alertPage = false;
	$alertId = 123456;
	include 'components/site-alert.php'; 
?>

<?php include 'components/share-bar.php' ?>
<header class="site-header">
	<div class="site-header__container">
		<div class="site-header__logo">
			<a href="/" title="City of Somerville">
				<img src="/img/CoS_logo.png" alt="City of Somerville" />
			</a>
		</div>
		<a class="site-header__skip-nav screen-reader-only" href="#after-navigation">skip navigation</a>
		<div class="site-header__search">
			<form action="search.php" method="GET">
				<input type="text" name="keyword" class="site-header__search--input" placeholder="Search">
				<button class="site-header__search--button"></button>
			</form>
		</div>
		<?php include 'components/global-navigation.php' ?>
		<a id="after-navigation"></a>
	</div>
</header>