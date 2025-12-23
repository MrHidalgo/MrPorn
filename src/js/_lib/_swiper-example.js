/**
 * Swiper Usage Example
 * 
 * This file demonstrates how to use Swiper in your external JavaScript files.
 * Swiper is available globally after vendor.js loads on the page.
 * 
 * Make sure vendor.js is loaded before your script that uses Swiper.
 */

/**
 * Basic Swiper initialization
 */
function initSwiper() {
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper is not loaded. Make sure vendor.js is included before this script.');
        return;
    }

    // Basic example
    const swiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        }
    });
}

/**
 * Advanced Swiper with modules
 * Note: Swiper bundle includes all modules by default
 */
function initAdvancedSwiper() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper is not loaded.');
        return;
    }

    const swiper = new Swiper('.swiper', {
        // Modules are included in bundle
        modules: [], // Not needed for bundle version
        
        // Autoplay
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        // Effect
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        // Scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },

        // Keyboard control
        keyboard: {
            enabled: true,
        },

        // Mousewheel
        mousewheel: {
            invert: false,
        },
    });
}

/**
 * Initialize Swiper when DOM is ready
 * Call this from your main initialization function
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize if swiper container exists
    if (document.querySelector('.swiper-container') || document.querySelector('.swiper')) {
        initSwiper();
    }
});

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSwiper, initAdvancedSwiper };
}

