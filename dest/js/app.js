"use strict";

/*
*
* ============================
* ============================
*
* Include lib:
*
* - webFontLoader.js;
* - preventBehavior.js;
* - svg4everybody.js;
*
* ============================
* ============================
* */

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

	var link = document.querySelectorAll("a");

	link.forEach(function (val, idx) {

		val.addEventListener("click", function (e) {
			if (val.getAttribute("href") === "#") {
				e.preventDefault();
			}
		});
	});
};

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
var initSwiper = function initSwiper() {
	var sliders = document.querySelectorAll('.listSwiper'),
	    slidersNode = document.querySelectorAll('.list__box-wrapper');

	function swiperCB(swiperName, sliderArrow) {
		new Swiper(swiperName, {
			loop: false,
			grabCursor: false,
			effect: 'slide',
			speed: 750,
			// off touch for destop
			touchMoveStopPropagation: false,
			simulateTouch: false,
			allowSwipeToNext: true,
			allowSwipeToPrev: true,
			allowPageScroll: "auto",
			//
			slidesPerView: 'auto',
			spaceBetween: 0,
			slidesPerGroup: 3,
			navigation: {
				nextEl: sliderArrow + ' .list__arrow--next',
				prevEl: sliderArrow + ' .list__arrow--prev'
			},
			on: {
				init: function init() {
					var listBoxes = document.querySelectorAll('.list__box-wrapper');

					for (var i = 0; i < listBoxes.length; i++) {
						listBoxes[i].style.opacity = 1;
					}
				}
			}
		});
	}

	for (var idx = 0; idx < sliders.length; idx++) {
		var sliderName = sliders[idx].getAttribute('data-id'),
		    sliderWrapper = slidersNode[idx].getAttribute('data-name');

		swiperCB(".swiper-container[data-id=\"" + sliderName + "\"]", ".list__box-wrapper[data-name='" + sliderWrapper + "']");
	}
};

