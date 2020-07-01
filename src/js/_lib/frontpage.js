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
	console.log(siteItem);

	let slideHtml = '<div class="swiper-slide">'+
											'<a class="list__box" list-box-js href="'+siteItem['link']+'" data-id="'+siteItem.id+'" style="background-image: url(http://mpg.c2136.cloudnet.cloud/'+siteItem.thumb+')">'+
													'<div class="list__box-overlay"></div>'+
																'<div class="list__box-border"></div><img class="list__box-logo" src="img/img-brazzers-logo.svg" alt="">'+
																				'<div class="list__box-details">'+
																					'<div class="list__box-details-left">'+
																						'<button class="list__box-external" type="button"><i class="icon-font icon-out"></i></button>'+
																						'<p class="list__box-details-title">'+siteItem.name+'</p>'+
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
