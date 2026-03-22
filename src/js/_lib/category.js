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

	categoryListContainer?.classList.toggle('a2z', filterA2z);

	let filterPopular = +getCookieMpgCookie("category_filter_popular") ?? 0;

	let frontListA2Z = false;
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

		// if (!desktopMenuList || desktopMenuList.children.length == 0 || bodyClasses.contains('home') || isCategoriesPage) {
		// 	renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
		// }


		let desktopMenuListContainer = document.querySelector('.category-list-left');
		let categoryFilter = document.querySelectorAll('.category-list-filter')
		let categoryFilterDropdown = document.querySelector('.category-list-menu-dropdown')

		const savedOrderByMenu = new WeakMap();
		const initialOrderByMenu = new WeakMap();

		function applyCategoryListFilter(filter) {
			const menus = document.querySelectorAll('.category-list-menu');
			menus.forEach(menu => {
				const menuItems = Array.from(menu.querySelectorAll('.category-list-item'));

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
					menuItems.forEach(item => {
						const link = item.querySelector('a[class*="category-list-link"]');
						link?.classList.remove('pulse');
					});
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
					const items = Array.from(menu.querySelectorAll('.category-list-item'));
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
					if (item.classList.contains('category-list-item-letter')) return false;
					const titleEl = item.querySelector('.category-list-title');
					const titleText = titleEl ? titleEl.textContent.trim().toLowerCase() : '';
					return titleText.includes(filter);
				});

				// Sort matching items: match position, then premium last, then original order
				const matchingOrdered = matchingOnly.slice().sort((a, b) => {
					const titleA = a.querySelector('.category-list-title').textContent.toLowerCase();
					const titleB = b.querySelector('.category-list-title').textContent.toLowerCase();
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

					let titleEl = item.querySelector('.category-list-title');
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

				// Pulse on matches, remove on rest; visibility
				matchingOrdered.forEach(item => {
					item.style.display = '';
					item.querySelector('a[class*="category-list-link"]')?.classList.add('pulse');
				});
				restInOriginalOrder.forEach(item => {
					item.querySelector('a[class*="category-list-link"]')?.classList.remove('pulse');
				});
				menu.classList.add('filter-active');
			});
		}

		window.clearCategoryFilterSavedOrder = function () {
			document.querySelectorAll('.category-list-menu').forEach(menu => {
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


		if(filterScroll){
			onScrollChecked(filterScroll)
		}

		if(!initializedListeners){
			filterOptionScroll?.addEventListener('change', function () {
				onScrollChecked(this.checked)
			}, false)
			filterOptionA2Z?.addEventListener('change', function () {
				onA2ZChecked(!this.checked)
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



			document.querySelector('.category-list-switcher')?.addEventListener('click', function () {
				onA2ZChecked(frontListA2Z)
				frontListA2Z = !frontListA2Z
				if(frontListA2Z){
					frontMainFilter?.classList.remove('a2z')
				}else{
					frontMainFilter?.classList.add('a2z')
				}

				initStickySidebar()
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
			categoryLinks = document.querySelectorAll('.mobile-menu .category-list-menu .category-list-item:not(.category-list-item-letter) .category-list-link');
		}else{
			categoryLinks = document.querySelectorAll('.desktop_menu_list .category-list-menu .category-list-item:not(.category-list-item-letter) .category-list-link');
		}

		const randomCategory = categoryLinks[Math.floor(Math.random() * categoryLinks.length)];
		window.location.href = randomCategory.href;
	}

	const onScrollChecked = (checked) => {
		filterScroll = checked
		if (checked) {
			createCookie("category_filter_scroll", 1, 356);

			leftSidebar?.classList.add('scroll');
			catListSites?.classList.remove('has_sidebar')
			catListSites?.classList.add('scroll')

			if(categorySidebar){
				categorySidebar.destroy();
			}


			console.log('Destroying sidebar ', categorySidebar)

			setSidebarHeight()
		}else{
			createCookie("category_filter_scroll", 0, 356);
			leftSidebar?.classList.remove('scroll');
			document.querySelector('.category_list-sites')?.classList.add('has_sidebar')
			catListSites?.classList.remove('scroll')
			setSidebarHeight(true)
			initStickySidebar()
		}
	}

	const onA2ZChecked = (checked) => {
		window.clearCategoryFilterSavedOrder?.();
		filterA2z = checked;
		// Update global variable as well so mobile menu population works correctly
		window.filterA2z = checked;
		if (checked) {
			createCookie("category_filter_a2z", 1, 356);
			leftSidebar?.classList.add('scroll');
			categoryListContainer?.classList.add('a2z');
		} else {
			createCookie("category_filter_a2z", 0, 356);
			leftSidebar?.classList.remove('scroll');
			categoryListContainer?.classList.remove('a2z');
		}
		// renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
		
		// Update mobile menu if it's already populated
		if(mobileMenuList && mobileMenuList.children.length > 0) {
			populateMobileMenu(filterA2z ? a2zCategories : categoryItems);
		}
	}

	const setSidebarHeight = (reset = false) => {
		if(!categoryListContainer){
			return;
		}
		if(reset){
			categoryListContainer?.style.removeProperty('height');
		}else{
			let firstSiteItem = document.querySelector('.category_sites_item.category_site_col')
			if(firstSiteItem){

				let sidebarHeight = firstSiteItem.getBoundingClientRect().height * 2
				sidebarHeight -= 60;
				categoryListContainer.style.height = sidebarHeight + 'px';
			} else if(document.body.classList.contains('page-template-page-categories')){
				let firstSiteItem = document.querySelector('#other_categories .category_item')
				let sidebarHeight = firstSiteItem.getBoundingClientRect().height * 2 + 20
				console.log(sidebarHeight)

				let awardWinningHeight = document.querySelector('.award_winning_container')
				if(awardWinningHeight){
					sidebarHeight += awardWinningHeight.getBoundingClientRect().height
				}
				console.log(sidebarHeight)

				let categoryHeaderHeight = document.querySelector('.categories_list h1')
				if(categoryHeaderHeight){
					sidebarHeight += categoryHeaderHeight.getBoundingClientRect().height
				}
				console.log(sidebarHeight)

				sidebarHeight -= 60;
				categoryListContainer.style.height = sidebarHeight + 'px';
				categoryListContainer.style.maxHeight = sidebarHeight + 'px';
			}


		}

	}

	const initLetterScroll = () => {

		const letterLinks = document.querySelectorAll(sidebarContainer+' .category-list-letter');
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
				const letterElement = container.querySelector(`.category-list-item-letter.letter_${letter}`);
				let letterTop = letterElement.offsetTop;

				container.querySelector('.category-list-letter.active')?.classList.remove('active');
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

	// const renderCategorySidebar = (categoryItems, filter = '', hideVisited = false) => {
		
		
	// 	console.log('filterA2z ', filterA2z)
	// 	if(filterA2z){
	// 		categoryListContainer?.classList.add('a2z');
	// 	}else{
	// 		categoryListContainer?.classList.remove('a2z');
	// 	}
		

	// 	// if(desktopMenuList !== null) desktopMenuList.innerHTML = '';
	// 	// Remove mobile menu population - it will be populated when hamburger is clicked
	// 	// if(mobileMenuList !== null) mobileMenuList.innerHTML = '';

	// 	console.log('rendering sidebar items');

	// 	let categoryIndex = 0;
	// 	categoryItems.map(
	// 		(categoryItem) => {

	// 			let catTitle = categoryItem.title.endsWith(' ') ? categoryItem.title : categoryItem.title + ' ';
	// 			let catExtraClasses = hideVisited? '' : (categoryItem.visited ? ' visited' : '') ;
	// 			if (filter != '' && catTitle.toLowerCase().indexOf(filter) > -1) {
	// 				catTitle = catTitle.replace(new RegExp(filter, 'gi'), (match) => `<span class="highlight">${match}</span>`);
	// 				catExtraClasses += ' pulse';
	// 			}

	// 			if(categoryItem.link != ''){
	// 				let item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><i class="' + categoryItem.icon + '"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';
	// 				if(filterA2z){
	// 					let catIcon = '';
	// 					if(+categoryItem.is_webcam > 0){
	// 						catIcon = '<i class="webcam"></i>';
	// 					}
	// 					item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link-a2z ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><span class="category-list-title">' + catTitle + catIcon + '</span><span class="mobile_link_count">'+categoryItem.count+'</span></a>' + '</li>';
	// 				}

	// 				if(categoryItem.letter){
	// 					item = '<li class="category-list-item category-list-item-letter letter_'+categoryItem.letter+'">'+categoryItem.letter.toUpperCase()+'</li>';
	// 				}

	// 				desktopMenuList?.insertAdjacentHTML('beforeend', item);
	// 				// Remove mobile menu population - it will be populated when hamburger is clicked
	// 				// mobileMenuList?.insertAdjacentHTML('beforeend', item);

	// 			}

				

	// 			if(isCategoriesPage && !filterA2z){

	// 				let categoryBoxItem = document.querySelector('.category_item_link[data-id="'+categoryItem.id+'"]');
	// 				if(categoryBoxItem){

	// 					if(hideVisited){
	// 						categoryBoxItem.setAttribute('class', 'category_item_link '+catExtraClasses);
	// 					}

	// 					categoryBoxItem.querySelector('.category_item_caption_title').innerHTML = catTitle;

	// 					categoryBoxItem.parentElement.style.order = `${categoryIndex}`;
	// 					categoryBoxItem.parentElement.dataset.order = `${categoryIndex}`;
	// 					categoryIndex ++;
	// 				}
	// 			}

	// 		}
	// 	)


	// 	// Add function to populate mobile menu (will be called when hamburger is clicked)
	// 	const populateMobileMenu = (categoryItems, filter = '', hideVisited = false) => {
	// 		// if(mobileMenuList !== null) mobileMenuList.innerHTML = '';
			
	// 		let categoryIndex = 0;
	// 		categoryItems.map(
	// 			(categoryItem) => {
	// 				let catTitle = categoryItem.title.endsWith(' ') ? categoryItem.title : categoryItem.title + ' ';
	// 				let catExtraClasses = hideVisited? '' : (categoryItem.visited ? ' visited' : '') ;
	// 				if (filter != '' && catTitle.toLowerCase().indexOf(filter) > -1) {
	// 					catTitle = catTitle.replace(new RegExp(filter, 'gi'), (match) => `<span class="highlight">${match}</span>`);
	// 					catExtraClasses += ' pulse';
	// 				}

	// 				if(categoryItem.link != ''){
	// 					let item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><i class="' + categoryItem.icon + '"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';
	// 					if(filterA2z){
	// 						let catIcon = '';
	// 						if(+categoryItem.is_webcam > 0){
	// 							catIcon = '<i class="webcam"></i>';
	// 						}
	// 						item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link-a2z ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><span class="category-list-title">' + catTitle + catIcon + '</span><span class="mobile_link_count">'+categoryItem.count+'</span></a>' + '</li>';
	// 					}

	// 					if(categoryItem.letter){
	// 						item = '<li class="category-list-item category-list-item-letter letter_'+categoryItem.letter+'">'+categoryItem.letter.toUpperCase()+'</li>';
	// 					}

	// 					mobileMenuList?.insertAdjacentHTML('beforeend', item);
	// 				}
	// 			}
	// 		)
	// 	}

	// 	// Make this function globally accessible
	// 	window.populateMobileMenu = populateMobileMenu;
		
	// 	// Also make a function to update mobile menu when filter changes
	// 	window.updateMobileMenu = (categoryItems, filter = '', hideVisited = false) => {
	// 		if(mobileMenuList && mobileMenuList.children.length > 0) {
	// 			populateMobileMenu(categoryItems, filter, hideVisited);
	// 		}
	// 	};

	// 	if(filterA2z){

	// 		for (const letter of a2zLetters) {
	// 			let letterTop = desktopMenuListContainer?.querySelector('.category-list-item-letter.letter_'+letter)?.offsetTop
	// 			letterOffsets[letter] = letterTop;
	// 		}

	// 		desktopMenuListContainer?.addEventListener("scroll", () => {
	// 			const scrollTop = desktopMenuListContainer.scrollTop;
	// 			let activeLetter = null;
	// 			if(!enableLetterScroll){
	// 				return;
	// 			}

	// 			for (let key in letterOffsets) {
	// 				if (scrollTop >= letterOffsets[key]) {
	// 					activeLetter = key;
	// 				}
	// 			}

	// 			categoryListContainer.querySelector('.category-list-letter.active')?.classList.remove('active');
	// 			categoryListContainer.querySelector('.category-list-letter.letter_'+activeLetter).classList.add('active');
				

	// 		});
	// 	}
	// }

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
				setWithExpiry(cacheKey, result, 30 * 60 * 1000);
				renderMobileMenu(result);
			})
			.catch(err => {});
	}

	const renderMobileMenu = (data) => {
		let mobileMenuList = document.querySelector('.header__categories-mobile .category-list-menu');
		let mobileLetterList = document.querySelector('.header__categories-mobile .category-list-letters');
		if(mobileMenuList && data.categories){

		let menuHTML = '';
		let lettersHTML = '';

		for(const letter in data.categories){
			menuHTML += '<li class="category-list-item category-list-item-letter letter_' + letter + '">' + letter.toUpperCase() + '</li>';
			lettersHTML += '<li class="category-list-letter letter_' + letter + '" data-letter="' + letter + '">' + letter.toUpperCase() + '</li>';

			for(const cat of data.categories[letter]){
				let sitesHTML = '';
				if(cat.category_sites && cat.category_sites.length){
					for(const site of cat.category_sites){
						sitesHTML += '<i class="category-site-icon deIcon ' + site + '"></i>';
					}
				}
				menuHTML += '<li class="category-list-item" style="order: ' + (cat.position || 0) + ';" data-order="' + (cat.position || 0) + '">'
					+ '<a href="' + (cat.link || '') + '" class="category-list-link" data-id="' + (cat.category || '') + '">'
					+ '<i class="icon-category ' + (cat.icon_class || '') + '"></i>'
					+ '<span class="category-list-title">' + (cat.title || '') + '</span>'
					+ '<div class="category-list-icons">'
					+ sitesHTML
					+ '<span class="mobile_link_ellipsis">...</span>'
					+ '<span class="mobile_link_count">' + (cat.count || '') + '</span>'
					+ '</div>'
					+ '</a>'
					+ '</li>';
			}
		}

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

		// Render tags into dropdown menu
		if(data.tags){
			let tags = Array.isArray(data.tags) ? data.tags : Object.values(data.tags);
			let currentLang = document.documentElement.getAttribute('lang') || 'en';
			let langPrefix = currentLang === 'en' ? '' : '/' + currentLang;
			let tagDropdown = document.querySelector('.tag-dropdown-menu');
			if(tagDropdown){
				let dropdownHTML = '';
				for(let i = 0; i < tags.length; i++){
					let tag = tags[i];
					if(tag.slug === 'apparel' || tag.slug === 'location') continue;
					dropdownHTML += '<li class="dropdown-item"><a href="' + rootUrl + langPrefix + '/category-tags/' + tag.slug + '/"><i class="tag-icon tag-' + tag.icon + '"></i> <span>' + tag.name + '</span>'
						+ '<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor"><path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path></svg>'
						+ '</a></li>';
				}
				dropdownHTML += '<li class="dropdown-item all"><a href="' + rootUrl + langPrefix + '/categories/">'
					+ '<i class="tag-icon "><svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 169.53 172.6"><rect width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" width="109.02" height="46.64" rx="11.83"></rect><rect y="62.98" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="62.98" width="109.02" height="46.64" rx="11.83"></rect><rect y="125.96" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="125.96" width="109.02" height="46.64" rx="11.83"></rect></svg></i>'
					+ ' <span>All Categories &amp; Tags</span>'
					+ '<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor"><path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path></svg>'
					+ '</a></li>';
				tagDropdown.innerHTML = dropdownHTML;
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


		new A2ZPopup(result)

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


