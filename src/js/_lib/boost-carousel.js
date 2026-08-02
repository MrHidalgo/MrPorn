/**
 * Boost Carousel - Responsive carousel for boosted sites
 */
(function() {
    'use strict';

    // Initialize homepage carousels on page load
    function initCarousels() {
        const swiperContainers = document.querySelectorAll('.homeBoostSwiper');
        swiperContainers.forEach(swiperContainer => {
            // Destroy existing swiper if it exists (for reinitialization after AJAX)
            if (swiperContainer.swiper) {
                swiperContainer.swiper.destroy(true, true);
            }
            
            const carousel = swiperContainer.closest('.boost-marquee-carousel');
            const carouselWrapper = swiperContainer.closest('.boost-carousel-wrapper');
            if (!carousel) return;
            
            const isMobile = window.innerWidth < 993;
            const slides = swiperContainer.querySelectorAll('.swiper-slide');
            if (slides.length === 0) return;
            
            // Find first item
            const firstSlide = slides[0];
            const firstItem = firstSlide ? firstSlide.querySelector('.boost-marquee-item.first') : null;
            
            if (!isMobile && firstItem && firstSlide && carouselWrapper) {
                // Desktop: First item sticky, rest in swiper (5 slides per view)
                // Extract first item from swiper
                const firstItemWrapper = document.createElement('div');
                firstItemWrapper.style.flexShrink = '0';
                // Set width to match swiper slides (1/6 of container minus gaps)
                // Container has 1 sticky + 5 swiper = 6 items total
                // Each item should be: (100% - 5 gaps) / 6
                firstItemWrapper.style.width = 'calc((100% - 50px) / 6)';
                firstItemWrapper.appendChild(firstSlide.cloneNode(true));
                firstSlide.remove();
                
                // Insert first item before swiper
                carouselWrapper.insertBefore(firstItemWrapper, swiperContainer);
                
                // Make wrapper flex
                carouselWrapper.style.display = 'flex';
                carouselWrapper.style.gap = '10px';
                
                // Set swiper container to take remaining space (5/6)
                swiperContainer.style.flex = '1';
                swiperContainer.style.width = 'calc((100% - 50px) * 5 / 6 + 40px)';
                
                // Initialize Swiper for desktop (5 slides per view, slide 5 at a time)
                const nextBtn = carousel.querySelector('.boost-carousel-next');
                const prevBtn = carousel.querySelector('.boost-carousel-prev');
                
                // Define updateButtonVisibility function before Swiper initialization
                const updateButtonVisibility = function(swiperInstance) {
                    const isBeginning = swiperInstance.isBeginning;
                    const isEnd = swiperInstance.isEnd;
                    
                    if (prevBtn) {
                        if (isBeginning) {
                            prevBtn.style.display = 'none';
                            prevBtn.style.visibility = 'hidden';
                        } else {
                            prevBtn.style.display = '';
                            prevBtn.style.visibility = 'visible';
                        }
                    }
                    
                    if (nextBtn) {
                        if (isEnd) {
                            nextBtn.style.display = 'none';
                            nextBtn.style.visibility = 'hidden';
                        } else {
                            nextBtn.style.display = '';
                            nextBtn.style.visibility = 'visible';
                        }
                    }
                };
                
                const swiper = new Swiper(swiperContainer, {
                    slidesPerView: 5,
                    slidesPerGroup: 5, // Slide 5 items at a time
                    spaceBetween: 10,
                    navigation: {
                        nextEl: nextBtn,
                        prevEl: prevBtn,
                    },
                    breakpoints: {
                        993: {
                            slidesPerView: 5,
                            slidesPerGroup: 5,
                            spaceBetween: 10,
                        }
                    },
                    on: {
                        init: function() {
                            // Remove any SVG icons Swiper might add
                            if (nextBtn) {
                                const svg = nextBtn.querySelector('svg');
                                if (svg) svg.remove();
                            }
                            
                            if (prevBtn) {
                                const svg = prevBtn.querySelector('svg');
                                if (svg) svg.remove();
                            }
                            
                            // Update button visibility after init
                            if (this.updateButtonVisibility) {
                                this.updateButtonVisibility();
                            }
                        },
                        slideChange: function() {
                            // Update button visibility on slide change
                            if (this.updateButtonVisibility) {
                                this.updateButtonVisibility();
                            }
                        },
                        resize: function() {
                            // Update button visibility on resize
                            if (this.updateButtonVisibility) {
                                this.updateButtonVisibility();
                            }
                        }
                    }
                });
                
                // Add method to update button visibility to swiper instance
                swiper.updateButtonVisibility = function() {
                    updateButtonVisibility(this);
                };
                
                // Call it once after initialization
                updateButtonVisibility(swiper);
            } else {
                // Mobile: Create wrapper slides with 6 items each in 2x3 grid
                // Ensure swiper container has proper width constraints on mobile
                swiperContainer.style.width = '100%';
                swiperContainer.style.maxWidth = '100%';
                swiperContainer.style.boxSizing = 'border-box';
                
                const slides = Array.from(swiperContainer.querySelectorAll('.swiper-slide'));
                const wrapper = swiperContainer.querySelector('.swiper-wrapper');
                
                if (slides.length > 0 && wrapper) {
                    // Group slides into sets of 6
                    const itemsPerPage = 6;
                    const cols = 2;
                    const rows = 3;
                    
                    // Clear wrapper
                    wrapper.innerHTML = '';
                    
                    // Create wrapper slides, each containing 6 items in 2x3 grid
                    for (let i = 0; i < slides.length; i += itemsPerPage) {
                        const pageSlides = slides.slice(i, i + itemsPerPage);
                        
                        // Create a wrapper slide
                        const wrapperSlide = document.createElement('div');
                        wrapperSlide.className = 'swiper-slide mobile-grid-slide';
                        wrapperSlide.style.display = 'grid';
                        wrapperSlide.style.gridTemplateColumns = '1fr 1fr';
                        wrapperSlide.style.gridTemplateRows = 'repeat(3, auto)';
                        wrapperSlide.style.gap = '5px';
                        wrapperSlide.style.width = '100%';
                        wrapperSlide.style.maxWidth = '100%';
                        wrapperSlide.style.flexShrink = '0';
                        wrapperSlide.style.boxSizing = 'border-box';
                        wrapperSlide.style.minWidth = '0';
                        
                        // Add items to wrapper slide in row-by-row order
                        // Row 1: items 0,1
                        // Row 2: items 2,3
                        // Row 3: items 4,5
                        pageSlides.forEach((slide, index) => {
                            const item = slide.querySelector('.boost-marquee-item');
                            if (item) {
                                wrapperSlide.appendChild(item);
                            }
                        });
                        
                        wrapper.appendChild(wrapperSlide);
                    }
                }
                
                // Initialize Swiper for mobile (1 slide per view, each slide contains 6 items)
                const nextBtn = carousel.querySelector('.boost-carousel-next');
                const prevBtn = carousel.querySelector('.boost-carousel-prev');
                
                // Define updateButtonVisibility function before Swiper initialization
                const updateButtonVisibility = function(swiperInstance) {
                    const isBeginning = swiperInstance.isBeginning;
                    const isEnd = swiperInstance.isEnd;
                    
                    if (prevBtn) {
                        if (isBeginning) {
                            prevBtn.style.display = 'none';
                            prevBtn.style.visibility = 'hidden';
                        } else {
                            prevBtn.style.display = '';
                            prevBtn.style.visibility = 'visible';
                        }
                    }
                    
                    if (nextBtn) {
                        if (isEnd) {
                            nextBtn.style.display = 'none';
                            nextBtn.style.visibility = 'hidden';
                        } else {
                            nextBtn.style.display = '';
                            nextBtn.style.visibility = 'visible';
                        }
                    }
                };
                
                const swiper = new Swiper(swiperContainer, {
                    slidesPerView: 1, // 1 wrapper slide per view (contains 6 items)
                    slidesPerGroup: 1, // Slide 1 wrapper slide at a time
                    spaceBetween: 0,
                    direction: 'horizontal',
                    autoHeight: false,
                    watchOverflow: true,
                    navigation: {
                        nextEl: nextBtn,
                        prevEl: prevBtn,
                    },
                    breakpoints: {
                        993: {
                            enabled: false, // Disable on desktop
                        }
                    },
                    on: {
                        init: function() {
                            // Remove any SVG icons Swiper might add
                            if (nextBtn) {
                                const svg = nextBtn.querySelector('svg');
                                if (svg) svg.remove();
                            }
                            
                            if (prevBtn) {
                                const svg = prevBtn.querySelector('svg');
                                if (svg) svg.remove();
                            }
                            
                            // Update button visibility after init
                            if (this.updateButtonVisibility) {
                                this.updateButtonVisibility();
                            }
                        },
                        slideChange: function() {
                            // Update button visibility on slide change
                            if (this.updateButtonVisibility) {
                                this.updateButtonVisibility();
                            }
                        },
                        resize: function() {
                            // Update button visibility on resize
                            if (this.updateButtonVisibility) {
                                this.updateButtonVisibility();
                            }
                        }
                    }
                });
                
                // Add method to update button visibility to swiper instance
                swiper.updateButtonVisibility = function() {
                    updateButtonVisibility(this);
                };
                
                // Call it once after initialization
                updateButtonVisibility(swiper);
            }
        });
    }

    function initReviewCarousels() {
        // const reviewCarousels = document.querySelectorAll('.review-boost-carousel');
        // reviewCarousels.forEach(root => new ReviewBoostCarousel(root));

        var swiper = new Swiper(".reviewBoostSwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                998: {
                    enabled: false, // Disable Swiper on screens >= 768px
                }
            },
            on: {
                init: function() {
                    // Remove any SVG icons Swiper might add
                    const nextBtn = document.querySelector('.swiper-button-next');
                    const prevBtn = document.querySelector('.swiper-button-prev');
                    
                    if (nextBtn) {
                    const svg = nextBtn.querySelector('svg');
                    if (svg) svg.remove();
                    }
                    
                    if (prevBtn) {
                    const svg = prevBtn.querySelector('svg');
                    if (svg) svg.remove();
                    }
                }
            }
          });
    }

    function initAllCarousels() {
        initCarousels();
        initReviewCarousels();
    }

    // Handle window resize to reinitialize carousels
    let resizeTimer;
    let lastWindowWidth = window.innerWidth;
    let lastIsMobile = window.innerWidth < 993;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentWidth = window.innerWidth;
            const currentIsMobile = currentWidth < 993;
            
            // Only reinitialize if crossing the mobile/desktop breakpoint (993px)
            // Ignore small resize events (like iPhone address bar show/hide)
            const widthChange = Math.abs(currentWidth - lastWindowWidth);
            const breakpointCrossed = (lastIsMobile !== currentIsMobile) || widthChange > 50;
            
            if (breakpointCrossed) {
                // Destroy existing swipers and reinitialize
                document.querySelectorAll('.homeBoostSwiper').forEach(swiperEl => {
                    if (swiperEl.swiper) {
                        swiperEl.swiper.destroy(true, true);
                    }
                });
                
                // Restore original structure if needed (for desktop sticky first item)
                document.querySelectorAll('.boost-carousel-wrapper').forEach(wrapper => {
                    const firstItemWrapper = wrapper.querySelector('div:not(.swiper)');
                    if (firstItemWrapper && firstItemWrapper.querySelector('.boost-marquee-item.first')) {
                        // Move first item back into swiper
                        const swiper = wrapper.querySelector('.homeBoostSwiper');
                        const swiperWrapper = swiper ? swiper.querySelector('.swiper-wrapper') : null;
                        if (swiperWrapper) {
                            const firstSlide = firstItemWrapper.querySelector('.swiper-slide');
                            if (firstSlide) {
                                swiperWrapper.insertBefore(firstSlide, swiperWrapper.firstChild);
                            }
                        }
                        firstItemWrapper.remove();
                    }
                });
                
                // Reinitialize
                initCarousels();
                
                // Update tracking variables
                lastWindowWidth = currentWidth;
                lastIsMobile = currentIsMobile;
            } else {
                // Just update button visibility for existing swipers without destroying
                document.querySelectorAll('.homeBoostSwiper').forEach(swiperEl => {
                    if (swiperEl.swiper && swiperEl.swiper.updateButtonVisibility) {
                        swiperEl.swiper.updateButtonVisibility();
                    }
                });
            }
        }, 250);
    });

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllCarousels);
    } else {
        initAllCarousels();
    }
    
    // Make initAllCarousels globally accessible
    window.initAllCarousels = initAllCarousels;
})();

