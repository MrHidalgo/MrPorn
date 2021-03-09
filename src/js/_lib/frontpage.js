var webworkerFrontpage;
let currentBannerTimeout;
let lastActiveHoverBox;
let lastTranslate = 0;
let isMouseDown = false;
let _greenBarLeft = 0;
let _greenBarWidth = 20;
let _greenBarCurrent = 0;
let _greenBarAnimSpeed = 0;
let _greenBarDuration = 500;
let _greenBarFrom = 0;
let _lastGreenBar;
let _touchStartPosition = 0;
let _greenBarTimer;
let _isGreenBarMoving = false;
let isAnimationStarted = false;
let maxLeft;
let minLeft;
let swiperSlideWidth = 230;


const { css, transform, chain, delay, tween, easing, parallel } = window.popmotion;
const { interpolate } = transform;

let trigger;
let isClosing = false;

// Select DOM
const modalTriggersDom = document.querySelectorAll('.modal-trigger');
const dimmer = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

// Create CSS renderers
const dimmerRenderer = css(dimmer);
const modalContainerRenderer = css(modalContainer);
const modalRenderer = css(modal);

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
function generateModalTweener(sourceBBox, destinationBBox, isOpen = true) {
	const sourceCenter = findCenter(sourceBBox);
	//const destinationCenter = findHCenter(destinationBBox, isOpen);
	const destinationCenter = findCenter(destinationBBox, isOpen);



	const toX = interpolate(vRange, [sourceCenter.x - destinationCenter.x, 0]);

	/*let toY = 0;

	if(isOpen){
		//toY = interpolate(vRange, [sourceCenter.y - destinationCenter.y + window.scrollY, 0]);
		toY = interpolate(vRange, [200 + window.scrollY, 0]);

		console.log('Opening '+(200 + window.scrollY));

	}else{
		toY = interpolate(vRange, [sourceCenter.y - destinationCenter.y, 0]);
		console.log('Closing '+(sourceCenter.y - destinationCenter.y));
	}*/

	const toY = interpolate(vRange, [sourceCenter.y - destinationCenter.y, 0]);
	const toScaleX = interpolate(vRange, [sourceBBox.width / destinationBBox.width, 1]);
	const toScaleY = interpolate(vRange, [sourceBBox.height / destinationBBox.height, 1]);

	// console.log(sourceCenter.x+' - '+destinationCenter.x);

	console.log(destinationCenter.y);

	return (v) => modalRenderer.set({
		opacity: v,
		x: toX(v),
		y: toY(v),
		scaleX: toScaleX(v),
		scaleY: toScaleY(v)
	});
}

function openSlideModal(e) {
	if (e.target && e.target.classList.contains('modal-trigger')) {

	}

	trigger = e.target.parents('.swiper-slide');
	if(Array.isArray(trigger)){
		trigger = trigger[0];
	}

	// Get bounding box of triggering element
	const triggerBBox = trigger.getBoundingClientRect();



	// Temporarily show modal container to measure modal
	dimmerRenderer.set('display', 'block').render();
	modalContainerRenderer.set('display', 'flex').render();
	modalRenderer.set('opacity', 0).render();

	document.body.classList.add('opened');

	// Get bounding box of final modal position
	const modalBBox = modal.getBoundingClientRect();

	// Get a function to tween the modal from the trigger
	const modalTweener = generateModalTweener(triggerBBox, modalBBox);

	// Fade in overlay
	tween({
		duration: 200,
		onUpdate: (v) => dimmerRenderer.set('opacity', v)
	}).start();

	chain([
		delay(75),
		tween({
			duration: 600,
			ease: easing.easeOut,
			onUpdate: modalTweener
		})
	]).start();
}

function closeComplete() {
	isClosing = false;
	dimmerRenderer.set('display', 'none').render();
	modalContainerRenderer.set('display', 'none').render();

	modalRenderer.set({
		x:0,
		y: 0,
		scaleX: 1,
		scaleY: 1,
		transformOrigin: '50% 50%'
		//transformOrigin: '50% 0'
	});
}

