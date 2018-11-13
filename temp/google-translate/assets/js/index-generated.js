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
"use strict";

var externalUrlCheck = (function () {
        var domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
        return function (url) {

                if (!url.length || url[0] === "#") {
                        return false;
                }

                function domain(url) {
                        return domainRe.exec(url)[1];
                }

                return domain(location.href) !== domain(url);
        };
})();

module.exports = externalUrlCheck;

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function (name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
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
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _modulesAccordionsJs = require("./modules/accordions.js");

var _modulesAccordionsJs2 = _interopRequireDefault(_modulesAccordionsJs);

var _modulesActionMapJs = require("./modules/actionMap.js");

var _modulesActionMapJs2 = _interopRequireDefault(_modulesActionMapJs);

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

var _modulesMainNavJs = require("./modules/mainNav.js");

var _modulesMainNavJs2 = _interopRequireDefault(_modulesMainNavJs);

var _modulesMainNavPilotJs = require("./modules/mainNavPilot.js");

var _modulesMainNavPilotJs2 = _interopRequireDefault(_modulesMainNavPilotJs);

var _modulesMobileNavJs = require("./modules/mobileNav.js");

var _modulesMobileNavJs2 = _interopRequireDefault(_modulesMobileNavJs);

var _modulesResponsiveVideoJs = require("./modules/responsiveVideo.js");

var _modulesResponsiveVideoJs2 = _interopRequireDefault(_modulesResponsiveVideoJs);

var _modulesRichTextJs = require("./modules/richText.js");

var _modulesRichTextJs2 = _interopRequireDefault(_modulesRichTextJs);

var _modulesScrollAnchorsJs = require("./modules/scrollAnchors.js");

var _modulesScrollAnchorsJs2 = _interopRequireDefault(_modulesScrollAnchorsJs);

var _modulesSiteSettingsJs = require("./modules/siteSettings.js");

var _modulesSiteSettingsJs2 = _interopRequireDefault(_modulesSiteSettingsJs);

var _modulesUtilNavJs = require("./modules/utilNav.js");

var _modulesUtilNavJs2 = _interopRequireDefault(_modulesUtilNavJs);

var _modulesZoomControlsJs = require("./modules/zoomControls.js");

var _modulesZoomControlsJs2 = _interopRequireDefault(_modulesZoomControlsJs);

},{"./modules/accordions.js":5,"./modules/actionMap.js":6,"./modules/back2top.js":7,"./modules/bannerCarousel.js":8,"./modules/clickable.js":9,"./modules/dropdown.js":10,"./modules/emergencyAlerts.js":11,"./modules/formValidation.js":12,"./modules/hideAlert.js":13,"./modules/keywordSearch.js":14,"./modules/mainNav.js":15,"./modules/mainNavPilot.js":16,"./modules/mobileNav.js":17,"./modules/responsiveVideo.js":18,"./modules/richText.js":19,"./modules/scrollAnchors.js":20,"./modules/siteSettings.js":21,"./modules/utilNav.js":22,"./modules/zoomControls.js":23}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-accordion').each(function () {
    var $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        active = refreshValue($el);

    $link.on('click', function (e) {
      if (active) {
        e.preventDefault();
        if ($el.hasClass('is-open')) {
          $content.stop(true, true).slideUp();
        } else {
          $content.stop(true, true).slideDown();
        }
        $el.toggleClass('is-open');
      }
    });

    $(window).resize(function () {
      var temp = refreshValue($el);

      if (temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
      }

      active = temp;
    }).resize();
  });

  function refreshValue($el) {
    var value = "true";
    try {
      value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
    } catch (err) {}
    return value === "false" ? false : true;
  };
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
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
      // get the maps data
      var rawData = googleMapData[i];

      // *** Create the Map *** //
      // map defaults
      var initMapData = {
        scrollwheel: false
      };
      // create map Data
      var mapData = Object.assign({}, rawData.map, initMapData);

      var map = new google.maps.Map(this, mapData);

      // *** Add Markers with popups *** //
      rawData.markers.forEach(function (d) {
        var markerData = Object.assign({ map: map }, d);

        var marker = new google.maps.Marker(markerData);

        var infoData = infoTransform(markerData.infoWindow);
        var template = compiledTemplate(infoData);
        var infoWindow = new google.maps.InfoWindow({
          content: template
        });

        marker.addListener('click', function () {
          infoWindow.open(map, marker);
        });
      });

      // let infoWindow = new google.maps.InforWindow
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

},{"../helpers/getHandlebarTemplate.js":3}],7:[function(require,module,exports){
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

  $('.js-emergency-alerts').each(function () {
    var $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = _helpersCookiesJs2['default'].getCookie(cookieName);

    if (typeof cookieValue != 'undefined' && cookieValue === 'false') {
      // cookieValue is a string so we can't use the value directly
      open = false;
    }
    if (open) {
      // expand the menu
      $el.find('.js-accordion-link').trigger('click');
    }

    $el.on('click', '.js-accordion-link', function () {
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      _helpersCookiesJs2['default'].setCookie(cookieName, open);
    });
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

},{"../helpers/cookies.js":1}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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
          focusIndexInDropdown = $dropdownLinks.index($focusedElement);

      // down arrow key
      if (e.keyCode === 40) {
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
          $link.addClass(openClass);
          if ($dropdownLinks[1]) {
            $dropdownLinks[1].focus();
          }
          return;
        }
      }

      if (e.keyCode === 38) {
        // up arrow
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
            $topLevelLink.focus();
            return;
          } else {
            $dropdownLinks[focusIndexInDropdown - 1].focus();
            return;
          }
        } else {
          show($topLevelItem.find('.js-main-nav-content'));
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
        $topLevelLink.focus();
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

      // hide content
      hide($openContent);
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      show($link.find('.js-main-nav-content'));
    });
    $mainNavItems.on('mouseenter', function (e) {
      if (windowWidth > breakpoint) {
        var $openContent = $(this).find('.js-main-nav-content');
        show($openContent);
      }
    });
    $mainNavItems.on('mouseleave', function (e) {
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
      } else {
        hide($openContent);

        if (!isOpen) {
          show($content);
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-ma-responsive-video').fitVids();
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersExternalUrlCheckJs = require("../helpers/externalUrlCheck.js");

var _helpersExternalUrlCheckJs2 = _interopRequireDefault(_helpersExternalUrlCheckJs);

exports["default"] = (function (window, document, $, undefined) {

  $('.js-ma-rich-text table').wrap("<div class='ma__rich-text__table-wrapper'></div>");

  // get the external SVG link code
  fetch(themePath + '/images/svg-sprite/external-link.svg', {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    // find all external links that need an icon
    $('.js-ma-rich-text a').each(function () {
      var $el = $(this),
          href = $el.attr('href');

      if ((0, _helpersExternalUrlCheckJs2["default"])(href) && !$el.children().length) {
        // wrap the link in a span tag
        $el.wrap('<span class="ma__decorative-link"></span>');
        // append the SVG to the link
        $el.append('&nbsp;' + data);
      }
    });
  })["catch"](function (e) {
    console.error('external link rte code failing');
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{"../helpers/externalUrlCheck.js":2}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $(".js-scroll-anchors").each(function () {
    var $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        elHeight = undefined,
        headerBuffer = 0,
        lowerLimit = undefined,
        upperLimit = undefined,
        debounceTimer = undefined,
        activeClass = "is-active",
        activeAnchor = 0,
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

    $el.find('a').on('click', function (e) {
      e.preventDefault();

      // is the menu closed on mobile
      if (!$el.hasClass('is-open') && isMobile) {
        // just show the menu
        $el.addClass('is-open');
        return;
      }

      // find the location of the desired link and scroll the page
      var position = anchors[$(this).data('index')].position;
      // close the menu
      $el.removeClass('is-open');
      // remove active flag from other links
      $el.find('.' + activeClass).removeClass(activeClass);
      // mark this link as active
      $(this).addClass(activeClass);
      activeAnchor = $(this).data('index');
      // prevent the scroll event from updating active links
      linkScrolling = true;

      $("html,body").stop(true, true).animate({ scrollTop: position }, '750', function () {
        linkScrolling = false;
      });
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
      elHeight = $el.height();
      upperLimit = $elParent.offset().top;
      isMobile = checkMobile($el);

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
      $el.find('a').each(function (i, e) {
        var hash = this.hash,
            position = $(hash).offset() ? $(hash).offset().top - headerBuffer - topOffset : upperLimit;

        anchors[i] = { hash: hash, position: position };

        $(this).data('index', i);
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
          currentAnchor = activeAnchor;

      // is there a prev target
      // and
      // is the current scroll position above the current target
      if (currentAnchor > 0 && windowTop < anchors[activeAnchor].position) {
        // make the prev link active
        --activeAnchor;
      }

      // is there a next target
      // and
      // is the current scroll position below the next target
      else if (currentAnchor < numAnchors - 1 && windowTop > anchors[activeAnchor + 1].position) {
          // make the next link active
          ++activeAnchor;
        }

      if (currentAnchor !== activeAnchor) {
        // move the active flag
        $el.find('.' + activeClass).removeClass(activeClass);
        $el.find('a').eq(activeAnchor).addClass(activeClass);
      }
    }
  });

  function checkMobile($el) {
    var value = "true";
    try {
      value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
    } catch (err) {}
    return value === "false" ? false : true;
  };
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-site-setting-form').each(function () {
    var $parent = $(this),
        $reset = $parent.find('.js-button-reset'),
        $themeSelect = $parent.find('.js-site-settings-theme select'),
        $langSelect = $parent.find('.js-site-settings-lang select'),
        $zoomControls = $parent.find('.js-zoom-controls'),
        defaultZoomVal = $zoomControls.find('input[type="radio"]:checked').val(),
        cookieName = "site-settings",
        cookieExpires = 365,
        cookieValue = JSON.parse(_helpersCookiesJs2['default'].getCookie(cookieName) || "{}");

    // set default values to match cookie values
    if (typeof cookieValue.zoom !== "undefined") {
      $zoomControls.find('input[value="' + cookieValue.zoom + '"]').prop('checked', true);
      $zoomControls.trigger('reset');
    }

    if (typeof cookieValue.theme !== "undefined") {
      $themeSelect.val(cookieValue.theme).trigger('change');
      $('body').attr('data-theme', cookieValue.theme);
    }

    if (typeof cookieValue.lang !== "undefined") {
      $langSelect.val(cookieValue.lang).trigger('change');
      $('html').attr('lang', cookieValue.lang);
    }

    $zoomControls.find('input[type="radio"]').on('change', function () {
      cookieValue.zoom = $(this).val();
      updateCookie();
    });

    $themeSelect.on('change', function () {
      cookieValue.theme = $(this).val();
      updateCookie();
      $('body').attr('data-theme', cookieValue.theme);
    });

    $langSelect.on('change', function () {
      cookieValue.lang = $(this).val();
      updateCookie();
      $('html').attr('lang', cookieValue.lang);
    });

    $reset.on("click", function (e) {
      cookieValue.zoom = defaultZoomVal;
      updateCookie();
      // trigger a reset of the custom form input JS
      setTimeout(function () {
        $zoomControls.trigger('reset');
        $parent.find('select').trigger('change');
      }, .1);
    });

    function updateCookie() {
      _helpersCookiesJs2['default'].setCookie(cookieName, JSON.stringify(cookieValue), cookieExpires);
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  // zoom controls updates/adds a data-zoom attribute to the html tag
  // with the desired level of zooming requeted.  CSS applies a scale
  // transform based on that value.

  $(".js-zoom-controls").each(function () {

    var $parent = $(this),
        $inputs = $(this).find('input[type="radio"]');

    $('html').attr("data-zoom", getCurrentValue());

    $inputs.on('change', function () {
      $('html').attr("data-zoom", $(this).val());
    });

    $parent.on('reset', function () {
      $('html').attr("data-zoom", getCurrentValue());
    });

    function getCurrentValue() {
      return $parent.find('input[type="radio"]:checked').val();
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}]},{},[4])

//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9oZWxwZXJzL2Nvb2tpZXMuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9oZWxwZXJzL2V4dGVybmFsVXJsQ2hlY2suanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9oZWxwZXJzL2dldEhhbmRsZWJhclRlbXBsYXRlLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvaW5kZXguanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2FjY29yZGlvbnMuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2FjdGlvbk1hcC5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvYmFjazJ0b3AuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2Jhbm5lckNhcm91c2VsLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9jbGlja2FibGUuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2Ryb3Bkb3duLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9lbWVyZ2VuY3lBbGVydHMuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2Zvcm1WYWxpZGF0aW9uLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9oaWRlQWxlcnQuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2tleXdvcmRTZWFyY2guanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL21haW5OYXYuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL21haW5OYXZQaWxvdC5qcyIsIkM6L3NhbmRib3hlcy9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvbW9iaWxlTmF2LmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9yZXNwb25zaXZlVmlkZW8uanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL3JpY2hUZXh0LmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9zY3JvbGxBbmNob3JzLmpzIiwiQzovc2FuZGJveGVzL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9zaXRlU2V0dGluZ3MuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL3V0aWxOYXYuanMiLCJDOi9zYW5kYm94ZXMvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL3pvb21Db250cm9scy5q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TSxFQUFDLFFBQVEsRUFBQyxNQUFNLENBQUM7O0FBQUEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCl7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIGZ1bmN0aW9uIHNldENvb2tpZShuYW1lLCB2YWx1ZSwgZXhwaXJlcykge1xyXG4gICAgaWYodHlwZW9mKGV4cGlyZXMpID09PSAnbnVtYmVyJykge1xyXG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArIChleHBpcmVzKjI0KjYwKjYwKjEwMDApKTtcclxuICAgICAgdmFyIGV4cGlyZXMgPSBcImV4cGlyZXM9XCIrZC50b1VUQ1N0cmluZygpO1xyXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIFwiOyBcIiArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIFwiOyBwYXRoPS9cIjtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xyXG4gICAgdmFyIHZhbHVlID0gXCI7IFwiICsgZG9jdW1lbnQuY29va2llO1xyXG4gICAgdmFyIHBhcnRzID0gdmFsdWUuc3BsaXQoXCI7IFwiICsgbmFtZSArIFwiPVwiKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMikgcmV0dXJuIHBhcnRzLnBvcCgpLnNwbGl0KFwiO1wiKS5zaGlmdCgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldENvb2tpZSxcclxuICAgIGdldENvb2tpZVxyXG4gIH07XHJcblxyXG59KHdpbmRvdywgZG9jdW1lbnQpO1xyXG5cclxuIiwidmFyIGV4dGVybmFsVXJsQ2hlY2sgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBkb21haW5SZSA9IC9odHRwcz86XFwvXFwvKCg/OltcXHdcXGQtXStcXC4pK1tcXHdcXGRdezIsfSkvaTtcclxuICAgIHJldHVybiBmdW5jdGlvbih1cmwpIHtcclxuXHJcbiAgICAgICAgaWYgKCF1cmwubGVuZ3RoIHx8IHVybFswXSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRvbWFpbih1cmwpIHtcclxuICAgICAgICAgIHJldHVybiBkb21haW5SZS5leGVjKHVybClbMV07ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkb21haW4obG9jYXRpb24uaHJlZikgIT09IGRvbWFpbih1cmwpO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlcm5hbFVybENoZWNrOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSkge1xyXG4gIGlmIChIYW5kbGViYXJzLnRlbXBsYXRlcyA9PT0gdW5kZWZpbmVkIHx8IEhhbmRsZWJhcnMudGVtcGxhdGVzW25hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgJC5hamF4KHtcclxuICAgICAgICAgIHVybCA6IHRoZW1lUGF0aCArICcvanMvdGVtcGxhdGVzLycgKyBuYW1lICsgJy5odG1sJyxcclxuICAgICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgaWYgKEhhbmRsZWJhcnMudGVtcGxhdGVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgSGFuZGxlYmFycy50ZW1wbGF0ZXMgPSB7fTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgSGFuZGxlYmFycy50ZW1wbGF0ZXNbbmFtZV0gPSBIYW5kbGViYXJzLmNvbXBpbGUoZGF0YSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYXN5bmMgOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIEhhbmRsZWJhcnMudGVtcGxhdGVzW25hbWVdO1xyXG59O1xyXG4iLCJpbXBvcnQgYWNjb3JkaW9ucyAgICAgICBmcm9tIFwiLi9tb2R1bGVzL2FjY29yZGlvbnMuanNcIjtcbmltcG9ydCBhY3Rpb25NYXAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvYWN0aW9uTWFwLmpzXCI7XG5pbXBvcnQgYmFjazJ0b3AgICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL2JhY2sydG9wLmpzXCI7XG5pbXBvcnQgYmFubmVyQ2Fyb3VzZWwgICBmcm9tIFwiLi9tb2R1bGVzL2Jhbm5lckNhcm91c2VsLmpzXCI7XG5pbXBvcnQgY2xpY2thYmxlICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL2NsaWNrYWJsZS5qc1wiO1xuaW1wb3J0IGRyb3Bkb3duICAgICAgICAgZnJvbSBcIi4vbW9kdWxlcy9kcm9wZG93bi5qc1wiO1xuaW1wb3J0IGVtZXJnZW5jeUFsZXJ0cyAgZnJvbSBcIi4vbW9kdWxlcy9lbWVyZ2VuY3lBbGVydHMuanNcIjtcbmltcG9ydCBmb3JtVmFsaWRhdGlvbiAgIGZyb20gXCIuL21vZHVsZXMvZm9ybVZhbGlkYXRpb24uanNcIjtcbmltcG9ydCBoaWRlQWxlcnQgICAgICAgIGZyb20gXCIuL21vZHVsZXMvaGlkZUFsZXJ0LmpzXCI7XG5pbXBvcnQga2V5d29yZFNlYXJjaCAgICBmcm9tIFwiLi9tb2R1bGVzL2tleXdvcmRTZWFyY2guanNcIjtcbmltcG9ydCBtYWluTmF2ICAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvbWFpbk5hdi5qc1wiO1xuaW1wb3J0IG1haW5OYXZQaWxvdCAgICAgZnJvbSBcIi4vbW9kdWxlcy9tYWluTmF2UGlsb3QuanNcIjtcbmltcG9ydCBtb2JpbGVOYXYgICAgICAgIGZyb20gXCIuL21vZHVsZXMvbW9iaWxlTmF2LmpzXCI7XG5pbXBvcnQgcmVzcG9uc2l2ZVZpZGVvICBmcm9tIFwiLi9tb2R1bGVzL3Jlc3BvbnNpdmVWaWRlby5qc1wiO1xuaW1wb3J0IHJpY2hUZXh0ICAgICAgICAgZnJvbSBcIi4vbW9kdWxlcy9yaWNoVGV4dC5qc1wiO1xuaW1wb3J0IHNjcm9sbEFuY2hvcnMgICAgZnJvbSBcIi4vbW9kdWxlcy9zY3JvbGxBbmNob3JzLmpzXCI7XG5pbXBvcnQgc2l0ZVNldHRpbmdzICAgICBmcm9tIFwiLi9tb2R1bGVzL3NpdGVTZXR0aW5ncy5qc1wiO1xuaW1wb3J0IHV0aWxOYXYgICAgICAgICAgZnJvbSBcIi4vbW9kdWxlcy91dGlsTmF2LmpzXCI7XG5pbXBvcnQgem9vbUNvbnRyb2xzICAgICBmcm9tIFwiLi9tb2R1bGVzL3pvb21Db250cm9scy5qc1wiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCcuanMtYWNjb3JkaW9uJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgJGxpbmsgPSAkZWwuZmluZCgnLmpzLWFjY29yZGlvbi1saW5rJyksXHJcbiAgICAgICAgJGNvbnRlbnQgPSAkZWwuZmluZCgnLmpzLWFjY29yZGlvbi1jb250ZW50JyksXHJcbiAgICAgICAgYWN0aXZlID0gcmVmcmVzaFZhbHVlKCRlbCk7XHJcblxyXG4gICAgJGxpbmsub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgaWYoYWN0aXZlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmKCRlbC5oYXNDbGFzcygnaXMtb3BlbicpKXtcclxuICAgICAgICAgICRjb250ZW50LnN0b3AodHJ1ZSx0cnVlKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRjb250ZW50LnN0b3AodHJ1ZSx0cnVlKS5zbGlkZURvd24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGVsLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCB0ZW1wID0gcmVmcmVzaFZhbHVlKCRlbCk7XHJcblxyXG4gICAgICBpZih0ZW1wICE9PSBhY3RpdmUgJiYgIXRlbXApIHtcclxuICAgICAgICAkY29udGVudC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICRlbC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhY3RpdmUgPSB0ZW1wO1xyXG4gICAgfSkucmVzaXplKCk7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHJlZnJlc2hWYWx1ZSgkZWwpIHtcclxuICAgIGxldCB2YWx1ZSA9IFwidHJ1ZVwiO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFsdWUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSgkZWxbMF0sICc6YmVmb3JlJykuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpLnJlcGxhY2UoL1xcXCIvZywgJycpO1xyXG4gICAgfSBjYXRjaChlcnIpIHt9XHJcbiAgICByZXR1cm4gdmFsdWUgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZTtcclxuICB9O1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJpbXBvcnQgZ2V0VGVtcGxhdGUgZnJvbSBcIi4uL2hlbHBlcnMvZ2V0SGFuZGxlYmFyVGVtcGxhdGUuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgLy8gb25seSBydW4gdGhpcyBjb2RlIGlmIHRoZXJlIGlzIGEgZ29vZ2xlIG1hcCBjb21wb25lbnQgb24gdGhlIHBhZ2VcclxuICBpZighJCgnLmpzLWdvb2dsZS1tYXAnKS5sZW5ndGggfHwgdHlwZW9mIGdvb2dsZU1hcERhdGEgPT09ICd1bmRlZmluZWQnKXtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxldCBjb21waWxlZFRlbXBsYXRlID0gZ2V0VGVtcGxhdGUoJ2dvb2dsZU1hcEluZm8nKTtcclxuXHJcbiAgLy8gYWZ0ZXIgdGhlIGFwaSBpcyBsb2FkZWQgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWRcclxuICB3aW5kb3cuaW5pdE1hcCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICQoXCIuanMtZ29vZ2xlLW1hcFwiKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgLy8gZ2V0IHRoZSBtYXBzIGRhdGFcclxuICAgICAgbGV0IHJhd0RhdGEgPSBnb29nbGVNYXBEYXRhW2ldO1xyXG4gICAgICBcclxuICAgICAgLy8gKioqIENyZWF0ZSB0aGUgTWFwICoqKiAvL1xyXG4gICAgICAvLyBtYXAgZGVmYXVsdHNcclxuICAgICAgbGV0IGluaXRNYXBEYXRhID0ge1xyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIC8vIGNyZWF0ZSBtYXAgRGF0YVxyXG4gICAgICBsZXQgbWFwRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHJhd0RhdGEubWFwLCBpbml0TWFwRGF0YSk7XHJcblxyXG4gICAgICBsZXQgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLCBtYXBEYXRhKTtcclxuXHJcbiAgICAgIC8vICoqKiBBZGQgTWFya2VycyB3aXRoIHBvcHVwcyAqKiogLy9cclxuICAgICAgcmF3RGF0YS5tYXJrZXJzLmZvckVhY2goZnVuY3Rpb24oZCl7XHJcbiAgICAgICAgbGV0IG1hcmtlckRhdGEgPSBPYmplY3QuYXNzaWduKHttYXB9LGQpO1xyXG5cclxuICAgICAgICBsZXQgbWFya2VyID0gIG5ldyBnb29nbGUubWFwcy5NYXJrZXIobWFya2VyRGF0YSk7XHJcblxyXG4gICAgICAgIGxldCBpbmZvRGF0YSA9IGluZm9UcmFuc2Zvcm0obWFya2VyRGF0YS5pbmZvV2luZG93KTtcclxuICAgICAgICBsZXQgdGVtcGxhdGUgPSBjb21waWxlZFRlbXBsYXRlKGluZm9EYXRhKTtcclxuICAgICAgICBsZXQgaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcclxuICAgICAgICAgIGNvbnRlbnQ6IHRlbXBsYXRlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgaW5mb1dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBsZXQgaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvcldpbmRvd1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbmZvVHJhbnNmb3JtKGRhdGEpIHtcclxuICAgIGxldCBpbmZvRGF0YSA9IHtcclxuICAgICAgcGhvbmVGb3JtYXR0ZWQ6IGZvcm1hdFBob25lKGRhdGEucGhvbmUpLFxyXG4gICAgICBmYXhGb3JtYXR0ZWQ6IGZvcm1hdFBob25lKGRhdGEuZmF4KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sZGF0YSxpbmZvRGF0YSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmb3JtYXRQaG9uZShwaG9uZSkge1xyXG4gICAgbGV0IHBob25lVGVtcCA9IHBob25lWzBdID09PSAnMScgPyBwaG9uZS5zdWJzdHJpbmcoMSkgOiBwaG9uZTtcclxuICAgIHJldHVybiBwaG9uZVRlbXAucmVwbGFjZSgvKFxcZHszfSkoXFxkezN9KShcXGR7NH0pLywgJygkMSkgJDItJDMnKTtcclxuICB9XHJcblxyXG4gIC8vIGxvYWQgR29vZ2xlJ3MgYXBpXHJcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0LnNyYyA9IFwiLy9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lDLVdJb05mUzZmaDdUT3RPcXBERWdLU1QtV19OQmViVGsmY2FsbGJhY2s9aW5pdE1hcFwiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuICBsZXQgJGZvb3RlciA9ICQoJy5qcy1mb290ZXInKSxcclxuICAgICAgdmlzaWJsZVRocmVzaG9sZCA9IDI1MCxcclxuICAgICAgc3RhdGljVGhyZXNob2xkID0gNTA7XHJcblxyXG4gICQoXCIuanMtYmFjazJ0b3BcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpO1xyXG5cclxuICAgICRlbC5vbignY2xpY2snLGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLnN0b3AodHJ1ZSx0cnVlKS5hbmltYXRlKHtzY3JvbGxUb3A6MH0sICc3NTAnKTtcclxuICAgICAgfSBcclxuICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICQoJ2JvZHknKS5zY3JvbGxUb3AoMCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQnJpbmcga2V5Ym9hcmQgZm9jdXMgYmFjayB0byB0b3AgYXMgd2VsbC5cclxuICAgICAgJChcIiNtYWluLWNvbnRlbnRcIikuZm9jdXMoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgLy8gaWYgd2UndmUgZXhjZWVkZWQgdGhlIHRocmVzaG9sZCBvZiBzY3JvbGxpbmdcclxuICAgICAgLy8gZnJvbSB0aGUgdG9wLCBzaG93IGNvbnRyb2xcclxuICAgICAgbGV0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgIGlmIChzY3JvbGxUb3AgPiB2aXNpYmxlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGVsLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLWJhbm5lci1jYXJvdXNlbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpO1xyXG5cclxuICAgIGlmKCRlbC5jaGlsZHJlbigpLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2xpZGVyID0gJGVsLnNsaWNrKHtcclxuICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PC9idXR0b24+JyxcclxuICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1uZXh0XCI+PC9idXR0b24+J1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuICAkKCcuanMtY2xpY2thYmxlJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgLy8gaWYgdGhlIHRoaXMgaXMgY2xpY2tlZFxyXG4gICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICB2YXIgJGVsID0gJCh0aGlzKS5maW5kKCcuanMtY2xpY2thYmxlLWxpbmsnKS5maXJzdCgpO1xyXG4gICAgICAvLyBmaW5kIHRoZSBkZXN0aW5hdGlvblxyXG4gICAgICB2YXIgZGVzdCA9ICRlbC5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgLy8gaWYgdGhlIHRhcmdldCBhdHRyaWJ1dGUgZXhpc3RzXHJcbiAgICAgIGlmKFwiX2JsYW5rXCIgPT09ICRlbC5hdHRyKFwidGFyZ2V0XCIpKSB7XHJcbiAgICAgICAgLy8gbGF1bmNoIG5ldyB0YWIvd2luZG93XHJcbiAgICAgICAgd2luZG93Lm9wZW4oZGVzdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gb3RoZXJ3aXNlIHJlZGlyZWN0IHRvIGEgbmV3IHBhZ2UgXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZGVzdDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiLy8gKioqKioqIGJhc2ljIGN1c3RvbSBzZWxlY3QgdGhhdCB1c2VzIG1vYmlsZSBzZWxlY3Qga2V5Ym9hcmQgKioqKioqXHJcbmxldCBkcm9wZG93bk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWRyb3Bkb3duXCIpO1xyXG5cclxuaWYobnVsbCAhPT0gZHJvcGRvd25NZW51KXtcclxuXHJcbiAgbGV0IGxlbmd0aCA9IGRyb3Bkb3duTWVudS5sZW5ndGg7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKysgKSB7XHJcbiAgICBsZXQgcGFyZW50RWwgPSBkcm9wZG93bk1lbnVbaV0sXHJcbiAgICAgICAgc2VsZWN0RWwgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmpzLWRyb3Bkb3duLXNlbGVjdFwiKSxcclxuICAgICAgICBsaW5rID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihcIi5qcy1kcm9wZG93bi1saW5rXCIpXHJcblxyXG4gICAgaWYobnVsbCA9PT0gc2VsZWN0RWwgfHwgbnVsbCA9PT0gbGluaykge1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RFbC5vbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsZXQgZWxlbSA9ICh0eXBlb2YgdGhpcy5zZWxlY3RlZEluZGV4ID09PSBcInVuZGVmaW5lZFwiID8gd2luZG93LmV2ZW50LnNyY0VsZW1lbnQgOiB0aGlzKTtcclxuICAgICAgbGluay5pbm5lclRleHQgPSBlbGVtLnRleHQgfHwgZWxlbS5vcHRpb25zW2VsZW0uc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGNvb2tpZSAgIGZyb20gXCIuLi9oZWxwZXJzL2Nvb2tpZXMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLWVtZXJnZW5jeS1hbGVydHMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICBvcGVuID0gdHJ1ZSxcclxuICAgICAgICBpZCA9ICRlbC5kYXRhKCdpZCcpLFxyXG4gICAgICAgIGNvb2tpZU5hbWUgPSAnZW1lcmdlbmN5LWFsZXJ0cycgKyBpZCxcclxuICAgICAgICBjb29raWVWYWx1ZSA9IGNvb2tpZS5nZXRDb29raWUoY29va2llTmFtZSk7XHJcblxyXG4gICAgaWYodHlwZW9mKGNvb2tpZVZhbHVlKSAhPSAndW5kZWZpbmVkJyAmJiBjb29raWVWYWx1ZSA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAvLyBjb29raWVWYWx1ZSBpcyBhIHN0cmluZyBzbyB3ZSBjYW4ndCB1c2UgdGhlIHZhbHVlIGRpcmVjdGx5XHJcbiAgICAgIG9wZW4gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmKG9wZW4pIHtcclxuICAgICAgLy8gZXhwYW5kIHRoZSBtZW51XHJcbiAgICAgICRlbC5maW5kKCcuanMtYWNjb3JkaW9uLWxpbmsnKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfVxyXG5cclxuICAgICRlbC5vbignY2xpY2snLCcuanMtYWNjb3JkaW9uLWxpbmsnLGZ1bmN0aW9uKCl7XHJcbiAgICAgIC8vIHRvZ2dsZSB0aGUgY3VycmVudCBzdGF0ZVxyXG4gICAgICBvcGVuID0gIW9wZW47XHJcbiAgICAgIC8vIHVwZGF0ZSBvcGVuL2Nsb3NlIHN0YXRlIGNvb2tpZSBcclxuICAgICAgLy8gbGVhdmUgb2ZmIHRoaXJkIGFyZ3VtZW50IHRvIG1ha2UgaXQgZXhwaXJlIG9uIHNlc3Npb25cclxuICAgICAgY29va2llLnNldENvb2tpZShjb29raWVOYW1lLG9wZW4pO1xyXG4gICAgfSk7XHJcblxyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJ2Zvcm0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgJGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgIHJlcXVpcmVkRmllbGRzID0gW107XHJcblxyXG4gICAgLy8gZmluZCBhbGwgcmVxdWlyZWQgZmllbGRzXHJcbiAgICAkKCcuanMtaXMtcmVxdWlyZWQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCAkZmllbGQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgdHlwZSA9ICRmaWVsZC5kYXRhKCd0eXBlJyksXHJcbiAgICAgICAgICB2YWx1ZSA9ICRmaWVsZC52YWwoKSxcclxuICAgICAgICAgIHZhbGlkID0gdmFsaWRhdGUodmFsdWUsdHlwZSk7XHJcblxyXG4gICAgICByZXF1aXJlZEZpZWxkcy5wdXNoKHt0eXBlLHZhbGlkLCRlbDokZmllbGR9KTtcclxuXHJcbiAgICAgICQodGhpcykuZGF0YSgnaW5kZXgnLHJlcXVpcmVkRmllbGRzLmxlbmd0aCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpZiB0aGVyZSBhcmVuJ3QgYW55IHJlcXVpcmVkIGZpZWxkcywgZG9uJ3QgZG8gYW55dGhpbmdcclxuICAgIGlmKHJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICBsZXQgc3VibWl0Rm9ybSA9IHRydWU7XHJcblxyXG4gICAgICAvLyB2YWxpZGF0ZSBlYWNoIHJlcXVpcmVkIGZpZWxkXHJcbiAgICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGl0ZW0uJGVsLnZhbCgpO1xyXG5cclxuICAgICAgICBpdGVtLnZhbGlkID0gdmFsaWRhdGUodmFsdWUsaXRlbS50eXBlKTtcclxuXHJcbiAgICAgICAgaWYoaXRlbS52YWxpZCkge1xyXG4gICAgICAgICAgaXRlbS4kZWwuYXR0cignZGF0YS12YWxpZCcsJ2lzLXZhbGlkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1Ym1pdEZvcm0gPSBmYWxzZTtcclxuICAgICAgICAgIGl0ZW0uJGVsLmF0dHIoJ2RhdGEtdmFsaWQnLCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKCFzdWJtaXRGb3JtKSB7XHJcbiAgICAgICAgLy8gcHJldmVudCB0aGUgZm9ybSBmcm9tIHN1Ym1pdHRpbmdcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gc2hvdyB0aGUgZm9ybSBlcnJvciBtZXNzYWdlIFxyXG4gICAgICAgIC8vIG9yIGJsaW5rIHRoZSBtZXNzYWdlIGlmIGl0IGlzIGFscmVhZHkgdmlzaWJsZVxyXG4gICAgICAgICRmb3JtLmZpbmQoJy5qcy1lcnJvci1tc2cnKVxyXG4gICAgICAgICAgLmF0dHIoJ2hpZGRlbicsdHJ1ZSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRmb3JtLmZpbmQoJy5qcy1lcnJvci1tc2cnKVxyXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignaGlkZGVuJyk7XHJcbiAgICAgICAgICB9LDEwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSx0eXBlPSd0ZXh0Jyl7XHJcbiAgICBsZXQgdmFsaWQgPSBmYWxzZTtcclxuXHJcbiAgICBzd2l0Y2godHlwZSkge1xyXG4gICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgdmFsaWQgPSAhISh2YWx1ZS5tYXRjaCgvW0EtWjAtOS5fJSstXStAW0EtWjAtOS4tXStcXC5bQS1aXSsvaSkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHZhbGlkID0gdmFsdWUubGVuZ3RoICE9PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWxpZDtcclxuICB9XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG4iLCJpbXBvcnQgY29va2llcyBmcm9tIFwiLi4vaGVscGVycy9jb29raWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1oZWFkZXItYWxlcnQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAkbGluayA9ICRlbC5maW5kKCcuanMtaGVhZGVyLWFsZXJ0LWxpbmsnKSxcclxuICAgICAgICBpZCA9ICRlbC5kYXRhKCdpZCcpLFxyXG4gICAgICAgIGNvb2tpZU5hbWUgPSBcIkFsZXJ0XCIgKyBpZCxcclxuICAgICAgICBjb29raWVFeHBpcmVzID0gMzY1LFxyXG4gICAgICAgIGNvb2tpZVZhbHVlID0gY29va2llcy5nZXRDb29raWUoY29va2llTmFtZSk7XHJcblxyXG4gICAgLy8gc2hvdyBhbGVydCBpZiBjb29raWUgZG9lc24ndCBleGlzdFxyXG4gICAgaWYoY29va2llVmFsdWUgIT09IFwiaGlkZVwiKSB7XHJcbiAgICAgICRlbC5mYWRlSW4oKS5mYWRlT3V0KCdmYXN0JykuZmFkZUluKCdzbG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGlkZSB0aGUgYWxlcnRcclxuICAgICRsaW5rLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgY29va2llcy5zZXRDb29raWUoY29va2llTmFtZSxcImhpZGVcIixjb29raWVFeHBpcmVzKTtcclxuICAgICAgJGVsLnN0b3AodHJ1ZSx0cnVlKS5mYWRlT3V0KCk7XHJcbiAgICB9KVxyXG4gIH0pO1xyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCcuanMta2V5d29yZC1zZWFyY2gnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAkZm9ybSA9ICRlbC5maW5kKCdmb3JtJyk7XHJcblxyXG4gICAgJGZvcm0ub24oJ3N1Ym1pdCcsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgJGVsLmFkZENsYXNzKCdpcy1kaXJ0eScpXHJcbiAgICB9KTtcclxuXHJcbiAgICAkZm9ybS5vbigncmVzZXQnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICRlbC5yZW1vdmVDbGFzcygnaXMtZGlydHknKVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuanMtbWFpbi1uYXYnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG9wZW5DbGFzcyA9IFwiaXMtb3BlblwiLFxyXG4gICAgICAgIGNsb3NlQ2xhc3MgPSBcImlzLWNsb3NlZFwiLFxyXG4gICAgICAgIHN1Ym1lbnVDbGFzcyA9IFwic2hvdy1zdWJtZW51XCIsXHJcbiAgICAgICAgJHBhcmVudCA9ICQodGhpcyksXHJcbiAgICAgICAgJG1haW5OYXZUb2dnbGUgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi10b2dnbGUnKSxcclxuICAgICAgICAkbWFpbk5hdkl0ZW1zID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtdG9nZ2xlLCAuanMtbWFpbi1uYXYtdG9wLWxpbmsnKSxcclxuICAgICAgICBwcmV2aW91c0tleSA9IG51bGwsXHJcbiAgICAgICAgYnJlYWtwb2ludCA9IDgwMDsgLy8gbWF0Y2hlcyBDU1MgYnJlYWtwb2ludCBmb3IgTWFpbiBOYXZcclxuXHJcbiAgICAkbWFpbk5hdkl0ZW1zLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZih3aW5kb3dXaWR0aCA8PSBicmVha3BvaW50KSB7XHJcbiAgICAgICAgLy8gb25seSBmb3IgZGVza3RvcFxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR3JhYiBhbGwgdGhlIERPTSBpbmZvIHdlIG5lZWQuLi5cclxuICAgICAgbGV0ICRsaW5rID0gJCh0aGlzKSxcclxuICAgICAgICAgICR0b3BMZXZlbExpbmtzID0gJHBhcmVudC5maW5kKCcubWFfX21haW4tbmF2X190b3AtbGluaycpLFxyXG4gICAgICAgICAgb3BlbiA9ICRsaW5rLmhhc0NsYXNzKG9wZW5DbGFzcyksXHJcbiAgICAgICAgICAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpLFxyXG4gICAgICAgICAgJGZvY3VzZWRFbGVtZW50ID0gJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSxcclxuICAgICAgLy8gcmVsZXZhbnQgaWYgb3Blbi4uXHJcbiAgICAgICAgICAkdG9wTGV2ZWxJdGVtID0gJGZvY3VzZWRFbGVtZW50LnBhcmVudHMoJy5tYV9fbWFpbi1uYXZfX2l0ZW0nKSxcclxuICAgICAgICAgICR0b3BMZXZlbExpbmsgPSAkdG9wTGV2ZWxJdGVtLmZpbmQoJy5tYV9fbWFpbi1uYXZfX3RvcC1saW5rJyksXHJcbiAgICAgICAgICAkZHJvcGRvd25MaW5rcyA9ICRsaW5rLmZpbmQoJy5tYV9fbWFpbi1uYXZfX3N1Yml0ZW0gLm1hX19tYWluLW5hdl9fbGluaycpLFxyXG4gICAgICAgICAgZm9jdXNJbmRleEluRHJvcGRvd24gPSAkZHJvcGRvd25MaW5rcy5pbmRleCgkZm9jdXNlZEVsZW1lbnQpO1xyXG5cclxuXHJcbiAgICAgIC8vIGRvd24gYXJyb3cga2V5XHJcbiAgICAgIGlmKGUua2V5Q29kZSA9PT0gNDApIHtcclxuICAgICAgICAvLyBoaWRlIGNvbnRlbnRcclxuICAgICAgICAvLyBJZiBtZW51YmFyIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gT3BlbiBwdWxsIGRvd24gbWVudSBhbmQgc2VsZWN0IGZpcnN0IG1lbnUgaXRlbVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gSWYgZHJvcGRvd24gZm9jdXNcclxuICAgICAgICAvLyAgLSBTZWxlY3QgbmV4dCBtZW51IGl0ZW1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYob3Blbikge1xyXG4gICAgICAgICAgaWYoZm9jdXNJbmRleEluRHJvcGRvd24gPT09ICgkZHJvcGRvd25MaW5rcy5sZW5ndGgtMSkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKGZvY3VzSW5kZXhJbkRyb3Bkb3duID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICRkcm9wZG93bkxpbmtzWzFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgJGRyb3Bkb3duTGlua3NbZm9jdXNJbmRleEluRHJvcGRvd24rMV0uZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNob3coJHRvcExldmVsSXRlbS5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCcpKTtcclxuICAgICAgICAgICRsaW5rLmFkZENsYXNzKG9wZW5DbGFzcyk7XHJcbiAgICAgICAgICBpZigkZHJvcGRvd25MaW5rc1sxXSkge1xyXG4gICAgICAgICAgICAkZHJvcGRvd25MaW5rc1sxXS5mb2N1cygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMzgpIHsgIC8vIHVwIGFycm93XHJcbiAgICAgICAgLy8gaGlkZSBjb250ZW50XHJcbiAgICAgICAgLy8gSWYgbWVudWJhciBmb2N1c1xyXG4gICAgICAgIC8vICAtIE9wZW4gcHVsbCBkb3duIG1lbnUgYW5kIHNlbGVjdCBmaXJzdCBtZW51IGl0ZW1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIElmIGRyb3Bkb3duIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gU2VsZWN0IHByZXZpb3VzIG1lbnUgaXRlbVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZihvcGVuKSB7XHJcbiAgICAgICAgICBpZihmb2N1c0luZGV4SW5Ecm9wZG93biA8PSAxICkgeyAvLyBub3QgMCBiYyBvZiBoaWRkZW4gZmlyc3QgbGlua1xyXG4gICAgICAgICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICAgICAgICAgICR0b3BMZXZlbExpbmsuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGRyb3Bkb3duTGlua3NbZm9jdXNJbmRleEluRHJvcGRvd24tMV0uZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzaG93KCR0b3BMZXZlbEl0ZW0uZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKSk7XHJcbiAgICAgICAgICAkbGluay5hZGRDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZXNjIGtleVxyXG4gICAgICBpZihlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgLy8gQ2xvc2UgbWVudSBhbmQgcmV0dXJuIGZvY3VzIHRvIG1lbnViYXJcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgICRsaW5rLnJlbW92ZUNsYXNzKG9wZW5DbGFzcyk7XHJcbiAgICAgICAgJHRvcExldmVsTGluay5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbGVmdCBhcnJvdyBrZXlcclxuICAgICAgaWYoZS5rZXlDb2RlID09PSAzNykge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyBoaWRlIGNvbnRlbnRcclxuICAgICAgICAvLyBJZiBtZW51YmFyIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gUHJldmlvdXMgbWVudWJhciBpdGVtXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBJZiBkcm9wZG93biBmb2N1c1xyXG4gICAgICAgIC8vICAtIE9wZW4gcHJldmlvdXMgcHVsbCBkb3duIG1lbnUgYW5kIHNlbGVjdCBmaXJzdCBpdGVtXHJcbiAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgIGxldCBpbmRleCA9ICR0b3BMZXZlbExpbmtzLmluZGV4KCR0b3BMZXZlbExpbmspLTE7XHJcbiAgICAgICAgaWYoJHRvcExldmVsTGlua3NbaW5kZXhdKSB7XHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rc1tpbmRleF0uZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgfVxyXG4gICAgICAvLyByaWdodCBhcnJvdyBrZXlcclxuICAgICAgaWYoZS5rZXlDb2RlID09PSAzOSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyBoaWRlIGNvbnRlbnRcclxuICAgICAgICAvLyBJZiBtZW51YmFyIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gTmV4dCBtZW51YmFyIGl0ZW1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIElmIGRyb3Bkb3duIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gT3BlbiBuZXh0IHB1bGwgbWVudSBhbmQgc2VsZWN0IGZpcnN0IGl0ZW1cclxuICAgICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gJHRvcExldmVsTGlua3MuaW5kZXgoJHRvcExldmVsTGluaykrMTtcclxuICAgICAgICBpZigkdG9wTGV2ZWxMaW5rc1tpbmRleF0pIHtcclxuICAgICAgICAgICR0b3BMZXZlbExpbmtzW2luZGV4XS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGtleSBjb2RlIDkgaXMgdGhlIHRhYiBrZXlcclxuICAgICAgaWYob3BlbiB8fCAodHlwZW9mKGUua2V5Y29kZSkgIT09IFwidW5kZWZpbmVkXCIgJiYgZS5rZXljb2RlICE9PSA5KSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaGlkZSBjb250ZW50XHJcbiAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgLy8gYWRkIG9wZW4gY2xhc3MgdG8gdGhpcyBpdGVtXHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgLy8gYWRkIG9wZW4gY2xhc3MgdG8gdGhlIGNvcnJlY3QgY29udGVudCBiYXNlZCBvbiBpbmRleFxyXG4gICAgICBzaG93KCRsaW5rLmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50JykpO1xyXG4gICAgfSk7XHJcbiAgICAkbWFpbk5hdkl0ZW1zLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZih3aW5kb3dXaWR0aCA+IGJyZWFrcG9pbnQpIHtcclxuICAgICAgICBsZXQgJG9wZW5Db250ZW50ID0gJCh0aGlzKS5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCcpO1xyXG4gICAgICAgIHNob3coJG9wZW5Db250ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkbWFpbk5hdkl0ZW1zLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZih3aW5kb3dXaWR0aCA+IGJyZWFrcG9pbnQpIHtcclxuICAgICAgICBsZXQgJG9wZW5Db250ZW50ID0gJCh0aGlzKS5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCcpO1xyXG4gICAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkbWFpbk5hdlRvZ2dsZS5jaGlsZHJlbignYnV0dG9uLCBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBsZXQgJGVsID0gJCh0aGlzKTtcclxuICAgICAgbGV0ICRlbFBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgIGxldCAkY29udGVudCA9ICRlbFBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCcpO1xyXG4gICAgICBsZXQgJG9wZW5Db250ZW50ID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudC4nICsgb3BlbkNsYXNzKTtcclxuICAgICAgbGV0IGlzT3BlbiA9ICRjb250ZW50Lmhhc0NsYXNzKG9wZW5DbGFzcyk7XHJcblxyXG4gICAgICAvLyBtb2JpbGVcclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyBhZGQgb3BlbiBjbGFzcyB0byB0aGlzIGl0ZW1cclxuICAgICAgICAkZWxQYXJlbnQuYWRkQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgICBzaG93KCRjb250ZW50KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcblxyXG4gICAgICAgIGlmKCFpc09wZW4pIHtcclxuICAgICAgICAgIHNob3coJGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkbWFpbk5hdlRvZ2dsZS5sYXN0KClcclxuICAgICAgLmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50IGxpJylcclxuICAgICAgICAubGFzdCgpXHJcbiAgICAgICAgICAuZmluZCgnYScpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyBwcmV2aW91cyBrZXkgd2FzIG5vdCBhIHNoaWZ0XHJcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gOSAmJiBwcmV2aW91c0tleSAhPT0gMTYpIHsgIC8vIHRhYiBhcnJvd1xcXHJcbiAgICAgICAgICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcbiAgICAgICAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXZpb3VzS2V5ID0gZS5rZXlDb2RlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAkKCcuanMtY2xvc2Utc3ViLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpO1xyXG4gICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIaWRlIGFueSBvcGVuIHN1Ym1lbnUgY29udGVudCB3aGVuIHRoZSBzaWRlYmFyIG1lbnUgaXMgY2xvc2VkXHJcbiAgICAkKCcuanMtaGVhZGVyLW1lbnUtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgIGxldCAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpO1xyXG4gICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZSgkY29udGVudCkge1xyXG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3Moc3VibWVudUNsYXNzKTtcclxuICAgICAgJHBhcmVudC5maW5kKFwiLlwiICsgb3BlbkNsYXNzKS5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpO1xyXG5cclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgICRjb250ZW50LmFkZENsYXNzKGNsb3NlQ2xhc3MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgLnN0b3AoIHRydWUsIHRydWUgKVxyXG4gICAgICAgIC5zbGlkZVVwKCdmYXN0JyxmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhjbG9zZUNsYXNzKVxyXG4gICAgICAgICAgICAuc2xpZGVEb3duKDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvdygkY29udGVudCkge1xyXG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3Moc3VibWVudUNsYXNzKTtcclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAuYWRkQ2xhc3Mob3BlbkNsYXNzKVxyXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKGNsb3NlQ2xhc3MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAuc3RvcCggdHJ1ZSwgdHJ1ZSApXHJcbiAgICAgICAgICAuZGVsYXkoIDIwMCApXHJcbiAgICAgICAgICAuc2xpZGVVcCgwLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkY29udGVudFxyXG4gICAgICAgICAgICAgIC5hZGRDbGFzcyhvcGVuQ2xhc3MpXHJcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNsb3NlQ2xhc3MpXHJcbiAgICAgICAgICAgICAgLnNsaWRlRG93bignZmFzdCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xuXG4gICQoJy5qcy1tYWluLW5hdicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLFxuICAgICAgJG1haW5OYXZUb2dnbGUgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi10b2dnbGUnKTtcblxuICAgIC8vIG1ha2Ugcm9vdCB0b3AtbGV2ZWwgbGlua3MgaW5lcnQgZm9yIHBpbG90XG4gICAgJG1haW5OYXZUb2dnbGUuY2hpbGRyZW4oJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyBFbnN1cmUgdG9wLWxldmVsIGxpbmtzIHRoYXQgYXJlIHBvdGVudGlhbCBhbmNob3IgbGlua3MgY2xvc2UgdGhlIHNpZGViYXIgb24gbW9iaWxlXG4gICAgJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtdG9wLWxpbmsnKS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKCcuanMtaGVhZGVyLW1lbnUtYnV0dG9uJykudHJpZ2dlcignY2xpY2snKTtcbiAgICB9KTtcblxuICB9KTtcblxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcblxuIiwiLy8gKioqKioqIE1lbnUgYnV0dG9uICoqKioqKlxyXG5sZXQgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtaGVhZGVyLW1lbnUtYnV0dG9uXCIpO1xyXG5cclxuaWYobnVsbCAhPT0gbWVudUJ1dHRvbil7XHJcbiAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tZW51XCIpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyAqKioqKiogTWFpbiBIZWFkZXIgU2VhcmNoIGJ1dHRvbiBvbiBtb2JpbGUgc2hvdWxkIG9wZW4gdGhlIG1vYmlsZSBtZW51ICAqKioqKipcclxubGV0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWhlYWRlci1zZWFyY2gtbWVudSAuanMtaGVhZGVyLXNlYXJjaC1mb3JtXCIpO1xyXG5cclxuaWYobnVsbCAhPT0gc2VhcmNoRm9ybSl7XHJcbiAgc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+IDYyMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbWVudVwiKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcblxuICAkKCcuanMtbWEtcmVzcG9uc2l2ZS12aWRlbycpLmZpdFZpZHMoKTtcblxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJpbXBvcnQgZXh0ZXJuYWxVcmxDaGVjayAgIGZyb20gXCIuLi9oZWxwZXJzL2V4dGVybmFsVXJsQ2hlY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLW1hLXJpY2gtdGV4dCB0YWJsZScpLndyYXAoIFwiPGRpdiBjbGFzcz0nbWFfX3JpY2gtdGV4dF9fdGFibGUtd3JhcHBlcic+PC9kaXY+XCIgKTtcclxuXHJcbiAgLy8gZ2V0IHRoZSBleHRlcm5hbCBTVkcgbGluayBjb2RlXHJcbiAgZmV0Y2godGhlbWVQYXRoICsgJy9pbWFnZXMvc3ZnLXNwcml0ZS9leHRlcm5hbC1saW5rLnN2ZycsIHtcclxuICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbidcclxuICAgIH0pXHJcbiAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcclxuICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIC8vIGZpbmQgYWxsIGV4dGVybmFsIGxpbmtzIHRoYXQgbmVlZCBhbiBpY29uXHJcbiAgICAkKCcuanMtbWEtcmljaC10ZXh0IGEnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgaHJlZiA9ICRlbC5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICBpZihleHRlcm5hbFVybENoZWNrKGhyZWYpICYmICEkZWwuY2hpbGRyZW4oKS5sZW5ndGgpIHtcclxuICAgICAgICAvLyB3cmFwIHRoZSBsaW5rIGluIGEgc3BhbiB0YWdcclxuICAgICAgICAkZWwud3JhcCgnPHNwYW4gY2xhc3M9XCJtYV9fZGVjb3JhdGl2ZS1saW5rXCI+PC9zcGFuPicpO1xyXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgU1ZHIHRvIHRoZSBsaW5rXHJcbiAgICAgICAgJGVsLmFwcGVuZCgnJm5ic3A7JyArIGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KS5jYXRjaChmdW5jdGlvbihlKXtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ2V4dGVybmFsIGxpbmsgcnRlIGNvZGUgZmFpbGluZycpO1xyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoXCIuanMtc2Nyb2xsLWFuY2hvcnNcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICRlbFBhcmVudCA9ICRlbC5wYXJlbnQoKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdyZWxhdGl2ZScgPyAkZWwucGFyZW50KCkgOiAkZWwucGFyZW50KCkub2Zmc2V0UGFyZW50KCksXHJcbiAgICAgICAgZWxIZWlnaHQsXHJcbiAgICAgICAgaGVhZGVyQnVmZmVyID0gMCxcclxuICAgICAgICBsb3dlckxpbWl0LFxyXG4gICAgICAgIHVwcGVyTGltaXQsXHJcbiAgICAgICAgZGVib3VuY2VUaW1lcixcclxuICAgICAgICBhY3RpdmVDbGFzcyA9IFwiaXMtYWN0aXZlXCIsXHJcbiAgICAgICAgYWN0aXZlQW5jaG9yID0gMCxcclxuICAgICAgICBhbmNob3JzID0gW10sXHJcbiAgICAgICAgbnVtQW5jaG9ycyA9IDAsXHJcbiAgICAgICAgaXNNb2JpbGUgPSBmYWxzZSxcclxuICAgICAgICBsaW5rU2Nyb2xsaW5nID0gZmFsc2U7XHJcblxyXG4gICAgc2V0VmFyaWFibGVzKCk7XHJcblxyXG4gICAgLy8gZGVmYXVsdCBhc3N1bXB0aW9uIGFzIHRvIHdoZXJlIHRoZSBzY3JlZW4gd2lsbCBsb2FkXHJcbiAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCd0b3AnKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdmFyaWFibGVzIG9uZSBtb3JlIHRpbWUgdG8gY2F0Y2ggYW55IHBvc3QgcGFnZSBsb2FkIGNoYW5nZXNcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFZhcmlhYmxlcygpO1xyXG4gICAgfSwxMDAwKTtcclxuXHJcbiAgICAkZWwuZmluZCgnYScpLm9uKCdjbGljaycsZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAvLyBpcyB0aGUgbWVudSBjbG9zZWQgb24gbW9iaWxlXHJcbiAgICAgIGlmKCEkZWwuaGFzQ2xhc3MoJ2lzLW9wZW4nKSAmJiBpc01vYmlsZSkgeyAgICAgXHJcbiAgICAgICAgLy8ganVzdCBzaG93IHRoZSBtZW51XHJcbiAgICAgICAgJGVsLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgICBcclxuICAgICAgLy8gZmluZCB0aGUgbG9jYXRpb24gb2YgdGhlIGRlc2lyZWQgbGluayBhbmQgc2Nyb2xsIHRoZSBwYWdlXHJcbiAgICAgIGxldCBwb3NpdGlvbiA9IGFuY2hvcnNbJCh0aGlzKS5kYXRhKCdpbmRleCcpXS5wb3NpdGlvbjtcclxuICAgICAgLy8gY2xvc2UgdGhlIG1lbnVcclxuICAgICAgJGVsLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgIC8vIHJlbW92ZSBhY3RpdmUgZmxhZyBmcm9tIG90aGVyIGxpbmtzXHJcbiAgICAgICRlbC5maW5kKCcuJyArIGFjdGl2ZUNsYXNzKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgIC8vIG1hcmsgdGhpcyBsaW5rIGFzIGFjdGl2ZVxyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgYWN0aXZlQW5jaG9yID0gJCh0aGlzKS5kYXRhKCdpbmRleCcpO1xyXG4gICAgICAvLyBwcmV2ZW50IHRoZSBzY3JvbGwgZXZlbnQgZnJvbSB1cGRhdGluZyBhY3RpdmUgbGlua3NcclxuICAgICAgbGlua1Njcm9sbGluZyA9IHRydWU7XHJcblxyXG4gICAgICAkKFwiaHRtbCxib2R5XCIpLnN0b3AodHJ1ZSx0cnVlKS5hbmltYXRlKHtzY3JvbGxUb3A6cG9zaXRpb259LCAnNzUwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBsaW5rU2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgICRlbC5maW5kKFwiLmpzLXNjcm9sbC1hbmNob3JzLXRvZ2dsZVwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xyXG4gICAgICAkZWwudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1ha2UgdGhlIGxpbmtzIHN0aWNreVxyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgaWYodHlwZW9mIGRlYm91bmNlVGltZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGRlYm91bmNlVGltZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIGRlYm91bmNlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNldFZhcmlhYmxlcygpO1xyXG4gICAgICAgIHNldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgYWN0aXZhdGVMaW5rKCk7XHJcbiAgICAgIH0sMzAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZXRQb3NpdGlvbigpO1xyXG4gICAgICBhY3RpdmF0ZUxpbmsoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldFZhcmlhYmxlcygpIHtcclxuICAgICAgbGV0IHRvcE9mZnNldCA9IDA7XHJcblxyXG4gICAgICBoZWFkZXJCdWZmZXIgPSAwO1xyXG4gICAgICBlbEhlaWdodCA9ICRlbC5oZWlnaHQoKTtcclxuICAgICAgdXBwZXJMaW1pdCA9ICRlbFBhcmVudC5vZmZzZXQoKS50b3A7XHJcbiAgICAgIGlzTW9iaWxlID0gY2hlY2tNb2JpbGUoJGVsKTtcclxuXHJcbiAgICAgIGlmKCRlbFBhcmVudFswXS5oYXNBdHRyaWJ1dGUoXCJzdHlsZVwiKSAmJiAhaXNNb2JpbGUpIHtcclxuICAgICAgICAkZWxQYXJlbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgfVxyXG4gXHJcbiAgICAgIGlmKGlzTW9iaWxlKSB7XHJcbiAgICAgICAgaGVhZGVyQnVmZmVyID0gJCgnLmpzLXN0aWNreS1oZWFkZXInKS5oZWlnaHQoKSB8fCAwO1xyXG4gICAgICAgIHVwcGVyTGltaXQgLT0gaGVhZGVyQnVmZmVyO1xyXG4gICAgICAgIHRvcE9mZnNldCA9IGVsSGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsb3dlckxpbWl0ID0gdXBwZXJMaW1pdCArICRlbFBhcmVudC5vdXRlckhlaWdodCh0cnVlKSAtICRlbC5oZWlnaHQoKTtcclxuXHJcbiAgICAgIC8vIGxvY2F0ZSB0aGUgcG9zaXRpb24gb2YgYWxsIG9mIHRoZSBhbmNob3IgdGFyZ2V0c1xyXG4gICAgICBhbmNob3JzID0gbmV3IEFycmF5O1xyXG4gICAgICAkZWwuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oaSxlKXtcclxuICAgICAgICBsZXQgaGFzaCA9IHRoaXMuaGFzaCxcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAkKGhhc2gpLm9mZnNldCgpID8gJChoYXNoKS5vZmZzZXQoKS50b3AgLSBoZWFkZXJCdWZmZXIgLSB0b3BPZmZzZXQgOiB1cHBlckxpbWl0O1xyXG5cclxuICAgICAgICBhbmNob3JzW2ldID0geyBoYXNoLCBwb3NpdGlvbiB9O1xyXG5cclxuICAgICAgICAkKHRoaXMpLmRhdGEoJ2luZGV4JyxpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZWNvcmQgdGhlIG51bWJlciBvZiBhbmNob3JzIGZvciBwZXJmb3JtYW5jZVxyXG4gICAgICBudW1BbmNob3JzID0gYW5jaG9ycy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UG9zaXRpb24oKSB7XHJcbiAgICAgIGxldCB3aW5kb3dUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBhdHRyID0gJGVsLmF0dHIoJ2RhdGEtc3RpY2t5JyksXHJcbiAgICAgICAgICB0b3AgPSBhdHRyICE9PSAndG9wJyAmJiB3aW5kb3dUb3AgPD0gdXBwZXJMaW1pdCwgXHJcbiAgICAgICAgICBtaWRkbGUgPSBhdHRyICE9PSAnbWlkZGxlJyAmJiB3aW5kb3dUb3AgPCBsb3dlckxpbWl0ICYmIHdpbmRvd1RvcCA+IHVwcGVyTGltaXQsXHJcbiAgICAgICAgICBib3R0b20gPSBhdHRyICE9PSAnYm90dG9tJyAmJiB3aW5kb3dUb3AgPj0gbG93ZXJMaW1pdDtcclxuICAgICAgXHJcbiAgICAgIGlmKCRlbFBhcmVudFswXS5oYXNBdHRyaWJ1dGUoXCJzdHlsZVwiKSAmJiAhaXNNb2JpbGUpIHtcclxuICAgICAgICAkZWxQYXJlbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYoISRlbFBhcmVudFswXS5oYXNBdHRyaWJ1dGUoXCJzdHlsZVwiKSAmJiBpc01vYmlsZSAmJiBhdHRyID09PSAnbWlkZGxlJykge1xyXG4gICAgICAgICRlbFBhcmVudC5jc3MoeydwYWRkaW5nVG9wJzplbEhlaWdodH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0b3ApIHtcclxuICAgICAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCd0b3AnKTtcclxuXHJcbiAgICAgICAgaWYoaXNNb2JpbGUpe1xyXG4gICAgICAgICAgJGVsUGFyZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChtaWRkbGUpIHtcclxuICAgICAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCdtaWRkbGUnKTtcclxuXHJcbiAgICAgICAgaWYoaXNNb2JpbGUpe1xyXG4gICAgICAgICAgJGVsUGFyZW50LmNzcyh7J3BhZGRpbmdUb3AnOmVsSGVpZ2h0fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChib3R0b20pIHtcclxuICAgICAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCdib3R0b20nKTtcclxuXHJcbiAgICAgICAgaWYoaXNNb2JpbGUpe1xyXG4gICAgICAgICAgJGVsUGFyZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVMaW5rKCkge1xyXG4gICAgICAvLyBkbyB3ZSBoYXZlIG1vcmUgdGhhbiBvbmUgYW5jaG9yXHJcbiAgICAgIGlmKG51bUFuY2hvcnMgPCAyIHx8IGxpbmtTY3JvbGxpbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGdldCB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gYW5kIG9mZnNldCBieSBoYWxmIHRoZSB2aWV3IHBvcnRcclxuICAgICAgbGV0IHdpbmRvd1RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICh3aW5kb3cuaW5uZXJIZWlnaHQvMiksXHJcbiAgICAgICAgICBjdXJyZW50QW5jaG9yID0gYWN0aXZlQW5jaG9yO1xyXG4gICAgICBcclxuICAgICAgLy8gaXMgdGhlcmUgYSBwcmV2IHRhcmdldFxyXG4gICAgICAvLyBhbmQgXHJcbiAgICAgIC8vIGlzIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBhYm92ZSB0aGUgY3VycmVudCB0YXJnZXRcclxuICAgICAgaWYoY3VycmVudEFuY2hvciA+IDAgJiYgd2luZG93VG9wIDwgYW5jaG9yc1thY3RpdmVBbmNob3JdLnBvc2l0aW9uKSB7IFxyXG4gICAgICAgIC8vIG1ha2UgdGhlIHByZXYgbGluayBhY3RpdmVcclxuICAgICAgICAtLWFjdGl2ZUFuY2hvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaXMgdGhlcmUgYSBuZXh0IHRhcmdldFxyXG4gICAgICAvLyBhbmRcclxuICAgICAgLy8gaXMgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGJlbG93IHRoZSBuZXh0IHRhcmdldFxyXG4gICAgICBlbHNlIGlmKGN1cnJlbnRBbmNob3IgPCBudW1BbmNob3JzLTEgJiYgd2luZG93VG9wID4gYW5jaG9yc1thY3RpdmVBbmNob3IrMV0ucG9zaXRpb24pIHsgXHJcbiAgICAgICAgLy8gbWFrZSB0aGUgbmV4dCBsaW5rIGFjdGl2ZVxyXG4gICAgICAgICsrYWN0aXZlQW5jaG9yO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY3VycmVudEFuY2hvciAhPT0gYWN0aXZlQW5jaG9yKSB7XHJcbiAgICAgICAgLy8gbW92ZSB0aGUgYWN0aXZlIGZsYWdcclxuICAgICAgICAkZWwuZmluZCgnLicgKyBhY3RpdmVDbGFzcykucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICRlbC5maW5kKCdhJykuZXEoYWN0aXZlQW5jaG9yKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrTW9iaWxlKCRlbCkge1xyXG4gICAgbGV0IHZhbHVlID0gXCJ0cnVlXCI7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCRlbFswXSwgJzpiZWZvcmUnKS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50JykucmVwbGFjZSgvXFxcIi9nLCAnJyk7XHJcbiAgICB9IGNhdGNoKGVycikge31cclxuICAgIHJldHVybiB2YWx1ZSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlO1xyXG4gIH07XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG4iLCJpbXBvcnQgY29va2llcyBmcm9tIFwiLi4vaGVscGVycy9jb29raWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1zaXRlLXNldHRpbmctZm9ybScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKSxcclxuICAgICAgICAkcmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1idXR0b24tcmVzZXQnKSxcclxuICAgICAgICAkdGhlbWVTZWxlY3QgPSAkcGFyZW50LmZpbmQoJy5qcy1zaXRlLXNldHRpbmdzLXRoZW1lIHNlbGVjdCcpLFxyXG4gICAgICAgICRsYW5nU2VsZWN0ID0gJHBhcmVudC5maW5kKCcuanMtc2l0ZS1zZXR0aW5ncy1sYW5nIHNlbGVjdCcpLFxyXG4gICAgICAgICR6b29tQ29udHJvbHMgPSAkcGFyZW50LmZpbmQoJy5qcy16b29tLWNvbnRyb2xzJyksXHJcbiAgICAgICAgZGVmYXVsdFpvb21WYWwgPSAkem9vbUNvbnRyb2xzLmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudmFsKCksXHJcbiAgICAgICAgY29va2llTmFtZSA9IFwic2l0ZS1zZXR0aW5nc1wiLFxyXG4gICAgICAgIGNvb2tpZUV4cGlyZXMgPSAzNjUsXHJcbiAgICAgICAgY29va2llVmFsdWUgPSBKU09OLnBhcnNlKGNvb2tpZXMuZ2V0Q29va2llKGNvb2tpZU5hbWUpIHx8IFwie31cIik7XHJcblxyXG4gICAgLy8gc2V0IGRlZmF1bHQgdmFsdWVzIHRvIG1hdGNoIGNvb2tpZSB2YWx1ZXNcclxuICAgIGlmKHR5cGVvZihjb29raWVWYWx1ZS56b29tKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAkem9vbUNvbnRyb2xzLmZpbmQoJ2lucHV0W3ZhbHVlPVwiJyArIGNvb2tpZVZhbHVlLnpvb20gKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAkem9vbUNvbnRyb2xzLnRyaWdnZXIoJ3Jlc2V0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodHlwZW9mKGNvb2tpZVZhbHVlLnRoZW1lKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAkdGhlbWVTZWxlY3QudmFsKGNvb2tpZVZhbHVlLnRoZW1lKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgJCgnYm9keScpLmF0dHIoJ2RhdGEtdGhlbWUnLGNvb2tpZVZhbHVlLnRoZW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0eXBlb2YoY29va2llVmFsdWUubGFuZykgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgJGxhbmdTZWxlY3QudmFsKGNvb2tpZVZhbHVlLmxhbmcpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAkKCdodG1sJykuYXR0cignbGFuZycsY29va2llVmFsdWUubGFuZyk7XHJcbiAgICB9XHJcblxyXG4gICAgJHpvb21Db250cm9scy5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKS5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gICAgICBjb29raWVWYWx1ZS56b29tID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgdXBkYXRlQ29va2llKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkdGhlbWVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvb2tpZVZhbHVlLnRoZW1lID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgdXBkYXRlQ29va2llKCk7XHJcbiAgICAgICQoJ2JvZHknKS5hdHRyKCdkYXRhLXRoZW1lJyxjb29raWVWYWx1ZS50aGVtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkbGFuZ1NlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgY29va2llVmFsdWUubGFuZyA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIHVwZGF0ZUNvb2tpZSgpO1xyXG4gICAgICAkKCdodG1sJykuYXR0cignbGFuZycsY29va2llVmFsdWUubGFuZyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkcmVzZXQub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBjb29raWVWYWx1ZS56b29tID0gZGVmYXVsdFpvb21WYWw7XHJcbiAgICAgIHVwZGF0ZUNvb2tpZSgpO1xyXG4gICAgICAvLyB0cmlnZ2VyIGEgcmVzZXQgb2YgdGhlIGN1c3RvbSBmb3JtIGlucHV0IEpTXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkem9vbUNvbnRyb2xzLnRyaWdnZXIoJ3Jlc2V0Jyk7XHJcbiAgICAgICAgJHBhcmVudC5maW5kKCdzZWxlY3QnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgfSwuMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDb29raWUoKSB7XHJcbiAgICAgIGNvb2tpZXMuc2V0Q29va2llKGNvb2tpZU5hbWUsSlNPTi5zdHJpbmdpZnkoY29va2llVmFsdWUpLGNvb2tpZUV4cGlyZXMpO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCcuanMtdXRpbC1uYXYnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG9wZW5DbGFzcyA9IFwiaXMtb3BlblwiLFxyXG4gICAgICAgIGNsb3NlQ2xhc3MgPSBcImlzLWNsb3NlZFwiLFxyXG4gICAgICAgIHN1Ym1lbnVDbGFzcyA9IFwic2hvdy11dGlsbWVudVwiLFxyXG4gICAgICAgICRwYXJlbnQgPSAkKHRoaXMpLFxyXG4gICAgICAgIHdhaXRGb3JJdCA9IG51bGw7XHJcblxyXG4gICAgJCgnLmpzLWNsb3NlLXN1Yi1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgJG9wZW5Db250ZW50ID0gJHBhcmVudC5maW5kKCcuanMtdXRpbC1uYXYtY29udGVudC4nICsgb3BlbkNsYXNzKTtcclxuICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJHBhcmVudC5maW5kKCcuanMtdXRpbC1uYXYtdG9nZ2xlID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50ZGVmYXVsdDtcclxuXHJcbiAgICAgIGxldCBvcGVuID0gJCh0aGlzKS5oYXNDbGFzcyhvcGVuQ2xhc3MpLFxyXG4gICAgICAgICRjb250ZW50ID0gJCh0aGlzKS5uZXh0KCcuanMtdXRpbC1uYXYtY29udGVudCcpLFxyXG4gICAgICAgICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLXV0aWwtbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcblxyXG4gICAgICAvLyBoaWRlIG90aGVyIGNvbnRlbnRcclxuICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICBcclxuICAgICAgaWYob3BlbikgeyBcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gYWRkIG9wZW4gY2xhc3MgdG8gdGhpcyBpdGVtXHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgLy8gYWRkIG9wZW4gY2xhc3MgdG8gdGhlIGNvcnJlY3QgY29udGVudCBiYXNlZCBvbiBpbmRleFxyXG4gICAgICAkY29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIixcImZhbHNlXCIpO1xyXG5cclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoY2xvc2VDbGFzcylcclxuICAgICAgICAgIC5hZGRDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcyhzdWJtZW51Q2xhc3MpXHJcbiAgICAgIH0sIC4xKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRwYXJlbnQuZmluZCgnLmpzLWNsb3NlLXV0aWwtbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQ7XHJcblxyXG4gICAgICBoaWRlKCAkKHRoaXMpLmNsb3Nlc3QoJy5qcy11dGlsLW5hdi1jb250ZW50JykgKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1jbG9zZS1zdWItbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLXV0aWwtbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcbiAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGUoJGNvbnRlbnQpIHtcclxuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKHN1Ym1lbnVDbGFzcylcclxuICAgICAgJHBhcmVudC5maW5kKFwiLlwiICsgb3BlbkNsYXNzKS5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAkY29udGVudFxyXG4gICAgICAgIC5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpXHJcbiAgICAgICAgLmFkZENsYXNzKGNsb3NlQ2xhc3MpO1xyXG5cclxuICAgICAgaWYod2FpdEZvckl0KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHdhaXRGb3JJdCk7XHJcbiAgICAgIH1cclxuICAgICAgd2FpdEZvckl0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAvLyB6b29tIGNvbnRyb2xzIHVwZGF0ZXMvYWRkcyBhIGRhdGEtem9vbSBhdHRyaWJ1dGUgdG8gdGhlIGh0bWwgdGFnXHJcbiAgLy8gd2l0aCB0aGUgZGVzaXJlZCBsZXZlbCBvZiB6b29taW5nIHJlcXVldGVkLiAgQ1NTIGFwcGxpZXMgYSBzY2FsZVxyXG4gIC8vIHRyYW5zZm9ybSBiYXNlZCBvbiB0aGF0IHZhbHVlLlxyXG5cclxuICAkKFwiLmpzLXpvb20tY29udHJvbHNcIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgJHBhcmVudCA9ICQodGhpcyksXHJcbiAgICAgICAgJGlucHV0cyA9ICQodGhpcykuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XHJcblxyXG4gICAgJCgnaHRtbCcpLmF0dHIoXCJkYXRhLXpvb21cIiwgZ2V0Q3VycmVudFZhbHVlKCkpO1xyXG5cclxuICAgICRpbnB1dHMub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICAgICAgJCgnaHRtbCcpLmF0dHIoXCJkYXRhLXpvb21cIiwgJCh0aGlzKS52YWwoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkcGFyZW50Lm9uKCdyZXNldCcsZnVuY3Rpb24oKXtcclxuICAgICAgJCgnaHRtbCcpLmF0dHIoXCJkYXRhLXpvb21cIiwgZ2V0Q3VycmVudFZhbHVlKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudFZhbHVlKCkge1xyXG4gICAgICByZXR1cm4gJHBhcmVudC5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7Il19