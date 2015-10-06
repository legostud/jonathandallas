<?php 
	$programShowThree = $programShowThree ? $programShowThree : false; 
?>
<section class="component programs">
	<h2>Programs &amp; Initiatives</h2>
	<div class="programs__articles">
		<div class="programs__article">
			<?php 
				$month = "";
				$day = "";
				$title = "Small Business Assistance Program";
				$description = "This program provides technical assistance and implementation support for businesses trying to improve their customer experience.";
				$src ="/img/mock/small_biz.jpg";
				$href = "#/programs.php";
				include 'modules/article-module.php';
			?>
		</div>
		<div class="programs__article">
			<?php 
				$month = "";
				$day = "";
				$title = "Culinary Entrepreneurship Program";
				$description = "An 8-week workshop and mentoring program designed to educate and empower immigrants interested in launching a career in the culinary arts.";
				$src = "/img/mock/culinary.jpg";
				$href = "#/program.php";
				include 'modules/article-module.php';
			?>
		</div>
		<?php if($programShowThree): ?>
			<div class="programs__article">
				<?php 
					$month = "";
					$day = "";
					$title = "Culinary Entrepreneurship Program3";
					$description = "An 18-week workshop designed to educate and empower immigrants interested in launching a career in the culinary arts.";
					$src = "/img/mock/culinary.jpg";
					$href = "#/program.php";
					include 'modules/article-module.php';
				?>
			</div>
		<?php endif; ?>
	</div>
	<?php 
		$message = "View All City Program &amp; Initiatives";
		include '/modules/read-more.php'; 
	?>
</section>