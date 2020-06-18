

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
const initSwiper = () => {
	const sliders = document.querySelectorAll('.listSwiper'),
		slidersNode = document.querySelectorAll('.list__box-wrapper');

	function swiperCB(swiperName, sliderArrow) {
		new Swiper(swiperName, {
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
					for(let i = 0, len = document.querySelectorAll('.list__box-wrapper').length; i < len; i++) {
						document.querySelectorAll('.list__box-wrapper')[i].style.opacity = 1;
					}
				},
			},
		});
	}

	for(let idx = 0, len = sliders.length; idx < len; idx++) {
		swiperCB(
			`.swiper-container[data-id="${sliders[idx].getAttribute('data-id')}"]`,
			`.list__box-wrapper[data-name='${slidersNode[idx].getAttribute('data-name')}']`
		);
	}
};
