/*
* Category page scripts
* */


// const {TheiaStickySidebar} = require("theia-sticky-sidebar");

function initCategoryPage() {
	let categorySidebar;
	const isMobile = isMobileOrTablet;

	const sidebarContainer = isMobile? '.header__categories-mobile':'.desktop_menu_list';
	const leftSidebar = document.querySelector('.desktop_menu_list');
	let desktopMenuList = document.querySelector('.category-list-menu');
	let desktopMenuListContainer = document.querySelector('.category-list-left');
	let mobileMenuList = document.querySelector('.category-list-menu-mobile');
	let categoriesPageList = document.querySelector('.categories-list');
	let categoryListContainer = document.querySelector(sidebarContainer+ ' .category-list-container')
	let catListSites = document.querySelector('.category_list-sites');
	let categoryFilterBtn = document.querySelector(sidebarContainer+ ' .category-list-filter-btn');
	let categoryFilterOptions = document.querySelector(sidebarContainer+ ' .category-list-options');
	let categoryFilterOptionsIsOpen = false;
	let filterOptionScroll = document.querySelector(sidebarContainer+ ' .category_filter_option_scroll');
	let filterOptionA2Z = document.querySelector(sidebarContainer+ ' .category_filter_option_a2z');
	let filterOptionPopular = document.querySelector(sidebarContainer+ ' .category_filter_option_popular');
	let filterOptionRandom = document.querySelector(sidebarContainer+ ' .category_filter_option_random');
	let filterOptionTags = document.querySelector(sidebarContainer+ ' .category_filter_option_tags');
	let sidebarAllTags = document.querySelectorAll('.sidebar-all-tags');


	let initializedListeners = false
	let categoryListLetters = document.querySelector(sidebarContainer+ ' .category-list-letters');
	let reviewTypeSlider = document.querySelector('.review_type_slider');
	let rtsThumb = document.querySelector('.review_type_slider_thumb');

	const letterOffsets = {};


	const bodyClasses = document.body.classList;
	const isCategoriesPage = bodyClasses.contains('page-template-page-categories');
	let filterType = '';
	let categoryItems = [];
	let otherCategoryItems = [];
	let a2zCategories = []
	let a2zLetters = []
	let sidebarCategories = []

	let a2zCookie = getCookieMpgCookie("category_filter_a2z");
	let allTagsCookie = getCookieMpgCookie("category_filter_all_tags");
	let enableLetterScroll = false;

	let filterScroll = bodyClasses.contains('page-template-page-categories') ? 0: +getCookieMpgCookie("category_filter_scroll") ?? 0;
	let filterA2z = 1; // (bodyClasses.contains('home') || isCategoriesPage) ? 1:  +getCookieMpgCookie("category_filter_a2z") ?? 1;
	if(bodyClasses.contains('home') || isCategoriesPage){
		filterA2z = 1;
	}else{
		if(a2zCookie == ''){
			filterA2z = 1;
		}else{
			filterA2z = +a2zCookie;
		}
	}
	// Initialize global variable
	window.filterA2z = filterA2z;

	// categoryListContainer?.classList.toggle('a2z', filterA2z);

	let filterPopular = +getCookieMpgCookie("category_filter_popular") ?? 0;

	let frontListA2Z = !filterA2z;
	let frontMainFilter = document.querySelector('.main_filter');


	if(!isMobileOrTablet && document.body.classList.contains('single-sites')){
		filterA2z = 0
		window.filterA2z = filterA2z;
	}

	if(filterScroll){
		document.querySelectorAll('.category_filter_option_scroll').forEach(checkbox => {
			checkbox.checked = true;
		})
	}
	if(a2zCookie!=''){
		document.querySelectorAll('.category_filter_option_a2z').forEach(checkbox => {
			checkbox.checked = !filterA2z;
		})
	}

	const initTagsContainerSlide = () => {
		// if(document.querySelector('#sidebar-all-tags') && document.querySelector('.category-list-container')){
		// 	const tagsShrinkController = new TagsShrinkEffect('#sidebar-all-tags', '.category-list-container');
		// }

	}

	if(allTagsCookie=='1'){
		document.querySelectorAll('.category_filter_option_tags').forEach(checkbox => {
			checkbox.checked = true;
		})

		if(sidebarAllTags.length > 0){
			sidebarAllTags.forEach(element => {
				element.classList.add('show');
			});
			categoryListContainer?.classList.add('show_tags');
			initTagsContainerSlide();
		}
	}

	function createSidebar() {
		let parent = this;

		let desktopMenuListContainer = document.querySelector('.category-list-left');
		let categoryFilter = document.querySelectorAll('.category-list-filter')
		let categoryFilterDropdown = document.querySelector('.category-list-menu-dropdown')

		const savedOrderByMenu = new WeakMap();
		const initialOrderByMenu = new WeakMap();

		function applyCategoryListFilter(filter) {
			const menus = document.querySelectorAll('.category-list-left');
			menus.forEach(menu => {
				const menuItems = Array.from(menu.querySelectorAll('.cli'));

				menuItems.forEach(item => {
					item.removeAttribute('style');
				});

				if (filter === '') {
					menu.classList.remove('filter-active');
					const savedOrder = savedOrderByMenu.get(menu);
					if (savedOrder && savedOrder.length > 0) {
						savedOrder.forEach(item => menu.appendChild(item));
						savedOrderByMenu.delete(menu);
					}
					const orderMap = initialOrderByMenu.get(menu);
					if (orderMap) initialOrderByMenu.delete(menu);
					return;
				}

				// Snapshot default order once per menu; invalidate if list was re-rendered (e.g. view switch)
				let savedOrder = savedOrderByMenu.get(menu);
				if (savedOrder && savedOrder.length > 0 && !menu.contains(savedOrder[0])) {
					savedOrderByMenu.delete(menu);
					initialOrderByMenu.delete(menu);
					savedOrder = null;
				}
				if (!savedOrderByMenu.has(menu)) {
					const items = Array.from(menu.querySelectorAll('.cli'));
					savedOrderByMenu.set(menu, items);
					const orderMap = new Map();
					items.forEach(item => {
						orderMap.set(item, item.style.order || getComputedStyle(item).order || '');
					});
					initialOrderByMenu.set(menu, orderMap);
				}
				savedOrder = savedOrderByMenu.get(menu);

				// Only items that match the filter (non-letter, title includes filter)
				const matchingOnly = savedOrder.filter(item => {
					if (item.className.includes('letter')) return false;
					const titleText = item.querySelector('.clt')?.textContent.toLowerCase() || '';
					return titleText.includes(filter);
				});

				// Sort matching items: match position, then premium last, then original order
				const matchingOrdered = matchingOnly.slice().sort((a, b) => {
					const titleA = a.querySelector('.clt').textContent.toLowerCase();
					const titleB = b.querySelector('.clt').textContent.toLowerCase();
					const posA = titleA.indexOf(filter);
					const posB = titleB.indexOf(filter);

					if (posA !== -1 && posB === -1) return -1;
					if (posA === -1 && posB !== -1) return 1;
					if (posA !== -1 && posB !== -1) return posA - posB;

					const isPremiumA = titleA.includes('premium') && titleA.includes(filter);
					const isPremiumB = titleB.includes('premium') && titleB.includes(filter);
					if (isPremiumA && !isPremiumB) return 1;
					if (!isPremiumA && isPremiumB) return -1;
					return savedOrder.indexOf(a) - savedOrder.indexOf(b);
				});

				matchingOrdered.forEach((item, i) => {
					item.style.order = String(-(matchingOrdered.length - i));

					let titleEl = item.querySelector('.clt');
					let titleText = titleEl ? titleEl.textContent.trim() : '';

					if (filter != '' && titleText.toLowerCase().indexOf(filter) > -1) {
						titleText = titleText.replace(new RegExp(filter, 'gi'), (match) => `<span class="highlight">${match}</span>`);
						titleEl.innerHTML = titleText;
					}
				});

				// Everything else in exact saved (default) order
				const matchingSet = new Set(matchingOrdered);
				const restInOriginalOrder = savedOrder.filter(item => !matchingSet.has(item));

				const orderedItems = [...matchingOrdered, ...restInOriginalOrder];
				orderedItems.forEach(item => menu.appendChild(item));

				matchingOrdered.forEach(item => {
					item.style.display = '';
				});
				menu.classList.add('filter-active');
			});
		}

		window.clearCategoryFilterSavedOrder = function () {
			document.querySelectorAll('.category-list-left').forEach(menu => {
				savedOrderByMenu.delete(menu);
				initialOrderByMenu.delete(menu);
			});
		};

		if (categoryFilter.length > 0) {
			for (let i = 0; i < categoryFilter.length; i++) {
				categoryFilter[i].addEventListener('input', debounce(function (evt) {

					let filter = evt.target.value.toLowerCase().trim();
					applyCategoryListFilter(filter);
					
					desktopMenuListContainer?.scrollTo({
						top: 0,
						behavior: "smooth",
					});
					mobileMenuList?.scrollTo({
						top: 0,
						behavior: "smooth",
					});
					categoryFilterDropdown?.scrollTo({
						top: 0,
						behavior: "smooth",
					});
				}));
			}
		}

		if (otherCategoryItems.length) {
			if (catListSites) {
				catListSites.classList.add('has_sidebar')
			}
		}

		let timeoutId;

		if(!isMobile){
			categoryFilterBtn?.addEventListener('mouseover', () => {
				clearTimeout(timeoutId);
				if(!categoryFilterOptions.classList.contains('open')){
					categoryFilterOptions.classList.add('open');
				}
			});
			categoryFilterBtn?.addEventListener('mouseout', () => {
				timeoutId = setTimeout(() => {
					categoryFilterOptions.classList.remove('open');
				}, 700); // 2000 milliseconds = 2 seconds
			});
		}

		categoryFilterBtn?.addEventListener('click', function () {
			console.log('categoryFilterOptions ', categoryFilterOptions.classList)
			if(categoryFilterOptions.classList.contains('open')){
				categoryFilterOptions.classList.remove('open');
			}else{
				renderMobileCatFilters();
				categoryFilterOptions.classList.add('open');
			}
		});

		if(!initializedListeners){
			filterOptionScroll?.addEventListener('change', function () {
				onScrollChecked(this.checked)
			}, false)
			filterOptionRandom?.addEventListener('change', function () {
				gotoRandomCategory()
			})
			filterOptionTags?.addEventListener('change', function () {
				if(this.checked){
					createCookie("category_filter_all_tags", 1, 356);
					sidebarAllTags.forEach(element => {
						element.classList.add('show');
					});
					initTagsContainerSlide();
					categoryListContainer.classList.add('show_tags');
				}else{
					createCookie("category_filter_all_tags", 0, 356);
					sidebarAllTags.forEach(element => {
						element.classList.remove('show');
					});
					categoryListContainer.classList.remove('show_tags');
				}
			})
			initializedListeners = true
		}

		initLetterScroll();
	}

	const renderMobileCatFilters = () => {
		let spanA2z = document.querySelector('.header__categories-mobile .category-list-options .icon_a2z span');
		let spanRandom = document.querySelector('.header__categories-mobile .category-list-options .icon_random span');
		let spanAllTags = document.querySelector('.header__categories-mobile .category-list-options .icon_tags span');
		if(spanA2z){
			spanA2z.innerHTML = 'Icon View';
		}
		if(spanRandom){
			spanRandom.innerHTML = 'Random category';
		}
		if(spanAllTags){
			spanAllTags.innerHTML = 'Show All Tags';
		}
	}

	const gotoRandomCategory = () => {
		let categoryLinks = [];
		if(isMobileOrTablet){
			categoryLinks = document.querySelectorAll('.mobile-menu .cli:not(.letter)');
		}else{
			categoryLinks = document.querySelectorAll('.desktop_menu_list .cli:not(.letter)');
		}

		const randomCategory = categoryLinks[Math.floor(Math.random() * categoryLinks.length)];
		window.location.href = randomCategory.href;
	}

	const initLetterScroll = () => {

		const letterLinks = document.querySelectorAll(sidebarContainer+' .letter');
		if(letterLinks.length == 0){
			return;
		}
		const letterList = document.querySelector(sidebarContainer+' .category-list-left');
		if(!letterList){
			return;
		}
		letterList.addEventListener('mouseover', () => {
			enableLetterScroll = true;
		});
		letterList.addEventListener('mouseout', () => {
			enableLetterScroll = false;
		});

		letterLinks.forEach((letterLink) => {
			letterLink.addEventListener('click', (e) => {
				e.preventDefault();
				const container = e.target.closest('.category-list-container');
				
				const letter = e.target.dataset.letter;
				const letterElement = container.querySelector(`.cli.letter_${letter}`);
				let letterTop = letterElement.offsetTop;

				container.querySelector('.letter.active')?.classList.remove('active');
				e.target.classList.add('active');
				if(letterList){
					
					letterList.scrollTo({
						top: letterTop,
						behavior: 'smooth'
					});
				}

			});
		});
	}


	const initStickySidebar = () => {
		console.log(`Init sticky sidebar ${filterScroll}`)
		if(categorySidebar){
			categorySidebar.destroy();
		}

		if(document.querySelector('.desktop_menu_list') === null){
			return;
		}
		if(document.querySelector('.category_list-sites') === null){
			return;
		}
		categorySidebar = new StickySidebar('.desktop_menu_list', '.category_list-sites', {
			innerWrapperSelector: '.inner-wrapper-sticky',
			bottomSpacing: 0,
			resizeSensor: true
		});
	}

	const fetchSidebarCategories = () => {
		let url = '/wp-json/mpg/sidebar-categories/';
		let cacheKey = 'sidebar_cats_v2__';
		let _lang = document.documentElement.getAttribute('lang');
		if(_lang != 'en'){
			url += '?lang=' + _lang;
			cacheKey += '_' + _lang;
		}

		let cached = getWithExpiry(cacheKey);
		if(cached){
			renderMobileMenu(cached);
			return;
		}

		fetch(url)
			.then(res => res.json())
			.then((result) => {
				setWithExpiry(cacheKey, result, 5 * 60 * 1000);
				renderMobileMenu(result);
			})
			.catch(err => {});
	}

	const renderMobileMenu = (data) => {
		let mobileMenuList = document.querySelector('.header__categories-mobile .category-list-left');
		let mobileLetterList = document.querySelector('.header__categories-mobile .category-list-letters');
		if(mobileMenuList && data.categories){

		let menuHTML = '';
		let lettersHTML = '';

		for(const letter in data.categories){
			menuHTML += '<div class="cli letter_' + letter + '">' + letter.toUpperCase() + '</div>';
			lettersHTML += '<li class="letter letter_' + letter + '" data-letter="' + letter + '">' + letter.toUpperCase() + '</li>';

			for(const cat of data.categories[letter]){
				menuHTML += '<a class="cli" href="' + (cat.link || '') + '">'
					+ '<span class="clt">' + (cat.title || '') + '</span>'
					+ '<span>' + (cat.count || '') + '</span>'
					+ '</a>';
			}
		}

		menuHTML += '<a href="/other-porn-categories/" class="cli oc">'+
                                    '<div class="oc-title">Looking for something different?</div>'+
                                    '<div class="oc-inner">Other Porn Categories'+
                                        '<span>' + (document.body.dataset.otherCategoriesCount || 0) + '</span>'+
                                    '</div>'+
                                '</a>';

		if(!mobileMenuList.classList.contains('loaded')){
			mobileMenuList.innerHTML = menuHTML;
			mobileMenuList.classList.add('loaded');
			if(mobileLetterList){
				mobileLetterList.innerHTML = lettersHTML;
			}
		}

		// Render tags into mobile menu
		if(data.tags){
			let tags = Array.isArray(data.tags) ? data.tags : Object.values(data.tags);
			let currentLang = document.documentElement.getAttribute('lang') || 'en';
			let langPrefix = currentLang === 'en' ? '' : '/' + currentLang;
			let mobileTagList = document.querySelector('.header__categories-mobile .tag-list-mobile');
			if(mobileTagList){
				let tagsHTML = '';
				for(let i = 0; i < tags.length; i++){
					let tag = tags[i];
					if(tag.slug === 'apparel' || tag.slug === 'location') continue;
					tagsHTML += '<li class="categories-tags-li"><a href="' + rootUrl + langPrefix + '/category-tags/' + tag.slug + '/" class="categories-tags-item solid"><i class="tag-icon tag-' + tag.icon + '"></i>' + tag.name + '</a></li>';
				}
				mobileTagList.innerHTML = tagsHTML;
			}
		}
		}

	}

	if(isMobileOrTablet){
		let desktopMenuContent = document.querySelector('.desktop_menu_list .category-list-menu')
		let mobileMenuList = document.querySelector('.mobile-menu .category-list-menu');
		if(desktopMenuContent && desktopMenuContent.innerHTML.trim() && mobileMenuList){
			mobileMenuList.innerHTML = desktopMenuContent.innerHTML;
			mobileMenuList.classList.add('loaded');
		}
		let desktopMenuLetterContent = document.querySelector('.desktop_menu_list .category-list-letters');
		let mobileMenuLetters = document.querySelector('.mobile-menu .category-list-letters');
		if(desktopMenuLetterContent && desktopMenuLetterContent.innerHTML.trim() && mobileMenuLetters){
			mobileMenuLetters.innerHTML = desktopMenuLetterContent.innerHTML;
		}

		// Copy desktop tags to mobile
		let desktopTagContent = document.querySelector('.desktop_menu_list .categories-tags');
		let mobileTagList = document.querySelector('.mobile-menu .tag-list-mobile');
		if(desktopTagContent && desktopTagContent.innerHTML.trim() && mobileTagList){
			mobileTagList.innerHTML = desktopTagContent.innerHTML;
		}

		let needsFetch = !desktopMenuContent || !desktopMenuContent.innerHTML.trim();
		if(!needsFetch){
			let mobileTagCheck = document.querySelector('.mobile-menu .tag-list-mobile');
			if(!mobileTagCheck || !mobileTagCheck.innerHTML.trim()){
				needsFetch = true;
			}
		}
		if(needsFetch){
			fetchSidebarCategories();
		}
	}

	const fetchA2Z = () => {

		let url = '/wp-json/mpg/a2z/';
		let cacheKey = 'a2z_data__';
		let _lang = document.documentElement.getAttribute('lang')
		if(_lang!='en'){
			url += '?lang='+_lang;
			cacheKey += '_'+_lang;
		}

		if(getWithExpiry(cacheKey)){
			processA2ZData(getWithExpiry(cacheKey))
			return
		}

		fetch(url)
			.then(res => res.json())
			.then((result) => {
				setWithExpiry(cacheKey, result, 30*60*1000);
				processA2ZData(result)
			})
			.catch(err => {
				// console.log('didnt load translations');
			});
	}

	const processA2ZData = (result) => {
		a2zCategories = []
		a2zLetters = []

		let a2zOrder = 0;
		for (const letter in result.categories) {
			a2zCategories.push({
				'letter': letter,
				'title': '',
				'order': a2zOrder
			});
			a2zLetters.push(letter)

			for (const categoryItem of result.categories[letter]) {
				a2zCategories.push({
					'id': categoryItem.category,
					'title': categoryItem.title,
					'link': categoryItem.link,
					'count': categoryItem.count,
					'is_webcam': categoryItem.is_webcam,
					'order': a2zOrder
				});
				a2zOrder++;
			}
			a2zOrder++;
		}

		// Make A2Z data globally accessible for mobile menu population
		window.a2zCategories = a2zCategories;
		window.filterA2z = filterA2z;
	}

	fetchA2Z();
	createSidebar()
	if(!filterScroll){
		initStickySidebar()
	}
	
}


