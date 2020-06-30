

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
const initSwiper = () => {
	const sliders = document.querySelectorAll('.listSwiper'),
		slidersNode = document.querySelectorAll('.list__box-wrapper');

	function swiperCB(swiperName, sliderArrow) {
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
				slideChange: function (e) {
					let swipeWrapper = categorySwiper.$wrapperEl[0];

					console.log('changing slide -'+swipeWrapper.dataset.category+' - '+categorySwiper.slides.count);
				}
			},
		});
	}

	let idx = null,
		len = sliders.length;

	for(idx = 0; idx < len; idx++) {
		const sliderName = sliders[idx].getAttribute('data-id'),
			sliderWrapper = slidersNode[idx].getAttribute('data-name');

		swiperCB(
			`.swiper-container[data-id="${sliderName}"]`,
			`.list__box-wrapper[data-name='${sliderWrapper}']`
		);
	}

	var mySwiper = document.querySelector('.swiper-container[data-category="18"]').swiper;
	mySwiper.appendSlide([
		'<div class="swiper-slide">Slide 10"</div>',
		'<div class="swiper-slide">Slide 11"</div>'
	]);
};
