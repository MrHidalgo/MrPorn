class CategoryTypeFilter{
	constructor(){
		this.reviewTypeSlider = document.querySelector('.review_type_slider');
		this.rtsThumb = document.querySelector('.review_type_slider_thumb');
		this.currentFilter = 'all'
		this.typeFilter = document.querySelector('.review_type_trigger');
		this.reportBtn = document.querySelector('.additional_action.report');
		this.typeTriggerBtn = document.querySelector('.review_type_trigger-outer');
		this.additionalActions = document.querySelector('.review_type_trigger-dropdown')
		this.reportModal = new ReportModal()
		this.timeoutId  = null

		this.init();
	}

	init(){
		if(!isMobileOrTablet){
			this.parentContainer = document.querySelector('.category_header');
			if(document.body.classList.contains('category')){
				this.initFilterEvents()
			}

		}
		this.checkAvailability()

		let parent = this

		this.typeFilter?.addEventListener('click', function (evt) {
			parent.showFilterPopup()
		});

		// this.reportBtn?.addEventListener('click', function (evt) {
		// 	evt.preventDefault();
		// 	parent.reportModal.initReviewReportModal()
		// });

		this.reportModal.initCategoryReportModal()

		let timeoutId;

		if(this.additionalActions){

			this.typeTriggerBtn?.addEventListener('mouseover', () => {
				clearTimeout(timeoutId);
				this.additionalActions.classList.add('open');
			});
			this.typeTriggerBtn?.addEventListener('mouseout', () => {
				timeoutId = setTimeout(() => {
					this.additionalActions.classList.remove('open');
				}, 700); // 2000 milliseconds = 2 seconds
			});
			this.typeTriggerBtn?.addEventListener('click', () => {

				if(this.additionalActions.classList.contains('open')){
					clearTimeout(timeoutId);
					this.additionalActions.classList.remove('open');
				}else {
					this.additionalActions.classList.add('open');
				}
			});
		}

	}







	getFilterOptions(){
		return document.querySelector('.review_type_slider')?.innerHTML
	}


}