function cancelModal(e) {
	if (e.target && e.target.classList.contains('cancel-modal') && !isClosing) {
		e.stopPropagation();
	}

	isClosing = true;

	const triggerBBox = trigger.getBoundingClientRect();
	const modalBBox = modal.getBoundingClientRect();

	const modalTweener = generateModalTweener(triggerBBox, modalBBox, false);

	if(document.querySelector('[video-js]')){
		document.querySelector('[video-js]').pause();
	}

	document.body.classList.remove('opened');

	parallel([
		tween({
			from: dimmerRenderer.get('opacity'),
			to: 0,
			onUpdate: (v) => dimmerRenderer.set('opacity', v)
		}),
		tween({
			from: modalRenderer.get('opacity'),
			to: 0,
			duration: 250,
			onUpdate: modalTweener,
			onComplete: closeComplete
		})
	]).start();
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
		let catId = _ev.dataset.objectId;
		if(catId){
			if(document.querySelector('#category_wrapper_'+catId)){
				ev.preventDefault();
				document.querySelector('#category_wrapper_'+catId).scrollIntoView({
					behavior: 'smooth'
				});
			}
		}
	}

}

const loadHomeData = () => {
	let currentLang = document.documentElement.getAttribute('lang');

	console.log('Loading home data');

	let url = '/wp-json/mpg/home/';
	if(currentLang!='en'){
		url = '/wp-json/mpg/home/?lang='+currentLang;
	}

	homeData = getWithExpiry("homepage_data_"+dataTime+'_'+currentLang);

	if(homeData){
		renderAllOtherCategories();
	}else{
		fetch(url)
			.then(res => res.json())
			.then((out) => {
				homeData = out;

				if(homeData.code=='rest_login_required'){

				}else{
					setWithExpiry("homepage_data_"+dataTime+'_'+currentLang, homeData, 30*60*1000);
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

		let btnFav = (isLoggedUser!="")?'<button class="list__box-favorites" type="button" data-id="'+siteId+'" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>':
			'<button class="list__box-favorites" type="button" data-id="'+siteId+'" more-toggle-js><i class="icon-font icon-arrow-angle icon-more-arrow"></i></button>';
		let btnFavToolTip = (isLoggedUser!="")?'Add To Favourites':'More Info';

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
			'<button class="list__box-like" type="button" data-id="'+siteId+'" like-toggle-js><i class="icon-font icon-like"></i></button>'+
			'<button class="list__box-dislike" type="button" data-id="'+siteId+'" dislike-toggle-js><i class="icon-font icon-like"></i></button>'+
			'<div class="c-popper">'+
			btnFav+
			'<div class="c-poppertext">'+
			'<u>'+btnFavToolTip+'</u>'+
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

		let btnFav = (isLoggedUser!="")?'<button class="list__box-favorites" type="button" data-id="'+siteId+'" favorites-toggle-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i></button>':
			'<button class="list__box-favorites" type="button" data-id="'+siteId+'" more-toggle-js><i class="icon-font icon-arrow-angle icon-more-arrow"></i></button>';

		let btnFavToolTip = (isLoggedUser!="")?'Add To Favourites':'More Info';

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
			btnFav+
		'<div class="c-poppertext">'+
		'<u>'+btnFavToolTip+'</u>'+
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
		if(tagLIne!=''){
			tagLIne = tagLIne.replaceAll("\'", "'");
			tagLIne = tagLIne.replaceAll("\\'", "'");
		}

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
			getPopupSimilarSites(category, siteId)+
			'</div>';

		//Loading bottom part in the drop down

			return bannerHtml;
	}

	return false;
}

function getPopupSimilarSites(category, currentSiteId){
	let similarHtml = '<div class="list__specification-bottom">';

	similarHtml += '<div class="similar_site_title">MORE SIMILAR SITES</div>';

	similarHtml += '<div class="similar_site_list">';

	let similarSiteCount = 0;

	if(!homeData.categories[category]){
		return '';
	}

	homeData.categories[category].sites.map(function (moreSite, index) {
		if(currentSiteId!=moreSite.id && similarSiteCount < 5){
			let moreSiteLogo = moreSite.logo ? moreSite.logo.src: '';
			let similarSiteItemClass = 'similar_site_item';
			if(similarSiteCount==0){
				similarSiteItemClass += ' hover';
			}

			similarHtml += '<div class="'+similarSiteItemClass+'">' +
				'<div class="similar_site_item_inner">' +
				'<a class="similar_site_item_thumb" href="'+moreSite.link+'" style="background-image: url('+moreSite.banner_image+')"></a>' +
				'<div class="similar_site_item_content">' +
				'<div class="title">'+moreSite.name+'</div>'+
				'<p>'+moreSite.tagline+' <a class="readmore" href="'+moreSite.link+'">Read More</a></p>'+
				'</div>'+
				'<div class="similar_site_item_buttons">' +
				'<a class="visit_site list__specification-read nav_link" href="'+moreSite.url+'" target="_blank">VISIT WEBSITE</a>'+
				'<a class="read_review list__specification-visit nav_link" href="'+moreSite.link+'">READ REVIEW</a>'+
				'</div>'+
				'</div>'+
				'</div>';

			similarSiteCount++;
		}
	});

	similarHtml += '</div>';

	similarHtml += '<div id="other_categories" class="more_terms">';
	similarHtml += '<div class="similar_site_title">MORE CATEGORIES</div>';
	similarHtml += '<div class="more_categories_list category_box">';

	homeData['more_terms'].map(function (term, index) {
		let moreTermCat = homeData.categories[term];


		let moreTermHtml = '<div class="category_item">';
		moreTermHtml += '<a class="category_item_inner" hreflang="en" href="'+moreTermCat.link+'">';

		if(moreTermCat['youtube_hd_opt']){
			moreTermHtml += '<i className="'+moreTermCat['youtube_hd_opt']+'"></i>';
		}
		let videoThumb = moreTermCat['video_thumb'];

		if(videoThumb!=''){
			moreTermHtml += '<video autoplay loop muted playsinline><source src="'+videoThumb+'" type="video/mp4">Your browser does not support the video tag.</video>';
		}else{
			moreTermHtml += '<img src="'+moreTermCat['thumbnail']+'" alt="'+moreTermCat['title']+'"/>';
		}

		moreTermHtml += '<div class="catD">'+moreTermCat['title']+'<small>Click Here to See ('+moreTermCat['count']+') Sites</small></div>';

		moreTermHtml += '</a>';

		moreTermHtml += '</div>';


		similarHtml += moreTermHtml;
	});

	similarHtml += '</div>';
	similarHtml += '</div>';

	similarHtml += '</div>';

	return similarHtml;
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

	let categoryTagLine = categoryData.tagline;
	if(categoryTagLine!=''){
		categoryTagLine = categoryTagLine.replaceAll("\'", "'");
		categoryTagLine = categoryTagLine.replaceAll("\\'", "'");
	}



	let categoryBoxHtml = '<div class="list__box-wrapper" list-parent-js data-name="category_'+categoryId+'" data-index="'+categoryIndex+'">'+
                  '<div class="list__box-head">'+
										'<div class="list__info">'+
											'<div class="list__info-circle"><img src="'+categoryLogo+'" alt=""/></div>'+
											'<div class="category_title">'+
												'<a href="'+categoryData.link+'" hreflang="'+currentLang+'">'+categoryData.title+'</a><span>'+categoryTagLine+'</span>'+
											'</div>'+
										'</div>'+
                    '<a class="list__btn nav_link" href="'+categoryData.link+'" hreflang="'+currentLang+'">SEE&nbsp;<span>'+categoryData.count+' MORE</span><i class="icon-font icon-arrow-angle"></i></a>'+
                  '</div>'+
                  '<div class="list__box-line">'+
                    '<u list-line-ind-js></u><span class="list_green_line" list-line-js></span>'+
                  '</div>'+
									'<div class="list__box-body">'+
										'<div class="list__arrow-wrapper">'+
											'<a class="list__arrow list__arrow--prev" >'+
                        '<div class="list__arrow-box"><i class="icon-font icon-arrow-angle"></i></div>'+
											'</a>'+
											'<a class="list__arrow list__arrow--next" >'+
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

				//swiperSlides[i].removeEventListener('touchmove', onSlideTouchMove);
				//swiperSlides[i].addEventListener('touchmove', onSlideTouchMove, false);
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



	/*for(let i = 0, len = listBoxBody.length; i < len; i++) {
		listBoxBody[i].addEventListener('mouseleave', function(ev) {
			if(window.innerWidth >= 1280) {
				hoverBool = false;

				clearTimeout(tOut);

				for(let j = 0, l = swiperSlides.length; j < l; j++) {
					swiperSlides[j].classList.remove('is-hover');
				}
			}
		}, false);
	}*/

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

			let hoverBoxLeft = (236*hoverBoxPosition) + 93;
			if(hoverBoxPosition>0){
				hoverBoxLeft-=10;
			}

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
	markLikesDislikes();
}

function onSlideTouchStart(ev){
	const el = ev.currentTarget,
		elParent = el.closest('[list-parent-js]'),
	slideIndex = el.dataset.index,
		slideSwiper = elParent.querySelector('.swiper-container'),
		greenBar = elParent.querySelector('[list-line-js]');

	isMouseDown = true;
	_touchStartPosition = ev.touches[0].pageX;

	if(greenBar){
		greenBar.classList.add('no_anim');

		_lastGreenBar = greenBar;
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


	let barLeft = getGreenBarTranslateX(greenBar);

	_greenBarAnimSpeed = 0;

	_greenBarLeft = hoverBoxLeft;
	if(_greenBarLeft<0){
		_greenBarLeft = 0;
	}else if(_greenBarLeft>maxLeft){
		_greenBarLeft = maxLeft;
	}


	_greenBarWidth = greenBarWidth;

	//greenBar.style['transition-duration'] = _greenBarAnimSpeed;

	greenBar.style.width = greenBarWidth+'px';
	if(!isAnimationStarted){
		isAnimationStarted = true;
		requestAnimationFrame(animateGreenBar);
	}

	if(_greenBarTimer){
		clearInterval(_greenBarTimer);
	}

	moveGreenBar(barLeft, hoverBoxLeft);

	//greenBar.setAttribute('style', transformVal + '; transition-duration:350ms; width: '+greenBarWidth+'px');
}


function onSlideTouchMove(ev){
	const el = ev.currentTarget,
		elParent = el.closest('[list-parent-js]'),
		slideIndex = el.dataset.index,
		slideSwiper = elParent.querySelector('.swiper-container'),
		greenBar = elParent.querySelector('[list-line-js]');

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
		slideWidth = 100;
	}else if(window.innerWidth<=1024){
		greenBarWidth = 74;
	}
	let hoverBoxLeft = 0;

	slideOffset = (slideWidth - greenBarWidth)/2;

	if(lastActiveHoverBox){
		hoverBoxLeft = lastActiveHoverBox.getBoundingClientRect().left + slideOffset-6;
	}


	//_greenBarLeft = hoverBoxLeft;
	_greenBarWidth = greenBarWidth;



	//console.log(ev.touches[0].pageX+' - '+_touchStartPosition+' - '+_greenBarCurrent);

	//greenBar.setAttribute('style', transformVal + '; transition-duration:10ms; width: '+greenBarWidth+'px');
}

function animateGreenBar(){
	if (isMouseDown) { // check if mouse is down
		requestAnimationFrame(animateGreenBar); // request 60 fps animation
	}else{
		console.log('Missing animation frame');
	}
	if(_greenBarLeft<0){
		_greenBarLeft = minLeft;
	}

	_lastGreenBar.style.transform = "translate3d(" + _greenBarLeft + "px, 0, 0)";
}
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

function moveGreenBar(from, to) {
	_greenBarFrom = from;
	let start = new Date().getTime();


	if(to<0){
		clearInterval(_greenBarTimer);
		return;
	}

	_greenBarTimer = setInterval(function() {
		var time = new Date().getTime() - start;
		var x = easeInOutQuart(time, _greenBarFrom, to - _greenBarFrom, _greenBarDuration);

		if(x<0){
			clearInterval(_greenBarTimer);
		}else if(x>maxLeft){
			clearInterval(_greenBarTimer);
		}
		_greenBarLeft = x;
		if (time >= _greenBarDuration) clearInterval(_greenBarTimer);
	}, 1000 / 60);
	//rect.setAttribute('x', from);

	if(_greenBarLeft>maxLeft){
		_greenBarLeft = maxLeft;
	}

	if(_greenBarLeft<0){
		_greenBarLeft = minLeft;
	}

	if(_greenBarFrom>0){
		_greenBarLeft = _greenBarFrom;
	}
}

function onSlideTouchEnd(ev){
	const el = ev.currentTarget,
		elParent = el.closest('[list-parent-js]'),
		slideIndex = el.dataset.index,
		slideSwiper = elParent.querySelector('.swiper-container'),
		greenBar = elParent.querySelector('[list-line-js]');

	// isMouseDown = false;

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

	console.log('Bar width '+greenBarWidth+' - '+slideSwiper.swiper.translate);

	//hoverBoxLeft = ((slideIndex*slideWidth) + translate)+slideOffset-12;

	if(!_isGreenBarMoving){
		let barLeft = getGreenBarTranslateX(greenBar);
		let hoverBoxLeft = ((slideIndex*slideWidth) + slideSwiper.swiper.translate)+slideOffset-12;

		if(hoverBoxLeft<0){
			hoverBoxLeft = minLeft;
		}
		if(hoverBoxLeft>0){
			if(_greenBarTimer){
				clearInterval(_greenBarTimer);
			}

			moveGreenBar(barLeft, hoverBoxLeft);
		}
	}
	greenBar.style.width = greenBarWidth+'px';

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

	if(!_isGreenBarMoving){
		_isGreenBarMoving = true;
	}


	let translateDiff = lastTranslate - translate;
	translateDiff = +translateDiff;

	let deltaTranslate = translateDiff;

	if(translateDiff<0){
		translateDiff = -translateDiff;
	}
	let isLargeJump = false;
	if(translateDiff>15){
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


		let barLeft = getGreenBarTranslateX(greenBar);



		//hoverBoxLeft = barLeft-deltaTranslate;

		hoverBoxLeft = ((slideIndex*slideWidth) + translate)+slideOffset-12;

		if(hoverBoxLeft < minLeft){
			hoverBoxLeft = minLeft;
		}

		if(hoverBoxLeft > maxLeft){
			hoverBoxLeft = maxLeft;
		}

		if(isLargeJump){
			console.log('large jump '+translate);
			_greenBarDuration = 500;
			_isGreenBarMoving = false;

			if(barLeft<0){
				barLeft = 0;
			}
			if(hoverBoxLeft<0){
				hoverBoxLeft = minLeft;
			}

			if(_greenBarTimer){
				clearInterval(_greenBarTimer);
			}

			moveGreenBar(barLeft, hoverBoxLeft+12);

			//_greenBarLeft = hoverBoxLeft;
		}else{
			if(_greenBarTimer){
				clearInterval(_greenBarTimer);
			}
			_greenBarLeft = hoverBoxLeft;
			if(_greenBarLeft<0){
				_greenBarLeft = minLeft;
			}else if(_greenBarLeft>maxLeft){
				_greenBarLeft = maxLeft;
			}
		}

	}
}

function tempRepositionGreenBar(elParent, hoverBoxPosition){
	let greenBar = elParent.querySelector('[list-line-js]');
	let activeBox = elParent.querySelector('.swiper-slide.is-hover');
	let slideWidth = 0;

	let sliderBox = document.querySelector('.swiper-slide:not(.is-hover)');
	if(sliderBox){
		slideWidth = 	sliderBox.offsetWidth + 6;
	}

	if(activeBox){
		lastActiveHoverBox = activeBox;
		let hoverBoxLeft = 0;
		if(greenBar){

			hoverBoxLeft = (236*hoverBoxPosition) + 83;

			if(window.innerWidth<1449 && hoverBoxPosition == 4){
				hoverBoxLeft -= 55;
			}

			let transformVal = 'transform: translateX('+hoverBoxLeft+'px);';

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
	const el = lastActiveHoverBox,
		elParent = el.closest('[list-parent-js]'),
		greenBar = elParent.querySelector('[list-line-js]');

	if(currentBannerTimeout){
		clearTimeout(currentBannerTimeout);
	}

	currentBannerTimeout = window.setTimeout(function(){
		showBanner(__ev.target);
	}, 1000);

}

function onShowBannerLeave(__ev){
	window.clearTimeout(currentBannerTimeout)
}

function showBanner(_el, isSkip = false, target = false){

/*	if(true){
		return;
	}*/

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
			//bannerWrapper.innerHTML = bottomBanner;

			document.querySelector('#site_modal').innerHTML = bottomBanner;
			openSlideModal(target);
			initSimilarSiteEvents();
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
		document.body.classList.remove('is_open');
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

			document.body.classList.add('is_open');
		}
	}


	if(window.innerWidth <= 1023) {
		hideScrollContainer.forEach((val, idx) => {
			val.classList.add("is-hideScroll");
		});
	}

	markFavourites();
	markLikesDislikes();
}

function initSimilarSiteEvents(){
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

	homeData = getWithExpiry("homepage_data_"+dataTime+'_'+currentLang);
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
	el.classList.toggle('is-active');
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
