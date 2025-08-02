/**
 * Main Application Module
 * ============================
 * 
 * Safe utility functions and application initialization
 * Replaces prototype pollution with modern patterns
 */

// Import utility modules (when ES6 modules are implemented)
// import { DOMUtils, ArrayUtils, FunctionUtils } from './utils/dom-utils.js';
// import { StorageUtils, CookieUtils } from './utils/storage-utils.js';

/**
 * Safe DOM Utilities - Replacement for prototype pollution
 */
const DOMUtils = {
    /**
     * Get all parent elements of an element
     * @param {Element} element - The starting element
     * @param {string} selector - Optional CSS selector to filter parents
     * @returns {Element[]} Array of parent elements
     */
    getParents: (element, selector) => {
        if (!element || !element.parentElement) return [];
        
        const elements = [];
        let elem = element;
        
        while ((elem = elem.parentElement) !== null) {
            if (elem.nodeType !== Node.ELEMENT_NODE) continue;
            if (!selector || elem.matches(selector)) {
                elements.push(elem);
            }
        }
        
        return elements;
    },

    /**
     * Safe querySelector with error handling
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (default: document)
     * @returns {Element|null} Found element or null
     */
    querySelector: (selector, context = document) => {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return null;
        }
    },

    /**
     * Show element by setting display to block
     * @param {Element} element - Element to show
     */
    show: (element) => {
        if (element && element.style) {
            element.style.display = 'block';
        }
    },

    /**
     * Hide element by setting display to none
     * @param {Element} element - Element to hide
     */
    hide: (element) => {
        if (element && element.style) {
            element.style.display = 'none';
        }
    },

    /**
     * Remove element from DOM
     * @param {Element} element - Element to remove
     */
    remove: (element) => {
        if (element && element.remove) {
            element.remove();
        }
    },

    /**
     * Toggle CSS class on element
     * @param {Element} element - Target element
     * @param {string} className - Class name to toggle
     */
    toggleClass: (element, className) => {
        if (!element || !className) return;
        
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            // Fallback for older browsers
            const classes = element.className.split(" ");
            const index = classes.indexOf(className);
            
            if (index >= 0) {
                classes.splice(index, 1);
            } else {
                classes.push(className);
            }
            element.className = classes.join(" ");
        }
    },

    /**
     * Smooth scroll to element
     * @param {Element|number} target - Target element or Y position
     * @param {number} duration - Animation duration in ms
     */
    smoothScroll: (target, duration = 1000) => {
        const elementY = typeof target === 'number' ? target : target.offsetTop;
        const startingY = window.pageYOffset;
        const diff = elementY - startingY;
        let start;

        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            
            const time = timestamp - start;
            const percent = Math.min(time / duration, 1);

            window.scrollTo(0, startingY + diff * percent);

            if (time < duration) {
                window.requestAnimationFrame(step);
            }
        });
    },

    /**
     * Find ancestor element by selector
     * @param {Element} element - Starting element
     * @param {string} selector - CSS selector
     * @returns {Element|null} Found ancestor or null
     */
    findAncestor: (element, selector) => {
        if (!element || !selector) return null;
        
        while ((element = element.parentElement) && !((element.matches || element.matchesSelector).call(element, selector)));
        return element;
    }
};

/**
 * Array Utilities - Safe replacement for prototype pollution
 */
const ArrayUtils = {
    /**
     * Remove items from array
     * @param {Array} array - Target array
     * @param {...any} items - Items to remove
     * @returns {Array} Modified array
     */
    remove: (array, ...items) => {
        if (!Array.isArray(array)) return array;
        
        items.forEach(item => {
            let index;
            while ((index = array.indexOf(item)) !== -1) {
                array.splice(index, 1);
            }
        });
        
        return array;
    }
};

/**
 * Function Utilities - Safe replacement for prototype pollution
 */
const FunctionUtils = {
    /**
     * Extend function with additional functions
     * @param {Function} baseFn - Base function
     * @param {...Function} additionalFns - Additional functions
     * @returns {Function} Combined function
     */
    extend: (baseFn, ...additionalFns) => {
        const fns = [baseFn, ...additionalFns];
        
        return function(...args) {
            fns.forEach(fn => {
                if (typeof fn === 'function') {
                    fn.apply(this, args);
                }
            });
        };
    }
};

