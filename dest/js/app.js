'use strict';

/*
* ============================
*
* Include lib:
* - preventBehavior.js;
* - swiper.js;
* - hamburger;
*
* ============================
* */

var initHomeLazyLoad = function initHomeLazyLoad() {
	var listElm = document.querySelector('#infinite-list');

	var nextItem = 1;
	var loadMore = function loadMore() {
		for (var i = 0; i < 20; i++) {
			var item = document.createElement('li');
			item.innerText = 'Item ' + nextItem++;
			listElm.appendChild(item);
		}
	};

	// Detect when scrolled to bottom.
	listElm.addEventListener('scroll', function () {
		if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
			loadMore();
		}
	});

	// Initially load some items.
	loadMore();
};

var loadHomeData = function loadHomeData() {
	var url = 'http://mpg.c2136.cloudnet.cloud/wp-json/mpg/home/';

	fetch(url).then(function (res) {
		return res.json();
	}).then(function (out) {
		console.log('Checkout this JSON! ', out);
		homeData = out;
	}).catch(function (err) {
		throw err;
	});
};

var renderHompageSiteSlide = function renderHompageSiteSlide(category, index) {
	var siteItem = homeData[category].sites[index];

	var slideHtml = '<div class="swiper-slide">' + '<a class="list__box" list-box-js href="' + siteItem.link + '" data-id="' + siteItem.id + '" style="background-image: url(http://mpg.c2136.cloudnet.cloud/' + siteItem.thumb + ')">' + '<div class="list__box-overlay"></div>' + '<div class="list__box-border"></div><img class="list__box-logo" src="img/img-brazzers-logo.svg" alt="">' + '<div class="list__box-details">' + '<div class="list__box-details-left">' + '<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>' + '<p class="list__box-details-title">' + siteItem.name + '</p>' + '<div class="list__rating"><span>User Rating:</span>' + '<div><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star-fill"></i></div>' + '</div>' + '</div>' + '<div class="list__box-details-right">' + '<button class="list__box-like" type="button" data-id="1" like-toggle-js><i class="icon-font icon-like"></i></button>' + '<button class="list__box-dislike" type="button" data-id="1" dislike-toggle-js><i class="icon-font icon-like"></i></button>' + '<div class="c-popper">' + '<button class="list__box-favorites" type="button" data-id="1" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>' + '<div class="c-poppertext">' + '<u>Add To Favourites</u>' + '<u>Remove From Favourites</u>' + '</div>' + '</div>' + '</div>' + '</div>' + '<button class="list__box-more" type="button"><i class="icon-font icon-arrow-angle"></i></button>' + '</a>' + '</div>';
	return slideHtml;
};

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

	var btnHamburger = document.querySelector("[hamburger-js]"),
	    hideScrollContainer = document.querySelectorAll("html, body"),
	    mobileContainer = document.querySelector("[mobile-block-js]");

	var mobileMenuTop = document.querySelector(".pre-header__mobile-top");

	if (btnHamburger) {
		btnHamburger.addEventListener("click", function (ev) {
			var elem = ev.currentTarget;

			if (!mobileMenuTop) {
				renderMobileMenu();
			}

			elem.classList.toggle("is-active");
			mobileContainer.classList.toggle("is-open");

			hideScrollContainer.forEach(function (val, idx) {
				val.classList.toggle("is-hideScroll");
			});
		});
	}

	var searchHamburger = document.querySelector('.pre-header__hamburger'),
	    searchContainer = document.querySelector('[search-mobile-js]');

	if (searchHamburger) {
		searchHamburger.addEventListener("click", function (ev) {
			btnHamburger.classList.remove("is-active");
			mobileContainer.classList.remove("is-open");

			searchContainer.classList.toggle("is-open");

			hideScrollContainer.forEach(function (val, idx) {
				val.classList.toggle("is-hideScroll");
			});
		});
	}

	var searchClose = document.querySelector('.category__close');

	searchClose.addEventListener("click", function (ev) {
		searchContainer.classList.toggle("is-open");

		hideScrollContainer.forEach(function (val, idx) {
			val.classList.toggle("is-hideScroll");
		});

		document.querySelector('[search-js]').value = '';
		document.querySelector('.category__drop').classList.remove('is-open');
	});
};

