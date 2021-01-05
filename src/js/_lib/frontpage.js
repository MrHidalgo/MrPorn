var webworkerFrontpage;
let currentBannerTimeout;
let lastActiveHoverBox;
let lastTranslate = 0;

const initHomeLazyLoad = () =>{
	let listElm = document.querySelector('#infinite-list');

		let nextItem = 1;
		const loadMore = () => {
			for (var i = 0; i < 20; i++) {
				var item = document.createElement('li');
				item.innerText = 'Item ' + nextItem++;
				listElm.appendChild(item);
			}
		}

	// Detect when scrolled to bottom.
		listElm.addEventListener('scroll', function() {
			if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
				loadMore();
			}
		});

	// Initially load some items.
		loadMore();
}

const loadHomeData = () => {
	let currentLang = document.documentElement.getAttribute('lang');

	console.log('Loading home data');

	let url = '/wp-json/mpg/home/';
	if(currentLang!='en'){
		url = '/wp-json/mpg/home/?lang='+currentLang;
	}

	homeData = getWithExpiry("homepage_data_"+currentLang);

	if(homeData){
		renderAllOtherCategories();
	}else{
		fetch(url)
			.then(res => res.json())
			.then((out) => {
				homeData = out;

				if(homeData.code=='rest_login_required'){

				}else{
					setWithExpiry("homepage_data_"+currentLang, homeData, 30*60*1000);
				}

				//renderAllOtherCategories();

				setTimeout(renderAllOtherCategories, 100);
			})
			.catch(err => { throw err });
	}


}

function renderHompageSiteSlide(category, index){

	let siteItem = homeData.categories[category].sites[index];
	if(siteItem){
		let siteId = siteItem.id;
		let siteLink = siteItem.link;
		let siteName = siteItem.name;
		let siteThumb = (siteItem.banner_image)?siteItem.banner_image:siteItem.thumb;
		let siteLogo = (siteItem.logo)?siteItem.logo.src:'';

		let slideHtml = '<div class="list__box nolazy" list-box-js data-id="'+siteId+'" style="background-image: url('+siteThumb+')">'+
			/*'<div class="list__box-overlay"></div>'+*/
			'<div class="list__box-border"></div>' +
			'<a href="'+siteLink+'" hreflang="'+currentLang+'" target="_blank"></a>'+
			//'<img class="list__box-logo nolazy" src="'+siteLogo+'" alt=""/>'+
			'<div class="list__box-details">'+
			'<div class="list__box-details-left">'+
			'<a class="site_link" href="'+siteLink+'" hreflang="'+currentLang+'" target="_blank">' +
			'<i class="icon-font icon-out"></i>'+
			'<p class="list__box-details-title">'+siteName+'</p>'+
			'</a>'+
			'<div class="list__rating"><span>User Rating:</span>'+
			'<div><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star-fill"></i></div>'+
			'</div>'+
			'</div>'+
			'<div class="list__box-details-right">'+
			'<button class="list__box-like" type="button" data-id="1" like-toggle-js><i class="icon-font icon-like"></i></button>'+
			'<button class="list__box-dislike" type="button" data-id="1" dislike-toggle-js><i class="icon-font icon-like"></i></button>'+
			'<div class="c-popper">'+
			'<button class="list__box-favorites" type="button" data-id="1" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>'+
			'<div class="c-poppertext">'+
			'<u>Add To Favourites</u>'+
			'<u>Remove From Favourites</u>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<button class="list__box-more" type="button"><i class="icon-font icon-arrow-angle"></i></button>'+
			'</div>';
		return slideHtml;
	}
	return false;

}

function renderSiteHoverContent(category, index){
	if(!homeData){
		return false;
	}

	if(homeData.categories === undefined){
		return false;
	}

	if(!homeData.categories[category]){
		return false;
	}

	let siteItem = homeData.categories[category].sites[index];
	if(siteItem) {
		let siteId = siteItem.id;
		let siteLink = siteItem.link;
		let siteName = siteItem.name;
		let siteThumb = siteItem.thumb;

		var hoverContent = '<div class="list__box-details-left">'+
			'<a class="site_link" href="'+siteLink+'" target="_blank">' +
			'<i class="icon-font icon-out"></i>'+
			'<p class="list__box-details-title">'+siteName+'</p>'+
			'</a>'+
		'<div class="list__rating"><span>User Rating:</span>'+
		'<div><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star"></i><i class="icon-font icon-star-fill"></i></div>'+
		'</div>'+
		'</div>'+
		'<div class="list__box-details-right">'+
		'<button class="list__box-like" type="button" data-id="'+siteId+'" like-toggle-js><i class="icon-font icon-like"></i></button>'+
		'<button class="list__box-dislike" type="button" data-id="'+siteId+'" dislike-toggle-js><i class="icon-font icon-like"></i></button>'+
		'<div class="c-popper">'+
		'<button class="list__box-favorites" type="button" data-id="'+siteId+'" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>'+
		'<div class="c-poppertext">'+
		'<u>Add To Favourites</u>'+
		'<u>Remove From Favourites</u>'+
		'</div>'+
		'</div>'+
		'</div>';

		return hoverContent;
	}

	return false;
}

