const getWindowScrollTop = () => window.scrollY || window.pageYOffSet || document.documentElement.scrollTop;
const isDelegatedElement = ($target, trigger, match = false) => {
	const method = match ? 'matches' : 'closest';
	if (!$target || !$target[method])
		return false;
	if (typeof trigger === 'string')
		return !!$target[method](trigger);
	if (Array.isArray(trigger))
		return trigger.some(className => !!$target[method](className));
	return false;
}

const debounce = (cb, delay = 0) => {
	let timer = null;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => cb(...args), delay);
	}
}

const initScrollSpyButton = ({
															 container = null,
															 sections = [],
															 topOffset = 0,
															 onBeforeClick: onBeforeClickAction = () => {
															 }
															 ,
															 onBeforeScroll: onBeforeScrollAction = () => {
															 }
															 ,
														 }) => {
	const $body = document.body;
	// const $buttons = $body.querySelectorAll('.scrollspy-btn');
	const $buttons = $body.querySelectorAll('.scrollspy-btn');
	let $container = container;
	let $sections = sections;
	let _topOffset = Math.floor(topOffset);
	const setContainer = $el => $container = $el;
	const setSections = $els => $sections = $els;
	const setTopOffset = (val = 0) => _topOffset = Math.floor(val);
	const getPercent = () => {
			if (!$sections.length)
				return 0;
			const $lastSection = $sections[$sections.length - 1];
			const windowScrollTop = Math.floor(getWindowScrollTop());
			const lastSectionTop = windowScrollTop + Math.floor($lastSection.getBoundingClientRect().top) - _topOffset;
			return Math.min(windowScrollTop / lastSectionTop, 1);
		}
	;
	const setPercentCSSProperty = (val = '') => $buttons.forEach($btn => $btn.style.setProperty('--percent', val));
	const toggleTopClass = (val = 0) => $buttons.forEach($btn => $btn.classList.toggle('scroll-to-top', val >= 1));
	const onScroll = () => {
			onBeforeScrollAction();
			let percent = getPercent();
			if(percent > 0.95){
				percent = 1;
			}
			setPercentCSSProperty(percent);
			toggleTopClass(percent);
		}
	;
	const onClick = e => {
			if (!isDelegatedElement(e.target, '.scrollspy-btn'))
				return;
			onBeforeClickAction();
			const windowScrollTop = Math.floor(getWindowScrollTop());
			const windowHeight = Math.floor(window.innerHeight);
			let top = 0;
			Array.from($sections).some(($section, idx) => {
					const sectionTop = windowScrollTop + Math.floor($section.getBoundingClientRect().top);
					const sectionBottom = windowScrollTop + Math.floor($section.getBoundingClientRect().bottom);
					const isInView = (sectionTop < windowScrollTop + windowHeight) && (sectionBottom > windowScrollTop + _topOffset);
					if (isInView) {
						top = $sections[idx + 1] ? windowScrollTop + Math.floor($sections[idx + 1].getBoundingClientRect().top) - _topOffset : 0;
						return true;
					}
				}
			);

			if($buttons[0].classList.contains('scroll-to-top')){
				top = 0;
			}

			scrollTo({
				top,
				behavior: top ? 'smooth' : 'instant',
			});
			console.log('Scrolling to next section')
		}
	;
	const toggleBindScroll = (val = true) => window[`${val ? 'add' : 'remove'}EventListener`]('scroll', onScroll);
	const toggleBindClick = (val = true) => $body[`${val ? 'add' : 'remove'}EventListener`]('click', debounce(onClick));
	toggleBindScroll();
	toggleBindClick();
	onScroll();
	return {
		setContainer,
		setSections,
		setTopOffset,
		toggleBindScroll,
		toggleBindClick,
	}
}
