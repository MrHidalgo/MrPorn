/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */

const initHamburger = () => {

  const btnHamburger = document.querySelector("[hamburger-js]"),
    hideScrollContainer = document.querySelectorAll("html, body"),
    mobileContainer = document.querySelector("[search-mobile-js]"),
		menuContainer = document.querySelector('.header__menu_section');

  const mobileMenuTop = document.querySelector(".pre-header__mobile-top");

	if(btnHamburger) {
		btnHamburger.addEventListener("click", (ev) => {
			const elem = ev.currentTarget;

			elem.classList.toggle("is-active");
			menuContainer.classList.toggle("is-open");

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
		searchContainer = document.querySelector('[search-mobile-js]');

	if(searchHamburger) {
		searchHamburger.addEventListener("click", (ev) => {
			setInnerHeight();
			// disableScroll()
			isSearchActive = true;

			bodyScrollLock.disableBodyScroll(searchViewContainer);

			btnHamburger.classList.remove("is-active");

			menuContainer.classList.remove('is-open');

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

	const searchClose = document.querySelector('.category__close');
	if(searchClose){
		searchClose.addEventListener("click", (ev) => {
			searchContainer.classList.toggle("is-open");

			hideScrollContainer.forEach((val, idx) => {
				val.classList.toggle("is-hideScroll");
			});

			document.querySelector('[search-js]').value = '';
			hide(document.querySelector('[search-drop-mobile-js]'));
			document.querySelector('.category__drop').classList.remove('is-open');

			console.log('closing hamburger');
			setInnerHeight();
			isSearchActive = false;
			// enableScroll()
			bodyScrollLock.enableBodyScroll(searchViewContainer);

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
