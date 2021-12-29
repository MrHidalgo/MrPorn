let currentBannerTimeout;
let lastActiveHoverBox;
let isMouseDown = false;
let _greenBarLeft = 0;
let	greenBarWidth;


let isAnimationStarted = false;
let pauseHoverAnimation = false;

let swiperClientWidth = null;
let swiperClientHeight = null;

let defaultSlidePaddingLeft = 0;
let defaultSlidePaddingRight = 0;
let defaultSlideMarginLeft = 0;
let defaultSlideMarginRight = 0;

let currentBannerSection = null;
let _slideWidth, _slidePaddingLeft, _slidePaddingRight, _slideMarginLeft, _slideMarginRight, _slideBoxSizing = null;

let swiperWrappers = [];
let listBoxWrappers = [];
let popupVideo = null;
let siteModal = document.querySelector('#site_modal');

let trigger;
let isClosing = false;

// Select DOM
const modalTriggersDom = document.querySelectorAll('.modal-trigger');
const dimmer = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

let homeMainContainer = document.querySelector('.c-grid--inner');
let isPopVisible = false;
let popover = document.querySelector('.popover');
let popoverTitle = popover.querySelector('.popover-title-inner');
let popoverLink = popover.querySelector('.popover-title-inner .link');
let popoverTagline = popover.querySelector('.popover-content');

// Return the center x, y of a bounding box
function findCenter({ top, left, height, width }, isOpen = true) {
	return {
		x: left + (width / 2),
		y: top + (height / 2)
	};
}
function findHCenter({ top, left, height, width }, isOpen = true) {
	return {
		x: left + (width / 2),
		y: top + window.scrollY
	};
}
/*
  Generate a function that will take a progress value (0 - 1)
  and use that to tween the modal from the source to the destination
  bounding boxes
*/
const vRange = [0, 1];


function openSlideModal(e, siteId) {
	if(!e.target){
		return;
	}

	trigger = document.querySelector('.swiper-slide[data-siteid="'+siteId+'"]');
	if(!trigger){
		return true;
	}



	if(wInnerWidth>767){

	}else{
		if(modalContainer){
			modalContainer.style.display = 'flex'
		}
	}
}


function cancelModal(e) {
	if (e.target && e.target.classList.contains('cancel-modal') && !isClosing) {
		e.stopPropagation();
	}

	isClosing = true;



	if(document.querySelector('[video-js]')){
		document.querySelector('[video-js]').pause();
	}

	document.body.classList.remove('opened');


	if(window.innerWidth<767){
		var _isOpen = document.querySelector('.list__specification.is-open')
		if(_isOpen){
			_isOpen.classList.remove('is-open');
		}
		setTimeout(()=>{
			modalContainer.style.display= 'none' ;
		}, 400);
	}else{

	}
}

function initHomeTooltip(){
	if (!window.mobileAndTabletcheck()) {

		if(homeGridInner){
			homeGridInner.onmouseover = function(e){
				let hoverTarget = e.target;
				if(hoverTarget.matches('.list__box__item') | hoverTarget.parents('.list__box__item').length>0){
					if(hoverTarget.parents('.list__box__item').length>0){
						hoverTarget = hoverTarget.parents('.list__box__item')[0];
					}

					let siteId = hoverTarget.dataset.id;
					let siteCategory = hoverTarget.dataset.category;
					let siteIndex = hoverTarget.dataset.index;

					if(homeData && homeData.categories !== undefined){
						let siteData = homeData.categories[siteCategory].sites[siteIndex];
						if(siteData){
							let siteName = siteData.name;
							let siteTagline = siteData.tagline;
							siteTagline = siteTagline.replace("\\", "").replace("\\", "");
							let siteReviewLink = siteData.review_link;
							let siteFx = siteData.f_x;
							let siteFy = siteData.f_y;

							var wallDimensions = homeMainContainer.getBoundingClientRect();
							var wallX = wallDimensions.left;
							var wallY = wallDimensions.top;
							var hoverTargetBounds = hoverTarget.getBoundingClientRect();
							var popW = hoverTargetBounds.width - 7;
							var popY =  hoverTargetBounds.top - wallY-16;
							var popX = hoverTargetBounds.left +7 - wallX;

							popover.style.display = 'block';
							popover.style.top = popY+'px';
							popover.style.left = popX+'px';
							popover.style.width = popW+'px';
							popoverLink.innerHTML = siteName;
							popoverTitle.className = 'popover-title-inner deIcon  fx_'+siteFx+' fy_'+siteFy+' fi'+siteId;
							popoverLink.setAttribute('href', siteReviewLink);
							popoverTagline.innerHTML = siteTagline;
							isPopVisible = true;
						}
					}
				}else{
					if(isPopVisible){
						popover.style.display = 'none';
					}
				}
			}
		}
	}
}

