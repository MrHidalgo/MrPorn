class ScrollBoxShadows{
	constructor(element, scrollBox, topShadowClass = 'top-shadow', bottomShadowClass = 'bottom-shadow') {
		this.scrollContainer = document.querySelector(element);
		this.scrollBox = document.querySelector(scrollBox);
		this.topShadowClass = topShadowClass;
		this.bottomShadowClass = bottomShadowClass;

		if(this.scrollBox){
			this.init();
		}

	}

	init() {
		this.updateShadows();

		this.scrollBox.addEventListener('scroll', (e) => {
			this.updateShadows();
		});
	}

	updateShadows () {
		this.scrollContainer.classList.toggle(this.topShadowClass, this.scrollBox.scrollTop > 0);
		this.scrollContainer.classList.toggle(this.bottomShadowClass, this.scrollBox.scrollTop + this.scrollBox.clientHeight < this.scrollBox.scrollHeight - 5);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	new ScrollBoxShadows('.category_sites_description', '.category_description');
})
