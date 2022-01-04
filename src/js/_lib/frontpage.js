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
let popoverOuter = document.querySelector('.popover-outer');

let popoverTitle;
let popoverLink;
let popoverTagline;

let categoryContainers = [];



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
	categoryContainers = document.querySelectorAll('.list__box-list');

	if (!window.mobileAndTabletcheck()) {

		if(homeGridInner){
			categoryContainers.forEach((_container)=>{
				_container.onmouseleave = function (e){
					if(popover.style.display=='block'){
						popover.style.display = 'none';
					}
				}
			});

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

							if(!popoverOuter){
								popover.innerHTML = '<div class="popover-outer">\n' +
									'            <div class="popover-title deIcon">\n' +
									'                    <a class="popover-title-a link direct_1 step_1_" target="_blank" hreflang="en" href=""></a>\n' +
									'            </div>\n' +
									'            <div class="popover-content"></div>\n' +
									'        </div>';

								popoverTitle = popover.querySelector('.popover-title');
								popoverLink = popover.querySelector('.popover-title-a');
								popoverTagline = popover.querySelector('.popover-content');
							}


							popoverLink.innerHTML = siteName;
							popoverTitle.className = 'popover-title deIcon  fx_'+siteFx+' fy_'+siteFy+' fi'+siteId;
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

function renderFavouriteButtons(){
	let sitePreviewItems = document.querySelectorAll('.list__box__item-preview');
	sitePreviewItems.forEach((linkPreview)=>{
		let favI = '<i class="list__box__item-fav icon-star-fill" data-id="'+linkPreview.dataset.id+'" favorites-toggle-js></i>';
		linkPreview.insertAdjacentHTML('beforebegin', favI);
	});
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

				setTimeout(function (){

					setTimeout(function (){
						scrollGreenBar.setAttribute('style', 'background-color: rgb(25, 26, 40);');

						setTimeout(function (){
							pauseHoverAnimation = false;
						}, 1000);
					}, 1000);
				}, 1300);
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


function onRatingClick(){
	previewModal.querySelector('.list__rating').classList.add('active');
	setTimeout(function (){
		previewModal.querySelector('.list__rating').classList.remove('active');
	}, 2000);
}

let tOut = null;

let homeGridInner = document.querySelector(".c-grid--inner");


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

	var _isActive = document.querySelector('.list__box.is-active')
	if(_isActive){
		_isActive.classList.remove('is-active');
	}


	var _isOpen = document.querySelector('.list__specification.is-open')
	if(_isOpen && !isSkip){
		_isOpen.classList.remove('is-open');
		document.body.classList.remove('is_open');
	}

	markFavourites();
	markLikesDislikes();
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
