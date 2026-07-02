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

function initHomepagePopover(){
	var SHOW_DELAY = 200;
	var container = document.querySelector('.c-grid--inner');
	if(!container) return;

	var showTimeout = null;
	var currentPopover = null;

	function buildPopover(target){
		removePopover();
		var isCategory = target.classList.contains('list__box-head');
		var titleEl = isCategory ? target.querySelector('.list__box-head-a') : target.querySelector('.list__box__item-link');
		var descEl = target.querySelector('.desc');
		if(!descEl || !descEl.textContent.trim()) return;

		var iconHtml = '';
		if(isCategory){
			var catIcon = target.querySelector('.icon-category');
			if(catIcon) iconHtml = '<i class="homepage-popover-icon ' + catIcon.className + '"></i>';
		} else if(titleEl){
			var iconClasses = Array.from(titleEl.classList).filter(function(c){ return c === 'deIcon' || c.indexOf('fx_') === 0 || c.indexOf('fy_') === 0; });
			if(iconClasses.length) iconHtml = '<i class="homepage-popover-icon ' + iconClasses.join(' ') + '"></i>';
		}

		var popover = document.createElement('div');
		popover.className = 'homepage-popover';
		popover.innerHTML = '<div class="homepage-popover-title">' + iconHtml + (titleEl ? titleEl.textContent : '') + '</div>' +
			'<div class="homepage-popover-desc' + (isCategory ? ' cat' : '') + '">' + descEl.textContent + '</div>';
		document.body.appendChild(popover);
		currentPopover = popover;

		// Position above the target
		var rect = target.getBoundingClientRect();
		var popRect = popover.getBoundingClientRect();
		var top = rect.top + window.scrollY - popRect.height - 8;
		var left = rect.left + window.scrollX + (rect.width / 2) - (popRect.width / 2);

		// Keep within viewport horizontally
		if(left < 8) left = 8;
		if(left + popRect.width > window.innerWidth - 8) left = window.innerWidth - popRect.width - 8;

		popover.style.top = top + 'px';
		popover.style.left = left + 'px';
		popover.style.opacity = '1';
	}

	function removePopover(){
		if(currentPopover){
			currentPopover.remove();
			currentPopover = null;
		}
	}

	function show(target){
		clearTimeout(showTimeout);
		if(!window.matchMedia('(min-width: 992px)').matches) return;
		showTimeout = setTimeout(function(){
			buildPopover(target);
			window.addEventListener('scroll', hide);
			window.addEventListener('resize', hide);
		}, SHOW_DELAY);
	}

	function hide(){
		clearTimeout(showTimeout);
		removePopover();
		window.removeEventListener('scroll', hide);
		window.removeEventListener('resize', hide);
	}

	function findPopoverTarget(el){
		return el.closest('.list__box-head') || el.closest('.list__box__item');
	}

	container.addEventListener('mouseenter', function(e){
		var target = findPopoverTarget(e.target);
		if(target) show(target);
	}, true);

	container.addEventListener('mouseleave', function(e){
		var target = findPopoverTarget(e.target);
		if(target) hide();
	}, true);
}

initHomeFunctions();
initHomepagePopover();