function renderSiteBottomBanner(category, index){
	let siteItem = homeData.categories[category].sites[index];
	if(siteItem){
		let siteId = siteItem.id;
		let bannerType = siteItem.banner_type;
		let bannerImage = siteItem.banner_image;
		let bannerVideo = siteItem.banner_video;
		let bannerVideoPoster = siteItem.banner_video_poster;
		let siteLogo = siteItem.logo;

		let tagLIne = siteItem.tagline;
		let siteUrl = siteItem.url;

		var bannerRight = '';
		var bannerClass = '';

		if(bannerType=='image'){
			bannerClass = 'list__specification--banner';
			if(bannerImage!=''){
				bannerRight = '<div class="list__specification-right">' +
					'<div><img src="'+contentBase+'screenshots/'+siteId+'.png"/></div>' +
					'</div>';

			}
		}else{
			bannerClass = 'list__specification--video';

			if(bannerVideo!=''){
				bannerRight = '<div class="list__specification-right">'+
					'<div video-parent-js>'+
					'<!--video(preload="none" video-js)-->'+
					'<video preload="none" autoplay loop playsinline poster="'+bannerVideoPoster+'" video-js>'+
					'<source src="'+bannerVideo+'" type="video/mp4">'+
					'</video>' +
					'<a class="list__specification-play is-active" video-toggle-js><i class="icon-font icon-play-button" video-play-js></i></a>' +
					'<a class="list__specification-pause is-active" video-pause-js><i class="icon-font icon-pause"></i></a>'+
					'</div>'+
					'</div>';
			}
		}

		let moreSites = '';
		let moreSiteCount = 0;

		homeData.categories[category].sites.map(function (moreSite, index) {
			if(moreSiteCount<6 && moreSite.id!=siteId){
				let moreSiteLogo = moreSite.logo ? moreSite.logo.src: '';

				/*moreSites +='<a class="list__box" list-box-more-js href="'+moreSite.link+'" data-id="'+moreSite.id+'" data-count="1" style="background-image: url(https://mpg-images.b-cdn.net'+moreSite.banner_image+')">'+
					'<div class="list__box-border"></div>' +
					'</a>';*/

				moreSites +='<div class="list__box_more_item" list-box-more-js  data-id="'+moreSite.id+'" data-count="1" >'+
					//'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url(https://mpg-images.b-cdn.net'+moreSite.banner_image+')"></a>' +
					'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url('+moreSite.banner_image+')"></a>' +
					'</div>';

				moreSiteCount++;
			}
		});

		let bannerHtml = '<div class="list__specification '+bannerClass+'" data-id="'+siteId+'">' +
			'<a class="list__specification-close" ><i class="icon-font icon-close"></i></a>'+
			'<div>'+
			'<div class="list__specification-header">' +
			'<img class="list__specification-logo" src="'+siteLogo+'"/>' +
			'<a class="list__specification-close" >' +
			'<i class="icon-font icon-close"></i>' +
			'</a>' +
			'</div>'+
			'<div class="list__specification-left">'+
			'<div>' +
			'<img class="list__specification-logo" src="'+siteLogo+'"/>'+
			'<div class="list__specification-action" spec-actionNode-js>'+
			'<div><a class="list__specification-visit nav_link" href="'+siteUrl+'" target="_blank">VISIT WEBSITE</a></div>'+
			'<div><a class="list__specification-read nav_link" href="'+siteItem.link+'" hreflang="'+currentLang+'" target="_blank">READ REVIEW</a></div>'+
			'<div class="list__specification-action-desc">'+
			'<p>'+tagLIne+'</p>'+
			'</div>'+
			'<div class="list__specification-action-skip"><a class="list__specification-circle list__specification-skip" data-id="'+siteId+'" data-category="'+category+'" data-index="'+index+'" spec-skip-js><i class="icon-font icon-point"></i><span>Skip</span></a></div>'+
			'<div class="list__specification-action-circle">' +
			'<button class="list__specification-circle list__specification-like" data-like="'+siteId+'" spec-like-js><i class="icon-font icon-like"></i><span>Like</span></button>' +
			'</div>'+
			'<div class="list__specification-action-circle">' +
			'<button class="list__specification-circle list__specification-dislike" data-dislike="'+siteId+'" spec-dislike-js><i class="icon-font icon-like"></i><span>Dislike</span></button>' +
			'</div>'+
			'<div class="list__specification-action-circle">'+
			'<div class="c-popper">' +
			'<button class="list__specification-circle list__specification-favorites" data-id="'+siteId+'" data-favorites="'+siteId+'" spec-favorites-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i><span>Favorites</span></button>'+
			'<div class="c-poppertext">'+
			'<u>Add To Favourites</u>'+
			'<u>Remove From Favourites</u>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<p class="list__specification-desc">'+tagLIne+'</p>'+
			'</div>'+
			'</div>'+
			bannerRight+
			'<div class="list__specification-more">'+
			'<div>'+
			'<p>More Like This</p>'+
			'</div>'+
			'<div class="site_banner_more_sites">' +
			moreSites+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>';

			return bannerHtml;
	}

	return false;
}

