const initCategoriesPage = () => {
	document.querySelectorAll('.categories-tags-item').forEach((tagElement)=>{
		let tag =  tagElement.dataset.tag
		tagElement.addEventListener('click', function(evt){
			if(tag){


				let tagSection = document.querySelector('.tag-section.tag-'+tag);
				let headerOffset = isMobileOrTablet ? 120 : 0;
				let elementPosition = tagSection.getBoundingClientRect().top;
				let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				});
			}
		});
	});

	document.querySelectorAll('.tag-section-more').forEach((moreElement)=>{
		moreElement.addEventListener('click', function(evt){
			let tagSection = evt.target.parentNode;
			if(tagSection){
				tagSection.classList.add('show_all')
			}
		});
	})
}
