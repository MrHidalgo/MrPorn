/**
 * Frontpage-specific initialization
 * This file contains initialization code specific to the frontpage
 * to avoid duplication with indexNative.js
 */

(function() {
	'use strict';

	// Frontpage-specific variables
	let isSingleBlog = false;
	let blogContent;
	let blogContentHeight;
	let blogProgressBar;
	let currentLang = 'en';
	let isMobileDevice = false;
	let goTop;

	// Frontpage-specific functions
	const initFooterTextBehaviour = () => {
		document.querySelector('.btn_show_more-text').addEventListener('click', function(e) {
			e.preventDefault();
			document.querySelector('.footer_description').classList.add('show_all');
		});
	}

	const initHome = () => {
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

			if(_ev.classList.contains('search_category_item')){
				if(document.body.classList.contains('home') && !document.body.classList.contains('is-mobile')){
					scrollToCategoryOnHome(ev, _ev);
					hide(document.querySelector('[search-drop-js]'));
				}
			}else if(_ev.classList.contains('js-closeAgeModal')){
				verifyAge();
			}else if(_ev.classList.contains('acceptCookie')){
				verifyCookie();
			}else if(_ev.closest('[favorites-toggle-js]')){
				onSiteBoxFavourite(_ev.closest('[favorites-toggle-js]'));
			}else if(_ev.closest('[un-favorites-js]')){
				removeFavourite(_ev.closest('[un-favorites-js]'));
			}else if(_ev.closest('[collapse-toggle-js]')){
				onSortToggle(_ev.closest('[collapse-toggle-js]'));
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

				var activeSortLink = document.querySelector('.sort__drop-link.is-active');
				if(activeSortLink){
					activeSortLink.classList.toggle('is-active');
				}
			}
		}, false);
	}

	const viewFavoritesToggle = () => {
		const viewFavoritesToggleBtn = document.querySelector('[view-favorites-toggle-js]');
		const viewFavoritesDrop = document.querySelector('[view-favorites-drop-js]');

		if(viewFavoritesToggleBtn && viewFavoritesDrop){
			viewFavoritesToggleBtn.addEventListener('click', function(ev) {
				viewFavoritesToggleBtn.classList.toggle('is-active');
				viewFavoritesDrop.classList.toggle('is-open');

				let sortNode = document.querySelector('[sort-node-js]');
				if(sortNode){
					sortNode.classList.remove('is-open');
				}

				let sortDropInner = document.querySelector('.sort__drop-inner');
				if(sortDropInner){
					sortDropInner.classList.remove('is-open');
				}

				let sortDropLinks = document.querySelectorAll('.sort__drop-link');
				let sortDropLinksLength = sortDropLinks.length;
				for(let i = 0; i < sortDropLinksLength; i++){
					sortDropLinks[i].classList.remove('is-active');
				}
			}, false);
		}
	}

	const search = () => {
		const searchInput = document.querySelector('[search-js]');
		if(searchInput){
			searchInput.addEventListener('keyup', function(ev) {
				const searchInput = ev.currentTarget;
				const searchValue = searchInput.value;
				const searchDrop = searchInput.closest('[search-parent-js]').querySelector('[search-drop-js]');

				if(searchValue.length > 0){
					searchDrop.classList.add('is-open');
				}else{
					searchDrop.classList.remove('is-open');
				}
			}, false);
		}
	}

	function onSiteBoxFavourite(el) {
		renderLoginForm();
	}

	const initGotoTop = () => {
		if(goTop){
			window.onscroll = function() {
				if (window.scrollY < blogContentHeight || blogProgressBar < 101) {
					blogProgressBar = window.scrollY / blogContentHeight * 100;
					blogProgressBar.style.width = blogProgressBar + '%';
				}
			}
		}
	}

	const lazyLoadImages = () => {
		document.querySelectorAll('.lazyload').forEach(function(img) {
			img.classList.add('lazyloaded');
		});
	}

	const pukeCheck = () => {
		if(getCookieMpgCookie('is_adb_closed') === '1'){
			return;
		}

		const detector = new AdBlockDetector({
			onDetected: function() {
				console.log('Ad Blocker is ON!');
			},
			onNotDetected: function() {
				console.log('Ad Blocker is OFF.');
			},
			onClose: function() {
				createCookie('is_adb_closed', '1', 1);
			}
		});

		detector.run();
	}

	function onSimilarSiteTouch(ev, siteItem){
		if(!siteItem.parentNode.classList.contains('touched') && !siteItem.classList.contains('.category_video_item')){
			ev.preventDefault();
		}
	}

	function verifyAge(){
		createCookie('age', '1', 365);
		if(document.querySelector('.modal_age')){
			document.querySelector('.modal_age').remove();
		}
	}

	function verifyCookie(){
		createCookie('accept', '1', 365);
		if(document.querySelector('.cookieBanner')){
			document.querySelector('.cookieBanner').remove();
		}
	}

	function setInnerHeight(){
		let vh = window.innerHeight;
		let vh2 = window.innerHeight;
		let kh = 0;

		if(window.visualViewport){
			vh = window.visualViewport.height;
		}

		kh = vh2 - vh;
		if(kh > 0){
			kh += 100;
		}

		document.documentElement.style.setProperty('--kh', kh + 'px');
		document.documentElement.style.setProperty('--vh', vh + 'px');

		let wih = window.innerHeight;
		document.documentElement.style.setProperty('--wih', wih + 'px');
	}

	function detectCountryAndVerifyAge() {
		fetch('/api/country.php')
			.then(response => response.json())
			.then(data => {
				if(data.countryCode === 'DE' || data.countryCode === 'GB' || data.countryCode === 'LK'){
					showAgeVerification(data.countryCode);
				}
				console.log('Detected country:', data.countryCode);
			})
			.catch(error => {
				console.error('Error detecting country:', error);
			});
	}

	function showAgeVerification(country){
		if(getCookieMpgCookie('age')){
			console.log('already verified age');
			return;
		}

		if(country === 'DE'){
			console.log('rendering german popup');
			let popupHTML = '<div class="modal_age"><div class="modal_inner"><img src="/wp-content/themes/mpg/images/logo-mob.png"/><div class="title">Altersüberprüfung</div><p>MrPornGeek ist eine Erwachsenen-Community, die altersbeschränkte Inhalte enthält.<br/>Du musst 18 Jahre oder älter sein, um teilnehmen zu können.</p><button class="btn btnPrimary greyButton js-closeAgeModal">Ich bin 18 oder älter - Eingabe</button></div></div>';
			document.body.insertAdjacentHTML('beforeend', popupHTML);
		}else if(country === 'GB' || country === 'LK'){
			console.log('English pop');
			let popupHTML = '<div class="modal_age"><div class="modal_inner"><img src="/wp-content/themes/mpg/images/logo-mob.png"/><div class="title">ADULTS ONLY 18+</div><p class="modal_age_p">You\'re accessing this site from the United Kingdom.<br/>This website is intended for adults aged 18 or over only.<br/>By continuing, you confirm that you are 18+ years of age or older</p><div class="modal_age_buttons flex flex-hc"><button class="btn btn_in btnPrimary greyButton js-closeAgeModal">I\'m Over 18+ – Let Me In</button><a href="https://www.google.com/" class="btn btn_exit btnPrimary greyButton">I\'m Under 18 – Exit</a></div>';
			document.body.insertAdjacentHTML('beforeend', popupHTML);
		}
	}

	function showAcceptCookie(){
		if(document.documentElement.lang === 'de' && !getCookieMpgCookie('accept')){
			let cookieHTML = '<div class="cookieBanner">Wir benutzen Cookies um die Funktionalität der Webseite zu optimieren und dir die beste Erfahrung mit uns zu bieten. <button id="acceptCookie" class="acceptCookie">OK</button></div>';
			document.body.insertAdjacentHTML('beforeend', cookieHTML);
		}
	}

	function initWebWorker(){
		// Web worker initialization if needed
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
	 * @name initFrontpage
	 * @description Init frontpage-specific methods
	 */
	const initFrontpage = () => {
		// Frontpage-specific initialization
		currentLang = document.documentElement.getAttribute('lang');

		// lib
		initHamburger();

		// callback
		detectDevice();
		bodyClick();

		loadTranslations();

		initHome();

		renderFavourites();

		viewFavoritesToggle();

		goTop = document.querySelector('.go-top');

		initGotoTop();
		lazyLoadImages();

		search();

		showThumbInfoOnHover();
		let bodyClasses = document.body.classList;

		// Frontpage-specific logic
		if(bodyClasses.contains('home')){
			getLikesAndDislikes();

			if(isLoggedUser!=''){
				renderFavouriteButtons()
			}

			visitedSites.initVisitedSites('.list__box__item')

			initFooterTextBehaviour();
		}

		initWebWorker();

		initCategoryPage();

		detectCountryAndVerifyAge()
		showAcceptCookie();

		// new CategoryPopup()
		if(!isMobileOrTablet){
			pukeCheck();
		}
	};

	/**
	 * @description Init all CB after page load
	 */
	window.addEventListener('load', (ev) => {
		initFrontpage();

		window.addEventListener('resize', () => {
			headerHeight = document.querySelector('#header').getBoundingClientRect().height;
			setInnerHeight();
		});

		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", () => {
				setInnerHeight();
			});
		}
	});

	// Make isMobileDevice globally accessible
	window.isMobileDevice = isMobileDevice;
	window.goTop = goTop;

})(); 