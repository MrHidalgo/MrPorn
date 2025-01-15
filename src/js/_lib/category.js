/*
* Category page scripts
* */

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
	let filterOptionScroll = document.querySelector(sidebarContainer+ ' .category_filter_option_scroll');
	let filterOptionA2Z = document.querySelector(sidebarContainer+ ' .category_filter_option_a2z');
	let filterOptionPopular = document.querySelector(sidebarContainer+ ' .category_filter_option_popular');
	let filterOptionRandom = document.querySelector(sidebarContainer+ ' .category_filter_option_random');


	let categoryListLetters = document.querySelector(sidebarContainer+ ' .category-list-letters');

	const letterOffsets = {};


	const bodyClasses = document.body.classList;
	const isCategoriesPage = bodyClasses.contains('page-template-page-categories');
	let filterType = '';
	let categoryItems = [];
	let otherCategoryItems = [];

	let filterScroll = +getCookieMpgCookie("category_filter_scroll") ?? 0;
	let filterA2z = +getCookieMpgCookie("category_filter_a2z") ?? 0;
	let filterPopular = +getCookieMpgCookie("category_filter_popular") ?? 0;

	if(filterScroll){
		document.querySelectorAll('.category_filter_option_scroll').forEach(checkbox => {
			checkbox.checked = true;
		})
	}
	if(filterA2z){
		document.querySelectorAll('.category_filter_option_a2z').forEach(checkbox => {
			checkbox.checked = true;
		})
	}

	function createSidebar() {


		let isPreLoaded = false

		if(mobileMenuList.classList.contains('loaded')){
			isPreLoaded = true;
			otherCategoryItems = document.querySelectorAll('.category-list-menu-mobile .category-list-link ');
		}else{
			otherCategoryItems = document.querySelectorAll('#other_categories .category_item_link, .category_box.category_col');
		}

		let categoryIndex = 0;
		otherCategoryItems.forEach(function (_category) {
			let $this = _category;
			let link = '';
			let categoryId = '';
			let categoryOrder = 0;
			let isVisited = '';
			let isVisitedClass = '';
			let categorySites = [];
			let count_sites = 0;
			let categoryTitle = '';

			if (isPreLoaded) {
				// Category list is already loaded
				link = _category.getAttribute('href');
				categoryId = _category.dataset.id;
				categoryOrder = +categoryIndex;
				isVisited = _category.classList.contains('visited');
				isVisitedClass = isVisited ? 'visited' : '';
				categorySites = $this.querySelectorAll('.category-list-icons .category-site-icon')
				count_sites = +_category.querySelector('.mobile_link_count').innerHTML;

				let $categoryTitle = _category.querySelector('.category-list-title')
				categoryTitle = $categoryTitle.innerHTML;
				categoryIndex++;
			} else if (bodyClasses.contains('home')) {
				let catLink = _category.querySelector('.list__box-head-a')
				link = catLink.getAttribute('href');
				categoryId = catLink.dataset.id;
				categoryOrder = +catLink.dataset.order;
				isVisited = _category.classList.contains('visited');
				isVisitedClass = isVisited ? 'visited' : '';
				categorySites = $this.querySelectorAll('.list__box__item-icon')
				count_sites = +_category.dataset.count;

				let $categoryTitle = _category.querySelector('.list__box-head-a')
				categoryTitle = $categoryTitle.innerHTML;
			} else {
				link = _category.getAttribute('href');
				categoryId = _category.dataset.id;
				categoryOrder = +_category.dataset.order;
				isVisited = _category.classList.contains('visited');
				isVisitedClass = isVisited ? 'visited' : '';

				categorySites = $this.querySelectorAll('.url_link_list_sites .deIcon')

				let categorySiteCount = $this.querySelector('.url_link_count_sites')

				count_sites = categorySiteCount.textContent.replace('+', '');

				let $categoryTitle = _category.querySelector('.category_item_caption_title')
				categoryTitle = $categoryTitle.innerHTML;
			}

			let $categoryIcon = _category.querySelector('.icon-category')
			let categoryIcon = $categoryIcon.className;


			let icons = '';
			let siteIndex = 0;
			categorySites.forEach(function (_site) {
				if (siteIndex < 5) {
					icons += '<i class="category-site-icon ' + _site.getAttribute('class') + '"></i>';
					siteIndex++;
				}
			})

			categoryItems.push({
				'id': categoryId,
				'title': categoryTitle,
				'icon': categoryIcon,
				'link': link,
				'count': count_sites,
				'icons': icons,
				'visited': isVisited,
				'visited_o': isVisited,
				'order': categoryOrder
			});
		});

		if (!desktopMenuList || desktopMenuList.children.length == 0) {

			console.log('Filter type ', filterType)

			renderCategorySidebar(categoryItems);
		}


		let categoryFilter = document.querySelectorAll('.category-list-filter')
		let catSearch = document.querySelector('.desktop_menu_list .category-list-search')
		// if(catSearch){
		// 	catSearch.style.display = 'block';
		// }

		if (categoryFilter.length > 0) {
			for (let i = 0; i < categoryFilter.length; i++) {
				categoryFilter[i].addEventListener('input', debounce(function (evt) {

					let filter = evt.target.value.toLowerCase().trim();
					if (filter == '') {
						renderCategorySidebar(categoryItems);
						return;

					}
					let filteredCategories = [...categoryItems];
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
				categoryFilterOptions.classList.add('open');
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
				categoryFilterOptions.classList.add('open');
			}
		});


		if(filterScroll){
			onScrollChecked(filterScroll)
		}
		filterOptionScroll?.addEventListener('change', function () {
			onScrollChecked(this.checked)
		})
		if(filterA2z){
			onA2ZChecked(filterA2z)
		}
		filterOptionA2Z?.addEventListener('change', function () {
			onA2ZChecked(this.checked)
		})
		filterOptionRandom?.addEventListener('change', function () {
			gotoRandomCategory()
		})
	}

	const gotoRandomCategory = () => {
		const randomCategory = categoryItems[Math.floor(Math.random() * categoryItems.length)];
		window.location.href = randomCategory.link;
	}

	const onScrollChecked = (checked) => {
		if (checked) {
			createCookie("category_filter_scroll", 1, 356);

			leftSidebar?.classList.add('scroll');
			catListSites?.classList.remove('has_sidebar')
			catListSites?.classList.add('scroll')
			categorySidebar?.destroy();

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
		if (checked) {
			createCookie("category_filter_a2z", 1, 356);
			leftSidebar?.classList.add('scroll');
			renderA2Z();
		} else {
			createCookie("category_filter_a2z", 0, 356);
			leftSidebar?.classList.remove('scroll');
			renderCategorySidebar(categoryItems);
		}
	}

	const setSidebarHeight = (reset = false) => {
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

	const renderCategorySidebar = (categoryItems, filter = '', hideVisited = false) => {

		categoryListContainer?.classList.remove('a2z');
		// mobileMenuList?.classList.remove('a2z');

		if(desktopMenuList !== null) desktopMenuList.innerHTML = '';
		if(mobileMenuList !== null) mobileMenuList.innerHTML = '';

		let categoryIndex = 0;
		categoryItems.map(
			(categoryItem) => {

				let catTitle = categoryItem.title;
				let catExtraClasses = hideVisited? '' : (categoryItem.visited ? ' visited' : '') ;
				if (filter != '' && catTitle.toLowerCase().indexOf(filter) > -1) {
					catTitle = catTitle.replace(new RegExp(filter, 'gi'), (match) => `<span class="highlight">${match}</span>`);
					catExtraClasses += ' pulse';
				}

				let item = '<li class="category-list-item" >' + '<a  href="' + categoryItem.link + '" class="category-list-link ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><i class="' + categoryItem.icon + '"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';

				desktopMenuList?.insertAdjacentHTML('beforeend', item);
				mobileMenuList?.insertAdjacentHTML('beforeend', item);


				if(isCategoriesPage){
					// let categoryBoxItem = '<li class="category-list-item" >' + '<a  href="' + categoryItem.link + '" class="category-list-link ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><i class="' + categoryItem.icon + '"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';
					// categoriesPageList?.insertAdjacentHTML('beforeend', categoryBoxItem);

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
	}

	const reorderCategories = () => {
		const container = document.querySelector('.category_sites')
		if(container){
			const items = Array.from(container.children);
			items.sort((a, b) => a.dataset.order - b.dataset.order);
			items.forEach(item => container.appendChild(item));
		}
	}

	const initStickySidebar = () => {
		if (document.querySelectorAll('.desktop_menu_list').length > 0) {
			categorySidebar = new StickySidebar('.desktop_menu_list', {
				// topSpacing: 20,
				// bottomSpacing: 20,
				// containerSelector: '.category_site_container',
				innerWrapperSelector: '.inner-wrapper-sticky',
				resizeSensor: true
			});
		}
	}

	const renderA2Z = () => {
		// categorySidebar.destroy();

		let filteredCategories = [...categoryItems];
		filteredCategories = filteredCategories.sort((a, b) => a.title.localeCompare(b.title));

		// const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
		const letters = []
		filteredCategories.map((item, index) => {
				letters.includes(item.title.charAt(0).toUpperCase()) ? null : letters.push(item.title.charAt(0).toUpperCase())
		})
		categoryListLetters.innerHTML = '';
		letters.map((letter, index) => {

			const liChar = document.createElement("li");
			liChar.textContent = letter;
			// liChar.className = letterOffsets[letter] ? "category-list-letter" : "category-list-letter disabled";
			liChar.className = "category-list-letter";
			categoryListLetters.appendChild(liChar);

			liChar.addEventListener("click", (e) => {
				let triggeredLetter = e.currentTarget.innerHTML;

				document.querySelector('.category-list-letter.active')?.classList.remove('active');

				let letterTop = document.querySelector(sidebarContainer+' .category-list-item-letter.letter_'+triggeredLetter).offsetTop
				console.log('letter top '+triggeredLetter, letterTop)
				desktopMenuListContainer.scrollTo({
					top: letterTop,
					behavior: "smooth",
				});
				mobileMenuList.scrollTo({
					top: letterTop,
					behavior: "smooth",
				});

				e.currentTarget.classList.add('active');
			});
		})


		if(desktopMenuList !== null) desktopMenuList.innerHTML = '';
		if(mobileMenuList !== null) mobileMenuList.innerHTML = '';

		categoryListContainer?.classList.add('a2z');
		// mobileMenuList?.classList.add('a2z');

		let lastLetter = '';
		let categoryIndex = 0;
		filteredCategories.map(categoryItem => {
			let catTitle = categoryItem.title;
			let catExtraClasses = categoryItem.visited ? ' visited' : '' ;

			let currentLetter = catTitle.charAt(0).toUpperCase();
			if(lastLetter !== currentLetter){
				lastLetter = currentLetter;


				let liLetter = '<li class="category-list-item category-list-item-letter letter_'+currentLetter+'">'+currentLetter+'</li>';
				desktopMenuList?.insertAdjacentHTML('beforeend', liLetter);
				mobileMenuList?.insertAdjacentHTML('beforeend', liLetter);
				// letterOffsets[currentLetter] = liLetter.offsetTop;
				// console.log('offset ', currentLetter, liLetter.offsetTop)
			}



			let item = '<li class="category-list-item" >' + '<a  href="' + categoryItem.link + '" class="category-list-link-a2z ' + catExtraClasses + '" data-id="' + categoryItem.id + '"><span class="category-list-title">' + catTitle + '</span><span class="mobile_link_count">'+categoryItem.count+'</span></a>' + '</li>';
			desktopMenuList?.insertAdjacentHTML('beforeend', item);
			mobileMenuList?.insertAdjacentHTML('beforeend', item);
		})

		for (let key = 0; key < letters.length; key++) {
			let letterTop = document.querySelector('.category-list-item-letter.letter_'+letters[key]).offsetTop
			letterOffsets[letters[key]] = letterTop;
		}


		desktopMenuListContainer?.addEventListener("scroll", () => {
			const scrollTop = desktopMenuListContainer.scrollTop;
			let activeLetter = null;

			// Find the active letter based on scroll position

			for (let key in letterOffsets) {
				if (scrollTop >= letterOffsets[key]) {
					activeLetter = key;
				}
			}

			// Update active class
			document.querySelectorAll(".category-list-letter").forEach(div => {
				div.classList.toggle("active", div.textContent === activeLetter);
			});
		});

	}

	if (bodyClasses.contains('category') || bodyClasses.contains('page-template-page-categories')) {
		createSidebar()
		if(!filterScroll){
			initStickySidebar()
		}


	} else {
		createSidebar()
	}
}


