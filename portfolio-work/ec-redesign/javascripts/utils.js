/**
 * Common utility classes
 * @author vnguyen
 */

var UTILS = {
	cookie : {
		create : function (info) {
			var options = $.extend({
				name : null,
				value : '',
				path : '/',
				expire : 0			//in seconds
			}, info);
			
			var date = new Date();
			date.setTime(date.getTime() + (options.expire*1000));
			var expires = options.expire ? '; expires=' + date.toGMTString() : '';
			
			if (options.name) {
				document.cookie = options.name + '=' + options.value + expires + '; path=' + options.path;
				return true;
			} else {
				return false;
			}
		},
		erase : function (name) {
			return UTILS.cookie.create({'name' : name, 'expire' : -1});
		},
		get : function (name) {
			if (UTILS.isEmpty(name)) {
				return document.cookie;
			}
			var cookies = document.cookie.split(/; */),
				cookie_value = '';
			$.each(cookies, function (k, v) {
				var c = v.split('=');
				if (c.length==2 && c[0]===name) {
					cookie_value = c[1];
					return false;
				}
			});
			return cookie_value;
		},
		mcreate : function (options) {
			var info = $.extend({
				cookies : [],
				global : {}
			}, options);
			$.each(info.cookies, function (i, cookie) {
				UTILS.cookie.create($.extend(cookie, info.global));
			});
		},
		mget : function (names) {
			if ($.isArray(names)) {
				var cookies = {};
				$.each(names, function (i, name) {
					cookies[name] = UTILS.cookie.get(name);
				});
				return cookies;
			}
			return null;
		}
	},
	isEmpty : function (item) {
		var type = typeof(item);
		switch(type) {
			case 'boolean':
				return !item;
			case 'number':
				return item ? false : true;
			case 'object':
				if ($.isFunction(item)) {
					return true;
				} else {
					return item!==null ? $.isEmptyObject(item) : true;
				}
			case 'string':
				item = $.trim(item);
				return item.length ? false : true;
			case 'undefined':
				return true;
		}
	},	
	isEmail : function (value) {
		// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
		return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
	},
	isString : function (value) {
		return typeof(value)==='string';
	},
	isURL : function (value, addHTTP) {
		if (addHTTP && !value.match('http://')) {
			value = 'http://' + value;
		}
		return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
	},
	isZIP : function (value) {
		return /^\d{5}([\-]\d{4})?$/i.test(value);
	},
	log : function (data) {
		if (console) {
			console.log(data);
		} else {
			alert(data);
		}
	},
	now : function () {
        return new Date().getTime();
    },
	parseURL : function (options) {
		var info = $.extend({
			url : '',
			queries : {}
		}, options),
		url = null;
		return UTILS.isURL(info.url) ? [info.url.split('?')[0], ($.isPlainObject(info.queries) ? $.param(info.queries) : '')].join('?') : url;
	},
	prepareSWFObject : function (opts) {
		var options = $.extend({
			container : null
		}, opts);
		
	},
	typeCast : function (item, opts) {
		/***
		 * This function takes in a string and return a number (int, float)
		 * with options to force a number (force_number) in case the string has
		 * other characters other than numeric characters. 
		 * By default, force_number is always true
		 * 
		 * ex:	UTILS.typeCast('1234'), UTILS.typeCast('1234abc'), UTILS.typeCast('1234.00') all return 1234
		 *		UTILS.typeCast('1234.56'), UTILS.typeCast('1234.56abcde') both return 1234.56
		 *		UTILS.typeCast('1234abc', {force_numer: false}) return '1234abc' 
		 */
		var options = $.extend({force_number : true}, opts);
		if (typeof(item)==='string') {
			var num = item.match('.') ? parseFloat(item) : parseInt(item, 10);
			return (typeof(num)==='number' && !isNaN(num)) && (item.length==String(num).length || options.force_number) ? num : item;
		} else {
			return item;
		}
	},
	visibleDOMObj : function ($objArray, return_first_item) {
		/***
		 * This function take an array of DOM Objects and return an array containing only visible DOM Object(s)
		 * if return_first_item flag is set to true and there is one or more visible item, return the first visible item
		 */
		var results = $.map($objArray, function ($jqObj) {
			return $jqObj.is(':visible') ? $jqObj : null;
		});
		return return_first_item && results.length ? results[0] : results;  
	}
};

