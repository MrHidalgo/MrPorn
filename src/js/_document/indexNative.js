/**
 * POLYFILL
 * ===================================
 */

let isMobileDevice = false;
let isLoggedUser = false;
let dataTime = '';
let videoPaused = false;

let currentLang = 'en';
let goTop;
let headerHeight = null;
let isSingleBlog = false;
let blogContent;
let blogContentHeight = 0;
let blogScrollPercent = 0;
let blogProgressBar;

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

const themeBase = '/wp-content/themes/mpg/';
const ajaxEndpoint = '/wp-content/themes/mpg/ajax-handler-wp.php';


/**
 * end POLYFILL
 * ===================================
 */

function initWebWorker(){

	currentLang = document.documentElement.getAttribute('lang');



	if(document.body.classList.contains('home')){

	}else if(document.body.classList.contains('single-sites')){
		const event = new Event('loadCategoryData');
		window.dispatchEvent(event);
		// console.log('emiting category load event');
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

function setInnerHeight(){
	let vh = window.innerHeight;
	let deviceHeight = window.innerHeight;
	let keyboardHeight = 0;

	if(window.visualViewport){
		vh = window.visualViewport.height;
	}
	keyboardHeight = deviceHeight - vh;

	if(keyboardHeight>0){
		keyboardHeight += 100;
	}

	document.documentElement.style.setProperty('--kh', `${keyboardHeight}px`);
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	let wInnerHeight = window.innerHeight;
	document.documentElement.style.setProperty('--wih', `${wInnerHeight}px`);
}

function preventDefault(e){
	e.preventDefault();
}

function disableScroll(){
	document.body.addEventListener('touchmove', preventDefault, { passive: false });
}
function enableScroll(){
	document.body.removeEventListener('touchmove', preventDefault);
}

let lastMobileSimilarSite;

(function () {
	/**
	 * MAIN CALLBACK
	 * ===================================
	 */
	const initHome = () =>{

		let cGridList = document.querySelector('.c-grid.list');
		if(cGridList){
		}
	}

	const bodyClick = () => {
		const className = '.header__view-wrapper, .sort';



		document.addEventListener('click', function(ev) {
			const _ev = ev.target;
			let currentMobileSimilarSite;

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
					hide(document.querySelector('[search-drop-js]'));
				}

			}

			if(_ev.classList.contains('search_category_item')){
				if(document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')){

					scrollToCategoryOnHome(ev, _ev);
					hide(document.querySelector('[search-drop-js]'));
				}
			}else if(_ev.classList.contains('js-closeAgeModal')){
				verifyAge();
			}else if(_ev.classList.contains('acceptCookie')){
				verifyCookie();
			}else if(_ev.closest('[un-favorites-js]')){
				removeFavourite(_ev.closest('[un-favorites-js]'));
			}else if(_ev.closest('[collapse-toggle-js]')){
				onSortToggle(_ev.closest('[collapse-toggle-js]'));
			}else if(_ev.closest('.rating_stars') || _ev.classList.contains('rating_stars')){
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
			}else if(isMobileOrTablet && (currentMobileSimilarSite = _ev.closest('.category_sites_item .category_sites_item_thumb'))){

				onSimilarSiteTouch(ev, currentMobileSimilarSite)
			}else if(_ev.classList.contains('hdrfavttl')){
				ev.preventDefault();
				document.querySelector('.mobile_fav_link').classList.toggle('open');
			}else if(_ev.parentNode && !_ev.closest('[search-parent-js]')){

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

	function onSimilarSiteTouch(ev, siteItem){

		if(!siteItem.parentNode.classList.contains('touched')){
			if(!siteItem.classList.contains('.category_video_item')){
				ev.preventDefault();
			}
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

	function initGotoTop(){
		window.onscroll = function(){
			if (window.scrollY > 200) {
				show(goTop);
			} else {
				hide(goTop);
			}

			if(isSingleBlog && blogContent){
				onBlogScroll()
			}
		}

		if(goTop){
			goTop.onclick = function(event) {
				doScrolling(0, 200);
				return false;
			}
		}

	}

	function onBlogScroll(){
		if(window.scrollY < blogContentHeight | blogScrollPercent < 101){
			blogScrollPercent = (window.scrollY/ (blogContentHeight))*100;
			blogProgressBar.style.width = blogScrollPercent+'%'
		}
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

		loadTranslations();

		initHome();

		renderFavourites();

		viewFavoritesToggle();

		// initBtcShare();
		//sortCB();

		if(isMobileOrTablet){
			sortCB();
		}

		goTop = document.querySelector('.go-top');


		initGotoTop();


		letterSearch();


		search();

		showThumbInfoOnHover();


		if(document.body.classList.contains('home')){
			getLikesAndDislikes();
			initHomeTooltip()

			if(isLoggedUser!=''){
				renderFavouriteButtons()
			}
		}else if(document.body.classList.contains('single-blog')){
			isSingleBlog = true;
			blogContent = document.querySelector('.blog_content');
			if(blogContent){
				blogContentHeight	= blogContent.getBoundingClientRect().height - window.innerHeight - 10;
				blogProgressBar = document.querySelector('.blog_progress');
				onBlogScroll()
			}
		}



//		boxMore();



		// ==========================================

		//loadJS('/wp-content/themes/mpg/js/vendor.js', initWebWorker, document.body);

		initWebWorker();

		initCategoryPage();

		showAgeVerification();
		showAcceptCookie();
	};
	/**
	 * @description Init all CB after page load
	 */

	window.addEventListener('load', (ev) => {
		initNative();

		window.addEventListener('resize', () => {
			headerHeight = document.querySelector('#header').getBoundingClientRect().height;

			setInnerHeight();
		});

		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", () => {
				setInnerHeight();
			});
		}

		if(document.body.classList.contains('single-sites')){
			onReviewPageLoad();
		}
	});


})();
