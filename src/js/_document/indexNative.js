/**
 * POLYFILL
 * ===================================
 */

if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector ||
		Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;

		do {
			if (Element.prototype.matches.call(el, s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

/**
 * end POLYFILL
 * ===================================
 */


(function () {
	/**
	 * ADDITIONAL CALLBACK
	 * ===================================
	 */

	/**
	 * @name slideUp
	 * @param target
	 * @param duration
	 */
	const slideUp = (target, duration=500) => {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.boxSizing = 'border-box';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		window.setTimeout( () => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	};
	/**
	 * @name slideDown
	 * @param target
	 * @param duration
	 */
	const slideDown = (target, duration=500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;

		if (display === 'none') display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = 'border-box';
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');

		window.setTimeout( () => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	};
	/**
	 * @name slideToggle
	 * @param target
	 * @param duration
	 */
	const slideToggle = (target, duration = 500) => {
		if (window.getComputedStyle(target).display === 'none') {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};
	/**
	 * end ADDITIONAL CALLBACK
	 * ===================================
	 */


	/**
	 * MAIN CALLBACK
	 * ===================================
	 */

	/**
	 * @name bodyClick
	 */
	const bodyClick = () => {
		const className = '.header__view-wrapper, .sort';

		document.addEventListener('click', function(ev) {
			const _ev = ev.target;

			if (!_ev.closest(className)) {
				// VIEW FAVORITES
				document.querySelector('[view-favorites-toggle-js]').classList.remove('is-active');
				document.querySelector('[view-favorites-drop-js]').classList.remove('is-open');

				// SORT
				document.querySelector('[sort-node-js]').classList.remove('is-open');
				document.querySelector('.sort__drop-inner').classList.remove('is-open');

				for(let i = 0; i < document.querySelectorAll('.sort__drop-link').length; i++) {
					document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
				}
			}
		}, false);
	};


	/**
	 * @name viewFavoritesToggle
	 */
	const viewFavoritesToggle = () => {
		const _btn = document.querySelector('[view-favorites-toggle-js]'),
			_node = document.querySelector('[view-favorites-drop-js]');

		_btn.addEventListener('click', (ev) => {
			_btn.classList.toggle('is-active');
			_node.classList.toggle('is-open');

			document.querySelector('[sort-node-js]').classList.remove('is-open');
			document.querySelector('.sort__drop-inner').classList.remove('is-open');

			for(let i = 0, len = document.querySelectorAll('.sort__drop-link').length; i < len; i++) {
				document.querySelectorAll('.sort__drop-link')[i].classList.remove('is-active');
			}
		}, false);
	};


	/**
	 * @name sortCB
	 */
	const sortCB = () => {
		/**
		 * @name sortToggle
		 */
		const sortToggle = () => {
			const toggleSort = document.querySelector('[sort-toggle-js]'),
				nodeSort = document.querySelector('[sort-node-js]');

			toggleSort.addEventListener('click', (ev) => {
				nodeSort.classList.toggle('is-open');
			}, false);
		};
		/**
		 * @name sortDropInner
		 */
		const sortDropInner = () => {
			const links = document.querySelectorAll('.sort__drop-link'),
				nodeDropInner = document.querySelector('.sort__drop-inner');

			for(let i = 0, len = links.length; i < len; i++) {
				links[i].addEventListener('click', (ev) => {
					const el = ev.currentTarget;

					if(el.classList.contains('is-active')) {
						el.classList.remove('is-active');
						nodeDropInner.classList.remove('is-open');
					} else {
						for(let i = 0; i < links.length; i++) {
							links[i].classList.remove('is-active');
						}

						el.classList.add('is-active');
						nodeDropInner.classList.add('is-open');
					}
				}, false);
			}
		};
		/**
		 * @name sortCollapse
		 */
		const sortCollapse = () => {
			const toggles = document.querySelectorAll('[collapse-toggle-js]');

			for(let i = 0, len = toggles.length; i < len; i++) {
				toggles[i].addEventListener('click', (ev) => {
					const el = ev.currentTarget,
						container = document.getElementById(el.dataset.container);

					btn.classList.toggle('is-active');
					container.classList.toggle('is-open');
				}, false);
			}
		};


		sortToggle();
		sortDropInner();
		sortCollapse();
	};


	/**
	 * @name search
	 */
	const search = () => {
		const searchInput = document.querySelector('[search-js]');

		searchInput.addEventListener('keyup', (ev) => {
			const self = ev.currentTarget,
				selfVal = self.value,
				parentNode = self.closest('[search-parent-js]'),
				dropNode = parentNode.querySelector('[search-drop-js]');

			if(selfVal.length > 0) {
				dropNode.classList.add('is-open');
			} else {
				dropNode.classList.remove('is-open');
			}
		}, false);
	};


	/**
	 * @name boxMore
	 */
	const boxMore = () => {
		function playPause(vid) {
			vid.pause();
			vid.currentTime = 0;
			vid.load();
		}

		const btns = document.querySelectorAll('.list__box-more');

		for(let i = 0, len = btns.length; i< len; i++) {
			btns[i].addEventListener('click', (ev) => {
				const _el = ev.currentTarget,
					_boxParent = _el.closest('.list__box'),
					_boxID = _boxParent.getAttribute('data-id'),
					_parentNode = _el.closest('.list__box-wrapper');

				const _specificationBox = _parentNode.querySelector('.list__specification[data-id="' + _boxID + '"]');

				const listBoxes = document.querySelectorAll('.list__box'),
					listSpecifications = document.querySelectorAll('.list__specification'),
					videoPlayers = document.querySelectorAll('.list__specification video'),
					pauseToggle = document.querySelectorAll('[video-pause-js]');

				for(let j = 0, l = document.querySelectorAll('[video-toggle-js]').length; j < l; j++) {
					document.querySelectorAll('[video-toggle-js]')[j].classList.remove('is-active');
					pauseToggle[j].classList.remove('is-active');
					listBoxes[j].classList.remove('is-active');

					if(window.innerWidth >= 1024) {
						listSpecifications[j].style.display = 'none';
					} else {
						listSpecifications[j].classList.remove('is-open');
					}

					playPause(videoPlayers[j]);
				}

				_boxParent.classList.add('is-active');
				_parentNode.classList.add('is-open');


				const hideScrollContainer = document.querySelectorAll("html, body");

				if(window.innerWidth >= 1024) {
					_specificationBox.style.display = 'flex';
				} else {
					_specificationBox.classList.add('is-open');

					hideScrollContainer.forEach((val, idx) => {
						val.classList.add("is-hideScroll");
					});
				}

			}, false);
		}

		// =====

		const closeBtns = document.querySelectorAll('.list__specification-close');

		for(let i = 0, len = closeBtns.length; i < len; i++) {
			closeBtns[i].addEventListener('click', (ev) => {
				const _el = ev.currentTarget,
					parent = _el.closest('.list__specification'),
					listBoxWrapper = _el.closest('.list__box-wrapper'),
					vid = parent.querySelector('video'),
					pauseToggle = parent.querySelector('[video-pause-js]');

				const hideScrollContainer = document.querySelectorAll("html, body");

				listBoxWrapper.classList.remove('is-open');

				if(window.innerWidth >= 1024) {
					_el.closest('.list__specification').style.display = 'none';
				} else {
					_el.closest('.list__specification').classList.remove('is-open');

					hideScrollContainer.forEach((val, idx) => {
						val.classList.remove("is-hideScroll");
					});
				}

				if(parent.querySelector('[video-toggle-js]')) {
					pauseToggle.classList.remove('is-active');
					parent.querySelector('[video-toggle-js]').classList.remove('is-active');
					playPause(vid);
				}

				for(let j = 0, l = document.querySelectorAll('.list__box-more').length; j < l; j++) {
					document.querySelectorAll('.list__box-more')[j].closest('.list__box').classList.remove('is-active');
				}
			}, false);
		}
	};


	/**
	 * @name videoToggle
	 */
	const videoToggle = () => {
		function playPause(vid) {
			if (vid.paused) {
				vid.play();
			} else {
				vid.pause();
			}
		}

		const videoPlayBtns = document.querySelectorAll('[video-toggle-js]'),
			videoPauseBtns = document.querySelectorAll('[video-pause-js]');

		for(let i = 0, len = videoPlayBtns.length; i < len; i++) {
			videoPlayBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					parentVideoNode = el.closest('[video-parent-js]'),
					vid = parentVideoNode.querySelector('[video-js]'),
					pauseToggle = parentVideoNode.querySelector('[video-pause-js]');

				el.classList.add('is-active');
				pauseToggle.classList.add('is-active');

				playPause(vid);
			}, false);
		}

		for(let i = 0, len = videoPauseBtns.length; i < len; i++) {
			videoPauseBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					parentVideoNode = el.closest('[video-parent-js]'),
					vid = parentVideoNode.querySelector('[video-js]'),
					playToggle = parentVideoNode.querySelector('[video-toggle-js]');

				el.classList.remove('is-active');
				playToggle.classList.remove('is-active');

				playPause(vid);
			}, false);
		}
	};


	/**
	 * @name detailsToggleAction
	 */
	const detailsToggleAction = () => {
		const favoritesBtns = document.querySelectorAll('[favorites-toggle-js]'),
			specFavoritesBtns = document.querySelectorAll('[spec-favorites-js]'),
			likeBtns = document.querySelectorAll('[like-toggle-js]'),
			specLikeBtns = document.querySelectorAll('[spec-like-js]'),
			dislikeBtns = document.querySelectorAll('[dislike-toggle-js]'),
			specDislikeBtns = document.querySelectorAll('[spec-dislike-js]'),
			skipBtns = document.querySelectorAll('.list__specification-skip');

		for(let i = 0, len = favoritesBtns.length; i < len; i++) {
			favoritesBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elParent = el.closest('.list__box-wrapper');

				const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					specificationFavoritesBtn = specificationBlock.querySelector('[data-favorites="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				specificationFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for(let i = 0, len = skipBtns.length; i < len; i++) {
			skipBtns[i].addEventListener('click', (ev) => {
				ev.currentTarget.classList.toggle('is-active');
			}, false);
		}

		for(let i = 0, len = specFavoritesBtns.length; i < len; i++) {
			specFavoritesBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-favorites'),
					elParent = el.closest('.list__box-wrapper');

				const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					listFavoritesBtn = listBlock.querySelector('.list__box-favorites[data-id="' + elID + '"]');

				ev.currentTarget.classList.toggle('is-active');
				listFavoritesBtn.classList.toggle('is-active');
			}, false);
		}

		for(let i = 0, len = likeBtns.length; i < len; i++) {
			likeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elParent = el.closest('.list__box-wrapper');

				ev.currentTarget.classList.toggle('is-active');
				elParent.querySelector('[dislike-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

				const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]'),
					specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]');

				specificationLikeBtn.classList.toggle('is-active');
				specificationDislikeBtn.parentElement.classList.toggle('is-hide');
			}, false);
		}

		for(let i = 0, len = specLikeBtns.length; i < len; i++) {
			specLikeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-like'),
					elParent = el.closest('.list__box-wrapper'),
					elActionNode = el.closest('[spec-actionNode-js]'),
					dislikeBtn = elActionNode.querySelector('[spec-dislike-js]');

				dislikeBtn.parentElement.classList.toggle('is-hide');

				const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					listLikeBtn = listBlock.querySelector('.list__box-like'),
					listDislikeBtn = listBlock.querySelector('.list__box-dislike');

				ev.currentTarget.classList.toggle('is-active');

				listLikeBtn.classList.toggle('is-active');
				listDislikeBtn.classList.toggle('is-hide');
			}, false);
		}

		for(let i = 0, len = dislikeBtns.length; i < len; i++) {
			dislikeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elParent = el.closest('.list__box-wrapper');

				ev.currentTarget.classList.toggle('is-active');
				elParent.querySelector('[like-toggle-js][data-id="' + elID + '"]').classList.toggle('is-hide');

				const specificationBlock = elParent.querySelector('.list__specification[data-id="' + elID + '"]'),
					specificationDislikeBtn = specificationBlock.querySelector('[data-dislike="' + elID + '"]'),
					specificationLikeBtn = specificationBlock.querySelector('[data-like="' + elID + '"]');

				specificationDislikeBtn.classList.toggle('is-active');
				specificationLikeBtn.parentElement.classList.toggle('is-hide');
			}, false);
		}

		for(let i = 0, len = specDislikeBtns.length; i < len; i++) {
			specDislikeBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-dislike'),
					elParent = el.closest('.list__box-wrapper'),
					elActionNode = el.closest('[spec-actionNode-js]'),
					likeBtn = elActionNode.querySelector('[spec-like-js]');

				likeBtn.parentElement.classList.toggle('is-hide');

				const listBlock = elParent.querySelector('.list__box[data-id="' + elID + '"]'),
					listDislikeBtn = listBlock.querySelector('.list__box-dislike'),
					listLikeBtn = listBlock.querySelector('.list__box-like');

				ev.currentTarget.classList.toggle('is-active');

				listDislikeBtn.classList.toggle('is-active');
				listLikeBtn.classList.toggle('is-hide');
			}, false);
		}
	};


	/**
	 * @name listIndicator
	 */
	const listIndicator = () => {
		const listBoxes = document.querySelectorAll('[list-box-js]');

		for(let i = 0, len = listBoxes.length; i < len; i++) {
			listBoxes[i].addEventListener('mouseenter', function(ev) {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elWidth = el.clientWidth;

				const parent = el.closest('[list-parent-js]'),
					listIndicator = parent.querySelector('[list-line-js]');

				let listIndicatorWidth = 0;

				if(window.innerWidth >= 1023) {
					listIndicatorWidth = 64;
				} else if(window.innerWidth >= 768) {
					listIndicatorWidth = 34;
				} else {
					listIndicatorWidth = 14;
				}

				const _elRect = el.getBoundingClientRect();

				const _listContainer = document.querySelector('#list .list__box-wrapper'),
					_listContainerDimm = _listContainer.getBoundingClientRect();

				let _sum = 0;

				for(let idx = 1; idx < elID; idx++) {
					if((_elRect.width * idx) < (_elRect.x - _listContainerDimm.x)) {
						_sum++;
					} else {
						break;
					}
				}

				let _indicatorOffset = (elWidth - listIndicatorWidth) / 2,
					_lineOffset = ((_elRect.width * _sum) + ((_sum * 6) - 3)) + _indicatorOffset;

				listIndicator.setAttribute(
					'style',
					'transform: translateX(' + _lineOffset + 'px)'
				);
			});
		}
	};


	/**
	 * @name boxHover
	 */
	const boxHover = () => {
		const swiperSlides = document.querySelectorAll('.swiper-slide'),
			listBoxBody = document.querySelectorAll('.list__box-body');

		let tOut = null,
			hoverBool = false;

		for(let i = 0, len = swiperSlides.length; i < len; i++) {
			swiperSlides[i].addEventListener('mouseenter', function(ev) {
				if(window.innerWidth >= 1280) {
					const el = ev.currentTarget,
						elParent = el.closest('[list-parent-js]'),
						lineInd = elParent.querySelector('[list-line-js]');

					setTimeout(function() {
						let transformVal = '';

						if(lineInd.getAttribute("style")) {
							let val = lineInd.getAttribute("style");


							if(val.indexOf(';') === -1) {
								transformVal = val;
							} else {
								transformVal = val.substring(0, val.indexOf(';'));
							}
						}

						if(hoverBool) {
							el.classList.add('is-hover');
							lineInd.setAttribute('style', transformVal + ';width: 189px');
						} else {
							tOut = setTimeout(function() {
								hoverBool = true;
								el.classList.add('is-hover');

								lineInd.setAttribute('style', transformVal + ';width: 189px');
							}, 750);
						}
					}, 0);
				}
			}, false);

			swiperSlides[i].addEventListener('mouseleave', function(ev) {
				if(window.innerWidth >= 1280) {
					const el = ev.currentTarget,
						elParent = el.closest('[list-parent-js]'),
						lineInd = elParent.querySelector('[list-line-js]');

					let transformVal = '';

					if(lineInd.getAttribute("style")) {
						let val = lineInd.getAttribute("style");


						if(val.indexOf(';') === -1) {
							transformVal = val;
						} else {
							transformVal = val.substring(0, val.indexOf(';'));
						}
					}

					clearTimeout(tOut);
					el.classList.remove('is-hover');

					lineInd.setAttribute('style', transformVal + ';width: 64px');
				}
			}, false);
		}

		for(let i = 0, len = listBoxBody.length; i < len; i++) {
			listBoxBody[i].addEventListener('mouseleave', function(ev) {
				if(window.innerWidth >= 1280) {
					hoverBool = false;

					clearTimeout(tOut);

					for(let j = 0, l = swiperSlides.length; j < l; j++) {
						swiperSlides[j].classList.remove('is-hover');
					}
				}
			}, false);
		}
	};


	const detectDevice = () => {
		let check = false;

		function _helper() {
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

			if(check) {
				document.getElementsByTagName('body')[0].classList.add('is-mobile');
			} else {
				document.getElementsByTagName('body')[0].classList.remove('is-mobile');
			}
		}

		_helper();

		window.addEventListener('resize', function() {
			_helper();
		});
	};


	const skipModal = () => {
		const skipBtns = document.querySelectorAll('[spec-skip-js]');

		for(let i = 0, len = skipBtns.length; i < len; i++) {
			skipBtns[i].addEventListener('click', (ev) => {
				const el = ev.currentTarget,
					elID = el.getAttribute('data-id'),
					elParent = el.closest('.list__box-wrapper');

				el.closest('.list__specification').querySelector('.list__specification-close').click();

				if(elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]')) {
					elParent.querySelector('.list__specification[data-id="' + (Number(elID) + 1) + '"]').classList.add('is-open');
				}

			}, false);
		}
	};


	/**
	 * end MAIN CALLBACK
	 * ===================================
	 */


	/**
	 * @name initNative
	 *
	 * @description Init all method
	 */
	const initNative = () => {
		// default
		initPreventBehavior();
		// ==========================================

		// lib
		initSwiper();
		initHamburger();
		// ==========================================

		// callback
		detectDevice();
		bodyClick();
		viewFavoritesToggle();
		sortCB();
		search();
		boxHover();
		boxMore();
		videoToggle();
		listIndicator();
		detailsToggleAction();
		skipModal();
		// ==========================================
	};

	/**
	 * @description Init all CB after page load
	 */
	window.addEventListener('load', (ev) => {
		initNative();
	});

	window.addEventListener('resize', () => {
		const _html = document.getElementsByTagName('html')[0],
			_body = document.getElementsByTagName('body')[0];

		if(window.innerWidth > 1023) {
			if(_html.classList.contains('is-hideScroll')) {
				_html.classList.remove('is-hideScroll');
				_body.classList.remove('is-hideScroll');

				if(document.querySelector('.list__specification.is-open')) {
					document.querySelector('.list__specification.is-open').style.display = 'flex';
					document.querySelector('.list__specification.is-open').classList.remove('is-open');
				}
			} else {
				_html.classList.add('is-hideScroll');
				_body.classList.add('is-hideScroll');

				for(let i = 0, len = document.querySelectorAll('.list__specification').length; i < len; i++) {
					const el = document.querySelectorAll('.list__specification')[i];

					if(el.style.cssText.length !== 0 && el.style.cssText === "display: flex;") {
						el.classList.add('is-open');
						el.removeAttribute('style');
						return false;
					}
				}
			}
		}
	});

})();
