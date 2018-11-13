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