var renderMobileMenu = function renderMobileMenu() {
	var langHtml = document.querySelector('.lang').outerHTML;
	var mobileContainer = document.querySelector("[mobile-block-js]");

	var mobileNavHtml = '<div>' + '            <div class="pre-header__mobile-top">' + '              <div><a class="pre-header__signin" href="#"><i class="icon-font icon-enter"></i><span>Sign In</span></a></div>' + '              <div><a class="pre-header__signup" href="#"><i class="icon-font icon-key"></i><span>Sign Up</span></a></div>' + '            </div>' + '            <div class="pre-header__mobile-middle">' + '<p class="pre-header__heading"><i></i><span>Main</span></p>' + '              <div>' + langHtml + '</div>' + '            </div>' + '            <div class="pre-header__mobile-bottom">' + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-folder"></i></div>' + '                    <div><span>View All Categories</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-home"></i></div>' + '                    <div><span>Home</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-blog"></i></div>' + '                    <div><span>Blog</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-videos"></i></div>' + '                    <div><span>Videos</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-pornstars"></i></div>' + '                    <div><span>Pornstars</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-porncoupons"></i></div>' + '                    <div><span>Porn Coupons</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-porngames"></i></div>' + '                    <div><span>Porn Games</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-meetfuck"></i></div>' + '                    <div><span>Meet & Fuck</span></div></a></li>' + '                <li class="header__nav-item header__nav-item--saparator"><span class="header__nav-separator"></span></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-livesex"></i></div>' + '                    <div><span>Live sex</span></div></a></li>' + '              </ul>' + '            </div>' + '            <div class="pre-header__mobile-middle">' + '              <div>' + '                <p class="pre-header__heading"><i></i><span>Connect With Us</span></p>' + '              </div>' + '              <div></div>' + '            </div>' + '            <div class="pre-header__mobile-bottom">' + '              <ul class="header__nav">' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-info"></i></div>' + '                    <div><span>About Us</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-email"></i></div>' + '                    <div><span>Contact Us</span></div></a></li>' + '                <li class="header__nav-item"><a class="header__nav-link" href="#">' + '                    <div><i class="icon-png header-nav-megaphone"></i></div>' + '                    <div><span>Advertising</span></div></a></li>' + '              </ul>' + '            </div>' + '          </div>';

	mobileContainer.innerHTML = mobileNavHtml;
};

var renderFavourites = function renderFavourites() {
	if (isMobileDevice) {
		return;
	}

	var favouritesDropDown = document.querySelector('[view-favorites-drop-js]');

	var favouriteData = [{ 'id': 1, 'name': 'Pornhub Premium', 'link': '#', 'image': 'img/img-black-porn-sites.png', 'image_2x': 'img/img-black-porn-sites@2x.png 2x' }, { 'id': 2, 'name': 'Pornhub Premium', 'link': '#', 'image': 'img/img-black-porn-sites.png', 'image_2x': 'img/img-black-porn-sites@2x.png 2x' }, { 'id': 3, 'name': 'Pornhub Premium', 'link': '#', 'image': 'img/img-black-porn-sites.png', 'image_2x': 'img/img-black-porn-sites@2x.png 2x' }, { 'id': 4, 'name': 'Pornhub Premium', 'link': '#', 'image': 'img/img-black-porn-sites.png', 'image_2x': 'img/img-black-porn-sites@2x.png 2x' }];

	var favouritesHtml = '';
	favouriteData.map(function (fav, index) {
		favouritesHtml += '<a class="header__view-link" href="' + fav.link + '"><div><span>' + index + '.</span></div><div><img src="' + fav.image + '" srcset="' + fav.image_2x + '" alt=""><p>' + fav.name + '</p></div><div><button type="button"><i class="icon-font icon-delete"></i></button><button type="button"><i class="icon-font icon-search"></i></button></div></a>';
	});
	favouritesDropDown.innerHTML = favouritesHtml;
};

