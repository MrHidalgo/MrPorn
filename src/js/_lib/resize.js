const findTheClosestValueInArray = (needle, haystack) => haystack.reduce( (prev, cur) => {
	return Math.abs(cur - needle) < Math.abs(prev - needle) ? cur : prev;
});

const initResize = ({breakpoints=[], onInit= () => {}
											, onChange= () => {}
											, onResize= () => {}
											, }) => {
	breakpoints = Array.isArray(breakpoints) ? breakpoints : [breakpoints];
	if (!breakpoints.length)
		return;
	const mappedBreakpoints = breakpoints.map(key => ({
		width: +key,
		isEqual: false,
		isLess: false,
		isLessOrEqual: false,
		isMore: false,
		isMoreOrEqual: false,
	}));
	const handleResize = (toBeResized=true) => {
			const windowWidth = window.innerWidth;
			const closestWidth = findTheClosestValueInArray(windowWidth, breakpoints);
			const closestBp = mappedBreakpoints.find(bp => closestWidth === bp.width);
			const state = {
				width: closestWidth,
				isEqual: windowWidth === closestBp.width,
				isLess: windowWidth < closestBp.width,
				isMore: windowWidth > closestBp.width,
				isLessOrEqual: windowWidth <= closestBp.width,
				isMoreOrEqual: windowWidth >= closestBp.width,
			};
			const isStateChanged = Object.keys(state).some(key => state[key] !== closestBp[key]);
			Object.assign(closestBp, state);
			toBeResized ? onResize(closestBp) : onInit(closestBp);
			isStateChanged && onChange(closestBp);
		}
	;
	const bindResize = () => window.addEventListener('resize', handleResize);
	handleResize(false);
	bindResize();
}

// Make initResize available globally
window.initResize = initResize;
