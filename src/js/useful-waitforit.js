/*
	Source:
	van Creij, Maurice (2017). "useful.waitforit.js: Waits for an element to start existing", version 20170608, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the class if needed
var useful = useful || {};

// add the static methods
useful.waitForIt = function (target, selector, promise, repeat) {
	// assume no repeats
	repeat = repeat || false;
	// if the target exists
	if (target) {
		// create an observer object or a crude fallback
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || function () {
			this.observe = function () { this.interval = setInterval(this.promise.bind(this, null, this), 500); };
			this.disconnect = function () { clearInterval(this.interval); };
			this.promise = arguments[0];
		};
		// add a handler to the observer
		var observer = new MutationObserver(function(mutations, observer) {
			// check if the element(s) exists yet
			var selection = document.querySelectorAll(selector);
			if (selection.length > 0) {
				// stop observing
				if(!repeat) { observer.disconnect(); }
				// resolve the promise
				promise(selection);
			};
		});
		// start observing changes to the document
		observer.observe(target, {
			'childList': true,
			'attributes': true,
			'attributeFilter': ['id', 'class'],
			'characterData': false,
			'subtree': true,
			'attributeOldValue': false,
			'characterDataOldValue': false,
		});
	}
};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.waitForIt;
}
