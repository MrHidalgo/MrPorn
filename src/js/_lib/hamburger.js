/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
let searchPage = 1;
let isSearchActive = false;

const initHamburger = () => {

  const btnHamburger = document.querySelector("[hamburger-js]"),
    hideScrollContainer = document.querySelectorAll("html, body"),
		mobileContainer = document.querySelector("#mobileMenu"),
		desktopMenuLang = document.querySelector("#header .lang__drop"),
		mobileMenuLangList = document.querySelector("#mobileMenu .lang__drop");


	if(btnHamburger) {
		btnHamburger.addEventListener("click", (ev) => {
			const elem = ev.currentTarget;

			if(mobileMenuLangList.innerHTML === ''){
				mobileMenuLangList.innerHTML = desktopMenuLang.innerHTML;
			}

			// Populate mobile menu when hamburger is clicked (only on first open)
			if(window.populateMobileMenu && !mobileContainer.classList.contains('is-open')) {
				// Determine which category items to use based on current filter
				let currentCategoryItems = window.filterA2z ? window.a2zCategories : window.categoryItems;
				if(currentCategoryItems) {
					window.populateMobileMenu(currentCategoryItems);
				}
			}

			// Populate mobile tags when hamburger is clicked (only on first open)
			if(SearchModule && !mobileContainer.classList.contains('is-open')) {
				SearchModule.populateMobileTags();
			}

			elem.classList.toggle("is-active");
			mobileContainer.classList.toggle("is-open");

			hideScrollContainer.forEach((val, idx) => {
				val.classList.toggle("is-hideScroll");
			});


			if(document.body.classList.contains('is-hideScroll')){
				setTimeout(function (){
					document.querySelector('.searchinput').focus();
				}, 500);
			}

		});
	}


	const searchHamburger = document.querySelector('.pre-header__hamburger'),
		searchContainer = document.querySelector('[search-mobile-js]'),
		languageToggle = document.querySelector('.mobile-menu .lang__toggle'),
		langDrop = document.querySelector('.mobile-menu .lang__drop');

	if(searchHamburger) {
		searchHamburger.addEventListener("click", (ev) => {
			setInnerHeight();
			// disableScroll()
			isSearchActive = true;

			const searchViewContainer = SearchModule ? SearchModule.getSearchViewContainer() : null;
			if (searchViewContainer) {
				// bodyScrollLock.disableBodyScroll(searchViewContainer);
			}

			btnHamburger.classList.remove("is-active");

			if(mobileContainer.classList.contains('is-open')){
				mobileContainer.classList.remove("is-open");
				searchContainer.classList.toggle("is-open");
			}else{
				mobileContainer.classList.remove("is-open");
				searchContainer.classList.toggle("is-open");

				hideScrollContainer.forEach((val, idx) => {
					val.classList.toggle("is-hideScroll");
				});
			}

		});
	}
	if(window.isMobileOrTablet && languageToggle && langDrop){
		languageToggle.addEventListener('click', (ev) => {
			langDrop.classList.toggle('open')
		})
	}

	const searchClose = document.querySelector('.search__close');
	if(searchClose){
		searchClose.addEventListener("click", (ev) => {
			searchContainer.classList.toggle("is-open");

			hideScrollContainer.forEach((val, idx) => {
				val.classList.toggle("is-hideScroll");
			});

			document.querySelector('[search-js]').value = '';
			hide(document.querySelector('[search-drop-mobile-js]'));
			document.querySelector('.search__drop').classList.remove('is-open');

			setInnerHeight();
			isSearchActive = false;
			// enableScroll()
			const searchViewContainer = SearchModule ? SearchModule.getSearchViewContainer() : null;
			if (searchViewContainer) {
				bodyScrollLock.enableBodyScroll(searchViewContainer);
			}

			document.body.classList.remove('has_search');

			let searchPagination = document.querySelector('.search_pagination');
			if(searchPagination){
				searchPagination.style.display = 'block'
			}

			if(searchPage){
				searchPage = 0;
			}
		});
	}
};


function translateLink(link){
	if(currentLang=='en'){
		return '/'+link+'/';
	}
	return '/'+currentLang+'/'+link+'/';
}

function initFavDelete(){
	document.querySelectorAll(".fav_delete").forEach(function(target){
		target.onclick = function(event){
			var siteId = 0;

			if(event.target.classList.contains('fav_delete')){
				siteId = event.target.dataset.id;
			}else if(event.target.parents('.fav_delete')){
				siteId = event.target.parents('.fav_delete')[0].dataset.id;
			}
			if(siteId){
				var deleteLink = event.target;
				var data={
					action:'remove_fav',
					site:siteId
				};

				postRequest(ajaxEndpoint, data, function (res) {
					event.target.closest('.site_listitem').remove();
				});
			}
		};
	});
}