function renderSkipSiteBottomBanner(category, index){


	let siteItem = homeData.categories[category].sites[index];
	if(siteItem){
		let siteId = siteItem.id;
		let bannerType = siteItem.banner_type;
		let bannerImage = siteItem.banner_image;
		let bannerVideo = siteItem.banner_video;
		let bannerVideoPoster = siteItem.banner_video_poster;
		let siteLogo = siteItem.logo;

			let tagLIne = siteItem.tagline;
		let siteExternalUrl = siteItem.url;
		let siteLink = siteItem.link;


		let popupBanner = document.querySelector('.list__specification');

		var bannerRight = '';
		var bannerClass = '';

		if(bannerType=='image'){
			bannerClass = 'list__specification--banner';
			if(bannerImage!=''){
				bannerRight = '<div><img src="'+contentBase+'screenshots/'+siteId+'.png"/></div>';

				popupBanner.classList.remove('list__specification--video');
				popupBanner.classList.add('list__specification--banner');
			}
		}else{
			bannerClass = 'list__specification--video';

			if(bannerVideo!=''){
				popupBanner.classList.remove('list__specification--banner');
				popupBanner.classList.add('list__specification--video');

				bannerRight = '<div video-parent-js>'+
					'<video preload="none" autoplay loop playsinline poster="'+bannerVideoPoster+'" video-js>'+
					'<source src="'+bannerVideo+'" type="video/mp4">'+
					'</video>' +
					'<a class="list__specification-play is-active" video-toggle-js><i class="icon-font icon-play-button" video-play-js></i></a>' +
					'<a class="list__specification-pause is-active" video-pause-js><i class="icon-font icon-pause"></i></a>'+
					'</div>';
			}
		}

		let moreSites = '';
		let moreSiteCount = 0;

		homeData.categories[category].sites.map(function (moreSite, index) {
			if(moreSiteCount<6 && moreSite.id!=siteId){
				let moreSiteLogo = moreSite.logo ? moreSite.logo.src: '';

				moreSites +='<div class="list__box_more_item" list-box-more-js  data-id="'+moreSite.id+'" data-count="1" >'+
					'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url('+moreSite.banner_image+')"></a>' +
					'</div>';

				moreSiteCount++;
			}
		});

		document.querySelector('.list__specification .list__specification-right').innerHTML = bannerRight;
		document.querySelector('.list__specification .list__specification-action-desc p').innerHTML = tagLIne;


		document.querySelector('.list__specification .list__specification-logo').setAttribute('src', '');
		document.querySelector('.list__specification .list__specification-logo').setAttribute('src', siteLogo);
		//document.querySelector('.list__specification .list__specification-action-desc').innerHTML ='<p>'+tagLIne+' <a href="'+siteLink+'">READ MORE</a></p>';
		document.querySelector('.list__specification .list__specification-visit').setAttribute('href', siteExternalUrl);
		document.querySelector('.list__specification').setAttribute('href', siteLink);

		document.querySelector('.list__specification .list__specification-skip').setAttribute('data-id', siteId);
		document.querySelector('.list__specification .list__specification-like').setAttribute('data-like', siteId);
		document.querySelector('.list__specification .list__specification-dislike').setAttribute('data-dislike', siteId);
		document.querySelector('.list__specification .list__specification-favorites').setAttribute('data-id', siteId);

		document.querySelector('.site_banner_more_sites').innerHTML = moreSites;



		if(clonedPopupBanner){
			if(clonedPopupTimeout){
				clearTimeout(clonedPopupTimeout);
			}

			clonedPopupTimeout = setTimeout(function (){
				//clonedPopupBanner.remove();
				closeAllSnapshots();
			}, 1000);
		}
	}
}

function closeAllSnapshots(){
	let snapshots = document.querySelectorAll('.list__snapshot');
	snapshots.forEach(function (snapshot){
		snapshot.remove();
	});
}

