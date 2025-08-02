const visitedSites = () => {

	const getVisitedViews = (key) => {

		let visitedSites = getCookieMpgCookie(key);

		return JSON.parse(visitedSites || '[]');
	};
	const setVisitedView = (key, id) => {
		if (!id)
			return;
		const views = getVisitedViews(key);
		if (views.includes(id))
			return;
		views.push(+id);

		createCookie(key, JSON.stringify(views), 3);
	}

	const showVisitedViews = (key, elementSelector) => {
		const visitedSites = getVisitedViews(key);
		const $els = document.querySelectorAll(elementSelector);
		$els.forEach($el => {
				const id = +$el.getAttribute('data-id');

				visitedSites.includes(id) && $el.classList.add('visited');
			}
		);
	}

	const initVisitedSites = (selector) => {
		document.addEventListener('click', function(event) {
			let targetClasses = event.target.classList;
			if (targetClasses.contains('list__box__item-link') || targetClasses.contains('list__box__item-preview')) {
				event.target.parentNode.classList.add('visited');
				setVisitedView('visitedViews', event.target.dataset.id);
			}else if(targetClasses.contains('link_read') || targetClasses.contains('link_site') || targetClasses.contains('category_sites_item_title') ){
				 console.log('targetClasses:', targetClasses);
				let siteItem = event.target.closest('.category_sites_item')
				siteItem.classList.add('visited');
				setVisitedView('visitedViews', siteItem.dataset.id);
			} else if(targetClasses.contains('category_sites_item_thumb') && targetClasses.contains('has_video')){
				let siteItem = event.target.closest('.category_sites_item')
				siteItem.classList.add('visited');
				setVisitedView('visitedViews', siteItem.dataset.id);
			} else if (targetClasses.contains('list__box-head-a') || targetClasses.contains('category-list-link')) {
				event.target.parentNode.classList.add('visited');
				setVisitedView('visitedTerms', event.target.dataset.id);
			} else if (targetClasses.contains('icon-category') || targetClasses.contains('category-list-title') || targetClasses.contains('category-list-icons')
				|| targetClasses.contains('category-site-icon') || targetClasses.contains('category_item_caption') || targetClasses.contains('category_item_caption_title')
				|| targetClasses.contains('category_item_inner') || targetClasses.contains('url_link_count_sites')
				|| targetClasses.contains('category_item_inner-overlay') || targetClasses.contains('url_link_list_sites')

			) {
				let siteItem = event.target.closest('.category-list-link')
				if(siteItem){
					siteItem.classList.add('visited');
					setVisitedView('visitedTerms', siteItem.dataset.id);
				}else{
				 siteItem = event.target.closest('.category_item_link')
					if(siteItem){
						siteItem.classList.add('visited');
						setVisitedView('visitedTerms', siteItem.dataset.id);
					}

				}
			} else if (targetClasses.contains('category_item_link')) {
				event.target.parentNode.classList.add('visited');
				setVisitedView('visitedTerms', event.target.dataset.id);
			}
			// list__box__item-preview
		});

		showVisitedViews('visitedViews', selector);
		showVisitedViews('visitedTerms', selector);
	}

	return {
		initVisitedSites,
		setVisitedView,
		getVisitedViews
	}
}

// Make visitedSites functions available globally
window.visitedSites = visitedSites();
