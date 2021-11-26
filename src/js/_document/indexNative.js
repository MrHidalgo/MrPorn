/**
 * POLYFILL
 * ===================================
 */

let isMobileDevice = false;
let homeData = [];

let currentPopupBanner;
let clonedPopupBanner;
let clonedPopupTimeout;
let isLoggedUser = false;
let dataTime;
let videoPaused = false;

let currentLang = 'en';


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

const cdnLink = '//mpgcdn.b-cdn.net';
const contentBase = '/wp-content/';
const themeBase = '/wp-content/themes/mpg/';
const ajaxEndpoint = '/wp-content/themes/mpg/ajax-handler-wp.php';
const ajaxAdminEndpoint = '/wp-admin/admin-ajax.php';


/**
 * end POLYFILL
 * ===================================
 */

function initWebWorker(){

	currentLang = document.documentElement.getAttribute('lang');
	let dataTag = "homepage_data_"+dataTime+'_'+currentLang;

	removeOtherStorageKeys(dataTime, currentLang);

	homeData = getWithExpiry("homepage_data_"+dataTime+'_'+currentLang);
	if(homeData){
		if(document.body.classList.contains('home')) {
			//setTimeout(renderAllOtherCategories, 100);
		}
	}else{
		if(!navigator.userAgent.toLowerCase().includes('lighthouse')){
			if(document.body.classList.contains('home')){
				loadHomeData();
			}
		}
	}
}
function removeOtherStorageKeys(dataTime, currentLang){
	let homeDataKey = "homepage_data_"+dataTime+'_'+currentLang;
	let translationDataKey = "i18n_"+dataTime;
	let letterMatrixDataKey = "letter_data_"+dataTime;

	for (var key in localStorage){
		if(key.includes('homepage_data_')){
			if(homeDataKey!=key){
				localStorage.removeItem(key);
			}
		}

		if(key.includes('i18n_')){
			if(translationDataKey!=key){
				localStorage.removeItem(key);
			}
		}

		if(key.includes('letter_data_')){
			if(letterMatrixDataKey!=key){
				localStorage.removeItem(key);
			}
		}
	}
}

function showAgeVerification(){
	if(document.documentElement.lang=='de'){
		var isVerified = getCookieMpgCookie("age");
		if(!isVerified){
			let avHtml = '<div class="modal_age">' +
				'<div class="modal_inner">' +
				'<img src="/wp-content/themes/mpg/images/logo-mob.png"/>'+
				'<div class="title">Altersüberprüfung</div>' +
				'<p>MrPornGeek ist eine Erwachsenen-Community, die altersbeschränkte Inhalte enthält.<br/>' +
				'Du musst 18 Jahre oder älter sein, um teilnehmen zu können.</p>' +
				'<button class="btnPrimary greyButton js-closeAgeModal">Ich bin 18 oder älter - Eingabe</button>'+
				'</div>' +
				'</div>';

			document.body.insertAdjacentHTML( 'beforeend', avHtml );
		}
	}
}

function verifyAge(){
	createCookie("age", "1", 356);
	if(document.querySelector('.modal_age')){
		document.querySelector('.modal_age').remove()
	}
}

function showAcceptCookie(){
	if(document.documentElement.lang=='de'){
		var isAccepted = getCookieMpgCookie("accept");
		if(!isAccepted){
			let avHtml = '<div class="cookieBanner">' +
				'Wir benutzen Cookies um die Funktionalität der Webseite zu optimieren und dir die beste Erfahrung mit uns zu bieten. '+
				'<button id="acceptCookie" class="acceptCookie">OK</button>'+
				'</div>';

			document.body.insertAdjacentHTML( 'beforeend', avHtml );
		}
	}
}
function verifyCookie(){
	createCookie("accept", "1", 356);
	if(document.querySelector('.cookieBanner')){
		document.querySelector('.cookieBanner').remove()
	}
}

let isCategoriesRendered = false;

