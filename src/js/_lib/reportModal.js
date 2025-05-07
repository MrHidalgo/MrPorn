class ReportModal{
	constructor() {
		this.lastRequestTime = 0;
		this.rateLimitTime = 5000; // 5 seconds
		this.reportData = [{
			tag: "broken",
			title: "Broken or incorrect Link",
			icon: "broken-link",
			desc: "If the link is incorrect or broken, please report it here."
		}, {
			tag: "inaccuracy",
			title: "Review inaccuracy",
			icon: "inaccuracy",
			desc: "If the site has materially changed and lacks something mentioned in this review, please report it here."
		}, {
			tag: "outdated_ss",
			title: "Outdated or inaccurate screenshot",
			icon: "screenshot",
			desc: "If the screenshot presented is different from how the site appears, please report it here."
		}, {
			tag: "incorrect_cat",
			title: "Inaccurate categorization",
			icon: "categories",
			desc: "If you think the site has been placed into the wrong category, please report it here."
		}, {
			tag: "spam",
			title: "Spam or malicious content",
			icon: "spam",
			desc: "If the website has changed significantly and you believe it is now malicious or spammy, please report it here."
		}, {
			tag: "exploit",
			title: "Underage content",
			icon: "age-limit",
			desc: 'Please report the website to the webhost, local law enforcement and the NCMEC (<a class="color-success boogie-link" href="https://www.missingkids.org" target="_blank" rel="noopener noreferrer">https://www.missingkids.org</a>) in addition to your report here.'
		}, {
			tag: "revenge",
			title: "Nonconsensual content",
			icon: "revenge",
			desc: "If you believe a website has revenge porn and shows non-consensual activity, report it to the web host and local law enforcement in addition to your report here."
		}, {
			tag: "feedback",
			title: "General Feedback",
			icon: "comment-bubble",
			desc: "If you have other feedback or information that doesn't fit into one of the above categories, please report it here."
		}, {
			tag: "recommendations",
			title: "Website Submission for ",
			headerTitle: "Website Submission for ",
			icon: "comment-bubble",
			desc: "Know a website in this niche we don't have? Submit it!",
			disclaimer: "If you know of a great website that isn't listed in this category and think it deserves a place here, Mr. Porn Geek would love to hear about it! Please provide the website URL, and I'll personally review it. If it's popular, has good content, and is updated regularly, we'll include it here.",
			hideInList: true
		} ]

		let bodyClasses = document.body.classList;

		if(bodyClasses.contains('category')){
			this.parentContainer = document.querySelector('.review_type_container');
			this.additionalActions = document.querySelector('.review_type_trigger-dropdown')
			this.typeTriggerBtn = document.querySelector('.review_type_trigger-outer');
			this.typeFilter = document.querySelector('.review_type_trigger');
			this.reviewTypeSlider = document.querySelector('.review_type_slider');
			this.type_status = this.parentContainer.querySelector('.review_type_slider_status');
			this.rtsThumb = this.parentContainer.querySelector('.review_type_slider_thumb');

			let activeFilter = document.querySelector('.review_type_container .option.active');

			this.selectedFilter = activeFilter ? activeFilter.dataset.type : 'all';
			this.selectedFilterTagline = activeFilter ? activeFilter.dataset.tip : '';
			this.selectedFilterTipX = 0
			this.selectedFilterTipW = 0
			this.filterPopupContent = ''

			this.addCategoryReportClickListeners()
		}


		if(bodyClasses.contains('single-sites')){
		 	this.title = document.querySelector('.review-title-line h1').innerHTML;
			this.addReviewReportClickListeners()
		}else if(bodyClasses.contains('category')){
			this.title = document.querySelector('.bread-crumb-links .category_title').innerHTML;
			this.reportData.splice(1, 2);
		}



	}

	initReviewReportModal() {
		this.addReviewReportClickListeners()
	}
	initCategoryReportModal() {
		this.addCategoryReportClickListeners()
	}


	addReviewReportClickListeners() {
		const reportBtn = document.querySelectorAll('.report-button');
		reportBtn.forEach(item => {
			item.addEventListener('click', (event) => {
				const tag = event.currentTarget.dataset.tag;
				this.injectReportReviewModal()
			});
		});
	}

	addCategoryReportClickListeners() {
		let parent  = this;
		const reportBtn = document.querySelectorAll('.additional_action.report');
		reportBtn.forEach(item => {
			item.addEventListener('click', (event) => {
				const tag = event.currentTarget.dataset.tag;
				this.injectReportReviewModal('', 'Report a Problem for')
			});
		});


		document.querySelector('.review_type_trigger.mobile')?.addEventListener('click', function (evt) {
			parent.showFilterPopup()
		});


		document.querySelector('.additional_action.recommendations')?.addEventListener('click', (event) => {
			this.injectReportReviewModal('recommendations', 'Website Recommendations for')
		});

		document.querySelector('.additional_action.feedback')?.addEventListener('click', (event) => {
			this.injectReportReviewModal('feedback', 'Send Feedback for')
		});

		this.checkAvailability()
		this.initTypeTriggerEvents();
		this.initFilterEvents()
	}

	initTypeTriggerEvents(){
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

	addReviewReportItemClickListeners() {
		const listItems = document.querySelectorAll('.boogie-list-item');
		listItems.forEach(item => {
			item.addEventListener('click', (event) => {
				const tag = event.currentTarget.dataset.tag;
				const desc = event.currentTarget.dataset.tag;
				this.showReportForm(tag)
				document.querySelector('.boogie-fields textarea').focus();
			});
		});
	}

	injectReportReviewModal(initialTag = '', headerTitle = 'Report a Review Feedback for') {
		let modalHTML = this.generateReportReviewContent(this.title, headerTitle)
		if(document.querySelector('#boogie-modal')){
			document.querySelector('#boogie-modal').innerHTML = modalHTML;
		}else{
			document.body.insertAdjacentHTML('beforeend', `<div class="micromodal micromodal-slide boogie-modal is-open" id="boogie-modal" aria-hidden="false">${modalHTML}</div>`);
		}

		if(initialTag == ''){
			this.addReviewReportItemClickListeners()
		}else{
			this.showReportForm(initialTag, true)
		}

		// Initialize and show the modal
		MicroModal.show('boogie-modal',{
			// awaitOpenAnimation: true,
			awaitCloseAnimation: true,
			onShow: function (){
				document.body.classList.add('is-hideScroll')
				// document.querySelector('#boogie-modal')?.remove()
			},
			onClose: function (){
				if(!isMobileOrTablet || window.innerWidth < 768){
					document.querySelector('#boogie-modal').remove()
				}
				document.body.classList.remove('is-hideScroll')
			}
		});
	}

	switchToReport(){
		let modalHTML = this.generateReportReviewContent(this.title, 'Report a Problem for')
		document.querySelector('#boogie-modal').innerHTML = modalHTML;
		this.addReviewReportItemClickListeners()

		// if(initialTag == ''){
		// 	this.addReviewReportItemClickListeners()
		// }else{
		// 	this.showReportForm(initialTag, true)
		// }
	}

	generateReportReviewContent(reviewName, headerTitle = 'Report a Review Feedback for'){

		const modalOuter = `<div class="micromodal micromodal-slide boogie-modal is-open" id="boogie-modal" aria-hidden="false"></div>`

		const modalHTML = `
		  <div class="micromodal-overlay" tabindex="-1">
					<div class="micromodal-container custom-scrollbar" role="dialog" aria-modal="true" aria-labelledby="boogie-title">
						<div class="micromodal-content boogie-issues-content">
							<div class="micromodal-header">
								<h4 class="micromodal-title" id="boogie-title">
									<span class="inline-icon icon-thumbsup"></span>

									<div class="micromodal-title-text">
										<span>${headerTitle}</span>
										<span id="report_review_title" class="color-primary">${reviewName}</span>
									</div>
								</h4>
								<div class="micromodal-close" data-micromodal-close="">
									<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0.51 0.51 22.99 22.99" width="24px" height="24px">
									<path d="M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z"></path>
									<path d="M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z"></path>
									</svg>
								</div>

							</div>

							<hr>

							<div class="micromodal-body">
							${this.getReportBodyContent()}
							</div>
						</div>
					</div>
			  </div>
		`;
		return modalHTML;
	}

	getReportBodyContent(){
		let reportItemsContent = '';
		this.reportData.forEach(item => {
			if(item.hideInList){
				return;
			}
			reportItemsContent += `<li class="boogie-list-item" data-icon="broken-link" data-tag="${item.tag}">
						<div class="boogie-list-text">
						  <span class="inline-icon icon-${item.icon}"></span>
						  <div>${item.title}</div>
						</div>
						<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">
							<path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>
						</svg>
					  </li>\n`;
		});

		let bodyContent = `<div class="color-secondary">
						  What's the issue?
						</div>

						<ul class="boogie-list">
							${reportItemsContent}
						</ul>`
		return bodyContent;
	}

	showReportForm(tag, changeBack = false) {
		let parent = this;
		let reviewTitle = this.title;
		let selectedTag = this.getDescriptionByTag(tag);
		let desc = selectedTag? selectedTag.desc: '';
		let reportType = selectedTag? selectedTag.title: '';

		let checkboxLabel = `I am submitting feedback for a ${reviewTitle} website review`;
		if(document.body.classList.contains('category')){
			checkboxLabel = 'I confirm and wish to proceed with my submission';
		}



		let reportFormContent = `<p>${desc}</p>

        <div class="boogie-disclaimer">
        ${selectedTag?.disclaimer || "<p>Please note that Mr. Porn Geek doesn't manage any of the third-party platforms he reviews. If you have a problem with payments, content or something else, contact the site directly.</p><p>Mr. Porn Geek's reviews are written in a comedic way and with parody of the industry as its central focus. The character himself is fictional, and is merely an attempt to be a satirical take on the business of adult entertainment.</p>"}

        </div>

        <form method="post" class="boogie-form" action="#" data-code="broke">
        	<input type="hidden" class="boogie-input" name="tag" value="${reportType}">
          <div class="boogie-form-body">
            <div class="boogie-fields">
              <div class="boogie-field boogie-field-textarea">
                <textarea class="boogie-input" id="message" name="message" placeholder="Please enter details of your request"></textarea>
              </div>

              <div class="boogie-field">
                <input class="boogie-input" type="text" id="name" name="name" placeholder="Your Name">
              </div>

              <div class="boogie-field">
                <input class="boogie-input" type="email" id="email" name="email" placeholder="Your Email">
              </div>
            </div>

            <div class="boogie-checkbox">
              <input class="boogie-checkbox-input" type="checkbox" id="boogie-checkbox-input" name="checkbox">

              <label class="boogie-checkbox-label" for="boogie-checkbox-input">${checkboxLabel}</label>
            </div>
          </div>

          <hr>

          <div class="boogie-form-footer">
            <button class="btn btn-secondary btn-back" type="button" ${changeBack?'data-micromodal-close':''}>
            	${changeBack?'':'<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11">\n								<path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>\n							</svg>'}
							${changeBack?'Close': 'Back'}</button>

            <button class="btn btn-success btn-submit submit-report" type="submit">
              <span class="btn-text">Submit</span>
              <div class="lds-dual-ring"></div>
            </button>
          </div>
        </form>`

		document.querySelector('#boogie-modal .micromodal-body').innerHTML = reportFormContent;

		document.querySelector('.boogie-form-footer .btn-back').addEventListener('click', (event) => {
			document.querySelector('#boogie-modal .micromodal-body').innerHTML = this.getReportBodyContent()
			this.addReviewReportItemClickListeners();
		});

		// document.querySelector('.boogie-form input').addEventListener('change', (event) => {
		//
		// });

		let name = document.querySelector('.boogie-input[name="name"]')
		let email = document.querySelector('.boogie-input[name="email"]')
		let message = document.querySelector('.boogie-input[name="message"]')

		const debouncedValidateName = debounce(() => this.validateField(name), 300);
		const debouncedValidateMessage = debounce(() => this.validateField(message), 300);
		const debouncedValidateEmail = debounce(() => this.validateField(email), 300);

		name.addEventListener('input', debouncedValidateName);
		message.addEventListener('input', debouncedValidateMessage);
		email.addEventListener('input', debouncedValidateEmail);


		document.querySelector('.boogie-form').addEventListener('submit', (event) => {
			event.preventDefault();
			parent.submitForm();
		});


	}

	debounce(func, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), delay);
		};
	}
	validateField(field) {
		const value = field.value.trim();

		if (field.id === 'message') {
			if (value.length < 3) {
				field.classList.add('has_error');
			}else {
				field.classList.remove('has_error');
			}
		}
		if (field.id === 'name') {
			if (value.length < 3) {
				field.classList.add('has_error');
			}else{
				field.classList.remove('has_error');
			}
		} else if (field.id === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				field.classList.add('has_error');
			}else {
				field.classList.remove('has_error');
			}
		}

	}


	getDescriptionByTag(tagName) {
		let selectedTag = this.reportData.filter(item => item.tag === tagName);
		return selectedTag.length > 0? selectedTag[0]: null;
	}

	showSuccessDialog(){
		let successContent = `
        <div class="micromodal-hero">
          <h4 class="micromodal-title">
            Your contributions are truly appreciated!
          </h4>
          <span class="inline-icon icon-report-success"></span>
          <p>
          	Thank you for your feedback! Your input is what helps make <span class="color-primary">MrPornGeek.com</span> better for everyone.
          </p>
          <div class="micromodal-hero-actions">
            <button class="btn btn-primary btn-ok" type="button" data-micromodal-close="">Ok</button>
          </div>
        </div>`


		document.querySelector('#boogie-modal hr').remove()
		document.querySelector('#boogie-modal .micromodal-header').innerHTML = ''
		document.querySelector('#boogie-modal .micromodal-body').innerHTML = successContent;
	}

	isReportValid( name, email, message, accepted) {
		let hasError = false;
		// let accepted = document.querySelector('#boogie-checkbox-input').checked

		if(!accepted){
			document.querySelector('.boogie-checkbox-label').classList.add('has_error');
			hasError = true
		}else{
			document.querySelector('.boogie-checkbox-label').classList.remove('has_error');
		}
		if( name == '' ){
			document.querySelector('.boogie-input[name="name"]').classList.add('has_error');
			hasError = true
		}else{
			document.querySelector('.boogie-input[name="name"]').classList.remove('has_error');
		}
		if( email == '' ){
			document.querySelector('.boogie-input[name="email"]').classList.add('has_error');
			hasError = true
		}else{
			document.querySelector('.boogie-input[name="email"]').classList.remove('has_error');
		}
		if( message == ''){
			document.querySelector('.boogie-input[name="message"]').classList.add('has_error');
			hasError = true
		}else{
			document.querySelector('.boogie-input[name="message"]').classList.remove('has_error');
		}

		if(hasError){
			return false;
		}

		const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		hasError = emailRegex.test(email);
		return hasError;
	}

