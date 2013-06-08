(function ( $, window, document, undefined ) {
	var pluginName = 'ssEditor';
	var configDefaults = {
		active: true,
		activeClass: 'active',
		hoverClass: 'hover',
		events: {},
		bar: false
	};

	function Plugin( element, options ) {
		this.element = $(element);
		this._defaults = configDefaults;
		this._name = pluginName;

		this.config = $.extend( {}, configDefaults, options);
		this.active = false;

		this.init();
	}

	Plugin.prototype.init = function () {
		var plagin = this;

		//uruchomienie edytowalności
		if(this.config.active) {
			this.element.attr('contenteditable', true);
		}

		//dodanie activeClass
		this.element.on('click', function() {
			this.active = true;

			plagin.element.addClass(plagin.config.activeClass);

			//uruchamianie bara
			if(plagin.config.bar !== false) {
				plagin.config.bar.open.call(plagin.config.bar, plagin);
			}

			return false;
		});

		//this.element

		$('body').on('click', function() {
			this.active = false;

			plagin.element.removeClass(plagin.config.activeClass);

			//wyłączanie bara
			if(plagin.config.bar !== false) {
				plagin.config.bar.close.call(plagin.config.bar, plagin);
			}
		});

		console.log(this.config.bar.bar);
//
//		this.config.bar.bar.on('click', function(e) {
//			e.stopPropagation()
//			this.stopPropagation()
//
//			return false;
//		});

		//dodanie hoverClass
		this.element.on('mouseenter', function() {
			if(!plagin.active) {
				plagin.element.addClass(plagin.config.hoverClass);
			}
		});

		this.element.on('mouseleave', function() {
			plagin.element.removeClass(plagin.config.hoverClass);

			this.active = false;
		});

		//utworzenie callbacków
		$.each(this.config.events, function (event, callback) {
			plagin.element.on(event, function() {
				callback.call(plagin);
			});
		});
	};

	Plugin.prototype.getContent = function () {
		return this.element.html();
	};

	Plugin.prototype.setContent = function (content) {
		return this.element.html(content);
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

var ssEdytorBar = (function () {
	var configDefaults = {
		moved: false,
		tab: {
			format: {
				name: 'Format',
				elements: [
					'bold',
					'italic',
					'underline'
				]
			},
			cms: {
				name: 'Cms',
				elements: [
					'switcherCms'
				]
			}
		}
	};

	var ssEdytorBar = function (options) {
		this.config = $.extend( {}, configDefaults, options);

		this.active = false;
		this.bar = false;
		this.dom = {
			body: $('body')
		};

		this.init();
	};

	ssEdytorBar.prototype.init = function () {
		//tworzenie bara
		var html = $('<section>').attr('class', 'ssEditorBar');

		var tabs = $('<ul>').addClass('tab');
		var box = $('<ul>').addClass('box');

		$.each(this.config.tab, function(name, tab) {
			tabs.append($('<li>').append($('<a>').attr('href', '#'+name).text(tab.name)));
			box.append($('<li>').attr('class', name));
		});

		html.append(tabs);
		html.append(box);

		this.bar = html;
		this.dom.body.prepend(this.bar);

		this.bar.on('click', function() {
			console.log('click na bar');

			return false;
		});
	};

	ssEdytorBar.prototype.open = function (editor) {
		this.bar.show();

		var top = editor.element.offset().top - this.bar.innerHeight();
		var left = editor.element.offset().left;

		this.bar.offset( {
			top: top,
			left: left
		});

		this.bar.show();

		console.log('open');
	};

	ssEdytorBar.prototype.close = function (editor) {
		this.bar.hide();

		console.log('close');
	};

	return ssEdytorBar;
})();