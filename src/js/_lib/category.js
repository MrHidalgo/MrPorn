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

		if (!desktopMenuList || desktopMenuList.children.length == 0 || bodyClasses.contains('home') || isCategoriesPage) {
			renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
		}


		let categoryFilter = document.querySelectorAll('.category-list-filter')
		let categoryFilterDropdown = document.querySelector('.category-list-menu-dropdown')

		if (categoryFilter.length > 0) {
			for (let i = 0; i < categoryFilter.length; i++) {
				categoryFilter[i].addEventListener('input', debounce(function (evt) {

					let filter = evt.target.value.toLowerCase().trim();
					if (filter == '') {
						renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
						
						// Update mobile menu if it's already populated
						if(mobileMenuList && mobileMenuList.children.length > 0) {
							populateMobileMenu(filterA2z ? a2zCategories : categoryItems);
						}
						return;

					}

					let filteredCategories = [...categoryItems];
					if(filterA2z){
						filteredCategories = Array.prototype.slice.call(a2zCategories)
					}
					const catCount = filteredCategories.length
					// categoryItems = categoryItems.sort((a, b) => b.title.localeCompare(a.title));
					filteredCategories = filteredCategories.sort((a, b) => {

						const titleA = a.title.toLowerCase();
						const titleB = b.title.toLowerCase();

						let posA = titleA.indexOf(filter);
						let posB = titleB.indexOf(filter);


						// Strings with the search term come first
						if (posA !== -1 && posB === -1) return -1;
						if (posA === -1 && posB !== -1) return 1;

						// If both contain the term, sort by position
						if (posA !== -1 && posB !== -1) return posA - posB;

						// Otherwise, keep the original order
						return a.order - b.order;
					});

					filteredCategories.forEach((item, index) => {
						item.index = index;
					});

					const premiumItems = filteredCategories.filter(item =>
						item.title.toLowerCase().includes("premium") &&
						item.title.toLowerCase().includes(filter.toLowerCase())
					);

					let nonPremiumItems = filteredCategories.filter(item => !(item.title.toLowerCase().includes("premium") &&
						item.title.toLowerCase().includes(filter.toLowerCase()))); // Remove 'Premium' items
					nonPremiumItems = nonPremiumItems.sort((a, b) => {
						return a.index - b.index;
					});
					filteredCategories = premiumItems.concat(nonPremiumItems);
					renderCategorySidebar(filteredCategories, filter, true);

					// Update mobile menu if it's already populated
					if(mobileMenuList && mobileMenuList.children.length > 0) {
						populateMobileMenu(filteredCategories, filter, true);
					}

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
		const randomCategory = categoryItems[Math.floor(Math.random() * categoryItems.length)];
		window.location.href = randomCategory.link;
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
		filterA2z = checked;
		// Update global variable as well so mobile menu population works correctly
		window.filterA2z = checked;
		if (checked) {
			createCookie("category_filter_a2z", 1, 356);
			leftSidebar?.classList.add('scroll');
		} else {
			createCookie("category_filter_a2z", 0, 356);
			leftSidebar?.classList.remove('scroll');
		}
		renderCategorySidebar(filterA2z ? a2zCategories : categoryItems);
		
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

	const renderA2ZLetters = () => {
		if(!categoryListLetters){
			return;
		}
		categoryListLetters.innerHTML = '';
		for (const letter of a2zLetters) {
			const liChar = document.createElement("li");
			liChar.textContent = letter.toUpperCase();
			liChar.className = "category-list-letter letter_"+letter;
			liChar.dataset.letter = letter
			categoryListLetters.appendChild(liChar);

			liChar.addEventListener("click", (e) => {
				let triggeredLetter = e.currentTarget.dataset.letter;

				document.querySelector('.category-list-letter.active')?.classList.remove('active');

				let letterTop = document.querySelector(sidebarContainer+' .category-list-item-letter.letter_'+triggeredLetter).offsetTop
				desktopMenuListContainer?.scrollTo({
					top: letterTop,
					behavior: "smooth",
				});
				// letterTop -= 45;
				mobileMenuList?.scrollTo({
					top: letterTop,
					behavior: "smooth",
				});

				e.currentTarget.classList.add('active');
			});
		}


	}

	const initLetterScroll = () => {
		const letterLinks = document.querySelectorAll('.category-list-letter');
		if(letterLinks.length == 0){
			return;
		}
		const letterList = document.querySelector('.category-list-left');
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

				if(isMobileOrTablet){
					letterTop -= 45;
				}

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

	const renderCategorySidebar = (categoryItems, filter = '', hideVisited = false) => {
		

		if(filterA2z){
			categoryListContainer?.classList.add('a2z');
			renderA2ZLetters()
		}else{
			categoryListContainer?.classList.remove('a2z');
		}

		if(desktopMenuList !== null) desktopMenuList.innerHTML = '';
		// Remove mobile menu population - it will be populated when hamburger is clicked
		// if(mobileMenuList !== null) mobileMenuList.innerHTML = '';

		console.log('rendering sidebar items');

		let categoryIndex = 0;
		categoryItems.map(
			(categoryItem) => {

				let catTitle = categoryItem.title.endsWith(' ') ? categoryItem.title : categoryItem.title + ' ';
				let catExtraClasses = hideVisited? '' : (categoryItem.visited ? ' visited' : '') ;
				if (filter != '' && catTitle.toLowerCase().indexOf(filter) > -1) {
					catTitle = catTitle.replace(new RegExp(filter, 'gi'), (match) => `<span class="highlight">${match}</span>`);
					catExtraClasses += ' pulse';
				}

				if(categoryItem.link != ''){
					let item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><i class="' + categoryItem.icon + '"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';
					if(filterA2z){
						let catIcon = '';
						if(+categoryItem.is_webcam > 0){
							catIcon = '<i class="webcam"></i>';
						}
						item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link-a2z ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><span class="category-list-title">' + catTitle + catIcon + '</span><span class="mobile_link_count">'+categoryItem.count+'</span></a>' + '</li>';
					}

					if(categoryItem.letter){
						item = '<li class="category-list-item category-list-item-letter letter_'+categoryItem.letter+'">'+categoryItem.letter.toUpperCase()+'</li>';
					}

					desktopMenuList?.insertAdjacentHTML('beforeend', item);
					// Remove mobile menu population - it will be populated when hamburger is clicked
					// mobileMenuList?.insertAdjacentHTML('beforeend', item);

				}

				

				if(isCategoriesPage && !filterA2z){

					let categoryBoxItem = document.querySelector('.category_item_link[data-id="'+categoryItem.id+'"]');
					if(categoryBoxItem){

						if(hideVisited){
							categoryBoxItem.setAttribute('class', 'category_item_link '+catExtraClasses);
						}

						categoryBoxItem.querySelector('.category_item_caption_title').innerHTML = catTitle;

						categoryBoxItem.parentElement.style.order = `${categoryIndex}`;
						categoryBoxItem.parentElement.dataset.order = `${categoryIndex}`;
						categoryIndex ++;
					}
				}

			}
		)

		reorderCategories()

		// Add function to populate mobile menu (will be called when hamburger is clicked)
		const populateMobileMenu = (categoryItems, filter = '', hideVisited = false) => {
			if(mobileMenuList !== null) mobileMenuList.innerHTML = '';
			
			let categoryIndex = 0;
			categoryItems.map(
				(categoryItem) => {
					let catTitle = categoryItem.title.endsWith(' ') ? categoryItem.title : categoryItem.title + ' ';
					let catExtraClasses = hideVisited? '' : (categoryItem.visited ? ' visited' : '') ;
					if (filter != '' && catTitle.toLowerCase().indexOf(filter) > -1) {
						catTitle = catTitle.replace(new RegExp(filter, 'gi'), (match) => `<span class="highlight">${match}</span>`);
						catExtraClasses += ' pulse';
					}

					if(categoryItem.link != ''){
						let item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><i class="' + categoryItem.icon + '"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';
						if(filterA2z){
							let catIcon = '';
							if(+categoryItem.is_webcam > 0){
								catIcon = '<i class="webcam"></i>';
							}
							item = '<li class="category-list-item" >' + '<a  href="' + rootUrl + categoryItem.link + '" class="category-list-link-a2z ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><span class="category-list-title">' + catTitle + catIcon + '</span><span class="mobile_link_count">'+categoryItem.count+'</span></a>' + '</li>';
						}

						if(categoryItem.letter){
							item = '<li class="category-list-item category-list-item-letter letter_'+categoryItem.letter+'">'+categoryItem.letter.toUpperCase()+'</li>';
						}

						mobileMenuList?.insertAdjacentHTML('beforeend', item);
					}
				}
			)
		}

		// Make this function globally accessible
		window.populateMobileMenu = populateMobileMenu;
		
		// Also make a function to update mobile menu when filter changes
		window.updateMobileMenu = (categoryItems, filter = '', hideVisited = false) => {
			if(mobileMenuList && mobileMenuList.children.length > 0) {
				populateMobileMenu(categoryItems, filter, hideVisited);
			}
		};

		if(filterA2z){

			for (const letter of a2zLetters) {
				let letterTop = desktopMenuListContainer?.querySelector('.category-list-item-letter.letter_'+letter)?.offsetTop
				letterOffsets[letter] = letterTop;
			}

			desktopMenuListContainer?.addEventListener("scroll", () => {
				const scrollTop = desktopMenuListContainer.scrollTop;
				let activeLetter = null;
				if(!enableLetterScroll){
					return;
				}

				for (let key in letterOffsets) {
					if (scrollTop >= letterOffsets[key]) {
						activeLetter = key;
					}
				}

				categoryListContainer.querySelector('.category-list-letter.active')?.classList.remove('active');
				categoryListContainer.querySelector('.category-list-letter.letter_'+activeLetter).classList.add('active');
				

			});
		}
	}

	const reorderCategories = () => {
		if(bodyClasses.contains('page-template-page-categories')){
			return
		}

		const container = document.querySelector('.category_sites')
		if(container){
			const items = Array.from(container.children);
			items.sort((a, b) => a.dataset.order - b.dataset.order);
			items.forEach(item => container.appendChild(item));
		}
	}

	const initStickySidebar = () => {
		console.log(`Init sticky sidebar ${filterScroll}`)
		if(categorySidebar){
			categorySidebar.destroy();
		}

		let bodyClasses = document.body.classList;
		// if(bodyClasses.contains('tax-category-tag') && filterA2z){
		// 	categorySidebar = new StickySidebar('.categories-container', {
		// 		innerWrapperSelector: '.inner-wrapper-sticky',
		// 		bottomSpacing: 0,
		// 		resizeSensor: true
		// 	});
		// }else if (!filterScroll && document.querySelectorAll('.desktop_menu_list').length > 0) {
		// 	categorySidebar = new StickySidebar('.desktop_menu_list', {
		// 		// topSpacing: 20,
		// 		bottomSpacing: 0,
		// 		// containerSelector: '.category_site_container',
		// 		innerWrapperSelector: '.inner-wrapper-sticky',
		// 		resizeSensor: true
		// 	});
		// }
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
				console.log(cacheKey, result)
				// let filteredCategories = [...categoryItems];
			})
			.catch(err => {
				// console.log('didnt load translations');
			});
	}

	const processCategoryList = (result) => {
		sidebarCategories = [];
		result.terms?.forEach(function (term) {
			let icons = '';
			let siteIndex = 0;
			term.category_sites.forEach(function (_site) {
				if (siteIndex < 5) {
					icons += '<i class="category-site-icon deIcon ' + _site + '"></i>';
					siteIndex++;
				}
			})

			sidebarCategories.push({
				'id': term.term_id,
				'title': term.category_title_2,
				'icon': 'icon-category '+term.icon_class,
				'link': term.term_link,
				'count': term.count,
				'icons': icons,
				'visited': 0,
				'visited_o': 0,
				'order': term.position
			});
		})

		categoryItems = sidebarCategories;
		
		// Make category data globally accessible for mobile menu population
		window.categoryItems = categoryItems;
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
		processCategoryList(result)

		// Make A2Z data globally accessible for mobile menu population
		window.a2zCategories = a2zCategories;
		window.filterA2z = filterA2z;

		initCategorySidebar()
		initLetterScroll()
	}

	const initCategorySidebar = () => {
		createSidebar()
		if(!filterScroll){
			initStickySidebar()
		}
	}

	fetchA2Z();
}


