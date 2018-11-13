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
