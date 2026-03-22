document.addEventListener('DOMContentLoaded', function () {
	const toggleButton = document.querySelector('.dropdown-toggle');
	const dropdownMenu = document.querySelector('.tag-dropdown-menu');
	if (!toggleButton || !dropdownMenu) {
		return;
	}

	let dropdownLoaded = false;

	function loadDropdownContent() {
		if (dropdownLoaded) return;
		dropdownLoaded = true;

		let currentLang = document.documentElement.getAttribute('lang') || 'en';
		let langPrefix = currentLang === 'en' ? '' : '/' + currentLang;
		let rootUrl = window.rootUrl || '';
		let url = '/wp-json/mpg/sidebar-categories/';
		let cacheKey = 'sidebar_cats_v2__';
		if (currentLang !== 'en') {
			url += '?lang=' + currentLang;
			cacheKey += '_' + currentLang;
		}

		let cached = typeof getWithExpiry === 'function' ? getWithExpiry(cacheKey) : null;
		if (cached && cached.tags) {
			renderDropdownTags(cached.tags, langPrefix, rootUrl);
			return;
		}

		fetch(url)
			.then(function (res) { return res.json(); })
			.then(function (result) {
				if (typeof setWithExpiry === 'function') {
					setWithExpiry(cacheKey, result, 30 * 60 * 1000);
				}
				if (result.tags) {
					renderDropdownTags(result.tags, langPrefix, rootUrl);
				}
			})
			.catch(function () {
				dropdownLoaded = false;
			});
	}

	function renderDropdownTags(tagsData, langPrefix, rootUrl) {
		let tags = Array.isArray(tagsData) ? tagsData : Object.values(tagsData);
		let html = '';
		for (let i = 0; i < tags.length; i++) {
			let tag = tags[i];
			if (tag.slug === 'apparel' || tag.slug === 'location') continue;
			html += '<li class="dropdown-item"><a href="' + rootUrl + langPrefix + '/category-tags/' + tag.slug + '/"><i class="tag-icon tag-' + tag.icon + '"></i> <span>' + tag.name + '</span>'
				+ '<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor"><path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path></svg>'
				+ '</a></li>';
		}
		html += '<li class="dropdown-item all">'
			+ '<a href="' + rootUrl + langPrefix + '/categories/">'
			+ '<i class="tag-icon ">'
			+ '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 169.53 172.6"><rect width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" width="109.02" height="46.64" rx="11.83"></rect><rect y="62.98" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="62.98" width="109.02" height="46.64" rx="11.83"></rect><rect y="125.96" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="125.96" width="109.02" height="46.64" rx="11.83"></rect></svg>'
			+ '</i>'
			+ '<span>All Categories & Tags</span>'
			+ '<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor"><path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path></svg>'
			+ '</a>'
			+ '</li>';
		dropdownMenu.innerHTML = html;
	}

	toggleButton.addEventListener('click', function () {
		loadDropdownContent();
		dropdownMenu.classList.toggle('show');
		toggleButton.classList.toggle('show');
	});

	// Close the dropdown if clicked outside
	document.addEventListener('click', function (event) {
		if (!toggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
			dropdownMenu.classList.remove('show');
			toggleButton.classList.remove('show');
		}
	});
});
