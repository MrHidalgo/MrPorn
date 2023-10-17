/*
* Category page scripts
* */
var categorySidebar;

function initCategoryPage() {
    function createSidebar() {
        var desktopMenulist = document.querySelector('.desktop_menu_list ul');

        let otherCategoryItems = document.querySelectorAll('#other_categories .category_item_title');
        otherCategoryItems.forEach(function (_category){
            var $this = _category;
            var link = _category.getAttribute('href');
            var $categoryTitle =  _category.querySelector('.catD')
            if($categoryTitle){
                var smallElement = $categoryTitle.querySelector('small');
                if (smallElement) {
                    smallElement.parentNode.removeChild(smallElement);
                }
            }

            var categorySites = $this.querySelectorAll('.url_link_list_sites .deIcon')
						var categoryThumb = $this.dataset.thumbnail;
						var categoryTitle = '<span class="category_title">'+$categoryTitle.innerHTML+'</span>';


						var categorySiteCount = $this.querySelector('.url_link_count_sites')

            var count_sites = categorySiteCount.textContent.replace('+', '');
            var icons = '';
            categorySites.forEach(function (_site){
                icons += '<span><span class="' + _site.getAttribute('class') + '"></span></span>';
            })
            //var item = '<li class="item ' + item_class + '" data-id="' + $this.attr('data-id') + '">' + '<a  href="' + link + '" class="mobile_category_name" data-group-link="' + $this.find('.url_link_caption').attr('data-group-link') + '">' + '<span>' + title + '</span>' + '<div class="mobile_link_icons">' + icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + count_sites + '</span>' + '</div>' + '</a>' + '</li>';
            var item = '<li class="item" >' + '<a  href="' + link + '" class="mobile_category_name"><span>' + categoryTitle + '</span><div class="mobile_link_icons">' + icons + '<span class="mobile_link_ellipsis">...</span>' + '<span class="mobile_link_count">' + count_sites + '</span>' + '</div>' + '</a>' + '</li>';
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


