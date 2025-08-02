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
                const searchInput = safeQuerySelector('.searchinput');
                if (searchInput) {
                    searchInput.addEventListener("keyup", (event) => {
                        searchPageCount = 1;
                        currentSearchIndex = 1;
                        this.searchSites(searchInput.value);
                    });
                } else {
                    console.warn('Search input not found');
                }
            } catch (error) {
                console.error('Error initializing search key:', error);
            }
        },

        loadSearchData: function() {
            try {
                // Placeholder for search data loading
                console.log('Loading search data...');
                // TODO: Implement actual search data loading
            } catch (error) {
                console.error('Error loading search data:', error);
            }
        },

        searchSites: function(term, searchPage, isPaged = false, isBlog = false) {
            try {
                // Placeholder for search sites functionality
                console.log('Search sites called with term:', term);
                // TODO: Implement actual search sites functionality
            } catch (error) {
                console.error('Error in searchSites:', error);
            }
        },

        hideSearch: function() {
            try {
                // Placeholder for hide search functionality
                console.log('Hide search called');
                // TODO: Implement actual hide search functionality
            } catch (error) {
                console.error('Error in hideSearch:', error);
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
