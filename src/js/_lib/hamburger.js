

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
const initHamburger = () => {

  const btnHamburger = document.querySelector("[hamburger-js]"),
    hideScrollContainer = document.querySelectorAll("html, body"),
    mobileContainer = document.querySelector("[mobile-block-js]");

	if(btnHamburger) {
		btnHamburger.addEventListener("click", (ev) => {
			const elem = ev.currentTarget;

			elem.classList.toggle("is-active");
			mobileContainer.classList.toggle("is-open");

			hideScrollContainer.forEach((val, idx) => {
				val.classList.toggle("is-hideScroll");
			});

		});
	}


	const searchHamburger = document.querySelector('.pre-header__hamburger'),
		searchContainer = document.querySelector('[search-mobile-js]');

	if(searchHamburger) {
		searchHamburger.addEventListener("click", (ev) => {
			btnHamburger.classList.remove("is-active");
			mobileContainer.classList.remove("is-open");

			searchContainer.classList.toggle("is-open");

			hideScrollContainer.forEach((val, idx) => {
				val.classList.toggle("is-hideScroll");
			});

		});
	}

	const searchClose = document.querySelector('.category__close');

	searchClose.addEventListener("click", (ev) => {
		searchContainer.classList.toggle("is-open");

		hideScrollContainer.forEach((val, idx) => {
			val.classList.toggle("is-hideScroll");
		});

		document.querySelector('[search-js]').value = '';
		document.querySelector('.category__drop').classList.remove('is-open');
	});
};
