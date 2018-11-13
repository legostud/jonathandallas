RWJF.ui.SignsOfProgress = (function ($) {
  'use strict';

  var self = {},
  $el = $('.progress-container'),
  $toc = $el.find('.table-of-contents'),
  mapStuck = false;

  self.FixedItems = function (headers, offset) {
    offset = offset || 0;

    this.load = function () {
      headers.each(function () {
        var $header = $(this),
        $thisHeader;

        if (!$header.is('.header-wrapper .article-header')) {
          $thisHeader = $header.wrap('<div class="header-wrapper" />');
          $thisHeader.parent().height($thisHeader.outerHeight());
          $.data($thisHeader[0], 'top', $thisHeader.offset().top);
        }

      });

    };

    this.scroll = function () {
      if (mapStuck) {
        headers.each(function (i) {
          var $thisHeader = $(this),
          $nextHeader = headers.eq(i + 1),
          $prevHeader = headers.eq(i - 1),
          pos = $.data($thisHeader[0], 'top'),
          maps = $('#map-container .maps > li'),
          mapInfo = $('#map-container .map-info > ul > li'),
          articleID;

          if (pos <= $(window).scrollTop() + offset) {
            $thisHeader.addClass('fixed');
            $toc.find('li').removeClass('active');
            $toc.find('li').eq(i).addClass('active');

            // Change Map
            maps.removeClass('current');
            articleID = $thisHeader.closest('.map-article').attr('id');

            maps.each( function () {
              var map = $(this);

              if (articleID == map.attr('data-title')) {
                map.addClass('current');
              }
            });

            // Change Map Text
            mapInfo.removeClass('current');

            mapInfo.each( function() {
              var info = $(this);

              if (articleID == info.attr('data-title')) {
                info.addClass('current');
              }
            });

            if ($nextHeader.length > 0 && $thisHeader.offset().top >= $.data($nextHeader[0], 'top') - $thisHeader.outerHeight()) {
              $thisHeader.addClass('absolute').css('top', $.data($nextHeader[0], 'top') - $thisHeader.outerHeight());
              $toc.find('li').eq(i).removeClass('active');
            }

          } else {
            $thisHeader.removeClass('fixed');
            $toc.find('li').eq(i).removeClass('active');

            if ($prevHeader.length > 0 && $(window).scrollTop() + offset <= $.data($thisHeader[0], 'top') - $prevHeader.outerHeight()) {
              $prevHeader.removeClass('absolute').removeAttr('style');
            }
          }
        });
      }
    };
  };

  self.deviceInitialize = function () {
    var $articles = $el.find('.map-articles'),
    $article = $articles.find('.map-article');

    $el.removeClass('map-stuck');
    $articles.css('margin-top', 'auto');
    $article.find('.article-header').removeAttr('style').removeClass('fixed');

    $('.header-wrapper').removeAttr('style');

    mapStuck = false;
    $(window).off('scroll');
  };

  self.desktopInitialize = function () {

    var $mapContainer = $el.find('#map-container'),
    $articles = $el.find('.map-articles'),
    $article = $articles.find('.map-article'),
    mapContainerTop = $mapContainer.offset().top,
    fixedHeaders = new self.FixedItems($('.article-header'), $mapContainer.outerHeight());

    fixedHeaders.load();

    $(window).on('scroll', function () {
      var scrollTop = $(window).scrollTop(),
      atTopOfSection = mapContainerTop <= scrollTop,
      atBottomOfSection = $articles.offset().top + $articles.outerHeight() <= scrollTop + $mapContainer.outerHeight() + 120;

      fixedHeaders.scroll();

      if (atTopOfSection && !atBottomOfSection) {
        mapStuck = true;
        $el.addClass('map-stuck');
        $articles.css('margin-top', $mapContainer.outerHeight());
      } else {
        mapStuck = false;
        $el.removeClass('map-stuck');
        $articles.css('margin-top', 'auto');

        if (atBottomOfSection) {
          $article.find('.article-header').removeAttr('style');
        }
      }

    });

    $('.progress-scroll-down .intro').on('click', function (e) {
      e.preventDefault();
      var href = $('.anchor-link').attr('href');

      if (href.length > 1) {
        $('html, body').animate({
          scrollTop: $(href).offset().top
        }, 300);
      }
    });

    $toc.find('.header-link').on('click', function (e) {
      e.preventDefault();
      var href = $(this).attr('href');

      if (href.length > 1) {
        $('html, body').animate({
          scrollTop: $(href).offset().top - $mapContainer.outerHeight() + 1
        }, 300);
      }
    });

    $toc.find('.prev').off('click').on('click', function (e) {
      e.preventDefault();
      $toc.find('.active').prev('li').find('a').trigger('click');
    });

    $toc.find('.next').off('click').on('click', function (e) {
      e.preventDefault();
      $toc.find('.active').next('li').find('a').trigger('click');
    });
  };

  self.initialize = function () {
    if (Modernizr.mq('all and (min-width: 1025px)')) {
      self.desktopInitialize();
    }

    $(window).on('resize', function () {
      if (Modernizr.mq('all and (max-width: 1024px')) {
        mapStuck = false;
        self.deviceInitialize();
      } else {
        mapStuck = true;
        self.desktopInitialize();
      }
    });
  };

  return self;
})(jQuery);
