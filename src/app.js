// Import main SCSS file
import './scss/app.scss'

// Import global variables first (must be loaded before other modules)
import './js/_lib/_globals.js'

// Import JavaScript modules in order (excluding frontpage-specific)
// Core utilities and polyfills
import './js/_lib/preventBehavior.js'
import './js/_lib/_getBrowser.js'
import './js/_lib/_svg4everybody.js'

// Core functionality
import './js/_lib/common.js'
import './js/_lib/_webFontLoader.js'
import './js/_lib/_smoothScroll.js'

// UI components

import './js/_lib/search.js'
import './js/_lib/dropdown.js'
import './js/_lib/_customSelect.js'
import './js/_lib/_magnificPopup.js'

// Additional functionality (excluding frontpage-specific)
import './js/_lib/scrollButton.js'
import './js/_lib/scroll_box_shadows.js'
import './js/_lib/sticky-sidebar.js'
import './js/_lib/tags_sidebar.js'
import './js/_lib/visited_sites.js'
import './js/_lib/pagination.js'
import './js/_lib/reportModal.js'
import './js/_lib/resize.js'
import './js/_lib/review.js'
import './js/_lib/fx.js'
import './js/_lib/games.js'
import './js/_lib/adb_notice.js'
import './js/_lib/ajax.js'
import './js/_lib/az.js'
import './js/_lib/categories.js'
import './js/_lib/category.js'

// Window and document ready handlers (must be last to ensure all modules are loaded)
import './js/_document/indexNative.js'

// Import vendor scripts
import './vendorScript/_shared/micromodal.js'

// Import body-scroll-lock functions and make them globally available
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

// Make bodyScrollLock globally available for legacy code
window.bodyScrollLock = {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
}

// Force the functions to be included in the bundle by using them
// This prevents tree-shaking from removing them
if (typeof window !== 'undefined') {
    // Store references to prevent tree-shaking
    window._bodyScrollLockFunctions = {
        disableBodyScroll,
        enableBodyScroll,
        clearAllBodyScrollLocks
    };
} 