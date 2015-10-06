<?php
    $relatedItems = isset($relatedItems) ? $relatedItems : ['Trash & Recycling Schedule','Disposal & Recycling Procedures','Trash Brochure','Dog Feces'];
    $relatedTitle = isset($relatedTitle) ? $relatedTitle : "Top Searches";
?>
<section class="related-links component">
    <h3 class="related-links__header"><?php echo $relatedTitle ?></h3>
    <ul class="related-links__items">
        <?php foreach($relatedItems as $value): ?>
        <li class="related-links__item"><a href="#"><?php echo $value ?></a></li>
        <?php endforeach; ?>
    </ul>
</section>