function cloneCurrentPopupBanner(){
	currentPopupBanner = document.querySelector('.list__specification.is-open');
	if(currentPopupBanner){
		//let popupBannerWrapper = currentPopupBanner.closest('.list__specification-wrapper');
		let popupBannerWrapper = siteModal;
		if(popupBannerWrapper){
			clonedPopupBanner = currentPopupBanner.cloneNode(true);
			clonedPopupBanner.setAttribute('class', 'list__snapshot is-snapshot');
			popupBannerWrapper.insertBefore(clonedPopupBanner, currentPopupBanner);
		}
	}
}

function closeBanner(_el){
	//closeAllSnapshots();

	if(true){
		cancelModal(_el);
		return;
	}

	parent = _el.closest('.list__specification');

	_el.closest('.list__box-wrapper').classList.remove('is-open');
	_el.closest('.list__specification').classList.remove('is-open');

	document.body.classList.remove('is_open');

	if(window.innerWidth <= 1024) {
		document.querySelectorAll("html, body").forEach((val, idx) => {
			val.classList.remove("is-hideScroll");
		});
	}

	if(document.querySelector('[video-js]')){
		document.querySelector('[video-js]').pause();

		//playPause(document.querySelector('[video-js]'));
	}

	if(parent.querySelector('[video-toggle-js]')) {
		parent.querySelector('[video-pause-js]').classList.remove('is-active');
		parent.querySelector('[video-toggle-js]').classList.remove('is-active');
	}

	let jInner = null,
		lInner = document.querySelectorAll('.list__box-more').length;

	for(jInner = 0; jInner < lInner; jInner++) {
		if(document.querySelectorAll('.list__box-more')[jInner].closest('.list__box').classList.contains('is-active')) {
			document.querySelectorAll('.list__box-more')[jInner].closest('.list__box').classList.remove('is-active');
		}
	}
}

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

function scrollToCategoryOnHome(ev, _ev){
	if(_ev){
		let catId = _ev.dataset.objectId?_ev.dataset.objectId:_ev.dataset.category;
		if(catId){
			if(document.querySelector('#category_wrapper_'+catId)){
				ev.preventDefault();

				if(catId!=55 && !document.body.classList.contains('sticky_header')){
					document.body.classList.add('sticky_header');
				}

				pauseHoverAnimation = true;
				document.querySelector('#category_wrapper_'+catId).scrollIntoView({
					behavior: 'smooth'
				});

				let elParent = document.querySelector('.list__box-wrapper[data-name="category_'+catId+'"]');

				let scrollGreenBar = document.querySelector('.list__box-wrapper[data-name="category_'+catId+'"] .list__box-line');
				scrollGreenBar.setAttribute('style', 'background-color: #d5f34a;');

				//elParent.querySelectorAll('.swiper-slide')[0].classList.add('is-hover');


				setTimeout(function (){
					//document.querySelector('.list__box-wrapper[data-name="category_'+catId+'"] .category_title_inner').classList.add('animate__animated', 'animate__pulse', 'animate__repeat-2');
					//scrollGreenBar.classList.add('animate__animated', 'animate__fadeOut');



					setTimeout(function (){
						scrollGreenBar.setAttribute('style', 'background-color: rgb(25, 26, 40);');

						setTimeout(function (){
							pauseHoverAnimation = false;
						}, 1000);
					}, 1000);
				}, 1300);

				//animate__animated', 'animate__pulse', 'animate__repeat-2
			}
		}
	}

}

