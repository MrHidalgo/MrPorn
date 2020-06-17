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
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

	var btnHamburger = document.querySelector("[hamburger-js]"),
	    hideScrollContainer = document.querySelectorAll("html, body"),
	    mobileContainer = document.querySelector("[mobile-block-js]");

	if (btnHamburger) {
		btnHamburger.addEventListener("click", function (ev) {
			var elem = ev.currentTarget;

			elem.classList.toggle("is-active");
			mobileContainer.classList.toggle("is-open");

			hideScrollContainer.forEach(function (val, idx) {
				val.classList.toggle("is-hideScroll");
			});
		});
	}

	var searchHamburger = document.querySelector('.pre-header__hamburger'),
	    searchContainer = document.querySelector('[search-mobile-js]');

	if (searchHamburger) {
		searchHamburger.addEventListener("click", function (ev) {
			searchContainer.classList.toggle("is-open");

			hideScrollContainer.forEach(function (val, idx) {
				val.classList.toggle("is-hideScroll");
			});
		});
	}

	var searchClose = document.querySelector('.category__close');

	searchClose.addEventListener("click", function (ev) {
		searchContainer.classList.toggle("is-open");

		hideScrollContainer.forEach(function (val, idx) {
			val.classList.toggle("is-hideScroll");
		});

		document.querySelector('[search-js]').value = '';
		document.querySelector('.category__drop').classList.remove('is-open');
	});
};

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
			touchMoveStopPropagation: false,
			simulateTouch: false,
			allowSwipeToNext: true,
			allowSwipeToPrev: true,
			allowPageScroll: "auto",
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

/**
 * POLYFILL
 * ===================================
 */

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
 * end POLYFILL
 * ===================================
 */

