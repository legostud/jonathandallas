/* ************************************
/* @name Toggle Content
/* @author Jonathan Dallas
/* @version 0.2
/*
/* Plugin assumes the following html exists
/* <div class="js-toggle-box">
/* 	<div class="js-toggle-buttons"><a class="js-toggle-button">button1</a><a class="js-toggle-button">button2</a></div>
/*	<div class="js-toggle-content">
/*		<div class="js-toggle-content-item">...</div>
/*		<div class="js-toggle-content-item">...</div>
/*	</div>
/* </div>
/*
/* Content of the js-toggle-buttons div can only contain the js-toggle-button elements 
/* Content of the js-toggle-content div can only contain the js-toggle-content-item elements
/* ************************************ */

// http://jqueryboilerplate.com/
;(function ( $, window, document, undefined ) {

    var pluginName = "toggleContent",
        defaults = {
			toggle_buttons:"js-toggle-buttons",
			toggle_button:"js-toggle-button",
			toggle_content_item:"js-toggle-content-item",
			active_class:"is-active",
			visible_class:"is-visible",
			hidden_class:"is-hidden",
			fade:true
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
        	var self = this,
				options = this.options;
				
        	// mark the first button as active
        	$(self.element).find('.' + options.toggle_buttons + ' .'+options.toggle_button).first().addClass(options.active_class);
        	// hide all content
			$(self.element).find('.'+options.toggle_content_item).hide();
			// mark the first content as visible
        	$(self.element).find('.'+options.toggle_content_item).first().show().addClass(options.visible_class).removeClass(options.hidden_class);


        	// add click event listener to buttons
        	$(self.element).find('.'+options.toggle_buttons + ' .'+options.toggle_button).click(function(event) {
        		// if the button is already active
        		if ( $(this).hasClass(options.active_class) ) {
        			// do nothing
        			return false;
        		}
        		// remove the active class from the other button
        		$(self.element).find('.'+options.toggle_buttons + ' .'+options.toggle_button+'.'+options.active_class).removeClass(options.active_class);
        		// add the active class to this button
        		$(this).addClass(options.active_class);
        		// find the index for this button
        		var index = $(this).index();
				// wrap up an existing animations
				$(self.element).find('.'+options.toggle_content_item).stop(true,true);
        		if(options.fade){
					// hide the visible content item
					$(self.element).find('.'+options.toggle_content_item+'.'+options.visible_class).removeClass(options.visible_class).fadeOut(
						function(){
							$(this).addClass(options.hidden_class)
							// show the corresponding content item
							$(self.element).find('.'+options.toggle_content_item).eq(index).addClass(options.visible_class).removeClass(options.hidden_class).fadeIn();
						}
					);
				} else {
					// hide the visible content item
					$(self.element).find('.'+options.toggle_content_item+'.'+options.visible_class).removeClass(options.visible_class).slideUp(function(){$(this).addClass(options.hidden_class)});
					// show the corresponding content item
					$(self.element).find('.'+options.toggle_content_item).eq(index).addClass(options.visible_class).removeClass(options.hidden_class).slideDown();
				}
        		// prevent the link event
        		return false;
        	});
        }	
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

    // TEST code
    //$(function(){
    //	$('.toggle-box').toggleContent();
    //});


})( jQuery, window, document );