var DIALOGBOX = {
	basic : function (opts) {
		var options = $.extend({
				open: true,
				init : false,
				id : 'dialogbox-basic',
				closeButton : true,
				closeButtonHtml : null,
				closeButtonClass : 'ui-close-trigger',
				delay : 0,
				dialog : {}
			}, opts);
		options.dialog = $.extend({hide : 'fade', modal : false, position : ['center', 'center'], autoOpen : false, draggable : false, resizable : false, dialogClass : ''}, options.dialog);
		options.dialog.dialogClass = 'ui-dialogbox-wrapper ' + options.dialog.dialogClass;
		var box = $('#' + options.id);
		try {
			if (!box.hasClass('init') || options.init) {
				box.dialog(options.dialog);
				box.addClass('init');
			}
			if (options.open) {
				box.dialog('option', options.dialog);
				DIALOGBOX.closeAll();
				if (options.closeButton && !box.find('.ui-dialogbox-close').length) {
					var closeButton = options.closeButtonHtml ? options.closeButtonHtml : '<div class="ui-dialogbox-close"><a class="' + options.closeButtonClass + ' ui-close-button sprites" href="#" title="close">close</a></div>';
					box.prepend(closeButton);
				}
				box.dialog('open');
			} else {
				box.dialog('close');
			}
			if (options.delay && box.dialog('isOpen')) {
				setTimeout(function () {
					box.dialog('close');
				}, options.delay);
			}
			//bind the close button action
			$('.' + options.closeButtonClass + ':not(.init)').click(DIALOGBOX.close).addClass('init');
		} catch (e) {
			alert('Sorry, there was an issue opening the dialogbox for this action. Please report this to the Administrator');
		}
	},
	close : function (e) {
		e.preventDefault();
		DIALOGBOX.basic({id : $(this).closest('.ui-dialogbox').attr('id'), open : false});
	},
	closeAll : function () {
		$('.ui-dialogbox').dialog('close');
	},
	loading : function (opts) {
		var options = $.extend({
			id : 'loadingbox-global',
			closeButton : false,
			dialog : {}
		}, opts);
		options.dialog = $.extend({height: 36, width : 126, dialogClass : 'loadingbox-global'}, options.dialog);
		DIALOGBOX.basic(options);
	}
};

(function ($) {$.extend($.fn, {
	getData : function (keys, opts) {
	/***
	 * This plugin returns the data-[key] attributes knowing the [key]
	 * ex:	<div id="abc" data-value="123" data-value2="abc" />   
	 *		$('#abc').getData('value') would return 123
	 *		$('#abc').getData(['value', 'value2']) would return [{value: 123, value2: 'abc'})
	 */
		var data = [],
			options = $.extend({typeCast : true, force_number : true}, opts),
			process = function (elem, key, override_options) {
				if ($.isPlainObject(override_options)) {
					options = $.extend(options, override_options);
				}
				try {
					return options.typeCast ? UTILS.typeCast(elem.attr('data-' + key), {force_number : options.force_number}) : elem.attr('data-' + key);
				} catch (error) {
					return elem.attr('data-' + key);
				}
			},
			key_is_string = typeof(keys)==='string';
		this.each(function () {
			var elem = $(this), temp = {};
			if (key_is_string) {
				temp[keys] = process(elem, keys);
			} else if ($.isArray(keys)) {
				$.each(keys, function (i, key) {
					if ($.isPlainObject(key)) {
						try {
							temp[key.key] = process(elem, key.key, key.options); 
						} catch (error) {}	
					} else {
						try {
							temp[key] = process(elem, key);
						} catch (issue) {}
					}
				});
			}
			data.push(temp);
		});
		return data.length==1 && key_is_string ? data[0][keys] : data;		
	},
	setData : function (key, value) {
	/***
	 * This plugin set the data-[key] attributes for DOM elements knowing [key] and value
	 * ex:  <div id="abc" />
	 *		$('#abc').setData('value', 123) produces <div id="abc" data-value="123" />
	 *		$('#abc').setData({value : 123, value2 : 'abc'}) produces <div id="abc" data-value="123" data-value2="abc" />
	 */
		if ($.isPlainObject(key)) {
			return this.each(function () {
				var temp = {};
				$.each(key, function (k, val) {
					temp['data-' + k] = val;
				});
				$(this).attr(temp);
			});
		} else {
			return this.each(function () {
				$(this).attr('data-' + key, value);
			});
		}
	}
});})(jQuery);
