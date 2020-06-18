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
			btnHamburger.classList.remove("is-active");
			mobileContainer.classList.remove("is-open");

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
			speed: 900,
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
					for (var i = 0, _len = document.querySelectorAll('.list__box-wrapper').length; i < _len; i++) {
						document.querySelectorAll('.list__box-wrapper')[i].style.opacity = '1';
					}
				}
			}
		});
	}

	var idx = null,
	    len = sliders.length;

	for (idx = 0; idx < len; idx++) {
		swiperCB(".swiper-container[data-id=\"" + sliders[idx].getAttribute('data-id') + "\"]", ".list__box-wrapper[data-name='" + slidersNode[idx].getAttribute('data-name') + "']");
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

			var i = null,
			    len = document.querySelectorAll('.sort__drop-link').length;

			for (i = 0; i < len; i++) {
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

			var i = null,
			    len = links.length;

			for (i = 0; i < len; i++) {
				links[i].addEventListener('click', function (ev) {
					var el = ev.currentTarget;

					if (el.classList.contains('is-active')) {
						el.classList.remove('is-active');
						nodeDropInner.classList.remove('is-open');
					} else {
						for (var j = 0; j < links.length; j++) {
							links[j].classList.remove('is-active');
						}

						el.classList.add('is-active');
						nodeDropInner.classList.add('is-open');
					}
				}, false);
			}
		};
		/**
   * @name sortCollapse
   */
		var sortCollapse = function sortCollapse() {
			var toggles = document.querySelectorAll('[collapse-toggle-js]');

			var i = null,
			    len = toggles.length;

			for (i = 0; i < len; i++) {
				toggles[i].addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    container = document.getElementById(el.dataset.container);

					toggles[i].classList.toggle('is-active');
					container.classList.toggle('is-open');
				}, false);
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

		var btns = document.querySelectorAll('.list__box-more'),
		    closeBtns = document.querySelectorAll('.list__specification-close');

		var i = null,
		    len = btns.length;

		for (i = 0; i < len; i++) {
			btns[i].addEventListener('click', function (ev) {
				var _el = ev.currentTarget,
				    _boxParent = _el.closest('.list__box'),
				    _boxID = _boxParent.getAttribute('data-id'),
				    _parentNode = _el.closest('.list__box-wrapper');

				var hideScrollContainer = document.querySelectorAll("html, body"),
				    _specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');

				var j = null,
				    l = document.querySelectorAll('[video-toggle-js]').length;

				for (j = 0; j < l; j++) {
					if (document.querySelectorAll('.list__box')[j].classList.contains('is-active')) {
						document.querySelectorAll('.list__box')[j].classList.remove('is-active');
						document.querySelectorAll('.list__specification')[j].classList.remove('is-open');
					}

					if (document.querySelectorAll('[video-toggle-js]')[j].classList.contains('is-active')) {
						document.querySelectorAll('[video-toggle-js]')[j].classList.remove('is-active');
						document.querySelectorAll('[video-pause-js]')[j].classList.remove('is-active');
						playPause(document.querySelectorAll('.list__specification video')[j]);
					}
				}

				if (window.innerWidth < 1024) {
					setTimeout(function () {
						_parentNode.classList.add('is-open');
						_boxParent.classList.add('is-active');
						_specificationBox.classList.add('is-open');
					}, 500);
				} else {
					_parentNode.classList.add('is-open');
					_boxParent.classList.add('is-active');
					_specificationBox.classList.add('is-open');
				}

				if (window.innerWidth <= 1023) {
					hideScrollContainer.forEach(function (val, idx) {
						val.classList.add("is-hideScroll");
					});
				}
			}, false);
		}

		var idx = null,
		    lenClose = closeBtns.length;

		for (idx = 0; lenClose < len; idx++) {
			closeBtns[idx].addEventListener('click', function (ev) {
				var _el = ev.currentTarget,
				    parent = _el.closest('.list__specification');

				var hideScrollContainer = document.querySelectorAll("html, body");

				_el.closest('.list__box-wrapper').classList.remove('is-open');
				_el.closest('.list__specification').classList.remove('is-open');

				if (window.innerWidth <= 1024) {
					hideScrollContainer.forEach(function (val, idx) {
						val.classList.remove("is-hideScroll");
					});
				}

				if (parent.querySelector('[video-toggle-js]')) {
					parent.querySelector('[video-pause-js]').classList.remove('is-active');
					parent.querySelector('[video-toggle-js]').classList.remove('is-active');
					playPause(parent.querySelector('video'));
				}

				var j = null,
				    l = document.querySelectorAll('.list__box-more').length;

				for (j = 0; j < l; j++) {
					if (document.querySelectorAll('.list__box-more')[j].closest('.list__box').classList.contains('is-active')) {
						document.querySelectorAll('.list__box-more')[j].closest('.list__box').classList.remove('is-active');
					}
				}
			}, false);
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

		for (var i = 0, len = videoPlayBtns.length; i < len; i++) {
			videoPlayBtns[i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    parentVideoNode = el.closest('[video-parent-js]');

				el.classList.add('is-active');
				parentVideoNode.querySelector('[video-pause-js]').classList.add('is-active');

				playPause(parentVideoNode.querySelector('[video-js]'));
			}, false);
		}

		for (var _i = 0, _len2 = videoPauseBtns.length; _i < _len2; _i++) {
			videoPauseBtns[_i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    parentVideoNode = el.closest('[video-parent-js]');

				el.classList.remove('is-active');
				parentVideoNode.querySelector('[video-toggle-js]').classList.remove('is-active');

				playPause(parentVideoNode.querySelector('[video-js]'));
			}, false);
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

		for (var i = 0, len = favoritesBtns.length; i < len; i++) {
			favoritesBtns[i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elParent = el.closest('.list__box-wrapper');

				var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
				    specificationFavoritesBtn = specificationBlock.querySelector('[data-favorites="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				specificationFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for (var _i2 = 0, _len3 = skipBtns.length; _i2 < _len3; _i2++) {
			skipBtns[_i2].addEventListener('click', function (ev) {
				ev.currentTarget.classList.toggle('is-active');
			}, false);
		}

		for (var _i3 = 0, _len4 = specFavoritesBtns.length; _i3 < _len4; _i3++) {
			specFavoritesBtns[_i3].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-favorites'),
				    elParent = el.closest('.list__box-wrapper');

				var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
				    listFavoritesBtn = listBlock.querySelector('.list__box-favorites[data-id="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				listFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for (var _i4 = 0, _len5 = likeBtns.length; _i4 < _len5; _i4++) {
			likeBtns[_i4].addEventListener('click', function (ev) {
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

		for (var _i5 = 0, _len6 = specLikeBtns.length; _i5 < _len6; _i5++) {
			specLikeBtns[_i5].addEventListener('click', function (ev) {
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

		for (var _i6 = 0, _len7 = dislikeBtns.length; _i6 < _len7; _i6++) {
			dislikeBtns[_i6].addEventListener('click', function (ev) {
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

		for (var _i7 = 0, _len8 = specDislikeBtns.length; _i7 < _len8; _i7++) {
			specDislikeBtns[_i7].addEventListener('click', function (ev) {
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
	};

	/**
  * @name listIndicator
  */
	var listIndicator = function listIndicator() {
		var listBoxes = document.querySelectorAll('[list-box-js]');

		for (var i = 0, len = listBoxes.length; i < len; i++) {
			listBoxes[i].addEventListener('mouseenter', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elWidth = el.clientWidth;

				var parent = el.closest('[list-parent-js]'),
				    listIndicator = parent.querySelector('[list-line-js]');

				var listIndicatorWidth = 0;

				if (window.innerWidth >= 1024) {
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
	};

	/**
  * @name boxHover
  */
	var boxHover = function boxHover() {
		var swiperSlides = document.querySelectorAll('.swiper-slide'),
		    listBoxBody = document.querySelectorAll('.list__box-body');

		var tOut = null,
		    hoverBool = false;

		for (var i = 0, len = swiperSlides.length; i < len; i++) {
			swiperSlides[i].addEventListener('mouseenter', function (ev) {
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

			swiperSlides[i].addEventListener('mouseleave', function (ev) {
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

		for (var _i8 = 0, _len9 = listBoxBody.length; _i8 < _len9; _i8++) {
			listBoxBody[_i8].addEventListener('mouseleave', function (ev) {
				if (window.innerWidth >= 1280) {
					hoverBool = false;

					clearTimeout(tOut);

					for (var j = 0, l = swiperSlides.length; j < l; j++) {
						swiperSlides[j].classList.remove('is-hover');
					}
				}
			}, false);
		}
	};

	/**
  * @name detectDevice
  */
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
  * @name skipModal
  */
	var skipModal = function skipModal() {
		var skipBtns = document.querySelectorAll('[spec-skip-js]');

		for (var i = 0, len = skipBtns.length; i < len; i++) {
			skipBtns[i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elParent = el.closest('.list__box-wrapper');

				el.closest('.list__specification').querySelector('.list__specification-close').click();

				if (elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]')) {
					elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]').classList.add('is-open');
				}
			}, false);
		}
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
		// detectDevice();
		// bodyClick();
		// viewFavoritesToggle();
		// sortCB();
		// search();
		// boxHover();
		// boxMore();
		// videoToggle();
		// listIndicator();
		// detailsToggleAction();
		// skipModal();
		// ==========================================
	};

	/**
  * @description Init all CB after page load
  */
	window.addEventListener('load', function (ev) {
		initNative();
	});

	window.addEventListener('resize', function () {
		if (window.innerWidth > 1023) {
			if (document.querySelector('.list__specification.is-open')) {
				document.getElementsByTagName('html')[0].classList.remove('is-hideScroll');
				document.getElementsByTagName('body')[0].classList.remove('is-hideScroll');
			}
		} else {
			if (document.querySelector('.list__specification.is-open')) {
				document.getElementsByTagName('html')[0].classList.add('is-hideScroll');
				document.getElementsByTagName('body')[0].classList.add('is-hideScroll');
			}
		}
	});
})();