window.RWJF = window.RWJF || {};

RWJF.ui = {
  initialize: function () {
    'use strict';

    var controller = $('body').data('controller');

    if (controller.length) {
      RWJF.ui[controller].initialize();
    }
  }
};

(function ($) {
  $(function () {
    RWJF.ui.initialize();
  });
})(jQuery);

RWJF.ui.NationalDirectory = (function () {
  'use strict';

  var self = {};

  self.RegionSelector = {
    $el: $('#region-selector'),

    displayRegion: function (region) {
      var $details = $('#region-details').removeClass('show'),
      $image = $('#region-image');

      self.ReportsTable.changeCurrent(region.region.toLowerCase().replace(' ', '-'));

      $image.find('li').eq(region.id - 1).find('img').attr('src', region.image);
      $image.find('ul').animate({
        marginTop: -$image.find('ul').find('li').eq(region.id - 1).position().top
      }, 500);

      setTimeout(function () {
        $details.find('.title').html(region.title);
        $details.find('.total-value').html(region.total);
        $details.find('.region-value').html(region.value);
        $details.addClass('show');
      }, 500);
    },

    initialize: function () {
      var $selector = self.RegionSelector.$el.find('.input'),
      data = [
      {
        "id": 1,
        "region": "National",
        "num_reports": 2,
        "title": "National Reports",
        "total": "258 Total",
        "value": "<span>21</span> in the US",
        "image": "images/regions/usa.png"
      },
      {
        "id": 2,
        "region": "New York",
        "num_reports": 5,
        "title": "Public Health Care Quality Reports",
        "total": "130 Total",
        "value": "<span>28</span> in New York",
        "image": "images/regions/new-york.png"
      }
      ];

      $selector.select2({
        data: {
          results: data,
          text: function(item) {
            return item.region;
          }
        },
        formatResult: function (object, container, query) {
          return object.region + ' <span>' + object.num_reports + ' Reports</span>';
        },
        formatSelection: function (object, container, query) {
          return object.region;
        },
        maximumSelectionSize: 1,
        multiple: true,
        placeholder: 'Enter or select a region'
      }).on('select2-opening', function () {
        $selector.select2('data', null);
      }).on('change', function (event) {
        var obj = $(this).select2('data')[0];

        self.RegionSelector.displayRegion(obj);
      });

      $selector.select2('val', $selector.data('default'));
    }
  };

  self.ReportsTable = {
    $el: $('#reports-table'),

    changeCurrent: function (region) {
      var $table = self.ReportsTable.$el;

      $table.find('tbody.current').html($table.find('tbody[data-region="' + region + '"]').html());
      $table.trigger('update');
    },

    initialize: function () {
      self.ReportsTable.$el.tablesorter({
        cssChildRow: 'expandable-content',
        cssInfoBlock: 'tbody:not(.current)',
        headers: {
          3: {
            sorter: false
          }
        }
      });

      $('body').on('click', '.expandable-toggle', function () {
        var $row = $(this).closest('tr'),
        $expandableContent = $row.next('.expandable-content');
        $row.toggleClass('show');
      });

      $('.disclaimer-toggle').on('click', function (e) {
        e.preventDefault();

        $(this).closest('.disclaimer').toggleClass('show');
      });
    }
  };

  self.initialize = function () {
    self.RegionSelector.initialize();
    self.ReportsTable.initialize();
  };

  return self;
})();

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