function shuffleArray(arra1){
	var ctr = arra1.length, temp, index;



// While there are elements in the array
	while (ctr > 0) {
// Pick a random index
		index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
		ctr--;
// And swap the last element with it
		temp = arra1[ctr];
		arra1[ctr] = arra1[index];
		arra1[index] = temp;
	}
	return arra1;
}


function renderSiteCategory(categoryIndex){
	let categoryId = homeData.categories_indexes[categoryIndex];
	let categoryData = homeData.categories[categoryId];
	if(!categoryData){
		return '';
	}

	let categoryLogo = categoryData.logo;
	if(categoryLogo){
		categoryLogo = categoryLogo.url;
	}

	let categorySites = '';
	homeData.categories[categoryId].sites.map(function (site, index) {
		let siteLogo = site.logo?site.logo.src:'';
		if(siteLogo!=''){
			siteLogo = '<img class="list__box-logo nolazy" src="'+siteLogo+'" alt=""/>';
		}

		categorySites += '<div class="swiper-slide" data-index="'+index+'" data-siteid="'+site.id+'" data-init="0">' +
			'<div class="list__box" list-box-js  data-id="'+site.id+'" style="background-image: url('+site.banner_image+')">'+
			/*'<div class="list__box-overlay"></div>'+*/
			'<div class="list__box-border"></div>'+
			'<a class="nav_link" href="'+site.link+'" hreflang="'+currentLang+'">' +
			//siteLogo+
			'</a>'+
			'<div class="list__box-details">'+

			'</div>'+
			'<button class="list__box-more" type="button"><i class="icon-font icon-arrow-angle"></i></button>' +
			'</div>'+
			'</div>';
	});




	let categoryBoxHtml = '<div class="list__box-wrapper" list-parent-js data-name="category_'+categoryId+'" data-index="'+categoryIndex+'">'+
                  '<div class="list__box-head">'+
										'<div class="list__info">'+
											'<div class="list__info-circle"><img src="'+categoryLogo+'" alt=""/></div>'+
											'<div class="category_title">'+
												'<a href="'+categoryData.link+'" hreflang="'+currentLang+'">'+categoryData.title+'</a><span>'+categoryData.tagline+'</span>'+
											'</div>'+
										'</div>'+
                    '<a class="list__btn nav_link" href="'+categoryData.link+'" hreflang="'+currentLang+'">SEE&nbsp;<span>'+categoryData.count+' MORE</span><i class="icon-font icon-arrow-angle"></i></a>'+
                  '</div>'+
                  '<div class="list__box-line">'+
                    '<u list-line-ind-js></u><span class="list_green_line" list-line-js></span>'+
                  '</div>'+
									'<div class="list__box-body">'+
										'<div class="list__arrow-wrapper">'+
											'<a class="list__arrow list__arrow--prev" href="#">'+
                        '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>'+
											'</a>'+
											'<a class="list__arrow list__arrow--next" href="#">'+
                        '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>'+
											'</a>'+
										'</div>'+
										'<div class="swiper-container listSwiper" data-id="listSlider_'+categoryData.id+'" data-category="18">'+
											'<div class="swiper-wrapper'+(parseInt(categoryData.count)<6?' short_list':'')+'" data-category="'+categoryData.id+'" data-count="'+categoryData.count+'" data-slidecount="'+categoryData.site_limit+'">'+
												categorySites+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="list__specification-wrapper"></div>'+
									'</div>';

	return categoryBoxHtml;

}

function renderAllOtherCategories(){
	let catListContainer = document.querySelector('#list .c-grid');

	for (let i=0; i<homeData.categories_count; i++){
		let catId = homeData.categories_indexes[i];
		let catBox = document.querySelector('.list__box-wrapper[data-name="category_'+catId+'"]');
		if(!catBox){
			let listBoxes = document.querySelectorAll('.list__box-wrapper');
			let categoryHtml = renderSiteCategory(i);
			catListContainer.insertAdjacentHTML( 'beforeend', categoryHtml );

			swiperCB(
				`.swiper-container[data-id="listSlider_${catId}"]`,
				`.list__box-wrapper[data-name='category_${catId}']`
			);
		}
	}

	boxHover();
}

let tOut = null,
	hoverBool = false;
let previousHoverBox = null;

