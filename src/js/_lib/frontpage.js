let pauseHoverAnimation = false;

const modal = document.querySelector('.modal');



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
			}
		}
	}

}

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

function initHomeFunctions(){
	initHomeTabs();
}
function initHomeTabs(){
	let tabs = document.querySelectorAll('.home-tabs');
	tabs.forEach((tabContainer)=>{
		tabContainer.querySelectorAll('.trending-tag-item').forEach((tag)=>{
			tag.addEventListener('click', function(evt){
				let tag = evt.currentTarget.dataset.tag;
				if(tag){
					tabContainer.querySelector('.trending-tag-item.active')?.classList.remove('active');
					tabContainer.querySelector('.trending-tag-item[data-tag="'+tag+'"]').classList.add('active');

					tabContainer.querySelector('.trending-tag-tab.active').classList.remove('active');
					tabContainer.querySelector('.trending-tag-tab.tab-'+tag).classList.add('active');
				}
			});
		})
	});
}

// Make functions globally available for non-module scripts
window.renderFavouriteButtons = renderFavouriteButtons;
window.getLikesAndDislikes = getLikesAndDislikes;
window.scrollToCategoryOnHome = scrollToCategoryOnHome;
window.removeFavourite = removeFavourite;
window.addToFavourites = addToFavourites;
window.onLike = onLike;
window.onDisLike = onDisLike;

// Call initHomeFunctions after all functions are exported globally
initHomeFunctions();
