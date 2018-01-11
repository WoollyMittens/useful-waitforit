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
	// fetch the target element if needed
	if (typeof target === 'string') {
		target = document.querySelector(target);
	}
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
			var selection = [];
			var complete = true;
			// if the selector an array
			if (selector.constructor === Array) {
				// check all the conditions
				for (var a = 0, b = selector.length; a < b; a += 1) {
					selection[a] = document.querySelectorAll(selector[a]);
					complete = complete && (selection[a].length > 0);
				}
			} else {
				// or check the only condition
				selection = document.querySelectorAll(selector);
				complete = (selection.length > 0);
			}
			// check if the element(s) exists yet
			if (complete) {
				// stop observing
				if (!repeat) {
					observer.disconnect();
				}
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