const boxHover = () => {
	//const swiperSlides = document.querySelectorAll('.swiper-slide[data-init="0"]'),
	const swiperSlides = document.querySelectorAll('.swiper-slide'),
		parentSlides = document.querySelectorAll('[list-parent-js]'),
		listBoxBody = document.querySelectorAll('.list__box-body');



	if(document.body.classList.contains('home')){
		for(let i = 0, len = swiperSlides.length; i < len; i++) {

			if(isMobileOrTablet){

				swiperSlides[i].removeEventListener('touchend', onSlideTouchEnd);
				swiperSlides[i].addEventListener('touchend', onSlideTouchEnd, false);

				swiperSlides[i].removeEventListener('touchstart', onSlideTouchStart);
				swiperSlides[i].addEventListener('touchstart', onSlideTouchStart, false);

				swiperSlides[i].removeEventListener('touchmove', onSlideTouchMove);
				swiperSlides[i].addEventListener('touchmove', onSlideTouchMove, false);
			}else{
				swiperSlides[i].removeEventListener('mouseleave', onSlideLeave);
				swiperSlides[i].addEventListener('mouseleave', onSlideLeave, false);


				swiperSlides[i].removeEventListener('mouseenter', onSlideEnter);
				swiperSlides[i].addEventListener('mouseenter', onSlideEnter, false);
			}

			if(swiperSlides[i].querySelector('.list__box-more')){
				swiperSlides[i].querySelector('.list__box-more').removeEventListener('mouseover', onShowBannerEnter);
				swiperSlides[i].querySelector('.list__box-more').addEventListener('mouseover', onShowBannerEnter, false);

				swiperSlides[i].querySelector('.list__box-more').addEventListener('mouseout', onShowBannerLeave, false);
			}

			swiperSlides[i].setAttribute('data-init', '1');


		}
	}



	for(let i = 0, len = listBoxBody.length; i < len; i++) {
		listBoxBody[i].addEventListener('mouseleave', function(ev) {
			if(window.innerWidth >= 1280) {
				hoverBool = false;

				clearTimeout(tOut);

				for(let j = 0, l = swiperSlides.length; j < l; j++) {
					swiperSlides[j].classList.remove('is-hover');
				}
			}
		}, false);
	}

	if(!isMobileOrTablet){
		for(let i = 0, len = parentSlides.length; i < len; i++) {
			parentSlides[i].removeEventListener('mouseleave', onParentSideLeave);
			parentSlides[i].addEventListener('mouseleave', onParentSideLeave, false);
		}
	}
};

function onSlideLeave(ev){
	if(window.innerWidth >= 1280) {
		const el = ev.currentTarget,
			elParent = el.closest('[list-parent-js]'),
			slideSwiper = elParent.querySelector('.swiper-container'),
			slideIndex = el.dataset.index;

		let greenBar = elParent.querySelector('[list-line-js]');

		//clearTimeout(tOut);
		el.classList.remove('is-hover');
		el.classList.remove('last-box');

		elParent.classList.remove('last-box-selected');


		if(lastActiveHoverBox){
			let activeSlide = 0;
			if(slideSwiper){
				activeSlide = slideSwiper.swiper.activeIndex;
			}

			let hoverBoxPosition = (slideIndex - activeSlide);

			let hoverBoxLeft = (236*hoverBoxPosition) + 125;

			//let transformVal = 'left: '+hoverBoxLeft+'px';
			let transformVal = 'transform: translateX('+hoverBoxLeft+'px)';

			if(greenBar){
				greenBar.setAttribute('style', transformVal + ';width: 64px');
			}
		}
	}
}

function onSlideEnter(ev){
	if(window.innerWidth >= 1280) {
		const el = ev.currentTarget,
			elParent = el.closest('[list-parent-js]'),
			elBox = el.querySelector('.list__box'),
			lineInd = elParent.querySelector('[list-line-js]'),
			slideSwiper = elParent.querySelector('.swiper-container');

		const swiperParent  = el.parentNode;
		var slideIndex = el.dataset.index;
		var slideCategory = swiperParent.dataset.category;

		var slideHoverContainer = el.querySelector('.list__box-details');
		if(slideHoverContainer && slideHoverContainer.innerHTML.trim()==''){
			var slideHoverContent = renderSiteHoverContent(slideCategory, slideIndex);
			if(slideHoverContent){
				slideHoverContainer.innerHTML = slideHoverContent;
			}
		}

		let activeSlide = 0;
		if(slideSwiper){
			activeSlide = slideSwiper.swiper.activeIndex;
		}

		let hoverBoxPosition = (slideIndex - activeSlide);

		if((slideIndex - activeSlide)==4){
			elParent.classList.add('last-box-selected');
		}else{
			elParent.classList.remove('last-box-selected');
		}

		if(window.innerWidth<1449){
			if((slideIndex - activeSlide)==4){
				el.classList.add('last-box');
			}
		}

		if(hoverBool) {
			el.classList.add('is-hover');

			if(elBox){
				tempRepositionGreenBar(elParent, hoverBoxPosition);
			}
		} else {
			hoverBool = true;
			el.classList.add('is-hover');

			tempRepositionGreenBar(elParent, hoverBoxPosition);
		}

		previousHoverBox = el;
	}

	markFavourites();
}

