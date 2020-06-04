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
		// ==========================================

		// callback
		bodyClick();
		viewFavoritesToggle();
		sortCB();
		search();
		// ==========================================
	};

	window.addEventListener('load', (ev) => {
		initNative();
	});
})();
