# waitforit.js: Wait for an Element

Waits for an element to start existing.

Try the <a href="http://www.woollymittens.nl/default.php?url=useful-waitforit">demo</a>.

## How to include the script

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="js/waitforit.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'js/waitforit.js'
], function(WaitForIt) {
	...
});
```

Or import into an MVC framework.

```js
var WaitForIt = require('js/waitforit.js');
```

## How to start the script

```javascript
new WaitForIt({
	'target': document,
	'selector': '#waitForThis',
	'handler': function(elements) {
		// execute this script only when the specified element gets added to the document
		alert('the selected elements exist now', elements);
	},
	'repeat': false
});
```

**'target' : {DOM Element}** - The target to watch for changes.

**'selector' : {CSS Selector}** - What to watch the target for.

**'elements' : {DOM Elements}** - The selected element(s).

**'repeat' : {Boolean)** - Continue watching the target for further changes.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary www server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens) and at [WoollyMittens.nl](https://www.woollymittens.nl/).