/**
 * Enhanced Storage Utilities with error handling
 */
const StorageUtils = {
    /**
     * Set item in localStorage with expiration
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     * @param {number} ttl - Time to live in milliseconds
     * @returns {boolean} Success status
     */
    setWithExpiry: (key, value, ttl) => {
        if (!key || typeof key !== 'string') {
            console.warn('Invalid key provided to setWithExpiry');
            return false;
        }

        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        };

        try {
            localStorage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            
            // Try to clear old data and retry
            if (error.name === 'QuotaExceededError') {
                StorageUtils.clearOldData();
                try {
                    localStorage.setItem(key, JSON.stringify(item));
                    return true;
                } catch (retryError) {
                    console.error('Storage retry failed:', retryError);
                    return false;
                }
            }
            
            return false;
        }
    },

    /**
     * Get item from localStorage with expiration check
     * @param {string} key - Storage key
     * @returns {any|null} Stored value or null if expired/not found
     */
    getWithExpiry: (key) => {
        if (!key || typeof key !== 'string') {
            console.warn('Invalid key provided to getWithExpiry');
            return null;
        }

        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) {
                return null;
            }

            const item = JSON.parse(itemStr);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }

            return item.value;
        } catch (error) {
            console.error('Error retrieving from storage:', error);
            return null;
        }
    },

    /**
     * Clear old data from localStorage
     * @param {string} prefix - Optional prefix to filter keys
     */
    clearOldData: (prefix = '') => {
        try {
            const keysToRemove = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.indexOf('cat_') > -1 || key.indexOf('site_') > -1 || key.startsWith(prefix))) {
                    keysToRemove.push(key);
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            console.log(`Cleared ${keysToRemove.length} old storage items`);
        } catch (error) {
            console.error('Error clearing old data:', error);
        }
    }
};

/**
 * Enhanced Cookie Utilities with error handling
 */
const CookieUtils = {
    /**
     * Create cookie with options
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {Object} options - Cookie options
     * @param {number} options.days - Days until expiration
     * @param {string} options.path - Cookie path
     * @param {string} options.domain - Cookie domain
     * @param {boolean} options.secure - Secure flag
     * @param {string} options.sameSite - SameSite attribute
     */
    create: (name, value, options = {}) => {
        if (!name || typeof name !== 'string') {
            console.warn('Invalid cookie name');
            return false;
        }

        let expires = '';
        if (options.days) {
            const date = new Date();
            date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }

        const path = options.path || '/';
        const domain = options.domain ? `; domain=${options.domain}` : '';
        const secure = options.secure ? '; secure' : '';
        const sameSite = options.sameSite ? `; samesite=${options.sameSite}` : '';

        try {
            document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}${domain}${secure}${sameSite}`;
            return true;
        } catch (error) {
            console.error('Error creating cookie:', error);
            return false;
        }
    },

    /**
     * Get cookie value
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value or null
     */
    get: (name) => {
        if (!name || typeof name !== 'string') {
            return null;
        }

        try {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
            }
            
            return null;
        } catch (error) {
            console.error('Error reading cookie:', error);
            return null;
        }
    }
};

/**
 * Device detection utility
 * @returns {boolean} True if mobile or tablet
 */
const DeviceUtils = {
    mobileAndTabletcheck: () => {
        let check = false;
        (function(a){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
        })(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
};

// Legacy function aliases for backward compatibility
// These will be removed in future versions
const setWithExpiry = StorageUtils.setWithExpiry;
const getWithExpiry = StorageUtils.getWithExpiry;
const clearOldLocalData = StorageUtils.clearOldData;
const createCookie = CookieUtils.create;
const show = DOMUtils.show;
const hide = DOMUtils.hide;
const removeElement = DOMUtils.remove;
const toggleClass = DOMUtils.toggleClass;
const doScrolling = DOMUtils.smoothScroll;
const findAncestor = DOMUtils.findAncestor;

// Device detection
const isMobileOrTablet = DeviceUtils.mobileAndTabletcheck();

// Export utilities for use in other modules (when ES6 modules are implemented)
window.DOMUtils = DOMUtils;
window.ArrayUtils = ArrayUtils;
window.FunctionUtils = FunctionUtils;
window.StorageUtils = StorageUtils;
window.CookieUtils = CookieUtils;
window.DeviceUtils = DeviceUtils;
