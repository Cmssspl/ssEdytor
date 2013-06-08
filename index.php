<!DOCTYPE HTML>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type">

		<title>Edytor</title>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
		<script src="ssEdytor.js"></script>

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

            /*edytor*/
            .ssEditorBar {
                width: 400px;
                height: 80px;

                position:  absolute;
                top: 0px;
                left: 0px;

				border: 1px solid #AAAAAA;
				border-radius: 2px;

                background-color: #EEEEEE;

				font-family: 'open sans';
				font-size: 13px;
            }

			.ssEditorBar .tab {
				margin: 0px;
				padding: 0px;

				/*width: 400px;*/
				/*height: 20px;*/

				overflow: hidden;

				/*border-left: 1px solid #EEEEEE;*/
				/*border-right: 1px solid #BBBBBB;*/
				border-bottom: 1px solid #CCCCCC;

				background-color: #E0E0E0;

				list-style: none;
			}

			.ssEditorBar .tab li {
				float: left;

				border-left: 1px solid #EEEEEE;
				border-right: 1px solid #BBBBBB;
			}

			.ssEditorBar .tab li.active {
				background-color: #EEEEEE;
			}

			.ssEditorBar .tab li a {
				padding: 4px 6px;

				display: block;

				color: #333333;
				text-decoration: none;
			}
		</style>
	</head>
	<body>
		<script>
			$(function() {
//				var bar = new ssEdytorBar();

				$('.editor').ssEditor();
////					bar: bar,
//					events: {}
//				});
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
