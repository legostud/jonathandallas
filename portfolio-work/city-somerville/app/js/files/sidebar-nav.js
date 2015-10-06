module.exports = function(window, document, $, undefined){
	'use strict';
	
	var resizeTimeout,
		extraLargeBreakpoint = 1260,
		isNavOpen = false, // flag to indicate whether the sidebar nav is open
		sidebarTargetClass = 'global-nav',
		sidebarClass = 'sidebar-nav__open',
		subnavClass = 'global-nav__sub-nav',
		sidebarTrigger = 'js-global-nav-menu-link',
		primaryNavItem = 'global-nav__main-items',
		sidebarNavCloseClass = 'js-sidebar-nav-close',
		sidebarNavBack = 'js-sidebar-nav-back',
		subnavSelectedClass = 'subnav-selected',
		globalNavItem = 'global-nav__main-items-link';

	/**
	 * Open the sidebar navigation. Toggles appropriate classes.
	 * @return {[void]}
	 */
	function openPrimaryNav() {
		// add to body the sidebarClass
		$('body').addClass(sidebarClass);

		// add to target the sidebarClass
		$('.' + sidebarTargetClass).addClass(sidebarClass);

		// Add top level nav item to sub-nav list in order to navigate
		// to the top level item via click.
		$('.' + subnavClass).each(function() {
			// Create a new sub nav item with the link and text from the top level
			// nav item
			var $navClone = $(this).parent().clone().removeClass()
							.addClass('global-nav__sub-nav-items');

			// remove duplicate subnav, add and remove appropriate classes to
			// match other sub-nav items
			$navClone.children('.global-nav__sub-nav').remove();
			$navClone.children('.global-nav__main-items-link')
				.addClass('global-nav__sub-nav-link')
				.removeClass('global-nav__main-items-link');
			$(this).children('.global-nav__sub-nav-items:first-child').after($navClone);
		});

		isNavOpen = true;
	}

	/**
	 * Open the secondary nav item that corresponds to the clicked primary nav item
	 * @param  {[Object]} 	The primary nav element that has been clicked. Passed as 
	 * 						a jQuery object.
	 * @return {[void]}
	 */
	function openSecondaryNav($selected) {
		$selected.addClass(subnavSelectedClass);
	}

	/**
	 * Close the navigation when clicking the Menu icon,
	 * clicking the close icon, or when resizing the 
	 * window. This function toggles the appropriate classes.
	 * @return {[void]}
	 */
	function closeNav() {
		// remove from body the sidebarClass
		$('body').removeClass(sidebarClass);

		// remove from target the sidebarClass;
		$('.' + sidebarTargetClass).removeClass(sidebarClass);

		// remove secondary nav open classes
		$('.' + subnavClass).removeClass(subnavSelectedClass);

		// Remove the duplicate top level nav item
		$('.global-nav__sub-nav-items:nth-child(2)').remove();

		// set sidebar nav flag
		isNavOpen = false
	}

	/**
	 * Check if the navigation is open; if it is, close it.
	 * @return
	 */
	function windowResized() {
		if ((window.innerWidth >= extraLargeBreakpoint) && (isNavOpen == true)) {
			closeNav();
		}
	}

	function init() {
		$(function() {
			// set the XL Break point
			extraLargeBreakpoint = $('.breakpoint-xxl-min').width() - 1;

			if ($('.' + sidebarTrigger).length) {
				$('.' + sidebarTrigger).click(function(e) {
					e.preventDefault();

					if ($('.' + sidebarClass).length) {
						closeNav();
					} else {
						openPrimaryNav();
					}
				});
			}

			if ($('.' + sidebarNavCloseClass).length) {
				$('.' + sidebarNavCloseClass).click(function() {
					closeNav();
				});
			}

			if ($('.' + sidebarNavBack).length) {
				$('.' + sidebarNavBack).click(function() {
					$(this).parents('.' + subnavClass).removeClass(subnavSelectedClass);
				});
			}

			// Secondary Navigation opening controls
			if ($('.' + primaryNavItem).length) {
				// Add class to each primary nav item that has a subnav
				$('.' + subnavClass).each(function() {
					$(this).parents('.' + primaryNavItem).addClass('has-sub-nav');
				});
				
				// select the anchor tag so that you do not prevent default of
				// secondary nav items
				$('.' + primaryNavItem + ".has-sub-nav").children('a').click(function(e) {
					// only prevent the user from being navigated away if the  
					// sidebar navigation is being used
					if (window.innerWidth <= extraLargeBreakpoint) {
						e.preventDefault();
						openSecondaryNav($(this).siblings('.' + subnavClass));
					}
				});
			}

			$(window).resize(function() {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(function() {
					windowResized();
				}, 200);
			});
		});
	}

	return {
		init: init
	};

}(window, document, jQuery);
