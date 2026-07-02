/*
 * Twitter category sort dropdown
 * Server-side sort via ?sort= URL param + localStorage state persistence
 * Mobile: Twitter icon toggle in heading opens the same dropdown
 */

window.initTwitterSort = function() {
    var outer = document.querySelector('.twitter-sort-outer');
    if (!outer) return;

    var btn          = outer.querySelector('.twitter-sort-btn');
    var label        = outer.querySelector('.twitter-sort-label');
    var labelMobile  = outer.querySelector('.twitter-sort-label-mobile');
    var optsList     = outer.querySelector('.twitter-sort-options');
    var mobileToggle = document.querySelector('.twitter-sort-mobile-toggle');

    if (!optsList) return;

    var LABELS = {
        'recommended':    'Recommended',
        'followers-desc': 'Most followers',
        'followers-asc':  'Least followers',
        'date-desc':      'Newest added',
        'az':             'A-Z',
        'za':             'Z-A'
    };
    var STORAGE_KEY = 'mpg_twitter_sort';
    var DEFAULT_SORT = 'recommended';

    function getCurrentSort() {
        var params = new URLSearchParams(window.location.search);
        return params.get('sort') || DEFAULT_SORT;
    }

    function applySort(sortKey) {
        localStorage.setItem(STORAGE_KEY, sortKey);
        if (sortKey === DEFAULT_SORT) {
            window.location.href = window.location.pathname;
        } else {
            window.location.href = window.location.pathname + '?sort=' + sortKey;
        }
    }

    var currentSort = getCurrentSort();
    var savedSort   = localStorage.getItem(STORAGE_KEY);

    if (!window.location.search.includes('sort=') && savedSort && savedSort !== DEFAULT_SORT) {
        window.location.replace(window.location.pathname + '?sort=' + savedSort);
        return;
    }

    if (window.location.search.includes('sort=')) {
        localStorage.setItem(STORAGE_KEY, currentSort);
    }

    var currentLabel = LABELS[currentSort] || LABELS[DEFAULT_SORT];

    // Sync desktop button label
    if (label) label.textContent = currentLabel;

    // Sync mobile dropdown header label
    if (labelMobile) labelMobile.textContent = currentLabel;

    // Sync active option (skip the header li which has no data-sort)
    optsList.querySelectorAll('li[data-sort]').forEach(function(li) {
        li.classList.toggle('active', li.dataset.sort === currentSort);
    });

    function setDropdownTop() {
        if (mobileToggle && window.innerWidth <= 767) {
            var rect = mobileToggle.getBoundingClientRect();
            optsList.style.top = rect.bottom + 'px';
        } else {
            optsList.style.top = '';
        }
    }

    function close() {
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        optsList.classList.remove('open');
    }

    function open() {
        setDropdownTop();
        if (btn) btn.setAttribute('aria-expanded', 'true');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
        optsList.classList.add('open');
    }

    function toggle() {
        var isOpen = optsList.classList.contains('open');
        if (isOpen) { close(); } else { open(); }
    }

    // Desktop button toggle
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggle();
        });
    }

    // Mobile icon toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggle();
        });
    }

    optsList.addEventListener('click', function(e) {
        var li = e.target.closest('li[data-sort]');
        if (!li) return;
        if (li.dataset.sort === currentSort) { close(); return; }
        applySort(li.dataset.sort);
    });

    document.addEventListener('click', function(e) {
        if (!outer.contains(e.target) && (!mobileToggle || !mobileToggle.contains(e.target))) {
            close();
        }
    });

    window.addEventListener('resize', function() {
        if (optsList.classList.contains('open')) setDropdownTop();
    });

    // Close dropdown on scroll so it doesn't float away from the button
    window.addEventListener('scroll', function() {
        if (optsList.classList.contains('open')) close();
    }, { passive: true });
};
