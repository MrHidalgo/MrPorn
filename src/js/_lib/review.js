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

		var linkOpenSite = '';
		if($this.hasAttribute('data-showopen')){
			linkOpenSite = '<a class="link_site" rel="' + link_rel + '" href="' + external_link + '" target="_blank">' + text_open + '<i class="icon-font icon-out"></i>' + '</a>';
		}

		var $block = '<div class="category_sites_item_overlay">' + '<a class="link_read" href="' + review_link + '" target="_blank">' + text_read + '<i class="icon-font icon-arrow-angle right_angle"></i>' + '</a>' + linkOpenSite + '</div>';
		$this.insertAdjacentHTML('beforeend', $block);

		/*if (review_link == external_link) {
			$this.find('.link1').addClass('visibility-hidden');
		}*/
	}
	function removeThumbInfo(el) {
		let siteItemOverlay = el.querySelector('.category_sites_item_overlay');
		if(siteItemOverlay){
			siteItemOverlay.remove();
		}
	}

	var isMobileDevice = /Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|mobile/i.test(top.navigator.userAgent);

	const categorySitesItems = document.querySelectorAll('.category_sites_item_content');

	categorySitesItems.forEach(function(element) {

		if (isMobileDevice) {
			element.querySelector('.category_sites_item_thumb').addEventListener('click', function(ev) {
				// console.log('clicking thumb info', element.classList)

				if(!element.querySelector('.category_video_item')){
					ev.preventDefault();
				}

				// ev.preventDefault();

				element.classList.add('touched');
				if(lastMobileSimilarSite){
					lastMobileSimilarSite.classList.remove('touched');
				}
				showThumbInfo(element);
				lastMobileSimilarSite = element;
			});
		}else{
			element.addEventListener('mouseenter', function() {
				showThumbInfo(element);
			});

			element.addEventListener('mouseleave', function() {
				removeThumbInfo(element);
			});
		}
	});
}
