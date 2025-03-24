const initCategoriesPage = () => {
	document.querySelectorAll('.categories-tags-item').forEach((tagElement)=>{
		let tag =  tagElement.dataset.tag
		tagElement.addEventListener('click', function(evt){
			if(tag){
				document.querySelector('.tag-section.tag-'+tag).scrollIntoView({
					behavior: 'smooth'
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