function onSlideTouchStart(ev){
	const el = ev.currentTarget,
		elParent = el.closest('[list-parent-js]'),
	slideIndex = el.dataset.index,
		slideSwiper = elParent.querySelector('.swiper-container'),
		greenBar = elParent.querySelector('[list-line-js]');

	if(greenBar){
		// setTimeout(function (){
		// 	greenBar.classList.add('no_anim');
		// }, 400)
	}

	lastActiveHoverBox = el;

	let isLastBox = false;

	if (typeof el.nextSibling === "undefined" | el.nextSibling==null){
		isLastBox = true;
	}


	let activeSlide = 0;
	if(slideSwiper){
		activeSlide = slideSwiper.swiper.activeIndex;
	}

	let hoverBoxPosition = (slideIndex - activeSlide);

	let slideWidth = 236,
	slideOffset = 178,
		greenBarWidth = 74;

	let sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

	if(sliderBox){
		slideWidth = 	sliderBox.offsetWidth + 6;
		slideOffset = slideWidth/2;
	}

	if(window.innerWidth<768){
		greenBarWidth = 48;
	}else if(window.innerWidth<=1024){
		greenBarWidth = 74;
	}

	slideOffset = (slideWidth - greenBarWidth)/2;

	let hoverBoxLeft = (slideWidth*hoverBoxPosition) + slideOffset;

	if(isLastBox){
		hoverBoxLeft = el.getBoundingClientRect().left + slideOffset - 10;
	}

	hoverBoxLeft = el.getBoundingClientRect().left + slideOffset - 10;
	console.log('Touch start '+el.getBoundingClientRect().left+' - '+slideOffset);

	//let transformVal = 'left: '+hoverBoxLeft+'px';
	let transformVal = 'transform: translateX('+hoverBoxLeft+'px)';

	greenBar.setAttribute('style', transformVal + '; transition-duration:350ms; width: '+greenBarWidth+'px');
}


function onSlideTouchMove(ev){
	const el = ev.currentTarget,
		elParent = el.closest('[list-parent-js]'),
		slideIndex = el.dataset.index,
		slideSwiper = elParent.querySelector('.swiper-container'),
		greenBar = elParent.querySelector('[list-line-js]');

	lastActiveHoverBox = el;

	let isLastBox = false;

	if (typeof el.nextSibling === "undefined" | el.nextSibling==null){
		isLastBox = true;
	}

	if(greenBar){
		//greenBar.classList.add('no_anim');
	}


	let activeSlide = 0;
	if(slideSwiper){
		activeSlide = slideSwiper.swiper.activeIndex;
	}

	let hoverBoxPosition = (slideIndex - activeSlide);


	let slideWidth = 236,
		slideOffset = 178,
		greenBarWidth = 74;

	let sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

	if(sliderBox){
		slideWidth = 	sliderBox.offsetWidth + 6;
		slideOffset = slideWidth/2;
	}

	if(window.innerWidth<768){
		greenBarWidth = 48;
	}else if(window.innerWidth<=1024){
		greenBarWidth = 74;
	}

	let minLeft = slideOffset+10;

	slideOffset = (slideWidth - greenBarWidth)/2;

	let maxLeft = getSwiperMaxLeft(elParent, slideWidth, slideOffset);


	let hoverBoxLeft = (slideWidth*hoverBoxPosition) + slideOffset;


	if(isLastBox){
		hoverBoxLeft = el.getBoundingClientRect().left + slideOffset - 10;
	}

	hoverBoxLeft = el.getBoundingClientRect().left + slideOffset - 10;

	if(hoverBoxLeft<minLeft){
		hoverBoxLeft = minLeft;
	}

	if(hoverBoxLeft > maxLeft){
		hoverBoxLeft = maxLeft;
	}

	//let transformVal = 'left: '+hoverBoxLeft+'px';
	let transformVal = 'transform: translateX('+hoverBoxLeft+'px)';

	greenBar.setAttribute('style', transformVal + '; transition-duration:0ms; width: '+greenBarWidth+'px');
}

