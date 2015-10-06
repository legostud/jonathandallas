(function($){
"use strict";
/* Mobile Detect */
var isMobile = {
		Android: function() {
				return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
};

/* Home Image Height */
var vesaFullImage = function(){};
/* **
		var winHeight = $(window).height();
		$("#home").css({height:winHeight});
		var winHeightTm = $(window).height()-45;
		$(".menu-bottom").css({height:winHeightTm});  

		var boxHeight = $('.js-home-text').height();

		$('.js-home-text').css('margin-top', ((winHeight)/2) - boxHeight + 75);
} ** */

/* Smooth scroll for anchor links */
var vesaScrollForAnchor = function(){
$('.smooth').bind('click.smoothscroll',function (e) {
		e.preventDefault();
		var target = this.hash,
		$target = $(target);
		$('html, body').stop().animate({
				'scrollTop': $target.offset().top
		}, {
			duration: 1000,
			easing: 'swing',
			complete: function(){
				window.location.hash = target;
			}
		});
});
}

/* Navigation */
var vesaNavigation = function(){
		$('#nav').onePageNav({
			filter: ':not(.external)',
			scrollSpeed: 600,
			scrollOffset: 1,
			changeHash: true
		});
}

/* Portfolio Sections */
var portfoliosect = function(){
var $port = jQuery.noConflict();
var container = $port('.portfolio-box'); 
var filter = $port('.portfolio-filters'); 
container.isotope({
		itemSelector : '.item'
});

$port(window).unbind('.infscr'); 
$port(".load-more-portfolio a").click(function(){
		$port('.portfolio-box').infinitescroll('retrieve');
		$port('.load-more-portfolio').show();
		return false;
});
filter.find('a').click(function() {
		var selector = $port(this).attr('data-filter');
		filter.find('a').removeClass('active');
		$port(this).addClass('active');
		container.isotope({ 
				filter: selector,
				animationOptions:{
					animationDuration: 400,
					queue: false
				}
		});
		return false;
});
function colType() { 
	var winWidthfP = $(window).width(), 
	colNumber = 1;
	if (winWidthfP > 745) {
		colNumber = 3;
	} else if (winWidthfP > 500) {
		colNumber = 2;
	} else {
		colNumber = 1;
	} 
	return colNumber;
}
function newCols() { 
	var winWidthfP = $(window).width(), 
	colNumber = colType(), 
	itemWdt = Math.floor(winWidthfP / colNumber);

	container.find('.item').each(function () { 
		$(this).css( { 
			width : itemWdt + 'px' 
		});
	});
}

$port(window).bind('resize', function () { 
	newCols();
	container.isotope('reLayout');     
});

container.imagesLoaded(function () { 
	newCols();
	container.isotope('reLayout');
});
}

/* Portfolio Items */
var portfolioitem = function(){
var $pitem = jQuery.noConflict(); 
jQuery('.portfolio-details').click(function(){
		var portfolioItemUrl = jQuery(this).attr("href")+"?"+(new Date()).getTime(); 
		jQuery('html, body').animate({ scrollTop: jQuery(".portfolio-top").offset().top - 50},400);
		jQuery('.portfolio-loading').css({ "display": "block", "opacity": "0"}).animate({"opacity": "0.6"},300);
		jQuery('#portfolio-details-box').animate({opacity:0}, 400,function(){
			$pitem("#portfolio-details-box").load(portfolioItemUrl,function(){
				jQuery('.flexslider').flexslider({animation: "fade",controlNav:false});
				jQuery(".container").fitVids();
			});
			jQuery('#portfolio-details-box').animate({opacity:1},400);
		});
		jQuery('.portfolio-wrapper').slideUp(400, function(){
			jQuery('.portfolio-loading').delay(800).animate({ "opacity": "0" }, 100,function(){
				jQuery('.portfolio-loading').css("display","none");
			});
			jQuery('#portfolio-details-box').css('visibility', 'visible');}).delay(800).slideDown(400,function(){
				jQuery('#portfolio-details-box').animate({opacity:1}, 400);
			});

		return false;


});

jQuery('#portfolio-next').click(function(){
		var portfolioItemNextUrl = jQuery(".projectNextUrl").attr("href")+"?"+(new Date()).getTime();
		jQuery('#portfolio-details-box').animate({opacity:0}, 400,function(){
			jQuery("#portfolio-details-box").load(portfolioItemNextUrl,function(){
				jQuery('.flexslider').flexslider({animation: "fade",controlNav:false});
				jQuery(".container").fitVids();
			});
			jQuery('#portfolio-details-box').animate({opacity:1},400);
		});
	return false;
});

jQuery('#portfolio-prev').click(function(){
		var portfolioItemPrevUrl = jQuery(".projectPrevUrl").attr("href")+"?"+(new Date()).getTime();
		jQuery('#portfolio-details-box').animate({opacity:0}, 400,function(){
			jQuery("#portfolio-details-box").load(portfolioItemPrevUrl,function(){
				jQuery('.flexslider').flexslider({animation: "fade",controlNav:false});
				jQuery(".container").fitVids();
			});
			jQuery('#portfolio-details-box').animate({opacity:1},400);
		});
		return false;
});

jQuery('#portfolio-close').click(function(){
	jQuery('.portfolio-wrapper').slideUp(400, function(){
			jQuery('#portfolio-details-box').empty();
	});
	return false;
});
}

/* Animations */
var vesaAnimations = function(){
	$(window).scroll(function() {
		$(".animated-area").each(function() {
			if($(window).height() + $(window).scrollTop() - $(this).offset().top > 0) {
				$(this).trigger("animate-it");
			}
		});
	});
	$(".animated-area").on("animate-it", function() {
		var cf = $(this);
		cf.find(".animated").each(function() {
			$(this).css("-webkit-animation-duration","0.6s");
			$(this).css("-moz-animation-duration","0.6s");
			$(this).css("-ms-animation-duration","0.6s");
			$(this).css("animation-duration","0.6s");
			$(this).css("-webkit-animation-delay",$(this).attr("data-animation-delay"));
			$(this).css("-moz-animation-delay",$(this).attr("data-animation-delay"));
			$(this).css("-ms-animation-delay",$(this).attr("data-animation-delay"));
			$(this).css("animation-delay",$(this).attr("data-animation-delay"));
			$(this).addClass($(this).attr("data-animation"));
		});

		cf.find(".animated-numbers").each(function() {
			var targetnumber = $(this).attr("data-target-number");
			$(this).animateNumbers(targetnumber, true, 3000);
		});

		cf.find(".animated-skills").each(function() {
			$(this).css("width",$(this).attr("data-skills-width"));
		});
	});
}

/* Ajax Contact Form */
// var vesaContactForm = function(){
// $(function(){
// $('#ajax-contact-form').submit(function(e){
// e.preventDefault();
//   jQuery.ajax({
//   type: 'POST',
//   url: 'mail.php',
//   data: $('#ajax-contact-form').serialize(),
//   error:function(){ $('.contact-form').html("Error!"); }, //Hata veri
//   success: function(veri) { $('.contact-form').html(veri);} //Başarılı 
//   });
// });
// });
// }

/* Tabs & Sliders */
var vesaTabsSliders = function(){
$('.flexslider').flexslider({
		animation: "slide"
});

$('.customer-comment-slider, .about-slider').flexslider({
		directionNav: false,
});

$('.panel-vesa').click(function(){
	$('.panel-vesa').removeClass('active-panel');  
	$('.panel-vesa').find('.plus-box').html('+');    
	$(this).addClass('active');
	$(this).find('.plus-box').html('-');
});

$('.tabbed-area a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	$('.tabbed-area').find('.active').removeClass('active');
	$(this).parent().addClass('active');
});

$('.team-tabbed-area a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	$('.team-tabbed-area').find('.team-tab-active').removeClass('team-tab-active');
	$('.team-tabbed-area').find('.tab-bullet-active').removeClass('tab-bullet-active');
	$(this).parent().addClass('team-tab-active');
	$(this).find('.tab-bullet').addClass('tab-bullet-active');
});

$('.mobile-team-tab a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
	$('.mobile-team-tab').find('.team-tab-active').removeClass('team-tab-active');
	$(this).parent().addClass('team-tab-active');
});

$('.has-tooltip').tooltip();
$('.tooltip-ptfl').hover(function(){
		$('.tooltip').css('top',parseInt($(this).next('.tooltip').css('top')) - 7 + 'px');
},function(){
		$('.tooltip').css('top',parseInt($(this).next('.tooltip').css('top')) - 0 + 'px');
});
}

	/* Menus */
	var vesaMenus = function(){

		$("#nav").append("<li class='menu-underline'></li>");
		var positiono = $('.current').position().left;
		var newWidtho = $('.current').innerWidth();
		$(".menu-underline").stop().animate({
				left: positiono,
				width: newWidtho
		});

		$("#nav li a").hover(function(){
				var position = $(this).position().left;
				var newWidth = $(this).parent().innerWidth();
				$(".menu-underline").stop().animate({
						left: position,
						width: newWidth
				});
				},function(){
				var orPos = $(".current").position().left;
				var orWi = $(".current").innerWidth();
				$(".menu-underline").stop().animate({
						left: orPos,
						width: orWi
				});    
		});

		$(window).scroll(function () {
			var orPos = $(".current").position().left;
			var orWi = $(".current").innerWidth();
			$(".menu-underline").stop().animate({
					left: orPos,
					width: orWi
			});
			var footer_block = $(window).scrollTop();
			if(footer_block>500){
				$('.footer').css('display','block');
			}else{
				$('.footer').css('display','none');
			}
			if($(window).scrollTop()<50){
				$('.scroll-fade-effect').fadeIn(1300);

			}else{
				$('.scroll-fade-effect').fadeOut(1300);
			}
		 
			var top_of_window = $(window).scrollTop();
			
			var homeText = $('#home div.js-home-box');
			if(top_of_window > 100) {
				if(!homeText.hasClass('faded')) {
					homeText.addClass('faded');
					homeText.fadeTo(1000, 0.01);
				}
			}
			else if(homeText.hasClass('faded')) {
				homeText.removeClass('faded');
				homeText.fadeTo(1000, 1);
			}
			
		});
	}

	function equalHeight(group) {
			var tallest = 0;
			group.each(function() {
					var thisHeight = $(this).height();                                      
					if(thisHeight > tallest) {
							tallest = thisHeight;
					}
			});
			group.height(tallest);
	}

	$(document).ready(function() {

		$(".container").fitVids();

		vesaNavigation();
		vesaScrollForAnchor();
		//vesaContactForm();
		vesaTabsSliders();
		vesaMenus();

	});
	$(window).load(function(){

		portfoliosect();
		portfolioitem();
		
		// remove ask toolbar
		if(document.getElementById("apn-null-toolbar") != null){
			 // mainMenu had a style change for its top positioning, returning it to normal
			 // perhaps a function can be made which iterates over every element ask has changed
			 document.getElementById("mainMenu").style.top = "-16px";
			 // Just remove the iframe and style elements
			(elem=document.getElementById("apn-null-toolbar")).parentNode.removeChild(elem);
			(elem=document.getElementById("apn-body-style")).parentNode.removeChild(elem);
		}
	});
})(jQuery);
// 2015 updates
// mobile menu
jQuery(function($){

	var closeMenu = function(e){
		e.preventDefault();
		$('body').removeClass('open-mobile-menu');
		$('body').off("click", closeMenu);
	};

	$('.js-mobile-menu').click(function(e){
		e.stopPropagation();

		if ($('body').hasClass('open-mobile-menu')){
			closeMenu(e);
		}
		else {
			$('body').addClass('open-mobile-menu');
			$('body').on("click", closeMenu);
		}
		
	});

}(jQuery));

// open video modal on click
jQuery(function($){
	$('.js-vs-play').click(function(){
		$('body').addClass('show-video');
	});
	$('.js-vs-pause').click(function(){
		$('body').removeClass('show-video');
	});
}(jQuery));

// auto play the video when opened
// froogaloop2 plugin => $f
var player = $f(document.getElementById('player'));
player.addEvent('ready', function() {

	jQuery('.js-vs-play').click(function(){
		player.api('play');
	});
	jQuery('.js-vs-pause').click(function(){
		player.api('pause');
	});
});


// toggle content
jQuery(function($){
	$('.js-toggle-content').each(function(){
		var $el = $(this),
			$buttons = $el.find('.js-toggle-button'),
			$panels = $el.find('.js-toggle-panel');

		$buttons.first().addClass('is-active');
		$panels.first().addClass('is-active');

		$buttons.on('click',function(){
			var $target = $(this);
			if($target.hasClass('is-active')){
				return;
			}

			$buttons.removeClass('is-active');
			$panels.removeClass('is-active');

			$target.addClass('is-active');
			$panels.eq($target.index()).addClass('is-active');
		});
	});

}(jQuery));