let pauseHoverAnimation = false;

let trigger;

const modal = document.querySelector('.modal');

let homeMainContainer = document.querySelector('.c-grid--inner');
let isPopVisible = false;
let popover = document.querySelector('.popover');
let popoverOuter = document.querySelector('.popover-outer');

let popoverTitle;
let popoverLink;
let popoverTagline;

let categoryContainers = [];

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
					let tagLine = hoverTarget.querySelector('.list__box__item-tagline');
					let _siteName = hoverTarget.querySelector('.list__box__item-link');

					let siteId = hoverTarget.dataset.id;
					let siteCategory = hoverTarget.dataset.category;
					let siteIndex = hoverTarget.dataset.index;

					let siteName = _siteName.innerHTML;
					let siteTagline = tagLine.innerHTML;
					siteTagline = siteTagline.replace("\\", "").replace("\\", "");
					let siteReviewLink = _siteName.getAttribute("href");;
					let siteFx = tagLine.dataset.fx;
					let siteFy = tagLine.dataset.fy;

					var wallDimensions = homeMainContainer.getBoundingClientRect();
					var wallX = wallDimensions.left;
					var wallY = wallDimensions.top;
					var hoverTargetBounds = hoverTarget.getBoundingClientRect();
					var popW = hoverTargetBounds.width - 7;
					var popY =  hoverTargetBounds.top - wallY-10;
					var popX = hoverTargetBounds.left +7 - wallX;

					popover.style.display = 'block';
					popover.style.top = popY+'px';
					popover.style.left = popX+'px';
					popover.style.width = popW+'px';

					if(!popoverOuter){
						popover.innerHTML = '<div class="popover-outer">\n' +
							'            <div class="popover-title deIcon">\n' +
							'                    <a class="popover-title-a link direct_1 step_1_" target="_blank" href=""></a>\n' +
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

				let categoryHead = document.querySelector('#category_wrapper_'+catId+' .list__box-head')
				if(categoryHead){
					categoryHead.classList.add('shake');
					setTimeout(function (){
						categoryHead.classList.remove('shake');
					}, 4000);
				}

				/*let elParent = document.querySelector('.list__box-wrapper[data-name="category_'+catId+'"]');

				let scrollGreenBar = document.querySelector('.list__box-wrapper[data-name="category_'+catId+'"] .list__box-line');
				scrollGreenBar.setAttribute('style', 'background-color: #d5f34a;');

				setTimeout(function (){

					setTimeout(function (){
						scrollGreenBar.setAttribute('style', 'background-color: rgb(25, 26, 40);');

						setTimeout(function (){
							pauseHoverAnimation = false;
						}, 1000);
					}, 1000);
				}, 1300);*/
			}
		}
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

function addToFavourites(siteId){
	postRequest(ajaxEndpoint, {
		action:'add_to_fav',
		site:siteId
	}, function (res) {
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
