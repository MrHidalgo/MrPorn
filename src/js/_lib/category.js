/*
* Category page scripts
* */

function initCategoryPage() {
	let categorySidebar;
	let desktopMenulist = document.querySelector('.category-list-menu');

    function createSidebar() {

				let categoryItems = [];

        let otherCategoryItems = document.querySelectorAll('#other_categories .category_item_link');
        otherCategoryItems.forEach(function (_category){
            let $this = _category;
            let link = _category.getAttribute('href');
						let categoryId = _category.dataset.id;
						let categoryOrder = +_category.dataset.order;
						let isVisited = _category.classList.contains('visited');
						let isVisitedClass = isVisited ? 'visited' : '';

						let categorySites = $this.querySelectorAll('.url_link_list_sites .deIcon')

					  let $categoryTitle =  _category.querySelector('.category_item_caption_title')
						let categoryTitle = $categoryTitle.innerHTML;

						let $categoryIcon =  _category.querySelector('.icon-category')
						let categoryIcon = $categoryIcon.className;


						let categorySiteCount = $this.querySelector('.url_link_count_sites')

            let count_sites = categorySiteCount.textContent.replace('+', '');
            let icons = '';
            categorySites.forEach(function (_site){
                icons += '<i class="category-site-icon ' + _site.getAttribute('class') + '"></i>';
            })

						categoryItems.push({'id': categoryId, 'title': categoryTitle, 'icon': categoryIcon, 'link': link, 'count': count_sites, 'icons': icons, 'visited': isVisited, 'order': categoryOrder});
        });



			let categoryFilter = document.querySelector('.category-list-filter')
			if(categoryFilter){
				categoryFilter.addEventListener('input', debounce(function (evt) {

					let filter = evt.target.value.toLowerCase().trim();
					if(filter == ''){
						renderCategorySidebar(categoryItems);
						return;

					}
					let filteredCategories = [...categoryItems];;
					const catCount = filteredCategories.length
					// categoryItems = categoryItems.sort((a, b) => b.title.localeCompare(a.title));
					filteredCategories = filteredCategories.sort((a, b) =>{
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
					nonPremiumItems = nonPremiumItems.sort((a, b) =>{
						return a.index - b.index;
					});
					filteredCategories = premiumItems.concat(nonPremiumItems);
					renderCategorySidebar(filteredCategories, filter);
				}));
			}

			renderCategorySidebar(categoryItems);

				if(otherCategoryItems.length){
					let catListSites = document.querySelector('.category_list-sites');
					if(catListSites){
						catListSites.classList.add('has_sidebar')
					}
				}
    }

		const renderCategorySidebar = (categoryItems, filter = '') => {
			desktopMenulist.innerHTML = '';
			categoryItems.map(
				(categoryItem) => {

					let catTitle = categoryItem.title;
					let catExtraClasses = categoryItem.visited ?' visited':'';
					if(filter!='' && catTitle.toLowerCase().indexOf(filter) > -1){
						catTitle = catTitle.replace(new RegExp(filter, 'gi'), (match) => `<span class="highlight">${match}</span>`);
						catExtraClasses += ' pulse';
					}

					let item = '<li class="category-list-item" >' + '<a  href="' + categoryItem.link + '" class="category-list-link '+catExtraClasses+'" data-id="'+categoryItem.id+'"><i class="'+categoryItem.icon+'"></i><span class="category-list-title">' + catTitle + '</span><div class="category-list-icons">' + categoryItem.icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + categoryItem.count + '</span>' + '</div>' + '</a>' + '</li>';
					desktopMenulist.insertAdjacentHTML('beforeend', item);
				}
			)
		}

    if(document.body.classList.contains('category') || document.body.classList.contains('page-template-page-categories')){
        createSidebar()

			if(document.querySelectorAll('.desktop_menu_list').length>0){
				categorySidebar = new StickySidebar('.desktop_menu_list', {
					topSpacing: 20,
					bottomSpacing: 20,
					// containerSelector: '.category_container',
					// innerWrapperSelector: '.inner-wrapper-sticky',
					resizeSensor: true
				});
			}
    }else if(document.body.classList.contains('single-sites')){
			createSidebar()
		}
}


