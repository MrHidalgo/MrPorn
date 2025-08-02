/*
* ============================
*
* Include lib:
* - preventBehavior.js;
* - swiper.js;
* - hamburger;
*
* ============================
* */

Element.prototype.parents = function(selector) {
	var elements = [];
	var elem = this;
	var ishaveselector = selector !== undefined;

	while ((elem = elem.parentElement) !== null) {
		if (elem.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}

		if (!ishaveselector || elem.matches(selector)) {
			elements.push(elem);
		}
	}

	return elements;
};
Function.prototype.extend = function() {
	var fns = [this].concat([].slice.call(arguments));
	return function() {
		for (var i=0; i<fns.length; i++) {
			fns[i].apply(this, arguments);
		}
	};
};

Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
