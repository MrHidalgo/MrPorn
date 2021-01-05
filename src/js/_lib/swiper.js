

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
function swiperCB(swiperName, sliderArrow, scrollBar) {
	let categorySwiper = new Swiper(swiperName, {
		loop: false,
		grabCursor: false,
		effect: 'slide',
		speed: 900,
		touchMoveStopPropagation:false,
		simulateTouch : false,
		allowSwipeToNext: true,
		allowSwipeToPrev: true,
		allowPageScroll: "auto",
		slidesPerView: 'auto',
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
			},
			/*slideChange: function (e, t) {
				let swipeWrapper = categorySwiper.$wrapperEl[0];
				let currentSlideIndex = categorySwiper.activeIndex;

				console.log('transisioning');
				console.log(e);
				console.log(t);
				fixPrevSlides(swipeWrapper.dataset.category, categorySwiper);
				fixNextSlides(swipeWrapper.dataset.category, categorySwiper);

				//console.log('changing slide -'+swipeWrapper.dataset.category+' - '+categorySwiper.slides.length+' - '+currentSlideIndex);
			},*/
			slidePrevTransitionEnd: function (e) {
				let swipeWrapper = categorySwiper.$wrapperEl[0];

				renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
			},
			slideNextTransitionEnd: function (e) {
				let swipeWrapper = categorySwiper.$wrapperEl[0];

				renderLeftAndRight(swipeWrapper.dataset.category, categorySwiper);
			},
			setTranslate: function (e, translate){
				onSwiperTranslate(e, translate);
			}
		},
	});
}

const initSwiper = () => {
	const sliders = document.querySelectorAll('.listSwiper'),
		slidersNode = document.querySelectorAll('.list__box-wrapper');



	let idx = null,
		len = sliders.length;

	for(idx = 0; idx < len; idx++) {
		const sliderName = sliders[idx].getAttribute('data-id'),
			sliderWrapper = slidersNode[idx].getAttribute('data-name');

		swiperCB(
			`.swiper-container[data-id="${sliderName}"]`,
			`.list__box-wrapper[data-name='${sliderWrapper}']`,
			`.swiper-scrollbar[data-id="${sliderName}"]`,
		);
	}
};

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
		if(i>(currentSlideIndex-6) && i<(currentSlideIndex+8)){
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