const loadHomeData = () => {

	let url = '/wp-json/mpg/home/';
	if(currentLang!='en'){
		url = '/wp-json/mpg/home/?lang='+currentLang;
	}

	homeData = getWithExpiry("homepage_data_"+dataTime+'_'+currentLang);

	if(homeData){

	}else{
		fetch(url)
			.then(res => res.json())
			.then((out) => {
				homeData = out;

				if(homeData.code=='rest_login_required'){

				}else{
					setWithExpiry("homepage_data_"+dataTime+'_'+currentLang, homeData, 30*60*1000);
				}

			})
			.catch(err => { throw err });
	}


}

function renderHompageSiteSlide(category, index){
	//rendering single slide

	let siteItem = homeData.categories[category].sites[index];
	if(siteItem){
		let siteId = siteItem.id;
		let siteLink = siteItem.link;
		let siteName = siteItem.name;
		let siteThumb = (siteItem.banner_image)?siteItem.banner_image:siteItem.thumb;
		let siteLogo = (siteItem.logo)?siteItem.logo.src:'';
		let siteTagline = siteItem.tagline;
		if(siteTagline){
			siteTagline = siteTagline.replace(/\\(.)/mg, "$1")
		}

		let slideHtml = '<div class="list__box" list-box-js  data-id="'+siteId+'">'+
			'<a class="site--link review-site-link" data-id="'+siteId+'" href="'+siteLink+'" hreflang="'+currentLang+'">' +
			'<img class="list__box__thumb" src="'+siteItem.banner_image+'"/>'+
			'<p class="list__box--title">'+siteName+'</p>'+
			'<p class="list__box--tagline">'+siteTagline+'</p>'+
			'</a>'+
			'</div>';



		return slideHtml;
	}
	return false;

}

function renderSiteHoverContent(category, index, siteId, siteLink, siteName, siteTagline, siteRating){
	//console.log('current site link '+siteId+' - - '+siteName+' - - '+siteLink)


	let ratingHtml = '';

	for (let _i = siteRating; _i < 5; _i++) {
		ratingHtml += '<i class="icon-font icon-star-fill"></i>'
	}
	for (let _i = 0; _i < siteRating; _i++) {
		ratingHtml += '<i class="icon-font icon-star"></i>'
	}

	let btnFav = (isLoggedUser!="")?'<button class="list__box-favorites" type="button" data-id="'+siteId+'" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>':
		'<button class="list__box-favorites" type="button" data-id="'+siteId+'" more-toggle-js><i class="icon-font icon-arrow-angle icon-more-arrow"></i></button>';

	let btnFavToolTip = (isLoggedUser!="")?_t('add-to-favourites', 'Add To Favourites'):_t('more-info', 'More Info');


	var hoverContent = '<div class="list__box-details-left">'+
		'<a class="site_link" href="'+siteLink+'" target="_blank">' +
		'<i class="icon-font icon-out"></i>'+
		'<p class="list__box-details-title">'+siteName+'</p>'+
		'</a>'+
		'<div class="list__rating">' +
		'<div class="list__rating--front">' +
		'<span>'+_t('user_rating', 'User Rating')+':</span>'+
		'<div class="rating_stars">' +
		ratingHtml+
		'</div>'+
		'</div>'+
		'<div class="list__rating--back">'+_t('thanks-for-voting', 'Thanks for voting!')+'</div>'+
		'</div>'+
		'</div>'+
		'<div class="list__box-details-right">'+
		'<button class="list__box-like" type="button" data-id="'+siteId+'" like-toggle-js><i class="icon-font icon-like"></i></button>'+
		'<button class="list__box-dislike" type="button" data-id="'+siteId+'" dislike-toggle-js><i class="icon-font icon-like"></i></button>'+
		'<div class="c-popper">'+
		btnFav+
		'<div class="c-poppertext">'+
		'<u>'+btnFavToolTip+'</u>'+
		'<u>'+_t('remove-from-favorites', 'Remove From Favourites')+'</u>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'<a href="'+siteLink+'" target="_blank" class="list__box--tooltip">'+siteTagline+'</a>';

	return hoverContent;
}