var renderSorting = function renderSorting() {
	var sortingHtml = '<a class="sort__drop-link" href="#">A</a><a class="sort__drop-link" href="#">B</a><a class="sort__drop-link" href="#">C</a><a class="sort__drop-link" href="#">D</a><a class="sort__drop-link" href="#">E</a><a class="sort__drop-link" href="#">F</a><a class="sort__drop-link" href="#">G</a><a class="sort__drop-link" href="#">H</a><a class="sort__drop-link" href="#">I</a><a class="sort__drop-link" href="#">J</a><a class="sort__drop-link" href="#">K</a><a class="sort__drop-link" href="#">L</a><a class="sort__drop-link" href="#">M</a><a class="sort__drop-link" href="#">N</a><a class="sort__drop-link" href="#">O</a><a class="sort__drop-link" href="#">P</a><a class="sort__drop-link" href="#">Q</a><a class="sort__drop-link" href="#">R</a><a class="sort__drop-link" href="#">S</a><a class="sort__drop-link" href="#">T</a><a class="sort__drop-link" href="#">U</a><a class="sort__drop-link" href="#">V</a><a class="sort__drop-link" href="#">W</a><a class="sort__drop-link" href="#">X</a><a class="sort__drop-link" href="#">Y</a><a class="sort__drop-link" href="#">Z</a>' + '<div class="sort__drop-inner">' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-1">' + '<div><span>#1</span></div>' + '<div><img src="img/img-black-porn-sites.png" srcset="img/img-black-porn-sites@2x.png 2x" alt="">' + '<p><span>B</span>lack Porn Sites</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-1" collapse-body-js>' + '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-2">' + '<div><span>#2</span></div>' + '<div><img src="img/img-blog.png" srcset="img/img-blog@2x.png 2x" alt="">' + '<p>Porn <span>B</span>logs</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-2" collapse-body-js>' + '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-3">' + '<div><span>#3</span></div>' + '<div><img src="img/img-best-webcam-girls.png" srcset="img/img-best-webcam-girls@2x.png 2x" alt="">' + '<p><span>B</span>est Webcam Girls</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-3" collapse-body-js>' + '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '<div class="sort__collapse"><a class="sort__collapse-toggle" href="#" collapse-toggle-js data-container="sort-collapse-4">' + '<div><span>#4</span></div>' + '<div><img src="img/img-best-adult-ad-networks.png" srcset="img/img-best-adult-ad-networks@2x.png 2x" alt="">' + '<p><span>B</span>est Adult Ad Networks</p>' + '</div>' + '<div><i class="icon-font icon-arrow-angle"></i></div></a>' + '<div class="sort__collapse-body" id="sort-collapse-4" collapse-body-js>' + '<button type="button"><span>Free</span></button><img src="img/img-badge-premium.png" srcset="img/img-badge-premium@2x.png 2x" alt="">' + '</div>' + '</div>' + '</div>';

	var sortcontainer = document.querySelector('[sort-node-js]');
	sortcontainer.innerHTML = sortingHtml;
};

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

	var link = document.querySelectorAll("a");

	link.forEach(function (val, idx) {

		val.addEventListener("click", function (e) {
			if (val.getAttribute("href") === "#") {
				e.preventDefault();
			}
		});
	});
};

