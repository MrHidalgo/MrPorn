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
		console.log('visitedSites:', visitedSites);
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
			}else if(targetClasses.contains('link_read') || targetClasses.contains('link_site') || targetClasses.contains('category_sites_item_title') || targetClasses.contains('category_sites_item_thumb')){
				 console.log('targetClasses:', targetClasses);
				let siteItem = event.target.closest('.category_sites_item')
				siteItem.classList.add('visited');
				setVisitedView('visitedViews', siteItem.dataset.id);
			}

			// list__box__item-preview
		});

		showVisitedViews('visitedViews', selector);
	}

	return {
		initVisitedSites,
		setVisitedView,
		getVisitedViews
	}
}
