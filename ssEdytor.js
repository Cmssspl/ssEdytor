////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ssEditor
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function ( $, window, document, undefined ) {
	var pluginName = 'ssEditor';
	var configDefaults = {
		activeClass: 'active',
		hoverClass: 'hover',
		events: {
			'active': 		false,
			'deactive': 	false,
			'mouseenter':	false,
			'mouseleave': 	false
		},
		bar: false
	};

	function Plugin(element, options) {
		this.element 	= $(element);
		this._defaults 	= configDefaults;
		this._name 		= pluginName;

		this.config = $.extend( {}, configDefaults, options);

		this.active	= false;
		this.hover	= false;

		this.init();
	}

	Plugin.prototype.init = function () {
		//dodaje edytowalność
		this.element.attr('contenteditable', true);

		//obsługa eventów
		this.initEvent();
	};

	Plugin.prototype.initEvent = function () {
		var ssEditor = this;

		//event active
		this.element.on('focus', function() {
			ssEditor.active = true;

			ssEditor.element.addClass(ssEditor.config.activeClass);

			if(typeof(ssEditor.config.events.active) == 'function') {
				ssEditor.config.events.active.call(this);
			}

			return false;
		});

		//event deactive
		this.element.on('blur', function() {
			ssEditor.active = false;

			ssEditor.element.removeClass(ssEditor.config.activeClass);

			if(typeof(ssEditor.config.events.deactive) == 'function') {
				ssEditor.config.events.deactive.call(this);
			}

				return false;
		});

		//event mouseenter
		this.element.on('mouseenter', function() {
			ssEditor.hover = true;

			ssEditor.element.addClass(ssEditor.config.hoverClass);

			if(typeof(ssEditor.config.events.mouseenter) == 'function') {
				ssEditor.config.events.mouseenter.call(this);
			}

			return false;
		});

		//event mouseleave
		this.element.on('mouseleave', function() {
			ssEditor.hover = false;

			ssEditor.element.removeClass(ssEditor.config.hoverClass);

			if(typeof(ssEditor.config.events.mouseleave) == 'function') {
				ssEditor.config.events.mouseleave.call(this);
			}

			return false;
		});
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ssEdytorBar
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ssEdytorBar = (function () {

});