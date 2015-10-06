; (function ( $, window, document, undefined ) {
    'use strict';
    $.fn.placeholder = function () {
        return this.each(function () {
            var test_input = document.createElement('input');
            // if the browser supports placeholders
            if ( ('placeholder' in test_input) ) {
                // do nothing and use the browser version
                return false;
            }
            var input = this;
            input.default_value = $(input).attr('placeholder');
            $(input).bind('focus', function () {
                if ($(this).val() === this.default_value) {
                    $(this).val('');
                }
            });
            $(input).bind('blur', function () {
                if (!$(this).val().length) {
                    $(this).val(this.default_value);
                }
            });
            $(input).closest('form').bind('submit', function () {
                if ($(input).val() === input.default_value) {
                    $(input).val('');
                }
            });
            // initialize the placeholder data 
            $(input).blur();
        });
    };
})(jQuery, window, document);