function onRatingClick(){
	previewModal.querySelector('.list__rating').classList.add('active');
	setTimeout(function (){
		previewModal.querySelector('.list__rating').classList.remove('active');
	}, 2000);
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
		if(tagLIne!=''){
			tagLIne = tagLIne.replaceAll("\'", "'");
			tagLIne = tagLIne.replaceAll("\\'", "'");
		}

		let siteUrl = siteItem.url;

		let siteLink = siteItem.link;
		if(siteItem.review_link){
			siteLink = siteItem.review_link;
		}

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


				moreSites +='<div class="list__box_more_item" list-box-more-js  data-id="'+moreSite.id+'" data-count="1" >'+
					//'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url(https://mpg-images.b-cdn.net'+moreSite.banner_image+')"></a>' +
					'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url('+moreSite.banner_image+')"></a>' +
					'</div>';

				moreSiteCount++;
			}
		});

		let bannerHtml = '<div class="list__specification '+bannerClass+'" data-id="'+siteId+'">' +
			'<a class="list__specification-close" ><i class="icon-font icon-close"></i></a>'+
			'<div class="list__specification__inner">'+
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
			'<div><a class="list__specification-visit nav_link" href="'+siteUrl+'" target="_blank">'+_t('lbl_visit_website', 'VISIT WEBSITE')+'</a></div>'+
			'<div><a class="list__specification-read nav_link" href="'+siteLink+'" hreflang="'+currentLang+'" target="_blank">'+_t('read_review', 'READ REVIEW')+'</a></div>'+
			'<div class="list__specification-action-desc">'+
			'<p>'+tagLIne+'</p>'+
			'</div>'+
			'<div class="list__specification-action-skip"><a class="list__specification-circle list__specification-skip" data-id="'+siteId+'" data-category="'+category+'" data-index="'+index+'" spec-skip-js><i class="icon-font icon-point"></i><span>Skip</span></a></div>'+
			'<div class="list__specification-action-circle">' +
			'<button class="list__specification-circle list__specification-like" data-id="'+siteId+'" data-like="'+siteId+'" spec-like-js><i class="icon-font icon-like"></i><span>Like</span></button>' +
			'</div>'+
			'<div class="list__specification-action-circle">' +
			'<button class="list__specification-circle list__specification-dislike" data-id="'+siteId+'" data-dislike="'+siteId+'" spec-dislike-js><i class="icon-font icon-like"></i><span>Dislike</span></button>' +
			'</div>'+
			'<div class="list__specification-action-circle">'+
			'<div class="c-popper">' +
			'<button class="list__specification-circle list__specification-favorites" data-id="'+siteId+'" data-favorites="'+siteId+'" spec-favorites-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i><span>Favorites</span></button>'+
			'<div class="c-poppertext">'+
			'<u>'+_t('add-to-favourites', 'Add To Favourites')+'</u>'+
			'<u>'+_t('remove-from-favorites', 'Remove From Favourites')+'</u>'+
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
			'<p>'+_t('more-like-this', 'More Like This')+'</p>'+
			'</div>'+
			'<div class="site_banner_more_sites">' +
			moreSites+
			'</div>'+
			'</div>'+
			'</div>'+
			getPopupSimilarSites(category, siteId)+
			'</div>';

		//Loading bottom part in the drop down

		return bannerHtml;
	}

	return false;
}