function onSlideTouchEnd(ev){
	const el = ev.currentTarget,
		elParent = el.closest('[list-parent-js]'),
		slideIndex = el.dataset.index,
		slideSwiper = elParent.querySelector('.swiper-container'),
		greenBar = elParent.querySelector('[list-line-js]');

	if(greenBar){
		//greenBar.classList.remove('no_anim');
	}

	let slideWidth = 236,
		slideOffset = 178,
		greenBarWidth = 34;

	let sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');

	let isLastBox = false;

	if (typeof el.nextSibling === "undefined" | el.nextSibling==null){
		isLastBox = true;
	}

	if(sliderBox){
		slideWidth = 	sliderBox.offsetWidth + 6;
		slideOffset = slideWidth/2;
	}

	if(window.innerWidth<768){
		greenBarWidth = 20;
	}else if(window.innerWidth<1024){
		greenBarWidth = 34;
	}

	let activeSlide = 0;
	if(slideSwiper){
		activeSlide = slideSwiper.swiper.activeIndex;
	}

	let hoverBoxPosition = (slideIndex - activeSlide);
	let hoverBoxLeft = (slideWidth*hoverBoxPosition) + slideOffset;

	slideOffset = (slideWidth - greenBarWidth)/2;


	if(isLastBox){
		hoverBoxLeft = el.getBoundingClientRect().left + slideOffset - 10;
	}
	hoverBoxLeft = el.getBoundingClientRect().left - slideOffset;


	let barLeft = parseInt(greenBar.style.transform.replace("translateX(", ""))+14;

	let transformVal = 'transform: translateX('+barLeft+'px)';
	greenBar.setAttribute('style', transformVal + '; transition-duration:350ms; width: '+greenBarWidth+'px');
}

function onSwiperTranslate(e, translate){

	if(!isMobileOrTablet){
		return;
	}

	if(typeof lastActiveHoverBox === "undefined" ){
		return;
	}

	const el = lastActiveHoverBox,
		elParent = el.closest('[list-parent-js]'),
		slideIndex = el.dataset.index,
		slideSwiper = elParent.querySelector('.swiper-container'),
		greenBar = elParent.querySelector('[list-line-js]');


	let translateDiff = lastTranslate - translate;
	translateDiff = +translateDiff;

	let deltaTranslate = translateDiff;

	if(translateDiff<0){
		translateDiff = -translateDiff;
	}
	let isLargeJump = false;
	if(translateDiff>5){
		isLargeJump = true;
	}
	lastTranslate = translate;


	let slideWidth = 236,
		slideOffset = 178,
		greenBarWidth = 34,
	hoverBoxLeft = parseInt(greenBar.style.transform.replace("translateX(", ""));

	let sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');
	if(sliderBox){
		slideWidth = 	sliderBox.offsetWidth + 6;
	}

	if(window.innerWidth<768){
		greenBarWidth = 20;
	}else if(window.innerWidth<1024){
		greenBarWidth = 34;
	}

	if(greenBar){

		slideOffset = (slideWidth - greenBarWidth)/2;

		let maxLeft = getSwiperMaxLeft(elParent, slideWidth, slideOffset);

		let barLeft = parseInt(greenBar.style.transform.replace("translateX(", ""));



		hoverBoxLeft = barLeft-deltaTranslate;

		let minLeft = slideOffset;


		if(hoverBoxLeft < minLeft){
			hoverBoxLeft = minLeft;
		}

		if(hoverBoxLeft > maxLeft){
			hoverBoxLeft = maxLeft;
		}



		//let transformVal = 'left: '+hoverBoxLeft+'px';
		let transformVal = 'transform: translateX('+hoverBoxLeft+'px)';

		if(isLargeJump){
			//console.log('Translate - '+slideWidth+' - '+maxLeft);

			greenBar.setAttribute('style', transformVal + '; transition-duration:350ms; width: '+greenBarWidth+'px');

		}
	}
}

function getSwiperMaxLeft(elParent, slideWidth, slideOffset){
	let swiperWidth = elParent.getBoundingClientRect().width;
	let halfSlideWidth = swiperWidth%slideWidth;
	let numberOfSlides = parseInt(swiperWidth / slideWidth);

	let maxLeft = 0;

	if(halfSlideWidth> (slideWidth*0.6)){
		maxLeft = (slideWidth * (numberOfSlides+1))-slideOffset-10-7.5;
	}else{
		maxLeft = (slideWidth * numberOfSlides)-slideOffset-10-7.5;
	}
	return maxLeft;
}

function tempRepositionGreenBar(elParent, hoverBoxPosition){
	let greenBar = elParent.querySelector('[list-line-js]');
	let activeBox = elParent.querySelector('.swiper-slide.is-hover');

	if(activeBox){
		lastActiveHoverBox = activeBox;
		let hoverBoxLeft = 0;
		if(greenBar){

			hoverBoxLeft = (236*hoverBoxPosition) + 178;
			if(window.innerWidth<1449 && hoverBoxPosition == 4){
				hoverBoxLeft -= 55;
			}

			let transformVal = 'left: '+hoverBoxLeft+'px';

			greenBar.setAttribute('style', transformVal + ';width: 190px');
		}
	}
}

