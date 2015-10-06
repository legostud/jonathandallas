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
	renderRegionDetails : function(data) {
		var $details = $('#region-details').empty();

            $details.append('<h4 class="title">' + data.title + '</h4>');
            $details.append('<strong class="total-value">' + data.total + '</strong>');
            $details.append('<strong class="region-value">' + data.value + '</strong>');

	},
	renderRegionImages : function() {
		var $image = $('#region-image').empty(),
			$template = $('<ul>');
			
		$.each(self.states, function(index, state) {
			$template.append('<li><div><img src="images/regions/' + state + '.png" alt="' + self.results[state][0].state + '"></div></li>');
		});
		
		$template.appendTo($image);
	},

    initialize: function () {
      var $selector = self.RegionSelector.$el.find('.input'),
      data = [];
	  
		$.each(self.states,function(index,state){
			var value_text = state=="national"?"the US":self.results[state][0].state;
			data.push({
				"id": index + 1,
				"region": self.results[state][0].state,
				"num_reports": self.results[state].length,
				"title": state=="national"?"National Reports":"Public Health Care Quality Reports",
				"total": self.num_results + " Total",
				"value": "<span>" + self.results[state].length + "</span> in " + value_text,
				"image": "images/regions/" + state + ".png"
			});
		});

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
	  
	  // create all of the map graphics
	  self.RegionSelector.renderRegionImages();
	  
	  // create the default region text
	  self.RegionSelector.renderRegionDetails(data[0]);
	  
		// update current Reports table
		self.ReportsTable.changeCurrent(self.states[0]);

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
	  
	  // load reports table data
	  self.ReportsTable.loadReportTable();	  
    },
	loadReportTable: function(){
		self.results = {};
		self.states = [];
		
		$.ajax({
            type: "GET",
            url: "xml/national-directory.xml",
            cache: false,
            dataType: "xml",
            success: function(xml) {
				var national = false,
					region,
					index,
					state,organization,reportType,outboundURL,description; // values in XML
				
				self.num_results = $(xml).find('entry').length;
				
				$(xml).find('entry').each(function(){
					state = $(this).find('state').text();
					organization = $(this).find('organization').text();
					reportType = $(this).find('reportType').text();
					outboundURL = $(this).find('outboundURL').text();
					description = $(this).find('description').text();
					
					index = state.trim().replace(" ","-").toLowerCase();

					if(typeof(self.results[index]) === "undefined"){
						self.results[index] = [];
					}
					
					self.results[index].push({index:index,state:state,organization:organization,reportType:reportType,outboundURL:outboundURL,description:description});
				});
				self.ReportsTable.renderHtml(self.results);
				
				// create an arrary of states so we can sort them
				for (var state in self.results){
					if(state === "national"){
						national = true;
					} else {
						self.states.push(state);
					}
				}
				self.states.sort();

				if(national){
					self.states.unshift("national");
				}
				
				self.RegionSelector.initialize()
			}
        });
	},
	renderHtml: function(data){
		var expandable, template, $template, expandableClass;
		
		for (var state in data){
			var obj = data[state];
			$template = $('<tbody data-region="' + state + '"></tbody>');
			
			$.each(obj,function(index,data){

				if(data.description.length){
					expandable = true;
					expandableClass = "expandable-toggle"; 
				} else {
					expandable = false;
					expandableClass = '';
				}
				template = ([
					'<tr>',
						'<td>',
							'<div class="' + expandableClass + '">',
								'<span class="icon"></span>',
								'<strong>' + data.organization + '</strong>',
							'</div>',
						'</td>',
						'<td class="col-small">',
							'<strong class="reports-content-label">Type: </strong>'	+ data.reportType,
						'</td>',
						'<td class="col-xsmall">',
							'<strong class="reports-content-label">State: </strong>' + data.state,
						'</td>',
						'<td class="col-small reports-view-col">',
							'<a href="' + data.outboundURL + '" target="_blank">View Report</a>',
						'</td>',
					'</tr>',
					'<tr class="expandable-content">',
						'<td colspan="4">',
							'<p>' + data.description + '</p>',
							'<a href="' + data.outboundURL + '" target="_blank">View Report</a>',
						'</td>',
					'</tr>'
				]).join('\n');
				
				$template.append(template);
			});
			self.ReportsTable.$el.find('tfoot').before($template);
		}
	}
  };

  self.initialize = function () {
    self.ReportsTable.initialize();
    //self.RegionSelector.initialize();
  };

  return self;
})();

