/**
* Global functions. 
* Think twice before adding anything to this file. Most things belong elsewhere.
*/
(function () {

	/** 
	* Helper method for declaring namespaces 
	*/
	window.nspace = function (nspace) {
		var parts = nspace.split(".");
		var obj = window;
		for (var i = 0; i < parts.length; i++) {
			obj[parts[i]] = obj[parts[i]] || {};
			obj = obj[parts[i]];
		}
		return obj;
	};

	/**
	* Don't break in IE8 and below on console statements
	*/
	window.console = window.console || {
		"log": function () { },
		"info": function () { },
		"error": function () { },
		"warn": function () { },
		"debug": function () { }
	};

	window.numberWithCommas = function(x) {
		if(x === null || isNaN(x)){
			return "";
		}
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
})();