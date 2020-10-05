var webworkerFrontpage;

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

	let url = 'http://mpg.c2136.cloudnet.cloud/wp-json/mpg/home/';
	if(currentLang!='en'){
		url = 'http://mpg.c2136.cloudnet.cloud/wp-json/mpg/home/?lang='+currentLang;
	}

	homeData = getWithExpiry("home_data_1");

	if(homeData){
		renderAllOtherCategories();
	}else{
		fetch(url)
			.then(res => res.json())
			.then((out) => {
				homeData = out;

				setWithExpiry("home_data_1", homeData, 30*60*1000);

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
		let siteThumb = siteItem.thumb;
		let siteLogo = (siteItem.logo)?siteItem.logo.src:'';

		let slideHtml = '<div class="swiper-slide" data-siteid="'+siteId+'" category_list_'+index+'>'+
			'<a class="list__box nolazy" list-box-js href="'+siteLink+'" target="_blank" data-id="'+siteId+'" style="background-image: url('+siteThumb+')">'+
			/*'<div class="list__box-overlay"></div>'+*/
			'<div class="list__box-border"></div><img class="list__box-logo nolazy" src="'+siteLogo+'" alt=""/>'+
			'<div class="list__box-details">'+
			'<div class="list__box-details-left">'+
			'<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>'+
			'<p class="list__box-details-title"><a href="'+siteLink+'" target="_blank">'+siteName+'</a></p>'+
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
			'<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>'+
			'<p class="list__box-details-title">'+siteName+'</p>'+
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
		let siteLogo = siteItem.logo?siteItem.logo.src:'';
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
					'<video preload="none" poster="'+bannerVideoPoster.url+'" video-js>'+
					'<source src="'+bannerVideo.url+'" type="'+bannerVideo.mime_type+'">'+
					'</video>' +
					'<a class="list__specification-play" video-toggle-js><i class="icon-font icon-play-button" video-play-js></i></a>' +
					'<a class="list__specification-pause" video-pause-js><i class="icon-font icon-pause"></i></a>'+
					'</div>'+
					'</div>';
			}
		}

		let moreSites = '';
		let moreSiteCount = 0;

		homeData.categories[category].sites.map(function (moreSite, index) {
			if(moreSiteCount<6 && moreSite.id!=siteId){
				let moreSiteLogo = moreSite.logo ? moreSite.logo.src: '';

				moreSites +='<a class="list__box" list-box-more-js href="'+moreSite.link+'" data-id="'+moreSite.id+'" data-count="1" style="background-image: url('+moreSite.banner_image+')">'+
					/*'<div class="list__box-overlay"></div>'+*/
					'<div class="list__box-border"></div><img class="list__box-logo" src="'+moreSiteLogo+'" alt=""/>' +
					'</a>';

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
			'<div><a class="list__specification-read nav_link" href="'+siteItem.link+'">READ REVIEW</a></div>'+
			'<div class="list__specification-action-desc">'+
			'<p>'+tagLIne+' <a href="#">READ MORE</a></p>'+
			'</div>'+
			'<div class="list__specification-action-skip"><a class="list__specification-circle list__specification-skip" data-id="'+siteId+'" spec-skip-js><i class="icon-font icon-point"></i><span>Skip</span></a></div>'+
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
			'<div>' +
			moreSites+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>';

			return bannerHtml;
	}

	return false;
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
			'<a class="nav_link" href="'+site.link+'">' +
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
											'<div>'+
												'<p>'+categoryData.title+'</p><span>'+categoryData.tagline+'</span>'+
											'</div>'+
										'</div>'+
                    '<a class="list__btn" href="'+categoryData.link+'">SEE&nbsp;<span>'+categoryData.count+' MORE</span><i class="icon-font icon-arrow-angle"></i></a>'+
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
											'<div class="swiper-wrapper" data-category="'+categoryData.id+'" data-count="'+categoryData.count+'" data-slidecount="'+categoryData.site_limit+'">'+
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

const boxHover = () => {
	const swiperSlides = document.querySelectorAll('.swiper-slide[data-init="0"]'),
		listBoxBody = document.querySelectorAll('.list__box-body');

	let tOut = null,
		hoverBool = false;

	for(let i = 0, len = swiperSlides.length; i < len; i++) {
		swiperSlides[i].addEventListener('mouseenter', function(ev) {
			if(window.innerWidth >= 1280) {
				const el = ev.currentTarget,
					elParent = el.closest('[list-parent-js]'),
					elBox = el.querySelector('.list__box'),
					lineInd = elParent.querySelector('[list-line-js]');


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


				/*setTimeout(function() {

				}, 0);*/

				let transformVal = '';

				if(lineInd.getAttribute("style")) {
					let val = lineInd.getAttribute("style");


					if(val.indexOf(';') === -1) {
						transformVal = val;
					} else {
						transformVal = val.substring(0, val.indexOf(';'));
					}
				}



				if(hoverBool) {
					el.classList.add('is-hover');


					tOut = setTimeout(function() {
						var hoverBounds = elBox.getBoundingClientRect();
						var boxParentBou
						var _lineLeft = hoverBounds.left - elParent.getBoundingClientRect().left;
						console.log(hoverBounds, );
						//transformVal = 'transform: translateX('+_lineLeft+'px)';
						transformVal = 'left: '+_lineLeft+'px';

						lineInd.setAttribute('style', transformVal + ';width: 189px');
					}, 750);
				} else {


					hoverBool = true;
					el.classList.add('is-hover');

					tOut = setTimeout(function() {
						var hoverBounds = elBox.getBoundingClientRect();
						console.log(hoverBounds.left, );
						var _lineLeft = hoverBounds.left - elParent.getBoundingClientRect().left;
						//transformVal = 'transform: translateX('+_lineLeft+'px)';
						transformVal = 'left: '+_lineLeft+'px';

						lineInd.setAttribute('style', transformVal + ';width: 189px');
					}, 750);
				}


			}
		}, false);

		swiperSlides[i].setAttribute('data-init', '1');

		swiperSlides[i].addEventListener('mouseleave', function(ev) {
			if(window.innerWidth >= 1280) {
				const el = ev.currentTarget,
					elParent = el.closest('[list-parent-js]'),
					lineInd = elParent.querySelector('[list-line-js]');

				let transformVal = '';

				if(lineInd.getAttribute("style")) {
					let val = lineInd.getAttribute("style");


					if(val.indexOf(';') === -1) {
						transformVal = val;
					} else {
						transformVal = val.substring(0, val.indexOf(';'));
					}
				}

				clearTimeout(tOut);
				el.classList.remove('is-hover');


				lineInd.setAttribute('style', transformVal + ';width: 64px');
			}
		}, false);
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
};

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

	homeData = getWithExpiry("home_data_1");
	if(homeData){
		if(document.body.classList.contains('home')) {
			renderAllOtherCategories();
		}
	}else{
		if(!navigator.userAgent.toLowerCase().includes('lighthouse')){
			if(document.body.classList.contains('home')){
				if (typeof(Worker) !== "undefined") {
					// Yes! Web worker support!
					// Some code.....
				} else {
					// Sorry! No Web Worker support..
				}

				if (typeof(w) == "undefined") {
					webworkerFrontpage = new Worker("/wp-content/themes/mpg/js/worker.js");
				}
				webworkerFrontpage.onmessage = function(event) {
					//document.getElementById("result").innerHTML = event.data;
					console.log('Webworker data');
					console.log(event.data);

					loadHomeData();
				};
			}
		}
	}


}
