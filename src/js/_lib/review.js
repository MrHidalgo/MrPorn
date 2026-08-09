function showThumbInfoOnHover() {
	function showThumbInfo(el) {
		var review_link = el.dataset.reviewLink;

		if(!review_link || el.querySelector('.category_sites_item_overlay')){
			return;
		}

		var $title = el.querySelector('.category_sites_item_title')
			, $titleText = $title ? ($title.querySelector('.title') || $title) : null
			, siteTitle = $titleText ? $titleText.textContent.trim() : '';

		var siteUrl = el.dataset.siteUrl;
		var linkOpenSite = (el.hasAttribute('data-showopen') && siteUrl)
			? '<a class="link_site" href="' + siteUrl + '" target="_blank" rel="nofollow noopener">Open Website<i class="icon-font icon-out"></i></a>'
			: '';

		var $block = '<div class="category_sites_item_overlay">' + '<a class="link_read" href="' + review_link + '" target="_blank">' + '<span>' + siteTitle + '</span>' + '&nbsp;Review <i class="icon-font icon-arrow-angle right_angle"></i>' + '</a>' + linkOpenSite + '</div>';
		el.insertAdjacentHTML('beforeend', $block);
	}
	function removeThumbInfo(el) {
		if(window.debug){
			return true;
		}
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
				if(!element.querySelector('.category_video_item')){
					ev.preventDefault();
				}

				showThumbInfo(element);

				element.classList.add('touched');
				if(lastMobileSimilarSite){
					lastMobileSimilarSite.classList.remove('touched');
				}
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

function Marquee(selector, speed) {
	const parentSelector = document.querySelector(selector);
	const clone = parentSelector.innerHTML;
	const firstElement = parentSelector.children[0];
	let i = 0;
	console.log(firstElement);

	let interval;
	parentSelector.insertAdjacentHTML('beforeend', clone);
	parentSelector.insertAdjacentHTML('beforeend', clone);

	parentSelector.onmouseover = function (e) {
		clearInterval(interval);
	}
	parentSelector.onmouseleave = function (e) {
		startMarquee()
	}

	function startMarquee(){
		interval = setInterval(function () {
			firstElement.style.marginLeft = `-${i}px`;
			if (i > firstElement.clientWidth) {
				i = 0;
			}
			i = i + speed;
		}, 0.01);
	}

	startMarquee()
}


