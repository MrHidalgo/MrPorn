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

Function.prototype.extend = function() {
	var fns = [this].concat([].slice.call(arguments));
	return function() {
		for (var i=0; i<fns.length; i++) {
			fns[i].apply(this, arguments);
		}
	};
};