function getPopupSimilarSites(category, currentSiteId){
	let totalSimilarSiteCount = homeData.categories[category].sites.length - 1;

	let similarHtml = '<div class="list__specification-bottom">';

	similarHtml += '<div class="similar_site_title">'+_t('more_similar_sites', 'MORE SIMILAR SITES')+'</div>';

	similarHtml += '<div class="similar_site_list show_10" data-count="'+totalSimilarSiteCount+'">';

	let similarSiteCount = 0;

	if(!homeData.categories[category]){
		return '';
	}


	homeData.categories[category].sites.map(function (moreSite, index) {
		if(currentSiteId!=moreSite.id ){
			let moreSiteLogo = moreSite.logo ? moreSite.logo.src: '';
			let similarSiteItemClass = 'similar_site_item';
			if(similarSiteCount==0){
				similarSiteItemClass += ' hover';
			}

			let siteTagLine = moreSite.tagline;
			if(siteTagLine){
				if(window.innerWidth<1366.98){
					siteTagLine = siteTagLine.substr(0, 116);
				}else if(window.innerWidth<1441){
					siteTagLine = siteTagLine.substr(0, 130);
				}else{
					siteTagLine = siteTagLine.substr(0, 180);
				}
			}

			let siteLink = moreSite.link;
			if(moreSite.review_link){
				siteLink = moreSite.review_link;
			}

			let bannerVideoPoster = moreSite.banner_video_poster;
			let bannerVideo = moreSite.banner_video;

			let similarSiteVideo = '';
			let siteHasVideo = '';
			if(bannerVideo){
				similarSiteVideo = 'data-video="'+bannerVideo+'" data-poster="'+bannerVideoPoster+'"';
				siteHasVideo = ' has_video';
			}

			similarHtml += '<div class="'+similarSiteItemClass+' '+siteHasVideo+'" '+similarSiteVideo+'>' +
				'<div class="similar_site_item_inner">' +
				'<a class="similar_site_item_link" href="'+siteLink+'" hreflang="'+currentLang+'">' +
				'<div class="similar_site_item_thumb" style="background-image: url('+moreSite.banner_image+')"></div>'+
				'<div class="similar_site_item_content">' +
				'<h3 class="title">'+moreSite.name+'</h3>'+
				//'<p>'+moreSite.tagline+' <a class="readmore" href="'+moreSite.link+'">Read More</a></p>'+
				'<p>'+siteTagLine+'... <span class="read_more">'+_t('read_more', 'Read More')+'</span></p>'+
				'</div>'+
				'</a>' +

				'<div class="similar_site_item_buttons">' +
				'<a class="visit_site list__specification-read nav_link" href="'+moreSite.url+'" target="_blank">'+_t('lbl_visit_website', 'VISIT WEBSITE')+'</a>'+
				'<a class="read_review list__specification-visit nav_link" href="'+siteLink+'"  hreflang="'+currentLang+'">'+_t('read_review', 'READ REVIEW')+'</a>'+
				'</div>'+
				'</div>'+
				'</div>';

			similarSiteCount++;
		}
	});

	similarHtml += '</div>';

	let _catCount = homeData.categories[category].count;
	let _catTitle = homeData.categories[category].title;
	let _catLink = homeData.categories[category].link;
	let _catIconUrl = homeData.categories[category].logo.url;
	let _catIcon = '<img src="'+_catIconUrl+'"/>';

	let showCategoryLink = false;

	if(totalSimilarSiteCount>10){
		similarHtml += '<div class="show_more_sites">' +
			'<button class="show_more_sites_trigger">' +
			'<i class="icon-font icon-arrow-angle"></i>'+
			'</button>'+
			'</div>';
	}else{
		showCategoryLink = true;
	}



	//Category link
	similarHtml += '<div class="category_link '+(showCategoryLink?'show':'')+'">';
	similarHtml += '<a class="link_btn" href="'+_catLink+'">'+_catIcon+_t('see_all', 'See All')+' ('+_catCount+') '+_catTitle+'</a>';
	similarHtml += '</div>';
	//Category link end

	similarHtml += '<div id="other_categories" class="more_terms">';
	similarHtml += '<div class="similar_site_title">'+_t('more_categories', 'MORE CATEGORIES')+'</div>';
	similarHtml += '<div class="more_categories_list category_box">';

	homeData['more_terms'].map(function (term, index) {
		let moreTermCat = homeData.categories[term];


		let moreTermHtml = '<div class="category_item">';
		moreTermHtml += '<a class="category_item_inner" hreflang="en" href="'+moreTermCat.link+'">';

		let youtubeIcon = moreTermCat['youtube_hd_opt'];
		if(Array.isArray(youtubeIcon)){
			youtubeIcon = youtubeIcon.join().trim();
		}
		youtubeIcon = youtubeIcon.trim();
		if(youtubeIcon=='hdbadge'){
			//moreTermHtml += '<i className="'+moreTermCat['youtube_hd_opt']+'"></i>';
			moreTermHtml += '<img class="yt_icon" src="/wp-content/themes/mpg/images/icon_hd.png"/>';
		}else if(youtubeIcon=='ytbadge'){
			moreTermHtml += '<img class="yt_icon" src="/wp-content/themes/mpg/images/icon_youtube.png"/>';
		}
		let videoThumb = moreTermCat['video_thumb'];

		if(videoThumb!=''){
			moreTermHtml += '<video class="category_item__content nolazy" autoplay loop muted playsinline><source src="'+videoThumb+'" type="video/mp4">Your browser does not support the video tag.</video>';
		}else{
			moreTermHtml += '<img class="category_item__content nolazy" src="'+moreTermCat['thumbnail']+'" alt="'+moreTermCat['title']+'"/>';
		}

		moreTermHtml += '<div class="catD">'+moreTermCat['title']+'<small>'+_t('click_here_to_see', 'Click Here to See')+' ('+moreTermCat['count']+') '+_t('sites', 'Sites')+'</small></div>';

		moreTermHtml += '</a>';

		moreTermHtml += '</div>';


		similarHtml += moreTermHtml;
	});

	similarHtml += '</div>';
	similarHtml += '</div>';

	similarHtml += '</div>';

	return similarHtml;
}

