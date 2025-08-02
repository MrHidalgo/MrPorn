/**
 * Storage Utilities - Enhanced localStorage with TTL and error handling
 * Provides safe storage operations with expiration support
 */

export const StorageUtils = {
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
    },

    /**
     * Check if localStorage is available
     * @returns {boolean} Availability status
     */
    isAvailable: () => {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    },

    /**
     * Get storage usage information
     * @returns {Object} Storage usage stats
     */
    getUsageInfo: () => {
        try {
            let totalSize = 0;
            const items = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const size = new Blob([key, value]).size;
                
                totalSize += size;
                items.push({ key, size });
            }
            
            return {
                totalSize,
                itemCount: localStorage.length,
                items: items.sort((a, b) => b.size - a.size)
            };
        } catch (error) {
            console.error('Error getting storage usage:', error);
            return { totalSize: 0, itemCount: 0, items: [] };
        }
    }
};

/**
 * Cookie Utilities - Enhanced cookie management
 */
export const CookieUtils = {
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
    },

    /**
     * Delete cookie
     * @param {string} name - Cookie name
     * @param {Object} options - Cookie options
     * @returns {boolean} Success status
     */
    delete: (name, options = {}) => {
        return CookieUtils.create(name, '', { ...options, days: -1 });
    }
}; 