/**
 * MPG Boost Plugin JavaScript - Vanilla JS Version
 */

(function() {
    'use strict';

    // Translation helper
    const _i18n = (window.mpgBoost && window.mpgBoost.i18n) || {};
    const t = (key, fallback) => _i18n[key] || fallback;

    // Cache for ranked sites to avoid repeated API calls
    let categorySitesCache = null;

    // Payment options configuration (prices will be set from PHP)
    const paymentOptionsConfig = [
        {
            id: 'boost_1_day',
            name: '10X',
            price: '$399', // Default, will be overridden by PHP
            duration: '1 Year',
            description: '1 year',
            icon: '⚡'
        },
        {
            id: 'boost_3_days',
            name: '30X',
            price: '$599', // Default, will be overridden by PHP
            duration: '1 Year',
            description: '1 year',
            icon: '⚡'
        },
        {
            id: 'boost_1_week',
            name: '50X',
            price: '$799', // Default, will be overridden by PHP
            duration: '1 Year',
            description: '1 year',
            icon: '⚡'
        },
        {
            id: 'boost_2_weeks',
            name: '100X',
            price: '$999', // Default, will be overridden by PHP
            duration: '1 Year',
            description: '1 year',
            icon: '⚡'
        },
        {
            id: 'boost_1_month',
            name: '500X',
            price: '$1999', // Default, will be overridden by PHP
            duration: '1 Year',
            description: '1 year',
            icon: '⚡'
        }
    ];
    
    // Update prices from PHP
    if (window.mpgBoost && window.mpgBoost.prices) {
        paymentOptionsConfig.forEach(function(option) {
            if (window.mpgBoost.prices[option.id]) {
                option.price = window.mpgBoost.prices[option.id];
            }
        });
    }

    // Initialize when document is ready
    document.addEventListener('DOMContentLoaded', function() {
        initBoostSite();
    });

    function initBoostSite() {
        // Handle boost button click (exclude archived and sticky-disabled buttons)
        const boostButtons = document.querySelectorAll('.boost-button:not(.archived):not(.sticky-disabled), .boostBtn, .fBoost');
        boostButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showPaymentOptionsPopup(button);
            });
        });

        // Add flash icon to boost button if it doesn't exist
        addFlashIcon();
        
        // Handle popup close events
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('popup-overlay') || e.target.classList.contains('popup-close')) {
                closePopup();
            }
        });

        // On pages with a #how_it_works section (e.g. leaderboard), "How does it work?"
        // closes the popup and scrolls to it instead of opening a new tab.
        // On other pages, flag the destination so the leaderboard smooth-scrolls on arrival.
        document.addEventListener('click', function(e) {
            const link = e.target.closest('.popup-how-it-works');
            if (!link) return;
            const target = document.getElementById('how_it_works');
            if (!target) {
                localStorage.setItem('mpgScrollToHowItWorks', String(Date.now()));
                return;
            }
            e.preventDefault();
            closePopup();
            smoothScrollTo(target, 1200);
        });

        // Consume the cross-page scroll flag set by "How does it work?" on other pages
        const scrollFlag = localStorage.getItem('mpgScrollToHowItWorks');
        if (scrollFlag) {
            localStorage.removeItem('mpgScrollToHowItWorks');
            const howItWorks = document.getElementById('how_it_works');
            if (howItWorks && Date.now() - parseInt(scrollFlag, 10) < 30000) {
                setTimeout(() => {
                    smoothScrollTo(howItWorks, 1200);
                }, 300);
            }
        }
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }

    async function showPaymentOptionsPopup(button) {
        // Get post ID from button's data attribute or fallback to getCurrentPostId
        let postId = null;
        if (button && button.dataset && button.dataset.postId) {
            postId = button.dataset.postId;
        } else {
            postId = getCurrentPostId();
        }
        
        if (!postId) {
            alert('Unable to determine post ID');
            return;
        }

        // Get category slug from button's data attribute
        const categorySlug = button && button.dataset && button.dataset.categorySlug ? button.dataset.categorySlug : '';
        
        // Get site name from button's data attribute
        const siteName = button && button.dataset && button.dataset.siteName ? button.dataset.siteName : null;
        
        // Show loading popup immediately
        const loadingPopupHtml = createLoadingPopupHTML();
        document.body.insertAdjacentHTML('beforeend', loadingPopupHtml);
        
        // Animate popup in
        let overlay = document.querySelector('.popup-overlay');
        let content = document.querySelector('.popup-content');
        
        overlay.style.display = 'block';
        setTimeout(() => {
            content.classList.add('popup-show');
        }, 10);

        // Create popup HTML (async to fetch category sites)
        const popupHtml = await createPaymentOptionsHTML(categorySlug, siteName, button.dataset.boostValue, postId);

        // Replace loading content with actual content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = popupHtml;
        const newContent = tempDiv.querySelector('.popup-content').innerHTML;
        content.innerHTML = newContent;
        content.classList.add('payment-options-popup');

        // Handle payment option selection
        const paymentOptionElements = document.querySelectorAll('.payment-option');
        paymentOptionElements.forEach(option => {
            option.addEventListener('click', function() {
                const optionId = this.dataset.optionId;
                const selectedOption = paymentOptionsConfig.find(opt => opt.id === optionId);

                if (selectedOption) {
                    showPaymentWidgetPopup(selectedOption, postId);
                }
            });
        });
    
    }

    function createLoadingPopupHTML() {
        return `
            <div class="popup-overlay">
                <div class="popup-content popup-loading">
                    <div class="popup-loading-content">
                        <div class="loading-spinner"></div>
                        <p class="loading-text">${t('loading', 'Loading boost options...')}</p>
                    </div>
                </div>
            </div>
        `;
    }

    function createRankingsLoadingContent() {
        return `
            <div class="popup-header">
                <button class="back-button" onclick="goBackToPaymentOptions()">
                    <span class="back-icon">←</span>
                </button>
                <h2>${t('categoryRankings', 'Category Rankings')}</h2>
                <button class="popup-close"></button>
            </div>
            <div class="popup-body rankings-body">
                <div class="rankings-loading-content">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">${t('loadingRankings', 'Loading rankings...')}</p>
                </div>
            </div>
        `;
    }

     function getLangPrefix() {
        const lang = document.documentElement.getAttribute('lang');
        return (lang && lang !== 'en') ? '/' + lang : '';
    }

     async function createPaymentOptionsHTML(categorySlug, siteName, boostValue, postId) {
        let optionsHtml = '';

        // Get site name from parameter or DOM
        let reviewTitle = siteName;
        if (!reviewTitle) {
            const reviewTitleElement = document.querySelector('.bread_crumb_site');
            reviewTitle = reviewTitleElement ? reviewTitleElement.textContent : 'this site';
        }

        const prices = (window.mpgBoost && window.mpgBoost.prices) || {};

        paymentOptionsConfig.forEach(option => {
            const popularBadge = option.popular ? '<span class="popular-badge">' + t('mostPopular', 'Most Popular') + '</span>' : '';

            const displayPrice = prices[option.id] || option.price;

            optionsHtml += `
                <div class="payment-option" data-option-id="${option.id}">
                    ${popularBadge}
                    <div class="boost-ratio">
                        <div class="boost-ratio-name">${option.name}</div>
                    </div>
                    <div class="option-duration">${option.duration}</div>
                    <div class="option-price">${displayPrice}</div>
                </div>
            `;
        });

        // Fetch neighboring sites for the category (previous, current, next)
        const categorySites = await fetchCategorySites(categorySlug, postId);
        const sitesHtml = renderCategorySites(categorySites);

        const highestBoostValue = (window.mpgBoost && parseInt(window.mpgBoost.highestBoostValue, 10)) || 0;

        return `
            <div class="popup-overlay">
                <div class="popup-content payment-options-popup">
                    <div class="popup-header">
                        <h2>${t('giveBoost', 'Ignite %s with Volts').replace('%s', reviewTitle)} <i></i></h2>
                       <button class="popup-close"></button>
                    </div>
                    <div class="popup-body">
                        <p class="popup-description">Bring this review to life with eye-catching Volt effects across the site.</p>
                        <a class="popup-how-it-works" href="${getLangPrefix()}/leaderboard/" target="_blank">How does it work?</a>
                        <div class="separator-title">
                            <hr/>Choose a volt pack<hr/>
                        </div>
                        <div class="payment-options-grid">
                            ${optionsHtml}
                        </div>
                    </div>
                    <div class="popup-golden-ticker">
                        <p class="popup-golden-ticker-title"><span class="popup-golden-ticker-title-left">See What</span> Volts <span class="popup-golden-ticker-title-right">Can Unlock</span></p>
                        <div class="popup-bottom-section">
                            <div class="popup-bottom-section-col">
                                <div class="popup-bottom-section-col-title">Sitewide Thumbnail Highlight</div>
                                <p>The review thumbnail is brighter and easier to spot</p>
                                <div class="volt-thumb-grid">
                                    <div class="volt-thumb volt-thumb-highlighted">
                                        <span class="volt-thumb-icon">
                                            <svg width="24" height="24" viewBox="-1.5 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 2 4.5 13.5h5L8 22l8.5-11.5h-5L13 2z"/></svg>
                                        </span>
                                    </div>
                                    <div class="volt-thumb"></div>
                                    <div class="volt-thumb"></div>
                                    <div class="volt-thumb"></div>
                                    <div class="volt-thumb"></div>
                                    <div class="volt-thumb"></div>
                                </div>
                            </div>
                            <div class="popup-bottom-section-col">
                                <div class="popup-bottom-section-col-title">Homepage Listing Highlight</div>
                                <p>The review is visually highlighted in homepage listings</p>
                        <ul class="list__box-list">
                            ${sitesHtml}
                        </ul>
                            </div>
                        </div>
                        <div class="popup-golden-ticker-remaining">
                            <div class="popup-golden-ticker-remaining-active">
                                <span>Active Volts:</span>
                                <span class="popup-golden-ticker-value">${boostValue}</span>
                            </div>
                            <div class="popup-golden-ticker-remaining-needed">
                                <span>Highest Active Volts:</span>
                                <span class="popup-golden-ticker-value">${highestBoostValue}</span>
                            </div>
                        </div>
                        <a class="popup-see-rankings" href="${getLangPrefix()}/leaderboard/" target="_blank">${t('seeLeaderboard', 'See Leaderboard')}</a>
                    </div>
                </div>
            </div>
        `;
    }


    function showPaymentWidgetPopup(option, postId) {
        // Get current popup elements
        const overlay = document.querySelector('.popup-overlay');
        const content = document.querySelector('.popup-content');

        if (!overlay || !content) {
            console.error('Popup elements not found');
            return;
        }

        // Store the current HTML for back button functionality
        const currentHTML = content.innerHTML;
        
        // Create a slides container if it doesn't exist
        if (!content.querySelector('.popup-slides-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'popup-slides-container';
            wrapper.innerHTML = `
                <div class="popup-slide popup-slide-active" data-slide="options">
                    ${currentHTML}
                </div>
            `;
            content.innerHTML = '';
            content.appendChild(wrapper);
        }
        
        const slidesContainer = content.querySelector('.popup-slides-container');
        
        // Create the payment widget slide
        const paymentSlide = document.createElement('div');
        paymentSlide.className = 'popup-slide popup-slide-next';
        paymentSlide.dataset.slide = 'payment';
        paymentSlide.innerHTML = createPaymentWidgetContent(option, postId);
        
        // Add the new slide
        slidesContainer.appendChild(paymentSlide);
        
        // Force browser reflow to ensure the new slide is rendered
        paymentSlide.offsetHeight;
        
        // Trigger slide animation immediately
        requestAnimationFrame(() => {
            const currentSlide = slidesContainer.querySelector('.popup-slide-active');
            currentSlide.classList.add('popup-slide-prev');
            currentSlide.classList.remove('popup-slide-active');
            
            paymentSlide.classList.remove('popup-slide-next');
            paymentSlide.classList.add('popup-slide-active');
            
            // Update popup classes
            content.classList.add('payment-widget-popup');
            content.classList.remove('payment-options-popup');
            
            // Initialize payment widget after slide animation
            setTimeout(() => {
                initializePaymentWidget(option, postId);

                // Remove the previous slide from DOM after animation
                if (currentSlide) {
                    currentSlide.remove();
                }
            }, 300);
        });
    }

    function createPaymentWidgetContent(option, postId) {
        let displayPrice = option.price;

        if (window.mpgBoost && window.mpgBoost.prices && window.mpgBoost.prices[option.id]) {
            displayPrice = window.mpgBoost.prices[option.id];
        }

        return `
            <div class="popup-header">
                <button class="back-button" onclick="goBackToPaymentOptions()">
                    <span class="back-icon">←</span>
                </button>
                <h2>Complete Your Payment</h2>
                <button class="popup-close"></button>
            </div>
            <div class="popup-body1">
                <div class="payment-widget-container">
                    <div id="helioCheckoutContainer" data-option-id="${option.id}" data-post-id="${postId}">
                        <!-- Helio payment widget will be loaded here -->
                        <div class="widget-loading">
                            <div class="loading-spinner"></div>
                            <p>Loading payment options...</p>
                        </div>
                    </div>
                </div>
                
                
            </div>
        `;

        //<div class="payment-security">
        //<p><i class="security-icon">🔒</i> Secure payment powered by Helio</p>
        //</div>
    }

    function createPaymentWidgetHTML(option, postId) {
        return `
            <div class="popup-overlay">
                <div class="popup-content payment-widget-popup">
                    ${createPaymentWidgetContent(option, postId)}
                </div>
            </div>
        `;
    }

    function initializePaymentWidget(option, postId) {
        // Load Helio script if not already loaded
        if (!document.querySelector('script[src*="embed.hel.io"]')) {
            const helioScript = document.createElement('script');
            helioScript.type = 'module';
            helioScript.crossOrigin = 'anonymous';
            helioScript.src = 'https://embed.hel.io/assets/index-v1.js';

           

            document.head.appendChild(helioScript);
        }
        
        // Wait for Helio to be available
        const checkHelio = setInterval(() => {
            if (window.helioCheckout) {
                clearInterval(checkHelio);
                initializeHelioWidget(option, postId);
            }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkHelio);
            if (!window.helioCheckout) {
                showPaymentError('Failed to load payment system. Please try again.');
            }
        }, 10000);
    }
    
    function initializeHelioWidget(option, postId) {
        const container = document.getElementById('helioCheckoutContainer');

        // Clear loading state
        container.innerHTML = '';

        let paylinkIds = {};
        if (window.mpgBoost && window.mpgBoost.paylinkIds) {
            paylinkIds = window.mpgBoost.paylinkIds;
        } else {
            // Fallback to hardcoded values
            paylinkIds = {
                'boost_1_day': '68dd48ad6361f58f6395300f',
                'boost_3_days': '68e7e50bd8cd1562f07d927d',
                'boost_1_week': '68e7e55228ade3ff772d09b7',
                'boost_2_weeks': '68e7e57edff473cc4bed9fe6',
                'boost_1_month': '68e7e5bddff473cc4beda0ab'
            };
        }
        
        const paylinkId = paylinkIds[option.id] || paylinkIds['boost_1_day'];
        
        try {
            // Check if domain contains 'dev' to use test network
            const isDev = window.location.hostname.includes('dev');
            console.log('MPG Boost: Domain is dev:', isDev, '-> using test network for Helio:', isDev);
            
            // Initialize Helio checkout with post_id in customer details
            const checkoutConfig = {
                paylinkId: paylinkId,
                theme: {
                    themeMode: "dark"
                },
                showPayWithCard: true,
                showQRCode: true,
                primaryColor: "#FE5300",
                neutralColor: "#5A6578",
                customerDetails: {
                    additionalJSON: JSON.stringify({postId: postId})
                },
                additionalJSON: {
                    postId: postId
                },
                onSuccess: function(data) {
                    handlePaymentSuccess(option, postId, data);
                },
                onError: function(error) {
                    console.error('Helio payment error:', error);
                    showPaymentError('Payment failed. Please try again.');
                }
            };
            
            // Add test network if domain contains 'dev'
            if (isDev) {
                checkoutConfig.network = "test";
            }
            
            window.helioCheckout(container, checkoutConfig);
        } catch (error) {
            console.error('Error initializing Helio widget:', error);
            showPaymentError('Failed to initialize payment widget.');
        }
    }
    
    function handlePaymentSuccess(option, postId, helioData) {
        // Process the successful payment
        const formData = new FormData();
        formData.append('action', 'mpg_process_payment');
        formData.append('option_id', option.id);
        formData.append('post_id', postId);
        formData.append('nonce', window.mpgBoost.nonce);
        formData.append('helio_data', JSON.stringify(helioData));
        
        fetch(window.mpgBoost.ajaxUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showPaymentSuccess(option, data.data);
            } else {
                showPaymentError(data.data.message || 'Payment processing failed');
            }
        })
        .catch(error => {
            console.error('Payment processing error:', error);
            showPaymentError('Network error. Please try again.');
        });
    }

    function processPayment(option, postId) {
        const btn = document.querySelector('.process-payment-btn');
        const widget = document.getElementById('payment-widget');
        
        // Show loading state
        btn.disabled = true;
        btn.textContent = 'Processing...';
        widget.classList.add('processing');
        
        // Simulate payment processing
        setTimeout(function() {
            // Make AJAX request to process payment
            const formData = new FormData();
            formData.append('action', 'mpg_process_payment');
            formData.append('option_id', option.id);
            formData.append('post_id', postId);
            formData.append('nonce', window.mpgBoost.nonce);
            
            fetch(window.mpgBoost.ajaxUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showPaymentSuccess(option, data.data);
                } else {
                    showPaymentError(data.data.message || 'Payment failed');
                }
            })
            .catch(error => {
                console.error('Payment error:', error);
                showPaymentError('Network error. Please try again.');
            })
            .finally(() => {
                btn.disabled = false;
                btn.textContent = `Pay ${option.price} Now`;
                widget.classList.remove('processing');
            });
        }, 2000);
    }

    function showPaymentSuccess(option, data) {
        closePopup();
        
        // Show success message
        const successHtml = `
            <div class="popup-overlay">
                <div class="popup-content payment-success-popup">
                    <div class="popup-header">
                        <h2>Payment Successful!</h2>
                    </div>
                    <div class="popup-body">
                        <div class="success-icon">✅</div>
                        <h3>Your site has been boosted!</h3>
                        <p>Package: ${option.name}</p>
                        <p>Duration: ${option.duration}</p>
                        <p>Transaction ID: ${data.transaction_id || 'N/A'}</p>
                        <button class="close-success-btn">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHtml);
        
        const overlay = document.querySelector('.popup-overlay');
        const content = document.querySelector('.popup-content');
        
        overlay.style.display = 'block';
        setTimeout(() => {
            content.classList.add('popup-show');
        }, 10);
        
        // Update boost button
        const boostButton = document.querySelector('.boost-container a');
        const boostContainer = document.querySelector('.boost-container');
        
        boostButton.innerHTML = '<span class="flash-icon">⚡</span>Boosted!';
        boostContainer.classList.add('boosted');
        
        // Auto close after 5 seconds
        setTimeout(function() {
            closePopup();
        }, 5000);
        
        // Handle close button
        const closeBtn = document.querySelector('.close-success-btn');
        closeBtn.addEventListener('click', closePopup);
    }

    function showPaymentError(message) {
        const errorHtml = `
            <div class="popup-overlay">
                <div class="popup-content payment-error-popup">
                    <div class="popup-header">
                        <h2>Payment Failed</h2>
                        <button class="popup-close"></button>
                    </div>
                    <div class="popup-body">
                        <div class="error-icon">❌</div>
                        <p>${message}</p>
                        <button class="retry-payment-btn">Try Again</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', errorHtml);
        
        const overlay = document.querySelector('.popup-overlay');
        const content = document.querySelector('.popup-content');
        
        overlay.style.display = 'block';
        setTimeout(() => {
            content.classList.add('popup-show');
        }, 10);
        
        // Handle retry button
        const retryBtn = document.querySelector('.retry-payment-btn');
        retryBtn.addEventListener('click', function() {
            closePopup();
            showPaymentOptionsPopup();
        });
    }

    function smoothScrollTo(target, duration) {
        const startY = window.pageYOffset;
        const targetY = startY + target.getBoundingClientRect().top;
        const startTime = performance.now();
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            window.scrollTo(0, startY + (targetY - startY) * easeInOutCubic(progress));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    function closePopup() {
        const overlays = document.querySelectorAll('.popup-overlay');
        overlays.forEach(overlay => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        });
        
        // Clear cache when popup closes for fresh data on next open
        categorySitesCache = null;
    }

    function showLoadingState(container) {
        container.classList.add('loading');
        const button = container.querySelector('a');
        button.textContent = 'Boosting...';
    }

    function showSuccessState(container, message) {
        container.classList.remove('loading', 'error');
        container.classList.add('success');
        
        // Show success message
        showMessage(container, message, 'success');
    }

    function showErrorState(container, message) {
        container.classList.remove('loading', 'success');
        container.classList.add('error');
        
        // Show error message
        showMessage(container, message, 'error');
        
        // Reset button text after delay
        setTimeout(function() {
            const button = container.querySelector('a');
            button.textContent = 'Boost This Website';
        }, 3000);
    }

    function showMessage(container, message, type) {
        // Remove existing messages
        const existingMessage = container.querySelector('.boost-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `boost-message ${type}`;
        messageElement.textContent = message;
        
        // Add message to container
        container.appendChild(messageElement);
        
        // Auto-remove message after 5 seconds
        setTimeout(function() {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }

    function addFlashIcon() {
        const boostButtons = document.querySelectorAll('.boost-container a');
        boostButtons.forEach(button => {
            if (!button.querySelector('.flash-icon')) {
                const flashIcon = document.createElement('span');
                flashIcon.className = 'flash-icon';
                flashIcon.textContent = '⚡';
                button.insertBefore(flashIcon, button.firstChild);
            }
        });
    }

    function getCurrentPostId() {
        // Try to get post ID from various sources
        let postId = null;
        
        // Check for post ID in body class
        const bodyClasses = document.body.className;
        if (bodyClasses) {
            const match = bodyClasses.match(/postid-(\d+)/);
            if (match) {
                postId = match[1];
            }
        }
        
        // Check for post ID in meta tag
        if (!postId) {
            const metaPostId = document.querySelector('meta[name="post-id"]');
            if (metaPostId) {
                postId = metaPostId.getAttribute('content');
            }
        }
        
        // Check for post ID in data attribute
        if (!postId) {
            const boostContainer = document.querySelector('.boost-container');
            if (boostContainer) {
                postId = boostContainer.dataset.postId;
            }
        }
        
        return postId;
    }

    // Utility function to format currency
    function formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    // Global function for back button
    window.goBackToPaymentOptions = async function() {
        // Get current popup elements
        const overlay = document.querySelector('.popup-overlay');
        const content = document.querySelector('.popup-content');
        
        if (!overlay || !content) {
            console.error('Popup elements not found');
            return;
        }
        
        const postId = getCurrentPostId();
        const slidesContainer = content.querySelector('.popup-slides-container');
        
        // If slides container doesn't exist, fallback to recreating popup
        if (!slidesContainer) {
            closePopup();
            showPaymentOptionsPopup();
            return;
        }
        
        // Get current slide
        const currentSlide = slidesContainer.querySelector('.popup-slide-active');

        // Create the payment options slide
        const optionsSlide = document.createElement('div');
        optionsSlide.className = 'popup-slide popup-slide-prev';
        optionsSlide.dataset.slide = 'options';

        // Create content with golden ticker (need to get category slug and site name from current slide)
        const categorySlug = '';
        const siteName = null;
        const boostValue = 0;
        const optionsHTML = await createPaymentOptionsHTML(categorySlug, siteName, boostValue, postId);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = optionsHTML;
        const optionsContent = tempDiv.querySelector('.popup-content').innerHTML;
        optionsSlide.innerHTML = optionsContent;
        
        // Add the options slide
        slidesContainer.insertBefore(optionsSlide, currentSlide);
        
        // Force browser reflow to ensure the new slide is rendered
        optionsSlide.offsetHeight;
        
        // Trigger slide animation (slide back) immediately
        requestAnimationFrame(() => {
            currentSlide.classList.add('popup-slide-next');
            currentSlide.classList.remove('popup-slide-active');
            
            optionsSlide.classList.remove('popup-slide-prev');
            optionsSlide.classList.add('popup-slide-active');
            
            // Update popup classes
            content.classList.remove('payment-widget-popup', 'rankings-popup');
            content.classList.add('payment-options-popup');
            
            // Re-attach event listeners for payment options after animation
            setTimeout(() => {
                // Remove the payment slide from DOM
                if (currentSlide) {
                    currentSlide.remove();
                }
                
                // Re-attach click handlers for payment options
                const paymentOptionElements = slidesContainer.querySelectorAll('.payment-option');
                paymentOptionElements.forEach(option => {
                    option.addEventListener('click', function() {
                        const optionId = this.dataset.optionId;
                        const selectedOption = paymentOptionsConfig.find(opt => opt.id === optionId);

                        if (selectedOption) {
                            showPaymentWidgetPopup(selectedOption, postId);
                        }
                    });
                });
                
            }, 300);
        });
        
        // Clear inline styles if any were set
        content.style.opacity = '';
        content.style.transform = '';
    };

    function createPaymentOptionsContent() {
        const reviewTitle = document.querySelector('.review-title-line h1').textContent;
        let optionsHtml = '';
        
        paymentOptionsConfig.forEach(option => {
            const popularBadge = option.popular ? '<span class="popular-badge">' + t('mostPopular', 'Most Popular') + '</span>' : '';
            
            optionsHtml += `
                <div class="payment-option" data-option-id="${option.id}">
                    ${popularBadge}
                   
                    <div class="boost-ratio">
                        <div class="boost-ratio-icon">${option.icon}</div>
                        <div class="boost-ratio-name">${option.name}</div>
                    </div>
                    <div class="option-duration">${option.duration}</div>
                    <div class="option-price">${option.price}</div>
                </div>
            `;
        });

        return `
            <div class="popup-header">
                <h2>${t('giveBoost', 'Activate Featured Volt for %s Review').replace('%s', reviewTitle)} ⚡</h2>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body">
                <p class="popup-description">Make this review stand out with a highlighted badge across the site.</p>
                <button class="popup-how-it-works">${t('howItWorks', 'How does it work?')}</button>
                <p class="popup-description">${t('chooseBoostPack', 'Choose a boost pack')}</p>
                <div class="payment-options-grid">
                    ${optionsHtml}
                </div>
            </div>
        `;
    }

     async function fetchCategorySites(categorySlug, postId){
        // If no category slug provided, try to get it from DOM
        if (!categorySlug) {
            const boostContainer = document.querySelector('.boost-button:not(.archived):not(.sticky-disabled)');
            categorySlug = boostContainer ? boostContainer.dataset.categorySlug : '';
        }
        
        if (!categorySlug) {
            console.error('MPG Boost: Category slug not found');
            return [];
        }
        
        // Return cached data if available
        if (categorySitesCache !== null) {
            console.log('MPG Boost: Using cached category sites');
            return categorySitesCache;
        }
        
        console.log('MPG Boost: Fetching neighboring sites for category:', categorySlug, 'around post:', postId);

        const formData = new FormData();
        formData.append('action', 'mpg_get_neighboring_sites');
        formData.append('category_slug', categorySlug);
        formData.append('post_id', postId); // Current post ID to find neighbors
        formData.append('nonce', window.mpgBoost.nonce);
        
        try {
            const response = await fetch(window.mpgBoost.ajaxUrl, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            console.log('MPG Boost: Neighboring sites results:', data);
            
            if (data.success && data.data.sites) {
                // Transform data to match expected format and cache it
                categorySitesCache = data.data.sites.map(site => ({
                    document: site
                }));
                return categorySitesCache;
            }
            
            return [];
        } catch (error) {
            console.error('MPG Boost: Neighboring sites fetch error:', error);
            return [];
        }
    }
    
    async function fetchRankedSites() {
        console.log('MPG Boost: Fetching top ranked sites');

        const formData = new FormData();
        formData.append('action', 'mpg_get_ranked_sites');
        formData.append('per_page', 20); // Get top 20 for rankings view
        formData.append('nonce', window.mpgBoost.nonce);
        
        try {
            const response = await fetch(window.mpgBoost.ajaxUrl, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            console.log('MPG Boost: Rankings results:', data);
            
            if (data.success && data.data.sites) {
                // Transform data to match expected format
                return data.data.sites.map(site => ({
                    document: site
                }));
            }
            
            return [];
        } catch (error) {
            console.error('MPG Boost: Rankings fetch error:', error);
            return [];
        }
    }
    
    function createRankingsContent(sites) {
        const sitesHtml = sites.length > 0 
            ? renderRankedSitesList(sites) 
            : '<div class="rankings-empty"><p>No ranked sites found.</p></div>';
        
        return `
            <div class="popup-header">
                <button class="back-button" onclick="goBackToPaymentOptions()">
                    <span class="back-icon">←</span>
                </button>
                <h2>${t('categoryRankings', 'Category Rankings')}</h2>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-body rankings-body">
                <p class="rankings-description">Sites ranked by boost value and performance</p>
                <div class="rankings-list">
                    ${sitesHtml}
                </div>
            </div>
        `;
    }
    
    function renderRankedSitesList(sites) {
        return sites.map((hit, index) => {
            const site = hit.document;
            const rank = index + 1;
            const boostValue = site.boost_value || 0;
            const faviconX = site.favicon_x || '0';
            const faviconY = site.favicon_y || '0';
            const isTopThree = rank <= 3;
            const rankClass = isTopThree ? 'rank-top' : '';
            const rankBadge = isTopThree ? '🏆' : '';
            
            return `
                <div class="ranking-item ${rankClass}" data-rank="${rank}">
                    <div class="ranking-position">
                        <span class="rank-number">${rank}</span>
                        ${rankBadge ? `<span class="rank-badge">${rankBadge}</span>` : ''}
                    </div>
                    <a class="ranking-site-link deIcon fx_${faviconX} fy_${faviconY}" 
                       href="${site.permalink}" 
                       target="_blank"
                       data-id="${site.post_id}">
                        <span class="ranking-site-title">${site.post_title}</span>
                    </a>
                    <div class="ranking-boost-value">
                        <span class="boost-icon">⚡</span>
                        <span class="boost-count">${boostValue}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    function renderCategorySites(sites) {
        if (!sites || sites.length === 0) {
            return '<li class="list__box__item"><p>Loading top sites...</p></li>';
        }
        
        return sites.map((hit, index) => {
            const site = hit.document;
            const categoryId = site.category_slug || '';
            const faviconX = site.favicon_x || '0';
            const faviconY = site.favicon_y || '0';
            const isFavorite = false; // You can check against user favorites if needed
            const isCurrent = site.is_current || false;

            let boostContent = '';
            if (index === 1) {
                boostContent = `<div class="ranking-boost-value">
                        <span class="boost-count">500</span>
                    </div>`;
            }
            
            const currentClass = isCurrent ? 'ticker-item-current' : '';
            
            return `
                <li class="ticker-item ${currentClass}" data-id="${site.post_id}" data-index="${index}" data-category="${categoryId}">
                    <div class="list__box__item-link site--link review-site-link list__box__item-icon deIcon fx_${faviconX} fy_${faviconY}">
                        ${site.post_title}

                        ${boostContent}

                        <i class="list__box__item-preview"></i>
                    </div>
                </li>
            `;
        }).join('');
    }

    // Tooltip functionality with 300ms delay on mouse leave
    function initTooltips() {
        const tooltipTriggers = document.querySelectorAll('.tooltip-trigger:not([data-tooltip-initialized])');
        
        tooltipTriggers.forEach(function(trigger) {
            // Mark as initialized to avoid duplicate listeners
            trigger.setAttribute('data-tooltip-initialized', 'true');
            
            const tooltipContent = trigger.querySelector('.tooltip-content');
            if (!tooltipContent) return;
            
            let hideTimeout = null;
            
            function showTooltip() {
                // Clear any existing timeout
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                // Show tooltip immediately on hover
                trigger.classList.add('tooltip-visible');
            }
            
            function hideTooltip() {
                const self = trigger;
                // Hide tooltip after 300ms
                hideTimeout = setTimeout(function() {
                    self.classList.remove('tooltip-visible');
                    hideTimeout = null;
                }, 300);
            }
            
            // Show on hover over trigger
            trigger.addEventListener('mouseenter', showTooltip);
            
            // Hide on mouse leave from trigger
            trigger.addEventListener('mouseleave', hideTooltip);
            
            // Keep tooltip visible when hovering over tooltip content
            tooltipContent.addEventListener('mouseenter', function(e) {
                showTooltip();
                e.stopPropagation();
            });
            
            // Hide when leaving tooltip content
            tooltipContent.addEventListener('mouseleave', function(e) {
                hideTooltip();
                e.stopPropagation();
            });
        });
    }
    
    // Initialize tooltips when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    // Also reinitialize on dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        initTooltips();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Expose utility functions globally if needed
    window.MpgBoost = {
        formatCurrency: formatCurrency,
        showMessage: showMessage
    };

})();
