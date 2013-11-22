# jQuery Required Form Plugin

Adds form validation to browsers that don't support HTML5 required attributes.

## Usage

Add required attributes to the fields that are required. If a browser supports HTML5 validation, it will use that, otherwise it will validate with jQuery.

```
<form>
	<ol class="forms">
		<li>
			<label for="name">Name</label>
			<input type="text" name="name" id="name" required>
		</li>

		…
	</ol>
</form>
```

Include the following:

* jQuery
* jQuery Required Form Plugin
* [Modernizr with forms validation test](http://modernizr.com/download/#-cssclasses-forms_validation)

Then call requiredForm on your form:

```
$('form').requiredForm();
```

### Options with Defaults

```
{
	errorClass: 'error',
	errorText: 'Please fill out this field.',
	errorElement: 'em',
	inputErrorClass: 'input--error',
	scrollSpeed: 500
}
```