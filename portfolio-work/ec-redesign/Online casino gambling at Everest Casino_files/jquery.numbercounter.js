/**
 * jQuery numberCounter plugin-in 0.9
 * @author Vuong Nguyen
 * 
 * Counter to timely increment/decrement a number with support for localization
 */
(function($){
	$.fn.numberCounter = function(opts){
		var options = $.extend({
			initClass: 'number-counter-init',
			
			// data
			fetchData: null, // call back to fetch data via ajax
			fetchDataDelay: 50000, // ms
			dataCache: 'nc_init_data',
			amount: null,
			
			// timing
			timerID: 'nc_timer_id',
			updateDelay: null,
			minInterval: 666, // ms
			maxInterval: 888, // ms
			
			// increment
			countdown: false,
			increment: null, // if null, increment value will be random between 0.00 and 1.00
			decrement: null, // if null, decrement value will be random between 0.00 and 1.00
			
			// formatting
			separators: [], // separators[0] is the decimal separator and separators[1] is the thousand separator
			decimal: 2 // decimal places
		}, opts);
		
		String.prototype.reverse = function(stringify){
			return stringify ? this.split('').reverse().join('') : this.split('').reverse();
		};
		
		return this.each(function(){
			var _self = this, container = $(this);
			$.extend(this, {
				parseNum: function(num){
					return typeof(num) === 'string' ? parseFloat(num.replace(/\,|\.|\ |\$/g, '')) / 100 : parseFloat(num) / 100;
				},
				randomUpdateDelay: function(){
					return Math.floor(Math.random() * (options.maxInterval - options.minInterval + 1) + options.minInterval);
				},
				randomChangeAmount: function(){
					return Math.floor(Math.random() * 101) / 100;
				},
				setSeparators: function(amount){
					var dec = '', thou = '', separators = options.separators || [];
					// reverse the string, the first non-numerical character will be decimal separator
					// any non-numerical characters after the first one will be the thousand separator
					$.each(amount.toString().reverse(), function(i, v){
						if (v===',' || v==='.' || v===' ') { // if the character isn't a number
							if (!separators.length) { // if there is no separator recorded in the option separators array yet
								dec = v + dec; // read new non-numerical character as decimal separator
							} else if (separators.length === 1) { // if the decimal separator is recorded already
									thou = v + thou; // read new non-numerical character as thousand separator 
							}
						} else {
							if (dec.length && !separators.length) {
								separators.push(dec);
							} else if (thou.length && separators.length === 1) {
									separators.push(thou);
							}
							if (separators.length === 2) {
								return false;
							}
						}
					});
					options.separators = separators;
					return _self;
				},
				setInitData: function(){
					try {
						var initAmount = options.amount || container.text();
						// save initial data to cache for later use
						container.data(options.dataCache, {
							amount: initAmount
						});
						options.amount = _self.setSeparators(initAmount).parseNum(initAmount);
						if (!options.amount) {
							throw "Invalid initial currency amount";
						}
						return _self;
					} 
					catch (e) {
						alert('currencyCounter (jQuery plug-in): setInitData/Invalid initial currency amount.');
						return false;
					}
				},
				thousandify: function(amount, separator){
					var amountA = amount.toString().reverse(), thou = [];
					$.each(amountA, function(i, v){
						if (i !== 0 && i % 3 === 0 && i < amountA.length) {
							thou.push(separator);
						}
						thou.push(v);
					});
					return thou.reverse().join('');
				},
				displayFormat: function(amount){
					try {
						if (typeof(amount) === 'number') {
							var amountA = amount.toFixed(options.decimal).split('.'), display = '';
							if (options.decimal) {
								display += options.separators[0] + amountA[1];
							}
							return _self.thousandify(amountA[0], options.separators[1]) + display;
						}
						else {
							throw "Invalid argument";
						}
					} 
					catch (e) {
						alert('currencyCounter (jQuery plug-in): displayFormat/Invalid argument, expecting a numerical value.');
					}
					
				},
				change: function(){
					if (options.countdown) {
						options.amount -= options.decrement ? options.decrement : _self.randomChangeAmount();
						if (options.amount <= 0) {
							options.amount = 0;
							_self.stop();
						}
					}
					else {
						options.amount += options.increment ? options.increment : _self.randomChangeAmount();
					}
					return _self;
				},
				updateDisplay: function(amount){
					container.text(amount);
					return _self;
				},
				update: function(){
					_self.change().updateDisplay(_self.displayFormat(options.amount));
					return _self;
				},
				reset: function(){
					return _self.stop().start();
				},
				start: function(){
					// set inital data upon plugin init stage
					!container.hasClass(options.initClass) && _self.stop().setInitData();
					// if min and max intervals are the same, meaning we should be using a setInterval instead
					options.updateDelay = options.minInterval === options.maxInterval ? options.maxInterval : options.updateDelay;
					
					if (options.updateDelay) {
						container.data(options.timerID, setInterval(function(){
							_self.update();
						}, options.updateDelay));
					}
					else {
						container.data(options.timerID, setTimeout(function(){
							_self.update().reset();
						}, _self.randomUpdateDelay()));
					}
					return _self;
				},
				stop: function(){
					var timerID = container.data(options.timerID);
					if (timerID) {
						options.updateDelay && clearInterval(timerID) || clearTimeout(timerID);
					}
					return _self;
				}
			});
			_self.start();
			container.addClass(options.initClass);
		});
	};
})(jQuery);