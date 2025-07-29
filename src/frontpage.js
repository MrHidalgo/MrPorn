// Import main SCSS file
import './scss/app.scss'

// Import frontpage-specific SCSS
import './scss/frontpage.scss'

// Import JavaScript modules in order (frontpage-specific)
// Core utilities and polyfills
import './js/_lib/preventBehavior.js'
import './js/_lib/_getBrowser.js'
import './js/_lib/_svg4everybody.js'

// Window and document ready handlers
import './js/_window/_indexNative.js'
import './js/_document/indexNative.js'

// Core functionality
import './js/_lib/common.js'
import './js/_lib/_webFontLoader.js'
import './js/_lib/_headerFixed.js'
import './js/_lib/_inputFocus.js'
import './js/_lib/_smoothScroll.js'
import './js/_lib/_viewPortChecker.js'

// UI components
import './js/_lib/hamburger.js'
import './js/_lib/header.js'
import './js/_lib/search.js'
import './js/_lib/dropdown.js'
import './js/_lib/_customSelect.js'
import './js/_lib/_selectrict.js'
import './js/_lib/_magnificPopup.js'

// Frontpage-specific functionality
import './js/_lib/frontpage.js'
import './js/_lib/front_functions.js'

// Import vendor scripts
import './vendorScript/_shared/bodyScrollLock.js'
import './vendorScript/_shared/marquee.js'
import './vendorScript/_shared/micromodal.js'
import './js_home/popmotion.min.js' 