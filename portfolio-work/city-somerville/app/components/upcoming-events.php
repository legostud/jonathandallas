<?php 
	$src = ""; 
	$eventsShowImages = isset($eventsShowImages) ? true : false;
	$eventsCityResidents = isset($eventsCityResidents) ? true : false;
?>
<section class="upcoming-events component">
	<h2>Upcoming Events</h2>
	<div class="upcoming-events__articles">
		<div class="upcoming-events__article">
			<?php 
				$month = "MAY";
				$day = "7";
				$title = "4th of July Fireworks";
				$description = "Celebrate Independence Day with fireworks at Trum Field. (7/5 at 7 pm)";
				if($eventsShowImages){
					$src ="/img/mock/july4.jpg";
				}
				if($eventsCityResidents){
					include 'components/event_type.php';
				}
				$href = "/calendar-detail.php";
				include 'modules/article-module.php';
			?>
		</div>
		<div class="upcoming-events__article">
			<?php 
				$src = null;
				$month = "MAY";
				$day = "25";
				$title = "Planning Board";
				$description = "Public meeting to discuss permit requests. (6/9 at 6:30 pm)";
				$href = "/calendar-detail.php";
				include 'modules/article-module.php';
			?>
		</div>
		<div class="upcoming-events__article">
			<?php 
				$src = null;
				$month = "MAY";
				$day = "17";
				$title = "Ward 4 Spring ResiStat Meeting:";
				$description = "Neighborhood discussion with the Mayor and other elected officials";
				$href = "/calendar-detail.php";
				include 'modules/article-module.php';
			?>
		</div>
	</div>
	<?php 
		$message = "View all Events";
		include '/modules/read-more.php'; 
	?>
</section>