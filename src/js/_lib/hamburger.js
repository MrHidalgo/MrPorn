

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
const initHamburger = () => {

  const btnHamburger = document.querySelector("[hamburger-js]"),
    hideScrollContainer = document.querySelectorAll("html, body"),
    mobileContainer = document.querySelector("[mobile-block-js]");

  const mobileMenuTop = document.querySelector(".pre-header__mobile-top");

	if(btnHamburger) {
		btnHamburger.addEventListener("click", (ev) => {
			const elem = ev.currentTarget;

			if(!mobileMenuTop){
				renderMobileMenu();
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
		searchContainer = document.querySelector('[search-mobile-js]');

	if(searchHamburger) {
		searchHamburger.addEventListener("click", (ev) => {
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

			setInnerHeight();
		});
	}
};

const renderMobileMenu = () => {
	const langHtml = document.querySelector('.lang').outerHTML;
	const mobileContainer = document.querySelector("[mobile-block-js]");

	const navCategoriesLink = document.querySelector('.header__nav-link.link_categories').getAttribute('href');
	const navLinkGames = document.querySelector('.header_nav_games').getAttribute('href');
	const navLinkMeet = document.querySelector('.header_nav_meet').getAttribute('href');
	const navLinkLiveSex = document.querySelector('.header_nav_dating.live_sex_nav').getAttribute('href');

	let currentLang = document.documentElement.getAttribute('lang');

	let linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="/sign-up/"><i class="icon-font icon-key"></i><span>'+_t('sign_up', 'Sign Up')+'</span></a></div>';
	if(window.logoutUrl){
		linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="'+window.logoutUrl+'"><i class="icon-font icon-key"></i><span>LOGOUT</span></a></div>';
	}

	if(!window.favHtmlMobile){
		window.favHtmlMobile = '';
	}

	const mobileNavHtml = '<div>' +
		'            <div class="pre-header__mobile-top">' +
		'              <div><a class="pre-header__signin mobile_login_link" href="/login/"><i class="icon-font icon-enter"></i><span>'+_t('login', 'Login')+'</span></a></div>' +
		linkSignup+
		'            </div>' +
		'            <div class="pre-header__mobile-middle">' +
									'<p class="pre-header__heading"><i></i><span>'+_t('main', 'Main')+'</span></p>'+
		'<div class="header__toggle">' +
		'                <input type="checkbox" name="" id="toggle-mode-mobile" class="toggle-mode">' +
		'                <label for="toggle-mode-mobile">' +
		'                    <div class="header__toggle-left"><i class="icon-font icon-sun"></i></div>' +
		'                    <div class="header__toggle-right"><i class="icon-font icon-moon"></i></div><span></span>' +
		'                </label>' +
		'            </div>'+
		'              <div>'+langHtml+'</div>' +
		'            </div>' +
		'            <div class="pre-header__mobile-bottom main_mobile_menu">' +
		window.favHtmlMobile+
		'              <ul class="header__nav">' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navCategoriesLink+'" hreflang="'+currentLang+'">' +
		'                    <div><img class="icon-nav-folder" src="/wp-content/themes/mpg/images/menu/menu.svg#folder"/></div>' +
		'                    <div><span>'+_t('view_all_categories', 'View All Categories')+'</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/blog/" hreflang="en">' +
		'                    <div><img class="icon-nav-blog" src="/wp-content/themes/mpg/images/menu/menu.svg#blog"/></div>' +
		'                    <div><span>'+_t('blog', 'Blog')+'</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/webcam-videos/" hreflang="en">' +
		'                    <div><img class="icon-nav-videos" src="/wp-content/themes/mpg/images/menu/menu.svg#videos"/></div>' +
		'                    <div><span>'+_t('videos', 'Videos')+'</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/pornstars/" hreflang="en">' +
		'                    <div><img class="icon-nav-pornstars" src="/wp-content/themes/mpg/images/menu/menu.svg#pornstars"/></div>' +
		'                    <div><span>'+_t('pornstars', 'Pornstars')+'</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/porn-deals/" hreflang="en">' +
		'                    <div><img class="icon-nav-porncoupons" src="/wp-content/themes/mpg/images/menu/menu.svg#ticket"/></div>' +
		'                    <div><span>'+_t('porn-coupons', 'Porn Coupons')+'</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkGames+'" hreflang="'+currentLang+'" target="_blank">' +
		'                    <div><img class="icon-nav-porngames" src="/wp-content/themes/mpg/images/menu/menu.svg#joystick"/></div>' +
		'                    <div><span>'+_t('porn-games', 'Sex Games')+'</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkMeet+'" target="_blank" rel="nofollow">' +
		'                    <div><img class="icon-nav-sex" src="/wp-content/themes/mpg/images/menu/sex-icon.png"/></div>' +
		'                    <div><span>'+_t('meet-and-fuck', 'Meet & Fuck')+'</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkLiveSex+'" rel="nofollow" target="_blank">' +
		'                    <div><img class="icon-nav-livesex" src="/wp-content/themes/mpg/images/menu/menu.svg#webcam"/></div>' +
		'                    <div><span>'+_t('live-sex', 'Live sex')+'</span></div></a></li>' +
		'              </ul>' +
		'            </div>' +
		'            <div class="pre-header__mobile-middle">' +
		'              <div>' +
		'                <p class="pre-header__heading"><i></i><span>'+_t('connect_with_us', 'Connect With Us')+'</span></p>' +
		'              </div>' +
		'              <div></div>' +
		'            </div>' +
		'            <div class="pre-header__mobile-bottom">' +
		'              <ul class="header__nav">' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+translateLink('about-us')+'" hreflang="'+currentLang+'">' +
		'                    <div><img class="icon-nav-info" src="/wp-content/themes/mpg/images/menu/menu.svg#info"/></div>' +
		'                    <div><span>'+_t('footer_about', 'About Us')+'</span></div></a></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+translateLink('contact')+'" hreflang="'+currentLang+'">' +
		'                    <div><img class="icon-nav-mail" src="/wp-content/themes/mpg/images/menu/menu.svg#mail"/></div>' +
		'                    <div><span>'+_t('footer_contact', 'Contact Us')+'</span></div></a></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+translateLink('advertising')+'" hreflang="'+currentLang+'">' +
		'                    <div><img class="icon-nav-megaphone" src="/wp-content/themes/mpg/images/menu/menu.svg#megaphone"/></div>' +
		'                    <div><span>'+_t('title_advertising', 'Advertising')+'</span></div></a></li>' +
		'              </ul>' +
		'            </div>' +
		'          </div>';

	mobileContainer.innerHTML = mobileNavHtml;

	initFavDelete();
	initMobileThemeToggle()

	if(typeof initLoggedUser === "function"){
		if(window.innerWidth>1024){
			initLoggedUser();
		}
	}
}

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
