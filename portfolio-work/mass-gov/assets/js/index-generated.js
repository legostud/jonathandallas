(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = (function (window, document, undefined) {
  "use strict";

  function setCookie(name, value, expires) {
    if (typeof expires === 'number') {
      var d = new Date();
      d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires + "; path=/";
    } else {
      document.cookie = name + "=" + value + "; path=/";
    }
  }

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  return {
    setCookie: setCookie,
    getCookie: getCookie
  };
})(window, document);

},{}],2:[function(require,module,exports){
// check the value of the css :before psuedo element
// values look for "true" or "false"

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function ($el) {
  var value = "true";
  try {
    value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
  } catch (err) {}
  return value === "false" ? false : true;
};

module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function (name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        jQuery.ajax({
            url: themePath + '/js/templates/' + name + '.html',
            success: function success(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async: false
        });
    }
    return Handlebars.templates[name];
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCssControlCodeJs = require("../helpers/cssControlCode.js");

var _helpersCssControlCodeJs2 = _interopRequireDefault(_helpersCssControlCodeJs);

exports['default'] = (function (window, document, $, undefined) {
  var $el = undefined,
      $elParent = undefined,
      elHeight = undefined,
      elWidth = undefined,
      lowerLimit = undefined,
      upperLimit = undefined,
      debounceTimer = undefined,
      runCode = false;

  function init(element) {
    $el = element;
    $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent();

    // default assumption as to where the screen will load
    $el.attr('data-sticky', 'top');

    updateData();

    // update variables one more time to catch any post page load changes
    window.setTimeout(function () {
      updateData();
    }, 1000);

    $(window).resize(function () {
      updateData();
      setPosition();
    });

    // toggle the sticky positioning
    $(window).scroll(function () {
      setPosition();
    });
  }

  function updateData() {
    var newRunCode = (0, _helpersCssControlCodeJs2['default'])($el);

    if (runCode && !newRunCode) {
      $el.removeAttr('style');
    }

    runCode = newRunCode;

    if (!runCode) {
      return;
    }

    runCode = newRunCode;
    elHeight = $el.height();
    elWidth = $elParent.width();
    upperLimit = $elParent.offset().top;
    lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

    $el.width(elWidth);
  }

  function setPosition() {
    if (!runCode) {
      $el.attr('data-sticky', 'top');
      return false;
    }

    var windowTop = $(window).scrollTop(),
        attr = $el.attr('data-sticky'),
        top = attr !== 'top' && windowTop <= upperLimit,
        middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
        bottom = attr !== 'bottom' && windowTop >= lowerLimit;

    if (top) {
      $el.attr('data-sticky', 'top');
    } else if (middle) {
      $el.attr('data-sticky', 'middle');
    } else if (bottom) {
      $el.attr('data-sticky', 'bottom');
    }
  }

  return { init: init };
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cssControlCode.js":2}],5:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _modulesAccordionsJs = require("./modules/accordions.js");

var _modulesAccordionsJs2 = _interopRequireDefault(_modulesAccordionsJs);

var _modulesGoogleMapJs = require("./modules/googleMap.js");

var _modulesGoogleMapJs2 = _interopRequireDefault(_modulesGoogleMapJs);

var _modulesBack2topJs = require("./modules/back2top.js");

var _modulesBack2topJs2 = _interopRequireDefault(_modulesBack2topJs);

var _modulesBannerCarouselJs = require("./modules/bannerCarousel.js");

var _modulesBannerCarouselJs2 = _interopRequireDefault(_modulesBannerCarouselJs);

var _modulesClickableJs = require("./modules/clickable.js");

var _modulesClickableJs2 = _interopRequireDefault(_modulesClickableJs);

var _modulesDropdownJs = require("./modules/dropdown.js");

var _modulesDropdownJs2 = _interopRequireDefault(_modulesDropdownJs);

var _modulesEmergencyAlertsJs = require("./modules/emergencyAlerts.js");

var _modulesEmergencyAlertsJs2 = _interopRequireDefault(_modulesEmergencyAlertsJs);

var _modulesFormValidationJs = require("./modules/formValidation.js");

var _modulesFormValidationJs2 = _interopRequireDefault(_modulesFormValidationJs);

var _modulesHideAlertJs = require("./modules/hideAlert.js");

var _modulesHideAlertJs2 = _interopRequireDefault(_modulesHideAlertJs);

var _modulesKeywordSearchJs = require("./modules/keywordSearch.js");

var _modulesKeywordSearchJs2 = _interopRequireDefault(_modulesKeywordSearchJs);

var _modulesLocationListingJs = require("./modules/locationListing.js");

var _modulesLocationListingJs2 = _interopRequireDefault(_modulesLocationListingJs);

var _modulesMainNavJs = require("./modules/mainNav.js");

var _modulesMainNavJs2 = _interopRequireDefault(_modulesMainNavJs);

var _modulesMainNavPilotJs = require("./modules/mainNavPilot.js");

var _modulesMainNavPilotJs2 = _interopRequireDefault(_modulesMainNavPilotJs);

var _modulesMobileNavJs = require("./modules/mobileNav.js");

var _modulesMobileNavJs2 = _interopRequireDefault(_modulesMobileNavJs);

var _modulesOrgSelectorJs = require("./modules/orgSelector.js");

var _modulesOrgSelectorJs2 = _interopRequireDefault(_modulesOrgSelectorJs);

var _modulesPikadayJs = require("./modules/pikaday.js");

var _modulesPikadayJs2 = _interopRequireDefault(_modulesPikadayJs);

var _modulesResponsiveVideoJs = require("./modules/responsiveVideo.js");

var _modulesResponsiveVideoJs2 = _interopRequireDefault(_modulesResponsiveVideoJs);

var _modulesRichTextJs = require("./modules/richText.js");

var _modulesRichTextJs2 = _interopRequireDefault(_modulesRichTextJs);

var _modulesScrollAnchorsJs = require("./modules/scrollAnchors.js");

var _modulesScrollAnchorsJs2 = _interopRequireDefault(_modulesScrollAnchorsJs);

var _modulesUtilNavJs = require("./modules/utilNav.js");

var _modulesUtilNavJs2 = _interopRequireDefault(_modulesUtilNavJs);

},{"./modules/accordions.js":6,"./modules/back2top.js":7,"./modules/bannerCarousel.js":8,"./modules/clickable.js":9,"./modules/dropdown.js":10,"./modules/emergencyAlerts.js":11,"./modules/formValidation.js":12,"./modules/googleMap.js":13,"./modules/hideAlert.js":14,"./modules/keywordSearch.js":15,"./modules/locationListing.js":16,"./modules/mainNav.js":17,"./modules/mainNavPilot.js":18,"./modules/mobileNav.js":19,"./modules/orgSelector.js":20,"./modules/pikaday.js":21,"./modules/responsiveVideo.js":22,"./modules/richText.js":23,"./modules/scrollAnchors.js":24,"./modules/utilNav.js":25}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCssControlCodeJs = require("../helpers/cssControlCode.js");

var _helpersCssControlCodeJs2 = _interopRequireDefault(_helpersCssControlCodeJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-accordion').each(function () {
    var $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        active = (0, _helpersCssControlCodeJs2['default'])($el),
        open = $el.hasClass('is-open');

    $el.attr('aria-expanded', open);

    if (open) {
      // setup the inline display block
      $content.stop(true, true).slideDown();
    }

    $link.on('click', function (e) {
      if (active) {
        e.preventDefault();
        open = $el.hasClass('is-open');
        if (open) {
          $content.stop(true, true).slideUp();
        } else {
          $content.stop(true, true).slideDown();
        }
        $el.attr('aria-expanded', !open).toggleClass('is-open');
      }
    });

    $(window).resize(function () {
      var temp = (0, _helpersCssControlCodeJs2['default'])($el);

      if (temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
        $el.attr('aria-expanded', 'false');
      }

      active = temp;
    }).resize();
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cssControlCode.js":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  var $footer = $('.js-footer'),
      visibleThreshold = 250,
      staticThreshold = 50;

  $(".js-back2top").each(function () {
    var $el = $(this);

    $el.on('click', function (e) {
      e.preventDefault();
      try {
        $("html, body").stop(true, true).animate({ scrollTop: 0 }, '750');
      } catch (e) {
        $('body').scrollTop(0);
      }
      // Bring keyboard focus back to top as well.
      $("#main-content").focus();
      return false;
    });

    $(window).on('scroll', function () {
      // if we've exceeded the threshold of scrolling
      // from the top, show control
      var scrollTop = $(window).scrollTop();

      if (scrollTop > visibleThreshold) {
        $el.removeClass('is-hidden');
      } else {
        $el.addClass('is-hidden');
      }
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-banner-carousel').each(function () {
    var $el = $(this);

    if ($el.children().length <= 1) {
      return;
    }

    var slider = $el.slick({
      dots: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  $('.js-clickable').each(function () {
    // if the this is clicked
    $(this).click(function (event) {
      event.preventDefault();

      var $el = $(this).find('.js-clickable-link').first();
      // find the destination
      var dest = $el.attr("href");
      // if the target attribute exists
      if ("_blank" === $el.attr("target")) {
        // launch new tab/window
        window.open(dest);
      } else {
        // otherwise redirect to a new page
        window.location = dest;
      }
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
// ****** basic custom select that uses mobile select keyboard ******
"use strict";

var dropdownMenu = document.querySelectorAll(".js-dropdown");

if (null !== dropdownMenu) {

  var _length = dropdownMenu.length;

  var _loop = function (i) {
    var parentEl = dropdownMenu[i],
        selectEl = parentEl.querySelector(".js-dropdown-select"),
        link = parentEl.querySelector(".js-dropdown-link");

    if (null === selectEl || null === link) {
      return "break";
    }

    selectEl.onchange = function () {
      var elem = typeof this.selectedIndex === "undefined" ? window.event.srcElement : this;
      link.innerText = elem.text || elem.options[elem.selectedIndex].text;
    };
  };

  for (var i = 0; i < _length; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {
  // Emergency Alerts start close on page load
  // the default behavior is to expand the alerts
  // Emergency Alerts should stay closed if the cookie is set to false

  /* ********* NOTE: 
    This component is dependent on the 
    accordion.js component runing before it. 
  ********* */

  $('.js-emergency-alerts').each(function () {
    var $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = _helpersCookiesJs2['default'].getCookie(cookieName),
        $button = $el.find('.js-accordion-link button');

    $button.on('click', function () {
      // clicking this link also triggers the accordion click
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      _helpersCookiesJs2['default'].setCookie(cookieName, open);
    });

    // if the user has closed the alerts on a previous page
    if (typeof cookieValue !== 'undefined' && cookieValue === 'false') {
      open = false;
      // set the state of aria-expanded
      $button.attr('aria-expanded', open);
    }

    // Emergency Alerts loads closed so expand it.
    if (open) {
      open = false; // clicking the link swaps the value
      $button.first().trigger('click');
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('form').each(function () {
    var $form = $(this),
        requiredFields = [];

    // find all required fields
    $('.js-is-required').each(function () {
      var $field = $(this),
          type = $field.data('type'),
          value = $field.val(),
          valid = validate(value, type);

      requiredFields.push({ type: type, valid: valid, $el: $field });

      $(this).data('index', requiredFields.length);
    });

    // if there aren't any required fields, don't do anything
    if (requiredFields.length === 0) {
      return;
    }

    $form.on('submit', function (e) {
      var submitForm = true;

      // validate each required field
      requiredFields.forEach(function (item) {
        var value = item.$el.val();

        item.valid = validate(value, item.type);

        if (item.valid) {
          item.$el.attr('data-valid', 'is-valid');
        } else {
          submitForm = false;
          item.$el.attr('data-valid', 'is-invalid');
        }
      });

      if (!submitForm) {
        // prevent the form from submitting
        e.preventDefault();
        // show the form error message
        // or blink the message if it is already visible
        $form.find('.js-error-msg').attr('hidden', true);
        setTimeout(function () {
          $form.find('.js-error-msg').removeAttr('hidden');
        }, 100);
      }
    });
  });

  function validate(value) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? 'text' : arguments[1];

    var valid = false;

    switch (type) {
      case 'email':
        valid = !!value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i);
        break;
      default:
        valid = value.length !== 0;
    }

    return valid;
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

exports['default'] = (function (window, document, $, undefined) {

  // only run this code if there is a google map component on the page
  if (!$('.js-google-map').length || typeof googleMapData === 'undefined') {
    return;
  }

  var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2['default'])('googleMapInfo');

  // after the api is loaded this function is called
  window.initMap = function () {

    $(".js-google-map").each(function (i) {
      var $el = $(this);

      // get the maps data
      // this could be replaced with an api
      var rawData = googleMapData[i];

      // *** Create the Map *** //
      // map defaults
      var initMapData = {
        scrollwheel: false
      };
      // create map Data by combining the rawData with the defaults
      var mapData = Object.assign({}, rawData.map, initMapData);

      var map = new google.maps.Map(this, mapData);

      var markers = [];

      // *** Add Markers with popups *** //
      rawData.markers.forEach(function (d, i) {
        var markerData = Object.assign({ map: map }, d);

        var marker = new google.maps.Marker(markerData);

        var infoData = infoTransform(markerData.infoWindow);
        var template = compiledTemplate(infoData);
        var infoWindow = new google.maps.InfoWindow({
          content: template
        });

        var markerBouncing = null;

        marker.addListener('click', function () {
          // hide all info windows
          for (var _i in markers) {
            if (markers[_i].open) {
              markers[_i].hideInfo();
            }
          }
          // show this info window
          marker.showInfo();
        });

        marker.showInfo = function () {
          infoWindow.open(map, marker);
          marker.open = true;
        };

        marker.hideInfo = function () {
          infoWindow.close(map, marker);
          marker.open = false;
        };

        marker.bounce = function () {
          clearTimeout(markerBouncing);
          marker.setAnimation(null);
          marker.setAnimation(google.maps.Animation.BOUNCE);
          markerBouncing = setTimeout(function () {
            marker.setAnimation(null);
          }, 3000);
        };

        markers.push(marker);
      });

      // listen for recenter command
      $el.on("recenter", function (event, markerIndex) {
        if (typeof markers[markerIndex] === "undefined") {
          return false;
        }
        var marker = markers[markerIndex];
        // center the map on this marker     
        map.setCenter(marker.getPosition());
        // close all open infoWindows
        for (var _i2 in markers) {
          if (markers[_i2].open) {
            markers[_i2].hideInfo();
          }
        }
        // show the infoWindow for this marker
        marker.showInfo();
      });
      // listen for bounce command
      $el.on("bounce", function (event, markerIndex) {
        if (typeof markers[markerIndex] === "undefined") {
          return false;
        }
        var marker = markers[markerIndex];
        // center the map on this marker     
        map.setCenter(marker.getPosition());
        // make the marker bounce three times
        marker.bounce();
      });
    });
  };

  function infoTransform(data) {
    var infoData = {
      phoneFormatted: formatPhone(data.phone),
      faxFormatted: formatPhone(data.fax)
    };
    return Object.assign({}, data, infoData);
  }

  function formatPhone(phone) {
    var phoneTemp = phone[0] === '1' ? phone.substring(1) : phone;
    return phoneTemp.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  // load Google's api
  var script = document.createElement('script');
  script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyC-WIoNfS6fh7TOtOqpDEgKST-W_NBebTk&callback=initMap";
  document.getElementsByTagName('head')[0].appendChild(script);
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/getHandlebarTemplate.js":3}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-header-alert').each(function () {
    var $el = $(this),
        $link = $el.find('.js-header-alert-link'),
        id = $el.data('id'),
        cookieName = "Alert" + id,
        cookieExpires = 365,
        cookieValue = _helpersCookiesJs2['default'].getCookie(cookieName);

    // show alert if cookie doesn't exist
    if (cookieValue !== "hide") {
      $el.fadeIn().fadeOut('fast').fadeIn('slow');
    }

    // hide the alert
    $link.on('click', function () {
      _helpersCookiesJs2['default'].setCookie(cookieName, "hide", cookieExpires);
      $el.stop(true, true).fadeOut();
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-keyword-search').each(function () {
    var $el = $(this),
        $form = $el.find('form');

    $form.on('submit', function (e) {
      e.preventDefault();
      $el.addClass('is-dirty');
    });

    $form.on('reset', function () {
      $el.removeClass('is-dirty');
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersStickyJs = require("../helpers/sticky.js");

var _helpersStickyJs2 = _interopRequireDefault(_helpersStickyJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-location-listing').each(function () {
    var $el = $(this),
        $mapCol = $el.find('.js-location-listing-map'),
        $map = $el.find('.js-google-map');

    _helpersStickyJs2['default'].init($mapCol);

    // find the location link
    $el.find('.js-location-listing-link').each(function (index) {
      var $link = $(this);

      // when link is clicked
      $link.on('click', function () {
        // trigger map to recenter on this item based on it's index.
        $map.trigger('recenter', index);
        // mark this link as active
        $el.find('.js-location-listing-link.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        // focus on the map - mainly for mobile when it is stacked
        var position = $map.offset().top;
        $("html,body").stop(true, true).animate({ scrollTop: position }, '750');
      });

      // when link is hovered
      $link.on('mouseenter', function () {
        // trigger map to recenter on this item and make the marker bounce
        $map.trigger('bounce', index);
      });
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/sticky.js":4}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = (function (window, document, $, undefined) {

  var windowWidth = window.innerWidth;

  $(window).resize(function () {
    windowWidth = window.innerWidth;
  });

  $('.js-main-nav').each(function () {
    var openClass = "is-open",
        closeClass = "is-closed",
        submenuClass = "show-submenu",
        $parent = $(this),
        $mainNavToggle = $parent.find('.js-main-nav-toggle'),
        $mainNavItems = $parent.find('.js-main-nav-toggle, .js-main-nav-top-link'),
        previousKey = null,
        breakpoint = 800; // matches CSS breakpoint for Main Nav

    $mainNavItems.on('keydown', function (e) {
      if (windowWidth <= breakpoint) {
        // only for desktop
        return;
      }

      // Grab all the DOM info we need...
      var $link = $(this),
          $topLevelLinks = $parent.find('.ma__main-nav__top-link'),
          open = $link.hasClass(openClass),
          $openContent = $parent.find('.js-main-nav-content.' + openClass),
          $focusedElement = $(document.activeElement),

      // relevant if open..
      $topLevelItem = $focusedElement.parents('.ma__main-nav__item'),
          $topLevelLink = $topLevelItem.find('.ma__main-nav__top-link'),
          $dropdownLinks = $link.find('.ma__main-nav__subitem .ma__main-nav__link'),
          focusIndexInDropdown = $dropdownLinks.index($focusedElement),
          isShift = !!e.shiftKey; // typecast to boolean

      // down arrow or tab key
      if (e.keyCode === 40 || e.keyCode === 9 && !isShift) {
        // hide content
        // If menubar focus
        //  - Open pull down menu and select first menu item
        //
        // If dropdown focus
        //  - Select next menu item
        e.preventDefault();
        if (open) {
          if (focusIndexInDropdown === $dropdownLinks.length - 1) {
            return;
          } else {
            if (focusIndexInDropdown === -1) {
              $dropdownLinks[1].focus();
            } else {
              $dropdownLinks[focusIndexInDropdown + 1].focus();
            }
            return;
          }
        } else {
          show($topLevelItem.find('.js-main-nav-content'));
          $topLevelLink.attr('aria-expanded', 'true');
          $link.addClass(openClass);
          if ($dropdownLinks[1]) {
            $dropdownLinks[1].focus();
          }
          return;
        }
      }

      // up arrow or shift+tab keys
      if (e.keyCode === 38 || e.keyCode === 9 && isShift) {
        // hide content
        // If menubar focus
        //  - Open pull down menu and select first menu item
        //
        // If dropdown focus
        //  - Select previous menu item
        e.preventDefault();
        if (open) {
          if (focusIndexInDropdown <= 1) {
            // not 0 bc of hidden first link
            hide($openContent);
            $topLevelLink.focus().attr('aria-expanded', 'false');
            return;
          } else {
            $dropdownLinks[focusIndexInDropdown - 1].focus();
            return;
          }
        } else {
          show($topLevelItem.find('.js-main-nav-content'));
          $topLevelLink.focus().attr('aria-expanded', 'true');
          $link.addClass(openClass);
          return;
        }
      }

      // esc key
      if (e.keyCode === 27) {
        // Close menu and return focus to menubar
        e.preventDefault();
        hide($openContent);
        $link.removeClass(openClass);
        $topLevelLink.focus().attr('aria-expanded', 'false');
        return;
      }

      // left arrow key
      if (e.keyCode === 37) {
        e.preventDefault();
        // hide content
        // If menubar focus
        //  - Previous menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        hide($openContent);
        $topLevelLink.attr('aria-expanded', 'false');
        var index = $topLevelLinks.index($topLevelLink) - 1;
        if ($topLevelLinks[index]) {
          $topLevelLinks[index].focus();
        }
        return;
      }
      // right arrow key
      if (e.keyCode === 39) {
        e.preventDefault();
        // hide content
        // If menubar focus
        //  - Next menubar item
        //
        // If dropdown focus
        //  - Open next pull menu and select first item
        hide($openContent);
        $topLevelLink.attr('aria-expanded', 'false');
        var index = $topLevelLinks.index($topLevelLink) + 1;
        if ($topLevelLinks[index]) {
          $topLevelLinks[index].focus();
        }
        return;
      }

      // key code 9 is the tab key
      if (open || typeof e.keycode !== "undefined" && e.keycode !== 9) {
        return;
      }
    });
    $mainNavItems.on('mouseenter', function (e) {
      $(this).children('button').attr("aria-expanded", "true");

      if (windowWidth > breakpoint) {
        var $openContent = $(this).find('.js-main-nav-content');
        show($openContent);
      }
    });
    $mainNavItems.on('mouseleave', function (e) {
      $(this).children('button').attr("aria-expanded", "false");

      if (windowWidth > breakpoint) {
        var $openContent = $(this).find('.js-main-nav-content');
        hide($openContent);
      }
    });
    $mainNavToggle.children('button, a').on('click', function (e) {
      var $el = $(this);
      var $elParent = $(this).parent();
      var $content = $elParent.find('.js-main-nav-content');
      var $openContent = $parent.find('.js-main-nav-content.' + openClass);
      var isOpen = $content.hasClass(openClass);

      // mobile
      if (windowWidth <= breakpoint) {
        e.preventDefault();
        // add open class to this item
        $elParent.addClass(openClass);
        show($content);
        $el.attr('aria-expanded', 'true');
      } else {
        hide($openContent);
        $el.attr('aria-expanded', 'false');

        if (!isOpen) {
          show($content);
          $el.attr('aria-expanded', 'true');
        }
      }
    });
    $mainNavToggle.last().find('.js-main-nav-content li').last().find('a').on('keydown', function (e) {
      e.stopPropagation();
      // previous key was not a shift
      if (e.keyCode === 9 && previousKey !== 16) {
        // tab arrow\
        var $openContent = $parent.find('.js-main-nav-content.' + openClass);
        hide($openContent);
      }
      previousKey = e.keyCode;
    });

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });

    // Hide any open submenu content when the sidebar menu is closed
    $('.js-header-menu-button').click(function () {
      var $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $parent.find("." + openClass).removeClass(openClass);

      if (windowWidth <= breakpoint) {
        $content.addClass(closeClass);
      } else {
        $content.stop(true, true).slideUp('fast', function () {
          $content.addClass(closeClass).slideDown(0);
        });
      }
    }

    function show($content) {
      $('body').addClass(submenuClass);
      if (windowWidth <= breakpoint) {
        $content.addClass(openClass).removeClass(closeClass);
      } else {
        $content.stop(true, true).delay(200).slideUp(0, function () {
          $content.addClass(openClass).removeClass(closeClass).slideDown('fast');
        });
      }
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-main-nav').each(function () {
    var $parent = $(this),
        $mainNavToggle = $parent.find('.js-main-nav-toggle');

    // make root top-level links inert for pilot
    $mainNavToggle.children('a').on('click', function (e) {
      e.preventDefault();
    });

    // Ensure top-level links that are potential anchor links close the sidebar on mobile
    $parent.find('.js-main-nav-top-link').find('a').on('click', function () {
      $('.js-header-menu-button').trigger('click');
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
// ****** Menu button ******
"use strict";

var menuButton = document.querySelector(".js-header-menu-button");

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

// ****** Main Header Search button on mobile should open the mobile menu  ******
var searchForm = document.querySelector(".js-header-search-menu .js-header-search-form");

if (null !== searchForm) {
  searchForm.addEventListener("submit", function (event) {
    if (window.innerWidth > 620) {
      return;
    }
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-org-selector').each(function (i) {
    var $el = $(this);
    var data = orgSelector[i];
    var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2['default'])('orgInfo');
    var $select = $el.find('select').first();
    var $placeholder = $el.find('.js-org-info');

    //render the template based on the current value
    renderTemplate($select.val());

    // When the select changes
    $select.change(function () {
      //render the template based on the new value
      renderTemplate($select.val());
    });

    // Render the template based on value
    function renderTemplate(value) {
      if (typeof data.organizations[value] === "undefined") {
        $placeholder.html("");
        return false;
      }

      $placeholder.html(compiledTemplate(data.organizations[value]));

      return true;
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/getHandlebarTemplate.js":3}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-input-date').each(function () {
    var $el = $(this);
    var restrict = $el.data('restrict');
    var picker = new Pikaday({
      field: this,
      format: 'MM/DD/YYYY'
    });

    switch (restrict) {
      case 'max':
        picker.setMaxDate(new Date());
        break;
      case 'min':
        picker.setMinDate(new Date());
        break;
    }

    $el.attr('type', 'text');
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-ma-responsive-video').fitVids();
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = (function (window, document, $, undefined) {

  $('.js-ma-rich-text table').wrap("<div class='ma__rich-text__table-wrapper'></div>");
})(window, document, jQuery);

;
module.exports = exports["default"];

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersCssControlCodeJs = require("../helpers/cssControlCode.js");

var _helpersCssControlCodeJs2 = _interopRequireDefault(_helpersCssControlCodeJs);

exports["default"] = (function (window, document, $, undefined) {

  $(".js-scroll-anchors").each(function () {
    var $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        $links = $el.find('.js-scroll-anchors-link'),
        elHeight = undefined,
        headerBuffer = 0,
        lowerLimit = undefined,
        upperLimit = undefined,
        debounceTimer = undefined,
        activeClass = "is-active",
        activeAnchorIndex = 0,
        anchors = [],
        numAnchors = 0,
        isMobile = false,
        linkScrolling = false;

    setVariables();

    // default assumption as to where the screen will load
    $el.attr('data-sticky', 'top');

    // update variables one more time to catch any post page load changes
    window.setTimeout(function () {
      setVariables();
    }, 1000);

    $links.on('click', function (e) {
      e.preventDefault();

      // is the menu closed on mobile
      if (!$el.hasClass('is-open') && isMobile) {
        // just show the menu
        $el.addClass('is-open');
        return;
      }

      activeAnchorIndex = $(this).data('index');
      // find the location of the desired link and scroll the page
      var position = anchors[activeAnchorIndex].position;
      // close the menu
      $el.removeClass('is-open');
      // remove active flag from other links
      $el.find('.' + activeClass).removeClass(activeClass);
      // mark this link as active
      $(this).addClass(activeClass);
      // prevent the scroll event from updating active links
      linkScrolling = true;

      $("html,body").stop(true, true).animate({ scrollTop: position }, '750', function () {
        linkScrolling = false;
        // Get the link hash target so we can bring focus to it
        var hash = anchors[activeAnchorIndex].hash;
        // bring focus to the item we just scrolled to
        $(hash).focus();
      });
    });

    // if the content contains accordions,
    // readjust settings when there state changes.
    $('.js-accordion-link').on('click', function () {
      if (typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function () {
        setVariables();
        setPosition();
        activateLink();
      }, 400);
    });

    $el.find(".js-scroll-anchors-toggle").on('click', function () {
      $el.toggleClass('is-open');
    });

    // make the links sticky
    $(window).resize(function () {
      if (typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function () {
        setVariables();
        setPosition();
        activateLink();
      }, 300);
    });

    $(window).scroll(function () {
      setPosition();
      activateLink();
    });

    function setVariables() {
      var topOffset = 0;

      headerBuffer = 0;
      elHeight = $el.outerHeight(true);
      upperLimit = $elParent.offset().top;
      isMobile = (0, _helpersCssControlCodeJs2["default"])($el);

      if ($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if (isMobile) {
        headerBuffer = $('.js-sticky-header').height() || 0;
        upperLimit -= headerBuffer;
        topOffset = elHeight;
      }

      lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

      // locate the position of all of the anchor targets
      anchors = new Array();
      $links.each(function (i, e) {
        var $el = $(this),
            $link = $el.is('a') ? $el : $el.find('a'),
            hash = $link[0].hash,
            position = $(hash).offset() ? $(hash).offset().top - headerBuffer - topOffset : upperLimit;

        anchors[i] = { hash: hash, position: position };

        $el.data('index', i);
      });

      // record the number of anchors for performance
      numAnchors = anchors.length;
    }

    function setPosition() {
      var windowTop = $(window).scrollTop(),
          attr = $el.attr('data-sticky'),
          top = attr !== 'top' && windowTop <= upperLimit,
          middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
          bottom = attr !== 'bottom' && windowTop >= lowerLimit;

      if ($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if (!$elParent[0].hasAttribute("style") && isMobile && attr === 'middle') {
        $elParent.css({ 'paddingTop': elHeight });
      }

      if (top) {
        $el.attr('data-sticky', 'top');

        if (isMobile) {
          $elParent.removeAttr('style');
        }
      } else if (middle) {
        $el.attr('data-sticky', 'middle');

        if (isMobile) {
          $elParent.css({ 'paddingTop': elHeight });
        }
      } else if (bottom) {
        $el.attr('data-sticky', 'bottom');

        if (isMobile) {
          $elParent.removeAttr('style');
        }
      }
    }

    function activateLink() {
      // do we have more than one anchor
      if (numAnchors < 2 || linkScrolling) {
        return;
      }

      // get the current scroll position and offset by half the view port
      var windowTop = $(window).scrollTop() + window.innerHeight / 2,
          currentAnchor = activeAnchorIndex;

      // is there a prev target
      // and
      // is the current scroll position above the current target
      if (currentAnchor > 0 && windowTop < anchors[activeAnchorIndex].position) {
        // make the prev link active
        --activeAnchorIndex;
      }

      // is there a next target
      // and
      // is the current scroll position below the next target
      else if (currentAnchor < numAnchors - 1 && windowTop > anchors[activeAnchorIndex + 1].position) {
          // make the next link active
          ++activeAnchorIndex;
        }

      if (currentAnchor !== activeAnchorIndex) {
        // move the active flag
        $el.find('.' + activeClass).removeClass(activeClass);
        $links.eq(activeAnchorIndex).addClass(activeClass);
      }
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{"../helpers/cssControlCode.js":2}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = (function (window, document, $, undefined) {

  $('.js-util-nav').each(function () {
    var openClass = "is-open",
        closeClass = "is-closed",
        submenuClass = "show-utilmenu",
        $parent = $(this),
        waitForIt = null;

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-util-nav-content.' + openClass);
      hide($openContent);
    });

    $parent.find('.js-util-nav-toggle > a').on('click', function (e) {
      e.preventdefault;

      var open = $(this).hasClass(openClass),
          $content = $(this).next('.js-util-nav-content'),
          $openContent = $parent.find('.js-util-nav-content.' + openClass);

      // hide other content
      hide($openContent);

      if (open) {
        return;
      }
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      $content.attr("aria-hidden", "false");

      setTimeout(function () {
        $content.removeClass(closeClass).addClass(openClass);
        $('body').addClass(submenuClass);
      }, .1);
    });

    $parent.find('.js-close-util-nav').on('click', function (e) {
      e.preventDefault;

      hide($(this).closest('.js-util-nav-content'));
    });

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-util-nav-content.' + openClass);
      hide($openContent);
    });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $parent.find("." + openClass).removeClass(openClass);
      $content.removeClass(openClass).addClass(closeClass);

      if (waitForIt) {
        clearTimeout(waitForIt);
      }
      waitForIt = setTimeout(function () {
        $content.attr("aria-hidden", "true");
      }, 1000);
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{}]},{},[5])

//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9oZWxwZXJzL2Nvb2tpZXMuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9oZWxwZXJzL2Nzc0NvbnRyb2xDb2RlLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvaGVscGVycy9nZXRIYW5kbGViYXJUZW1wbGF0ZS5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL2hlbHBlcnMvc3RpY2t5LmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvaW5kZXguanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2FjY29yZGlvbnMuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2JhY2sydG9wLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9iYW5uZXJDYXJvdXNlbC5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvY2xpY2thYmxlLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9kcm9wZG93bi5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvZW1lcmdlbmN5QWxlcnRzLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9mb3JtVmFsaWRhdGlvbi5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvZ29vZ2xlTWFwLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9oaWRlQWxlcnQuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2tleXdvcmRTZWFyY2guanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2xvY2F0aW9uTGlzdGluZy5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvbWFpbk5hdi5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvbWFpbk5hdlBpbG90LmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9tb2JpbGVOYXYuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL29yZ1NlbGVjdG9yLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9waWthZGF5LmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9yZXNwb25zaXZlVmlkZW8uanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL3JpY2hUZXh0LmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9zY3JvbGxBbmNob3JzLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy91dGlsTmF2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUEsVUFBUyxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQztBQUNwRCxjQUFZLENBQUM7O0FBRWIsV0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDdkMsUUFBRyxPQUFPLE9BQU8sQUFBQyxLQUFLLFFBQVEsRUFBRTtBQUMvQixVQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ25CLE9BQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFJLE9BQU8sR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxJQUFJLEFBQUMsQ0FBQyxDQUFDO0FBQ2pELFVBQUksT0FBTyxHQUFHLFVBQVUsR0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDekMsY0FBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQztLQUNwRSxNQUFNO0FBQ0wsY0FBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDbkQ7R0FFRjs7QUFFRCxXQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUU7QUFDdkIsUUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbkMsUUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLFFBQUks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akIsVUFBSSxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBRSxDQUFDO0tBQ2pELENBQUMsQ0FBQzs7QUFFSCxLQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVU7QUFDM0MsVUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUMsQ0FBQztBQUNyRSxVQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEIsQ0FBQyxDQUFDOztBQUVILGFBQVMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUN0QixPQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ25DLGFBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyRCxjQUFRLENBQ0wsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUN0QixRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXhCLFVBQUcsU0FBUyxFQUFFO0FBQ1osb0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUN6QjtBQUNELGVBQVMsR0FBRyxVQUFVLENBQUMsWUFBVTtBQUMvQixnQkFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7T0FDckMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNWO0dBRUYsQ0FBQyxDQUFDO0NBRUosQ0FBQSxDQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFDOztBQUFBLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpe1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICBmdW5jdGlvbiBzZXRDb29raWUobmFtZSwgdmFsdWUsIGV4cGlyZXMpIHtcclxuICAgIGlmKHR5cGVvZihleHBpcmVzKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAoZXhwaXJlcyoyNCo2MCo2MCoxMDAwKSk7XHJcbiAgICAgIHZhciBleHBpcmVzID0gXCJleHBpcmVzPVwiK2QudG9VVENTdHJpbmcoKTtcclxuICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBcIjsgXCIgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBcIjsgcGF0aD0vXCI7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcclxuICAgIHZhciB2YWx1ZSA9IFwiOyBcIiArIGRvY3VtZW50LmNvb2tpZTtcclxuICAgIHZhciBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiOyBcIiArIG5hbWUgKyBcIj1cIik7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09IDIpIHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdChcIjtcIikuc2hpZnQoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZXRDb29raWUsXHJcbiAgICBnZXRDb29raWVcclxuICB9O1xyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KTtcclxuXHJcbiIsIi8vIGNoZWNrIHRoZSB2YWx1ZSBvZiB0aGUgY3NzIDpiZWZvcmUgcHN1ZWRvIGVsZW1lbnRcclxuLy8gdmFsdWVzIGxvb2sgZm9yIFwidHJ1ZVwiIG9yIFwiZmFsc2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCRlbCkgPT4ge1xyXG4gIGxldCB2YWx1ZSA9IFwidHJ1ZVwiO1xyXG4gIHRyeSB7XHJcbiAgICB2YWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCRlbFswXSwgJzpiZWZvcmUnKS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50JykucmVwbGFjZSgvXFxcIi9nLCAnJyk7XHJcbiAgfSBjYXRjaChlcnIpIHt9XHJcbiAgcmV0dXJuIHZhbHVlID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWU7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSkge1xyXG4gIGlmIChIYW5kbGViYXJzLnRlbXBsYXRlcyA9PT0gdW5kZWZpbmVkIHx8IEhhbmRsZWJhcnMudGVtcGxhdGVzW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgalF1ZXJ5LmFqYXgoe1xyXG4gICAgICAgICAgdXJsIDogdGhlbWVQYXRoICsgJy9qcy90ZW1wbGF0ZXMvJyArIG5hbWUgKyAnLmh0bWwnLFxyXG4gICAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICBpZiAoSGFuZGxlYmFycy50ZW1wbGF0ZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICBIYW5kbGViYXJzLnRlbXBsYXRlcyA9IHt9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBIYW5kbGViYXJzLnRlbXBsYXRlc1tuYW1lXSA9IEhhbmRsZWJhcnMuY29tcGlsZShkYXRhKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBhc3luYyA6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gSGFuZGxlYmFycy50ZW1wbGF0ZXNbbmFtZV07XHJcbn07XHJcbiIsImltcG9ydCBjaGVja0FjdGl2ZSBmcm9tIFwiLi4vaGVscGVycy9jc3NDb250cm9sQ29kZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG4gIGxldCAkZWwsXHJcbiAgICAkZWxQYXJlbnQsXHJcbiAgICBlbEhlaWdodCxcclxuICAgIGVsV2lkdGgsXHJcbiAgICBsb3dlckxpbWl0LFxyXG4gICAgdXBwZXJMaW1pdCxcclxuICAgIGRlYm91bmNlVGltZXIsXHJcbiAgICBydW5Db2RlID0gZmFsc2U7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gICAgJGVsID0gZWxlbWVudDtcclxuICAgICRlbFBhcmVudCA9ICRlbC5wYXJlbnQoKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdyZWxhdGl2ZScgPyAkZWwucGFyZW50KCkgOiAkZWwucGFyZW50KCkub2Zmc2V0UGFyZW50KCk7XHJcblxyXG4gICAgLy8gZGVmYXVsdCBhc3N1bXB0aW9uIGFzIHRvIHdoZXJlIHRoZSBzY3JlZW4gd2lsbCBsb2FkXHJcbiAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCd0b3AnKTtcclxuXHJcbiAgICB1cGRhdGVEYXRhKCk7XHJcblxyXG4gICAgLy8gdXBkYXRlIHZhcmlhYmxlcyBvbmUgbW9yZSB0aW1lIHRvIGNhdGNoIGFueSBwb3N0IHBhZ2UgbG9hZCBjaGFuZ2VzXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICB1cGRhdGVEYXRhKCk7XHJcbiAgICB9LDEwMDApO1xyXG4gICAgXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICB1cGRhdGVEYXRhKCk7XHJcbiAgICAgIHNldFBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB0b2dnbGUgdGhlIHN0aWNreSBwb3NpdGlvbmluZ1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNldFBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZURhdGEoKXtcclxuICAgIGxldCBuZXdSdW5Db2RlID0gY2hlY2tBY3RpdmUoJGVsKTtcclxuXHJcbiAgICBpZihydW5Db2RlICYmICFuZXdSdW5Db2RlKSB7XHJcbiAgICAgICRlbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bkNvZGUgPSBuZXdSdW5Db2RlO1xyXG5cclxuICAgIGlmKCFydW5Db2RlKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBydW5Db2RlID0gbmV3UnVuQ29kZTtcclxuICAgIGVsSGVpZ2h0ID0gJGVsLmhlaWdodCgpO1xyXG4gICAgZWxXaWR0aCA9ICRlbFBhcmVudC53aWR0aCgpO1xyXG4gICAgdXBwZXJMaW1pdCA9ICRlbFBhcmVudC5vZmZzZXQoKS50b3A7XHJcbiAgICBsb3dlckxpbWl0ID0gdXBwZXJMaW1pdCArICRlbFBhcmVudC5vdXRlckhlaWdodCh0cnVlKSAtICRlbC5oZWlnaHQoKTtcclxuXHJcbiAgICAkZWwud2lkdGgoZWxXaWR0aCk7ICAgICAgXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRQb3NpdGlvbigpIHtcclxuICAgIGlmKCFydW5Db2RlKXtcclxuICAgICAgJGVsLmF0dHIoJ2RhdGEtc3RpY2t5JywndG9wJyk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2luZG93VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgIGF0dHIgPSAkZWwuYXR0cignZGF0YS1zdGlja3knKSxcclxuICAgICAgICB0b3AgPSBhdHRyICE9PSAndG9wJyAmJiB3aW5kb3dUb3AgPD0gdXBwZXJMaW1pdCwgXHJcbiAgICAgICAgbWlkZGxlID0gYXR0ciAhPT0gJ21pZGRsZScgJiYgd2luZG93VG9wIDwgbG93ZXJMaW1pdCAmJiB3aW5kb3dUb3AgPiB1cHBlckxpbWl0LFxyXG4gICAgICAgIGJvdHRvbSA9IGF0dHIgIT09ICdib3R0b20nICYmIHdpbmRvd1RvcCA+PSBsb3dlckxpbWl0O1xyXG4gICAgXHJcbiAgICBpZih0b3ApIHtcclxuICAgICAgJGVsLmF0dHIoJ2RhdGEtc3RpY2t5JywndG9wJyk7XHJcbiAgICB9IFxyXG4gICAgZWxzZSBpZiAobWlkZGxlKSB7XHJcbiAgICAgICRlbC5hdHRyKCdkYXRhLXN0aWNreScsJ21pZGRsZScpO1xyXG4gICAgfSBcclxuICAgIGVsc2UgaWYgKGJvdHRvbSkge1xyXG4gICAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCdib3R0b20nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7aW5pdH07XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpOyIsImltcG9ydCBhY2NvcmRpb25zICAgICAgIGZyb20gXCIuL21vZHVsZXMvYWNjb3JkaW9ucy5qc1wiO1xuaW1wb3J0IGdvb2dsZU1hcCAgICAgICAgZnJvbSBcIi4vbW9kdWxlcy9nb29nbGVNYXAuanNcIjtcbmltcG9ydCBiYWNrMnRvcCAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvYmFjazJ0b3AuanNcIjtcbmltcG9ydCBiYW5uZXJDYXJvdXNlbCAgIGZyb20gXCIuL21vZHVsZXMvYmFubmVyQ2Fyb3VzZWwuanNcIjtcbmltcG9ydCBjbGlja2FibGUgICAgICAgIGZyb20gXCIuL21vZHVsZXMvY2xpY2thYmxlLmpzXCI7XG5pbXBvcnQgZHJvcGRvd24gICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL2Ryb3Bkb3duLmpzXCI7XG5pbXBvcnQgZW1lcmdlbmN5QWxlcnRzICBmcm9tIFwiLi9tb2R1bGVzL2VtZXJnZW5jeUFsZXJ0cy5qc1wiO1xuaW1wb3J0IGZvcm1WYWxpZGF0aW9uICAgZnJvbSBcIi4vbW9kdWxlcy9mb3JtVmFsaWRhdGlvbi5qc1wiO1xuaW1wb3J0IGhpZGVBbGVydCAgICAgICAgZnJvbSBcIi4vbW9kdWxlcy9oaWRlQWxlcnQuanNcIjtcbmltcG9ydCBrZXl3b3JkU2VhcmNoICAgIGZyb20gXCIuL21vZHVsZXMva2V5d29yZFNlYXJjaC5qc1wiO1xuaW1wb3J0IGxvY2F0aW9uTGlzdGluZyAgZnJvbSBcIi4vbW9kdWxlcy9sb2NhdGlvbkxpc3RpbmcuanNcIjtcbmltcG9ydCBtYWluTmF2ICAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvbWFpbk5hdi5qc1wiO1xuaW1wb3J0IG1haW5OYXZQaWxvdCAgICAgZnJvbSBcIi4vbW9kdWxlcy9tYWluTmF2UGlsb3QuanNcIjtcbmltcG9ydCBtb2JpbGVOYXYgICAgICAgIGZyb20gXCIuL21vZHVsZXMvbW9iaWxlTmF2LmpzXCI7XG5pbXBvcnQgb3JnU2VsZWN0b3IgICAgICBmcm9tIFwiLi9tb2R1bGVzL29yZ1NlbGVjdG9yLmpzXCI7XG5pbXBvcnQgcGlrYWRheSAgICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL3Bpa2FkYXkuanNcIjtcbmltcG9ydCByZXNwb25zaXZlVmlkZW8gIGZyb20gXCIuL21vZHVsZXMvcmVzcG9uc2l2ZVZpZGVvLmpzXCI7XG5pbXBvcnQgcmljaFRleHQgICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL3JpY2hUZXh0LmpzXCI7XG5pbXBvcnQgc2Nyb2xsQW5jaG9ycyAgICBmcm9tIFwiLi9tb2R1bGVzL3Njcm9sbEFuY2hvcnMuanNcIjtcbmltcG9ydCB1dGlsTmF2ICAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvdXRpbE5hdi5qc1wiO1xuIiwiaW1wb3J0IGNoZWNrQWN0aXZlIGZyb20gXCIuLi9oZWxwZXJzL2Nzc0NvbnRyb2xDb2RlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1hY2NvcmRpb24nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAkbGluayA9ICRlbC5maW5kKCcuanMtYWNjb3JkaW9uLWxpbmsnKSxcclxuICAgICAgICAkY29udGVudCA9ICRlbC5maW5kKCcuanMtYWNjb3JkaW9uLWNvbnRlbnQnKSxcclxuICAgICAgICBhY3RpdmUgPSBjaGVja0FjdGl2ZSgkZWwpLFxyXG4gICAgICAgIG9wZW4gPSAkZWwuaGFzQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAkZWwuYXR0cignYXJpYS1leHBhbmRlZCcsb3Blbik7XHJcblxyXG4gICAgaWYob3Blbikge1xyXG4gICAgICAvLyBzZXR1cCB0aGUgaW5saW5lIGRpc3BsYXkgYmxvY2tcclxuICAgICAgJGNvbnRlbnQuc3RvcCh0cnVlLHRydWUpLnNsaWRlRG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgICRsaW5rLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGlmKGFjdGl2ZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBvcGVuID0gJGVsLmhhc0NsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgaWYob3Blbil7XHJcbiAgICAgICAgICAkY29udGVudC5zdG9wKHRydWUsdHJ1ZSkuc2xpZGVVcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkY29udGVudC5zdG9wKHRydWUsdHJ1ZSkuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRlbC5hdHRyKCdhcmlhLWV4cGFuZGVkJywhb3BlbikudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHRlbXAgPSBjaGVja0FjdGl2ZSgkZWwpO1xyXG5cclxuICAgICAgaWYodGVtcCAhPT0gYWN0aXZlICYmICF0ZW1wKSB7XHJcbiAgICAgICAgJGNvbnRlbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkZWwuYXR0cignYXJpYS1leHBhbmRlZCcsJ2ZhbHNlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFjdGl2ZSA9IHRlbXA7XHJcbiAgICB9KS5yZXNpemUoKTtcclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG4gIGxldCAkZm9vdGVyID0gJCgnLmpzLWZvb3RlcicpLFxyXG4gICAgICB2aXNpYmxlVGhyZXNob2xkID0gMjUwLFxyXG4gICAgICBzdGF0aWNUaHJlc2hvbGQgPSA1MDtcclxuXHJcbiAgJChcIi5qcy1iYWNrMnRvcFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyk7XHJcblxyXG4gICAgJGVsLm9uKCdjbGljaycsZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuc3RvcCh0cnVlLHRydWUpLmFuaW1hdGUoe3Njcm9sbFRvcDowfSwgJzc1MCcpO1xyXG4gICAgICB9IFxyXG4gICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnNjcm9sbFRvcCgwKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBCcmluZyBrZXlib2FyZCBmb2N1cyBiYWNrIHRvIHRvcCBhcyB3ZWxsLlxyXG4gICAgICAkKFwiI21haW4tY29udGVudFwiKS5mb2N1cygpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyBpZiB3ZSd2ZSBleGNlZWRlZCB0aGUgdGhyZXNob2xkIG9mIHNjcm9sbGluZ1xyXG4gICAgICAvLyBmcm9tIHRoZSB0b3AsIHNob3cgY29udHJvbFxyXG4gICAgICBsZXQgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgaWYgKHNjcm9sbFRvcCA+IHZpc2libGVUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCcuanMtYmFubmVyLWNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyk7XHJcblxyXG4gICAgaWYoJGVsLmNoaWxkcmVuKCkubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzbGlkZXIgPSAkZWwuc2xpY2soe1xyXG4gICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLXByZXZcIj48L2J1dHRvbj4nLFxyXG4gICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj48L2J1dHRvbj4nXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG4gICQoJy5qcy1jbGlja2FibGUnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBpZiB0aGUgdGhpcyBpcyBjbGlja2VkXHJcbiAgICAkKHRoaXMpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHZhciAkZWwgPSAkKHRoaXMpLmZpbmQoJy5qcy1jbGlja2FibGUtbGluaycpLmZpcnN0KCk7XHJcbiAgICAgIC8vIGZpbmQgdGhlIGRlc3RpbmF0aW9uXHJcbiAgICAgIHZhciBkZXN0ID0gJGVsLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAvLyBpZiB0aGUgdGFyZ2V0IGF0dHJpYnV0ZSBleGlzdHNcclxuICAgICAgaWYoXCJfYmxhbmtcIiA9PT0gJGVsLmF0dHIoXCJ0YXJnZXRcIikpIHtcclxuICAgICAgICAvLyBsYXVuY2ggbmV3IHRhYi93aW5kb3dcclxuICAgICAgICB3aW5kb3cub3BlbihkZXN0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBvdGhlcndpc2UgcmVkaXJlY3QgdG8gYSBuZXcgcGFnZSBcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBkZXN0O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCIvLyAqKioqKiogYmFzaWMgY3VzdG9tIHNlbGVjdCB0aGF0IHVzZXMgbW9iaWxlIHNlbGVjdCBrZXlib2FyZCAqKioqKipcclxubGV0IGRyb3Bkb3duTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtZHJvcGRvd25cIik7XHJcblxyXG5pZihudWxsICE9PSBkcm9wZG93bk1lbnUpe1xyXG5cclxuICBsZXQgbGVuZ3RoID0gZHJvcGRvd25NZW51Lmxlbmd0aDtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyApIHtcclxuICAgIGxldCBwYXJlbnRFbCA9IGRyb3Bkb3duTWVudVtpXSxcclxuICAgICAgICBzZWxlY3RFbCA9IHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuanMtZHJvcGRvd24tc2VsZWN0XCIpLFxyXG4gICAgICAgIGxpbmsgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmpzLWRyb3Bkb3duLWxpbmtcIilcclxuXHJcbiAgICBpZihudWxsID09PSBzZWxlY3RFbCB8fCBudWxsID09PSBsaW5rKSB7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEVsLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGxldCBlbGVtID0gKHR5cGVvZiB0aGlzLnNlbGVjdGVkSW5kZXggPT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cuZXZlbnQuc3JjRWxlbWVudCA6IHRoaXMpO1xyXG4gICAgICBsaW5rLmlubmVyVGV4dCA9IGVsZW0udGV4dCB8fCBlbGVtLm9wdGlvbnNbZWxlbS5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgY29va2llICAgZnJvbSBcIi4uL2hlbHBlcnMvY29va2llcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG4gIC8vIEVtZXJnZW5jeSBBbGVydHMgc3RhcnQgY2xvc2Ugb24gcGFnZSBsb2FkXHJcbiAgLy8gdGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgdG8gZXhwYW5kIHRoZSBhbGVydHNcclxuICAvLyBFbWVyZ2VuY3kgQWxlcnRzIHNob3VsZCBzdGF5IGNsb3NlZCBpZiB0aGUgY29va2llIGlzIHNldCB0byBmYWxzZVxyXG4gIFxyXG4gIC8qICoqKioqKioqKiBOT1RFOiBcclxuICAgIFRoaXMgY29tcG9uZW50IGlzIGRlcGVuZGVudCBvbiB0aGUgXHJcbiAgICBhY2NvcmRpb24uanMgY29tcG9uZW50IHJ1bmluZyBiZWZvcmUgaXQuIFxyXG4gICoqKioqKioqKiAqL1xyXG5cclxuICAkKCcuanMtZW1lcmdlbmN5LWFsZXJ0cycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgIG9wZW4gPSB0cnVlLFxyXG4gICAgICAgIGlkID0gJGVsLmRhdGEoJ2lkJyksXHJcbiAgICAgICAgY29va2llTmFtZSA9ICdlbWVyZ2VuY3ktYWxlcnRzJyArIGlkLFxyXG4gICAgICAgIGNvb2tpZVZhbHVlID0gY29va2llLmdldENvb2tpZShjb29raWVOYW1lKSxcclxuICAgICAgICAkYnV0dG9uID0gJGVsLmZpbmQoJy5qcy1hY2NvcmRpb24tbGluayBidXR0b24nKTtcclxuXHJcbiAgICAkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyBjbGlja2luZyB0aGlzIGxpbmsgYWxzbyB0cmlnZ2VycyB0aGUgYWNjb3JkaW9uIGNsaWNrXHJcbiAgICAgIC8vIHRvZ2dsZSB0aGUgY3VycmVudCBzdGF0ZVxyXG4gICAgICBvcGVuID0gIW9wZW47XHJcbiAgICAgIC8vIHVwZGF0ZSBvcGVuL2Nsb3NlIHN0YXRlIGNvb2tpZVxyXG4gICAgICAvLyBsZWF2ZSBvZmYgdGhpcmQgYXJndW1lbnQgdG8gbWFrZSBpdCBleHBpcmUgb24gc2Vzc2lvblxyXG4gICAgICBjb29raWUuc2V0Q29va2llKGNvb2tpZU5hbWUsb3Blbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpZiB0aGUgdXNlciBoYXMgY2xvc2VkIHRoZSBhbGVydHMgb24gYSBwcmV2aW91cyBwYWdlXHJcbiAgICBpZih0eXBlb2YoY29va2llVmFsdWUpICE9PSAndW5kZWZpbmVkJyAmJiBjb29raWVWYWx1ZSA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICBvcGVuID0gZmFsc2U7XHJcbiAgICAgIC8vIHNldCB0aGUgc3RhdGUgb2YgYXJpYS1leHBhbmRlZFxyXG4gICAgICAkYnV0dG9uLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBvcGVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFbWVyZ2VuY3kgQWxlcnRzIGxvYWRzIGNsb3NlZCBzbyBleHBhbmQgaXQuXHJcbiAgICBpZihvcGVuKSB7XHJcbiAgICAgIG9wZW4gPSBmYWxzZTsgLy8gY2xpY2tpbmcgdGhlIGxpbmsgc3dhcHMgdGhlIHZhbHVlXHJcbiAgICAgICRidXR0b24uZmlyc3QoKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCdmb3JtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICByZXF1aXJlZEZpZWxkcyA9IFtdO1xyXG5cclxuICAgIC8vIGZpbmQgYWxsIHJlcXVpcmVkIGZpZWxkc1xyXG4gICAgJCgnLmpzLWlzLXJlcXVpcmVkJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgJGZpZWxkID0gJCh0aGlzKSxcclxuICAgICAgICAgIHR5cGUgPSAkZmllbGQuZGF0YSgndHlwZScpLFxyXG4gICAgICAgICAgdmFsdWUgPSAkZmllbGQudmFsKCksXHJcbiAgICAgICAgICB2YWxpZCA9IHZhbGlkYXRlKHZhbHVlLHR5cGUpO1xyXG5cclxuICAgICAgcmVxdWlyZWRGaWVsZHMucHVzaCh7dHlwZSx2YWxpZCwkZWw6JGZpZWxkfSk7XHJcblxyXG4gICAgICAkKHRoaXMpLmRhdGEoJ2luZGV4JyxyZXF1aXJlZEZpZWxkcy5sZW5ndGgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaWYgdGhlcmUgYXJlbid0IGFueSByZXF1aXJlZCBmaWVsZHMsIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICBpZihyZXF1aXJlZEZpZWxkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICRmb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgbGV0IHN1Ym1pdEZvcm0gPSB0cnVlO1xyXG5cclxuICAgICAgLy8gdmFsaWRhdGUgZWFjaCByZXF1aXJlZCBmaWVsZFxyXG4gICAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBpdGVtLiRlbC52YWwoKTtcclxuXHJcbiAgICAgICAgaXRlbS52YWxpZCA9IHZhbGlkYXRlKHZhbHVlLGl0ZW0udHlwZSk7XHJcblxyXG4gICAgICAgIGlmKGl0ZW0udmFsaWQpIHtcclxuICAgICAgICAgIGl0ZW0uJGVsLmF0dHIoJ2RhdGEtdmFsaWQnLCdpcy12YWxpZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJtaXRGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgICBpdGVtLiRlbC5hdHRyKCdkYXRhLXZhbGlkJywnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZighc3VibWl0Rm9ybSkge1xyXG4gICAgICAgIC8vIHByZXZlbnQgdGhlIGZvcm0gZnJvbSBzdWJtaXR0aW5nXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIHNob3cgdGhlIGZvcm0gZXJyb3IgbWVzc2FnZSBcclxuICAgICAgICAvLyBvciBibGluayB0aGUgbWVzc2FnZSBpZiBpdCBpcyBhbHJlYWR5IHZpc2libGVcclxuICAgICAgICAkZm9ybS5maW5kKCcuanMtZXJyb3ItbXNnJylcclxuICAgICAgICAgIC5hdHRyKCdoaWRkZW4nLHRydWUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkZm9ybS5maW5kKCcuanMtZXJyb3ItbXNnJylcclxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfSwxMDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUsdHlwZT0ndGV4dCcpe1xyXG4gICAgbGV0IHZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSAnZW1haWwnOlxyXG4gICAgICAgIHZhbGlkID0gISEodmFsdWUubWF0Y2goL1tBLVowLTkuXyUrLV0rQFtBLVowLTkuLV0rXFwuW0EtWl0rL2kpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB2YWxpZCA9IHZhbHVlLmxlbmd0aCAhPT0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsaWQ7XHJcbiAgfVxyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiaW1wb3J0IGdldFRlbXBsYXRlIGZyb20gXCIuLi9oZWxwZXJzL2dldEhhbmRsZWJhclRlbXBsYXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gIC8vIG9ubHkgcnVuIHRoaXMgY29kZSBpZiB0aGVyZSBpcyBhIGdvb2dsZSBtYXAgY29tcG9uZW50IG9uIHRoZSBwYWdlXHJcbiAgaWYoISQoJy5qcy1nb29nbGUtbWFwJykubGVuZ3RoIHx8IHR5cGVvZiBnb29nbGVNYXBEYXRhID09PSAndW5kZWZpbmVkJyl7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBsZXQgY29tcGlsZWRUZW1wbGF0ZSA9IGdldFRlbXBsYXRlKCdnb29nbGVNYXBJbmZvJyk7XHJcblxyXG4gIC8vIGFmdGVyIHRoZSBhcGkgaXMgbG9hZGVkIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkXHJcbiAgd2luZG93LmluaXRNYXAgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAkKFwiLmpzLWdvb2dsZS1tYXBcIikuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIGNvbnN0ICRlbCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAvLyBnZXQgdGhlIG1hcHMgZGF0YVxyXG4gICAgICAvLyB0aGlzIGNvdWxkIGJlIHJlcGxhY2VkIHdpdGggYW4gYXBpXHJcbiAgICAgIGNvbnN0IHJhd0RhdGEgPSBnb29nbGVNYXBEYXRhW2ldO1xyXG4gICAgICBcclxuICAgICAgLy8gKioqIENyZWF0ZSB0aGUgTWFwICoqKiAvL1xyXG4gICAgICAvLyBtYXAgZGVmYXVsdHNcclxuICAgICAgY29uc3QgaW5pdE1hcERhdGEgPSB7XHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgLy8gY3JlYXRlIG1hcCBEYXRhIGJ5IGNvbWJpbmluZyB0aGUgcmF3RGF0YSB3aXRoIHRoZSBkZWZhdWx0c1xyXG4gICAgICBjb25zdCBtYXBEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcmF3RGF0YS5tYXAsIGluaXRNYXBEYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAodGhpcywgbWFwRGF0YSk7XHJcblxyXG4gICAgICBsZXQgbWFya2VycyA9IFtdO1xyXG5cclxuICAgICAgLy8gKioqIEFkZCBNYXJrZXJzIHdpdGggcG9wdXBzICoqKiAvL1xyXG4gICAgICByYXdEYXRhLm1hcmtlcnMuZm9yRWFjaChmdW5jdGlvbihkLGkpe1xyXG4gICAgICAgIGxldCBtYXJrZXJEYXRhID0gT2JqZWN0LmFzc2lnbih7bWFwfSxkKTtcclxuXHJcbiAgICAgICAgbGV0IG1hcmtlciA9ICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG1hcmtlckRhdGEpO1xyXG5cclxuICAgICAgICBsZXQgaW5mb0RhdGEgPSBpbmZvVHJhbnNmb3JtKG1hcmtlckRhdGEuaW5mb1dpbmRvdyk7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gY29tcGlsZWRUZW1wbGF0ZShpbmZvRGF0YSk7XHJcbiAgICAgICAgbGV0IGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XHJcbiAgICAgICAgICBjb250ZW50OiB0ZW1wbGF0ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWFya2VyQm91bmNpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICBtYXJrZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vIGhpZGUgYWxsIGluZm8gd2luZG93c1xyXG4gICAgICAgICAgZm9yIChsZXQgaSBpbiBtYXJrZXJzKSB7XHJcbiAgICAgICAgICAgIGlmKG1hcmtlcnNbaV0ub3Blbikge1xyXG4gICAgICAgICAgICAgIG1hcmtlcnNbaV0uaGlkZUluZm8oKTsgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBzaG93IHRoaXMgaW5mbyB3aW5kb3dcclxuICAgICAgICAgIG1hcmtlci5zaG93SW5mbygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYXJrZXIuc2hvd0luZm8gPSAoKSA9PiB7XHJcbiAgICAgICAgICBpbmZvV2luZG93Lm9wZW4obWFwLCBtYXJrZXIpO1xyXG4gICAgICAgICAgbWFya2VyLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBtYXJrZXIuaGlkZUluZm8gPSAoKSA9PiB7XHJcbiAgICAgICAgICBpbmZvV2luZG93LmNsb3NlKG1hcCwgbWFya2VyKTtcclxuICAgICAgICAgIG1hcmtlci5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXJrZXIuYm91bmNlID0gKCkgPT4ge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KG1hcmtlckJvdW5jaW5nKTtcclxuICAgICAgICAgIG1hcmtlci5zZXRBbmltYXRpb24obnVsbCk7XHJcbiAgICAgICAgICBtYXJrZXIuc2V0QW5pbWF0aW9uKGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0UpO1xyXG4gICAgICAgICAgbWFya2VyQm91bmNpbmcgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbWFya2VyLnNldEFuaW1hdGlvbihudWxsKTtcclxuICAgICAgICAgIH0sMzAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXJrZXJzLnB1c2gobWFya2VyKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBsaXN0ZW4gZm9yIHJlY2VudGVyIGNvbW1hbmRcclxuICAgICAgJGVsLm9uKFwicmVjZW50ZXJcIiwgZnVuY3Rpb24oIGV2ZW50LCBtYXJrZXJJbmRleCApIHtcclxuICAgICAgICBpZih0eXBlb2YgbWFya2Vyc1ttYXJrZXJJbmRleF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1hcmtlciA9IG1hcmtlcnNbbWFya2VySW5kZXhdOyAgXHJcbiAgICAgICAgLy8gY2VudGVyIHRoZSBtYXAgb24gdGhpcyBtYXJrZXIgICAgICBcclxuICAgICAgICBtYXAuc2V0Q2VudGVyKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAvLyBjbG9zZSBhbGwgb3BlbiBpbmZvV2luZG93c1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gbWFya2Vycykge1xyXG4gICAgICAgICAgaWYobWFya2Vyc1tpXS5vcGVuKSB7XHJcbiAgICAgICAgICAgIG1hcmtlcnNbaV0uaGlkZUluZm8oKTsgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzaG93IHRoZSBpbmZvV2luZG93IGZvciB0aGlzIG1hcmtlclxyXG4gICAgICAgIG1hcmtlci5zaG93SW5mbygpO1xyXG4gICAgICB9KTsgICAgXHJcbiAgICAgIC8vIGxpc3RlbiBmb3IgYm91bmNlIGNvbW1hbmRcclxuICAgICAgJGVsLm9uKFwiYm91bmNlXCIsIGZ1bmN0aW9uKCBldmVudCwgbWFya2VySW5kZXggKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIG1hcmtlcnNbbWFya2VySW5kZXhdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXJrZXIgPSBtYXJrZXJzW21hcmtlckluZGV4XTsgIFxyXG4gICAgICAgIC8vIGNlbnRlciB0aGUgbWFwIG9uIHRoaXMgbWFya2VyICAgICAgXHJcbiAgICAgICAgbWFwLnNldENlbnRlcihtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgLy8gbWFrZSB0aGUgbWFya2VyIGJvdW5jZSB0aHJlZSB0aW1lc1xyXG4gICAgICAgIG1hcmtlci5ib3VuY2UoKTtcclxuICAgICAgfSk7ICAgIFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbmZvVHJhbnNmb3JtKGRhdGEpIHtcclxuICAgIGxldCBpbmZvRGF0YSA9IHtcclxuICAgICAgcGhvbmVGb3JtYXR0ZWQ6IGZvcm1hdFBob25lKGRhdGEucGhvbmUpLFxyXG4gICAgICBmYXhGb3JtYXR0ZWQ6IGZvcm1hdFBob25lKGRhdGEuZmF4KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sZGF0YSxpbmZvRGF0YSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmb3JtYXRQaG9uZShwaG9uZSkge1xyXG4gICAgbGV0IHBob25lVGVtcCA9IHBob25lWzBdID09PSAnMScgPyBwaG9uZS5zdWJzdHJpbmcoMSkgOiBwaG9uZTtcclxuICAgIHJldHVybiBwaG9uZVRlbXAucmVwbGFjZSgvKFxcZHszfSkoXFxkezN9KShcXGR7NH0pLywgJygkMSkgJDItJDMnKTtcclxuICB9XHJcblxyXG4gIC8vIGxvYWQgR29vZ2xlJ3MgYXBpXHJcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0LnNyYyA9IFwiLy9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lDLVdJb05mUzZmaDdUT3RPcXBERWdLU1QtV19OQmViVGsmY2FsbGJhY2s9aW5pdE1hcFwiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7XHJcbiIsImltcG9ydCBjb29raWVzIGZyb20gXCIuLi9oZWxwZXJzL2Nvb2tpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLWhlYWRlci1hbGVydCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICRsaW5rID0gJGVsLmZpbmQoJy5qcy1oZWFkZXItYWxlcnQtbGluaycpLFxyXG4gICAgICAgIGlkID0gJGVsLmRhdGEoJ2lkJyksXHJcbiAgICAgICAgY29va2llTmFtZSA9IFwiQWxlcnRcIiArIGlkLFxyXG4gICAgICAgIGNvb2tpZUV4cGlyZXMgPSAzNjUsXHJcbiAgICAgICAgY29va2llVmFsdWUgPSBjb29raWVzLmdldENvb2tpZShjb29raWVOYW1lKTtcclxuXHJcbiAgICAvLyBzaG93IGFsZXJ0IGlmIGNvb2tpZSBkb2Vzbid0IGV4aXN0XHJcbiAgICBpZihjb29raWVWYWx1ZSAhPT0gXCJoaWRlXCIpIHtcclxuICAgICAgJGVsLmZhZGVJbigpLmZhZGVPdXQoJ2Zhc3QnKS5mYWRlSW4oJ3Nsb3cnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaWRlIHRoZSBhbGVydFxyXG4gICAgJGxpbmsub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICBjb29raWVzLnNldENvb2tpZShjb29raWVOYW1lLFwiaGlkZVwiLGNvb2tpZUV4cGlyZXMpO1xyXG4gICAgICAkZWwuc3RvcCh0cnVlLHRydWUpLmZhZGVPdXQoKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7XHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1rZXl3b3JkLXNlYXJjaCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICRmb3JtID0gJGVsLmZpbmQoJ2Zvcm0nKTtcclxuXHJcbiAgICAkZm9ybS5vbignc3VibWl0JyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkZWwuYWRkQ2xhc3MoJ2lzLWRpcnR5JylcclxuICAgIH0pO1xyXG5cclxuICAgICRmb3JtLm9uKCdyZXNldCcsZnVuY3Rpb24oKXtcclxuICAgICAgJGVsLnJlbW92ZUNsYXNzKCdpcy1kaXJ0eScpXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7XHJcbiIsImltcG9ydCBzdGlja3kgZnJvbSBcIi4uL2hlbHBlcnMvc3RpY2t5LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1sb2NhdGlvbi1saXN0aW5nJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgJG1hcENvbCA9ICRlbC5maW5kKCcuanMtbG9jYXRpb24tbGlzdGluZy1tYXAnKSxcclxuICAgICAgICAkbWFwID0gJGVsLmZpbmQoJy5qcy1nb29nbGUtbWFwJyk7XHJcblxyXG4gICAgc3RpY2t5LmluaXQoJG1hcENvbCk7XHJcblxyXG4gICAgLy8gZmluZCB0aGUgbG9jYXRpb24gbGlua1xyXG4gICAgJGVsLmZpbmQoJy5qcy1sb2NhdGlvbi1saXN0aW5nLWxpbmsnKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgIGxldCAkbGluayA9ICQodGhpcyk7XHJcblxyXG4gICAgICAvLyB3aGVuIGxpbmsgaXMgY2xpY2tlZCBcclxuICAgICAgJGxpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyB0cmlnZ2VyIG1hcCB0byByZWNlbnRlciBvbiB0aGlzIGl0ZW0gYmFzZWQgb24gaXQncyBpbmRleC5cclxuICAgICAgICAkbWFwLnRyaWdnZXIoJ3JlY2VudGVyJyxpbmRleCk7XHJcbiAgICAgICAgLy8gbWFyayB0aGlzIGxpbmsgYXMgYWN0aXZlXHJcbiAgICAgICAgJGVsLmZpbmQoJy5qcy1sb2NhdGlvbi1saXN0aW5nLWxpbmsuaXMtYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIC8vIGZvY3VzIG9uIHRoZSBtYXAgLSBtYWlubHkgZm9yIG1vYmlsZSB3aGVuIGl0IGlzIHN0YWNrZWRcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSAkbWFwLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKFwiaHRtbCxib2R5XCIpLnN0b3AodHJ1ZSx0cnVlKS5hbmltYXRlKHtzY3JvbGxUb3A6cG9zaXRpb259LCAnNzUwJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gd2hlbiBsaW5rIGlzIGhvdmVyZWRcclxuICAgICAgJGxpbmsub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIHRyaWdnZXIgbWFwIHRvIHJlY2VudGVyIG9uIHRoaXMgaXRlbSBhbmQgbWFrZSB0aGUgbWFya2VyIGJvdW5jZVxyXG4gICAgICAgICRtYXAudHJpZ2dlcignYm91bmNlJyxpbmRleCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pO1xyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG4gICAgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICB9KTtcclxuXHJcbiAgJCgnLmpzLW1haW4tbmF2JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIGxldCBvcGVuQ2xhc3MgPSBcImlzLW9wZW5cIixcclxuICAgICAgICBjbG9zZUNsYXNzID0gXCJpcy1jbG9zZWRcIixcclxuICAgICAgICBzdWJtZW51Q2xhc3MgPSBcInNob3ctc3VibWVudVwiLFxyXG4gICAgICAgICRwYXJlbnQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRtYWluTmF2VG9nZ2xlID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtdG9nZ2xlJyksXHJcbiAgICAgICAgJG1haW5OYXZJdGVtcyA9ICRwYXJlbnQuZmluZCgnLmpzLW1haW4tbmF2LXRvZ2dsZSwgLmpzLW1haW4tbmF2LXRvcC1saW5rJyksXHJcbiAgICAgICAgcHJldmlvdXNLZXkgPSBudWxsLFxyXG4gICAgICAgIGJyZWFrcG9pbnQgPSA4MDA7IC8vIG1hdGNoZXMgQ1NTIGJyZWFrcG9pbnQgZm9yIE1haW4gTmF2XHJcblxyXG4gICAgJG1haW5OYXZJdGVtcy5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgIC8vIG9ubHkgZm9yIGRlc2t0b3BcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdyYWIgYWxsIHRoZSBET00gaW5mbyB3ZSBuZWVkLi4uXHJcbiAgICAgIGxldCAkbGluayA9ICQodGhpcyksXHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rcyA9ICRwYXJlbnQuZmluZCgnLm1hX19tYWluLW5hdl9fdG9wLWxpbmsnKSxcclxuICAgICAgICAgIG9wZW4gPSAkbGluay5oYXNDbGFzcyhvcGVuQ2xhc3MpLFxyXG4gICAgICAgICAgJG9wZW5Db250ZW50ID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudC4nICsgb3BlbkNsYXNzKSxcclxuICAgICAgICAgICRmb2N1c2VkRWxlbWVudCA9ICQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCksXHJcbiAgICAgIC8vIHJlbGV2YW50IGlmIG9wZW4uLlxyXG4gICAgICAgICAgJHRvcExldmVsSXRlbSA9ICRmb2N1c2VkRWxlbWVudC5wYXJlbnRzKCcubWFfX21haW4tbmF2X19pdGVtJyksXHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rID0gJHRvcExldmVsSXRlbS5maW5kKCcubWFfX21haW4tbmF2X190b3AtbGluaycpLFxyXG4gICAgICAgICAgJGRyb3Bkb3duTGlua3MgPSAkbGluay5maW5kKCcubWFfX21haW4tbmF2X19zdWJpdGVtIC5tYV9fbWFpbi1uYXZfX2xpbmsnKSxcclxuICAgICAgICAgIGZvY3VzSW5kZXhJbkRyb3Bkb3duID0gJGRyb3Bkb3duTGlua3MuaW5kZXgoJGZvY3VzZWRFbGVtZW50KSxcclxuICAgICAgICAgIGlzU2hpZnQgPSAhIWUuc2hpZnRLZXk7IC8vIHR5cGVjYXN0IHRvIGJvb2xlYW5cclxuXHJcbiAgICAgIC8vIGRvd24gYXJyb3cgb3IgdGFiIGtleVxyXG4gICAgICBpZigoZS5rZXlDb2RlID09PSA0MCkgfHwgKGUua2V5Q29kZSA9PT0gOSAmJiAhaXNTaGlmdCkpIHtcclxuICAgICAgICAvLyBoaWRlIGNvbnRlbnRcclxuICAgICAgICAvLyBJZiBtZW51YmFyIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gT3BlbiBwdWxsIGRvd24gbWVudSBhbmQgc2VsZWN0IGZpcnN0IG1lbnUgaXRlbVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gSWYgZHJvcGRvd24gZm9jdXNcclxuICAgICAgICAvLyAgLSBTZWxlY3QgbmV4dCBtZW51IGl0ZW1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYob3Blbikge1xyXG4gICAgICAgICAgaWYoZm9jdXNJbmRleEluRHJvcGRvd24gPT09ICgkZHJvcGRvd25MaW5rcy5sZW5ndGgtMSkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKGZvY3VzSW5kZXhJbkRyb3Bkb3duID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICRkcm9wZG93bkxpbmtzWzFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgJGRyb3Bkb3duTGlua3NbZm9jdXNJbmRleEluRHJvcGRvd24rMV0uZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNob3coJHRvcExldmVsSXRlbS5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCcpKTtcclxuICAgICAgICAgICR0b3BMZXZlbExpbmsuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgICAkbGluay5hZGRDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAgICAgaWYoJGRyb3Bkb3duTGlua3NbMV0pIHtcclxuICAgICAgICAgICAgJGRyb3Bkb3duTGlua3NbMV0uZm9jdXMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICAvLyB1cCBhcnJvdyBvciBzaGlmdCt0YWIga2V5c1xyXG4gICAgICAgaWYoKGUua2V5Q29kZSA9PT0gMzgpIHx8IChlLmtleUNvZGUgPT09IDkgJiYgaXNTaGlmdCkpIHtcclxuICAgICAgICAvLyBoaWRlIGNvbnRlbnRcclxuICAgICAgICAvLyBJZiBtZW51YmFyIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gT3BlbiBwdWxsIGRvd24gbWVudSBhbmQgc2VsZWN0IGZpcnN0IG1lbnUgaXRlbVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gSWYgZHJvcGRvd24gZm9jdXNcclxuICAgICAgICAvLyAgLSBTZWxlY3QgcHJldmlvdXMgbWVudSBpdGVtXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmKG9wZW4pIHtcclxuICAgICAgICAgIGlmKGZvY3VzSW5kZXhJbkRyb3Bkb3duIDw9IDEgKSB7IC8vIG5vdCAwIGJjIG9mIGhpZGRlbiBmaXJzdCBsaW5rXHJcbiAgICAgICAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgICAgICAgJHRvcExldmVsTGluay5mb2N1cygpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGRyb3Bkb3duTGlua3NbZm9jdXNJbmRleEluRHJvcGRvd24tMV0uZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzaG93KCR0b3BMZXZlbEl0ZW0uZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKSk7XHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rLmZvY3VzKCkuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgICAkbGluay5hZGRDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZXNjIGtleVxyXG4gICAgICBpZihlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgLy8gQ2xvc2UgbWVudSBhbmQgcmV0dXJuIGZvY3VzIHRvIG1lbnViYXJcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgICRsaW5rLnJlbW92ZUNsYXNzKG9wZW5DbGFzcyk7XHJcbiAgICAgICAgJHRvcExldmVsTGluay5mb2N1cygpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCdmYWxzZScpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbGVmdCBhcnJvdyBrZXlcclxuICAgICAgaWYoZS5rZXlDb2RlID09PSAzNykge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyBoaWRlIGNvbnRlbnRcclxuICAgICAgICAvLyBJZiBtZW51YmFyIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gUHJldmlvdXMgbWVudWJhciBpdGVtXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBJZiBkcm9wZG93biBmb2N1c1xyXG4gICAgICAgIC8vICAtIE9wZW4gcHJldmlvdXMgcHVsbCBkb3duIG1lbnUgYW5kIHNlbGVjdCBmaXJzdCBpdGVtXHJcbiAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgICR0b3BMZXZlbExpbmsuYXR0cignYXJpYS1leHBhbmRlZCcsJ2ZhbHNlJyk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gJHRvcExldmVsTGlua3MuaW5kZXgoJHRvcExldmVsTGluayktMTtcclxuICAgICAgICBpZigkdG9wTGV2ZWxMaW5rc1tpbmRleF0pIHtcclxuICAgICAgICAgICR0b3BMZXZlbExpbmtzW2luZGV4XS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICB9XHJcbiAgICAgIC8vIHJpZ2h0IGFycm93IGtleVxyXG4gICAgICBpZihlLmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIGhpZGUgY29udGVudFxyXG4gICAgICAgIC8vIElmIG1lbnViYXIgZm9jdXNcclxuICAgICAgICAvLyAgLSBOZXh0IG1lbnViYXIgaXRlbVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gSWYgZHJvcGRvd24gZm9jdXNcclxuICAgICAgICAvLyAgLSBPcGVuIG5leHQgcHVsbCBtZW51IGFuZCBzZWxlY3QgZmlyc3QgaXRlbVxyXG4gICAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgICAkdG9wTGV2ZWxMaW5rLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCdmYWxzZScpO1xyXG4gICAgICAgIGxldCBpbmRleCA9ICR0b3BMZXZlbExpbmtzLmluZGV4KCR0b3BMZXZlbExpbmspKzE7XHJcbiAgICAgICAgaWYoJHRvcExldmVsTGlua3NbaW5kZXhdKSB7XHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rc1tpbmRleF0uZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBrZXkgY29kZSA5IGlzIHRoZSB0YWIga2V5XHJcbiAgICAgIGlmKG9wZW4gfHwgKHR5cGVvZihlLmtleWNvZGUpICE9PSBcInVuZGVmaW5lZFwiICYmIGUua2V5Y29kZSAhPT0gOSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgICRtYWluTmF2SXRlbXMub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICQodGhpcykuY2hpbGRyZW4oJ2J1dHRvbicpLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsXCJ0cnVlXCIpO1xyXG5cclxuICAgICAgaWYod2luZG93V2lkdGggPiBicmVha3BvaW50KSB7XHJcbiAgICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICQodGhpcykuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKTtcclxuICAgICAgICBzaG93KCRvcGVuQ29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJG1haW5OYXZJdGVtcy5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgJCh0aGlzKS5jaGlsZHJlbignYnV0dG9uJykuYXR0cihcImFyaWEtZXhwYW5kZWRcIixcImZhbHNlXCIpO1xyXG5cclxuICAgICAgaWYod2luZG93V2lkdGggPiBicmVha3BvaW50KSB7XHJcbiAgICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICQodGhpcykuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKTtcclxuICAgICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJG1haW5OYXZUb2dnbGUuY2hpbGRyZW4oJ2J1dHRvbiwgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgbGV0ICRlbCA9ICQodGhpcyk7XHJcbiAgICAgIGxldCAkZWxQYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgICBsZXQgJGNvbnRlbnQgPSAkZWxQYXJlbnQuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKTtcclxuICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcbiAgICAgIGxldCBpc09wZW4gPSAkY29udGVudC5oYXNDbGFzcyhvcGVuQ2xhc3MpO1xyXG5cclxuICAgICAgLy8gbW9iaWxlXHJcbiAgICAgIGlmKHdpbmRvd1dpZHRoIDw9IGJyZWFrcG9pbnQpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gYWRkIG9wZW4gY2xhc3MgdG8gdGhpcyBpdGVtXHJcbiAgICAgICAgJGVsUGFyZW50LmFkZENsYXNzKG9wZW5DbGFzcyk7XHJcbiAgICAgICAgc2hvdygkY29udGVudCk7XHJcbiAgICAgICAgJGVsLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgICAkZWwuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xyXG5cclxuICAgICAgICBpZighaXNPcGVuKSB7XHJcbiAgICAgICAgICBzaG93KCRjb250ZW50KTtcclxuICAgICAgICAgICRlbC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJG1haW5OYXZUb2dnbGUubGFzdCgpXHJcbiAgICAgIC5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCBsaScpXHJcbiAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgLmZpbmQoJ2EnKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgLy8gcHJldmlvdXMga2V5IHdhcyBub3QgYSBzaGlmdFxyXG4gICAgICAgICAgICBpZihlLmtleUNvZGUgPT09IDkgJiYgcHJldmlvdXNLZXkgIT09IDE2KSB7ICAvLyB0YWIgYXJyb3dcXFxyXG4gICAgICAgICAgICAgIGxldCAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpO1xyXG4gICAgICAgICAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2aW91c0tleSA9IGUua2V5Q29kZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWNsb3NlLXN1Yi1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgJG9wZW5Db250ZW50ID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudC4nICsgb3BlbkNsYXNzKTtcclxuICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGlkZSBhbnkgb3BlbiBzdWJtZW51IGNvbnRlbnQgd2hlbiB0aGUgc2lkZWJhciBtZW51IGlzIGNsb3NlZFxyXG4gICAgJCgnLmpzLWhlYWRlci1tZW51LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICBsZXQgJG9wZW5Db250ZW50ID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudC4nICsgb3BlbkNsYXNzKTtcclxuICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZSgkY29udGVudCkge1xyXG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3Moc3VibWVudUNsYXNzKTtcclxuICAgICAgJHBhcmVudC5maW5kKFwiLlwiICsgb3BlbkNsYXNzKS5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpO1xyXG5cclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgICRjb250ZW50LmFkZENsYXNzKGNsb3NlQ2xhc3MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgLnN0b3AoIHRydWUsIHRydWUgKVxyXG4gICAgICAgIC5zbGlkZVVwKCdmYXN0JyxmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhjbG9zZUNsYXNzKVxyXG4gICAgICAgICAgICAuc2xpZGVEb3duKDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvdygkY29udGVudCkge1xyXG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3Moc3VibWVudUNsYXNzKTtcclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAuYWRkQ2xhc3Mob3BlbkNsYXNzKVxyXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKGNsb3NlQ2xhc3MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAuc3RvcCggdHJ1ZSwgdHJ1ZSApXHJcbiAgICAgICAgICAuZGVsYXkoIDIwMCApXHJcbiAgICAgICAgICAuc2xpZGVVcCgwLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkY29udGVudFxyXG4gICAgICAgICAgICAgIC5hZGRDbGFzcyhvcGVuQ2xhc3MpXHJcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNsb3NlQ2xhc3MpXHJcbiAgICAgICAgICAgICAgLnNsaWRlRG93bignZmFzdCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xuXG4gICQoJy5qcy1tYWluLW5hdicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLFxuICAgICAgJG1haW5OYXZUb2dnbGUgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi10b2dnbGUnKTtcblxuICAgIC8vIG1ha2Ugcm9vdCB0b3AtbGV2ZWwgbGlua3MgaW5lcnQgZm9yIHBpbG90XG4gICAgJG1haW5OYXZUb2dnbGUuY2hpbGRyZW4oJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyBFbnN1cmUgdG9wLWxldmVsIGxpbmtzIHRoYXQgYXJlIHBvdGVudGlhbCBhbmNob3IgbGlua3MgY2xvc2UgdGhlIHNpZGViYXIgb24gbW9iaWxlXG4gICAgJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtdG9wLWxpbmsnKS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKCcuanMtaGVhZGVyLW1lbnUtYnV0dG9uJykudHJpZ2dlcignY2xpY2snKTtcbiAgICB9KTtcblxuICB9KTtcblxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcblxuIiwiLy8gKioqKioqIE1lbnUgYnV0dG9uICoqKioqKlxyXG5sZXQgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtaGVhZGVyLW1lbnUtYnV0dG9uXCIpO1xyXG5cclxuaWYobnVsbCAhPT0gbWVudUJ1dHRvbil7XHJcbiAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tZW51XCIpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyAqKioqKiogTWFpbiBIZWFkZXIgU2VhcmNoIGJ1dHRvbiBvbiBtb2JpbGUgc2hvdWxkIG9wZW4gdGhlIG1vYmlsZSBtZW51ICAqKioqKipcclxubGV0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWhlYWRlci1zZWFyY2gtbWVudSAuanMtaGVhZGVyLXNlYXJjaC1mb3JtXCIpO1xyXG5cclxuaWYobnVsbCAhPT0gc2VhcmNoRm9ybSl7XHJcbiAgc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+IDYyMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbWVudVwiKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBnZXRUZW1wbGF0ZSBmcm9tIFwiLi4vaGVscGVycy9nZXRIYW5kbGViYXJUZW1wbGF0ZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG4gIFxyXG4gICQoJy5qcy1vcmctc2VsZWN0b3InKS5lYWNoKGZ1bmN0aW9uKGkpe1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyk7XHJcbiAgICBsZXQgZGF0YSA9IG9yZ1NlbGVjdG9yW2ldO1xyXG4gICAgbGV0IGNvbXBpbGVkVGVtcGxhdGUgPSBnZXRUZW1wbGF0ZSgnb3JnSW5mbycpO1xyXG4gICAgbGV0ICRzZWxlY3QgPSAkZWwuZmluZCgnc2VsZWN0JykuZmlyc3QoKTtcclxuICAgIGxldCAkcGxhY2Vob2xkZXIgPSAkZWwuZmluZCgnLmpzLW9yZy1pbmZvJyk7XHJcblxyXG4gICAgLy9yZW5kZXIgdGhlIHRlbXBsYXRlIGJhc2VkIG9uIHRoZSBjdXJyZW50IHZhbHVlXHJcbiAgICByZW5kZXJUZW1wbGF0ZSgkc2VsZWN0LnZhbCgpKTtcclxuXHJcbiAgICAvLyBXaGVuIHRoZSBzZWxlY3QgY2hhbmdlc1xyXG4gICAgJHNlbGVjdC5jaGFuZ2UoKCkgPT4ge1xyXG4gICAgICAvL3JlbmRlciB0aGUgdGVtcGxhdGUgYmFzZWQgb24gdGhlIG5ldyB2YWx1ZVxyXG4gICAgICByZW5kZXJUZW1wbGF0ZSgkc2VsZWN0LnZhbCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlbmRlciB0aGUgdGVtcGxhdGUgYmFzZWQgb24gdmFsdWVcclxuICAgIGZ1bmN0aW9uIHJlbmRlclRlbXBsYXRlKHZhbHVlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YoZGF0YS5vcmdhbml6YXRpb25zW3ZhbHVlXSkgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAkcGxhY2Vob2xkZXIuaHRtbChcIlwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRwbGFjZWhvbGRlci5odG1sKGNvbXBpbGVkVGVtcGxhdGUoZGF0YS5vcmdhbml6YXRpb25zW3ZhbHVlXSkpO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcbiAgXHJcbiAgJCgnLmpzLWlucHV0LWRhdGUnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgJGVsID0gJCh0aGlzKTtcclxuICAgIGxldCByZXN0cmljdCA9ICRlbC5kYXRhKCdyZXN0cmljdCcpO1xyXG4gICAgbGV0IHBpY2tlciA9IG5ldyBQaWthZGF5KHsgXHJcbiAgICAgIGZpZWxkOiB0aGlzLFxyXG4gICAgICBmb3JtYXQ6ICdNTS9ERC9ZWVlZJyxcclxuICAgIH0pO1xyXG5cclxuICAgIHN3aXRjaChyZXN0cmljdCkge1xyXG4gICAgICBjYXNlICdtYXgnOlxyXG4gICAgICAgIHBpY2tlci5zZXRNYXhEYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtaW4nOlxyXG4gICAgICAgIHBpY2tlci5zZXRNaW5EYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgICRlbC5hdHRyKCd0eXBlJywndGV4dCcpO1xyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xuXG4gICQoJy5qcy1tYS1yZXNwb25zaXZlLXZpZGVvJykuZml0VmlkcygpO1xuXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLW1hLXJpY2gtdGV4dCB0YWJsZScpLndyYXAoIFwiPGRpdiBjbGFzcz0nbWFfX3JpY2gtdGV4dF9fdGFibGUtd3JhcHBlcic+PC9kaXY+XCIgKTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiaW1wb3J0IGNoZWNrTW9iaWxlIGZyb20gXCIuLi9oZWxwZXJzL2Nzc0NvbnRyb2xDb2RlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoXCIuanMtc2Nyb2xsLWFuY2hvcnNcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICRlbFBhcmVudCA9ICRlbC5wYXJlbnQoKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdyZWxhdGl2ZScgPyAkZWwucGFyZW50KCkgOiAkZWwucGFyZW50KCkub2Zmc2V0UGFyZW50KCksXHJcbiAgICAgICAgJGxpbmtzID0gJGVsLmZpbmQoJy5qcy1zY3JvbGwtYW5jaG9ycy1saW5rJyksXHJcbiAgICAgICAgZWxIZWlnaHQsXHJcbiAgICAgICAgaGVhZGVyQnVmZmVyID0gMCxcclxuICAgICAgICBsb3dlckxpbWl0LFxyXG4gICAgICAgIHVwcGVyTGltaXQsXHJcbiAgICAgICAgZGVib3VuY2VUaW1lcixcclxuICAgICAgICBhY3RpdmVDbGFzcyA9IFwiaXMtYWN0aXZlXCIsXHJcbiAgICAgICAgYWN0aXZlQW5jaG9ySW5kZXggPSAwLFxyXG4gICAgICAgIGFuY2hvcnMgPSBbXSxcclxuICAgICAgICBudW1BbmNob3JzID0gMCxcclxuICAgICAgICBpc01vYmlsZSA9IGZhbHNlLFxyXG4gICAgICAgIGxpbmtTY3JvbGxpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBzZXRWYXJpYWJsZXMoKTtcclxuXHJcbiAgICAvLyBkZWZhdWx0IGFzc3VtcHRpb24gYXMgdG8gd2hlcmUgdGhlIHNjcmVlbiB3aWxsIGxvYWRcclxuICAgICRlbC5hdHRyKCdkYXRhLXN0aWNreScsJ3RvcCcpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB2YXJpYWJsZXMgb25lIG1vcmUgdGltZSB0byBjYXRjaCBhbnkgcG9zdCBwYWdlIGxvYWQgY2hhbmdlc1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgc2V0VmFyaWFibGVzKCk7XHJcbiAgICB9LDEwMDApO1xyXG5cclxuICAgICRsaW5rcy5vbignY2xpY2snLGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgLy8gaXMgdGhlIG1lbnUgY2xvc2VkIG9uIG1vYmlsZVxyXG4gICAgICBpZighJGVsLmhhc0NsYXNzKCdpcy1vcGVuJykgJiYgaXNNb2JpbGUpIHsgICAgIFxyXG4gICAgICAgIC8vIGp1c3Qgc2hvdyB0aGUgbWVudVxyXG4gICAgICAgICRlbC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgIGFjdGl2ZUFuY2hvckluZGV4ID0gJCh0aGlzKS5kYXRhKCdpbmRleCcpO1xyXG4gICAgICAvLyBmaW5kIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGVzaXJlZCBsaW5rIGFuZCBzY3JvbGwgdGhlIHBhZ2VcclxuICAgICAgbGV0IHBvc2l0aW9uID0gYW5jaG9yc1thY3RpdmVBbmNob3JJbmRleF0ucG9zaXRpb247XHJcbiAgICAgIC8vIGNsb3NlIHRoZSBtZW51XHJcbiAgICAgICRlbC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAvLyByZW1vdmUgYWN0aXZlIGZsYWcgZnJvbSBvdGhlciBsaW5rc1xyXG4gICAgICAkZWwuZmluZCgnLicgKyBhY3RpdmVDbGFzcykucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAvLyBtYXJrIHRoaXMgbGluayBhcyBhY3RpdmVcclxuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgIC8vIHByZXZlbnQgdGhlIHNjcm9sbCBldmVudCBmcm9tIHVwZGF0aW5nIGFjdGl2ZSBsaW5rc1xyXG4gICAgICBsaW5rU2Nyb2xsaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICQoXCJodG1sLGJvZHlcIikuc3RvcCh0cnVlLHRydWUpLmFuaW1hdGUoe3Njcm9sbFRvcDpwb3NpdGlvbn0sICc3NTAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxpbmtTY3JvbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyBHZXQgdGhlIGxpbmsgaGFzaCB0YXJnZXQgc28gd2UgY2FuIGJyaW5nIGZvY3VzIHRvIGl0XHJcbiAgICAgICAgbGV0IGhhc2ggPSBhbmNob3JzW2FjdGl2ZUFuY2hvckluZGV4XS5oYXNoO1xyXG4gICAgICAgIC8vIGJyaW5nIGZvY3VzIHRvIHRoZSBpdGVtIHdlIGp1c3Qgc2Nyb2xsZWQgdG9cclxuICAgICAgICAkKGhhc2gpLmZvY3VzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaWYgdGhlIGNvbnRlbnQgY29udGFpbnMgYWNjb3JkaW9ucywgXHJcbiAgICAvLyByZWFkanVzdCBzZXR0aW5ncyB3aGVuIHRoZXJlIHN0YXRlIGNoYW5nZXMuXHJcbiAgICAkKCcuanMtYWNjb3JkaW9uLWxpbmsnKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZih0eXBlb2YgZGVib3VuY2VUaW1lciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoZGVib3VuY2VUaW1lcik7XHJcbiAgICAgIH1cclxuICAgICAgZGVib3VuY2VUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2V0VmFyaWFibGVzKCk7XHJcbiAgICAgICAgc2V0UG9zaXRpb24oKTtcclxuICAgICAgICBhY3RpdmF0ZUxpbmsoKTtcclxuICAgICAgfSw0MDApO1xyXG4gICAgfSlcclxuXHJcbiAgICAkZWwuZmluZChcIi5qcy1zY3JvbGwtYW5jaG9ycy10b2dnbGVcIikub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcclxuICAgICAgJGVsLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBtYWtlIHRoZSBsaW5rcyBzdGlja3lcclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHR5cGVvZiBkZWJvdW5jZVRpbWVyID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChkZWJvdW5jZVRpbWVyKTtcclxuICAgICAgfVxyXG4gICAgICBkZWJvdW5jZVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICBzZXRWYXJpYWJsZXMoKTtcclxuICAgICAgICBzZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGFjdGl2YXRlTGluaygpO1xyXG4gICAgICB9LDMwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2V0UG9zaXRpb24oKTtcclxuICAgICAgYWN0aXZhdGVMaW5rKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRWYXJpYWJsZXMoKSB7XHJcbiAgICAgIGxldCB0b3BPZmZzZXQgPSAwO1xyXG5cclxuICAgICAgaGVhZGVyQnVmZmVyID0gMDtcclxuICAgICAgZWxIZWlnaHQgPSAkZWwub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgIHVwcGVyTGltaXQgPSAkZWxQYXJlbnQub2Zmc2V0KCkudG9wO1xyXG4gICAgICBpc01vYmlsZSA9IGNoZWNrTW9iaWxlKCRlbCk7XHJcblxyXG4gICAgICBpZigkZWxQYXJlbnRbMF0uaGFzQXR0cmlidXRlKFwic3R5bGVcIikgJiYgIWlzTW9iaWxlKSB7XHJcbiAgICAgICAgJGVsUGFyZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgIH1cclxuIFxyXG4gICAgICBpZihpc01vYmlsZSkge1xyXG4gICAgICAgIGhlYWRlckJ1ZmZlciA9ICQoJy5qcy1zdGlja3ktaGVhZGVyJykuaGVpZ2h0KCkgfHwgMDtcclxuICAgICAgICB1cHBlckxpbWl0IC09IGhlYWRlckJ1ZmZlcjtcclxuICAgICAgICB0b3BPZmZzZXQgPSBlbEhlaWdodDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG93ZXJMaW1pdCA9IHVwcGVyTGltaXQgKyAkZWxQYXJlbnQub3V0ZXJIZWlnaHQodHJ1ZSkgLSAkZWwuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAvLyBsb2NhdGUgdGhlIHBvc2l0aW9uIG9mIGFsbCBvZiB0aGUgYW5jaG9yIHRhcmdldHNcclxuICAgICAgYW5jaG9ycyA9IG5ldyBBcnJheTtcclxuICAgICAgJGxpbmtzLmVhY2goZnVuY3Rpb24oaSxlKXtcclxuICAgICAgICBsZXQgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICRsaW5rID0gJGVsLmlzKCdhJykgPyAkZWwgOiAkZWwuZmluZCgnYScpLFxyXG4gICAgICAgICAgaGFzaCA9ICRsaW5rWzBdLmhhc2gsXHJcbiAgICAgICAgICBwb3NpdGlvbiA9ICQoaGFzaCkub2Zmc2V0KCkgPyAkKGhhc2gpLm9mZnNldCgpLnRvcCAtIGhlYWRlckJ1ZmZlciAtIHRvcE9mZnNldCA6IHVwcGVyTGltaXQ7XHJcblxyXG4gICAgICAgIGFuY2hvcnNbaV0gPSB7IGhhc2gsIHBvc2l0aW9uIH07XHJcblxyXG4gICAgICAgICRlbC5kYXRhKCdpbmRleCcsaSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gcmVjb3JkIHRoZSBudW1iZXIgb2YgYW5jaG9ycyBmb3IgcGVyZm9ybWFuY2VcclxuICAgICAgbnVtQW5jaG9ycyA9IGFuY2hvcnMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBvc2l0aW9uKCkge1xyXG4gICAgICBsZXQgd2luZG93VG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgYXR0ciA9ICRlbC5hdHRyKCdkYXRhLXN0aWNreScpLFxyXG4gICAgICAgICAgdG9wID0gYXR0ciAhPT0gJ3RvcCcgJiYgd2luZG93VG9wIDw9IHVwcGVyTGltaXQsIFxyXG4gICAgICAgICAgbWlkZGxlID0gYXR0ciAhPT0gJ21pZGRsZScgJiYgd2luZG93VG9wIDwgbG93ZXJMaW1pdCAmJiB3aW5kb3dUb3AgPiB1cHBlckxpbWl0LFxyXG4gICAgICAgICAgYm90dG9tID0gYXR0ciAhPT0gJ2JvdHRvbScgJiYgd2luZG93VG9wID49IGxvd2VyTGltaXQ7XHJcbiAgICAgIFxyXG4gICAgICBpZigkZWxQYXJlbnRbMF0uaGFzQXR0cmlidXRlKFwic3R5bGVcIikgJiYgIWlzTW9iaWxlKSB7XHJcbiAgICAgICAgJGVsUGFyZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKCEkZWxQYXJlbnRbMF0uaGFzQXR0cmlidXRlKFwic3R5bGVcIikgJiYgaXNNb2JpbGUgJiYgYXR0ciA9PT0gJ21pZGRsZScpIHtcclxuICAgICAgICAkZWxQYXJlbnQuY3NzKHsncGFkZGluZ1RvcCc6ZWxIZWlnaHR9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYodG9wKSB7XHJcbiAgICAgICAgJGVsLmF0dHIoJ2RhdGEtc3RpY2t5JywndG9wJyk7XHJcblxyXG4gICAgICAgIGlmKGlzTW9iaWxlKXtcclxuICAgICAgICAgICRlbFBhcmVudC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAobWlkZGxlKSB7XHJcbiAgICAgICAgJGVsLmF0dHIoJ2RhdGEtc3RpY2t5JywnbWlkZGxlJyk7XHJcblxyXG4gICAgICAgIGlmKGlzTW9iaWxlKXtcclxuICAgICAgICAgICRlbFBhcmVudC5jc3MoeydwYWRkaW5nVG9wJzplbEhlaWdodH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgICAgZWxzZSBpZiAoYm90dG9tKSB7XHJcbiAgICAgICAgJGVsLmF0dHIoJ2RhdGEtc3RpY2t5JywnYm90dG9tJyk7XHJcblxyXG4gICAgICAgIGlmKGlzTW9iaWxlKXtcclxuICAgICAgICAgICRlbFBhcmVudC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlTGluaygpIHtcclxuICAgICAgLy8gZG8gd2UgaGF2ZSBtb3JlIHRoYW4gb25lIGFuY2hvclxyXG4gICAgICBpZihudW1BbmNob3JzIDwgMiB8fCBsaW5rU2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGFuZCBvZmZzZXQgYnkgaGFsZiB0aGUgdmlldyBwb3J0XHJcbiAgICAgIGxldCB3aW5kb3dUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAod2luZG93LmlubmVySGVpZ2h0LzIpLFxyXG4gICAgICAgICAgY3VycmVudEFuY2hvciA9IGFjdGl2ZUFuY2hvckluZGV4O1xyXG4gICAgICBcclxuICAgICAgLy8gaXMgdGhlcmUgYSBwcmV2IHRhcmdldFxyXG4gICAgICAvLyBhbmQgXHJcbiAgICAgIC8vIGlzIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBhYm92ZSB0aGUgY3VycmVudCB0YXJnZXRcclxuICAgICAgaWYoY3VycmVudEFuY2hvciA+IDAgJiYgd2luZG93VG9wIDwgYW5jaG9yc1thY3RpdmVBbmNob3JJbmRleF0ucG9zaXRpb24pIHsgXHJcbiAgICAgICAgLy8gbWFrZSB0aGUgcHJldiBsaW5rIGFjdGl2ZVxyXG4gICAgICAgIC0tYWN0aXZlQW5jaG9ySW5kZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlzIHRoZXJlIGEgbmV4dCB0YXJnZXRcclxuICAgICAgLy8gYW5kXHJcbiAgICAgIC8vIGlzIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBiZWxvdyB0aGUgbmV4dCB0YXJnZXRcclxuICAgICAgZWxzZSBpZihjdXJyZW50QW5jaG9yIDwgbnVtQW5jaG9ycy0xICYmIHdpbmRvd1RvcCA+IGFuY2hvcnNbYWN0aXZlQW5jaG9ySW5kZXgrMV0ucG9zaXRpb24pIHsgXHJcbiAgICAgICAgLy8gbWFrZSB0aGUgbmV4dCBsaW5rIGFjdGl2ZVxyXG4gICAgICAgICsrYWN0aXZlQW5jaG9ySW5kZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjdXJyZW50QW5jaG9yICE9PSBhY3RpdmVBbmNob3JJbmRleCkge1xyXG4gICAgICAgIC8vIG1vdmUgdGhlIGFjdGl2ZSBmbGFnXHJcbiAgICAgICAgJGVsLmZpbmQoJy4nICsgYWN0aXZlQ2xhc3MpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAkbGlua3MuZXEoYWN0aXZlQW5jaG9ySW5kZXgpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLXV0aWwtbmF2JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIGxldCBvcGVuQ2xhc3MgPSBcImlzLW9wZW5cIixcclxuICAgICAgICBjbG9zZUNsYXNzID0gXCJpcy1jbG9zZWRcIixcclxuICAgICAgICBzdWJtZW51Q2xhc3MgPSBcInNob3ctdXRpbG1lbnVcIixcclxuICAgICAgICAkcGFyZW50ID0gJCh0aGlzKSxcclxuICAgICAgICB3YWl0Rm9ySXQgPSBudWxsO1xyXG5cclxuICAgICQoJy5qcy1jbG9zZS1zdWItbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLXV0aWwtbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcbiAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgICRwYXJlbnQuZmluZCgnLmpzLXV0aWwtbmF2LXRvZ2dsZSA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudGRlZmF1bHQ7XHJcblxyXG4gICAgICBsZXQgb3BlbiA9ICQodGhpcykuaGFzQ2xhc3Mob3BlbkNsYXNzKSxcclxuICAgICAgICAkY29udGVudCA9ICQodGhpcykubmV4dCgnLmpzLXV0aWwtbmF2LWNvbnRlbnQnKSxcclxuICAgICAgICAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy11dGlsLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpO1xyXG5cclxuICAgICAgLy8gaGlkZSBvdGhlciBjb250ZW50XHJcbiAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgXHJcbiAgICAgIGlmKG9wZW4pIHsgXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGFkZCBvcGVuIGNsYXNzIHRvIHRoaXMgaXRlbVxyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKG9wZW5DbGFzcyk7XHJcbiAgICAgIC8vIGFkZCBvcGVuIGNsYXNzIHRvIHRoZSBjb3JyZWN0IGNvbnRlbnQgYmFzZWQgb24gaW5kZXhcclxuICAgICAgJGNvbnRlbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJmYWxzZVwiKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkY29udGVudFxyXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKGNsb3NlQ2xhc3MpXHJcbiAgICAgICAgICAuYWRkQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3Moc3VibWVudUNsYXNzKVxyXG4gICAgICB9LCAuMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkcGFyZW50LmZpbmQoJy5qcy1jbG9zZS11dGlsLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0O1xyXG5cclxuICAgICAgaGlkZSggJCh0aGlzKS5jbG9zZXN0KCcuanMtdXRpbC1uYXYtY29udGVudCcpICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuanMtY2xvc2Utc3ViLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy11dGlsLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpO1xyXG4gICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlKCRjb250ZW50KSB7XHJcbiAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcyhzdWJtZW51Q2xhc3MpXHJcbiAgICAgICRwYXJlbnQuZmluZChcIi5cIiArIG9wZW5DbGFzcykucmVtb3ZlQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgJGNvbnRlbnRcclxuICAgICAgICAucmVtb3ZlQ2xhc3Mob3BlbkNsYXNzKVxyXG4gICAgICAgIC5hZGRDbGFzcyhjbG9zZUNsYXNzKTtcclxuXHJcbiAgICAgIGlmKHdhaXRGb3JJdCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh3YWl0Rm9ySXQpO1xyXG4gICAgICB9XHJcbiAgICAgIHdhaXRGb3JJdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkY29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIixcInRydWVcIik7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7XHJcbiJdfQ==