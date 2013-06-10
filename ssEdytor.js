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
		this._defaults 	= configDefaults;
		this._name 		= pluginName;
		this.element 	= $(element);

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

			//dodanie klasy active
			ssEditor.element.addClass(ssEditor.config.activeClass);

			//uruchamianie bara
			if(ssEditor.config.bar !== false) {
				ssEditor.config.bar.open.call(ssEditor.config.bar, ssEditor);
			}

			//uruchomienie callbacka
			if(typeof(ssEditor.config.events.active) == 'function') {
				ssEditor.config.events.active.call(this);
			}

			return false;
		});

		//event deactive
		this.element.on('blur', function() {
			ssEditor.active = false;

			//usunięcie klasy active
			ssEditor.element.removeClass(ssEditor.config.activeClass);

			//wyłączanie bara
			if(ssEditor.config.bar !== false) {
				ssEditor.config.bar.close.call(ssEditor.config.bar, ssEditor);
			}

			//uruchomienie callbacka
			if(typeof(ssEditor.config.events.deactive) == 'function') {
				ssEditor.config.events.deactive.call(this);
			}

				return false;
		});

		//event mouseenter
		this.element.on('mouseenter', function() {
			ssEditor.hover = true;

			//dodanie klasy hover
			ssEditor.element.addClass(ssEditor.config.hoverClass);

			//uruchomienie callbacka
			if(typeof(ssEditor.config.events.mouseenter) == 'function') {
				ssEditor.config.events.mouseenter.call(this);
			}

			return false;
		});

		//event mouseleave
		this.element.on('mouseleave', function() {
			ssEditor.hover = false;

			//usunięcie klasy hover
			ssEditor.element.removeClass(ssEditor.config.hoverClass);

			//uruchomienie callbacka
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
	var pluginName = 'ssEdytorBar';
	var configDefaults = {
		hoverClass:		'hover',
		tab: 			{
			format: {
				name: 'Format',
				elements: [
                    [
                        'bold',
                        'italic',
                        'underline'
                    ],
                    [
                        'bold',
                        'italic',
                        'underline'
                    ]
				]
			},
			cms: {
				name: 'Cms',
				elements: [
					[
						'switcherCms'
					]
				]
			}
		},
		elements: {
			//podstawowe elementy edytora
			bold: {
				name:			'Pogrubienie',
				description: 	'',
				callback: 		function() {}
			},
			italic:	{
				name:			'Pochylenie',
				description: 	'',
				callback: 		function() {}
			},
			underline: {
				name:			'Podkreślenie',
				description: 	'',
				callback: 		function() {}
			},

			//opcje cms'a
			switcherCms: {
				name:			'Zmiana ...',
				description: 	'',
				callback: 		function() {}
			}
		}
	};

	var Plugin = function (options) {
		this._defaults 	= configDefaults;
		this._name 		= pluginName;
		this.element 	= false;

		this.config = $.extend( {}, configDefaults, options);

		this.active = false;
		this.hover	= false;

		this.init();
	};

	Plugin.prototype.init = function () {
		//tworzenie bara
		this.buildHtml();

		//obsługa eventów
		this.initEvent();
	};

	Plugin.prototype.buildHtml = function () {
		//szkielet
		var html = $('<section>').attr('class', 'ssEditorBar');

		//podział na dwie sekcje taby i treść
		var tabs 	= $('<ul>');
		var box 	= $('<ul>');

		//
		$.each(this.config.tab, function(name, tab) {
            //zakładki
			tabs.append( $('<li>').append( $('<a>').attr('href', '#'+name).text(tab.name) ) );

            //content
            var grups = $('<ul>').addClass('grups');

            $.each(tab.elements, function(index, grup) {
                var elements = $('<ul>').addClass('elements');

                //console.log(tab);

                $.each(grup, function(index, elemetName) {
                    var element = $('<li>');
                    element.append( $('<a>').attr('href', '#'+elemetName).text(elemetName) );

                    elements.append( element );
                });

                grups.append( $('<li>').append( elements ) );
            });

            box.append( $('<li>').attr('class', name).append(grups) );
		});

        //aktywacja pierwszej zakładki
        tabs.children('li').first().addClass('active');
        box.children('li').first().addClass('active');

		//składanie bara w całość
		html.append( $('<section>').addClass('tab').append(tabs) );
		html.append( $('<section>').addClass('box').append(box) );

		//ukrycie bara
//		html.hide();

		//zapisanie do zmiennej obiektu i dodanie do body
		this.element = html;
		$('body').prepend(this.element);
	};

	Plugin.prototype.initEvent = function () {
		var ssEdytorBar = this;

		this.element.on('mousedown', function(e) {
			return false;
		});

		//event mouseenter
		this.element.on('mouseenter', function() {
			ssEdytorBar.hover = true;

			//dodanie klasy hover
			ssEdytorBar.element.addClass(ssEdytorBar.config.hoverClass);

			return false;
		});

		//event mouseleave
		this.element.on('mouseleave', function() {
			ssEdytorBar.hover = false;

			//usunięcie klasy hover
			ssEdytorBar.element.removeClass(ssEdytorBar.config.hoverClass);

			return false;
		});
	};

	Plugin.prototype.open = function (ssEditor) {
		console.log(pluginName+': open');

		var top = ssEditor.element.offset().top - this.element.outerHeight();
		var left = ssEditor.element.offset().left;

		this.element.show();

		this.element.offset( {
			top: top,
			left: left
		});
	};

	Plugin.prototype.close = function (ssEditor) {
		console.log(pluginName+': close');

		this.element.hide();
	};

	return Plugin;
})();