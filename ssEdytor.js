(function ( $, window, document, undefined ) {
	var pluginName = 'ssEditor';
	var configDefaults = {
		active: true,
		activeClass: 'active',
		hoverClass: 'hover',
		events: {},
		bar: false
	};

	function Plugin(element, options) {
		this.element 	= $(element);
		this._defaults 	= configDefaults;
		this._name 		= pluginName;

		this.config = $.extend( {}, configDefaults, options);

		this.active = false;

		this.init();
	}

	Plugin.prototype.init = function () {

	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if ( !$.data(this, 'plugin_' + pluginName )) {
				var plugin = new Plugin( this, options );

				$.data( this, 'plugin_' + pluginName, plugin);
			}
		});
	};
})( jQuery, window, document );