var renderSearch = function renderSearch() {
	var searchHtml = '<div class="category__drop-head">\n' + '                        <div>\n' + '                          <p class="category__title">Top Results (1257)</p>\n' + '                        </div>\n' + '                        <div>\n' + '                          <div class="category__btn-wrapper"><a class="category__btn category__btn--1" href="#"><img src="img/img-black-porn-sites.png" srcset="img/img-black-porn-sites@2x.png 2x" alt=""><span>Black Porn Sites</span></a><a class="category__btn category__btn--2" href="#"><img src="img/img-blog.png" srcset="img/img-blog@2x.png 2x" alt=""><span>Porn Blogs</span></a><a class="category__btn category__btn--3" href="#"><img src="img/img-black-porn-sites.png" srcset="img/img-black-porn-sites@2x.png 2x" alt=""><span>Black Porn Sites</span></a><a class="category__btn category__btn--4" href="#"><img src="img/img-blog.png" srcset="img/img-blog@2x.png 2x" alt=""><span>Porn Blogs</span></a><a class="category__btn category__btn--5" href="#"><img src="img/img-blog.png" srcset="img/img-blog@2x.png 2x" alt=""><span>Amateur Porn Sites</span></a></div>\n' + '                        </div>\n' + '                      </div>\n' + '                      <div class="category__drop-body">\n' + '                        <div class="category__list-wrapper">\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><img src="img/img-pornhub-icon.png" srcset="img/img-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><img src="img/img-brazzers-icon.png" srcset="img/img-brazzers-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Brazzers</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-view-bruzzers.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><img src="img/img-pornhub-icon.png" srcset="img/img-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><img src="img/img-pornhub-icon.png" srcset="img/img-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><img src="img/img-brazzers-icon.png" srcset="img/img-brazzers-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Brazzers</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-view-bruzzers.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div><img src="img/img-pornhub-icon.png" srcset="img/img-pornhub-icon@2x.png 2x" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Pornhub Premium</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-view-pornhub-premium.png" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--green"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>GF Sex</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-gfsex.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--green"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>GF Sex</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-gfsex.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                          <div><a class="category__list" href="#">\n' + '                              <div class="category__list-head">\n' + '                                <div class="gf gf--pink"><span>GF</span></div>\n' + '                                <div>\n' + '                                  <p>WatchMyGF</p>\n' + '                                </div>\n' + '                              </div>\n' + '                              <div class="category__list-body">\n' + '                                <div><img src="img/img-watchmygf.jpg" alt=""></div>\n' + '                                <div>\n' + '                                  <p>Premium Porn</p>\n' + '                                </div>\n' + '                              </div></a></div>\n' + '                        </div>\n' + '                      </div>\n' + '                      <div class="category__drop-footer"><a class="category__load" href="#">Load More</a>\n' + '                        <div class="category__pagination"><a class="category__pagination-btn is-active" href="#">1</a><a class="category__pagination-btn" href="#">2</a><a class="category__pagination-btn" href="#">3</a><a class="category__pagination-btn" href="#">4</a><a class="category__pagination-arrow" href="#"><i class="icon-font icon-arrow-angle"></i></a></div>\n' + '                      </div>';

	var searchDropdownContainer = document.querySelector('[search-drop-js]');
	searchDropdownContainer.innerHTML = searchHtml;
};

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
var initSwiper = function initSwiper() {
	var sliders = document.querySelectorAll('.listSwiper'),
	    slidersNode = document.querySelectorAll('.list__box-wrapper');

	function swiperCB(swiperName, sliderArrow) {
		var categorySwiper = new Swiper(swiperName, {
			loop: false,
			grabCursor: false,
			effect: 'slide',
			speed: 900,
			touchMoveStopPropagation: false,
			simulateTouch: false,
			allowSwipeToNext: true,
			allowSwipeToPrev: true,
			allowPageScroll: "auto",
			slidesPerView: 'auto',
			spaceBetween: 0,
			slidesPerGroup: 3,
			navigation: {
				nextEl: sliderArrow + ' .list__arrow--next',
				prevEl: sliderArrow + ' .list__arrow--prev'
			},
			on: {
				init: function init() {
					var swiperSlide = document.querySelectorAll('.swiper-slide');

					document.querySelector(swiperName).closest('.list__box-wrapper').style.opacity = '1';
					document.querySelector(swiperName).closest('.list__box-wrapper').classList.add('is-visible');

					swiperSlide[swiperSlide.length - 1].classList.add('is-last');
				},
				slideChange: function slideChange(e) {
					var swipeWrapper = categorySwiper.$wrapperEl[0];

					console.log('changing slide -' + swipeWrapper.dataset.category + ' - ' + categorySwiper.slides.count);
				}
			}
		});
	}

	var idx = null,
	    len = sliders.length;

	for (idx = 0; idx < len; idx++) {
		var sliderName = sliders[idx].getAttribute('data-id'),
		    sliderWrapper = slidersNode[idx].getAttribute('data-name');

		swiperCB('.swiper-container[data-id="' + sliderName + '"]', '.list__box-wrapper[data-name=\'' + sliderWrapper + '\']');
	}

	var mySwiper = document.querySelector('.swiper-container[data-category="18"]').swiper;
	mySwiper.appendSlide(['<div class="swiper-slide">Slide 10"</div>', '<div class="swiper-slide">Slide 11"</div>']);
};

/**
 * POLYFILL
 * ===================================
 */

var isMobileDevice = false;
var homeData = [];

