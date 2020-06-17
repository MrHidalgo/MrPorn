

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
			speed: 750,
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
					const listBoxes = document.querySelectorAll('.list__box-wrapper');

					for(let i = 0; i < listBoxes.length; i++) {
						listBoxes[i].style.opacity = 1;
					}
				},
			},
		});
	}

	for(let idx = 0; idx < sliders.length; idx++) {
		const sliderName = sliders[idx].getAttribute('data-id'),
			sliderWrapper = slidersNode[idx].getAttribute('data-name');

		swiperCB(
			`.swiper-container[data-id="${sliderName}"]`,
			`.list__box-wrapper[data-name='${sliderWrapper}']`
		);
	}
};
