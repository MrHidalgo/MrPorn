/*
 * Twitter category sort dropdown
 * Sorts the rendered list in place - no page reload. The server-side sort in category.php and
 * the ?sort= param stay as the fallback for shared links, crawlers and no-JS visitors.
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
    var DEFAULT_SORT = 'recommended';

    // The reorder takes a couple of milliseconds - far too fast to read as feedback - so hold
    // the spinner for at least this long after a click.
    var SPINNER_MIN_MS = 250;

    var listEl = document.querySelector('.row.category_sites');

    // Direct children only: the container also holds an inline <script>, the pagination block
    // and .category_sites_description as siblings of the items.
    function readItems() {
        return Array.prototype.filter.call(listEl ? listEl.children : [], function (el) {
            return el.classList && el.classList.contains('category_sites_item');
        });
    }

    var items = readItems();

    // "Recommended" is the manual order the server rendered, so keep it as it arrived.
    var originalOrder = items.slice();

    // Re-insert the block after this node rather than appending it, so the items keep their
    // child indices - _siteitems.scss:684-693 has :nth-child(2)/:nth-child(3) flex-order rules
    // and the inline <script> counts as child 1.
    var anchor = items.length ? items[0].previousSibling : null;

    function num(el, attr) { return parseInt(el.getAttribute('data-' + attr), 10) || 0; }
    function str(el, attr) { return el.getAttribute('data-' + attr) || ''; }
    function cmpStr(a, b) { return a < b ? -1 : (a > b ? 1 : 0); }

    // Mirrors the server usort in category.php:380-391. Two details verified against the
    // server's own output rather than assumed: 'date-desc' is post ID descending (not
    // post_date), and the title compare is a plain byte compare to match PHP's strcmp -
    // localeCompare would order differently.
    var COMPARATORS = {
        'followers-desc': function (a, b) { return num(b, 'followers') - num(a, 'followers'); },
        'followers-asc':  function (a, b) { return num(a, 'followers') - num(b, 'followers'); },
        'date-desc':      function (a, b) { return num(b, 'id') - num(a, 'id'); },
        'az':             function (a, b) { return cmpStr(str(a, 'title'), str(b, 'title')); },
        'za':             function (a, b) { return cmpStr(str(b, 'title'), str(a, 'title')); }
    };

    // Move the existing nodes - never rebuild innerHTML. review.js binds hover/click listeners
    // directly to each .category_sites_item_content at init, and the rank number is a CSS
    // counter, so moving nodes preserves the listeners and renumbers for free.
    function reorder(sortKey) {
        var ordered = (sortKey === DEFAULT_SORT)
            ? originalOrder.slice()
            : items.slice().sort(COMPARATORS[sortKey]);

        var frag = document.createDocumentFragment();
        ordered.forEach(function (el) { frag.appendChild(el); });

        if (anchor && anchor.parentNode === listEl) {
            listEl.insertBefore(frag, anchor.nextSibling);
        } else {
            listEl.insertBefore(frag, listEl.firstChild);
        }
    }

    function setBusy(isBusy) {
        if (btn) btn.classList.toggle('is-sorting', isBusy);
    }

    function syncUi(sortKey) {
        var text = LABELS[sortKey] || LABELS[DEFAULT_SORT];

        if (label) label.textContent = text;
        if (labelMobile) labelMobile.textContent = text;

        // Skip the header li, which has no data-sort
        optsList.querySelectorAll('li[data-sort]').forEach(function (li) {
            li.classList.toggle('active', li.dataset.sort === sortKey);
        });
    }

    function sortUrl(sortKey) {
        return window.location.pathname + (sortKey === DEFAULT_SORT ? '' : '?sort=' + sortKey);
    }

    function getCurrentSort() {
        var params = new URLSearchParams(window.location.search);
        return params.get('sort') || DEFAULT_SORT;
    }

    function applySort(sortKey) {
        // Nothing to sort, or an unknown key: fall back to the server round trip rather than
        // silently doing nothing.
        if (!listEl || !items.length || (sortKey !== DEFAULT_SORT && !COMPARATORS[sortKey])) {
            window.location.href = sortUrl(sortKey);
            return;
        }

        currentSort = sortKey;
        syncUi(sortKey);
        close();
        setBusy(true);

        var startedAt = Date.now();

        // rAF so the spinner paints before the synchronous reorder blocks the thread -
        // otherwise the class is added and removed without ever being rendered.
        window.requestAnimationFrame(function () {
            reorder(sortKey);

            if (window.history && window.history.replaceState) {
                // replaceState, not pushState: the back button shouldn't walk through every
                // sort the user tried.
                window.history.replaceState(null, '', sortUrl(sortKey));
            }

            window.setTimeout(function () {
                setBusy(false);
            }, Math.max(0, SPINNER_MIN_MS - (Date.now() - startedAt)));
        });
    }

    var currentSort = getCurrentSort();

    syncUi(currentSort);

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
