

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
function swiperCB(swiperName, sliderArrow, scrollBar) {
	let categorySwiper = new Swiper(swiperName, {
		loop: false,
		grabCursor: false,
		observer: true,
		effect: 'slide',
		speed: 900,
		lazy: true,
		touchMoveStopPropagation:false,
		simulateTouch : false,
		allowSwipeToNext: true,
		allowSwipeToPrev: true,
		allowPageScroll: "auto",
		slidesPerView: 'auto',
		//watchSlidesVisibility:true,
		spaceBetween: 0,
		slidesPerGroup: 3,
		navigation: {
			nextEl: sliderArrow + ' .list__arrow--next',
			prevEl: sliderArrow + ' .list__arrow--prev',
		},
		on: {
			init: function () {
				const swiperSlide = document.querySelectorAll('.swiper-slide');

				document.querySelector(swiperName).closest('.list__box-wrapper').style.opacity = '1';
				document.querySelector(swiperName).closest('.list__box-wrapper').classList.add('is-visible');

				swiperSlide[swiperSlide.length - 1].classList.add('is-last');



				let visibleSlides = document.querySelectorAll('[list-parent-js]')[0].querySelectorAll('.swiper-slide-visible').length;
				let greenBarWidth = 74;
				if(window.innerWidth<1279){
					swiperSlideWidth = 100;
				}else if(window.innerWidth<=1024){
					swiperSlideWidth = 150;
				}else if(window.innerWidth<768){
					swiperSlideWidth = 195;
				}

				if(window.innerWidth<768){
					greenBarWidth = 48;

				}else if(window.innerWidth<=1024){
					greenBarWidth = 74;
				}


				maxLeft = (visibleSlides-1)*(swiperSlideWidth+6) + ((swiperSlideWidth-greenBarWidth)/2)+12;
				minLeft = (swiperSlideWidth/2) - ((swiperSlideWidth-greenBarWidth)/2);

			},
			slidePrevTransitionStart: function (e){
				delayPreview = true;
			},
			slideNextTransitionStart: function (e){
				delayPreview = true;
			},
			slidePrevTransitionEnd: function (e) {
				delayPreview = false;
				let swipeWrapper = categorySwiper.$wrapperEl[0];

				renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
			},
			slideNextTransitionEnd: function (e) {
				delayPreview = false;
				let swipeWrapper = categorySwiper.$wrapperEl[0];

				renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
			},
			setTranslate: function (e, translate){
				onSwiperTranslate(e, translate);
			}
		},
	});
}


function fixPrevSlides(category, swiper){
	let swipeWrapper = swiper.$wrapperEl[0];
	let totalSites = swipeWrapper.dataset.count;
	let currentLoadedcount = swipeWrapper.dataset.slidecount;
	let currentSlideIndex = swiper.activeIndex;
	let slidsCount = swiper.slides.length;



	if(slidsCount>12){
		console.log('Removing slides '+(currentSlideIndex));

		for(let i=0; i<(currentSlideIndex-6); i++){
			//swiper.removeSlide(i);
		}

		swiper.slides[0].innerHTML = '';
	}

	console.log('changing slide -'+swipeWrapper.dataset.category+' - '+swiper.slides.length+' - '+currentSlideIndex);
}
function fixNextSlides(category, swiper){
	let swipeWrapper = swiper.$wrapperEl[0];
	let totalSites = swipeWrapper.dataset.count;
	let currentSlideIndex = swiper.activeIndex;
	let loadedSlideCount = swipeWrapper.dataset.slidecount;

	let firstSlide = swiper.slides[0],
		lastSlide = swiper.slides[swiper.slides.length-1];

	let firstIndex = parseInt(firstSlide.dataset.index);

	loadNextSlide(category, swiper);
	loadNextSlide(category, swiper);
	loadNextSlide(category, swiper);
}

function adjustNextSlides(category, swiper){
	let swipeWrapper = swiper.$wrapperEl[0];
	let totalSites = swipeWrapper.dataset.count;

	let lastSlide = swiper.slides[swiper.slides.length-1];
	let lastIndex = parseInt(lastSlide.dataset.index);

	if(totalSites>lastIndex){
		let nextItem = renderHompageSiteSlide(category, lastIndex+1);
		if(nextItem){
			swiper.appendSlide(nextItem);
		}
	}
}

function onSwiperLeft(category, swiper){
	let currentSlideIndex = swiper.activeIndex;
	let swipeWrapper = swiper.$wrapperEl[0];
	let totalSites = swipeWrapper.dataset.count;

	var prevLastIndex =  currentSlideIndex-6;
	var prevFirstIndex = prevLastIndex-6;
	if(prevFirstIndex<0){
		prevFirstIndex = 0;
	}

	var loadedPrevSlides = 0;

	console.log("prev start "+currentSlideIndex);

	for(var i=currentSlideIndex; i>=0; i--){

		if(swiper.slides[i].innerHTML.trim()==''){
			if(loadedPrevSlides<6){
				console.log(currentSlideIndex+' - rendering slide '+i);
				let prevItem = renderHompageSiteSlide(category, i);
				if(prevItem && swiper.slides[i]){
					swiper.slides[i].innerHTML = prevItem;
					loadedPrevSlides++;
				}
			}
		}
	}

	if(currentSlideIndex>6){
		for(var i=(currentSlideIndex+8); i<totalSites; i++){
			if(swiper.slides[i] && swiper.slides[i].innerHTML!=''){
				swiper.slides[i].innerHTML = '';
			}
		}
	}

	renderLeftAndRight(category, swiper);
}

function onSwiperRight(category, swiper){
	let currentSlideIndex = swiper.activeIndex;
	let swipeWrapper = swiper.$wrapperEl[0];
	let totalSites = swipeWrapper.dataset.count;

	/*if(currentSlideIndex>6){
		for(var i=0; i<(currentSlideIndex-8); i++){
			if(swiper.slides[i]){
				swiper.slides[i].innerHTML = '';
			}
		}
	}*/

	var nextSlideIndex = 0;

	console.log("next start "+currentSlideIndex);

	for(var i=currentSlideIndex; i < totalSites; i++){
		if(nextSlideIndex<6){
			if(swiper.slides[i] && swiper.slides[i].innerHTML==''){
				let nextItem = renderHompageSiteSlide(category, i);
				if(nextItem){
					swiper.slides[i].innerHTML = nextItem;

					nextSlideIndex++;
				}

			}
		}
	}

	renderLeftAndRight(category, swiper);
}

function renderLeftAndRight(category, swiper) {
	let currentSlideIndex = swiper.activeIndex;
	let swipeWrapper = swiper.$wrapperEl[0];
	let totalSites = swipeWrapper.dataset.count;

	for (var i = 0; i < totalSites; i++) {
		if(i>(currentSlideIndex-6) && i<(currentSlideIndex+24)){
			if(swiper.slides[i] && swiper.slides[i].innerHTML.trim()==''){
				let slideItem = renderHompageSiteSlide(category, i);
				if(slideItem){
					swiper.slides[i].innerHTML = slideItem;
				}
			}
		}else{
			if(swiper.slides[i]){
				//swiper.slides[i].innerHTML = '';
			}
		}
	}

	boxHover();
}
