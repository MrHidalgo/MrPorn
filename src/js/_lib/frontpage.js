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
	let url = 'http://mpg.c2136.cloudnet.cloud/wp-json/mpg/home/';

	fetch(url)
		.then(res => res.json())
		.then((out) => {
			console.log('Checkout this JSON! ', out);
			homeData = out;
		})
		.catch(err => { throw err });
}

function renderHompageSiteSlide(category, index){

	let siteItem = homeData.categories[category].sites[index];
	if(siteItem){
		let siteId = siteItem.id;
		let siteLink = siteItem.link;
		let siteName = siteItem.name;
		let siteThumb = siteItem.thumb;

		let slideHtml = '<div class="swiper-slide" data-index="'+index+'">'+
			'<a class="list__box" list-box-js href="'+siteLink+'" data-id="'+siteId+'" style="background-image: url(http://mpg.c2136.cloudnet.cloud/'+siteThumb+')">'+
			'<div class="list__box-overlay"></div>'+
			'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-brazzers-logo.svg" alt="">'+
			'<div class="list__box-details">'+
			'<div class="list__box-details-left">'+
			'<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>'+
			'<p class="list__box-details-title">'+siteName+'</p>'+
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
			'</a>'+
			'</div>';
		return slideHtml;
	}
	return false;

}

function renderSiteHoverContent(category, index){
	let siteItem = homeData.categories[category].sites[index];
	if(siteItem) {
		let siteId = siteItem.id;
		let siteLink = siteItem.link;
		let siteName = siteItem.name;
		let siteThumb = siteItem.thumb;

		var hoverContent = '<div class="list__box-details-left">'+
			'<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>'+
			'<p class="list__box-details-title">'+siteName+'</p>'+
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
		'</div>';

		return hoverContent;
	}

	return false;
}

function renderSiteBottomBanner(category, index){
	let siteItem = homeData.categories[category].sites[index];
	if(siteItem){
		let bannerType = siteItem.banner_type;
		let bannerImage = siteItem.banner_image;
		let bannerVideo = siteItem.banner_video;
		let bannerVideoPoster = siteItem.banner_video_poster;

		var bannerRight = '';
		if(bannerType=='image'){
			bannerRight = '<div class="list__specification-right">' +
				'<div><img src="'+bannerImage+'"></div>' +
				'</div>';
		}else{
			bannerRight = '<div class="list__specification-right">'+
				'<div video-parent-js>'+
				'<!--video(preload="none" video-js)-->'+
				'<video preload="none" poster="'+bannerVideoPoster.url+'" video-js>'+
				'<source src="'+bannerVideo.url+'" type="'+bannerVideo.mime_type+'">'+
				'</video>' +
				'<a class="list__specification-play" href="#" video-toggle-js><i class="icon-font icon-play-button" video-play-js></i></a><a class="list__specification-pause" href="#" video-pause-js><i class="icon-font icon-pause"></i></a>'+
				'</div>'+
				'</div>';
		}

		var bannerHtml = '<div class="list__specification list__specification--video" data-id="1">' +
			'<a class="list__specification-close" href="#"><i class="icon-font icon-close"></i></a>'+
			'<div>'+
			'<div class="list__specification-header">' +
			'<img class="list__specification-logo" src="img/img-reality-kings.png" srcset="img/img-reality-kings@2x.png 2x" alt="">' +
			'<a class="list__specification-close" href="#">' +
			'<i class="icon-font icon-close"></i>' +
			'</a>' +
			'</div>'+
			'<div class="list__specification-left">'+
			'<div>' +
			'<img class="list__specification-logo" src="img/img-reality-kings.png" srcset="img/img-reality-kings@2x.png 2x" alt="">'+
			'<div class="list__specification-action" spec-actionNode-js>'+
			'<div><a class="list__specification-visit" href="#">VISIT WEBSITE</a></div>'+
			'<div><a class="list__specification-read" href="#">READ REVIEW</a></div>'+
			'<div class="list__specification-action-desc">'+
			'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eius mod tempor incididunt ut labore et dolore magna eutin... <a href="#">READ MORE</a></p>'+
			'</div>'+
			'<div class="list__specification-action-skip"><a class="list__specification-circle list__specification-skip" href="#" data-id="1" spec-skip-js><i class="icon-font icon-point"></i><span>Skip</span></a></div>'+
			'<div class="list__specification-action-circle"><a class="list__specification-circle list__specification-like" href="#" data-like="1" spec-like-js><i class="icon-font icon-like"></i><span>Like</span></a></div>'+
			'<div class="list__specification-action-circle"><a class="list__specification-circle list__specification-dislike" href="#" data-dislike="1" spec-dislike-js><i class="icon-font icon-like"></i><span>Dislike</span></a></div>'+
			'<div class="list__specification-action-circle">'+
			'<div class="c-popper"><a class="list__specification-circle list__specification-favorites" href="#" data-favorites="1" spec-favorites-js><i class="icon-font icon-star-fill"></i><i class="icon-font icon-star"></i><span>Favorites</span></a>'+
			'<div class="c-poppertext">'+
			'<u>Add To Favourites</u>'+
			'<u>Remove From Favourites</u>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<p class="list__specification-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.</p>'+
			'</div>'+
			'</div>'+
			bannerRight+
			'<div class="list__specification-more">'+
			'<div>'+
			'<p>More Like This</p>'+
			'</div>'+
			'<div><a class="list__box" list-box-more-js href="#" data-id="1" data-count="1" style="background-image: url(&quot;img/img-view-bruzzers.png&quot;)">'+
			'<div class="list__box-overlay"></div>'+
			'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-brazzers-logo.svg" alt=""></a><a class="list__box" list-box-more-js href="#" data-id="1" data-count="2" style="background-image: url(&quot;img/img-realitykings-view.png&quot;)">'+
			'<div class="list__box-overlay"></div>'+
			'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-reliaty-kings-logo.png" alt=""></a><a class="list__box" list-box-more-js href="#" data-id="1" data-count="3" style="background-image: url(&quot;img/img-xvideo-red-view.png&quot;)">'+
			'<div class="list__box-overlay"></div>'+
			'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-xvideo-red-logo.png" alt=""></a><a class="list__box" list-box-more-js href="#" data-id="1" data-count="4" style="background-image: url(&quot;img/img-view-pornhub-premium.png&quot;)">'+
			'<div class="list__box-overlay"></div>'+
			'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-pornhub-premium-logo.png" alt=""></a><a class="list__box" list-box-more-js href="#" data-id="1" data-count="5" style="background-image: url(&quot;img/img-bang-bros-view.png&quot;)">'+
			'<div class="list__box-overlay"></div>'+
			'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-bangbros-logo.png" alt=""></a><a class="list__box" list-box-more-js href="#" data-id="1" data-count="6" style="background-image: url(&quot;img/img-mofos-view.png&quot;)">'+
			'<div class="list__box-overlay"></div>'+
			'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-mofos-logo.png" alt=""></a>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>';

			return bannerHtml;
	}

	return false;
}
