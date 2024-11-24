/*
* Category page scripts
* */
var categorySidebar;

function initCategoryPage() {
    function createSidebar() {
        var desktopMenulist = document.querySelector('.desktop_menu_list ul');

        let otherCategoryItems = document.querySelectorAll('#other_categories .category_item_link');
        otherCategoryItems.forEach(function (_category){
            var $this = _category;
            var link = _category.getAttribute('href');

            var categorySites = $this.querySelectorAll('.url_link_list_sites .deIcon')

					  var $categoryTitle =  _category.querySelector('.category_item_caption_title')
						var categoryTitle = $categoryTitle.innerHTML;

					var $categoryIcon =  _category.querySelector('.icon-category')
						var categoryIcon = $categoryIcon.className;


						var categorySiteCount = $this.querySelector('.url_link_count_sites')

            var count_sites = categorySiteCount.textContent.replace('+', '');
            var icons = '';
            categorySites.forEach(function (_site){
                icons += '<i class="' + _site.getAttribute('class') + '"></i>';
            })
            var item = '<li class="category-list-item" >' + '<a  href="' + link + '" class="category-list-link"><i class="'+categoryIcon+'"></i><span class="category-list-title">' + categoryTitle + '</span><div class="category-list-icons">' + icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + count_sites + '</span>' + '</div>' + '</a>' + '</li>';
            // console.log('categoryItems '+ _category.getAttribute('href')+' - '+categoryTitle + ' - ' + icons)
            desktopMenulist.insertAdjacentHTML('beforeend', item);
        });

				if(otherCategoryItems.length){
					document.querySelector('.category_list-sites').classList.add('has_sidebar')
				}

				/*if(document.querySelectorAll('.desktop_menu_list').length>0){
					var sidebar = new StickySidebar('.desktop_menu_list', {
						topSpacing: 20,
						bottomSpacing: 20,
						// containerSelector: '.category_container',
						// innerWrapperSelector: '.inner-wrapper-sticky',
						resizeSensor: true
					});

				}*/
    }

    if(document.body.classList.contains('category')){
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

				// setInterval(function (){
				// 	categorySidebar.updateSticky()
				// }, 300)
    }
}