(function () {
	/**
  * ADDITIONAL CALLBACK
  * ===================================
  */

	/**
  * @name slideUp
  * @param target
  * @param duration
  */
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
	/**
  * @name slideDown
  * @param target
  * @param duration
  */
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
	/**
  * @name slideToggle
  * @param target
  * @param duration
  */
	var slideToggle = function slideToggle(target) {
		var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

		if (window.getComputedStyle(target).display === 'none') {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};
	/**
  * end ADDITIONAL CALLBACK
  * ===================================
  */

	/**
  * MAIN CALLBACK
  * ===================================
  */

	/**
  * @name bodyClick
  */
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

	/**
  * @name viewFavoritesToggle
  */
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

	/**
  * @name sortCB
  */
	var sortCB = function sortCB() {
		/**
   * @name sortToggle
   */
		var sortToggle = function sortToggle() {
			var toggleSort = document.querySelector('[sort-toggle-js]'),
			    nodeSort = document.querySelector('[sort-node-js]');

			toggleSort.addEventListener('click', function (ev) {
				nodeSort.classList.toggle('is-open');
			}, false);
		};
		/**
   * @name sortDropInner
   */
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
		/**
   * @name sortCollapse
   */
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

	/**
  * @name search
  */
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

	/**
  * @name boxMore
  */
	var boxMore = function boxMore() {
		function playPause(vid) {
			vid.pause();
			vid.currentTime = 0;
			vid.load();
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

					var listBoxes = document.querySelectorAll('.list__box'),
					    listSpecifications = document.querySelectorAll('.list__specification'),
					    videoPlayers = document.querySelectorAll('.list__specification video'),
					    pauseToggle = document.querySelectorAll('[video-pause-js]');

					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;

					try {
						for (var _iterator5 = document.querySelectorAll('[video-toggle-js]').entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var _ref = _step5.value;

							var _ref2 = _slicedToArray(_ref, 2);

							var idx = _ref2[0];
							var playBtn = _ref2[1];

							playBtn.classList.remove('is-active');
							pauseToggle[idx].classList.remove('is-active');
							listBoxes[idx].classList.remove('is-active');

							if (window.innerWidth >= 1024) {
								listSpecifications[idx].style.display = 'none';
							} else {
								listSpecifications[idx].classList.remove('is-open');
							}

							playPause(videoPlayers[idx]);
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

					_boxParent.classList.add('is-active');

					_parentNode.classList.add('is-open');

					var hideScrollContainer = document.querySelectorAll("html, body");

					if (window.innerWidth >= 1024) {
						_specificationBox.style.display = 'flex';
					} else {
						_specificationBox.classList.add('is-open');

						hideScrollContainer.forEach(function (val, idx) {
							val.classList.add("is-hideScroll");
						});
					}
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
					    listBoxWrapper = _el.closest('.list__box-wrapper'),
					    vid = parent.querySelector('video'),
					    pauseToggle = parent.querySelector('[video-pause-js]');

					var hideScrollContainer = document.querySelectorAll("html, body");

					listBoxWrapper.classList.remove('is-open');

					if (window.innerWidth >= 1024) {
						_el.closest('.list__specification').style.display = 'none';
					} else {
						_el.closest('.list__specification').classList.remove('is-open');

						hideScrollContainer.forEach(function (val, idx) {
							val.classList.remove("is-hideScroll");
						});
					}

					if (parent.querySelector('[video-toggle-js]')) {
						pauseToggle.classList.remove('is-active');
						parent.querySelector('[video-toggle-js]').classList.remove('is-active');
						playPause(vid);
					}

					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						for (var _iterator6 = document.querySelectorAll('.list__box-more')[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							var _btn3 = _step6.value;

							_btn3.closest('.list__box').classList.remove('is-active');
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

	/**
  * @name videoToggle
  */
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

		var _iteratorNormalCompletion7 = true;
		var _didIteratorError7 = false;
		var _iteratorError7 = undefined;

		try {
			for (var _iterator7 = videoPlayBtns[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
				var btn = _step7.value;

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

		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;

		try {
			for (var _iterator8 = videoPauseBtns[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var _btn4 = _step8.value;

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

	/**
  * @name detailsToggleAction
  */
	var detailsToggleAction = function detailsToggleAction() {
		var favoritesBtns = document.querySelectorAll('[favorites-toggle-js]'),
		    specFavoritesBtns = document.querySelectorAll('[spec-favorites-js]'),
		    likeBtns = document.querySelectorAll('[like-toggle-js]'),
		    specLikeBtns = document.querySelectorAll('[spec-like-js]'),
		    dislikeBtns = document.querySelectorAll('[dislike-toggle-js]'),
		    specDislikeBtns = document.querySelectorAll('[spec-dislike-js]'),
		    skipBtns = document.querySelectorAll('.list__specification-skip');

		var _iteratorNormalCompletion9 = true;
		var _didIteratorError9 = false;
		var _iteratorError9 = undefined;

		try {
			for (var _iterator9 = favoritesBtns[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
				var btn = _step9.value;

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

		var _iteratorNormalCompletion10 = true;
		var _didIteratorError10 = false;
		var _iteratorError10 = undefined;

		try {
			for (var _iterator10 = skipBtns[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
				var _btn5 = _step10.value;

				_btn5.addEventListener('click', function (ev) {
					ev.currentTarget.classList.toggle('is-active');
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
				var _btn6 = _step11.value;

				_btn6.addEventListener('click', function (ev) {
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
				var _btn7 = _step12.value;

				_btn7.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-id'),
					    elParent = el.closest('.list__box-wrapper');

					ev.currentTarget.classList.toggle('is-active');
					elParent.querySelector('[dislike-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

					var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					    specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]'),
					    specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');

					specificationLikeBtn.classList.toggle('is-active');
					specificationDislikeBtn.parentElement.classList.toggle('is-hide');
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
				var _btn8 = _step13.value;

				_btn8.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-like'),
					    elParent = el.closest('.list__box-wrapper'),
					    elActionNode = el.closest('[spec-actionNode-js]'),
					    dislikeBtn = elActionNode.querySelector('[spec-dislike-js]');

					dislikeBtn.parentElement.classList.toggle('is-hide');

					var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					    listLikeBtn = listBlock.querySelector('.list__box-like'),
					    listDislikeBtn = listBlock.querySelector('.list__box-dislike');

					ev.currentTarget.classList.toggle('is-active');

					listLikeBtn.classList.toggle('is-active');
					listDislikeBtn.classList.toggle('is-hide');
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
				var _btn9 = _step14.value;

				_btn9.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-id'),
					    elParent = el.closest('.list__box-wrapper');

					ev.currentTarget.classList.toggle('is-active');
					elParent.querySelector('[like-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

					var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					    specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]'),
					    specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]');

					specificationDislikeBtn.classList.toggle('is-active');
					specificationLikeBtn.parentElement.classList.toggle('is-hide');
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
				var _btn10 = _step15.value;

				_btn10.addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-dislike'),
					    elParent = el.closest('.list__box-wrapper'),
					    elActionNode = el.closest('[spec-actionNode-js]'),
					    likeBtn = elActionNode.querySelector('[spec-like-js]');

					likeBtn.parentElement.classList.toggle('is-hide');

					var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					    listDislikeBtn = listBlock.querySelector('.list__box-dislike'),
					    listLikeBtn = listBlock.querySelector('.list__box-like');

					ev.currentTarget.classList.toggle('is-active');

					listDislikeBtn.classList.toggle('is-active');
					listLikeBtn.classList.toggle('is-hide');
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

	/**
  * @name listIndicator
  */
	var listIndicator = function listIndicator() {
		var listBoxes = document.querySelectorAll('[list-box-js]');

		var _iteratorNormalCompletion16 = true;
		var _didIteratorError16 = false;
		var _iteratorError16 = undefined;

		try {
			for (var _iterator16 = listBoxes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
				var box = _step16.value;


				box.addEventListener('mouseenter', function (ev) {
					var el = ev.currentTarget,
					    elID = el.getAttribute('data-id'),
					    elWidth = el.clientWidth;

					var parent = el.closest('[list-parent-js]'),
					    listIndicator = parent.querySelector('[list-line-js]');

					var listIndicatorWidth = 0;

					if (window.innerWidth >= 1023) {
						listIndicatorWidth = 64;
					} else if (window.innerWidth >= 768) {
						listIndicatorWidth = 34;
					} else {
						listIndicatorWidth = 14;
					}

					var _elRect = el.getBoundingClientRect();

					var _listContainer = document.querySelector('#list .list__box-wrapper'),
					    _listContainerDimm = _listContainer.getBoundingClientRect();

					var _sum = 0;

					for (var idx = 1; idx < elID; idx++) {
						if (_elRect.width * idx < _elRect.x - _listContainerDimm.x) {
							_sum++;
						} else {
							break;
						}
					}

					var _indicatorOffset = (elWidth - listIndicatorWidth) / 2,
					    _lineOffset = _elRect.width * _sum + (_sum * 6 - 3) + _indicatorOffset;

					listIndicator.setAttribute('style', 'transform: translateX(' + _lineOffset + 'px)');
				});
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

	/**
  * @name boxHover
  */
	var boxHover = function boxHover() {
		var swiperSlides = document.querySelectorAll('.swiper-slide'),
		    listBoxBody = document.querySelectorAll('.list__box-body');

		var tOut = null,
		    hoverBool = false;

		var _iteratorNormalCompletion17 = true;
		var _didIteratorError17 = false;
		var _iteratorError17 = undefined;

		try {
			for (var _iterator17 = swiperSlides[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
				var swiperSlide = _step17.value;


				swiperSlide.addEventListener('mouseenter', function (ev) {
					if (window.innerWidth >= 1280) {
						var el = ev.currentTarget,
						    elParent = el.closest('[list-parent-js]'),
						    lineInd = elParent.querySelector('[list-line-js]');

						setTimeout(function () {
							var transformVal = '';

							if (lineInd.getAttribute("style")) {
								var val = lineInd.getAttribute("style");

								if (val.indexOf(';') === -1) {
									transformVal = val;
								} else {
									transformVal = val.substring(0, val.indexOf(';'));
								}
							}

							if (hoverBool) {
								el.classList.add('is-hover');
								lineInd.setAttribute('style', transformVal + ';width: 189px');
							} else {
								tOut = setTimeout(function () {
									hoverBool = true;
									el.classList.add('is-hover');

									lineInd.setAttribute('style', transformVal + ';width: 189px');
								}, 750);
							}
						}, 0);
					}
				}, false);

				swiperSlide.addEventListener('mouseleave', function (ev) {
					if (window.innerWidth >= 1280) {
						var el = ev.currentTarget,
						    elParent = el.closest('[list-parent-js]'),
						    lineInd = elParent.querySelector('[list-line-js]');

						var transformVal = '';

						if (lineInd.getAttribute("style")) {
							var val = lineInd.getAttribute("style");

							if (val.indexOf(';') === -1) {
								transformVal = val;
							} else {
								transformVal = val.substring(0, val.indexOf(';'));
							}
						}

						clearTimeout(tOut);
						el.classList.remove('is-hover');

						lineInd.setAttribute('style', transformVal + ';width: 64px');
					}
				}, false);
			}
		} catch (err) {
			_didIteratorError17 = true;
			_iteratorError17 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion17 && _iterator17.return) {
					_iterator17.return();
				}
			} finally {
				if (_didIteratorError17) {
					throw _iteratorError17;
				}
			}
		}

		var _iteratorNormalCompletion18 = true;
		var _didIteratorError18 = false;
		var _iteratorError18 = undefined;

		try {
			for (var _iterator18 = listBoxBody[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
				var bodyBlock = _step18.value;

				bodyBlock.addEventListener('mouseleave', function (ev) {
					if (window.innerWidth >= 1280) {
						hoverBool = false;

						clearTimeout(tOut);

						var _iteratorNormalCompletion19 = true;
						var _didIteratorError19 = false;
						var _iteratorError19 = undefined;

						try {
							for (var _iterator19 = swiperSlides[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
								var slide = _step19.value;

								slide.classList.remove('is-hover');
							}
						} catch (err) {
							_didIteratorError19 = true;
							_iteratorError19 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion19 && _iterator19.return) {
									_iterator19.return();
								}
							} finally {
								if (_didIteratorError19) {
									throw _iteratorError19;
								}
							}
						}
					}
				}, false);
			}
		} catch (err) {
			_didIteratorError18 = true;
			_iteratorError18 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion18 && _iterator18.return) {
					_iterator18.return();
				}
			} finally {
				if (_didIteratorError18) {
					throw _iteratorError18;
				}
			}
		}
	};

	var detectDevice = function detectDevice() {
		var check = false;

		function _helper() {
			(function (a) {
				if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
			})(navigator.userAgent || navigator.vendor || window.opera);

			if (check) {
				document.getElementsByTagName('body')[0].classList.add('is-mobile');
			} else {
				document.getElementsByTagName('body')[0].classList.remove('is-mobile');
			}
		}

		_helper();

		window.addEventListener('resize', function () {
			_helper();
		});
	};

	/**
  * end MAIN CALLBACK
  * ===================================
  */

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
		initHamburger();
		// ==========================================

		// callback
		detectDevice();
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

	/**
  * @description Init all CB after page load
  */
	window.addEventListener('load', function (ev) {
		// for(let s of document.querySelectorAll('.swiper-slide')) {
		// 	s.classList.add('is-hover');
		// }
		initNative();
	});

	window.addEventListener('resize', function () {
		var _html = document.getElementsByTagName('html')[0],
		    _body = document.getElementsByTagName('body')[0];

		if (window.innerWidth > 1023) {
			if (_html.classList.contains('is-hideScroll')) {
				_html.classList.remove('is-hideScroll');
				_body.classList.remove('is-hideScroll');

				if (document.querySelector('.list__specification.is-open')) {
					document.querySelector('.list__specification.is-open').style.display = 'flex';
					document.querySelector('.list__specification.is-open').classList.remove('is-open');
				}
			} else {
				_html.classList.add('is-hideScroll');
				_body.classList.add('is-hideScroll');

				var _iteratorNormalCompletion20 = true;
				var _didIteratorError20 = false;
				var _iteratorError20 = undefined;

				try {
					for (var _iterator20 = document.querySelectorAll('.list__specification')[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
						var el = _step20.value;

						if (el.style.cssText.length !== 0 && el.style.cssText === "display: flex;") {
							el.classList.add('is-open');
							el.removeAttribute('style');
							return false;
						}
					}
				} catch (err) {
					_didIteratorError20 = true;
					_iteratorError20 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion20 && _iterator20.return) {
							_iterator20.return();
						}
					} finally {
						if (_didIteratorError20) {
							throw _iteratorError20;
						}
					}
				}
			}
		}
	});
})();