RWJF.ui.SignsOfProgress = (function ($) {

  var self = {},
  $el = $('.progress-container'),
  $toc = $el.find('.table-of-contents'),
  mapStuck = false,
  okScroll;

  self.FixedItems = function (headers, offset) {
    offset = offset || 0;

    this.load = function () {
      headers.each(function () {
        var $header = $(this);

        if ($('.map-article .header-wrapper').length > 0) {
          $thisHeader = $header.wrap('<div class="header-wrapper" />');
          $thisHeader.parent().height($thisHeader.outerHeight());
          $.data($thisHeader[0], 'top', $thisHeader.offset().top);
        }
      });

    };

    this.scroll = function () {
      if (mapStuck) {
        headers.each(function (i){
          var $thisHeader = $(this),
          $nextHeader = headers.eq(i + 1),
          $prevHeader = headers.eq(i - 1),
          pos = $.data($thisHeader[0], 'top'),
          maps = $('#map-container .maps > li'),
          mapInfo = $('#map-container .map-info > ul > li'),
          articleID;

          if (pos <= $(window).scrollTop() + offset + 20) {
            $thisHeader.addClass('fixed');
            $toc.find('li').eq(i + 1).addClass('active');

            // Change Map
            maps.removeClass('current');
            articleID = $thisHeader.closest('.map-article').attr('id');

            maps.each( function () {
              var map = $(this);

              if (articleID == map.attr('data-title')) {
                console.log('the same!');
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
              $toc.find('li').eq(i + 1).removeClass('active');
            }

          } else {
            $thisHeader.removeClass('fixed');
            $toc.find('li').eq(i + 1).removeClass('active');

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
    $articles.css('margin-top', auto);
    $article.find('.article-header').removeAttr('style').removeClass('fixed');
    
    mapStuck = false;
  };

  self.desktopInitialize = function () {

    if (okScroll) {
      var $mapContainer = $el.find('#map-container'),
      $articles = $el.find('.map-articles'),
      $article = $articles.find('.map-article'),
      mapContainerTop = $mapContainer.offset().top,
      fixedHeaders = new self.FixedItems($('.article-header'), $mapContainer.outerHeight());
      fixedHeaders.load();

      $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop(),
        atTopOfSection = mapContainerTop <= scrollTop,
        atBottomOfSection = $articles.offset().top + $articles.outerHeight() <= scrollTop + $mapContainer.outerHeight() + 40;

        fixedHeaders.scroll();

        if (atTopOfSection && !atBottomOfSection) {
          mapStuck = true;
          $el.addClass('map-stuck');
          $articles.css('margin-top', $mapContainer.outerHeight() + 20);
        } 
        else {
          mapStuck = false;
          $el.removeClass('map-stuck');
          $articles.css('margin-top', 'auto');

          if (atBottomOfSection) {
            $article.find('.article-header').removeAttr('style');
          }
        }

      });
    }

    $('.anchor-link').on('click', function (e) {
      e.preventDefault();
      var href = $(this).attr('href');

      console.log('hi');

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
          scrollTop: $(href).offset().top - $mapContainer.outerHeight() - 20
        }, 300);
      }
    });

    $toc.find('.prev').find('span').on('click', function () {
      $toc.find('.active').prev('li').not('.prev, .next').find('a').trigger('click');
    });

    $toc.find('.next').find('span').on('click', function () {
      $toc.find('.active').next('li').not('.prev, .next').find('a').trigger('click');
    });
  };

  self.initialize = function () {

    if (Modernizr.mq('all and (min-width: 1025px)')) {
      self.desktopInitialize();
    }

    $(window).resize( function () {
      if (Modernizr.mq('all and (max-width: 1024px')) {
        okScroll = false;
        self.deviceInitialize();
      } else {
        okScroll = true;
        self.desktopInitialize();
      }
    });

  };

  return self;
})(jQuery);
