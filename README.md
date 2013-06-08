# SsEdytor #

## SsEditor ##

SsEditor to pole edytowalne umożliwiające zmianę treści na żwyo na stronie, by je utworzyć wystarczy użyć:

```js
$('.editor').ssEditor();
```

### Opcje ###
```js
$('.editor').ssEditor({
	bar: SsEditorBar
});
```

## SsEditorBar ##

SsEditorBar to pasek narzędzi pomocnych w edycji, by go użyć wystarczy stworzyć jego obiekt, a następnie przypisać go do wybranych pól:

```js
var ssEdytorBar = new ssEdytorBar();

$('.editor').ssEditor({
	bar: ssEdytorBar
});
```