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

	let currentLang = document.documentElement.getAttribute('lang');
	let dataTag = "homepage_data_"+dataTime+'_'+currentLang;

	removeOtherStorageKeys(dataTag, currentLang);

	homeData = getWithExpiry("homepage_data_"+dataTime+'_'+currentLang);
	if(homeData){
		if(document.body.classList.contains('home')) {
			renderAllOtherCategories();
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
	for (var key in localStorage){
		if(key.includes('homepage_data_')){
			if(homeDataKey!=key){
				localStorage.removeItem(key);
			}
		}
	}
}


(function () {
	/**
	 * MAIN CALLBACK
	 * ===================================
	 */

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	initLoggedUser();

	initGotoTop();

	let headerHeight = 0;

	const initHome = () =>{
		homeScroll();

		document.querySelector('#list').addEventListener('mouseover', function(_ev) {
			if(_ev.target.closest('[list-box-js]')){
				siteBoxHover(_ev.target.closest('[list-box-js]'));
			}
		});
	}

	const homeScroll = () => {
		if(document.body.classList.contains('home')){
			window.addEventListener('scroll', function(e) {
				onHomeScroll(e);
			});
		}
	}

	const onHomeScroll = (e) => {
		let wY = window.scrollY;
		headerHeight = document.querySelector('#header').getBoundingClientRect().height;

		let categoryListH = document.querySelector('#list').getBoundingClientRect().height;
		let listBoxes = document.querySelectorAll('.list__box-wrapper');
		let firstCategoryListHeight = listBoxes[0].getBoundingClientRect().height;

		let expectedY = headerHeight + categoryListH - (firstCategoryListHeight*8);

		let catListContainer = document.querySelector('#list .c-grid');

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

			console.log(_ev);


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

			if(_ev.classList.contains('search_category_item')){
				if(document.body.classList.contains('home')){

					scrollToCategoryOnHome(ev, _ev);
					hide(document.querySelector('[search-drop-js]'));
				}
			}else if(_ev.classList.contains('list__specification-visit')){
				if(document.querySelector('[video-js]')){
					playPause(document.querySelector('[video-js]'));
				}
			}else if(_ev.closest('.show_more_sites_trigger')){
				toggleMoreSimilarSites();
			}else if(_ev.closest('.read_more') | _ev.closest('.list__specification-more')){

			}else if(_ev.closest('.list__specification-close')){
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
			}else if(_ev.closest('.close-modal')){
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

		/*let cGrid = document.querySelector('#list .c-grid');
		if(cGrid){
			cGrid.addEventListener('mouseenter', function(ev) {
				const _ev = ev.target;
				if(_ev){
					console.log(_ev.classList);
					if(_ev.classList.contains('list__box-more') | _ev.closest('.list__box-more')){
						onShowBannerEnter(_ev);
					}
				}
			}, false);

			cGrid.addEventListener('mouseout', function(ev) {
				const _ev = ev.target;
				if(_ev){
					console.log(_ev.classList);
					if(_ev.classList.contains('list__box-more') | _ev.closest('.list__box-more')){
						onShowBannerLeave(_ev);
					}
				}
			}, false);
		}*/



	};

	function onSiteBoxHoverClick(_el){
		let siteBoxLink = _el.previousSibling;

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

				document.querySelector('[sort-node-js]').classList.remove('is-open');
				document.querySelector('.sort__drop-inner').classList.remove('is-open');

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

			toggleSort.addEventListener('click', (ev) => {
				if(nodeSort.innerHTML.trim()==''){
					renderSorting();

					sortDropInner();
					sortCollapse();
				}

				nodeSort.classList.toggle('is-open');
			}, false);
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

	function playPause11(vid) {
		vid.pause();
		vid.currentTime = 0;
		vid.load();
	}

	function playPause(vid) {
		if (vid.paused) {
			vid.play();
		} else {
			vid.pause();
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


	const detailsToggleAction = () => {
		const favoritesBtns = document.querySelectorAll('[favorites-toggle-js]'),
			specFavoritesBtns = document.querySelectorAll('[spec-favorites-js]'),
			likeBtns = document.querySelectorAll('[like-toggle-js]'),
			specLikeBtns = document.querySelectorAll('[spec-like-js]'),
			dislikeBtns = document.querySelectorAll('[dislike-toggle-js]'),
			specDislikeBtns = document.querySelectorAll('[spec-dislike-js]'),
			skipBtns = document.querySelectorAll('.list__specification-skip');

		for(let i = 0, len = favoritesBtns.length; i < len; i++) {
			favoritesBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
					onSiteBoxFavourite(el);
			}, false);
		}

		for(let i = 0, len = skipBtns.length; i < len; i++) {
			skipBtns[i].addEventListener('click', (ev) => {
				ev.currentTarget.classList.toggle('is-active');
			}, false);
		}

		for(let i = 0, len = specFavoritesBtns.length; i < len; i++) {
			specFavoritesBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
					onBannerFavourite(el);
			}, false);
		}

		for(let i = 0, len = likeBtns.length; i < len; i++) {
			likeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
				onSiteBoxLikeClick(el);

			}, false);
		}

		for(let i = 0, len = specLikeBtns.length; i < len; i++) {
			specLikeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
				onBannerLikeClick(el);
			}, false);
		}

		for(let i = 0, len = dislikeBtns.length; i < len; i++) {
			dislikeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
				onSiteBoxDislikeClick(el);
			}, false);
		}

		for(let i = 0, len = specDislikeBtns.length; i < len; i++) {
			specDislikeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget;
				onBannerDislikeClick(el);
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

		const specificationFavoritesBtn = elParent.querySelector('[data-favorites="' + elID + '"]');

		el.classList.toggle('is-active');

		if(specificationFavoritesBtn){
			//specificationFavoritesBtn.classList.toggle('is-active');
		}

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
			const listFavoritesBtn = elParent.querySelector('.list__box-favorites[data-id="' + elID + '"]');

			console.log('Clicking favourite button');

		el.classList.toggle('is-active');
		if(listFavoritesBtn){
			listFavoritesBtn.classList.toggle('is-active');
		}
	}

	function onSiteBoxLikeClick(el){

		var elID = el.getAttribute('data-id'),
			elParent = el.closest('.list__box-wrapper');

		el.classList.toggle('is-active');

		onLike(el, elID);

		elParent.querySelector('[dislike-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

		const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]');

		if(specificationBlock){
			var	specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]'),
				specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');

			specificationLikeBtn.classList.toggle('is-active');
			specificationDislikeBtn.parentElement.classList.toggle('is-hide');
		}
	}

	function onBannerLikeClick(el){
		var elID = el.getAttribute('data-like'),
			elParent = el.closest('.list__box-wrapper'),
			elActionNode = el.closest('[spec-actionNode-js]'),
			dislikeBtn = elActionNode.querySelector('[spec-dislike-js]');

		console.log('Trying to like '+elID);

		dislikeBtn.parentElement.classList.toggle('is-hide');

		//const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
			const listLikeBtn = document.querySelector('.list__specification-like.list__box-like[data-id="' + elID + '"]'),
			listDislikeBtn = document.querySelector('.list__box-dislike.list__specification-dislike[data-id="' + elID + '"]');

		el.classList.toggle('is-active');

		onLike(el, elID);

		if(listLikeBtn){
			listLikeBtn.classList.toggle('is-active');
		}

		listDislikeBtn.classList.toggle('is-hide');
	}

	function onSiteBoxDislikeClick(el){
		var elID = el.getAttribute('data-id'),
			elParent = el.closest('.list__box-wrapper');

		console.log('Disliking '+elID);

		onDisLike(el, elID);

		elParent.querySelector('[like-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

		const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]');
		if(specificationBlock){
			var specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]'),
				specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]');

			specificationDislikeBtn.classList.toggle('is-active');
			specificationLikeBtn.parentElement.classList.toggle('is-hide');

		}

	}

	function onBannerDislikeClick(el){
			var elID = el.getAttribute('data-dislike'),
			elParent = el.closest('.list__box-wrapper'),
			elActionNode = el.closest('[spec-actionNode-js]'),
			likeBtn = elActionNode.querySelector('[spec-like-js]');

		likeBtn.parentElement.classList.toggle('is-hide');

		//const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
		const listLikeBtn = document.querySelector('.list__specification-like.list__box-like[data-id="' + elID + '"]'),
			listDislikeBtn = document.querySelector('.list__box-dislike.list__specification-dislike[data-id="' + elID + '"]');

		onDisLike(el, elID);

		listDislikeBtn.classList.toggle('is-active');
		listLikeBtn.classList.toggle('is-hide');
	}

	function initGotoTop(){
		var goTop = document.querySelector('.go-top');

		window.onscroll = function(){
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
		goTop.onclick = function(event) {
			doScrolling(0, 200);
			return false;
		}
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

		const _listContainer = document.querySelector('#list .list__box-wrapper'),
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


		if(window.innerWidth < 1024) {
			if(document.querySelector('[video-js]')){
				document.querySelector('[video-js]').pause();
			}
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
		initSwiper();
		initHamburger();
		// ==========================================

		// callback
		detectDevice();
		bodyClick();

		initHome();

		renderFavourites();

		viewFavoritesToggle();
		//sortCB();

		if(isMobileOrTablet){
			sortCB();
		}


		letterSearch();

		search();

		dataTime = document.querySelector('meta[name="data_time"]').content;
		if(document.body.classList.contains('home')){
			boxHover();
			videoToggle();
			//listIndicator();
			//detailsToggleAction();
			skipModal();
			toggleMoreBox();
			getLikesAndDislikes();
		}



//		boxMore();



		// ==========================================

		//loadHomeData();


		initWebWorker();



	};

	const onWindowBlur = () => {
		if(document.querySelector('[video-js]')){
			document.querySelector('[video-js]').pause();
		}
	}

	const onWindowChange = () =>{
		let __vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${__vh}px`);
	}

	/**
	 * @description Init all CB after page load
	 */
	window.addEventListener('load', (ev) => {
		initNative();
	});

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
})();
