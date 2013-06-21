<!DOCTYPE HTML>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type">

		<title>Swith</title>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>

		<style>
			.wrapper {
				margin: 100px auto;

				width: 800px;
				height: 600px;

				border: 1px solid #dddddd;
			}

            .ssSwitch {
                margin: 111px 0px 0px 333px;

                width: 26px;
                height: 26px;

                position: relative;
            }

            .ssSwitch .options {
                width: 78px;

                margin: 0px;
                padding: 0px;

                overflow: hidden;

                list-style: none;
            }

            .ssSwitch .active {
                width: 24px;
                height: 24px;

                margin: 1px;

                overflow: hidden;
            }

            .ssSwitch .options li {
                margin: 1px;

                width: 24px;
                height: 24px;

                float: left;
            }

            .ssSwitch a > span {
                padding: 1px;

                display: block;
                float: left;
                box-sizing:border-box;
                -moz-box-sizing:border-box;
            }

            .ssSwitch a span span {
                width: 100%;
                height: 100%;

                margin: 1px;

                display: block;

                background-color: #9d9497;
            }

            .ssSwitch a:hover span span {
                background-color: #0099ff;
            }

            .ssSwitch .boxW12 {
                width: 24px;
            }

            .ssSwitch .boxW6 {
                width: 12px;
            }

            .ssSwitch .boxW4 {
                width: 8px;
            }

            .ssSwitch .boxW3 {
                width: 6px;
            }

            .ssSwitch .boxW2 {
                width: 4px;
            }

            .ssSwitch .boxH12 {
                height: 24px;
            }

            .ssSwitch .boxH6 {
                height: 12px;
            }

            .ssSwitch .boxH4 {
                height: 8px;
            }

            .ssSwitch .boxH3 {
                height: 6px;
            }

            .ssSwitch .boxH2 {
                height: 4px;
            }
		</style>
	</head>
	<body>
		<script>
			(function ( $, window, document, undefined ) {
				var pluginName = 'ssSwitch';
				var configDefaults = {
                    options: {}
                };

				function Plugin( element, options ) {
					this.$element = $(element);
					this._defaults = configDefaults;
					this._name = pluginName;

					this.config = $.extend( {}, configDefaults, options);
					this.active = false;

					this.init();
				}

				Plugin.prototype.init = function () {
                    var plugin = this;

                    //tworzy przycisk
                    var html = $('<div>').addClass('ssSwitch');
                    var active = $('<div>').addClass('active');
                    var options = $('<ul>').addClass('options');

                    //tworzenie wartości podstawowej
                    var name = this.$element.val();
                    var value = plugin.config.options[name];

                    var option = $('<a>').attr('href', '#'+name);

                    $.each(value, function(index, box) {
                        plugin.createBox(box[0], box[1]).appendTo(option);
                    });

                    option.appendTo( active );

                    //tworzy opcje
                    $.each(this.$element.find('option'), function(index, elementOption) {
                        var $option = $(elementOption);

                        var name = $option.attr('value');
                        var value = plugin.config.options[name];

                        var option = $('<a>').attr('href', '#'+name);

                        $.each(value, function(index, box) {
                            plugin.createBox(box[0], box[1]).appendTo(option);
                        });

                        option.appendTo( $('<li>').appendTo(options) );
                    });

                    active.appendTo(html);
                    options.appendTo(html);

                    //włączanie opcji
                    options.hide();

                    active.on('click', function() {
                        if(plugin.active) {
                            options.hide();

                            plugin.active = false;
                        } else {
                            options.show();

                            plugin.active = true;
                        }

                        return false;
                    });

                    //podmiana opcji
                    options.find('a').on('click', function() {
                        var activeA = active.find('a');

                        var name = $(this).attr('href').substr(1);
                        var icon = $(this).html();

                        activeA.html(icon);

                        plugin.$element.val(name);

                        options.hide();

                        plugin.active = false;
                    });

                    this.$element
                        .after(html)
                        .hide();
				};

                Plugin.prototype.createBox = function(x, y) {
                    return $('<span><span>')
                        .addClass('boxW'+x)
                        .addClass('boxH'+y);
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

			$(function() {
				$('.switch').ssSwitch({
                    options: {
                        'opcja-1': [
                            [6, 12],
                            [6, 12]
                        ],
                        'opcja-2': [
                            [12, 6],
                            [12, 6]
                        ],
                        'opcja-3': [
                            [6, 6],
                            [6, 6],
                            [12, 6]
                        ],
                        'opcja-4': [
                            [12, 6],
                            [6, 6],
                            [6, 6]
                        ],
                        'opcja-5': [
                            [12, 4],
                            [6, 4],
                            [6, 4],
                            [12, 4]
                        ],
                        'opcja-6': [
                            [6, 4],
                            [6, 4],
                            [12, 4],
                            [6, 4],
                            [6, 4]
                        ]
                    }
                });
			});
		</script>

		<div class="wrapper">
			<select class="switch">
                <option value="opcja-1">Opcja 1</option>
                <option value="opcja-2">Opcja 2</option>
                <option selected="selected" value="opcja-3">Opcja 3</option>
                <option value="opcja-4">Opcja 4</option>
                <option value="opcja-5">Opcja 5</option>
                <option value="opcja-6">Opcja 6</option>
			</select>
		</div>
	</body>
</html>
