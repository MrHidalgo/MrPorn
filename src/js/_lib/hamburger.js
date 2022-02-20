

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
		});
	}
};

const renderMobileMenu = () => {
	const langHtml = document.querySelector('.lang').outerHTML;
	const mobileContainer = document.querySelector("[mobile-block-js]");

	const navLinkGames = document.querySelector('.header_nav_games').getAttribute('href');
	const navLinkMeet = document.querySelector('.header_nav_meet').getAttribute('href');
	const navLinkLiveSex = document.querySelector('.header_nav_dating.live_sex_nav').getAttribute('href');

	let currentLang = document.documentElement.getAttribute('lang');

	let linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="/sign-up/"><i class="icon-font icon-key"></i><span>Sign Up</span></a></div>';
	if(window.logoutUrl){
		linkSignup = '<div><a class="pre-header__signup mobile_signup_link" href="'+window.logoutUrl+'"><i class="icon-font icon-key"></i><span>LOGOUT</span></a></div>';
	}

	if(!window.favHtmlMobile){
		window.favHtmlMobile = '';
	}

	const mobileNavHtml = '<div>' +
		'            <div class="pre-header__mobile-top">' +
		'              <div><a class="pre-header__signin mobile_login_link" href="/login/"><i class="icon-font icon-enter"></i><span>Login</span></a></div>' +
		linkSignup+
		'            </div>' +
		'            <div class="pre-header__mobile-middle">' +
									'<p class="pre-header__heading"><i></i><span>Main</span></p>'+
		'<div class="header__toggle">' +
		'                <input type="checkbox" name="" id="toggle-mode-mobile" class="toggle-mode" '+((isDark=='1')?'checked':'')+'>' +
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
		'                <li class="header__nav-item"><a class="header__nav-link" href="/categories/" hreflang="'+currentLang+'">' +
		'                    <div><i class="icon-png header-nav-folder"></i></div>' +
		'                    <div><span>View All Categories</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/blog/" hreflang="en">' +
		'                    <div><i class="icon-png header-nav-blog"></i></div>' +
		'                    <div><span>Blog</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/webcam-videos/" hreflang="en">' +
		'                    <div><i class="icon-png header-nav-videos"></i></div>' +
		'                    <div><span>Videos</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/pornstars/" hreflang="en">' +
		'                    <div><i class="icon-png header-nav-pornstars"></i></div>' +
		'                    <div><span>Pornstars</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/porn-deals/" hreflang="en">' +
		'                    <div><i class="icon-png header-nav-porncoupons"></i></div>' +
		'                    <div><span>Porn Coupons</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkGames+'" hreflang="'+currentLang+'" target="_blank">' +
		'                    <div><i class="icon-png header-nav-porngames"></i></div>' +
		'                    <div><span>Porn Games</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkMeet+'" target="_blank" rel="nofollow">' +
		'                    <div><i class="icon-png header-nav-meetfuck"></i></div>' +
		'                    <div><span>Meet & Fuck</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkLiveSex+'" rel="nofollow" target="_blank">' +
		'                    <div><i class="icon-png header-nav-livesex"></i></div>' +
		'                    <div><span>Live sex</span></div></a></li>' +
		'              </ul>' +
		'            </div>' +
		'            <div class="pre-header__mobile-middle">' +
		'              <div>' +
		'                <p class="pre-header__heading"><i></i><span>Connect With Us</span></p>' +
		'              </div>' +
		'              <div></div>' +
		'            </div>' +
		'            <div class="pre-header__mobile-bottom">' +
		'              <ul class="header__nav">' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+translateLink('about-us')+'" hreflang="'+currentLang+'">' +
		'                    <div><i class="icon-png header-nav-info"></i></div>' +
		'                    <div><span>About Us</span></div></a></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+translateLink('contact')+'" hreflang="'+currentLang+'">' +
		'                    <div><i class="icon-png header-nav-email"></i></div>' +
		'                    <div><span>Contact Us</span></div></a></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+translateLink('advertising')+'" hreflang="'+currentLang+'">' +
		'                    <div><i class="icon-png header-nav-megaphone"></i></div>' +
		'                    <div><span>Advertising</span></div></a></li>' +
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
