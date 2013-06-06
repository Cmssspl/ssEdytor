ssEdytor
========

Use
=======

  		$(function() {
				var bar = new ssEdytorBar();

				$('.editor').ssEditor({
					bar: bar,
					events: {
						blur: function() {
							console.log(this.getContent());
						}
					}
				});
			});
