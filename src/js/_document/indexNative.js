/**
 * @description Document DOM ready.
 */
(function () {
	/*
	* =============================================
	* CALLBACK :: start
	* ============================================= */
	const bodyClick = () => {
		const specifiedElement = document.querySelector('.header__view-wrapper');

		document.addEventListener('click', function(ev) {
			const isClickInside = specifiedElement.contains(ev.target);

			if (!isClickInside) {
				document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
				document.querySelector('[view-favorites-drop-js]').classList.remove('is-open');
			}
		});
	};


	const viewFavoritesToggle = () => {
		const _btn = document.querySelector('[view-favorites-toggle-js]'),
			_node = document.querySelector('[view-favorites-drop-js]');

		_btn.addEventListener('click', (ev) => {
			_btn.classList.toggle('is-active');
			_node.classList.toggle('is-open');
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
		// ==========================================
	};

	window.addEventListener('load', (ev) => {
		initNative();
	});
})();
