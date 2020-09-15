

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
		hide(document.querySelector('[search-drop-mobile-js]'));
		document.querySelector('.category__drop').classList.remove('is-open');
	});
};

const renderMobileMenu = () => {
	const langHtml = document.querySelector('.lang').outerHTML;
	const mobileContainer = document.querySelector("[mobile-block-js]");

	const navLinkGames = document.querySelector('.header_nav_games').getAttribute('href');
	const navLinkMeet = document.querySelector('.header_nav_meet').getAttribute('href');
	const navLinkLiveSex = document.querySelector('.header_nav_dating').getAttribute('href');


	const mobileNavHtml = '<div>' +
		'            <div class="pre-header__mobile-top">' +
		'              <div><a class="pre-header__signin mobile_login_link" href="/login/"><i class="icon-font icon-enter"></i><span>Sign In</span></a></div>' +
		'              <div><a class="pre-header__signup mobile_signup_link" href="/sign-up/"><i class="icon-font icon-key"></i><span>Sign Up</span></a></div>' +
		'            </div>' +
		'            <div class="pre-header__mobile-middle">' +
									'<p class="pre-header__heading"><i></i><span>Main</span></p>'+
		'              <div>'+langHtml+'</div>' +
		'            </div>' +
		'            <div class="pre-header__mobile-bottom">' +
		'              <ul class="header__nav">' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/categories/">' +
		'                    <div><i class="icon-png header-nav-folder"></i></div>' +
		'                    <div><span>View All Categories</span></div></a></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/">' +
		'                    <div><i class="icon-png header-nav-home"></i></div>' +
		'                    <div><span>Home</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/blog/">' +
		'                    <div><i class="icon-png header-nav-blog"></i></div>' +
		'                    <div><span>Blog</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/webcam-videos/">' +
		'                    <div><i class="icon-png header-nav-videos"></i></div>' +
		'                    <div><span>Videos</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/pornstars/">' +
		'                    <div><i class="icon-png header-nav-pornstars"></i></div>' +
		'                    <div><span>Pornstars</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/coupons/">' +
		'                    <div><i class="icon-png header-nav-porncoupons"></i></div>' +
		'                    <div><span>Porn Coupons</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkGames+'" target="_blank">' +
		'                    <div><i class="icon-png header-nav-porngames"></i></div>' +
		'                    <div><span>Porn Games</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkMeet+'" target="_blank">' +
		'                    <div><i class="icon-png header-nav-meetfuck"></i></div>' +
		'                    <div><span>Meet & Fuck</span></div></a></li>' +
		'                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="'+navLinkLiveSex+'" target="_blank">' +
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
		'                <li class="header__nav-item"><a class="header__nav-link" href="/about-us/">' +
		'                    <div><i class="icon-png header-nav-info"></i></div>' +
		'                    <div><span>About Us</span></div></a></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/contact/">' +
		'                    <div><i class="icon-png header-nav-email"></i></div>' +
		'                    <div><span>Contact Us</span></div></a></li>' +
		'                <li class="header__nav-item"><a class="header__nav-link" href="/advertising/">' +
		'                    <div><i class="icon-png header-nav-megaphone"></i></div>' +
		'                    <div><span>Advertising</span></div></a></li>' +
		'              </ul>' +
		'            </div>' +
		'          </div>';

	mobileContainer.innerHTML = mobileNavHtml;

	if(typeof initLoggedUser === "function"){
		initLoggedUser();
	}
}

