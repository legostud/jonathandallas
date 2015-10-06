
<!-- breakpoint markers -->
<div class="breakpoint-xxl-min">&nbsp;</div>
<div class="breakpoint-xl-min">&nbsp;</div>
<div class="breakpoint-l-min">&nbsp;</div>
<div class="breakpoint-m-min">&nbsp;</div>
<div class="breakpoint-s-min">&nbsp;</div>
<div class="breakpoint-xs-min">&nbsp;</div>

<script src="js/vendor-generated.js"></script>
<script src="js/angular/services/cosSearchService.js"></script>
<script src="js/angular/cosComponentApp.js"></script>
<script src="js/index.js"></script>

<script>
	<?php // TODO: change publisher to a shareThis account for Somerville ?>
	// ShareThis code loaded in a non-blocking manner
	var switchTo5x=true;
	$.ajax({
	    url: "http://w.sharethis.com/button/buttons.js",
	    jsonp: false,
	    dataType: "jsonp"
	}).done(function(data){
	    stLight.options({publisher: "cc493fcb-1a77-4b71-b964-2426674bb9cb", doNotHash: false, doNotCopy: false, hashAddressBar: false});
	});

</script>

<!-- TODO: Might have to recreate this widget just before launch as I entered a local domain as the website address -->

<script type="text/javascript">
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
    changeLanguageText();
}
function changeLanguageText() {
    var $el = $('.goog-te-menu-value span:first-child');
    if ($el.text() == "Select Language") {    
                    $($el).html('English');
                    $('#google_translate_element').fadeIn('slow');
    } else {
                    setTimeout(changeLanguageText, 10);
    }
}

</script><script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>