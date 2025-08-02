/**
 * DOM Utilities - Safe replacement for prototype pollution
 * Provides utility functions for common DOM operations
 */

export const DOMUtils = {
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
     * Safe querySelectorAll with error handling
     * @param {string} selector - CSS selector
     * @param {Element} context - Context element (default: document)
     * @returns {NodeList|[]} Found elements or empty array
     */
    querySelectorAll: (selector, context = document) => {
        try {
            return context.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return [];
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
    }
};

/**
 * Array Utilities - Safe replacement for prototype pollution
 */
export const ArrayUtils = {
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
export const FunctionUtils = {
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