function toggleMoreSimilarSites(){
	let similarSiteList = document.querySelector('.similar_site_list');
	if(similarSiteList){
		let siteCount = similarSiteList.dataset.count;

		let _categoryLink = document.querySelector('.list__specification-bottom .category_link');

		if(siteCount>10 && similarSiteList.classList.contains('show_10')){
			similarSiteList.classList.remove('show_10');
			similarSiteList.classList.add('show_20');

			if(siteCount<21){
				document.querySelector('.show_more_sites').remove();
				_categoryLink.classList.add('show');
			}
		}else if(siteCount>20 && similarSiteList.classList.contains('show_20')){
			similarSiteList.classList.remove('show_20');
			similarSiteList.classList.add('show_30');
			if(siteCount<31){
				document.querySelector('.show_more_sites').remove();
				_categoryLink.classList.add('show');
			}
		}else if(siteCount>30 && similarSiteList.classList.contains('show_30')){
			similarSiteList.classList.remove('show_30');
			similarSiteList.classList.add('show_40');
			if(siteCount<41){
				document.querySelector('.show_more_sites').remove();
				_categoryLink.classList.add('show');
			}
		}else if(siteCount>40 && similarSiteList.classList.contains('show_40')){
			similarSiteList.classList.remove('show_40');
			similarSiteList.classList.add('show_60');
			if(siteCount<51){
				document.querySelector('.show_more_sites').remove();
				_categoryLink.classList.add('show');
			}
		}
	}
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
		if(tagLIne!=''){
			tagLIne = tagLIne.replaceAll("\'", "'");
			tagLIne = tagLIne.replaceAll("\\'", "'");
		}
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
		let similarSiteCount = homeData.categories[category].sites.length

		let msStart = 0;
		let msEnd = 6;

		if(index > 3){
			msStart = index - 3;
			msEnd = index+3;

			if(msEnd > similarSiteCount){
				msEnd = similarSiteCount
			}
		}else{
			msEnd = similarSiteCount
		}

		for (let i = msStart; i < msEnd; i++) {
			let moreSite = homeData.categories[category].sites[i];

			if(moreSiteCount<6 && moreSite.id!=siteId){
				let moreSiteLogo = moreSite.logo ? moreSite.logo.src: '';

				moreSites +='<div class="list__box_more_item" list-box-more-js  data-id="'+moreSite.id+'" data-count="1" >'+
					'<a class="list__box_more_thumb" href="'+moreSite.link+'" style="background-image: url('+moreSite.banner_image+')"></a>' +
					'</div>';

				moreSiteCount++;
			}
		}


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

		document.querySelector('.list__specification .list__specification-read.nav_link').setAttribute('href', siteLink);

		//document.querySelector('.site_banner_more_sites').innerHTML = moreSites;

		document.querySelectorAll('.site_banner_more_sites').forEach(function (moreSiteDiv, index) {
			moreSiteDiv.innerHTML = moreSites;
		})



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


let tOut = null;

let homeGridInner = document.querySelector(".c-grid--inner");

function getGreenBarTranslateX(greenBar) {
	var translateX = parseInt(getComputedStyle(greenBar, null).getPropertyValue("transform").split(",")[4]);

	return translateX; // get translateX value

}

function easeInOutQuad(x, t, b, c, d) {
	if ((t /= d / 2) < 1) {
		return c / 2 * t * t + b;
	} else {
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}
}

function easeInOutQuart(t, b, c, d) {
	if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}



function tempRepositionGreenBar(elParent, hoverBoxPosition, isSmall){
	let greenBar = elParent.querySelector('[list-line-js]');
	let activeBox = elParent.querySelector('.swiper-slide.is-hover');
	let slideSwiper = elParent.querySelector('.swiper');
	let slideWidth = 0;

	let sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');
	if(sliderBox){
		slideWidth = 	sliderBox.offsetWidth + 6;
	}

	if(isSmall){
		return;
	}

	if(activeBox){
		if(activeBox){
			lastActiveHoverBox = activeBox;
		}
		let hoverBoxLeft = 0;
		if(greenBar){

			hoverBoxLeft = (188*hoverBoxPosition)

			if(window.innerWidth<1449 && hoverBoxPosition == 4){
				hoverBoxLeft -= 55;
			}

			let transformVal = 'transform: translateX('+hoverBoxLeft+'px);';

			if(isSmall){
				let activeSlide = 0;
				if(slideSwiper){
					activeSlide = slideSwiper.swiper.activeIndex;
				}

				console.log('active index '+activeSlide);
				greenBar.setAttribute('style', transformVal + ';width: 64px');
			}else{
				greenBar.setAttribute('style', transformVal + ';width: 190px');
			}

		}
	}
}

function showBanner(siteId, isSkip = false, target = false){

	videoPaused = true;


	let siteBox = document.querySelector('.swiper-slide[data-siteid="'+siteId+'"]');
	if(!siteBox){
		return;
	}

	let swiperSlide = siteBox;
	let slideIndex = swiperSlide.dataset.index;
	let swiperWrapper = siteBox.closest('.swiper-wrapper');
	let slideCategory = swiperWrapper.dataset.category;

	if(currentBannerSection && !isSkip){
		currentBannerSection.remove();
	}

	if(isSkip){
		currentBannerSection.classList.add('skip');
		renderSkipSiteBottomBanner(slideCategory, slideIndex);

		setTimeout(()=>{
			currentBannerSection.classList.remove('skip');
		}, 300);
	}else{
		var bottomBanner = renderSiteBottomBanner(slideCategory, slideIndex);
		if(bottomBanner){
			siteModal.innerHTML = bottomBanner;

			currentBannerSection = document.querySelector('.list__specification');

			openSlideModal(target, siteId);
			initSimilarSiteEvents();
		}
	}


	const _specificationBox = document.querySelector('.list__specification');

	var _isActive = document.querySelector('.list__box.is-active')
	if(_isActive){
		_isActive.classList.remove('is-active');
	}


	var _isOpen = document.querySelector('.list__specification.is-open')
	if(_isOpen && !isSkip){
		_isOpen.classList.remove('is-open');
		document.body.classList.remove('is_open');
	}

	if(wInnerWidth < 768) {

		setTimeout(() => {
			//_boxParent.classList.add('is-active');

			/*let __vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${__vh}px`);*/

			if(_specificationBox){
				_specificationBox.classList.add('is-open');
			}

		}, 100);

		if(currentBannerSection){
			setTimeout(() => {
				currentBannerSection.classList.remove('skip');
			},350);
		}
	} else {
	}

	markFavourites();
	markLikesDislikes();
}

function onModalContainerScroll(e){
	let popupSpecInner = document.querySelector('.list__specification__inner');
	let mC = document.querySelector('.modal-container');
	if(popupSpecInner){
		let videoY = popupSpecInner.getBoundingClientRect().height + 150;
		let vidPlayer = document.querySelector('[video-js]');
		if(mC.scrollTop > videoY){
			if(vidPlayer){
				vidPlayer.pause();
			}
		}else{
			if(!videoPaused && vidPlayer.paused){
				vidPlayer.play();
			}
		}
	}
}

function initSimilarSiteEvents(){
	let mC = document.querySelector('.modal-container');
	if(mC){
		mC.removeEventListener('scroll', onModalContainerScroll);
		mC.addEventListener('scroll', onModalContainerScroll);
	}

	document.querySelectorAll(".similar_site_item").forEach(function(linkTo){
		linkTo.addEventListener('mouseenter', function (ev){
			const el = ev.currentTarget;

			let oldSSIH = document.querySelector('.similar_site_item.hover');
			if(oldSSIH){
				oldSSIH.classList.remove('hover');
			}
			el.classList.add('hover');
		}, false);
	})

	document.querySelectorAll(".similar_site_item.has_video").forEach(function(linkTo){
		linkTo.addEventListener('mouseenter', function (ev){
			let oldSimilarSiteVideo = document.querySelector('.similar_site_video_item');
			if(oldSimilarSiteVideo){
				oldSimilarSiteVideo.remove();
			}

			const el = ev.currentTarget;
			let siteVideoUrl = el.dataset.video;
			let siteVideoPoster = el.dataset.poster;
			let siteVideoContainer = el.querySelector('.similar_site_item_thumb');

			if(siteVideoContainer){
				let similarSiteVideo = '<video class="similar_site_video_item" preload="none" autoplay loop playsinline muted poster="'+siteVideoPoster+'" video-js>'+
					'<source src="'+siteVideoUrl+'" type="video/mp4">'+
					'</video>';

				siteVideoContainer.insertAdjacentHTML( 'beforeend', similarSiteVideo );
			}
		}, false);

		linkTo.addEventListener('mouseleave', function (ev){
			let oldSimilarSiteVideo = document.querySelector('.similar_site_video_item');
			if(oldSimilarSiteVideo){
				oldSimilarSiteVideo.remove();
			}
		}, false);
	})
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




function getLikesAndDislikes(){
	window.dislikes = [];

	window.likes = getWithExpiry("likes");
	window.dislikes = getWithExpiry("dislikes");
	if(!window.likes){
		window.likes = [];
	}
	if(!window.dislikes){
		window.dislikes = [];
	}
}
function onLike(el, elID){
	if(el.classList.contains('is-active')){
		window.likes.push(elID);
	}else{
		window.likes.remove(elID);
	}

	setWithExpiry("likes", window.likes, 30*24*3600*1000);
}
function onDisLike(el, elID){
	//el.classList.toggle('is-active');
	if(el.classList.contains('is-active')){
		window.dislikes.push(elID);
	}else{
		window.dislikes.remove(elID);
	}
	setWithExpiry("dislikes", window.dislikes, 30*24*3600*1000);
}

const markLikesDislikes = () =>{
	window.likes.map(id=>{
		let btnLike = document.querySelector('.list__box-like[data-id="'+id+'"]')
		if(btnLike){
			btnLike.classList.remove('is-hide');
			btnLike.classList.add('is-active');
		}
		let btnDislike = document.querySelector('.list__box-dislike[data-id="'+id+'"]')
		if(btnDislike){
			btnDislike.classList.remove('is-active');
			btnDislike.classList.add('is-hide');
		}

		btnLike = document.querySelector('.list__specification-like[data-like="'+id+'"]')
		if(btnLike){
			btnLike.parentNode.classList.remove('is-hide');
			btnLike.classList.add('is-active');
		}
		btnDislike = document.querySelector('.list__specification-dislike[data-dislike="'+id+'"]')
		if(btnDislike){
			btnDislike.classList.remove('is-active');
			btnDislike.parentNode.classList.add('is-hide');
		}
	});

	window.dislikes.map(id=>{
		let btnDislike = document.querySelector('.list__box-dislike[data-id="'+id+'"]')
		if(btnDislike){
			btnDislike.classList.remove('is-hide');
			btnDislike.classList.add('is-active');
		}
		let btnLike = document.querySelector('.list__box-like[data-id="'+id+'"]')
		if(btnLike){
			btnLike.classList.remove('is-active');
			btnLike.classList.add('is-hide');
		}

		btnDislike = document.querySelector('.list__specification-dislike[data-dislike="'+id+'"]')
		if(btnDislike){
			btnDislike.parentNode.classList.remove('is-hide');
			btnDislike.classList.add('is-active');
		}
		btnLike = document.querySelector('.list__specification-like[data-like="'+id+'"]')
		if(btnLike){
			btnLike.classList.remove('is-active');
			btnLike.parentNode.classList.add('is-hide');
		}
	});
}
