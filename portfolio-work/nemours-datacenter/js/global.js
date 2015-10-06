(function ($) {

	/**
	* Gracefully handle browsers that don't support console.log();
	*/
	if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function () { } };


	/** 
	* Simple implementation of javascript bind(), from here: http://fitzgeraldnick.com/weblog/26/ 
	*/
	window.bind = function (scope, fn) {
		return function () {
			return fn.apply(scope, Array.prototype.slice.call(arguments));
		};
	};

	/** 
	* Helper method for declaring namespaces 
	*/
	window.nspace = function (nspace, alias) {
		var parts = nspace.split(".");
		var obj = window;
		for (var i = 0; i < parts.length; i++) {
			obj[parts[i]] = obj[parts[i]] || {};
			obj = obj[parts[i]];
		}
		return obj;
	};

	window.nestCollection = function (model, attributeName, nestedCollection) {
		//setup nested references
		for (var i = 0; i < nestedCollection.length; i++) {
			model.attributes[attributeName][i] = nestedCollection.at(i).attributes;
		}
		//create empty arrays if none

		nestedCollection.bind('add', function (initiative) {
			if (!model.get(attributeName)) {
				model.attributes[attributeName] = [];
			}
			model.get(attributeName).push(initiative.attributes);
		});

		nestedCollection.bind('remove', function (initiative) {
			var updateObj = {};
			updateObj[attributeName] = _.without(model.get(attributeName), initiative.attributes);
			model.set(updateObj);
		});
		return nestedCollection;
	};


})(jQuery);
