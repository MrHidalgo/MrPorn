class A2ZPopup{
	constructor(data) {
		this.data = data.categories;
		this.popular = data.popular;
		this.currentLetter = '';
		this.letters = []
		this.categories = []
		this.filteredCategories = []
		this.selectedCategoryLink = ''
		this.headerViewActions = document.querySelector('.header__view-actions')
		this.a2zContainer = document.querySelector('#a2z-modal .micromodal-container')

		this.processA2ZData();
		// this.init();

		let parent = this

		document.querySelector('.sort__toggle')?.addEventListener('click', function(){
			// document.querySelector('.search__close')?.click()
			document.querySelector('[search-mobile-js]')?.classList.remove("is-open");
			parent.showA2ZPopup()
		});

		// this.popup = document.querySelector('.a2z-popup');
		// this.popupClose = document.querySelector('.a2z-popup__close');
		// this.popupOpen = document.querySelector('.a2z-popup__open');
		//
		// this.popupOpen.addEventListener('click', this.openPopup.bind(this));
		// this.popupClose.addEventListener('click', this.closePopup.bind(this));
	}

	showA2ZPopup(){
		let parent = this
		if (!document.querySelector("#a2z-modal")) {
			let modalHTML = this.generateA2ZPopupContent()
			document.body.insertAdjacentHTML('beforeend', modalHTML);
			this.addA2ZPopupListeners()
			this.initCategoryEvents()
		}



		if(isMobileOrTablet){
			let a2zModal = document.querySelector('#a2z-modal');
			a2zModal?.classList.add('is-open')

			if(parent.headerViewActions){
				bodyScrollLock.enableBodyScroll(parent.headerViewActions)
			}
			if(parent.a2zContainer){
				bodyScrollLock.disableBodyScroll(parent.a2zContainer)
			}

			document.querySelector('#a2z-modal .micromodal-close')?.addEventListener('click', function(evt){
				a2zModal.classList.remove('is-open')
				if(parent.a2zContainer){
					bodyScrollLock.enableBodyScroll(parent.a2zContainer)
				}
				document.documentElement.classList.remove('is-hideScroll')
				document.body.classList.remove('is-hideScroll')
			})
		}else{

			MicroModal.show('a2z-modal',{
				onShow: function (){
					if(parent.headerViewActions){
						bodyScrollLock.enableBodyScroll(parent.headerViewActions)
					}
					if(parent.a2zContainer){
						bodyScrollLock.disableBodyScroll(parent.a2zContainer)
					}
					document.body.classList.add('is-hideScroll')

					let filterInput = document.querySelector('#filter_tag_input')
					filterInput?.setAttribute('tabindex', '-1');
					filterInput?.blur()
				},
				onClose: function (){
					document.querySelector('#a2z-modal').remove()
					document.documentElement.classList.remove('is-hideScroll')
					document.body.classList.remove('is-hideScroll')

					if(parent.a2zContainer){
						bodyScrollLock.disableBodyScroll(parent.a2zContainer)
					}
				}
			});
		}


	}

	addA2ZPopupListeners(){
		let parent = this
		document.querySelector('#filter_tag_input')?.addEventListener('input', debounce(function (evt) {
			let filter = evt.target.value.toLowerCase().trim();
			if (filter == '') {
				if(parent.currentLetter === ''){
					parent.updateCategories(parent.categories, true);
				} else if(parent.currentLetter === 'popular'){
					parent.updateCategories(parent.popular, true);
				} else{
					parent.updateCategories(parent.data[parent.currentLetter], true);
				}
				return;
			}
			// parent.filteredCategories = parent.filterCategories(filter);
			parent.filteredCategories = parent.searchCategories(filter);

			parent.updateCategories(parent.filteredCategories);
		}));

		document.querySelectorAll('.a2z-letter-item').forEach(letter => {
			letter.addEventListener('click', function(evt){
				parent.currentLetter = evt.target.dataset.letter;
				document.querySelector('.a2z-letter-item.active')?.classList.remove('active');
				evt.target.classList.add('active')

				if(parent.currentLetter === ''){
					parent.updateCategories(parent.categories, true);
					return
				} else if(parent.currentLetter === 'popular'){
					parent.updateCategories([], true);
				} else{
					parent.updateCategories(parent.data[parent.currentLetter]);
				}
			});
		});

		document.querySelector('.a2z-reset').addEventListener('click', function(){
			document.querySelector('.a2z-letter-item.active')?.classList.remove('active');
			document.querySelector('.a2z-letter-item.all')?.classList.add('active')

			document.querySelector('#filter_tag_input').value = '';
			parent.currentLetter = '';
			parent.updateCategories(parent.categories, true);
			parent.selectedCategoryLink = '';
		});
		document.querySelector('.a2z-apply').addEventListener('click', function(evt	){
			evt.target.disabled = true;
			if(parent.selectedCategoryLink === ''){
				MicroModal.close('a2z-modal');
				return;
			}
			window.location.href = parent.selectedCategoryLink;
		});
	}

	processA2ZData(){
		for (const key in this.data) {
			if (this.data.hasOwnProperty(key)) {
				this.letters.push(key);
				this.categories = this.categories.concat(this.data[key]);
				this.categories.sort();
			}
		}

		this.letters.sort();
	}

	searchCategories(filter){
		let filteredCategories = [...this.categories];
		filteredCategories = filteredCategories.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()));

		filteredCategories.forEach((item, index) => {
			item.index = index;
		});

		const premiumItems = filteredCategories.filter(item =>
			item.title.toLowerCase().includes("premium") &&
			item.title.toLowerCase().includes(filter.toLowerCase())
		);

		let nonPremiumItems = filteredCategories.filter(item => !(item.title.toLowerCase().includes("premium") &&
			item.title.toLowerCase().includes(filter.toLowerCase()))); // Remove 'Premium' items
		nonPremiumItems = nonPremiumItems.sort((a, b) => {
			return a.index - b.index;
		});
		filteredCategories = premiumItems.concat(nonPremiumItems);

		return filteredCategories;
	}

	filterCategories(filter){
		let filteredCategories = [...this.categories];
		filteredCategories = filteredCategories.sort((a, b) => {

			const titleA = a.title.toLowerCase();
			const titleB = b.title.toLowerCase();

			let posA = titleA.indexOf(filter);
			let posB = titleB.indexOf(filter);


			// Strings with the search term come first
			if (posA !== -1 && posB === -1) return -1;
			if (posA === -1 && posB !== -1) return 1;

			// If both contain the term, sort by position
			if (posA !== -1 && posB !== -1) return posA - posB;

			// Otherwise, keep the original order
			return a.order - b.order;
		});

		filteredCategories.forEach((item, index) => {
			item.index = index;
		});

		const premiumItems = filteredCategories.filter(item =>
			item.title.toLowerCase().includes("premium") &&
			item.title.toLowerCase().includes(filter.toLowerCase())
		);

		let nonPremiumItems = filteredCategories.filter(item => !(item.title.toLowerCase().includes("premium") &&
			item.title.toLowerCase().includes(filter.toLowerCase()))); // Remove 'Premium' items
		nonPremiumItems = nonPremiumItems.sort((a, b) => {
			return a.index - b.index;
		});
		filteredCategories = premiumItems.concat(nonPremiumItems);

		return filteredCategories;
	}

	generateA2ZPopupContent(){
		const popupContent = `
		  <div class="micromodal micromodal-slide" id="a2z-modal" aria-hidden="false">
			  <div class="micromodal-overlay" tabindex="-1">
				<div class="micromodal-container custom-scrollbar" role="dialog" aria-modal="true" aria-labelledby="boogie-title">
				  <div class="micromodal-content a2z-content">
					  <div class="micromodal-header">
							<div class="micromodal-title" id="boogie-title">
								<div class="micromodal-title-text">A-Z Category List</div>
							</div>
							<div class="a2z-header">
								${this.renderA2ZLetters()}

								<div class="filter_tag">
									<input placeholder="Type to search..." type="text" id="filter_tag_input" autocomplete="off"/>
								</div>
							</div>


							<div class="micromodal-close" data-micromodal-close="">
								<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0.51 0.51 22.99 22.99" width="16px" height="16px">
									<path d="M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z"></path>
									<path d="M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z"></path>
								</svg>
							</div>
					  </div>

					  <div class="micromodal-body">
							${this.renderCategories()}
					  </div>
					  <div class="micromodal-footer">
							<button class="btn btn-secondary a2z-reset">Reset all</button>
							<button class="btn btn-success a2z-apply progress-button">
								<span class="progress-spinner"></span>
								Apply
							</button>
						</div>
					</div>
				</div>
			  </div>
			</div>
		`;

		return popupContent;
	}

	renderA2ZLetters(){
		let letters = this.letters.map(letter => {
			return `<li class="a2z-letter-item" data-letter="${letter}">${letter}</li>`;
			});
		let a2ZLetterContent = `<ul class="a2z-letters-container">
			<li class="a2z-letter-item popular" data-letter="popular">Popular</li>
			<li class="a2z-letter-item all" data-letter="">#</li>
			${letters.join('')}
		</ul>`;
		return a2ZLetterContent
	}

	renderPopular(){
		let popular = this.popular.map(category => {
			return `<button class="a2z-btn a2z-category-item a2z-popular-item" data-link="${category.link}">${category.title}</button>`;
		});
		return popular.join('')
	}
	renderCategories(){
		let currentCategories = [];
		if(this.currentLetter === 'popular'){
			currentCategories = [];
		}else if(this.currentLetter !== ''){
			currentCategories = this.data[this.currentLetter] ?? [];
		}else{
			currentCategories = this.categories;
		}



		let popular = []
		if(this.currentLetter === 'popular' || this.currentLetter === ''){
			popular = this.popular.map(category => {
				return `<button class="a2z-btn a2z-category-item a2z-popular-item" data-link="${category.link}">${category.title}</button>`;
			});
		}
		let categories = currentCategories.map(category => {
			return `<button class="a2z-btn a2z-category-item" data-link="${category.link}">${category.title}</button>`;
		});
		let a2ZCategoryContent = `<div class="a2z-categories-container">${popular.join('')}${categories.join('')}</div>`;
		return a2ZCategoryContent
	}

	updateCategories(categories, isPopular = false){
		let popular = []
		if(isPopular){
			popular = this.popular.map(category => {
				return `<button class="a2z-btn a2z-category-item a2z-popular-item" data-link="${category.link}">${category.title}</button>`;
			});
		}
		let categoriesList = categories.map(category => {
			return `<button class="a2z-btn a2z-category-item" data-link="${category.link}">${category.title}</button>`;
		});
		document.querySelector('.a2z-categories-container').innerHTML = popular.join('') + categoriesList.join('');
		this.initCategoryEvents()
	}

	initCategoryEvents(){
		let parent = this;
		document.querySelectorAll('.a2z-category-item').forEach(category => {
			category.addEventListener('click', function(evt){
				document.querySelector('.a2z-category-item.active')?.classList.remove('active');

				let cat = evt.target;
				cat.classList.toggle('active');
				if(cat.classList.contains('active')){
					parent.selectedCategoryLink = cat.dataset.link;
				}else{
					parent.selectedCategoryLink = '';
				}
			});
		});
	}
}
