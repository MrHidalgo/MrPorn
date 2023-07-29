function showThumbInfoOnHover() {
	function showThumbInfo(el) {
		var $this = el
			, $links = $this.querySelector('.category_sites_item_title')
			, review_link = $links.getAttribute('href')
			, link_rel = $links.getAttribute('rel')
			, external_link = $links.getAttribute('data-site-link')
			, $parents = $this.parents('.category_sites')
			, $parent = $parents.length> 0? $parents[0]:undefined
			, text_read = $parent.getAttribute('data-text-read')
			, text_open = $parent.getAttribute('data-text-open')
			, category = $parent.getAttribute('data-category');

		var $block = '<div class="category_sites_item_overlay">' + '<a class="link_read" href="' + review_link + '" target="_blank">' + text_read + '<i class="icon-font icon-arrow-angle right_angle"></i>' + '</a>' + '<a class="link_site" rel="' + link_rel + '" href="' + external_link + '" target="_blank">' + text_open + '<i class="icon-font icon-out"></i>' + '</a>' + '</div>';
		$this.insertAdjacentHTML('beforeend', $block);

		/*if (review_link == external_link) {
			$this.find('.link1').addClass('visibility-hidden');
		}*/
	}
	function removeThumbInfo(el) {
		el.querySelector('.category_sites_item_overlay').remove();
	}
	var isMobileDevice = /Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|mobile/i.test(top.navigator.userAgent);
	if (isMobileDevice) {
		$('body').on('click', '.thumbs-list-content .url_link_container .url_link_image', function(ev) {
			var $currentThumb = $(this);
			if (!$(event.target).closest('.item-link').length) {
				ev.preventDefault();
			}
			$currentThumb.find(".link").click(function(lev) {
				lev.preventDefault();
			});
			if (!$currentThumb.hasClass('touched')) {
				$('.thumbs-list-content .url_link_container .url_link_image').each(function() {
					var $this = $(this);
					$this.removeClass('touched');
					removeThumbInfo($this);
				});
				showThumbInfo($currentThumb);
				$currentThumb.addClass('touched');
			}
		});
	} else {
		const categorySitesItems = document.querySelectorAll('.category_sites_item_content');

		categorySitesItems.forEach(function(element) {
			element.addEventListener('mouseenter', function() {
				showThumbInfo(element);
			});

			element.addEventListener('mouseleave', function() {
				removeThumbInfo(element);
			});
		});
	}
}