if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var el = this;

		do {
			if (Element.prototype.matches.call(el, s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

/**
 * end POLYFILL
 * ===================================
 */

(function () {
	/**
  * MAIN CALLBACK
  * ===================================
  */
	var bodyClick = function bodyClick() {
		var className = '.header__view-wrapper, .sort';

		document.addEventListener('click', function (ev) {
			var _ev = ev.target;

			if (!_ev.closest(className)) {
				// VIEW FAVORITES
				document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
				document.querySelector('[view-favorites-drop-js]').classList.remove('is-open');

				// SORT
				document.querySelector('[sort-node-js]').classList.remove('is-open');

				if (document.querySelector('.sort__drop-inner')) {
					document.querySelector('.sort__drop-inner').classList.remove('is-open');
				}

				for (var i = 0; i < document.querySelectorAll('.sort__drop-link').length; i++) {
					document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
				}
			}
		}, false);
	};

	var viewFavoritesToggle = function viewFavoritesToggle() {
		var _btn = document.querySelector('[view-favorites-toggle-js]'),
		    _node = document.querySelector('[view-favorites-drop-js]');

		_btn.addEventListener('click', function (ev) {
			_btn.classList.toggle('is-active');
			_node.classList.toggle('is-open');

			document.querySelector('[sort-node-js]').classList.remove('is-open');
			document.querySelector('.sort__drop-inner').classList.remove('is-open');

			var i = null,
			    len = document.querySelectorAll('.sort__drop-link').length;

			for (i = 0; i < len; i++) {
				document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
			}
		}, false);
	};

	var sortCB = function sortCB() {
		var sortToggle = function sortToggle() {
			var toggleSort = document.querySelector('[sort-toggle-js]'),
			    nodeSort = document.querySelector('[sort-node-js]');

			toggleSort.addEventListener('click', function (ev) {
				if (nodeSort.innerHTML.trim() == '') {
					renderSorting();

					sortDropInner();
					sortCollapse();
				}

				nodeSort.classList.toggle('is-open');
			}, false);
		};
		var sortDropInner = function sortDropInner() {
			var links = document.querySelectorAll('.sort__drop-link'),
			    nodeDropInner = document.querySelector('.sort__drop-inner');

			var i = null,
			    len = links.length;

			for (i = 0; i < len; i++) {
				links[i].addEventListener('click', function (ev) {
					var el = ev.currentTarget;

					if (el.classList.contains('is-active')) {
						el.classList.remove('is-active');
						nodeDropInner.classList.remove('is-open');
					} else {
						for (var j = 0; j < links.length; j++) {
							links[j].classList.remove('is-active');
						}

						el.classList.add('is-active');
						nodeDropInner.classList.add('is-open');
					}
				}, false);
			}
		};
		var sortCollapse = function sortCollapse() {
			var toggles = document.querySelectorAll('[collapse-toggle-js]');

			var i = null,
			    len = toggles.length;

			for (i = 0; i < len; i++) {
				toggles[i].addEventListener('click', function (ev) {
					var el = ev.currentTarget,
					    container = document.getElementById(el.dataset.container);

					if (document.querySelector('.sort__collapse-body.is-open')) {
						document.querySelector('.sort__collapse-toggle.is-active').classList.remove('is-active');
						document.querySelector('.sort__collapse-body.is-open').classList.remove('is-open');
					}

					el.classList.toggle('is-active');
					container.classList.toggle('is-open');
				}, false);
			}
		};

		sortToggle();
	};

	var search = function search() {
		var searchInput = document.querySelector('[search-js]');

		searchInput.addEventListener('keyup', function (ev) {
			var self = ev.currentTarget,
			    selfVal = self.value,
			    parentNode = self.closest('[search-parent-js]'),
			    dropNode = parentNode.querySelector('[search-drop-js]');

			if (selfVal.length > 0) {
				dropNode.classList.add('is-open');
			} else {
				dropNode.classList.remove('is-open');
			}
		}, false);
	};

	var boxMore = function boxMore() {
		function playPause(vid) {
			vid.pause();
			vid.currentTime = 0;
			vid.load();
		}

		var btns = document.querySelectorAll('.list__box-more'),
		    closeBtns = document.querySelectorAll('.list__specification-close');

		var i = null,
		    len = btns.length;

		for (i = 0; i < len; i++) {
			btns[i].addEventListener('click', function (ev) {
				var _el = ev.currentTarget,
				    _boxParent = _el.closest('.list__box'),
				    _boxID = _boxParent.getAttribute('data-id'),
				    _parentNode = _el.closest('.list__box-wrapper');

				var hideScrollContainer = document.querySelectorAll("html, body"),
				    _specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');

				var jInner = null,
				    lInner = document.querySelectorAll('[video-toggle-js]').length;

				for (jInner = 0; jInner < lInner; jInner++) {
					document.querySelectorAll('[video-toggle-js]')[jInner].classList.remove('is-active');
					document.querySelectorAll('[video-pause-js]')[jInner].classList.remove('is-active');
					playPause(document.querySelectorAll('.list__specification video')[jInner]);
				}

				for (var k = 0; k < document.querySelectorAll('.list__box').length; k++) {
					document.querySelectorAll('.list__box')[k].classList.remove('is-active');
				}
				for (var _k = 0; _k < document.querySelectorAll('.list__specification').length; _k++) {
					document.querySelectorAll('.list__specification')[_k].classList.remove('is-open');
				}

				if (window.innerWidth < 1024) {
					setTimeout(function () {
						_parentNode.classList.add('is-open');
						_boxParent.classList.add('is-active');
						_specificationBox.classList.add('is-open');
					}, 500);
				} else {
					_parentNode.classList.add('is-open');
					_boxParent.classList.add('is-active');
					_specificationBox.classList.add('is-open');
				}

				if (window.innerWidth <= 1023) {
					hideScrollContainer.forEach(function (val, idx) {
						val.classList.add("is-hideScroll");
					});
				}
			}, false);
		}

		var idx = null,
		    lenClose = closeBtns.length;

		for (idx = 0; idx < lenClose; idx++) {
			closeBtns[idx].addEventListener('click', function (ev) {
				var _el = ev.currentTarget,
				    parent = _el.closest('.list__specification');

				_el.closest('.list__box-wrapper').classList.remove('is-open');
				_el.closest('.list__specification').classList.remove('is-open');

				if (window.innerWidth <= 1024) {
					document.querySelectorAll("html, body").forEach(function (val, idx) {
						val.classList.remove("is-hideScroll");
					});
				}

				if (parent.querySelector('[video-toggle-js]')) {
					parent.querySelector('[video-pause-js]').classList.remove('is-active');
					parent.querySelector('[video-toggle-js]').classList.remove('is-active');
					playPause(parent.querySelector('video'));
				}

				var jInner = null,
				    lInner = document.querySelectorAll('.list__box-more').length;

				for (jInner = 0; jInner < lInner; jInner++) {
					if (document.querySelectorAll('.list__box-more')[jInner].closest('.list__box').classList.contains('is-active')) {
						document.querySelectorAll('.list__box-more')[jInner].closest('.list__box').classList.remove('is-active');
					}
				}
			}, false);
		}
	};

	var videoToggle = function videoToggle() {
		function playPause(vid) {
			if (vid.paused) {
				vid.play();
			} else {
				vid.pause();
			}
		}

		var videoPlayBtns = document.querySelectorAll('[video-toggle-js]'),
		    videoPauseBtns = document.querySelectorAll('[video-pause-js]');

		for (var i = 0, len = videoPlayBtns.length; i < len; i++) {
			videoPlayBtns[i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    parentVideoNode = el.closest('[video-parent-js]');

				el.classList.add('is-active');
				parentVideoNode.querySelector('[video-pause-js]').classList.add('is-active');

				playPause(parentVideoNode.querySelector('[video-js]'));
			}, false);
		}

		for (var _i = 0, _len = videoPauseBtns.length; _i < _len; _i++) {
			videoPauseBtns[_i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    parentVideoNode = el.closest('[video-parent-js]');

				el.classList.remove('is-active');
				parentVideoNode.querySelector('[video-toggle-js]').classList.remove('is-active');

				playPause(parentVideoNode.querySelector('[video-js]'));
			}, false);
		}
	};

	var detailsToggleAction = function detailsToggleAction() {
		var favoritesBtns = document.querySelectorAll('[favorites-toggle-js]'),
		    specFavoritesBtns = document.querySelectorAll('[spec-favorites-js]'),
		    likeBtns = document.querySelectorAll('[like-toggle-js]'),
		    specLikeBtns = document.querySelectorAll('[spec-like-js]'),
		    dislikeBtns = document.querySelectorAll('[dislike-toggle-js]'),
		    specDislikeBtns = document.querySelectorAll('[spec-dislike-js]'),
		    skipBtns = document.querySelectorAll('.list__specification-skip');

		for (var i = 0, len = favoritesBtns.length; i < len; i++) {
			favoritesBtns[i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elParent = el.closest('.list__box-wrapper');

				var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
				    specificationFavoritesBtn = specificationBlock.querySelector('[data-favorites="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				specificationFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for (var _i2 = 0, _len2 = skipBtns.length; _i2 < _len2; _i2++) {
			skipBtns[_i2].addEventListener('click', function (ev) {
				ev.currentTarget.classList.toggle('is-active');
			}, false);
		}

		for (var _i3 = 0, _len3 = specFavoritesBtns.length; _i3 < _len3; _i3++) {
			specFavoritesBtns[_i3].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-favorites'),
				    elParent = el.closest('.list__box-wrapper');

				var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
				    listFavoritesBtn = listBlock.querySelector('.list__box-favorites[data-id="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				listFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for (var _i4 = 0, _len4 = likeBtns.length; _i4 < _len4; _i4++) {
			likeBtns[_i4].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elParent = el.closest('.list__box-wrapper');

				ev.currentTarget.classList.toggle('is-active');
				elParent.querySelector('[dislike-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

				var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
				    specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]'),
				    specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');

				specificationLikeBtn.classList.toggle('is-active');
				specificationDislikeBtn.parentElement.classList.toggle('is-hide');
			}, false);
		}

		for (var _i5 = 0, _len5 = specLikeBtns.length; _i5 < _len5; _i5++) {
			specLikeBtns[_i5].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-like'),
				    elParent = el.closest('.list__box-wrapper'),
				    elActionNode = el.closest('[spec-actionNode-js]'),
				    dislikeBtn = elActionNode.querySelector('[spec-dislike-js]');

				dislikeBtn.parentElement.classList.toggle('is-hide');

				var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
				    listLikeBtn = listBlock.querySelector('.list__box-like'),
				    listDislikeBtn = listBlock.querySelector('.list__box-dislike');

				ev.currentTarget.classList.toggle('is-active');

				listLikeBtn.classList.toggle('is-active');
				listDislikeBtn.classList.toggle('is-hide');
			}, false);
		}

		for (var _i6 = 0, _len6 = dislikeBtns.length; _i6 < _len6; _i6++) {
			dislikeBtns[_i6].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elParent = el.closest('.list__box-wrapper');

				ev.currentTarget.classList.toggle('is-active');
				elParent.querySelector('[like-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

				var specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
				    specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]'),
				    specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]');

				specificationDislikeBtn.classList.toggle('is-active');
				specificationLikeBtn.parentElement.classList.toggle('is-hide');
			}, false);
		}

		for (var _i7 = 0, _len7 = specDislikeBtns.length; _i7 < _len7; _i7++) {
			specDislikeBtns[_i7].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-dislike'),
				    elParent = el.closest('.list__box-wrapper'),
				    elActionNode = el.closest('[spec-actionNode-js]'),
				    likeBtn = elActionNode.querySelector('[spec-like-js]');

				likeBtn.parentElement.classList.toggle('is-hide');

				var listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
				    listDislikeBtn = listBlock.querySelector('.list__box-dislike'),
				    listLikeBtn = listBlock.querySelector('.list__box-like');

				ev.currentTarget.classList.toggle('is-active');

				listDislikeBtn.classList.toggle('is-active');
				listLikeBtn.classList.toggle('is-hide');
			}, false);
		}
	};

	var listIndicator = function listIndicator() {
		var listBoxes = document.querySelectorAll('[list-box-js]');

		for (var i = 0, len = listBoxes.length; i < len; i++) {
			listBoxes[i].addEventListener('mouseenter', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elWidth = el.clientWidth;

				var parent = el.closest('[list-parent-js]'),
				    listIndicator = parent.querySelector('[list-line-js]');

				var listIndicatorWidth = 0;

				if (window.innerWidth >= 1024) {
					listIndicatorWidth = 64;
				} else if (window.innerWidth >= 768) {
					listIndicatorWidth = 34;
				} else {
					listIndicatorWidth = 14;
				}

				var _elRect = el.getBoundingClientRect();

				var _listContainer = document.querySelector('#list .list__box-wrapper'),
				    _listContainerDimm = _listContainer.getBoundingClientRect();

				var _sum = 0;

				for (var idx = 1; idx < elID; idx++) {
					if (_elRect.width * idx < _elRect.x - _listContainerDimm.x) {
						_sum++;
					} else {
						break;
					}
				}

				var _indicatorOffset = (elWidth - listIndicatorWidth) / 2,
				    _lineOffset = _elRect.width * _sum + (_sum * 6 - 3) + _indicatorOffset;

				listIndicator.setAttribute('style', 'transform: translateX(' + _lineOffset + 'px)');
			});
		}
	};

	var boxHover = function boxHover() {
		var swiperSlides = document.querySelectorAll('.swiper-slide'),
		    listBoxBody = document.querySelectorAll('.list__box-body');

		var tOut = null,
		    hoverBool = false;

		for (var i = 0, len = swiperSlides.length; i < len; i++) {
			swiperSlides[i].addEventListener('mouseenter', function (ev) {
				if (window.innerWidth >= 1280) {
					var el = ev.currentTarget,
					    elParent = el.closest('[list-parent-js]'),
					    lineInd = elParent.querySelector('[list-line-js]');

					setTimeout(function () {
						var transformVal = '';

						if (lineInd.getAttribute("style")) {
							var val = lineInd.getAttribute("style");

							if (val.indexOf(';') === -1) {
								transformVal = val;
							} else {
								transformVal = val.substring(0, val.indexOf(';'));
							}
						}

						if (hoverBool) {
							el.classList.add('is-hover');
							lineInd.setAttribute('style', transformVal + ';width: 189px');
						} else {
							tOut = setTimeout(function () {
								hoverBool = true;
								el.classList.add('is-hover');

								lineInd.setAttribute('style', transformVal + ';width: 189px');
							}, 750);
						}
					}, 0);
				}
			}, false);

			swiperSlides[i].addEventListener('mouseleave', function (ev) {
				if (window.innerWidth >= 1280) {
					var el = ev.currentTarget,
					    elParent = el.closest('[list-parent-js]'),
					    lineInd = elParent.querySelector('[list-line-js]');

					var transformVal = '';

					if (lineInd.getAttribute("style")) {
						var val = lineInd.getAttribute("style");

						if (val.indexOf(';') === -1) {
							transformVal = val;
						} else {
							transformVal = val.substring(0, val.indexOf(';'));
						}
					}

					clearTimeout(tOut);
					el.classList.remove('is-hover');

					lineInd.setAttribute('style', transformVal + ';width: 64px');
				}
			}, false);
		}

		for (var _i8 = 0, _len8 = listBoxBody.length; _i8 < _len8; _i8++) {
			listBoxBody[_i8].addEventListener('mouseleave', function (ev) {
				if (window.innerWidth >= 1280) {
					hoverBool = false;

					clearTimeout(tOut);

					for (var j = 0, l = swiperSlides.length; j < l; j++) {
						swiperSlides[j].classList.remove('is-hover');
					}
				}
			}, false);
		}
	};

	var detectDevice = function detectDevice() {
		var check = false;

		function _helper() {
			(function (a) {
				if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
			})(navigator.userAgent || navigator.vendor || window.opera);

			if (check) {
				isMobileDevice = true;
				document.getElementsByTagName('body')[0].classList.add('is-mobile');
			} else {
				isMobileDevice = false;
				document.getElementsByTagName('body')[0].classList.remove('is-mobile');
			}
		}

		_helper();

		window.addEventListener('resize', function () {
			_helper();
		});
	};

	var skipModal = function skipModal() {
		var skipBtns = document.querySelectorAll('[spec-skip-js]');

		for (var i = 0, len = skipBtns.length; i < len; i++) {
			skipBtns[i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = el.getAttribute('data-id'),
				    elParent = el.closest('.list__box-wrapper');

				setTimeout(function () {
					el.closest('.list__specification').querySelector('.list__specification-close').click();
				}, 0);

				if (elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]')) {
					elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]').classList.add('is-open');
				}
			}, false);
		}
	};

	var toggleMoreBox = function toggleMoreBox() {
		var moreBoxes = document.querySelectorAll('[list-box-more-js]');

		for (var i = 0; i < moreBoxes.length; i++) {
			moreBoxes[i].addEventListener('click', function (ev) {
				var el = ev.currentTarget,
				    elID = Number(el.getAttribute('data-id')),
				    elCount = Number(el.getAttribute('data-count')),
				    elParent = el.closest('.list__box-wrapper');

				var listBoxCount = elParent.querySelectorAll('.list__box-body .list__box').length;

				el.closest('.list__specification').querySelector('.list__specification-close').click();

				if (elID + 6 <= listBoxCount) {
					console.log('Good');

					elParent.querySelector('.list__specification[data-id="' + (elID + elCount) + '"]').classList.add('is-open');
				} else {
					var remainder = 6 - (listBoxCount - elID);

					if (remainder === 6) {
						elParent.querySelector('.list__specification[data-id="' + elCount + '"]').classList.add('is-open');
					} else {
						elParent.querySelector('.list__specification[data-id="' + (elID + elCount) + '"]').classList.add('is-open');
					}

					elParent.querySelector('.list__specification[data-id="' + elCount + '"]').classList.add('is-open');
				}
			}, false);
		}
	};
	/**
  * end MAIN CALLBACK
  * ===================================
  */

	/**
  * @name initNative
  *
  * @description Init all method
  */
	var initNative = function initNative() {
		// default
		initPreventBehavior();
		// ==========================================

		// lib
		initSwiper();
		initHamburger();
		// ==========================================

		// callback
		detectDevice();
		bodyClick();

		renderFavourites();

		viewFavoritesToggle();
		sortCB();
		search();
		boxHover();
		boxMore();
		videoToggle();
		listIndicator();
		detailsToggleAction();
		skipModal();
		toggleMoreBox();
		// ==========================================

		loadHomeData();
	};

	/**
  * @description Init all CB after page load
  */
	window.addEventListener('load', function (ev) {
		initNative();
	});

	window.addEventListener('resize', function () {
		if (window.innerWidth > 1023) {
			if (document.querySelector('.list__specification.is-open')) {
				document.getElementsByTagName('html')[0].classList.remove('is-hideScroll');
				document.getElementsByTagName('body')[0].classList.remove('is-hideScroll');
			}
		} else {
			if (document.querySelector('.list__specification.is-open')) {
				document.getElementsByTagName('html')[0].classList.add('is-hideScroll');
				document.getElementsByTagName('body')[0].classList.add('is-hideScroll');
			}
		}
	});
})();