(function () {
	/**
	 * MAIN CALLBACK
	 * ===================================
	 */

	if(!navigator.userAgent.toLowerCase().includes('lighthouse')){
		let vh = window.innerHeight * 0.01;
		if(document.body.classList.contains('home')){
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}

		initLoggedUser();
	}

	let headerHeight = document.querySelector('#header').getBoundingClientRect().height;


	const initHome = () =>{
		homeScroll();

		let cGridList = document.querySelector('.c-grid.list');
		if(cGridList){
			cGridList.addEventListener('mouseover', function(_ev) {
				if(_ev.target.closest('[list-box-js]')){
					siteBoxHover(_ev.target.closest('[list-box-js]'));
				}
			});
		}
	}

	const homeScroll = () => {
		if(document.body.classList.contains('home')){
			window.addEventListener('scroll', function(e) {
				onHomeScroll(e);
			});
		}
	}

	const onHomeScroll = (e) => {
		if(true){
			return;
		}


		let wY = window.scrollY;
		headerHeight = document.querySelector('#header').getBoundingClientRect().height;

		let categoryListH = document.querySelector('.c-grid.list').getBoundingClientRect().height;
		let listBoxes = document.querySelectorAll('.list__box-wrapper');
		let firstCategoryListHeight = listBoxes[0].getBoundingClientRect().height;

		let expectedY = headerHeight + categoryListH - (firstCategoryListHeight*8);

		let catListContainer = document.querySelector('.c-grid.list');

		if(wY > expectedY){
			if(!document.querySelector('[category_list_'+(listBoxes.length+1)+']')){

				if(homeData && homeData.categories_indexes){
					let catId = homeData.categories_indexes[listBoxes.length];

					let categoryHtml = renderSiteCategory(listBoxes.length);
					catListContainer.insertAdjacentHTML( 'beforeend', categoryHtml );

					swiperCB(
						`.swiper-container[data-id="listSlider_${catId}"]`,
						`.list__box-wrapper[data-name='category_${catId}']`
					);

					boxHover();
				}
			}
		}


	}

	const bodyClick = () => {
		const className = '.header__view-wrapper, .sort';


		document.addEventListener('click', function(ev) {
			const _ev = ev.target;

			if(!_ev.closest('.nav_link')){
				//ev.preventDefault();
			}

			if(_ev.closest('[sort-node-js]')){
				console.log('Clicked sorting');
				if(!isCategoriesRendered){
					isCategoriesRendered = true;
					renderAllOtherCategories();

				}
			}

			if(!_ev.closest('[sort-node-js]')){
				let openSort = document.querySelector('.sort__drop.is-open');
				if(openSort){
					openSort.classList.remove('is-open');
				}
			}

			if(!_ev.closest('.awe_search_result')){
				if(document.querySelector('#awe_search_term')){
					document.querySelector('#awe_search_term').value='';
				}
				hide(document.querySelector('.awe_search_result'))
			}

			if(_ev.closest('.scroll_to_category')){
				if(document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')){
					ev.preventDefault();
					scrollToCategoryOnHome(ev, _ev.closest('.scroll_to_category'));
				}
			}

			if(_ev.classList.contains('search_category_item')){
				if(document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')){

					scrollToCategoryOnHome(ev, _ev);
					hide(document.querySelector('[search-drop-js]'));
				}
			}else if(_ev.classList.contains('list__specification-visit')){
				if(document.querySelector('[video-js]')){
					playPause(document.querySelector('[video-js]'));
				}
			}else if(_ev.closest('.show_more_sites_trigger')){
				toggleMoreSimilarSites();
			}else if(_ev.classList.contains('read_more') | _ev.closest('.read_more') | _ev.closest('.list__specification-more')){

			}else if( _ev.classList.contains('list__specification-close') | _ev.parentNode.classList.contains('list__specification-close')){
				closeBanner(_ev);
			}else if(_ev.closest('.list__box-more')){
				showBanner(_ev, false, ev);

				//openSlideModal(ev);
			}else if(_ev.closest('[more-toggle-js]')){
				//showBanner(_ev);
				showBanner(_ev, false, ev);
			}else if(_ev.closest('[spec-like-js]')){
				onBannerLikeClick(_ev.closest('[spec-like-js]'));
			}else if(_ev.closest('[spec-dislike-js]')){
				onBannerDislikeClick(_ev.closest('[spec-dislike-js]'));
			}else if(_ev.classList.contains('js-closeAgeModal')){
				verifyAge();
			}else if(_ev.classList.contains('acceptCookie')){
				verifyCookie();
			}else if(_ev.closest('[like-toggle-js]')){
				onSiteBoxLikeClick(_ev.closest('[like-toggle-js]'));
			}else if(_ev.closest('[dislike-toggle-js]')){
				onSiteBoxDislikeClick(_ev.closest('[dislike-toggle-js]'));
			}else if(_ev.closest('[favorites-toggle-js]')){
				onSiteBoxFavourite(_ev.closest('[favorites-toggle-js]'));
			}else if(_ev.closest('[un-favorites-js]')){
				removeFavourite(_ev.closest('[un-favorites-js]'));
			}else if(_ev.closest('[spec-favorites-js]')){
				onBannerFavourite(_ev.closest('[spec-favorites-js]'));
			}else if(_ev.closest('[video-toggle-js]')){
				onPlayClick(_ev.closest('[video-toggle-js]'));
			}else if(_ev.closest('[video-pause-js]')){
				onPauseClick(_ev.closest('[video-pause-js]'));
			}else if(_ev.classList.contains('[video-parent-js]')){
				toggleVideoPlay(_ev);
			}else if(_ev.closest('[video-parent-js]')){
				toggleVideoPlay(_ev.closest('[video-parent-js]'));
			}else if(_ev.closest('[spec-skip-js]')){
				onSkip(_ev.closest('[spec-skip-js]'));
			}else if(_ev.closest('[sort-letter-collapse-js]')){
				//onSortLetterClick(_ev.closest('[sort-letter-collapse-js]'));
			}else if(_ev.closest('[collapse-toggle-js]')){
				onSortToggle(_ev.closest('[collapse-toggle-js]'));
			}else if(_ev.classList.contains('list__box-details')){
				onSiteBoxHoverClick(_ev);
			}else if(_ev.closest('.rating_stars') || _ev.classList.contains('rating_stars')){
				console.log('clicked ratings');
				onRatingClick();
			}else if(_ev.closest('.login_popup_close')){
				closeLoginPopups();
			}else if(_ev.classList.contains('popup_link_signup')){
				ev.preventDefault();
				toggleLoginPopups('join');
			}else if(_ev.classList.contains('popup_link_login')){
				ev.preventDefault();
				toggleLoginPopups('login');
			}else if(_ev.classList.contains('popup_link_forgot')){
				ev.preventDefault();
				toggleLoginPopups('forgot');
			}else if(_ev.classList.contains('hdrfavttl')){
				ev.preventDefault();
				document.querySelector('.mobile_fav_link').classList.toggle('open');
			}else if(_ev.classList.contains('close-modal') | _ev.parentNode.classList.contains('close-modal')){
				if(!isMobileOrTablet){
					cancelModal(ev);
				}
			}



			else if(_ev.parentNode && !_ev.closest('[search-parent-js]')){

				if(!isMobileOrTablet){
					if(document.querySelector('[search-js]')){
						document.querySelector('[search-js]').value='';
					}

					if(!_ev.closest('[search-parent-js]')){
						hide(document.querySelector('[search-drop-js]'));
					}
				}


			}

			if (!_ev.closest(className)) {
				// VIEW FAVORITES

				if(document.querySelector('[view-favorites-toggle-js]')){
					document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
				}
				if(document.querySelector('[view-favorites-drop-js]')){
					document.querySelector('[view-favorites-drop-js]').classList.remove('is-open');
				}

				// SORT
				if(!isMobileOrTablet){
					if(document.querySelector('[sort-node-js]')){
						document.querySelector('[sort-node-js]').classList.remove('is-open');
					}
				}
				if(document.querySelector('.sort__drop-inner')){
					document.querySelector('.sort__drop-inner').classList.remove('is-open');
				}


				var _isActive = document.querySelector('.sort__drop-link.is-active');
				if(_isActive){
					_isActive.classList.toggle('is-active');
				}
			}
		}, false);
	};

	function onSiteBoxHoverClick(_el){
		let siteBoxLink = _el.querySelector('.site_link')

		if(siteBoxLink && siteBoxLink.tagName=='A'){
			siteBoxLink.click();
		}
	}

	const viewFavoritesToggle = () => {
		const _btn = document.querySelector('[view-favorites-toggle-js]'),
			_node = document.querySelector('[view-favorites-drop-js]');

		if(_btn){
			_btn.addEventListener('click', (ev) => {
				_btn.classList.toggle('is-active');
				_node.classList.toggle('is-open');

				let sortNode = document.querySelector('[sort-node-js]');
				if(sortNode){
					sortNode.classList.remove('is-open');
				}

				let sortDropInner = document.querySelector('.sort__drop-inner');
				if(sortDropInner){
					sortDropInner.classList.remove('is-open');
				}

				let i = null,
					len = document.querySelectorAll('.sort__drop-link').length;

				for(i = 0; i < len; i++) {
					document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
				}
			}, false);
		}
	};


	const sortCB = () => {
		const sortToggle = () => {
			const toggleSort = document.querySelector('[sort-toggle-js]'),
				nodeSort = document.querySelector('[sort-node-js]');

			if(toggleSort){
				toggleSort.addEventListener('click', (ev) => {
					if(nodeSort.innerHTML.trim()==''){
						renderSorting();

						sortDropInner();
						sortCollapse();
					}

					nodeSort.classList.toggle('is-open');
				}, false);
			}
		};
		const sortDropInner = () => {
			const links = document.querySelectorAll('.sort__drop-link'),
				nodeDropInner = document.querySelector('.sort__drop-inner');

			let i = null,
				len = links.length;

			for(i = 0; i < len; i++) {
				links[i].addEventListener('click', (ev) => {
					const el = ev.currentTarget;

					if(el.classList.contains('is-active')) {
						el.classList.remove('is-active');
						nodeDropInner.classList.remove('is-open');
					} else {
						for(let j = 0; j < links.length; j++) {
							links[j].classList.remove('is-active');
						}

						el.classList.add('is-active');
						nodeDropInner.classList.add('is-open');
					}
				}, false);
			}
		};
		const sortCollapse = () => {
			const toggles = document.querySelectorAll('[collapse-toggle-js]');

			let i = null,
				len = toggles.length;

			for(i = 0; i < len; i++) {
				toggles[i].addEventListener('click', (ev) => {
					const el = ev.currentTarget,
						container = document.getElementById(el.dataset.container);

					if(document.querySelector('.sort__collapse-body.is-open')) {
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


	const search = () => {
		const searchInput = document.querySelector('[search-js]');
		if(searchInput){
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
		}

	};

	function playPause(vid) {
		if (vid.paused) {
			videoPaused = false;
			vid.play();
		} else {
			vid.pause();
			videoPaused = true;
		}
	}






	const videoToggle = () => {


		const videoPlayBtns = document.querySelectorAll('[video-toggle-js]'),
			videoPauseBtns = document.querySelectorAll('[video-pause-js]');

		for(let i = 0, len = videoPlayBtns.length; i < len; i++) {
			videoPlayBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
					onPlayClick(el);
			}, false);
		}

		for(let i = 0, len = videoPauseBtns.length; i < len; i++) {
			videoPauseBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
					onPauseClick(el);
			}, false);
		}
	};

	function onPlayClick(el){
		var parentVideoNode = el.closest('[video-parent-js]');

		el.classList.add('is-active');
		parentVideoNode.querySelector('[video-pause-js]').classList.add('is-active');

		playPause(parentVideoNode.querySelector('[video-js]'));
	}

	function onPauseClick(el){
		var parentVideoNode = el.closest('[video-parent-js]');

		el.classList.remove('is-active');
		parentVideoNode.querySelector('[video-toggle-js]').classList.remove('is-active');


		playPause(parentVideoNode.querySelector('[video-js]'));

		let videoJs = document.querySelector('[video-js]');
		if(videoJs.paused){
			videoPaused = true;
		}
	}

	function toggleVideoPlay(el){

		var parentVideoNode = el;

		let video = el.querySelector('[video-js]');
		if(video.paused){
			el.classList.add('is-active');
			parentVideoNode.querySelector('[video-toggle-js]').classList.add('is-active');
			parentVideoNode.querySelector('[video-pause-js]').classList.add('is-active');

		}else{
			el.classList.remove('is-active');
			parentVideoNode.querySelector('[video-toggle-js]').classList.remove('is-active');
			parentVideoNode.querySelector('[video-pause-js]').classList.remove('is-active');
		}

		playPause(el.querySelector('[video-js]'));
	}

	function onSiteBoxFavourite(el) {
		if(!isLoggedUser){
			renderLoginForm();
			return ;
		}

		var elID = el.getAttribute('data-id'),
			elParent = el.closest('.list__box-wrapper');

		console.log('Fav box '+elID);

		// const specificationFavoritesBtn = elParent.querySelector('[data-favorites="' + elID + '"]');

		el.classList.toggle('is-active');

		/*if(specificationFavoritesBtn){
			//specificationFavoritesBtn.classList.toggle('is-active');
		}*/

		addToFavourites(elID);
	}

	function onBannerFavourite(el){
		if(!isLoggedUser){
			renderLoginForm();
			return ;
		}

		var elID = el.getAttribute('data-id'),
			elParent = el.closest('.list__box-wrapper');

		addToFavourites(elID);

		//const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
			const listFavoritesBtn = document.querySelector('.list__box-favorites[data-id="' + elID + '"]');

			console.log('Clicking favourite button');

		el.classList.toggle('is-active');
		if(listFavoritesBtn){
			listFavoritesBtn.classList.toggle('is-active');
		}
	}

	function onSiteBoxLikeClick(el){

		var elID = el.getAttribute('data-id');

		el.classList.toggle('is-active');

		onLike(el, elID);

		document.querySelector('.list__box-dislike[data-id="' + elID + '"]').classList.toggle('is-hide');

		//const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]');
		const specificationBlock = document.querySelector('.list__specification[data-id="' + elID + '"]');

		if(specificationBlock){
			var	specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]'),
				specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');

			specificationLikeBtn.classList.toggle('is-active');
			specificationDislikeBtn.parentElement.classList.toggle('is-hide');
		}
	}

	function onBannerLikeClick(el){
		var elID = el.getAttribute('data-like'),
			elActionNode = el.closest('[spec-actionNode-js]'),
			dislikeBtn = elActionNode.querySelector('[spec-dislike-js]');

		console.log('Trying to like '+elID);

		dislikeBtn.parentElement.classList.toggle('is-hide');

		//const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
		// 	const listLikeBtn = document.querySelector('.list__specification-like.list__box-like[data-like="' + elID + '"]'),
		// 	listDislikeBtn = document.querySelector('.list__box-dislike.list__specification-dislike[data-dislike="' + elID + '"]');

		let listLikeBtn = document.querySelector('.list__specification-like[data-id="' + elID + '"]'),
			listDislikeBtn = document.querySelector('.list__specification-dislike[data-id="' + elID + '"]');

		if(!listLikeBtn){
			listLikeBtn = document.querySelector('.list__specification-like[data-like="' + elID + '"]');
		}
		if(!listDislikeBtn){
			listDislikeBtn = document.querySelector('.list__specification-dislike[data-dislike="' + elID + '"]');
		}

		//el.classList.toggle('is-active');



		if(listLikeBtn){
			listLikeBtn.classList.toggle('is-active');
		}
		if(listDislikeBtn){
			listDislikeBtn.classList.remove('is-active');
		}

		listDislikeBtn.classList.toggle('is-hide');

		onLike(el, elID);
	}

	function onSiteBoxDislikeClick(el){
		var elID = el.getAttribute('data-id');

		console.log('Disliking '+elID);



		document.querySelector('.list__box-like[data-id="' + elID + '"]').classList.toggle('is-hide');

		const specificationBlock = document.querySelector('.previewModal[data-site-id="' + elID + '"]');
		if(specificationBlock){
			var specificationLikeBtn = specificationBlock.querySelector('.list__box-like[data-id="' + elID + '"]'),
				specificationDislikeBtn = specificationBlock.querySelector('.list__box-dislike[data-id="' + elID + '"]');


			specificationLikeBtn.classList.remove('is-active')
			specificationDislikeBtn.classList.toggle('is-active');
			specificationLikeBtn.parentElement.classList.toggle('is-hide');

			onDisLike(el, elID);
		}

	}

	function onBannerDislikeClick(el){
			var elID = el.getAttribute('data-dislike'),
			elActionNode = el.closest('[spec-actionNode-js]'),
			likeBtn = elActionNode.querySelector('[spec-like-js]');

		likeBtn.parentElement.classList.toggle('is-hide');

		//const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
		// const listLikeBtn = document.querySelector('.list__specification-like.list__box-like[data-id="' + elID + '"]'),
		// 	listDislikeBtn = document.querySelector('.list__box-dislike.list__specification-dislike[data-id="' + elID + '"]');
		let listLikeBtn = document.querySelector('.list__specification-like[data-id="' + elID + '"]'),
			listDislikeBtn = document.querySelector('.list__specification-dislike[data-id="' + elID + '"]');

		if(!listLikeBtn){
			listLikeBtn = document.querySelector('.list__specification-like[data-like="' + elID + '"]')
		}
		if(!listDislikeBtn){
			listDislikeBtn = document.querySelector('.list__specification-dislike[data-dislike="' + elID + '"]')
		}

		if(listLikeBtn){
			listLikeBtn.classList.remove('is-active');
		}
		if(listDislikeBtn){
			listDislikeBtn.classList.toggle('is-active');
		}
		listLikeBtn.classList.toggle('is-hide');

		onDisLike(el, elID);
	}

	function initGotoTop(){
		var goTop = document.querySelector('.go-top');

		//adjustStickHeader();
		//loadOtherHomeCategories();

		window.onscroll = function(){
			//adjustStickHeader();
			//loadOtherHomeCategories();

			if (window.scrollY > 200) {
				show(goTop);
			} else {
				hide(goTop);
			}
		}
		document.querySelector('body').ontouchmove = function(){
			if(document.querySelector(".main-outer")){
				var mainScroll = -document.querySelector(".main-outer").getBoundingClientRect().top;
				if (mainScroll > 200) {
					show(goTop);
				} else {
					hide(goTop);
				}
			}
		}
		if(goTop){
			goTop.onclick = function(event) {
				doScrolling(0, 200);
				return false;
			}
		}

	}

	function adjustStickHeader(){
		if(!isMobileDevice && !document.body.classList.contains('single-sites')){
			if (window.pageYOffset >= 60) {
				document.body.classList.add('sticky_header');
			} else {
				document.body.classList.remove('sticky_header');
			}
		}
	}

	//Loading other categories on home
	function loadOtherHomeCategories(){

		const myEls = document.querySelectorAll(".observer-block");
		if(myEls.length==0){
			return;
		}

		const myObserver = new IntersectionObserver((elements) => {
			elements.forEach(function (index) {
				if (index.intersectionRatio > 0) {

					if(homeData && homeData.categories_indexes){
						if(!isCategoriesRendered){
							isCategoriesRendered = true;
							renderAllOtherCategories();
							myObserver.unobserve(myEls[0]);
						}
					}
				}
			});
		});


		if (myEls.length) {
			myObserver.observe(myEls[0]);
		}
		if (myEls.offsetTop < window.scrollY) {
			renderAllOtherCategories();
		}

		/*if (document.body.classList.contains('home') && window.scrollY > 500) {
			if(homeData && homeData.categories_indexes){
				if(!isCategoriesRendered){
					isCategoriesRendered = true;
					renderAllOtherCategories();

				}
			}
		}*/
	}

	const siteBoxHover = (el) => {
		let elID = el.getAttribute('data-id'),
			elWidth = el.clientWidth;

		const parent = el.closest('[list-parent-js]'),
			listIndicator = parent.querySelector('[list-line-js]');

		let listIndicatorWidth = 0;

		if(window.innerWidth >= 1024) {
			listIndicatorWidth = 64;
		} else if(window.innerWidth >= 768) {
			listIndicatorWidth = 34;
		} else {
			listIndicatorWidth = 14;
		}

		const _elRect = el.getBoundingClientRect();

		const _listContainer = document.querySelector('.c-grid.list .list__box-wrapper'),
			_listContainerDimm = _listContainer.getBoundingClientRect();

		let _sum = 0;

		for(let idx = 1; idx < elID; idx++) {
			if((_elRect.width * idx) < (_elRect.x - _listContainerDimm.x)) {
				_sum++;
			} else {
				break;
			}
		}

		let _indicatorOffset = (elWidth - listIndicatorWidth) / 2,
			_lineOffset = ((_elRect.width * _sum) + ((_sum * 6) - 3)) + _indicatorOffset;

		/*listIndicator.setAttribute(
			'style',
			'transform: translateX(' + _lineOffset + 'px)'
		);*/

	}


	const detectDevice = () => {
		let check = false;

		function _helper() {
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

			if(check) {
				isMobileDevice = true;
				document.getElementsByTagName('body')[0].classList.add('is-mobile');
			} else {
				isMobileDevice = false;
				document.getElementsByTagName('body')[0].classList.remove('is-mobile');
			}
		}

		_helper();

		window.addEventListener('resize', function() {
			_helper();
		});
	};


	const skipModal = () => {
		const skipBtns = document.querySelectorAll('[spec-skip-js]');
	};

	function onSkip(el){
			var elID = el.getAttribute('data-id'),
				elCategory = el.getAttribute('data-category'),
			elParent = document.querySelector('.list__box-wrapper[data-name="category_'+elCategory+'"]');

			var currentCategory = el.dataset.category;
			if(document.querySelector('[video-js]')){
				document.querySelector('[video-js]').pause();
			}

		if(window.innerWidth < 1024) {
			cloneCurrentPopupBanner();
		}


		//el.closest('.list__specification').querySelector('.list__specification-close').click();

		setTimeout(() => {
			var nextSite = elParent.querySelector('.swiper-slide[data-siteid="'+elID+'"]').nextSibling;

			if(nextSite){
				if(nextSite.querySelector('.list__box-more')){
					showBanner(nextSite.querySelector('.list__box-more'), true);
				}else{
					var nextIndex = nextSite.dataset.index;

					let prevItem = renderHompageSiteSlide(currentCategory, nextIndex);
					renderMobileMoreButton()
					if(prevItem && nextSite){
						nextSite.innerHTML = prevItem;
						showBanner(nextSite.querySelector('.list__box-more'), true);
					}
				}
			}else {
				var firstSite = elParent.querySelector('.swiper-slide').firstChild;
				if(firstSite){
					if(firstSite.querySelector('.list__box-more')){
						showBanner(firstSite.querySelector('.list__box-more'), true);
					}
				}
			}
		}, 100);
	}


	const toggleMoreBox = () => {
		const moreBoxes = document.querySelectorAll('[list-box-more-js]');

		for(let i = 0; i < moreBoxes.length; i++) {
			moreBoxes[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = Number(el.getAttribute('data-id')),
					elCount = Number(el.getAttribute('data-count')),
					elParent = el.closest('.list__box-wrapper');

				const listBoxCount = elParent.querySelectorAll('.list__box-body .list__box').length;

				el.closest('.list__specification').querySelector('.list__specification-close').click();

				if((elID + 6) <= listBoxCount) {
					elParent.querySelector('.list__specification[data-id="' + (elID + elCount) + '"]').classList.add('is-open');
				} else {
					const remainder = 6 - (listBoxCount - elID);

					if(remainder === 6) {
						elParent.querySelector('.list__specification[data-id="' + (elCount) + '"]').classList.add('is-open');
					} else {
						elParent.querySelector('.list__specification[data-id="' + (elID + elCount) + '"]').classList.add('is-open');
					}

					elParent.querySelector('.list__specification[data-id="' + (elCount) + '"]').classList.add('is-open');
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
	const initNative = () => {
		console.log('initNative');

		// default
		initPreventBehavior();
		// ==========================================

		currentLang = document.documentElement.getAttribute('lang');

		// lib
		//initSwiper();
		initHamburger();
		// ==========================================

		// callback
		detectDevice();
		bodyClick();

		dataTime = document.querySelector('meta[name="data_time"]').content;
		loadTranslations();

		initHome();

		renderFavourites();

		viewFavoritesToggle();
		//sortCB();

		if(isMobileOrTablet){
			sortCB();
		}


		initGotoTop();

		loadOtherHomeCategories();

		letterSearch();


		search();


		if(document.body.classList.contains('home')){
			boxHover();
			videoToggle();
			//listIndicator();
			//detailsToggleAction();
			skipModal();
			toggleMoreBox();
			getLikesAndDislikes();

			initHomeSwippers();
		}



//		boxMore();



		// ==========================================

		//loadHomeData();


		//loadJS('/wp-content/themes/mpg/js/vendor.js', initWebWorker, document.body);

		initWebWorker();

		showAgeVerification();
		showAcceptCookie();
	};

	const onWindowBlur = () => {
		if(document.querySelector('[video-js]')){
			document.querySelector('[video-js]').pause();
		}
	}

	const onWindowChange = () =>{
		if(document.body.classList.contains('home')){
			let __vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${__vh}px`);
		}
	}

	/**
	 * @description Init all CB after page load
	 */

	if(!navigator.userAgent.toLowerCase().includes('lighthouse')){
		window.addEventListener('load', (ev) => {
			initNative();

			window.addEventListener('blur', (ev) => {
				onWindowBlur();
			});

			window.addEventListener("orientationchange", function(event) {
				onWindowChange();
				setTimeout(() => {
					onWindowChange();
				}, 500);
			});

			window.addEventListener('resize', () => {
				if(window.innerWidth > 1023) {
					if(document.querySelector('.list__specification.is-open')) {
						document.getElementsByTagName('html')[0].classList.remove('is-hideScroll');
						document.getElementsByTagName('body')[0].classList.remove('is-hideScroll');
					}
				} else {
					onWindowChange();
					setTimeout(() => {
						onWindowChange();
					}, 500);

					if(document.querySelector('.list__specification.is-open')) {
						document.getElementsByTagName('html')[0].classList.add('is-hideScroll');
						document.getElementsByTagName('body')[0].classList.add('is-hideScroll');
					}
				}
			});

		});
	}


})();
