/**
 * Search Module - Safe implementation with module pattern
 * Replaces global variable pollution with encapsulated state
 */
const SearchModule = (function() {
    // Private variables - no longer polluting global scope
    let searchViewContainer = null;
    let searchClient = null;
    let algo_index_sites = null;
    let algo_index_categories = null;
    let algo_index_blogs = null;
    let searchLang = 'en';
    let searchedSites = [];
    let searchedBlogs = [];
    let searchSynonyms = [];
    let searchedCategories = [];
    let searchResultsPanel = null;
    let searchResultsSites = null;
    let searchResultsCategory = null;
    let searchResultCount = null;
    let searchPaginationContainer = null;
    let searchPageCount = 0;
    let searchTotalPageCount = 0;
    let searchPageMax = 5;
    let searchTerm = '';
    let lastQuery = '';
    let currentSearchIndex = 1;
    let lastQuerySiteId = '';
    let lastQueryCateogryId = '';
    let lastQueryBlogId = '';
    let searchAlternatives = false;
    let perPage = 8;
    let currentLang = '';
    let userToken = '';

    const searchSpinner = '<div class="loading_spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';

    // Private helper functions
    const safeQuerySelector = (selector, context = document) => {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return null;
        }
    };

    const safeGetCookie = (name) => {
        try {
            return window.getCookieMpgCookie ? window.getCookieMpgCookie(name) : null;
        } catch (error) {
            console.warn(`Error getting cookie: ${name}`, error);
            return null;
        }
    };

    const safeCreateCookie = (name, value, days) => {
        try {
            return window.createCookie ? window.createCookie(name, value, days) : false;
        } catch (error) {
            console.warn(`Error creating cookie: ${name}`, error);
            return false;
        }
    };

    const safeQuerySelectorAll = (selector, context = document) => {
        try {
            return context.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return [];
        }
    };

    // Initialize search container safely
    const initSearchContainer = () => {
        searchViewContainer = safeQuerySelector('.header__view-actions');
        if (!searchViewContainer) {
            console.warn('Search view container not found');
        }
    };

    // Initialize language detection
    const initLanguage = () => {
        try {
            currentLang = document.documentElement.getAttribute('lang') || 'en';
        } catch (error) {
            console.warn('Error detecting language, defaulting to en', error);
            currentLang = 'en';
        }
    };

    // Public API
    return {
        init: function() {
            try {
                initSearchContainer();
                initLanguage();
                
                document.addEventListener('DOMContentLoaded', () => {
                    this.initSearchAd();
                    this.loadSearchData();
                });
            } catch (error) {
                console.error('Error initializing search module:', error);
            }
        },

        initSearchAd: function() {
            try {
                if (safeGetCookie("wasitgoodfuckbitch") === 'yes') {
                    return;
                }

                const searchResultBox = safeQuerySelector('.search__drop.search_results_box');
                if (!searchResultBox) {
                    console.warn('Search result box not found');
                    return;
                }

                const searchAdBox = document.createElement('div');
                searchAdBox.setAttribute('class', 'search__ad');

                const searchAdStatus = searchResultBox.dataset['search_status'];
                const searchAdIcon = searchResultBox.dataset['search_icon'];
                const searchAdContent = searchResultBox.dataset['search_content'];
                const searchAdUrl = searchResultBox.dataset['search_url'];

                if (!searchAdStatus) {
                    return;
                }

                searchAdBox.innerHTML = '<a class="search__ad__link" href="' + searchAdUrl + '" target="_blank">' +
                    '<img class="search__ad-icon" src="' + searchAdIcon + '"/>' +
                    '<span class="search__ad-content">' + searchAdContent + '</span>' +
                    '</a><div class="search__ad-close">Ad &#x2715</div>';

                let searchResultsPanel = safeQuerySelector('[search-drop-desktop-js]');
                if (window.isMobileOrTablet && window.innerWidth < 769) {
                    searchResultsPanel = safeQuerySelector('[search-drop-mobile-js]');
                }

                if (searchResultsPanel) {
                    searchResultsPanel.appendChild(searchAdBox);
                    searchAdBox.classList.remove('hide');

                    const searchAdClose = safeQuerySelector('.search__ad-close');
                    if (searchAdClose) {
                        searchAdClose.addEventListener('click', () => {
                            searchAdBox.classList.add('hide');
                            safeCreateCookie("wasitgoodfuckbitch", 'yes', 1);
                        });
                    }
                } else {
                    console.warn('Search results panel not found');
                }
            } catch (error) {
                console.error('Error initializing search ad:', error);
            }
        },

        initSearchKey: function() {
            try {
                const searchInputs = safeQuerySelectorAll('[search-js]');
                if (searchInputs.length > 0) {
                    searchInputs.forEach((searchInput) => {
                        searchInput.addEventListener("keyup", (event) => {
                            const searchTerm = event.target.value.trim();
                            searchPageCount = 1;
                            currentSearchIndex = 1;
                            
                            if (searchTerm.length >= 2) {
                                this.searchSites(searchTerm);
                            } else {
                                this.hideSearch();
                            }
                        });
                    });
                } else {
                    console.warn('Search inputs not found');
                }
            } catch (error) {
                console.error('Error initializing search key:', error);
            }
        },

        loadSearchData: function() {
            currentLang = document.documentElement.getAttribute('lang');

            let _this = this;
            try {
                let url = '/wp-json/mpg/search/';
                
                if(currentLang != 'en'){
                    url = '/wp-json/mpg/search/?lang=' + currentLang;
                }
                

                fetch(url)
                    .then(res => res.json())
                    .then((out) => {
                        

                        let searchDataDiv = document.createElement('script');
                        searchDataDiv.type = 'text/javascript';
                        searchDataDiv.text = 'var jsonData=' + out;
                        if(document.body && searchDataDiv){
                            document.body.appendChild(searchDataDiv);
                        }
                        _this.renderRecentLinks(out);
                        _this.initSearchKey();
                        _this.initTags();
                    })
                    .catch(err => {
                        console.warn('Failed to load search data:', err);
                    });
            } catch (error) {
                console.error('Error loading search data:', error);
            }
        },

        renderRecentLinks: function(data) {
            // jsonData is already parsed JSON object, no need to parse again
            // data = JSON.parse(data);
            let recentLinks = jsonData.recent_links;
            let recentLinksContainer = safeQuerySelector('.header__recent');
            if(recentLinksContainer && recentLinksContainer.innerHTML != ''){
                return;
            }

            if(recentLinks && recentLinks.links && recentLinks.links.length > 0){
                let recentLinksHtml = '<div class="header__recent-head"><p>'+recentLinks.title+'</p><i class="icon-font icon-left-arrow"></i></div>';
                recentLinksHtml += '<div class="header__recent-body">'; 
                recentLinks.links.forEach(link => {
                    recentLinksHtml += '<a href="'+ rootUrl + link.url+'"><i class="icon-font icon-arrow-angle"></i><span>'+link.title+'</span></a>';
                });
                recentLinksHtml += '</div>';
                recentLinksContainer.innerHTML = recentLinksHtml;
            }

        },

        renderRecentCategories: function(jsonData) {    
        },

        searchSites: function(term, searchPage, isPaged = false, isBlog = false) {
            try {
                if(window.innerWidth < 767){
                    perPage = 6;
                }else if(window.innerWidth < 1367 && window.innerWidth > 1024){
                    perPage = 8;
                }else if(window.isMobileOrTablet){
                    perPage = 9;
                }
        
                let jsonSites = window.jsonData ? window.jsonData.sites : [];
                let jsonSynonyms = window.jsonData ? window.jsonData.synonyms : [];
        
                searchPage = void 0 !== searchPage ? parseInt(searchPage) : 0;
                searchPage = parseInt(searchPage);
        
                if((term = term.trim()).trim().length < 2){
                    this.hideSearch();
                    return;
                }
                
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
        
                searchedCategories = [];
        
                if(foundSynonyms && foundSynonyms.length){
                    let foundSynonym = foundSynonyms[0];
                    if(foundSynonym.type == 'synonyms'){
                        searchTerms = foundSynonym.synonyms;
                    }else if(foundSynonym.type == 'one-way'){
                        searchTerms = foundSynonym.alternatives;
                    }
                }
        
                // Search in sites using original logic
                searchedSites = jsonSites.filter(function(t, n) {
                    // Check if any term matches the name
                    let nameMatches = searchTerms.some(term => 
                        null !== new RegExp(term, "i").exec(t.n)
                    );
                    
                    // Check if all terms match the tag name
                    let tagMatchesAll = searchTerms.every(term => 
                        null !== new RegExp(term, "i").exec(t.tn)
                    );
                    
                    if (nameMatches || tagMatchesAll) {
                        if(null == searchedCategories.find(e=>e.ti == t.ti)){
                            searchedCategories.push(t);
                        }
                        return true;
                    }
                    return false;
                });
                console.log(searchedSites);
        
                // Handle alternatives if no results found
                if(searchedSites.length === 0) {
                    searchedSites = jsonSites.filter(e=>!0 === e.a);
                    searchedSites.map(e=>{
                        null == searchedCategories.find(t=>t.ti == e.ti) && searchedCategories.push(e);
                    });
                    searchAlternatives = true;
                } else {
                    searchAlternatives = false;
                }
        
                // Calculate pagination
                searchPageCount = Math.ceil(searchedSites.length / perPage);
                if(searchPageCount === 0) {
                    searchPageCount = 1;
                }
        
                // Sort results
                if(searchAlternatives){
                    searchedSites.sort((_siteA, _siteB) => _siteA.ao - _siteB.ao);
                } else {
                    searchedSites.sort((_siteA, _siteB) => _siteA.o - _siteB.o);
                }
        
                // Sort by term position in name
                searchedSites.sort((_siteA, _siteB) => {
                    let siteAIndex = _siteA.n.indexOf(term);
                    let siteBIndex = _siteB.n.indexOf(term);
                    if(siteAIndex > -1 && siteBIndex > -1){
                        return siteAIndex - siteBIndex;
                    }
                    return _siteA.o - _siteB.o;
                });
        
                lastQuery = term;
                searchTotalPageCount = searchedSites.length;
                this.renderSearchResults();
        
                // Handle pagination
                if(searchPageCount > 1){
                    if(!window.isMobileOrTablet || window.innerWidth > 768){
                        if(window.Pagination) {
                            window.Pagination.Init(safeQuerySelector('.search_pagination'), {
                                size: searchPageCount,
                                page: 1,
                                step: 3,
                                onChange: this.pageSearchResults.bind(this)
                            });
                        }
                    } else {
                        if(safeQuerySelectorAll('.search_load_more').length == 0){
                            const paginationContainer = safeQuerySelector('.search_pagination');
                            if(paginationContainer) {
                                paginationContainer.innerHTML = '<div class="search__drop-footer"><a class="search__load search_load_more">' + searchSpinner + this._t('load_more', 'Load More') + '</a></div>';
                            }
                        }
        
                        const loadMoreBtn = safeQuerySelector('.search_load_more');
                        if(loadMoreBtn){
                            loadMoreBtn.removeEventListener('click', this.onLoadMore.bind(this));
                            loadMoreBtn.addEventListener('click', this.onLoadMore.bind(this), false);
                        }
                    }
                } else {
                    const paginationContainer = safeQuerySelector('.search_pagination');
                    if(paginationContainer) {
                        paginationContainer.innerHTML = '';
                    }
                }
                
            } catch (error) {
                console.error('Error in searchSites:', error);
            }
        },

        hideSearch: function() {
            try {
                const searchDrop = safeQuerySelector('.search__drop');
                if (searchDrop) {
                    searchDrop.classList.remove('is-open');
                }
                
                const searchDropMobile = safeQuerySelector('[search-drop-mobile-js]');
                if (searchDropMobile) {
                    searchDropMobile.classList.remove('is-open');
                }
                
                const searchDropDesktop = safeQuerySelector('[search-drop-desktop-js]');
                if (searchDropDesktop) {
                    searchDropDesktop.classList.remove('is-open');
                }
                
                // Clear search results
                searchedSites = [];
                searchedCategories = [];
                searchedBlogs = [];
                
            } catch (error) {
                console.error('Error in hideSearch:', error);
            }
        },

        renderSearchResults: function(isPaged = false, query, isBlog = false) {
            try {
                let htmlSites = this.getSearchSiteList();
                let htmlBlogs = this.getSearchBlogList();
                let htmlCategories = this.getSearchCategoryList();
                let htmlPagination = this.getPaginateSearch();

                if(htmlBlogs != ''){
                    htmlSites = htmlBlogs;
                }

                query = lastQuery;

                if(!searchResultsPanel){
                    let search = '';

                    if(searchAlternatives || query == 'no_results' || (typeof query === 'undefined') || searchTotalPageCount == 0){
                        if(window.isMobileOrTablet){
                            search += '<div class="search_results_top"><div class="top_results">' + this._t('no-results', 'No Results') + '. <span>' + this._t('alternatives', 'Alternatives') + ':</span></div><div class="search_results_tags">' + htmlCategories + '</div></div>';
                        } else {
                            search += '<div class="search_results_top"><div class="top_results">' + this._t('no-results', 'No Results') + ' (0) <span> ' + this._t('alternatives', 'Check Alternatives') + ':</span></div><div class="search_results_tags">' + htmlCategories + '</div></div>';
                        }
                    } else {
                        if(window.isMobileOrTablet || searchTotalPageCount == 0){
                            search += '<div class="search_results_top"><div class="top_results">Results (' + searchTotalPageCount + ')</div><div class="search_results_tags">' + htmlCategories + '</div></div>';
                        } else {
                            search += '<div class="search_results_top"><div class="top_results">' + this._t('top_results', 'Top Results') + ' (' + searchTotalPageCount + ')</div><div class="search_results_tags">' + htmlCategories + '</div></div>';
                        }
                    }

                    search += '<div class="search_result_box">';
                    search += '<div class="search_results_sites">' + htmlSites + '</div>';
                    search += '<div class="search_pagination"></div>';
                    search += '</div>';

                    if(window.isMobileOrTablet && window.innerWidth < 769){
                        searchResultsPanel = safeQuerySelector('[search-drop-mobile-js]');
                    } else {
                        searchResultsPanel = safeQuerySelector('[search-drop-desktop-js]');
                    }

                    let searchRoot = document.createElement("div");
                    searchRoot.setAttribute('class', 'search_results');
                    searchRoot.innerHTML = search;
                    searchResultsPanel.appendChild(searchRoot);

                    searchResultsCategory = safeQuerySelector('.search_results_tags');
                    searchResultsSites = safeQuerySelector('.search_results_sites');
                    searchResultCount = safeQuerySelector('.top_results span');
                    searchPaginationContainer = safeQuerySelector('.search_pagination');

                } else {
                    this.show(searchResultsPanel);

                    if(!searchResultsCategory){
                        searchResultsCategory = safeQuerySelector('.search_results_tags');
                    }
                    if(!searchResultsSites){
                        searchResultsSites = safeQuerySelector('.search_results_sites');
                    }
                    if(!searchResultCount){
                        searchResultCount = safeQuerySelector('.top_results span');
                    }
                    if(!searchPaginationContainer){
                        searchPaginationContainer = safeQuerySelector('.search_pagination');
                    }

                    if(typeof query !== 'undefined'){
                        if(searchAlternatives || query == 'no_results' || searchTotalPageCount == 0){
                            if(window.isMobileOrTablet){
                                const topResults = safeQuerySelector('.top_results');
                                if(topResults) topResults.innerHTML = this._t('no-results', 'No Results') + '. <span>' + this._t('alternatives', 'Alternatives') + ':</span>';
                            } else {
                                const topResults = safeQuerySelector('.top_results');
                                if(topResults) topResults.innerHTML = this._t('no-results', 'No Results') + ' (0) <span>' + this._t('alternatives', 'Check Alternatives') + ':</span>';
                            }
                        } else {
                            if(window.isMobileOrTablet){
                                const topResults = safeQuerySelector('.top_results');
                                if(topResults) topResults.innerHTML = this._t('top_results', 'Results') + ' (' + searchTotalPageCount + ')';
                            } else {
                                const topResults = safeQuerySelector('.top_results');
                                if(topResults) topResults.innerHTML = this._t('top_results', 'Top Results') + ' (' + searchTotalPageCount + ')';
                            }
                        }
                    }

                    if(searchResultsCategory) searchResultsCategory.innerHTML = htmlCategories;

                    if(isPaged){
                        if(window.isMobileOrTablet && window.innerWidth < 769){
                            searchResultsSites.insertAdjacentHTML('beforeend', htmlSites);
                        } else {
                            searchResultsSites.innerHTML = htmlSites;
                        }
                    } else {
                        searchResultsSites.innerHTML = htmlSites;
                    }
                }

                this.initSearchCategoryScroll();
                this.initSearchItemTouch();
                this.setInnerHeight();

                let btSearchMore = safeQuerySelector('.search_load_more');
                if(btSearchMore){
                    btSearchMore.classList.remove('loading');
                }

                document.body.classList.add('has_search');
                
            } catch (error) {
                console.error('Error in renderSearchResults:', error);
            }
        },

        // Helper functions
        show: function(element) {
            if (element && element.style) {
                element.style.display = 'block';
            }
        },

        hide: function(element) {
            if (element && element.style) {
                element.style.display = 'none';
            }
        },

        setInnerHeight: function() {
            if (window.setInnerHeight) {
                window.setInnerHeight();
            }
        },

        _t: function(key, defaultValue) {
            if (window._t) {
                return window._t(key, defaultValue);
            }
            return defaultValue;
        },

        // Pagination functions
        pageSearchResults: function(_searchPage) {
            let _sp = _searchPage - 1;
            if(_sp < 0) {
                _sp = 0;
            }
            searchPage = _searchPage;
            this.renderSearchResults(true);
        },

        onLoadMore: function(e) {
            this.setInnerHeight();
            e.preventDefault();

            if(searchPageCount > (+currentSearchIndex + 1)){
                let btSearchMore = safeQuerySelector('.search_load_more');
                if(btSearchMore){
                    btSearchMore.classList.add('loading');
                }

                searchPage = ++currentSearchIndex;
                let paginatedSites = this.getSearchSiteList();
                searchResultsSites.insertAdjacentHTML('beforeend', paginatedSites);

                this.initSearchCategoryScroll();
                this.initSearchItemTouch();
                this.setInnerHeight();

                if(btSearchMore){
                    btSearchMore.classList.remove('loading');
                }
                document.body.classList.add('has_search');
            }
        },

        // HTML generation functions
        getSearchSiteList: function() {
            let siteList = "";
            let position = 0;

            let _start = (searchPage - 1) * perPage;
            let _to = searchPage * perPage;
            let _sitesBatch = [];

            for (let i = _start; i < _to; i++){
                searchedSites[i] !== undefined && _sitesBatch.push(searchedSites[i]);
            }

            _sitesBatch.map(site => {
                let siteTag = '';
                let siteTagId = site.ti;
                let siteTagName = site.tn;
                let siteCategoryLink = site.tl;
                let siteCategoryId = site.ti;
                let siteIcon = site.ico;
                let fIcons = siteIcon.split(',');
                let fx = fIcons[0];
                let fy = fIcons[1];
                let boost = ''+site.bv;

                if(currentLang != 'en'){
                    siteCategoryLink = '/' + currentLang + siteCategoryLink;
                }

                let siteThumb = site.th;
                let siteUrl = site.u;
                position++;

                let siteLink = site.l;

                let boostHtml = '';
                let thumbClasses = '';
                let siteItemClasses = '';

                if(boost > 0){
                    siteItemClasses = 'boost';
                    thumbClasses = 'boosted';
                    let bootstImage = boost > 499 ? 'bcv' : 'bwvn';
                    let boostIconClass = boost > 499 ? 'boosted-crown' : 'boosted-blue';
                    if(boost > 499){
                        thumbClasses += ' boosted-crown';
                    }else {
                        thumbClasses += ' boosted-blue';
                    }
                    let boostImageNumbers = boost.replaceAll('', '-')
                    boostHtml = `<i class="boost-indicator boost-indicator-preview site_thumb ${boostIconClass} nolazy" style="background-image: url('/wp-content/themes/mpg/images/boost/${bootstImage+boostImageNumbers}X.svg');"></i>`;
                }

                if(window.isMobileOrTablet && window.innerWidth < 769){
                    siteList += '<div class="search_site_item '+siteItemClasses+'">' +
                        '<div class="search_site_item_inner">' +
                        '<a href="' + siteLink + '" class="title search-site-convert deIcon fx_' + fx + ' fy_' + fy + '" data-object-id="' + site.objectID + '" data-position="' + position + '">' +
                        '<span>' + site.n + '</span>' +
                        '</a>' +
                        '<div class="thumb search_site_thumb">'+boostHtml+'<img class="'+thumbClasses+'" src="' + siteThumb + '"/></div>' +
                        '<div class="site_category">' +
                        '<a href="' + siteCategoryLink + '" class="search_category_link" data-object-id="' + siteCategoryId + '">' + siteTagName + '</a>' +
                        '</div>' +
                        '</div>' +
                        '<div class="search_item_overlay">' +
                        '<a href="' + siteLink + '" class="link_read search-site-convert" data-object-id="' + site.i + '" data-position="' + position + '">' + this._t('read_review', 'Read Review') + ' <i class="icon-font icon-arrow-angle right_angle"></i></a>' +
                        '<a href="' + siteUrl + '" class="link_site" target="_blank" rel="nofollow">' + this._t('open_site', 'Open Site') + ' <i class="icon-font icon-out"></i></a>' +
                        '</div>' +
                        '</div>';
                } else {
                    siteList += '<div class="search_site_item '+siteItemClasses+'">' +
                        '<div class="search_site_item_inner">' +
                        '<a href="' + siteLink + '" data-object-id="' + site.i + '" data-position="' + position + '" class="title search-site-convert deIcon fx_' + fx + ' fy_' + fy + '">' +
                        '<span>' + site.n + '</span>' +
                        '</a>' +
                        '<div class="thumb search_site_thumb">'+boostHtml+'<img class="'+thumbClasses+'" src="' + siteThumb + '"/></div>' +
                        '<div class="site_category">' +
                        '<a href="' + siteCategoryLink + '" class="search_category_link" data-object-id="' + siteCategoryId + '">' + siteTagName + '</a>' +
                        '</div>' +
                        '</div>' +
                        '<div class="search_item_overlay">' +
                        '<a href="' + siteLink + '" class="link_read search-site-convert" data-object-id="' + site.i + '" data-position="' + position + '">' + this._t('read_review', 'Read Review') + ' <i class="icon-font icon-arrow-angle right_angle"></i></a>' +
                        '<a href="' + siteUrl + '" class="link_site" target="_blank" rel="nofollow">' + this._t('open_site', 'Open Site') + ' <i class="icon-font icon-out"></i></a>' +
                        '</div>' +
                        '</div>';
                }
            });
            return siteList;
        },

        getSearchBlogList: function() {
            let blogList = "";
            let position = 0;

            searchedBlogs.map(blog => {
                position++;
                blogList += '<div class="search_site_item">' +
                    '<a href="' + blog.permalink + '" class="search-blog-convert" data-object-id="' + blog.objectID + '" data-position="' + position + '">' +
                    '<div class="title deIcon"><span>' + blog.post_title + '</span></div><div class="thumb"><img src="' + blog.thumbnail + '"/></div><div class="site_category">Blog</div>' +
                    '</a>' +
                    '</div>';
            });
            return blogList;
        },

        getSearchCategoryList: function() {
            let categoryList = "";
            let position = 0;

            searchedCategories.map(category => {
                let catLogoHtml = '<i class="icon-category icon-sm ' + category.tt + ' icon-circled"></i>';
                let catName = '';
                if(window.jsonData.categories && window.jsonData.categories[category.ti]){
                    let _catItem = window.jsonData.categories[category.ti];
                    catName = _catItem.title;
                }

                position++;

                let catLink = category.tl;
                if(currentLang != 'en'){
                    catLink = '/' + currentLang + catLink;
                }

                categoryList += '<a class="search_category_item icPost' + category.ti + ' search-category-convert scroll_to_category" data-slug="category_title_' + category.ti + '" data-object-id="' + category.ti + '" data-position="' + position + '" href="' + catLink + '">' + catLogoHtml + '<span>' + catName + '</span>' + '</a>';
            });

            let siteCategories = [];

            if(searchedCategories.length == 0){
                searchedSites.map(site => {
                    if(site.category_data){
                        let siteCat = site.category_data[0];
                        if(siteCat){
                            if(!siteCategories.includes(siteCat.id)){
                                siteCategories.push(siteCat.id);
                                let catLogoHtml = '';
                                let catName = '';

                                if(window.jsonData.categories && window.jsonData.categories[siteCat.id]){
                                    let _catItem = window.jsonData.categories[siteCat.id];
                                    let categoryLogo = _catItem.logo;
                                    catName = _catItem.title;
                                    if(categoryLogo){
                                        catLogoHtml = '<img src="/wp-content/uploads/' + categoryLogo + '"/>';
                                    }
                                }

                                position++;

                                let catLink = siteCat.link;
                                if(currentLang != 'en'){
                                    catLink = catLink.replace('www.mrporngeek.com/', 'www.mrporngeek.com/' + currentLang + '/');
                                }

                                categoryList += '<a class="search_category_item icPost' + siteCat.id + '" data-slug="category_title_' + siteCat.id + '" data-object-id="' + siteCat.id + '" href="' + catLink + '">' + catLogoHtml + '<span>' + catName + '</span>' + '</a>';
                            }
                        }
                    }
                });
            }

            return categoryList;
        },

        getPaginateSearch: function() {
            let htmlPage = '';
            searchPage = parseInt(searchPage);

            if(window.isMobileOrTablet && window.innerWidth < 769){
                var nextPage = parseInt(searchPage) + 1;
                htmlPage += '<div class="search__drop-footer">';
                htmlPage += '<a class="search__load" data-page="' + nextPage + '">' + this._t('load_more', 'Load More') + '</a>';
                htmlPage += '</div>';
            } else {
                if(searchPage > 1){
                    htmlPage += '<a class="item prev" data-page="' + (searchPage - 1) + '"></a>';
                }

                var pageStart = (searchPage < 3) ? 0 : (searchPage - 2);
                var pageEnd = (searchPage < 3) ? 6 : (searchPage + 4);

                if(pageEnd > searchPageCount){
                    pageEnd = searchPageCount;
                }

                for(let page = pageStart; page < pageEnd; page++){
                    page = parseInt(page);
                    if((searchPage < 3 && page < 6) || Math.abs(page - searchPage) < 3 || page == 0){
                        let pageLinkClass = (page == searchPage) ? 'active' : '';
                        htmlPage += '<a class="item ' + pageLinkClass + '" data-page="' + page + '">' + (page + 1) + '</a>';
                    }
                }

                if(searchPageCount > 6 || searchPage > 0){
                    htmlPage += '<a class="item next" data-page="' + (searchPage + 1) + '"></a>';
                }
            }

            return htmlPage;
        },

        // Event handling functions
        initSearchCategoryScroll: function() {
            if (!searchResultsCategory) return;
            
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
                const walk = (x - startX) * 3;
                searchResultsCategory.scrollLeft = scrollLeft - walk;
            });
        },

        initSearchItemTouch: function() {
            let searchSites = safeQuerySelectorAll('.search_site_item');

            for(let i = 0, len = searchSites.length; i < len; i++) {
                if(window.isMobileOrTablet){
                    searchSites[i].removeEventListener('touchstart', this.onSearchItemEnter.bind(this));
                    searchSites[i].addEventListener('touchstart', this.onSearchItemEnter.bind(this), false);
                }
            }
        },

        onSearchItemEnter: function(ev) {
            if(!ev.currentTarget.classList.contains('touched')){
                let touchedSearchItems = safeQuerySelectorAll('.search_site_item.touched');
                touchedSearchItems.forEach((item) => {
                    item.classList.remove('touched');
                });

                if(ev.target.closest('.search_site_thumb')){
                    ev.target.closest('.search_site_thumb').parentNode.parentNode.classList.add('touched');
                }
            }
        },

        initTags: function() {
            if (!window.jsonData || !window.jsonData.tags) return;
            
            
            let tags = window.jsonData.tags;
            let tagsHtml = '';
            let dropdownTags = '';
            let currentLang = document.documentElement.getAttribute("lang");
            let langPrefix = currentLang === 'en' ? '' : '/' + currentLang;

            for (const tag in tags) {
                if (tags.hasOwnProperty(tag)) {
                    let tagIcon = tags[tag].icon;
                    tagsHtml += '<li class="categories-tags-li">\n' +
                        '                        <a href="' +  rootUrl + langPrefix + '/category-tags/' + tag + '/" class="categories-tags-item solid"><i class="tag-icon tag-' + tagIcon + '"></i>' + tags[tag].name + '</a>\n' +
                        '                    </li>';

                    dropdownTags += '<li class="dropdown-item ">\n' +
                        '                <a href="' + rootUrl + langPrefix + '/category-tags/' + tag + '/"><i class="tag-icon tag-' + tagIcon + '"></i> <span>' + tags[tag].name + '</span>\n' +
                        '                    <svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">\n' +
                        '                        <path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>\n' +
                        '                    </svg>\n' +
                        '                </a>\n' +
                        '            </li>';
                }
            }
            dropdownTags += '<li class="dropdown-item all">\n' +
                '            <a href="' + rootUrl + langPrefix + '/categories/">\n' +
                '                <i class="tag-icon ">\n' +
                '                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 169.53 172.6"><rect width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" width="109.02" height="46.64" rx="11.83"></rect><rect y="62.98" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="62.98" width="109.02" height="46.64" rx="11.83"></rect><rect y="125.96" width="46.64" height="46.64" rx="11.83"></rect><rect x="60.51" y="125.96" width="109.02" height="46.64" rx="11.83"></rect></svg>\n' +
                '                </i>\n' +
                '                <span>All Categories & Tags</span>\n' +
                '                <svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">\n' +
                '                    <path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>\n' +
                '                </svg>\n' +
                '            </a>\n' +
                '        </li>';

            // Store mobile tags HTML for later use instead of setting immediately
            window.mobileTagsHtml = tagsHtml;
            
            // Only set sidebar and dropdown tags immediately (not mobile)
            let tagListSidebar = safeQuerySelector('.tag-list-sidebar');
            if(tagListSidebar){
                tagListSidebar.innerHTML = tagsHtml;
            }
            let tagDropdown = safeQuerySelector('.tag-dropdown-menu');
            if(tagDropdown){
                tagDropdown.innerHTML = dropdownTags;
            }
        },

        // New function to populate mobile tags when hamburger is clicked
        populateMobileTags: function() {
            if (!window.mobileTagsHtml) return;
            
            let tagListMobile = safeQuerySelector('.tag-list-mobile');
            if (tagListMobile && !tagListMobile.innerHTML) {
                tagListMobile.innerHTML = window.mobileTagsHtml;
            }
        },

        // Expose necessary variables for backward compatibility
        getSearchViewContainer: () => searchViewContainer,
        getSearchTerm: () => searchTerm,
        getCurrentLang: () => currentLang,
        getPerPage: () => perPage,
        getUserToken: () => userToken,
        setUserToken: (token) => { userToken = token; }
    };
})();

// Initialize the search module
SearchModule.init();

// Legacy function for backward compatibility
function initSearch() {
    console.log('Legacy initSearch called - using SearchModule');
    SearchModule.init();
}
