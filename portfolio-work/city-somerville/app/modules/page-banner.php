<?php $pageBannerLink = isset($pageBannerLink) ? $pageBannerLink : "View Event"; ?>
<section class="page-banner">
	<div class="page-banner__inner">
		<div class="page-banner__content-area">
			<div class="page-banner__content">
				<hr />
				<h1 class="page-banner__title"><?php echo $pageBannerTitle ?></h1>
				<div class="page-banner__details">
					<?php if(isset($pageBannerDescription)): ?>
						<p class="page-banner__description"><?php echo $pageBannerDescription ?></p>
					<?php endif; ?>
					<?php if(isset($pageBannerUrl)): ?>
						<a class="page-banner__link cta-primary cta-primary--banner" href="<?php echo $pageBannerUrl ?>"><?php echo $pageBannerLink ?></a>
					<?php endif; ?>
				</div>
				<hr />
			</div>
		</div>
	</div>
</section>