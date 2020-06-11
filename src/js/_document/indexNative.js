if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector ||
		Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
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
	const slideUp = (target, duration=500) => {
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

		window.setTimeout( () => {
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

	const slideDown = (target, duration=500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;

		if (display === 'none') display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
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

		window.setTimeout( () => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	};

	const slideToggle = (target, duration = 500) => {
		if (window.getComputedStyle(target).display === 'none') {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};

	const bodyClick = () => {
		const className = '.header__view-wrapper, .sort';

		document.addEventListener('click', function(ev) {
			const _ev = ev.target;

			if (!_ev.closest(className)) {
				// VIEW FAVORITES
				document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
				document.querySelector('[view-favorites-drop-js]').classList.remove('is-open');

				// SORT
				document.querySelector('[sort-node-js]').classList.remove('is-open');
				document.querySelector('.sort__drop-inner').classList.remove('is-open');

				for(let i = 0; i < document.querySelectorAll('.sort__drop-link').length; i++) {
					document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
				}
			}
		}, false);
	};


	const viewFavoritesToggle = () => {
		const _btn = document.querySelector('[view-favorites-toggle-js]'),
			_node = document.querySelector('[view-favorites-drop-js]');

		_btn.addEventListener('click', (ev) => {
			_btn.classList.toggle('is-active');
			_node.classList.toggle('is-open');

			document.querySelector('[sort-node-js]').classList.remove('is-open');
			document.querySelector('.sort__drop-inner').classList.remove('is-open');
			for(let i = 0; i < document.querySelectorAll('.sort__drop-link').length; i++) {
				document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
			}
		}, false);
	};


	const sortCB = () => {
		const sortToggle = () => {
			const toggleSort = document.querySelector('[sort-toggle-js]'),
				nodeSort = document.querySelector('[sort-node-js]');

			toggleSort.addEventListener('click', (ev) => {
				nodeSort.classList.toggle('is-open');
			}, false);
		};

		const sortDropInner = () => {
			const links = document.querySelectorAll('.sort__drop-link'),
				nodeDropInner = document.querySelector('.sort__drop-inner');

			for(let link of links) {
				link.addEventListener('click', (ev) => {
					const el = ev.currentTarget;

					if(el.classList.contains('is-active')) {
						el.classList.remove('is-active');
						nodeDropInner.classList.remove('is-open');
					} else {
						for(let i = 0; i < links.length; i++) {
							links[i].classList.remove('is-active');
						}

						el.classList.add('is-active');
						nodeDropInner.classList.add('is-open');
					}
				}, false);
			}
		};

		const sortCollapse = () => {
			const toggles = document.querySelectorAll('[collapse-toggle-js]');

			for(let btn of toggles) {
				btn.addEventListener('click', (ev) => {
					const el = ev.currentTarget,
						container = document.getElementById(el.dataset.container);

					btn.classList.toggle('is-active');
					container.classList.toggle('is-open');
				}, false);
			}
		};

		sortToggle();
		sortDropInner();
		sortCollapse();
	};


	const search = () => {
		const searchInput = document.querySelector('[search-js]');

		searchInput.addEventListener('keyup', (ev) => {
			const self = ev.currentTarget,
				selfVal = self.value,
				parentNode = self.closest('[search-parent-js]'),
				dropNode = parentNode.querySelector('[search-drop-js]');

			if(selfVal.length > 0) {
				dropNode.classList.add('is-open');
			} else {
				dropNode.classList.remove('is-open');
			}
		}, false);
	};


	const boxHover = () => {
		const swiperSlide = document.querySelectorAll('.swiper-slide'),
			boxDetails = document.querySelectorAll('.list__box');

		for(let [idx, box] of boxDetails.entries()) {
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
		}
	};


	const boxMore = () => {
		function playPause(vid) {
			vid.pause();
			vid.currentTime = 0;
			vid.load();
		}

		const _btns = document.querySelectorAll('.list__box-more');

		for(let btn of _btns) {
			btn.addEventListener('click', (ev) => {
				const _el = ev.currentTarget,
					_boxParent = _el.closest('.list__box'),
					_boxID = _boxParent.getAttribute('data-id'),
					_parentNode = _el.closest('.list__box-wrapper');

				const _specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');

				const listBoxes = document.querySelectorAll('.list__box'),
					listSpecifications = document.querySelectorAll('.list__specification'),
					videoPlayers = document.querySelectorAll('.list__specification video'),
					pauseToggle = document.querySelectorAll('[video-pause-js]');


				for(let [idx, playBtn] of document.querySelectorAll('[video-toggle-js]').entries()) {
					playBtn.classList.remove('is-active');
					pauseToggle[idx].classList.remove('is-active');
					listBoxes[idx].classList.remove('is-active');

					listSpecifications[idx].style.display = 'none';

					playPause(videoPlayers[idx]);
				}

				_boxParent.classList.add('is-active');
				_specificationBox.style.display = 'flex';

				_parentNode.classList.add('is-open');
			}, false);
		}

		// =====

		const closeBtns = document.querySelectorAll('.list__specification-close');

		for(let btn of closeBtns) {
			btn.addEventListener('click', (ev) => {
				const _el = ev.currentTarget,
					parent = _el.closest('.list__specification'),
					vid = parent.querySelector('video'),
					pauseToggle = parent.querySelector('[video-pause-js]');

				_el.closest('.list__specification').style.display = 'none';

				if(parent.querySelector('[video-toggle-js]')) {
					pauseToggle.classList.remove('is-active');
					parent.querySelector('[video-toggle-js]').classList.remove('is-active');
					playPause(vid);
				}

				for(let btn of document.querySelectorAll('.list__box-more')) {
					btn.closest('.list__box').classList.remove('is-active');
				}
			}, false);
		}
	};


	const videoToggle = () => {
		function playPause(vid) {
			if (vid.paused) {
				vid.play();
			} else {
				vid.pause();
			}
		}

		const videoPlayBtns = document.querySelectorAll('[video-toggle-js]'),
			videoPauseBtns = document.querySelectorAll('[video-pause-js]');

		for(let btn of videoPlayBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					parentVideoNode = el.closest('[video-parent-js]'),
					vid = parentVideoNode.querySelector('[video-js]'),
					pauseToggle = parentVideoNode.querySelector('[video-pause-js]');

				el.classList.add('is-active');
				pauseToggle.classList.add('is-active');

				playPause(vid);
			}, false);
		}

		for(let btn of videoPauseBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					parentVideoNode = el.closest('[video-parent-js]'),
					vid = parentVideoNode.querySelector('[video-js]'),
					playToggle = parentVideoNode.querySelector('[video-toggle-js]');

				el.classList.remove('is-active');
				playToggle.classList.remove('is-active');

				playPause(vid);
			}, false);
		}
	};


	const detailsToggleAction = () => {
		const favoritesBtns = document.querySelectorAll('[favorites-toggle-js]'),
			specFavoritesBtns = document.querySelectorAll('[spec-favorites-js]'),
			likeBtns = document.querySelectorAll('[like-toggle-js]'),
			specLikeBtns = document.querySelectorAll('[spec-like-js]'),
			dislikeBtns = document.querySelectorAll('[dislike-toggle-js]'),
			specDislikeBtns = document.querySelectorAll('[spec-dislike-js]');

		for(let btn of favoritesBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elParent = el.closest('.list__box-wrapper');

				const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					specificationFavoritesBtn = specificationBlock.querySelector('[data-favorites="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				specificationFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for(let btn of specFavoritesBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-favorites'),
					elParent = el.closest('.list__box-wrapper');

				const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					listFavoritesBtn = listBlock.querySelector('.list__box-favorites[data-id="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				listFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for(let btn of likeBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elParent = el.closest('.list__box-wrapper');

				const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					specificationFavoritesBtn = specificationBlock.querySelector('[data-like="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				specificationFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for(let btn of specLikeBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-like'),
					elParent = el.closest('.list__box-wrapper');

				const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					listFavoritesBtn = listBlock.querySelector('.list__box-like[data-id="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				listFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for(let btn of dislikeBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elParent = el.closest('.list__box-wrapper');

				const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					specificationFavoritesBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				specificationFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for(let btn of specDislikeBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-dislike'),
					elParent = el.closest('.list__box-wrapper');

				const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					listFavoritesBtn = listBlock.querySelector('.list__box-dislike[data-id="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				listFavoritesBtn.classList.toggle('is-active');
			}, false);
		}
	};


	const listIndicator = () => {
		const listBoxes = document.querySelectorAll('[list-box-js]');

		for(let box of listBoxes) {

			box.addEventListener('mouseenter', function(ev) {
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

			box.addEventListener('mouseleave', function(ev) {});
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
	const initNative = () => {
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

	window.addEventListener('load', (ev) => {
		initNative();
	});
})();
