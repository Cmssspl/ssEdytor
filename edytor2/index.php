<!DOCTYPE HTML>
<html>
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">

    <title>Edytor</title>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script src="ssEdytor.js"></script>

    <link rel="stylesheet" type="text/css" href="ssEdytor.css">

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
    </style>
</head>
<body>
<script>
    $(function() {
        var bar = new ssEdytorBar();

        $('.editor').ssEditor({
            bar: bar
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