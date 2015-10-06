<?php // TODO: make sure all images and videos rendered are the same aspect ratio.  Sever Side cropping ?>

<section class="component media-gallery">
	<h2 class="heading-decorated">Photo &amp; Video Stream</h2>
	<ul class="media-gallery__items js-media-gallery-carousel">
		<li class="media-gallery__item"><img src="/img/mock/media1.jpg" alt="" class="media-gallery__image"></li>
		<li class="media-gallery__item"><img src="/img/mock/media2.jpg" alt="" class="media-gallery__image"></li>
		<li class="media-gallery__item"><img src="/img/mock/media3.jpg" alt="" class="media-gallery__image"></li>
		<li class="media-gallery__item">
			<div class="video-wrapper video-wrapper--four-three">
			<iframe width="400" height="300" src="https://www.youtube.com/embed/_dwcXIFpswo" frameborder="0" allowfullscreen></iframe>			</div>
		</li>	
		<li class="media-gallery__item"><img src="/img/mock/media4.jpg" alt="" class="media-gallery__image"></li>
		<li class="media-gallery__item"><img src="/img/mock/media5.jpg" alt="" class="media-gallery__image"></li>
	</ul>
	<div class="cta-primary-wrapper">
		<a class="cta-primary" target="_blank" href="#">View all Flickr Photos</a>
		<a class="cta-primary" target="_blank" href="#">View all YouTube Videos</a>
	</div>
</section>