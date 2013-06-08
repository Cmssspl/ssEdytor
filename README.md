# SsEdytor #

## SsEditor ##

SsEditor to pole edytowalne umożliwiające zmianę treści na żwyo na stronie, by je utworzyć wystarczy użyć:

```js
$('.editor').ssEditor();
```

### Opcje ###

#### Standardowe wartości: ####

```js
$('.editor').ssEditor({
	bar: 			false,
	activeClass: 	'active',
	hoverClass: 	'hover',
	events: {
		'active': 		false,
		'deactive': 	false,
		'mouseenter':	false,
		'mouseleave': 	false
	}
});
```

#### bar: ####
Obiekt reprezentujący klasę [ssEdytorBar](#sseditorbar).

#### activeClass: ####
Klasa przypisana do pola tekstowego gdy edytowalne pole jest aktywne/zaznaczone.

#### hoverClass: ####
Klasa przypisana do pola tekstowego gdy myszka znajduje się nad edytowalnym polem.

#### events: ####
Lista eventów edytora do jakich możesz się podłączyć:

* active - Wywoływany po kliknięciu w edytor.
* deactive - Wywoływany po wyjściu z edytora.
* mouseenter - Wywoływany po najechaniu myszką na edytor.
* mouseleave - Wywoływany po zjechaniu myszką z edytora.

Aby dodać event:
```js
$('.editor').ssEditor({
	events: {
		'active':	function() {
			console.log('active');
		}
	}
});
```

## SsEditorBar ##

SsEditorBar to pasek narzędzi pomocnych w edycji, by go użyć wystarczy stworzyć jego obiekt, a następnie przypisać go do wybranych pól:

```js
var ssEdytorBar = new ssEdytorBar();
```