/*
* Category page scripts
* */

function initCategoryPage() {
	let categorySidebar;
	let desktopMenuList = document.querySelector('.category-list-menu');
	let mobileMenuList = document.querySelector('.category-list-menu-mobile');
	let categoriesPageList = document.querySelector('.categories-list');
	const bodyClasses = document.body.classList;
	const isCategoriesPage = bodyClasses.contains('page-template-page-categories');


	function createSidebar() {

		let categoryItems = [];
		let otherCategoryItems = [];
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
			renderCategorySidebar(categoryItems);
		}


		let categoryFilter = document.querySelectorAll('.category-list-filter')
		let catSearch = document.querySelector('.desktop_menu_list .category-list-search')
		if(catSearch){
			catSearch.style.display = 'block';
		}

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
			let catListSites = document.querySelector('.category_list-sites');
			if (catListSites) {
				catListSites.classList.add('has_sidebar')
			}
		}
	}

	const renderCategorySidebar = (categoryItems, filter = '', hideVisited = false) => {

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
						categoryIndex ++;
					}
				}

			}
		)
	}


	if (bodyClasses.contains('category') || bodyClasses.contains('page-template-page-categories')) {
		createSidebar()

		if (document.querySelectorAll('.desktop_menu_list').length > 0) {
			categorySidebar = new StickySidebar('.desktop_menu_list', {
				topSpacing: 20,
				bottomSpacing: 20,
				// containerSelector: '.category_container',
				// innerWrapperSelector: '.inner-wrapper-sticky',
				resizeSensor: true
			});
		}
	} else {
		createSidebar()
	}
}


