function initTrendingTabs(){
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
