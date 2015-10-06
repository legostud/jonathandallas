
module.exports = function (window,document,$,undefined) {
	'use strict';

	var debug = false;

	function showHideMore() {
		var classes = {
			parent  : "js-has-more",
			trigger : "js-has-more--trigger",
			active  : "show-all is-expanded",
			fadeIn  : "fade-in"
		};

		if(debug) {
			console.log("The 'showHideMore()' function has been called.");
		}

		if ($('.' + classes.parent)) {
			$('.' + classes.parent).on('click', '.' + classes.trigger, function(event) {
				event.preventDefault();
				var $parent = $(this).parents('.' + classes.parent);
				
				if ($parent.hasClass(classes.active)) {
					// 'more' is already showing, so fade out and hide
					$parent.toggleClass(classes.fadeIn);

					setTimeout(function() {
						// Wait for the fade (css), then hide the items
						$parent.toggleClass(classes.active);
					}, 300);
				} else {
					// time to show more things!
					$parent.toggleClass(classes.active);

					setTimeout(function() {
						$parent.toggleClass(classes.fadeIn);
					}, 100);
				}
			});
		}
	} // functionShowHideMore

    function init() {
    	// Call whatever you want to run at page load, here
    	if(debug) {
			console.log('Greetings, from show-hide.js!');
		}

		showHideMore();

    } // function init()

    return {
    	init: init
    };
}(window,document,jQuery);
