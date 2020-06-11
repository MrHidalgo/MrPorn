"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
	var slideUp = function slideUp(target) {
		var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.boxSizing = 'border-box';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		window.setTimeout(function () {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	};

	var slideDown = function slideDown(target) {
		var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

		target.style.removeProperty('display');
		var display = window.getComputedStyle(target).display;

		if (display === 'none') display = 'block';

		target.style.display = display;
		var height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = 'border-box';
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');

		window.setTimeout(function () {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	};

	var slideToggle = function slideToggle(target) {
		var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

		if (window.getComputedStyle(target).display === 'none') {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};

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

	var boxHover = function boxHover() {
		var swiperSlide = document.querySelectorAll('.swiper-slide'),
		    boxDetails = document.querySelectorAll('.list__box');

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = boxDetails.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				// box.addEventListener('mouseenter', function(ev) {
				// 	const el = ev.currentTarget;
				//
				// 	setTimeout(function() {
				// 		el.classList.add('is-hover');
				// 	}, 450);
				// }, false);
				// box.addEventListener('mouseleave', function(ev) {
				// 	const el = ev.currentTarget;
				//
				// 	el.classList.remove('is-hover');
				// }, false);

				// swiperSlide[idx].addEventListener('mouseenter', function(ev) {
				// 	const el = ev.currentTarget;
				//
				// 	setTimeout(function() {
				// 		el.classList.add('is-hover');
				// 	}, 500);
				// }, false);
				//
				// swiperSlide[idx].addEventListener('mouseleave', function(ev) {
				// 	const el = ev.currentTarget;
				//
				// 	el.classList.remove('is-hover');
				// }, false);

				var _ref = _step3.value;

				var _ref2 = _slicedToArray(_ref, 2);

				var idx = _ref2[0];
				var box = _ref2[1];
			}
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
	};

	var boxMore = function boxMore() {
		function playPause(vid) {
			vid.pause();
			vid.currentTime = 0;
			vid.load();
		}

		var _btns = document.querySelectorAll('.list__box-more');

		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = _btns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var btn = _step4.value;

				btn.addEventListener('click', function (ev) {
					var _el = ev.currentTarget,
					    _boxParent = _el.closest('.list__box'),
					    _boxID = _boxParent.getAttribute('data-id'),
					    _parentNode = _el.closest('.list__box-wrapper');

					var _specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');

					var listBoxes = document.querySelectorAll('.list__box'),
					    listSpecifications = document.querySelectorAll('.list__specification'),
					    videoPlayers = document.querySelectorAll('.list__specification video'),
					    pauseToggle = document.querySelectorAll('[video-pause-js]');

					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						for (var _iterator6 = document.querySelectorAll('[video-toggle-js]').entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var _ref3 = _step6.value;

							var _ref4 = _slicedToArray(_ref3, 2);

							var idx = _ref4[0];
							var playBtn = _ref4[1];

							playBtn.classList.remove('is-active');
							pauseToggle[idx].classList.remove('is-active');
							listBoxes[idx].classList.remove('is-active');

							listSpecifications[idx].style.display = 'none';

							playPause(videoPlayers[idx]);
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

		var closeBtns = document.querySelectorAll('.list__specification-close');

		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = closeBtns[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var _btn2 = _step5.value;

				_btn2.addEventListener('click', function (ev) {
					var _el = ev.currentTarget,
					    parent = _el.closest('.list__specification'),
					    vid = parent.querySelector('video'),
					    pauseToggle = parent.querySelector('[video-pause-js]');

					_el.closest('.list__specification').style.display = 'none';

					if (parent.querySelector('[video-toggle-js]')) {
						pauseToggle.classList.remove('is-active');
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
	};

	var videoToggle = function videoToggle() {
		function playPause(vid) {
			if (vid.paused) {
				vid.play();
			} else {
				vid.pause();
			}
		}

		var videoPlayBtns = document.querySelectorAll('[video-toggle-js]'),
		    videoPauseBtns = document.querySelectorAll('[video-pause-js]');

		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;

		try {
			for (var _iterator8 = videoPlayBtns[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var btn = _step8.value;

				btn.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    parentVideoNode = el.closest('[video-parent-js]'),
					    vid = parentVideoNode.querySelector('[video-js]'),
					    pauseToggle = parentVideoNode.querySelector('[video-pause-js]');

					el.classList.add('is-active');
					pauseToggle.classList.add('is-active');

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

		var _iteratorNormalCompletion9 = true;
		var _didIteratorError9 = false;
		var _iteratorError9 = undefined;

		try {
			for (var _iterator9 = videoPauseBtns[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
				var _btn4 = _step9.value;

				_btn4.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    parentVideoNode = el.closest('[video-parent-js]'),
					    vid = parentVideoNode.querySelector('[video-js]'),
					    playToggle = parentVideoNode.querySelector('[video-toggle-js]');

					el.classList.remove('is-active');
					playToggle.classList.remove('is-active');

					playPause(vid);
				}, false);
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

	var detailsToggleAction = function detailsToggleAction() {
		var favoritesBtns = document.querySelectorAll('[favorites-toggle-js]'),
		    specFavoritesBtns = document.querySelectorAll('[spec-favorites-js]'),
		    likeBtns = document.querySelectorAll('[like-toggle-js]'),
		    specLikeBtns = document.querySelectorAll('[spec-like-js]'),
		    dislikeBtns = document.querySelectorAll('[dislike-toggle-js]'),
		    specDislikeBtns = document.querySelectorAll('[spec-dislike-js]');

		var _iteratorNormalCompletion10 = true;
		var _didIteratorError10 = false;
		var _iteratorError10 = undefined;

		try {
			for (var _iterator10 = favoritesBtns[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
				var btn = _step10.value;

				btn.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-id'),
					    elParent = el.closest('.list__box-wrapper');

					var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					    specificationFavoritesBtn = specificationBlock.querySelector('[data-favorites="' + elID + '"]');

					ev.currentTarget.classList.toggle('is-active');
					specificationFavoritesBtn.classList.toggle('is-active');
				}, false);
			}
		} catch (err) {
			_didIteratorError10 = true;
			_iteratorError10 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion10 && _iterator10.return) {
					_iterator10.return();
				}
			} finally {
				if (_didIteratorError10) {
					throw _iteratorError10;
				}
			}
		}

		var _iteratorNormalCompletion11 = true;
		var _didIteratorError11 = false;
		var _iteratorError11 = undefined;

		try {
			for (var _iterator11 = specFavoritesBtns[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
				var _btn5 = _step11.value;

				_btn5.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-favorites'),
					    elParent = el.closest('.list__box-wrapper');

					var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					    listFavoritesBtn = listBlock.querySelector('.list__box-favorites[data-id="' + elID + '"]');

					ev.currentTarget.classList.toggle('is-active');
					listFavoritesBtn.classList.toggle('is-active');
				}, false);
			}
		} catch (err) {
			_didIteratorError11 = true;
			_iteratorError11 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion11 && _iterator11.return) {
					_iterator11.return();
				}
			} finally {
				if (_didIteratorError11) {
					throw _iteratorError11;
				}
			}
		}

		var _iteratorNormalCompletion12 = true;
		var _didIteratorError12 = false;
		var _iteratorError12 = undefined;

		try {
			for (var _iterator12 = likeBtns[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
				var _btn6 = _step12.value;

				_btn6.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-id'),
					    elParent = el.closest('.list__box-wrapper');

					var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					    specificationFavoritesBtn = specificationBlock.querySelector('[data-like="' + elID + '"]');

					ev.currentTarget.classList.toggle('is-active');
					specificationFavoritesBtn.classList.toggle('is-active');
				}, false);
			}
		} catch (err) {
			_didIteratorError12 = true;
			_iteratorError12 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion12 && _iterator12.return) {
					_iterator12.return();
				}
			} finally {
				if (_didIteratorError12) {
					throw _iteratorError12;
				}
			}
		}

		var _iteratorNormalCompletion13 = true;
		var _didIteratorError13 = false;
		var _iteratorError13 = undefined;

		try {
			for (var _iterator13 = specLikeBtns[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
				var _btn7 = _step13.value;

				_btn7.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-like'),
					    elParent = el.closest('.list__box-wrapper');

					var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					    listFavoritesBtn = listBlock.querySelector('.list__box-like[data-id="' + elID + '"]');

					ev.currentTarget.classList.toggle('is-active');
					listFavoritesBtn.classList.toggle('is-active');
				}, false);
			}
		} catch (err) {
			_didIteratorError13 = true;
			_iteratorError13 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion13 && _iterator13.return) {
					_iterator13.return();
				}
			} finally {
				if (_didIteratorError13) {
					throw _iteratorError13;
				}
			}
		}

		var _iteratorNormalCompletion14 = true;
		var _didIteratorError14 = false;
		var _iteratorError14 = undefined;

		try {
			for (var _iterator14 = dislikeBtns[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
				var _btn8 = _step14.value;

				_btn8.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-id'),
					    elParent = el.closest('.list__box-wrapper');

					var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					    specificationFavoritesBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');

					ev.currentTarget.classList.toggle('is-active');
					specificationFavoritesBtn.classList.toggle('is-active');
				}, false);
			}
		} catch (err) {
			_didIteratorError14 = true;
			_iteratorError14 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion14 && _iterator14.return) {
					_iterator14.return();
				}
			} finally {
				if (_didIteratorError14) {
					throw _iteratorError14;
				}
			}
		}

		var _iteratorNormalCompletion15 = true;
		var _didIteratorError15 = false;
		var _iteratorError15 = undefined;

		try {
			for (var _iterator15 = specDislikeBtns[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
				var _btn9 = _step15.value;

				_btn9.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-dislike'),
					    elParent = el.closest('.list__box-wrapper');

					var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					    listFavoritesBtn = listBlock.querySelector('.list__box-dislike[data-id="' + elID + '"]');

					ev.currentTarget.classList.toggle('is-active');
					listFavoritesBtn.classList.toggle('is-active');
				}, false);
			}
		} catch (err) {
			_didIteratorError15 = true;
			_iteratorError15 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion15 && _iterator15.return) {
					_iterator15.return();
				}
			} finally {
				if (_didIteratorError15) {
					throw _iteratorError15;
				}
			}
		}
	};

	var listIndicator = function listIndicator() {
		var listBoxes = document.querySelectorAll('[list-box-js]');

		var _iteratorNormalCompletion16 = true;
		var _didIteratorError16 = false;
		var _iteratorError16 = undefined;

		try {
			for (var _iterator16 = listBoxes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
				var box = _step16.value;


				box.addEventListener('mouseenter', function (ev) {
					// const el = ev.currentTarget,
					// 	elID = el.getAttribute('data-id'),
					// 	elWidth = el.clientWidth;
					//
					// const parent = el.closest('[list-parent-js]'),
					// 	listIndicator = parent.querySelector('[list-line-js]'),
					// 	listIndicatorWidth = listIndicator.clientWidth;
					//
					// const _elRect = el.getBoundingClientRect();
					//
					// let _indicatorOffset = (elWidth - listIndicatorWidth) / 2,
					// 	_lineOffset = ((_elRect.width * (elID - 1)) + ((elID * 6) - 3)) + _indicatorOffset;
					//
					// listIndicator.setAttribute(
					// 	'style',
					// 	'transform: translateX(' + _lineOffset + 'px)'
					// );
				});

				box.addEventListener('mouseleave', function (ev) {});
			}
		} catch (err) {
			_didIteratorError16 = true;
			_iteratorError16 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion16 && _iterator16.return) {
					_iterator16.return();
				}
			} finally {
				if (_didIteratorError16) {
					throw _iteratorError16;
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
		boxHover();
		boxMore();
		videoToggle();
		listIndicator();
		detailsToggleAction();
		// ==========================================
	};

	window.addEventListener('load', function (ev) {
		initNative();
	});
})();