if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var el = this;

		do {
			if (Element.prototype.matches.call(el, s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

/**
 * @description Document DOM ready.
 */
(function () {
	/*
 * =============================================
 * CALLBACK :: start
 * ============================================= */
	var bodyClick = function bodyClick() {
		var className = '.header__view-wrapper, .sort';

		document.addEventListener('click', function (ev) {
			var _ev = ev.target;

			if (!_ev.closest(className)) {
				// VIEW FAVORITES
				document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
				document.querySelector('[view-favorites-drop-js]').classList.remove('is-open');

				// SORT
				document.querySelector('[sort-node-js]').classList.remove('is-open');
				document.querySelector('.sort__drop-inner').classList.remove('is-open');
				for (var i = 0; i < document.querySelectorAll('.sort__drop-link').length; i++) {
					document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
				}
			}
		}, false);
	};

	var viewFavoritesToggle = function viewFavoritesToggle() {
		var _btn = document.querySelector('[view-favorites-toggle-js]'),
		    _node = document.querySelector('[view-favorites-drop-js]');

		_btn.addEventListener('click', function (ev) {
			_btn.classList.toggle('is-active');
			_node.classList.toggle('is-open');

			document.querySelector('[sort-node-js]').classList.remove('is-open');
			document.querySelector('.sort__drop-inner').classList.remove('is-open');
			for (var i = 0; i < document.querySelectorAll('.sort__drop-link').length; i++) {
				document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
			}
		}, false);
	};

	var sortCB = function sortCB() {
		var sortToggle = function sortToggle() {
			var toggleSort = document.querySelector('[sort-toggle-js]'),
			    nodeSort = document.querySelector('[sort-node-js]');

			toggleSort.addEventListener('click', function (ev) {
				nodeSort.classList.toggle('is-open');
			}, false);
		};

		var sortDropInner = function sortDropInner() {
			var links = document.querySelectorAll('.sort__drop-link'),
			    nodeDropInner = document.querySelector('.sort__drop-inner');

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var link = _step.value;

					link.addEventListener('click', function (ev) {
						var el = ev.currentTarget;

						if (el.classList.contains('is-active')) {
							el.classList.remove('is-active');
							nodeDropInner.classList.remove('is-open');
						} else {
							for (var i = 0; i < links.length; i++) {
								links[i].classList.remove('is-active');
							}

							el.classList.add('is-active');
							nodeDropInner.classList.add('is-open');
						}
					}, false);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		};

		var sortCollapse = function sortCollapse() {
			var toggles = document.querySelectorAll('[collapse-toggle-js]');

			var _loop = function _loop(btn) {
				btn.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    container = document.getElementById(el.dataset.container);

					btn.classList.toggle('is-active');
					container.classList.toggle('is-open');
				}, false);
			};

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = toggles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var btn = _step2.value;

					_loop(btn);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		};

		sortToggle();
		sortDropInner();
		sortCollapse();
	};

	var search = function search() {
		var searchInput = document.querySelector('[search-js]');

		searchInput.addEventListener('keyup', function (ev) {
			var self = ev.currentTarget,
			    selfVal = self.value,
			    parentNode = self.closest('[search-parent-js]'),
			    dropNode = parentNode.querySelector('[search-drop-js]');

			if (selfVal.length > 0) {
				dropNode.classList.add('is-open');
			} else {
				dropNode.classList.remove('is-open');
			}
		}, false);
	};

	var boxMore = function boxMore() {
		function playPause(vid) {
			if (vid.paused) {
				// some action
			} else {
				vid.pause();
				vid.currentTime = 0;
			}
		}

		var _btns = document.querySelectorAll('.list__box-more');

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = _btns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var btn = _step3.value;

				btn.addEventListener('click', function (ev) {
					var _el = ev.currentTarget,
					    _boxParent = _el.closest('.list__box'),
					    _boxID = _boxParent.getAttribute('data-id'),
					    _parentNode = _el.closest('.list__box-wrapper');

					var _specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');

					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;

					try {
						for (var _iterator5 = document.querySelectorAll('.list__box')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var box = _step5.value;

							box.classList.remove('is-active');
						}
					} catch (err) {
						_didIteratorError5 = true;
						_iteratorError5 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion5 && _iterator5.return) {
								_iterator5.return();
							}
						} finally {
							if (_didIteratorError5) {
								throw _iteratorError5;
							}
						}
					}

					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						for (var _iterator6 = document.querySelectorAll('.list__specification')[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var specification = _step6.value;

							specification.style.display = 'none';
						}
					} catch (err) {
						_didIteratorError6 = true;
						_iteratorError6 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}
						} finally {
							if (_didIteratorError6) {
								throw _iteratorError6;
							}
						}
					}

					_boxParent.classList.add('is-active');
					_specificationBox.style.display = 'flex';

					_parentNode.classList.add('is-open');
				}, false);
			}

			// =====
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		var closeBtns = document.querySelectorAll('.list__specification-close');

		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = closeBtns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var _btn2 = _step4.value;

				_btn2.addEventListener('click', function (ev) {
					var _el = ev.currentTarget,
					    parent = _el.closest('.list__specification'),
					    vid = parent.querySelector('video');

					_el.closest('.list__specification').style.display = 'none';

					if (parent.querySelector('[video-toggle-js]')) {
						parent.querySelector('[video-toggle-js]').classList.remove('is-active');
						playPause(vid);
					}

					var _iteratorNormalCompletion7 = true;
					var _didIteratorError7 = false;
					var _iteratorError7 = undefined;

					try {
						for (var _iterator7 = document.querySelectorAll('.list__box-more')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
							var _btn3 = _step7.value;

							_btn3.closest('.list__box').classList.remove('is-active');
						}
					} catch (err) {
						_didIteratorError7 = true;
						_iteratorError7 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion7 && _iterator7.return) {
								_iterator7.return();
							}
						} finally {
							if (_didIteratorError7) {
								throw _iteratorError7;
							}
						}
					}
				}, false);
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}
	};

	var videoToggle = function videoToggle() {
		function playPause(vid) {
			if (vid.paused) {
				vid.play();
			} else {
				vid.pause();
			}
		}

		var videoBtns = document.querySelectorAll('[video-toggle-js]');

		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;

		try {
			for (var _iterator8 = videoBtns[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var btn = _step8.value;

				btn.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    parentVideoNode = el.closest('[video-parent-js]'),
					    vid = parentVideoNode.querySelector('[video-js]');

					el.classList.toggle('is-active');

					playPause(vid);
				}, false);
			}
		} catch (err) {
			_didIteratorError8 = true;
			_iteratorError8 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion8 && _iterator8.return) {
					_iterator8.return();
				}
			} finally {
				if (_didIteratorError8) {
					throw _iteratorError8;
				}
			}
		}
	};

	var listIndicator = function listIndicator() {
		var listBoxes = document.querySelectorAll('[list-box-js]');

		var _iteratorNormalCompletion9 = true;
		var _didIteratorError9 = false;
		var _iteratorError9 = undefined;

		try {
			for (var _iterator9 = listBoxes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
				var box = _step9.value;


				box.addEventListener('mouseenter', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-id');

					var parent = el.closest('[list-parent-js]'),
					    listIndicator = parent.querySelector('[list-line-js]');

					var _elRect = el.getBoundingClientRect();

					listIndicator.setAttribute('style', 'transform: translateX(' + (_elRect.width * (elID - 1) + (elID * 6 - 3)) + 'px)');
				});

				box.addEventListener('mouseleave', function (ev) {
					var el = ev.currentTarget;
				});
			}
		} catch (err) {
			_didIteratorError9 = true;
			_iteratorError9 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion9 && _iterator9.return) {
					_iterator9.return();
				}
			} finally {
				if (_didIteratorError9) {
					throw _iteratorError9;
				}
			}
		}
	};

	/*
 * CALLBACK :: end
 * ============================================= */

	/**
  * @name initNative
  *
  * @description Init all method
  */
	var initNative = function initNative() {
		// default
		initPreventBehavior();
		// ==========================================

		// lib
		initSwiper();
		// ==========================================

		// callback
		bodyClick();
		viewFavoritesToggle();
		sortCB();
		search();
		boxMore();
		videoToggle();
		listIndicator();
		// ==========================================
	};

	window.addEventListener('load', function (ev) {
		initNative();
	});
})();