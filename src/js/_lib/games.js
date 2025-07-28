function initGameCategoryVideos(){
	let catSites = document.querySelectorAll('.category_sites_item_thumb.has_video');

	for(let i = 0, len = catSites.length; i < len; i++) {
		if(isMobileOrTablet){
			catSites[i].removeEventListener('touchstart', onVideoCatEnter);
			catSites[i].addEventListener('touchstart', onVideoCatEnter, {passive: true});

		}else{
			catSites[i].removeEventListener('mouseleave', onVideoCatLeave);
			catSites[i].addEventListener('mouseleave', onVideoCatLeave, false);

			catSites[i].removeEventListener('mouseenter', onVideoCatEnter);
			catSites[i].addEventListener('mouseenter', onVideoCatEnter, false);
		}
	}
}

function onVideoCatEnter(ev){
	let oldVideo = document.querySelector('.category_video_item');
	if(oldVideo){
		oldVideo.remove();
	}

	let hoverCategory = ev.currentTarget;

	if(hoverCategory.classList.contains('category_sites_item_thumb')){
		let videoUrl = hoverCategory.dataset.video;
		let videoPosterUrl = hoverCategory.dataset.poster;

		let categoryVideo = '<video class="category_video_item" preload="none" autoplay loop playsinline muted poster="'+videoPosterUrl+'" video-js>'+
			'<source src="'+videoUrl+'" type="video/mp4">'+
			'</video>';

		hoverCategory.insertAdjacentHTML( 'beforeend', categoryVideo );

	}


}

function onVideoCatLeave(ev){
	let oldVideo = document.querySelector('.category_video_item');
	if(oldVideo){
		oldVideo.remove();
	}
}