// Function to handle form submission
	submitForm() {
		let tag = document.querySelector('.boogie-input[name="tag"]').value.trim();
		let name = document.querySelector('.boogie-input[name="name"]').value.trim();
		let email = document.querySelector('.boogie-input[name="email"]').value.trim();
		let message = document.querySelector('.boogie-input[name="message"]').value.trim();
		let reviewUrl = window.location.href;
		let reviewId = document.querySelector('.main_con.review_container').dataset.siteid;

		let accepted = document.querySelector('#boogie-checkbox-input').checked;
		// let reviewTitle = document.querySelector('.review_site_link .site_name').innerHTML;

		// Validate email format
		if (!this.isReportValid(name, email, message, accepted)) {
			return false;
		}

		// Rate limit check
		const currentTime = Date.now();
		if (currentTime - this.lastRequestTime < this.rateLimitTime) {
			return;
		}

		document.querySelector('.boogie-form .submit-report').classList.add('spin');

		// Update the last request time
		this.lastRequestTime = currentTime;

		// If valid email, proceed with the POST request
		fetch("/wp-content/themes/mpg/ajax-handler-wp.php?action=submit_report", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ reporter_name: name, email: email, message: message, tag: tag, post_id: reviewId }),
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			})
			.then(responseData => {
				if (responseData.success) {
					this.showSuccessDialog();
				} else {
					console.log('error');
					this.showSuccessDialog();
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});
	}

	generateTypeFilterPopupContent(withParent = false){
		let filterOptions = document.querySelector('.review_type_slider')?.innerHTML;
		const popupContent = `
			<div class="micromodal-overlay" tabindex="-1">
				<div class="micromodal-container custom-scrollbar" role="dialog" aria-modal="true" aria-labelledby="boogie-title">
				  <div class="micromodal-content filter_type_content" data-type="all">
					  <div class="micromodal-header">
							<h4 class="micromodal-title" id="boogie-title">
								<span class="inline-icon icon-thumbsup"></span>

								<div class="micromodal-title-text">
									<span>Filter by Free or Premium</span>
									<span id="report_review_title" class="color-primary"></span>
								</div>
							</h4>
							<div class="micromodal-close" data-micromodal-close="">
								<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0.51 0.51 22.99 22.99" width="24px" height="24px">
								<path d="M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z"></path>
								<path d="M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z"></path>
								</svg>
							</div>
					  </div>
					   <hr>

					  <div class="micromodal-body">
							<div>
								<div class="review_type_slider mobile">
									${filterOptions}
								</div>
							</div>
							<div class="review_type_slider_status"></div>
							<div class="color-secondary">Additional Actions</div>
							<ul class="additional_actions boogie-list">
								<li class="boogie-list-item problem" data-icon="problem" data-tag="problem">
										<div class="boogie-list-text">
											<span class="inline-icon icon-problem"></span>
											<div>Report a Problem</div>
										</div>
										<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">
											<path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>
										</svg>
								</li>
								<li class="boogie-list-item recommendations" data-icon="recommendations" data-tag="recommendations">
										<div class="boogie-list-text">
											<span class="inline-icon icon-recommendations"></span>
											<div>Site Recommendations</div>
										</div>
										<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">
											<path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>
										</svg>
								</li>
								<li class="boogie-list-item feedback" data-icon="feedback" data-tag="feedback">
									<div class="boogie-list-text">
											<span class="inline-icon icon-feedback"></span>
											<div>Send feedback</div>
										</div>
										<svg class="arrow" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.5 18 11" fill="currentColor">
											<path d="M17.738 5.38997L12.982 0.747973C12.8149 0.586608 12.5918 0.496418 12.3595 0.496418C12.1272 0.496418 11.9041 0.586608 11.737 0.747973C11.6555 0.826858 11.5906 0.921336 11.5464 1.02579C11.5021 1.13024 11.4793 1.24253 11.4793 1.35597C11.4793 1.46942 11.5021 1.58171 11.5464 1.68616C11.5906 1.79061 11.6555 1.88509 11.737 1.96397L14.989 5.13997L0.881 5.13997C0.766747 5.13852 0.653327 5.15959 0.547217 5.20197C0.441107 5.24435 0.344385 5.30722 0.262575 5.38699C0.180765 5.46676 0.115469 5.56186 0.0704156 5.66687C0.0253626 5.77187 0.0014352 5.88472 -2.405e-07 5.99897C0.0028998 6.22954 0.0972146 6.44953 0.262221 6.6106C0.427228 6.77167 0.649428 6.86064 0.88 6.85797L14.99 6.85797L11.738 10.033C11.6565 10.1118 11.5917 10.2062 11.5474 10.3105C11.5032 10.4149 11.4803 10.5271 11.4803 10.6405C11.4803 10.7538 11.5032 10.866 11.5474 10.9704C11.5917 11.0748 11.6565 11.1692 11.738 11.248C11.9045 11.4107 12.1282 11.5016 12.361 11.501C12.586 11.501 12.811 11.416 12.983 11.248L17.739 6.60597C17.8205 6.52717 17.8853 6.43278 17.9296 6.32841C17.9738 6.22405 17.9967 6.11184 17.9967 5.99847C17.9967 5.88511 17.9738 5.7729 17.9296 5.66853C17.8853 5.56416 17.8205 5.46977 17.739 5.39097L17.738 5.38997Z"></path>
										</svg>
								</li>
							</ul>
					  </div>

						<div class="loading_spinner mobile"></div>
					</div>
				</div>
			  </div>
		`;

		if(withParent){
			return `<div class="micromodal micromodal-category" id="boogie-modal" aria-hidden="false">${popupContent}</div>`
		}

		return popupContent;
	}

	showFilterPopup() {
		let parent = this

		if (!document.querySelector("#boogie-modal")) {
			let modalHTML = this.generateTypeFilterPopupContent(true)
			document.body.insertAdjacentHTML('beforeend', modalHTML);
			this.filterPopupContent =	document.querySelector('#boogie-modal').innerHTML
			// parent.preselectFilter()
		}else{
			// let modalHTML = this.generateTypeFilterPopupContent()
			document.querySelector('#boogie-modal').innerHTML = this.filterPopupContent;
		}
		MicroModal.show('boogie-modal',{
			// awaitOpenAnimation: true,
			awaitCloseAnimation: true,
			onShow: function (){
				document.body.classList.add('is-hideScroll')
				parent.parentContainer = document.querySelector('#boogie-modal');
				parent.type_status = parent.parentContainer.querySelector('.review_type_slider_status');
				parent.type_error = parent.parentContainer.querySelector('.review_type_slider_error');

				parent.reviewTypeSlider = document.querySelector('.review_type_slider.mobile');
				parent.rtsThumb = document.querySelector('.review_type_slider.mobile .review_type_slider_thumb');
				parent.filterTypeContainer = document.querySelector('.filter_type_content');

				parent.preselectFilter()
				parent.initFilterEvents()
				parent.initPopupEvents()
				parent.checkAvailability()

				let opt = parent.reviewTypeSlider?.querySelector('.option.active')
				if(opt?.dataset.type == 'all'){
					parent.slideToType(parent.reviewTypeSlider.querySelector('.option.active'))
				}
			},
			onClose: function (){
				// document.querySelector('#type-filter-modal').remove()
				document.documentElement.classList.remove('is-hideScroll')
				document.body.classList.remove('is-hideScroll')
			}
		});
	}

	preselectFilter(){
		let viewFilter = document.querySelector('.viewing-filter');
		let filter = this.reviewTypeSlider.querySelector('.option.active')
		if(filter == undefined){
			filter = this.reviewTypeSlider.querySelector('.option.all')
		}
		if(filter && filter.dataset.type != 'all'){
			this.rtsThumb.classList.add('no_anim')
			this.selectedFilterTagline = filter?.dataset.tip;
			this.slideToType(filter)
			this.repositionStatusTooltip(filter)
			this.rtsThumb.classList.remove('no_anim')
			this.type_status.innerHTML = filter?.dataset.tip;
			this.type_status.classList.add('show')

			if(viewFilter){
				viewFilter.innerHTML = `Viewing ${filter.dataset.type} Sites — Change ^`;
			}

		}else if(filter){
			this.slideToType(filter)
			if(viewFilter){
				viewFilter.innerHTML = ``;
			}
		}
	}

	initFilterEvents(){
		let parent = this;

		let timeoutId;

		this.parentContainer.querySelectorAll('.review_type_slider .option').forEach(function (option)  {
			option.addEventListener('click',  (evt) => {
				parent.onOptionClicked(evt.currentTarget)

			})

			if(option.classList.contains('disabled')){
				if(isMobileOrTablet || window.innerWidth < 768){
					option.addEventListener('click', (evtT) => {
						clearTimeout(timeoutId);
						parent.repositionStatusTooltip(evtT.currentTarget, true)
						parent.type_status.innerHTML = 'No ' + evtT.currentTarget.dataset.type + ' sites listed in this category' // evt.currentTarget?.dataset.tip;

						if(!parent.type_status) return
						if(!parent.type_status.classList.contains('show')){
							parent.type_status.classList.add('show')
						}

						parent.type_status.classList.add('error')
					});

				}else{
					option.addEventListener('mouseover', (evtT) => {
						clearTimeout(timeoutId);

						parent.repositionStatusTooltip(evtT.currentTarget, true)
						parent.type_status.innerHTML = 'No ' + evtT.currentTarget.dataset.type + ' sites listed in this category' // evt.currentTarget?.dataset.tip;

						if(!parent.type_status) return
						if(!parent.type_status.classList.contains('show')){
							parent.type_status.classList.add('show')
						}

						parent.type_status.classList.add('error')
					});

					option.addEventListener('mouseout', () => {
						parent.startTypeErrorTimer()
					});
				}

			}
		}.bind(this));

	}

	onOptionClicked(target){
		let sitesArchive = document.querySelector('.category_sites.cat_archive');
		let type = target.dataset.type;
		let parent = this

		if(this.currentFilter == type){
			return;
		}


		if(target.classList.contains('disabled')){
			if(this.type_status){

				this.type_status.innerHTML = `No ${type} sites listed in this category`;
				this.type_status.classList.add('show')


				if(isMobileOrTablet || window.innerWidth < 768){
					this.type_status.classList.add('error')
					parent.repositionStatusTooltip(target, true)
					setTimeout(function (){
						parent.type_status.classList.remove('error')
						if(parent.currentFilter != 'all'){
							parent.type_status.innerHTML = parent.selectedFilterTagline;
							parent.type_status.style.setProperty('--tip_rx', `${parent.selectedFilterTipX}px`);
						}else{
							parent.type_status.classList.remove('show')
						}

					}, 2000)
				}

			}
			return;
		}
		let siteType = target.dataset.type;
		setWithExpiry('term_filter_'+document.body.dataset.page, siteType, 3000*60*1000);
		setWithExpiry('term_filter_id', document.body.dataset.page, 3000*60*1000);

		this.currentFilter = siteType
		if (this.filterTypeContainer) {
			this.filterTypeContainer.dataset.type = siteType
		}
		this.parentContainer.querySelector('.review_type_slider .option.active')?.classList.remove('active');
		this.slideToType(target)

		document.querySelector('.review_type_container .option.active')?.classList.remove('active');
		document.querySelector('.review_type_container .option.'+siteType)?.classList.add('active');
		target.classList.add('active');
		console.log(`Switching to ${siteType}`)
		sitesArchive.dataset.type = siteType;
		if(this.type_status){

			if(siteType == 'all'){
				this.type_status.innerHTML = '';
				this.selectedFilterTagline = ''
				this.type_status.classList.remove('show')

				if(isMobileOrTablet && viewFilter){
					viewFilter.innerHTML = '';
				}
			}else{
				let tooltip = document.querySelector('.review_type_container .option.'+siteType+' .tooltip')
				if(tooltip){
					this.type_status.innerHTML = tooltip.innerHTML;
				}else{
					this.type_status.innerHTML = `You're Viewing All ${siteType} Sites`;
				}

			if(isMobileOrTablet && viewFilter){
				viewFilter.innerHTML = `Viewing ${siteType} Sites — Change ^`;
			}

				this.type_status.classList.add('show')
				this.type_status.classList.remove('error')
				this.repositionStatusTooltip(target)

				this.selectedFilter = target;
				this.selectedFilterTagline = target?.dataset.tip || '';

				this.type_status.innerHTML = target?.dataset.tip;
				setWithExpiry('term_filter_'+document.body.dataset.page+'_tagline', this.type_status.innerHTML, 3000*60*1000);
				if(!this.type_status.classList.contains('show')){
					this.type_status.classList.add('show')
				}
			}
		}
		if(document.querySelector('#boogie-modal')){
			this.filterPopupContent =	document.querySelector('#boogie-modal').innerHTML
		}


		this.showProgress()
	}

	repositionStatusTooltip(target, isDisabled = false) {
		const typeSliderContainer = this.parentContainer.querySelector('.review_type_slider');
		const { x, width } = typeSliderContainer.getBoundingClientRect();
		const { x: optionX, width: optionWidth } = target.getBoundingClientRect();
		const tipX = (x + width) - (optionX + optionWidth / 2);

		if (!isDisabled) {
			this.selectedFilterTipX = tipX;
		}
		this.type_status.style.setProperty('--tip_rx', `${tipX}px`);
	}

	startTypeErrorTimer(){
		let parent = this
		if(parent.type_status){
			// setTimeout(() => {
			// 	// parent.repositionStatusTooltip(parent.selectedFilter)
			// }, 2500);

			if(parent.type_status && parent.type_status.innerHTML!=''){
				parent.type_status.classList.add('show')
			}

			// parent.type_status.innerHTML = parent.selectedFilterTagline;
			if(parent.selectedFilterTagline === '' || parent.selectedFilterTagline === undefined){
				parent.type_status.classList.remove('show')
				return
			}
			parent.type_status.innerHTML = parent.selectedFilterTagline;
			parent.type_status.classList.remove('error')
			parent.type_status.style.setProperty('--tip_rx', `${parent.selectedFilterTipX}px`);
		}

	}

	checkAvailability() {
		this.parentContainer?.querySelectorAll('.review_type_slider .option').forEach((option) => {
			let type = option.dataset.type;
			if(type=='all'){
				return;
			}
			let sites = document.querySelectorAll('.category_sites_item.'+type).length;
			if(sites == 0){
				option.classList.add('disabled')
				// option.insertAdjacentHTML('beforeend', '<div class="review_type_slider_tooltip">No ' + type + ' sites listed in this category</div>');
			}
		})
	}

	slideToType(target) {
		let sliderContainerX = this.reviewTypeSlider.getBoundingClientRect().x
		let optionBounds = target.getBoundingClientRect()
		let thumbX = optionBounds.x - sliderContainerX
		this.rtsThumb.style.left = thumbX + 'px';
		this.rtsThumb.style.width = optionBounds.width + 'px';

		document.querySelectorAll('.review_type_slider_thumb').forEach((thumb) => {
			thumb.style.left = thumbX + 'px'
			thumb.style.width = optionBounds.width + 'px'

			setWithExpiry('term_filter_'+document.body.dataset.page+'_x', thumbX, 3000*60*1000);
			setWithExpiry('term_filter_'+document.body.dataset.page+'_w', optionBounds.width, 3000*60*1000);
		});

		// rtsThumbMobile
		console.log(sliderContainerX, optionBounds)
	}

	showProgress(isMobile = false) {
		let progress = document.querySelector('.loading_spinner.desktop');
		if(isMobileOrTablet || window.innerWidth < 768){
			progress = document.querySelector('.loading_spinner.mobile');
		}
		if(progress){
			progress.classList.add('show');
			setTimeout(() => {
				progress.classList.remove('show');
				if(isMobileOrTablet || window.innerWidth < 768){
					this.filterPopupContent =	document.querySelector('#boogie-modal').innerHTML
					MicroModal.close('boogie-modal');
				}
			}, 2000);
		}
	}

	initPopupEvents(){
		let parent = this
		document.querySelector('.boogie-list-item.problem')?.addEventListener('click', function (evt) {
			evt.preventDefault();
			// MicroModal.close('type-filter-modal');
			// document.querySelector('#type-filter-modal')?.remove()
			// parent.injectReportReviewModal('', 'Report a Problem for')
			parent.switchToReport();
		})
		document.querySelector('.boogie-list-item.recommendations')?.addEventListener('click', function (evt) {
			evt.preventDefault();
			// MicroModal.close('type-filter-modal');
			parent.injectReportReviewModal('recommendations', 'Website Recommendations for')
			// parent.showReportForm('recommendations')
		})
		document.querySelector('.boogie-list-item.feedback')?.addEventListener('click', function (evt) {
			evt.preventDefault();
			// MicroModal.close('type-filter-modal');
			parent.injectReportReviewModal('feedback', 'Send Feedback for')
		})
	}
}
