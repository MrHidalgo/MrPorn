// const CategoryPopup = () => {
// 	let self = this;
// 	const init = () => {
// 		this.trigger = document.querySelector('.js-category-popup-trigger');
// 		if(this.trigger === null) return;
// 		initEvents();
//
// 	}
// 	const initEvents = () => {
// 		this.trigger.addEventListener('click', toggleSort.bind(this));
// 	}
// 	 const toggleSort = () => {
// 		if(!document.querySelector('#sorter-modal')){
// 			this.generateSortContent();
// 		}
// 		MicroModal.show('sorter-modal',{
// 			onShow: function (){
// 				document.body.classList.add('is-hideScroll')
// 			},
// 			onClose: function (){
// 				document.body.classList.remove('is-hideScroll')
// 			}
// 		});
// 	}
//
// 	const generateSortContent = () =>{
// 		const modalHTML = `
// 		  <div class="micromodal micromodal-slide sorter-modal is-open" id="sorter-modal" aria-hidden="false">
// 			  <div class="micromodal-overlay" tabindex="-1">
// 				<div class="micromodal-container custom-scrollbar" role="dialog" aria-modal="true" aria-labelledby="boogie-title">
// 				  <div class="micromodal-content boogie-issues-content">
// 					  <div class="micromodal-header">
// 						<h4 class="micromodal-title" id="boogie-title">
// 						  <span class="inline-icon icon-thumbsup"></span>
//
// 						  <div class="micromodal-title-text">
// 							Report a Review Feedback for
// 							<span id="report_review_title" class="color-primary">${reviewName}</span>
// 						  </div>
// 						</h4>
// 						<div class="micromodal-close" data-micromodal-close="">
// 						  <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0.51 0.51 22.99 22.99">
// 							<path d="M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z"></path>
// 							<path d="M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z"></path>
// 						  </svg>
// 						</div>
//
// 					  </div>
//
// 					  <hr>
//
// 					  <div class="micromodal-body">
// 					  </div>
// 					</div>
// 				</div>
// 			  </div>
// 			</div>
// 		`;
// 		document.body.insertAdjacentHTML('beforeend', modalHTML);
//
// 		return {
// 			init,
// 			setVisitedView,
// 			getVisitedViews
// 		}
// 	}
// }
