<!DOCTYPE HTML>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type">

		<title>Edytor</title>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>

		<style>
			.wrapper {
				margin: 100px auto;

				width: 800px;
				height: 600px;

				border: 1px solid #dddddd;
			}

			h1 {
				font-size: 20px;
				font-family: 'open sans';
			}

			div {
				width: 100%;
				height: 400px;

				font-size: 14px;
				font-family: 'open sans';
			}

			.editor.hover {
				outline: 2px solid #ffc8c8;
			}

			.editor.active {
				outline: 2px solid #ff0000;
			}
		</style>
	</head>
	<body>
		<script>
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
							plagin.config.bar.open.call(plagin);
						}
					});

					this.element.on('blur', function() {
						this.active = false;

						plagin.element.removeClass(plagin.config.activeClass);

						//wyłączanie bara
						if(plagin.config.bar !== false) {
							plagin.config.bar.close.call(plagin);
						}
					});

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
					this.dom = {
						body: $('body')
					};

					this.init();
				};

				ssEdytorBar.prototype.init = function () {
					var html = $('<section>').attr('class', 'ssEditorBar');

					var tabs = $('<ul>').addClass('tab');
					var box = $('<ul>').addClass('box');

					$.each(this.config.tab, function(name, tab) {
						tabs.append($('<li>').append($('<a>').attr('href', '#'+name).text(tab.name)));
						box.append($('<li>').attr('class', name));
					});

					html.append(tabs);
					html.append(box);

//					this.dom.ssEditorBar = html;

					this.dom.body.prepend(html);

//					var qw = $('').appendTo(this.dom.ssEditorBar);
					console.log(html);
				};

				ssEdytorBar.prototype.open = function () {
					console.log('open');
				};

				ssEdytorBar.prototype.close = function () {
					console.log('close');
				};

				return ssEdytorBar;
			})();

			$(function() {
				var bar = new ssEdytorBar();

				$('.editor').ssEditor({
					bar: bar,
					events: {
						blur: function() {
//							console.log(this.getContent());
						}
					}
				});
			});
		</script>

		<div class="wrapper">
			<h1 class="editor">Tytuł</h1>
			<div class="editor">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur at
				consectetur cupiditate, delectus dicta earum fugit inventore iusto laborum nobis officiis
				recusandae, rem voluptas voluptatibus? Delectus, illum, nisi! Porro?
			</div>
		</div>
	</body>
</html>