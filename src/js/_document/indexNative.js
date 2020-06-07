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



	const boxMore = () => {
		function playPause(vid) {
			if (vid.paused) {
				// some action
			} else {
				vid.pause();
				vid.currentTime = 0;
			}
		}

		const _btns = document.querySelectorAll('.list__box-more');

		for(let btn of _btns) {
			btn.addEventListener('click', (ev) => {
				const _el = ev.currentTarget,
					_boxParent = _el.closest('.list__box'),
					_boxID = _boxParent.getAttribute('data-id'),
					_parentNode = _el.closest('.list__box-wrapper');

				const _specificationBox = document.querySelector('.list__specification[data-id="' + _boxID + '"]');

				for(let box of document.querySelectorAll('.list__box')) {
					box.classList.remove('is-active');
				}
				for(let specification of document.querySelectorAll('.list__specification')) {
					specification.style.display = 'none';
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
					vid = parent.querySelector('video');

				_el.closest('.list__specification').style.display = 'none';
				parent.querySelector('[video-toggle-js]').classList.remove('is-active');

				playPause(vid);

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

		const videoBtns = document.querySelectorAll('[video-toggle-js]');

		for(let btn of videoBtns) {
			btn.addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					parentVideoNode = el.closest('[video-parent-js]'),
					vid = parentVideoNode.querySelector('[video-js]');

				el.classList.toggle('is-active');

				playPause(vid);
			}, false);
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
		boxMore();
		videoToggle();
		// ==========================================
	};

	window.addEventListener('load', (ev) => {
		initNative();
	});
})();