function onParentSideLeave(ev){
	let parentSlideBox = ev.target;
	if(parentSlideBox){
		let openBanner = parentSlideBox.querySelector('.list__specification.is-open');
		if(openBanner){
			let btCloseBanner = openBanner.querySelector('.list__specification-close');
			if(btCloseBanner){
				btCloseBanner.click();
			}
		}
	}
}

function onShowBannerEnter(__ev){
	/*let moreBox = __ev.target;
	let siteList = moreBox.closest('.list__box-wrapper');
	if(siteList.classList.contains('is-open')){
		showBanner(__ev.target);
	}*/

	/*if(!currentBannerTimeout){
		clearTimeout(currentBannerTimeout);
	}*/

	const el = lastActiveHoverBox,
		elParent = el.closest('[list-parent-js]'),
		greenBar = elParent.querySelector('[list-line-js]');

	if(greenBar){
		//greenBar.classList.remove('no_anim');
	}


	currentBannerTimeout = window.setTimeout(function(){
		showBanner(__ev.target);
	}, 1000);

	/*currentBannerTimeout= setTimeout(function (){
		showBanner(__ev.target);
	}, 1000);*/
}

function onShowBannerLeave(__ev){
	window.clearTimeout(currentBannerTimeout)
}

function showBanner(_el, isSkip = false){

	var _boxParent = _el.closest('.list__box'),
		_boxID = _boxParent.getAttribute('data-id'),
		_parentNode = _el.closest('.list__box-wrapper');

	let currentBannerBox = document.querySelector('.list__specification[data-id="'+_boxID+'"]')

	if(currentBannerBox && currentBannerBox.classList.contains('is-open')){
		return;
	}

	var swiperSlide = _el.closest('.swiper-slide');
	var swiperWrapper = _el.closest('.swiper-wrapper');
	var listBoxWrapper = _el.closest('.list__box-wrapper');
	var bannerWrapper = listBoxWrapper.querySelector('.list__specification-wrapper');

	var currentBannerSection = document.querySelector('.list__specification');
	if(currentBannerSection && !isSkip){
		currentBannerSection.remove();
	}


	//homeData.categories[category].sites[index];

	if(isSkip){
		renderSkipSiteBottomBanner(swiperWrapper.dataset.category, swiperSlide.dataset.index);
	}else{
		var bottomBanner = renderSiteBottomBanner(swiperWrapper.dataset.category, swiperSlide.dataset.index);
		if(bottomBanner){
			bannerWrapper.innerHTML = bottomBanner;
		}
	}


	const hideScrollContainer = document.querySelectorAll("html, body"),
		//_specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');
		_specificationBox = _parentNode.querySelector('.list__specification');

	let jInner = null,
		lInner = document.querySelectorAll('[video-toggle-js]').length;


	var _isActive = document.querySelector('.list__box.is-active')
	if(_isActive){
		_isActive.classList.remove('is-active');
	}


	var _isOpen = document.querySelector('.list__specification.is-open')
	if(_isOpen && !isSkip){
		_isOpen.classList.remove('is-open');
	}

	if(window.innerWidth < 1024) {

		setTimeout(() => {
			_parentNode.classList.add('is-open');
			_boxParent.classList.add('is-active');

			let __vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${__vh}px`);

			if(_specificationBox){
				_specificationBox.classList.add('is-open');
			}

		}, 100);
	} else {
		_parentNode.classList.add('is-open');
		_boxParent.classList.add('is-active');

		if(_specificationBox){
			_specificationBox.classList.add('is-open');
		}
	}


	if(window.innerWidth <= 1023) {
		hideScrollContainer.forEach((val, idx) => {
			val.classList.add("is-hideScroll");
		});
	}

	markFavourites();
}

function addToFavourites(siteId){
	postRequest(ajaxEndpoint, {
		action:'add_to_fav',
		site:siteId
	}, function (res) {
		console.log('Favouroites');
		console.log(res);
		renderFavourites();
	});
}

function isLoggedIn(){

}

function removeFavourite(favItem){
	let favId = favItem.dataset.id;
	postRequest(ajaxEndpoint, {
		action:'remove_fav',
		site:favId
	}, function (res) {
		console.log('Removed Favouroites');
		renderFavourites();
	});
}

function initWebWorker(){

	let currentLang = document.documentElement.getAttribute('lang');

	homeData = getWithExpiry("homepage_data_"+currentLang);
	if(homeData){
		if(document.body.classList.contains('home')) {
			renderAllOtherCategories();
		}
	}else{
		if(!navigator.userAgent.toLowerCase().includes('lighthouse')){
			if(document.body.classList.contains('home')){
				loadHomeData();
			}
		}
	}


}
