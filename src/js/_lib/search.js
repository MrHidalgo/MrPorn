let searchViewContainer = document.querySelector('.header__view-actions');
function initSearch(){
	let searchClient;

	var algo_index_sites;
	var algo_index_categories;
	var algo_index_blogs;


	let searchLang = 'en';
	let searchedSites = [];
	let searchedBlogs = [];
	let searchSynonyms = [];

	let searchedCategories = [];
	let searchResultsPanel;
	let searchResultsSites;
	let searchResultsCategory;
	let searchResultCount;
	let searchPaginationContainer;
	let searchPageCount = 0;
	let searchTotalPageCount = 0;
	let searchPageMax = 5;
	let searchTerm='';
	let lastQuery= '';
	let currentSearchIndex = 1;
	let lastQuerySiteId = '';
	let lastQueryCateogryId = '';
	let lastQueryBlogId = '';

	let searchAlternatives = false

	var perPage = 8;

	let currentLang = document.documentElement.getAttribute('lang');

	window._userToken = '';

	let searchSpinner = '<div class="loading_spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';

	document.addEventListener('DOMContentLoaded', function () {
		// loadJS('/wp-content/themes/mpg/js/bodyScrollLock.min.js', function (){}, document.body);
		initSearchAd();
		loadSearchData()
	});

	function initSearchAd(){
		if(getCookieMpgCookie("wasitgoodfuckbitch") === 'yes'){
			return;
		}

		let searchResultBox = document.querySelector('.search__drop.search_results_box');
		let searchAdBox = document.createElement('div');
		searchAdBox.setAttribute('class', 'search__ad');

		let searchAdStatus = searchResultBox.dataset['search_status'];
		let searchAdIcon = searchResultBox.dataset['search_icon'];
		let searchAdContent = searchResultBox.dataset['search_content'];
		let searchAdUrl = searchResultBox.dataset['search_url'];

		if(!searchAdStatus){
			return;
		}

		searchAdBox.innerHTML = '<a class="search__ad__link" href="'+searchAdUrl+'" target="_blank">' +
			'<img class="search__ad-icon" src="'+searchAdIcon+'"/>' +
			'<span class="search__ad-content">'+searchAdContent+'</span>' +
			'</a><div class="search__ad-close">Ad &#x2715</div>'

		let searchResultsPanel = document.querySelector('[search-drop-desktop-js]');;
		if(isMobileOrTablet && window.innerWidth<769){
			searchResultsPanel = document.querySelector('[search-drop-mobile-js]');
		}
		searchResultsPanel.appendChild(searchAdBox);

		searchAdBox.classList.remove('hide')

		let searchAdClose = document.querySelector('.search__ad-close')
		if(searchAdClose){
			searchAdClose.addEventListener('click', ()=>{
				searchAdBox.classList.add('hide')
				createCookie("wasitgoodfuckbitch", 'yes', 1);

			});
		}
	}

	function initSearchKey(){
		let searchInput = document.querySelector('.searchinput');
		if(searchInput){
			searchInput.addEventListener("keyup", (event) => {
				searchPage = 1;
				currentSearchIndex = 1;
				searchSites(searchInput.value)
			});
		}
	}

	function searchSites(term, searchPage, isPaged=false, isBlog = false) {

		if(window.innerWidth < 767){
			perPage = 6;
		}else if(window.innerWidth < 1367 && window.innerWidth > 1024){
			perPage = 8;
		}else if(isMobileOrTablet){
			perPage = 9;
		}

		let jsonSites = jsonData.sites;
		let jsonSynonyms = jsonData.synonyms;

		searchPage = void 0 !== searchPage ? parseInt(searchPage) : 0;
		searchPage = parseInt(searchPage);

		if((term = term.trim()).trim().length < 2){
			hideSearch()
		}else{
			let searchTerms = [term];

			const foundSynonyms = jsonSynonyms.filter(function (_synonym, n){
				if(_synonym.type=='synonyms'){
					if(_synonym.synonyms.find(text=> text===term)){
						return 1;
					}
					return 0;
				}else if(_synonym.type == 'one-way' && _synonym.search_term==term){
					return true;
				}
			});



			searchedCategories = []

			if(foundSynonyms && foundSynonyms.length){
				let foundSynonym = foundSynonyms[0];
				if(foundSynonym.type == 'synonyms'){
					searchTerms = foundSynonym.synonyms
				}else if(foundSynonym.type == 'one-way'){
					searchTerms = foundSynonym.alternatives
				}
			}


			0 === (searchedSites = jsonSites.filter(function(t, n) {

				for(let _ti = 0; _ti < searchTerms.length; _ti++){
					let _searchTerm = searchTerms[_ti];

					if (null !== new RegExp(_searchTerm,"i").exec(t.n) | null !== new RegExp(_searchTerm,"i").exec(t.tn)){
						if(null == searchedCategories.find(e=>e.ti == t.ti)){
							searchedCategories.push(t)
						}
						return true;
					}
				}
				return false;

				// if (null !== new RegExp(_searchTerm,"i").exec(t.n) | null !== new RegExp(_searchTerm,"i").exec(t.tn))
				//     return null == searchedCategories.find(e=>e.ti == t.ti) && searchedCategories.push(t),
				//         !0


			})).length ? ((searchedSites = jsonSites.filter(e=>!0 === e.a)).map(e=>{
					null == searchedCategories.find(t=>t.ti == e.ti) && searchedCategories.push(e)
				}
			),
				searchAlternatives = !0) : searchAlternatives = !1

			0 === (searchPageCount = Math.ceil(searchedSites.length / perPage)) && (searchPageCount = 1);
			;
			if(searchAlternatives){
				searchedSites.sort((_siteA, _siteB) => _siteA.ao - _siteB.ao)
			}else {
				searchedSites.sort((_siteA, _siteB) => _siteA.o - _siteB.o)
			}

			searchedSites.sort((_siteA, _siteB) => {
				let siteAIndex = _siteA.n.indexOf(term)
				let siteBIndex = _siteB.n.indexOf(term)

				if(siteAIndex > -1 && siteBIndex > -1){
					return siteAIndex - siteBIndex;
				}
				return _siteA.o - _siteB.o;
			})

			lastQuery = term;
			searchTotalPageCount = searchedSites.length;
			renderSearchResults();

			if(searchPageCount>1){

				if(!isMobileOrTablet | window.innerWidth > 768){
					Pagination.Init(document.querySelector('.search_pagination'), {
						size: searchPageCount, // pages size
						page: 1,  // selected page
						step: 3,   // pages before and after current
						onChange: pageSearchResults
					});
				}else{
					if(document.querySelectorAll('.search_load_more').length==0){
						document.querySelector('.search_pagination').innerHTML = '<div class="search__drop-footer"><a class="search__load search_load_more">'+searchSpinner+_t('load_more', 'Load More')+'</a></div>';
					}

					if(document.querySelector('.search_load_more')){
						document.querySelector('.search_load_more').removeEventListener('click', onLoadMore);
					}


					document.querySelector('.search_load_more').addEventListener('click', onLoadMore, false);
				}
			}else{
				document.querySelector('.search_pagination').innerHTML = '';
			}
		}
	}

	function hideSearch(){

	}


	function searchBlogs(lang, index, term, searchPage, isPaged=false, isBlog = false){
		searchPage = (typeof searchPage !== 'undefined') ? parseInt(searchPage) : 0;
		searchPage = parseInt(searchPage);

		term = term.trim();
		if (term.trim().length < 2){
			return;
		}

		var perPage = 8;
		if(window.innerWidth < 767){
			perPage = 6;
		}else if(isMobileOrTablet){
			perPage = 9;
		}

		index.search(term, {
			page:searchPage,
			hitsPerPage: perPage,
			clickAnalytics: true
		}).then(function(content, err) {

			currentSearchIndex = +searchPage;

			lastQueryBlogId = content.queryID;

			searchedBlogs = content.hits;
			searchTotalPageCount = content.nbHits;
			searchPageCount = parseInt(content.nbPages);

			if(parseFloat(searchTotalPageCount/8) < parseFloat(content.nbPages)){
				--searchPageCount;
			}

			if(searchPageCount==125){
				searchPageCount = 124;
			}

			if(searchPageCount==0){
				searchPageCount = 1;
			}

			renderSearchResults(isPaged, content.query, isBlog);

			if(term !=undefined && lastQuery!=term){
				lastQuery = term;

				if(searchPageCount>1){

					if(!isMobileOrTablet){
						Pagination.Init(document.querySelector('.search_pagination'), {
							size: searchPageCount, // pages size
							page: 1,  // selected page
							step: 3,   // pages before and after current
							onChange: pageBlogResults
						});
					}else{
						if(document.querySelectorAll('.search_load_more').length==0){
							document.querySelector('.search_pagination').innerHTML = '<div class="search__drop-footer"><a class="search__load search_load_more">'+searchSpinner+_t('load_more', 'Load More')+'</a></div>';
						}

						if(document.querySelector('.search_load_more')){
							document.querySelector('.search_load_more').removeEventListener('click', onLoadMore);
						}


						document.querySelector('.search_load_more').addEventListener('click', onLoadMore, false);
					}
				}else{
					document.querySelector('.search_pagination').innerHTML = '';
				}
			}
		});
	}

	function onLoadMore(e){
		setInnerHeight();
		e.preventDefault();

		if(searchPageCount>(+currentSearchIndex+1)){
			let btSearchMore = document.querySelector('.search_load_more');
			if(btSearchMore){
				btSearchMore.classList.add('loading');
			}

			searchPage = ++currentSearchIndex;

			let paginatedSites = getSearchSiteList();

			searchResultsSites.insertAdjacentHTML('beforeend', paginatedSites);

			initSearchCategoryScroll();
			initSearchItemTouch();
			setInnerHeight();

			if(btSearchMore){
				btSearchMore.classList.remove('loading');
			}
			// disableScroll()
			document.body.classList.add('has_search');
		}
	}

	function renderSearchResults(isPaged=false, query, isBlog=false) {

		let htmlSites = getSearchSiteList();
		let htmlBlogs = getSearchBlogList();
		let htmlCategories = getSearchCategoryList();
		let htmlPagination = getPaginateSearch();

		if(htmlBlogs!=''){
			htmlSites = htmlBlogs;
		}

		query = lastQuery;

		if(!searchResultsPanel){
			let search = ''; //  '<div class="search_results">';

			if(searchAlternatives | query=='no_results' | (typeof query === 'undefined') | searchTotalPageCount==0){
				if(isMobileOrTablet){
					search += '<div class="search_results_top"><div class="top_results">'+_t('no-results', 'No Results')+'. <span>'+_t('alternatives', 'Alternatives')+':</span></div><div class="search_results_tags">'+htmlCategories+'</div></div>';
				}else{
					search += '<div class="search_results_top"><div class="top_results">'+_t('no-results', 'No Results')+' (0) <span> '+_t('alternatives', 'Check Alternatives')+':</span></div><div class="search_results_tags">'+htmlCategories+'</div></div>';
				}
			}else{
				if(isMobileOrTablet | searchTotalPageCount==0){
					search += '<div class="search_results_top"><div class="top_results">Results ('+searchTotalPageCount+')</div><div class="search_results_tags">'+htmlCategories+'</div></div>';
				}else{
					search += '<div class="search_results_top"><div class="top_results">'+_t('top_results', 'Top Results')+' ('+searchTotalPageCount+')</div><div class="search_results_tags">'+htmlCategories+'</div></div>';
				}
			}

			search +=  '<div class="search_result_box">';
			search += '<div class="search_results_sites">'+htmlSites+'</div>';

			search += '<div class="search_pagination"></div>';

			search += '</div>';
			// search += '</div>';

			if(isMobileOrTablet && window.innerWidth<769){
				searchResultsPanel = document.querySelector('[search-drop-mobile-js]');
			}else {
				searchResultsPanel = document.querySelector('[search-drop-desktop-js]');
			}

			let searchRoot = document.createElement("div");
			searchRoot.setAttribute('class', 'search_results');
			searchRoot.innerHTML = search;
			searchResultsPanel.appendChild(searchRoot);


			searchResultsCategory = document.querySelector('.search_results_tags');
			searchResultsSites = document.querySelector('.search_results_sites');
			searchResultCount = document.querySelector('.top_results span');
			searchPaginationContainer = document.querySelector('.search_pagination');

		}else {
			show(searchResultsPanel);

			if(!searchResultsCategory){
				searchResultsCategory = document.querySelector('.search_results_tags');
			}
			if(!searchResultsSites){
				searchResultsSites = document.querySelector('.search_results_sites');
			}

			if(!searchResultCount){
				searchResultCount = document.querySelector('.top_results span');
			}

			if(!searchPaginationContainer){
				searchPaginationContainer = document.querySelector('.search_pagination');
			}


			if(typeof query !== 'undefined'){
				if(searchAlternatives | query=='no_results' | searchTotalPageCount==0){
					if(isMobileOrTablet){
						document.querySelector('.top_results').innerHTML = _t('no-results', 'No Results')+'. <span>'+_t('alternatives', 'Alternatives')+':</span>';
					}else{
						document.querySelector('.top_results').innerHTML = _t('no-results', 'No Results')+' (0) <span>'+_t('alternatives', 'Check Alternatives')+':</span>';
					}

				}else{
					if(isMobileOrTablet){
						document.querySelector('.top_results').innerHTML = _t('top_results', 'Results')+' ('+searchTotalPageCount+')';
					}else{
						document.querySelector('.top_results').innerHTML = _t('top_results', 'Top Results')+' ('+searchTotalPageCount+')';
					}


					//searchResultCount.innerHTML = ''+searchTotalPageCount;
				}
			}




			searchResultsCategory.innerHTML = htmlCategories;

			if(isPaged){
				if(isMobileOrTablet && window.innerWidth < 769){

					searchResultsSites.insertAdjacentHTML('beforeend', htmlSites);
					var searchResultBox = document.querySelector('.search_result_box');

				}else{
					searchResultsSites.innerHTML = htmlSites;
				}
			}else{
				searchResultsSites.innerHTML = htmlSites;
			}
		}

		initSearchCategoryScroll();
		initSearchItemTouch();
		setInnerHeight();

		let btSearchMore = document.querySelector('.search_load_more');
		if(btSearchMore){
			btSearchMore.classList.remove('loading');
		}
		// disableScroll()
		document.body.classList.add('has_search');
	}

	function pageSearchResults(_searchPage){
		//searchPage = e.target.dataset.page;
		let _sp = _searchPage-1;

		if(_sp<0){
			_sp = 0;
		}
		searchPage = _searchPage;
		renderSearchResults(true)
	}

	function pageBlogResults(searchPage){
		searchPage--;

		if(searchPage<0){
			searchPage = 0;
		}
		searchBlogs(searchLang, algo_index_blogs, searchTerm, searchPage, true);
	}

	function initSearchPagination(){
		searchPaginationContainer.onclick = function (e) {
			if(e.target.tagName=='A'){
				if(!isNaN(e.target.dataset.page)){
					searchPage = e.target.dataset.page;
					searchSites(searchLang, algo_index_sites, searchTerm, searchPage, true);
				}
			}
		}
	}

	function getSearchCategoryList() {
		let categoryList = "";

		let position = 0;


		searchedCategories.map(category=>{
			let catLogoHtml = '<i class="icon-category icon-sm '+category.tt+' icon-circled"></i>';
			let catName = '';
			if(jsonData.categories && jsonData.categories[category.ti]){
				let _catItem = jsonData.categories[category.ti]
				catName = _catItem.title
			}

			position++;

			let catLink = category.tl;
			if(currentLang!='en'){
				catLink = '/'+currentLang+catLink;
			}

			categoryList += '<a class="search_category_item icPost'+category.ti+' search-category-convert scroll_to_category" data-slug="category_title_'+category.ti+'" data-object-id="'+category.ti+'" data-position="'+position+'" href="'+catLink+'">'+catLogoHtml+'<span>'+catName+'</span>'+'</a>';
		});

		let siteCategories = [];

		if(searchedCategories.length==0){

			searchedSites.map(site=>{
				if(site.category_data){
					let siteCat = site.category_data[0];
					if(siteCat){
						if(!siteCategories.includes(siteCat.id)){
							siteCategories.push(siteCat.id);
							let catLogoHtml = '';
							let catName = '';

							if(jsonData.categories && jsonData.categories[siteCat.id]){
								let _catItem = jsonData.categories[category.ti]
								let categoryLogo = _catItem.logo
								catName = _catItem.title;
								if(categoryLogo){
									catLogoHtml = '<img src="/wp-content/uploads/'+categoryLogo+'"/>';
								}
							}


							position++;

							let catLink = siteCat.link;
							if(currentLang!='en'){
								catLink = catLink.replace('www.mrporngeek.com/', 'www.mrporngeek.com/'+currentLang+'/');
							}

							categoryList += '<a class="search_category_item icPost'+siteCat.id+' " data-slug="category_title_'+siteCat.id+'" data-object-id="'+siteCat.id+'" href="'+catLink+'">'+catLogoHtml+`<span>${catName}</span>`+'</a>';
						}
					}
				}
			});



		}

		return categoryList;
	}

	function getSearchSiteList() {
		let siteList = "";
		let position = 0;

		let _start = (searchPage-1)*perPage;
		let _to = searchPage*perPage;

		let _sitesBatch = [];

		//console.log('listing from '+_start+' to '+_to+' total='+searchedSites.length+' -- '+perPage);

		for (let i = _start; i< _to; i++){
			searchedSites[i] !== undefined && _sitesBatch.push(searchedSites[i]);
		}

		_sitesBatch.map(site=>{

			let siteTag = '';
			let siteTagId = site.ti;
			let siteTagName = site.tn;
			let siteCategoryLink = site.tl;
			let siteCategoryId = site.ti;
			let siteIcon = site.ico;
			let fIcons = siteIcon.split(',');
			let fx = fIcons[0];
			let fy = fIcons[1];

			//siteTagName = _tCategoryTitle(siteTagId, siteTagName);

			if(currentLang!='en'){
				siteCategoryLink = '/'+currentLang+siteCategoryLink;
			}


			//let siteThumb = 'https://www.mrporngeek.com'+site.th;
			let siteThumb = site.th;
			let siteUrl = site.u;
			position++;


			let siteLink = site.l;
			// if(currentLang!='en'){
			//     siteLink = '/'+currentLang+ siteLink;
			// }

			if(isMobileOrTablet && window.innerWidth < 769){
				siteList += '<div class="search_site_item">' +
					'<div  class="search_site_item_inner">' +
					'<a href="'+siteLink+'" class="title search-site-convert deIcon fx_'+fx+' fy_'+fy+'" data-object-id="'+site.objectID+'" data-position="'+position+'">' +
					'<span>'+site.n+'</span>' +
					'</a>' +
					'<div class="thumb search_site_thumb"><img src="'+siteThumb+'"/></div>' +
					'<div class="site_category">' +
					'<a href="'+siteCategoryLink+'" class="search_category_link" data-object-id="'+siteCategoryId+'">'+siteTagName+'</a>' +
					'</div>' +
					'</div>'+

					'<div class="search_item_overlay">'+
					'<a href="'+siteLink+'" class="link_read search-site-convert" data-object-id="'+site.i+'" data-position="'+position+'">'+_t('read_review', 'Read Review')+' <i class="icon-font icon-arrow-angle right_angle"></i></a>'+
					'<a href="'+siteUrl+'" class="link_site" target="_blank" rel="nofollow">'+_t('open_site', 'Open Site')+' <i class="icon-font icon-out"></i></a>'+
					'</div>'+

					'</div>';
			}else{
				siteList += '<div class="search_site_item">' +
					'<div  class="search_site_item_inner" >' +
					'<a href="'+siteLink+'" data-object-id="'+site.i+'" data-position="'+position+'" class="title search-site-convert deIcon fx_'+fx+' fy_'+fy+'">'+
					'<span>'+site.n+'</span>' +
					'</a>' +
					'<div class="thumb search_site_thumb"><img src="'+siteThumb+'"/></div>' +
					'<div class="site_category">' +
					'<a href="'+siteCategoryLink+'" class="search_category_link" data-object-id="'+siteCategoryId+'">'+siteTagName+'</a>' +
					'</div>' +
					'</div>'+

					'<div class="search_item_overlay">'+
					'<a href="'+siteLink+'" class="link_read search-site-convert" data-object-id="'+site.i+'" data-position="'+position+'">'+_t('read_review', 'Read Review')+' <i class="icon-font icon-arrow-angle right_angle"></i></a>'+
					'<a href="'+siteUrl+'" class="link_site" target="_blank" rel="nofollow">'+_t('open_site', 'Open Site')+' <i class="icon-font icon-out"></i></a>'+
					'</div>'+

					'</div>';
			}


		});
		return siteList;
	}

	function getSearchBlogList() {
		let blogList = "";
		let position = 0;

		searchedBlogs.map(blog=>{
			position++;

			blogList += '<div class="search_site_item">' +
				'<a href="'+blog.permalink+'" class="search-blog-convert" data-object-id="'+blog.objectID+'" data-position="'+position+'">' +
				'<div class="title deIcon"><span>'+blog.post_title+'</span></div><div class="thumb"><img src="'+blog.thumbnail+'"/></div><div class="site_category">Blog</div>' +
				'</a>'+
				'</div>';
		});
		return blogList;
	}

	function initSearchCategoryScroll(){
		let isDown = false;
		let startX;
		let scrollLeft;

		searchResultsCategory.addEventListener('mousedown', (e) => {
			isDown = true;
			searchResultsCategory.classList.add('active');
			startX = e.pageX - searchResultsCategory.offsetLeft;
			scrollLeft = searchResultsCategory.scrollLeft;
		});
		searchResultsCategory.addEventListener('mouseleave', () => {
			isDown = false;
			searchResultsCategory.classList.remove('active');
		});
		searchResultsCategory.addEventListener('mouseup', () => {
			isDown = false;
			searchResultsCategory.classList.remove('active');
		});
		searchResultsCategory.addEventListener('mousemove', (e) => {
			if(!isDown) return;
			e.preventDefault();
			const x = e.pageX - searchResultsCategory.offsetLeft;
			const walk = (x - startX) * 3; //scroll-fast
			searchResultsCategory.scrollLeft = scrollLeft - walk;
		});
	}

	function getPaginateSearch() {
		let htmlPage = '';

		searchPage = parseInt(searchPage);

		if(isMobileOrTablet && window.innerWidth < 769){
			var nextPage = parseInt(searchPage)+1;
			htmlPage += '<div class="search__drop-footer">';
			htmlPage += '<a class="search__load" data-page="'+nextPage+'">'+_t('load_more', 'Load More')+'</a>';
			htmlPage += '</div>';
		}else{
			if(searchPage>1){
				htmlPage += '<a class="item prev" data-page="'+(searchPage-1)+'"></a>';
			}

			var pageStart = (searchPage<3)?0:(searchPage-2);
			var pageEnd = (searchPage<3)?6:(searchPage+4);


			if(pageEnd>searchPageCount){
				pageEnd = searchPageCount;
			}

			for(let page=pageStart; page<pageEnd; page++){
				page = parseInt(page);
				if((searchPage<3 && page< 6) || Math.abs(page - searchPage) < 3 || page == 0){
					let pageLinkClass = (page==searchPage)?'active':'';
					htmlPage += '<a class="item '+pageLinkClass+'" data-page="'+page+'">'+(page+1)+'</a>';
				}
			}

			if(searchPageCount> 6 | searchPage>0){
				htmlPage += '<a class="item next" data-page="'+(searchPage+1)+'"></a>';
			}
		}

		return htmlPage;
	}

	function onSearchItemClick(ev){
		if(isMobileOrTablet){
			let touchedSearchItems = document.querySelectorAll('.search_site_item.touched');
			touchedSearchItems.forEach((item)=>{
				item.classList.remove('touched');
			});

			ev.classList.add('touched');
		}
	}

	document.addEventListener('click', event => {
		let clickedTarget = event.target;
		if(clickedTarget.closest('.search_site_item .thumb')){
			onSearchItemClick(clickedTarget.closest('.search_site_item'));
		}

	});

	function initSearchItemTouch(){
		let searchSites = document.querySelectorAll('.search_site_item');

		for(let i = 0, len = searchSites.length; i < len; i++) {
			if(isMobileOrTablet){
				searchSites[i].removeEventListener('touchstart', onSearchItemEnter);
				searchSites[i].addEventListener('touchstart', onSearchItemEnter, false);
			}
		}
	}

	function onSearchItemEnter(ev){

		if(!ev.currentTarget.classList.contains('touched') ){
			let touchedSearchItems = document.querySelectorAll('.search_site_item.touched');
			touchedSearchItems.forEach((item)=>{
				item.classList.remove('touched');
			});

			if(ev.target.closest('.search_site_thumb')){
				ev.target.closest('.search_site_thumb').parentNode.parentNode.classList.add('touched');
			}
		}
	}

	function _tCategoryTitle(catId, defaultTitle){
		if(homeData){
			let hC = homeData['categories'];
			if(hC[catId]){
				return hC[catId]['title'];
			}
		}
		return defaultTitle;
	}

	const loadSearchData = () => {

		let url = '/wp-json/mpg/search/';
		currentLang = document.documentElement.getAttribute('lang')
		if(currentLang!='en'){
			url = '/wp-json/mpg/search/?lang='+currentLang;
		}

		fetch(url)
			.then(res => res.json())
			.then((out) => {
				// searchData = out;
				let searchDataDiv = document.createElement('script');
				searchDataDiv.type = 'text/javascript'
				searchDataDiv.text  = 'var jsonData='+out;
				if(document.body && searchDataDiv){
					document.body.appendChild(searchDataDiv);
				}
				// document.body.insertAdjacentHTML('beforeend', out);
				initSearchKey()
				initTags();
			})
			.catch(err => {
				// console.log('didnt load home data');
			});
	}

	const initTags = () => {
		// sidebar-all-tags
		let tags = jsonData.tags;

		let tagsHtml = '';
		let dropdownTags = '';

		for (const tag in tags) {
			if (tags.hasOwnProperty(tag)) {
				let tagIcon = tags[tag].icon
				tagsHtml += '<li class="categories-tags-li">\n' +
					'                        <a href="/category-tags/'+tag+'/" class="categories-tags-item solid"><i class="tag-icon tag-'+tagIcon+'"></i>'+tags[tag].name+'</a>\n' +
					'                    </li>';

				dropdownTags += '<li class="dropdown-item ">\n' +
					'                <a href="/category-tags/'+tag+'/"><i class="tag-icon themed tag-'+tagIcon+'"></i> <span>'+tags[tag].name+'</span>\n' +
					'                    <svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">\n' +
					'                        <path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>\n' +
					'                    </svg>\n' +
					'                </a>\n' +
					'            </li>'
			}
		}
		dropdownTags += '<li class="dropdown-item all">\n' +
			'            <a href="/categories/">\n' +
			'                <i class="tag-icon ">\n' +
			'                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 169.53 172.6"><rect width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" width="109.02" height="46.64" rx="11.83"></rect><rect y="62.98" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="62.98" width="109.02" height="46.64" rx="11.83"></rect><rect y="125.96" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="125.96" width="109.02" height="46.64" rx="11.83"></rect></svg>\n' +
			'                </i>\n' +
			'                <span>All Categories & Tags</span>\n' +
			'                <svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">\n' +
			'                    <path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>\n' +
			'                </svg>\n' +
			'            </a>\n' +
			'        </li>';
		let tagListMobile = document.querySelector('.tag-list-mobile');
		if (tagListMobile){
			tagListMobile.innerHTML = tagsHtml;
		}
		let tagListSidebar = document.querySelector('.tag-list-sidebar');
		if(tagListSidebar){
			tagListSidebar.innerHTML = tagsHtml;
		}
		let tagDropdown = document.querySelector('.tag-dropdown-menu');
		if(tagDropdown){
			tagDropdown.innerHTML = dropdownTags;
		}
	}
}

initSearch()
