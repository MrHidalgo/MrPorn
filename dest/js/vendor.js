/*
*
* Include :
*
* - swiper-bundle.js;
* - swiper-bundle.js.map;
*
* */

!function(e,o){if("function"==typeof define&&define.amd)define(["exports"],o);else if("undefined"!=typeof exports)o(exports);else{var t={};o(t),e.bodyScrollLock=t}}(this,function(exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=!1;if("undefined"!=typeof window){var e={get passive(){t=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}var n="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&1<window.navigator.maxTouchPoints),i=[],d=!1,l=-1,c=void 0,s=void 0,u=void 0,a=function(o){return i.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(o))})},v=function(e){var o=e||window.event;return!!a(o.target)||(1<o.touches.length||(o.preventDefault&&o.preventDefault(),!1))},r=function(){void 0!==u&&(document.body.style.paddingRight=u,u=void 0),void 0!==c&&(document.body.style.overflow=c,c=void 0)},f=function(){if(void 0!==s){var e=-parseInt(document.body.style.top,10),o=-parseInt(document.body.style.left,10);document.body.style.position=s.position,document.body.style.top=s.top,document.body.style.left=s.left,window.scrollTo(o,e),s=void 0}};exports.disableBodyScroll=function(r,e){if(r){if(!i.some(function(e){return e.targetElement===r})){var o={targetElement:r,options:e||{}};i=[].concat(function(e){if(Array.isArray(e)){for(var o=0,t=Array(e.length);o<e.length;o++)t[o]=e[o];return t}return Array.from(e)}(i),[o]),n?window.requestAnimationFrame(function(){if(void 0===s){s={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,o=e.scrollY,t=e.scrollX,n=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-o,document.body.style.left=-t,setTimeout(function(){return window.requestAnimationFrame(function(){var e=n-window.innerHeight;e&&n<=o&&(document.body.style.top=-(o+e))})},300)}}):function(e){if(void 0===u){var o=!!e&&!0===e.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;if(o&&0<t){var n=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);u=document.body.style.paddingRight,document.body.style.paddingRight=n+t+"px"}}void 0===c&&(c=document.body.style.overflow,document.body.style.overflow="hidden")}(e),n&&(r.ontouchstart=function(e){1===e.targetTouches.length&&(l=e.targetTouches[0].clientY)},r.ontouchmove=function(e){var o,t,n,i;1===e.targetTouches.length&&(t=r,i=(o=e).targetTouches[0].clientY-l,!a(o.target)&&(t&&0===t.scrollTop&&0<i?v(o):(n=t)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&i<0?v(o):o.stopPropagation()))},d||(document.addEventListener("touchmove",v,t?{passive:!1}:void 0),d=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},exports.clearAllBodyScrollLocks=function(){n&&(i.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),d&&(document.removeEventListener("touchmove",v,t?{passive:!1}:void 0),d=!1),l=-1),n?f():r(),i=[]},exports.enableBodyScroll=function(o){o?(i=i.filter(function(e){return e.targetElement!==o}),n&&(o.ontouchstart=null,o.ontouchmove=null,d&&0===i.length&&(document.removeEventListener("touchmove",v,t?{passive:!1}:void 0),d=!1)),n?f():r()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")}});

// @ts-check
/**
 * Shorthand for `document.getElementsByClassName`
 *
 * @param {String} selClass - The selector's class
 * @param {Element|HTMLElement|Document} [parent=document] - Parent element
 *
 * @returns {HTMLCollectionOf<Element>} - The selected elements
 */

function byClass(selClass, parent = document) {
	return parent.getElementsByClassName(selClass);
}
/**
 * Shorthand for `document.querySelector`
 *
 * @param {String} selector - Selector
 * @param {Element|HTMLElement|Document} [parent=document] - Parent element
 *
 * @returns {Element|HTMLElementTagNameMap|SVGElementTagNameMap|null} - The selected element
 */

function query(selector, parent = document) {
	return parent.querySelector(selector);
}
/**
 * Shorthand for `document.querySelectorAll`
 *
 * @param {String} selector - Selector
 * @param {Element|HTMLElement|Document} [parent=document] - Parent element
 *
 * @returns {NodeList} - The selected element
 */

function queryAll(selector, parent = document) {
	return parent.querySelectorAll(selector);
}

// @ts-check

/**
 * Foreach polyfill for NodeList and HTMLCollection
 * https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
 *
 * @param {Array<any>|NodeList|HTMLCollection} els - A list of elements
 * @param {foreachCB} fn - Callback containing ( value, index ) as arguments
 * @param {Function} [scope] - Scope
 */
function forEachHTML(els, fn, scope) {
	for (let i = 0, numEls = els.length; i < numEls; i++) fn.call(scope, els[i], i);
}

// @ts-check
/**
 * Shorthand for `element.classList.add`, works with multiple nodes
 *
 * @param {Element|HTMLElement|HTMLCollection|NodeList} el - A list of elements
 * @param {...String} classes - Classes to add
 */

function addClass(el, ...classes) {
	// @ts-ignore
	if (el.length === undefined) {
		// @ts-ignore
		addClassEl(el, ...classes);
	} else {
		// @ts-ignore
		forEachHTML(el, currEl => {
			addClassEl(currEl, ...classes);
		});
	}
	/**
	 * Adds classes to a single element
	 *
	 * @param {Element|HTMLElement} elem - An HTML element
	 * @param {...String} remClass - Classes to add
	 */


	function addClassEl(elem, ...remClass) {
		remClass.forEach(singleClass => {
			elem.classList.add(singleClass);
		});
	}
}

// @ts-check

/**
 * Shorthand for `element.addEventListener`
 *
 * @param {Element|HTMLElement|Window|Document|MediaQueryList} el - A list of elements
 * @param {String} ev - Event's name
 * @param {EventListenerOrEventListenerObject} fn - Event's function
 * @param {Object} [opts] - Optional event options
 */
function addEvent(el, ev, fn, opts) {
	el.addEventListener(ev, fn, opts);
}
/**
 * Shorthand for `element.removeEventListener`
 *
 * @param {Element|HTMLElement|Window|Document|MediaQueryList} el - A list of elements
 * @param {String} ev - Event's name
 * @param {EventListenerOrEventListenerObject} fn - Event's function
 * @param {Object} [opts] - Optional event options
 */

function removeEvent(el, ev, fn, opts) {
	el.removeEventListener(ev, fn, opts);
}

// @ts-check

/**
 * Shorthand for `element.getAttribute`
 *
 * @param {Element|HTMLElement} el - An HTML element
 * @param {String} attr - The attribute to retrieve
 *
 * @returns {String|null} - The attribute's value
 */
function getAttr(el, attr) {
	return el.getAttribute(attr);
}
/**
 * Shorthand for `element.setAttribute`
 *
 * @param {Element|HTMLElement} el - An HTML element
 * @param {String} attr - The attribute to retrieve
 * @param {String} val - The value to set to the attribute
 */

function setAttr(el, attr, val) {
	el.setAttribute(attr, val);
}
/**
 * Shorthand for `element.removeAttribute`
 *
 * @param {Element|HTMLElement} el - An HTML element
 * @param {String} attr - The attribute to remove
 */

function remAttr(el, attr) {
	el.removeAttribute(attr);
}

/**
 * @typedef defaultOptions
 * @property {String} [css3easing='linear'] - A css3 transtion timing
 * @property {Number} [delayBeforeStart=1000] - Time in milliseconds before the marquee starts animating
 * @property {String} [direction='left'] - Direction towards which the marquee will animate ` 'left' | 'right' | 'up' | 'down'`
 * @property {Boolean} [duplicated=false] - Should the marquee be duplicated to show an effect of continuous flow. Use this only when the text is shorter than the container
 * @property {Number} [duration=5000] - Duration in milliseconds in which you want your element to travel
 * @property {Number} [gap=20] - Gap in pixels between the tickers. Will work only when the `duplicated` option is set to `true`
 * @property {Boolean} [pauseOnHover=false] - Pause the marquee on hover
 * @property {Boolean} [recalcResize=false] - Recalculate the marquee position on resize (breaks compatibility with jquery.marquee)
 * @property {Number} [speed=0] - Speed will override duration. Speed allows you to set a relatively constant marquee speed regardless of the width of the containing element. Speed is measured in pixels/second
 * @property {Boolean} [startVisible=false] - The marquee will be visible from the start if set to `true`
 */
const defOpts = {
	css3easing:       'linear',
	delayBeforeStart: 1000,
	direction:        'left',
	duplicated:       false,
	duration:         5000,
	gap:              20,
	pauseOnHover:     false,
	recalcResize:     false,
	speed:            0,
	startVisible:     false,
};

let instances = 0;

/**
 * Vanilla js marquee based on jQuery.marquee
 * https://github.com/aamirafridi/jQuery.Marquee
 */
class marquee {

	/**
	 * Constructor
	 *
	 * @param {Element} el - The element where the marquee is applied
	 * @param {defaultOptions} opts - the options
	 */
	constructor( el, opts ) {

		if ( typeof el === 'undefined' )
			throw new Error( 'el cannot be undefined' );

		if ( typeof el === 'string' )
			throw new Error( 'el cannot be just a selector' );

		if ( el === null )
			throw new Error( 'el cannot be null' );

		opts = {
			...defOpts,
			...opts,
		};

		this.el = el;
		this._loopCount = 3;

		// Check for data-option since they have top priority
		for ( const option in defOpts ) {

			let currData = getAttr( el, `data-${defOpts[option]}` );

			if ( currData !== null && currData !== '' ) {

				if ( currData === 'true' || currData === 'false' )
					currData = Boolean( currData );

				opts[option] = currData;

			}

		}

		// Reintroduce speed as an option. It calculates duration as a factor of the container width
		// measured in pixels per second.
		if ( opts.speed )
			opts.duration = parseInt( el.clientWidth ) / opts.speed * 1000;

		// no gap if not duplicated
		opts.gap = opts.duplicated ? parseInt( opts.gap ) : 0;

		// wrap inner content into a div
		el.innerHTML = `<div class="js-marquee">${el.innerHTML}</div>`;

		// Make a copy of the element
		const marq = byClass( 'js-marquee', el )[0];

		marq.style.marginRight = `${opts.gap}px`;
		marq.style.willChange  = 'transform';
		marq.style.float       = 'left';

		if ( opts.duplicated )
			el.appendChild( marq.cloneNode( true ) );

		// wrap both inner elements into one div
		el.innerHTML = `<div style="width:100000px" class="js-marquee-wrapper">${el.innerHTML}</div>`;

		// Save the reference of the wrapper
		const marqWrap = byClass( 'js-marquee-wrapper', el )[0],
			vertical     = ( opts.direction === 'up' || opts.direction === 'down' );

		this._marqWrap = marqWrap;
		this._vertical = vertical;
		this._duration = opts.duration;
		this._opts     = opts;

		this._calcSizes();

		const animationName = `marqueeAnimation-${Math.floor( Math.random() * 10000000 )}`,
			animStr           = this._animationStr(
				animationName,
				opts.duration / 1000,
				opts.delayBeforeStart / 1000,
				'infinite',
			);

		this._animName = animationName;
		this._animStr = animStr;

		// if duplicated option is set to true than position the wrapper
		if ( opts.duplicated ) {

			if ( vertical ) {

				if ( opts.startVisible )
					this._marqWrap.style.transform = 'translateY(0px)';
				else
					this._marqWrap.style.transform = `translateY(${opts.direction === 'up' ? this._contHeight : ( -1 * ( ( this._elHeight * 2 ) - opts.gap ) )}px)`;

			} else {

				if ( opts.startVisible ) // eslint-disable-line no-lonely-if
					this._marqWrap.style.transform = 'translateX(0px)';
				else
					this._marqWrap.style.transform = `translateX(${opts.direction === 'left' ? this._contWidth : ( -1 * ( ( this._elWidth * 2 ) - opts.gap ) )}px)`;

			}

			// If the text starts out visible we can skip the two initial loops
			if ( !opts.startVisible )
				this._loopCount = 1;

		} else if ( opts.startVisible ) {

			// We only have two different loops if marquee is duplicated and starts visible
			this._loopCount = 2;

		} else {

			if ( vertical ) // eslint-disable-line no-lonely-if
				this._repositionVert();
			else
				this._repositionHor();

		}

		addEvent( this.el, 'pause', this.pause.bind( this ) );
		addEvent( this.el, 'resume', this.resume.bind( this ) );

		if ( opts.pauseOnHover ) {

			addEvent( this.el, 'mouseover', this.pause.bind( this ) );
			addEvent( this.el, 'mouseout', this.resume.bind( this ) );

		}

		/**
		 * Method for animation end event
		 */
		this._animEnd = () => {
			this._animate( vertical );
			this.el.dispatchEvent( new CustomEvent( 'finished' ) );
		};

		this._instance = instances;
		instances++;

		this._animate( vertical );

		if ( opts.recalcResize )
			addEvent( window, 'resize', this._recalcResize.bind( this ) );

	}

	/**
	 * Build the css string for the animation
	 *
	 * @privte
	 * @param {String} [name=''] - animation name
	 * @param {Number} [duration=0] - Animation duration (in s)
	 * @param {Number} [delay=0] - Animation delay before starting (in s)
	 * @param {String} [loops=''] - Animation iterations
	 *
	 * @returns {String} css animation string
	 */
	_animationStr( name = '', duration = 0, delay = 0, loops = '' ) {
		return `${name} ${duration}s ${delay}s ${loops} ${this._opts.css3easing}`;
	}

	/**
	 * Animation of the marquee
	 *
	 * @private
	 * @param {Boolean} vertical - Vertical direction
	 */
	_animate( vertical = false ) {

		const opts = this._opts;

		if ( opts.duplicated ) {

			// When duplicated, the first loop will be scroll longer so double the duration
			if ( this._loopCount === 1 ) {

				let duration = opts.duration;

				if ( vertical )
					duration = ( opts.direction === 'up' ) ? duration + ( this._contHeight / ( this._elHeight / duration ) ) : duration * 2;
				else
					duration = ( opts.direction === 'left' ) ? duration + ( this._contWidth / ( this._elWidth / duration ) ) : duration * 2;

				this._animStr = this._animationStr(
					this._animName,
					duration / 1000,
					opts.delayBeforeStart / 1000,
				);

				// On 2nd loop things back to normal, normal duration for the rest of animations
			} else if ( this._loopCount === 2 ) {
				this._animName = `${this._animName}0`;
				this._animStr = this._animationStr(
					this._animName,
					opts.duration / 1000,
					0,
					'infinite',
				);
			}

			this._loopCount++;

		}

		let animationCss = '';

		if ( vertical ) {
			if ( opts.duplicated ) {

				// Adjust the starting point of animation only when first loops finishes
				if ( this._loopCount > 2 )
					this._marqWrap.style.transform = `translateY(${( opts.direction === 'up' ) ? 0 : -1 * this._elHeight}px)`;

				animationCss = `translateY(${( opts.direction === 'up' ) ? -1 * this._elHeight : 0}px)`;

			} else if ( opts.startVisible ) {

				// This loop moves the marquee out of the container
				if ( this._loopCount === 2 ) {

					// Adjust the css3 animation as well
					this._animStr = this._animationStr(
						this._animName,
						opts.duration / 1000,
						opts.delayBeforeStart / 1000,
					);
					animationCss = `translateY(${( opts.direction === 'up' ) ? -1 * this._elHeight : this._contHeight}px)`;

					this._loopCount++;

				} else if ( this._loopCount === 3 ) {

					this._animName = `${this._animName}0`;
					this._animStr = this._animationStr(
						this._animName,
						this._completeDuration / 1000,
						0,
						'infinite',
					);
					this._repositionVert();

				}

			} else {

				this._repositionVert();
				animationCss = `translateY(${( opts.direction === 'up' ) ? -1 * this._marqWrap.clientHeight : this._contHeight}px)`;

			}
		} else {

			if ( opts.duplicated ) { // eslint-disable-line no-lonely-if

				// Adjust the starting point of animation only when first loops finishes
				if ( this._loopCount > 2 )
					this._marqWrap.style.transform = `translateX(${( opts.direction === 'left' ) ? 0 : -1 * this._elWidth}px)`;

				animationCss = `translateX(${( opts.direction === 'left' ) ? -1 * this._elWidth : 0}px)`;

			} else if ( opts.startVisible ) {

				// This loop moves the marquee out of the container
				if ( this._loopCount === 2 ) {

					// Adjust the css3 animation as well
					this._animStr = this._animationStr(
						this._animName,
						opts.duration / 1000,
						opts.delayBeforeStart / 1000,
					);
					animationCss = `translateX(${( opts.direction === 'left' ) ? -1 * this._elWidth : this._contWidth}px)`;

					this._loopCount++;

				} else if ( this._loopCount === 3 ) {

					// Adjust the animation
					this._animName = `${this._animName}0`;
					this._animStr = this._animationStr(
						this._animName,
						opts.duration / 1000,
						0,
						'infinite',
					);
					this._repositionHor();

				}

			} else {
				this._repositionHor();
				animationCss = `translateX(${( opts.direction === 'left' ) ? -1 * this._elWidth : this._contWidth}px)`;
			}
		}

		// fire event
		this.el.dispatchEvent( new CustomEvent( 'beforeStarting' ) );

		// Append animation
		this._marqWrap.style.animation = this._animStr;

		const keyFrameCss = `@keyframes ${this._animName} {
        100% {
          transform: ${animationCss};
        }
      }`,
			styles = queryAll( 'style', this._marqWrap );

		if ( styles.length )
			styles[styles.length - 1].innerHTML = keyFrameCss;
		else if ( byClass( `marq-wrap-style-${this._instance}` ).length )
			byClass( `marq-wrap-style-${this._instance}` )[0].innerHTML = keyFrameCss;
		else {

			const styleEl = document.createElement( 'style' );
			addClass( styleEl, `marq-wrap-style-${this._instance}` );
			styleEl.innerHTML = keyFrameCss;

			query( 'head' ).appendChild( styleEl );

		}

		// Animation iteration event
		addEvent( this._marqWrap, 'animationiteration', this._animIter.bind( this ), {
			once: true,
		});

		// Animation stopped
		addEvent( this._marqWrap, 'animationend', this._animEnd.bind( this ), {
			once: true,
		});

		this._status = 'running';
		setAttr( this.el, 'data-runningStatus', 'resumed' );

	}

	/**
	 * Event fired on Animation iteration
	 *
	 * @private
	 */
	_animIter() {
		this.el.dispatchEvent( new CustomEvent( 'finished' ) );
	}

	/**
	 * Reposition the Wrapper vertically
	 *
	 * @private
	 */
	_repositionVert() {
		this._marqWrap.style.transform = `translateY(${this._opts.direction === 'up' ? this._contHeight : ( this._elHeight * -1 )}px)`;
	}

	/**
	 * Reposition the Wrapper horizontally
	 *
	 * @private
	 */
	_repositionHor() {
		this._marqWrap.style.transform = `translateX(${this._opts.direction === 'left' ? this._contWidth : ( this._elWidth * -1 )}px)`;
	}

	/**
	 * Calculates the speed and the dimension of the marquee
	 *
	 * @private
	 */
	_calcSizes() {

		const el = this.el,
			opts   = this._opts;

		// If direction is up or down, get the height of main element
		if ( this._vertical ) {

			const contHeight = el.clientHeight;
			this._contHeight = contHeight;

			remAttr( this._marqWrap, 'style' );

			el.style.clientHeight = `${contHeight}px`;

			const marqs = byClass( 'js-marquee', el ),
				marqNums  = marqs.length - 1;

			// Change the CSS for js-marquee element
			forEachHTML( marqs, ( currEl, ind ) => {

				currEl.style.float        = 'none';
				currEl.style.marginRight  = '0px';

				// Remove bottom margin from 2nd element if duplicated
				if ( opts.duplicated && ind === marqNums )
					currEl.style.marginBottom = '0px';
				else
					currEl.style.marginBottom = `${opts.gap}px`;

			});

			const elHeight = parseInt( marqs[0].clientHeight + opts.gap );
			this._elHeight = elHeight;

			// adjust the animation duration according to the text length
			if ( opts.startVisible && !opts.duplicated ) {
				// Compute the complete animation duration and save it for later reference
				// formula is to: (Height of the text node + height of the main container / Height of the main container) * duration;
				this._completeDuration = ( elHeight + contHeight ) / parseInt( contHeight ) * this._duration; // eslint-disable-line max-len
				opts.duration = elHeight / parseInt( contHeight ) * this._duration;
			} else // formula is to: (Height of the text node + height of the main container / Height of the main container) * duration;
				opts.duration = elHeight / parseInt( contHeight ) / parseInt( contHeight ) * this._duration;

		} else {

			// Save the width of the each element so we can use it in animation
			const elWidth = parseInt( byClass( 'js-marquee', el )[0].clientWidth + opts.gap ),
				contWidth   = el.clientWidth;

			this._contWidth = contWidth;
			this._elWidth   = elWidth;

			// adjust the animation duration according to the text length
			if ( opts.startVisible && !opts.duplicated ) {
				// Compute the complete animation duration and save it for later reference
				// formula is to: (Width of the text node + width of the main container / Width of the main container) * duration;
				this._completeDuration = ( elWidth + contWidth ) / parseInt( contWidth ) * this._duration;
				// (Width of the text node / width of the main container) * duration
				opts.duration = elWidth / parseInt( contWidth ) * this._duration;
			} else // formula is to: (Width of the text node + width of the main container / Width of the main container) * duration;
				opts.duration = ( elWidth + parseInt( contWidth ) ) / parseInt( contWidth ) * this._duration; // eslint-disable-line max-len
		}

		// if duplicated then reduce the duration
		if ( opts.duplicated )
			opts.duration = opts.duration / 2;

	}

	/**
	 * Recalculates the dimensions and positon of the marquee on page resize
	 *
	 * @private
	 */
	_recalcResize() {

		this._calcSizes();

		this._loopCount = 2;
		this._animEnd();

	}

	/**
	 * Pause the animation
	 */
	pause() {
		this._marqWrap.style.animationPlayState = 'paused';
		this._status = 'paused';

		setAttr( this.el, 'data-runningStatus', 'paused' );
		this.el.dispatchEvent( new CustomEvent( 'paused' ) );
	}

	/**
	 * Resume the animation
	 */
	resume() {
		this._marqWrap.style.animationPlayState = 'running';
		this._status = 'running';

		setAttr( this.el, 'data-runningStatus', 'resumed' );
		this.el.dispatchEvent( new CustomEvent( 'resumed' ) );
	}

	/**
	 * Toggle animation playing status
	 */
	toggle() {

		if ( this._status === 'paused' )
			this.resume();
		else if ( this._status === 'running' )
			this.pause();

	}

	/**
	 * Destorys the instance and removes events
	 */
	destroy() {

		removeEvent( this.el, 'pause', this.pause.bind( this ) );
		removeEvent( this.el, 'resume', this.resume.bind( this ) );

		if ( this._opts.pauseOnHover ) {

			removeEvent( this.el, 'mouseover', this.pause.bind( this ) );
			removeEvent( this.el, 'mouseout', this.resume.bind( this ) );

		}

		removeEvent( this._marqWrap, 'animationiteration', this._animIter.bind( this ), {
			once: true,
		});

		removeEvent( this._marqWrap, 'animationend', this._animEnd.bind( this ), {
			once: true,
		});

		if ( this._opts.recalcResize )
			removeEvent( window, 'resize', this._recalcResize.bind( this ) );

	}

	/**
	 * Forces a refresh (like recalcResize) but done manually
	 */
	refresh() {
		this._recalcResize();
	}

}

!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
			? define(t)
			: ((e =
				"undefined" != typeof globalThis
					? globalThis
					: e || self).MicroModal = t());
})(this, function () {
	"use strict";
	function e(e, t) {
		for (var o = 0; o < t.length; o++) {
			var n = t[o];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
			"value" in n && (n.writable = !0),
				Object.defineProperty(e, n.key, n);
		}
	}
	function t(e) {
		return (
			(function (e) {
				if (Array.isArray(e)) return o(e);
			})(e) ||
			(function (e) {
				if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
					return Array.from(e);
			})(e) ||
			(function (e, t) {
				if (!e) return;
				if ("string" == typeof e) return o(e, t);
				var n = Object.prototype.toString.call(e).slice(8, -1);
				"Object" === n && e.constructor && (n = e.constructor.name);
				if ("Map" === n || "Set" === n) return Array.from(e);
				if (
					"Arguments" === n ||
					/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				)
					return o(e, t);
			})(e) ||
			(function () {
				throw new TypeError(
					"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
				);
			})()
		);
	}
	function o(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var o = 0, n = new Array(t); o < t; o++) n[o] = e[o];
		return n;
	}
	var n,
		i,
		a,
		r,
		s,
		l =
			((n = [
				"a[href]",
				"area[href]",
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				"select:not([disabled]):not([aria-hidden])",
				"textarea:not([disabled]):not([aria-hidden])",
				"button:not([disabled]):not([aria-hidden])",
				"iframe",
				"object",
				"embed",
				"[contenteditable]",
				'[tabindex]:not([tabindex^="-"])',
			]),
				(i = (function () {
					function o(e) {
						var n = e.targetModal,
							i = e.triggers,
							a = void 0 === i ? [] : i,
							r = e.onShow,
							s = void 0 === r ? function () {} : r,
							l = e.onClose,
							c = void 0 === l ? function () {} : l,
							d = e.openTrigger,
							u = void 0 === d ? "data-micromodal-trigger" : d,
							f = e.closeTrigger,
							h = void 0 === f ? "data-micromodal-close" : f,
							v = e.openClass,
							g = void 0 === v ? "is-open" : v,
							m = e.disableScroll,
							b = void 0 !== m && m,
							y = e.disableFocus,
							p = void 0 !== y && y,
							w = e.awaitCloseAnimation,
							E = void 0 !== w && w,
							k = e.awaitOpenAnimation,
							M = void 0 !== k && k,
							A = e.debugMode,
							C = void 0 !== A && A;
						!(function (e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function");
						})(this, o),
							(this.modal = document.getElementById(n)),
							(this.config = {
								debugMode: C,
								disableScroll: b,
								openTrigger: u,
								closeTrigger: h,
								openClass: g,
								onShow: s,
								onClose: c,
								awaitCloseAnimation: E,
								awaitOpenAnimation: M,
								disableFocus: p,
							}),
						a.length > 0 && this.registerTriggers.apply(this, t(a)),
							(this.onClick = this.onClick.bind(this)),
							(this.onKeydown = this.onKeydown.bind(this));
					}
					var i, a, r;
					return (
						(i = o),
						(a = [
							{
								key: "registerTriggers",
								value: function () {
									for (
										var e = this, t = arguments.length, o = new Array(t), n = 0;
										n < t;
										n++
									)
										o[n] = arguments[n];
									o.filter(Boolean).forEach(function (t) {
										t.addEventListener("click", function (t) {
											return e.showModal(t);
										});
									});
								},
							},
							{
								key: "showModal",
								value: function () {
									var e = this,
										t =
											arguments.length > 0 && void 0 !== arguments[0]
												? arguments[0]
												: null;
									if (
										((this.activeElement = document.activeElement),
											this.modal.setAttribute("aria-hidden", "false"),
											this.modal.classList.add(this.config.openClass),
											this.scrollBehaviour("disable"),
											this.addEventListeners(),
											this.config.awaitOpenAnimation)
									) {
										var o = function t() {
											e.modal.removeEventListener("animationend", t, !1),
												e.setFocusToFirstNode();
										};
										this.modal.addEventListener("animationend", o, !1);
									} else this.setFocusToFirstNode();
									this.config.onShow(this.modal, this.activeElement, t);
								},
							},
							{
								key: "closeModal",
								value: function () {
									var e =
											arguments.length > 0 && void 0 !== arguments[0]
												? arguments[0]
												: null,
										t = this.modal;
									if (
										(this.modal.setAttribute("aria-hidden", "true"),
											this.removeEventListeners(),
											this.scrollBehaviour("enable"),
										this.activeElement &&
										this.activeElement.focus &&
										this.activeElement.focus(),
											this.config.onClose(this.modal, this.activeElement, e),
											this.config.awaitCloseAnimation)
									) {
										var o = this.config.openClass;
										this.modal.addEventListener(
											"animationend",
											function e() {
												t.classList.remove(o),
													t.removeEventListener("animationend", e, !1);
											},
											!1,
										);
									} else t.classList.remove(this.config.openClass);
								},
							},
							{
								key: "closeModalById",
								value: function (e) {
									(this.modal = document.getElementById(e)),
									this.modal && this.closeModal();
								},
							},
							{
								key: "scrollBehaviour",
								value: function (e) {
									if (this.config.disableScroll) {
										var t = document.querySelector("body");
										switch (e) {
											case "enable":
												Object.assign(t.style, { overflow: "" });
												break;
											case "disable":
												Object.assign(t.style, { overflow: "hidden" });
										}
									}
								},
							},
							{
								key: "addEventListeners",
								value: function () {
									this.modal.addEventListener("touchstart", this.onClick),
										this.modal.addEventListener("click", this.onClick),
										document.addEventListener("keydown", this.onKeydown);
								},
							},
							{
								key: "removeEventListeners",
								value: function () {
									this.modal.removeEventListener("touchstart", this.onClick),
										this.modal.removeEventListener("click", this.onClick),
										document.removeEventListener("keydown", this.onKeydown);
								},
							},
							{
								key: "onClick",
								value: function (e) {
									(e.target.hasAttribute(this.config.closeTrigger) ||
										e.target.parentNode.hasAttribute(this.config.closeTrigger)) &&
									(e.preventDefault(), e.stopPropagation(), this.closeModal(e));
								},
							},
							{
								key: "onKeydown",
								value: function (e) {
									27 === e.keyCode && this.closeModal(e),
									9 === e.keyCode && this.retainFocus(e);
								},
							},
							{
								key: "getFocusableNodes",
								value: function () {
									var e = this.modal.querySelectorAll(n);
									return Array.apply(void 0, t(e));
								},
							},
							{
								key: "setFocusToFirstNode",
								value: function () {
									var e = this;
									if (!this.config.disableFocus) {
										var t = this.getFocusableNodes();
										if (0 !== t.length) {
											var o = t.filter(function (t) {
												return !t.hasAttribute(e.config.closeTrigger);
											});
											o.length > 0 && o[0].focus(),
											0 === o.length && t[0].focus();
										}
									}
								},
							},
							{
								key: "retainFocus",
								value: function (e) {
									var t = this.getFocusableNodes();
									if (0 !== t.length)
										if (
											((t = t.filter(function (e) {
												return null !== e.offsetParent;
											})),
												this.modal.contains(document.activeElement))
										) {
											var o = t.indexOf(document.activeElement);
											e.shiftKey &&
											0 === o &&
											(t[t.length - 1].focus(), e.preventDefault()),
											!e.shiftKey &&
											t.length > 0 &&
											o === t.length - 1 &&
											(t[0].focus(), e.preventDefault());
										} else t[0].focus();
								},
							},
						]) && e(i.prototype, a),
						r && e(i, r),
							o
					);
				})()),
				(a = null),
				(r = function (e) {
					if (!document.getElementById(e))
						return (
							console.warn(
								"MicroModal: ❗Seems like you have missed %c'".concat(e, "'"),
								"background-color: #f8f9fa;color: #50596c;font-weight: bold;",
								"ID somewhere in your code. Refer example below to resolve it.",
							),
								console.warn(
									"%cExample:",
									"background-color: #f8f9fa;color: #50596c;font-weight: bold;",
									'<div class="modal" id="'.concat(e, '"></div>'),
								),
								!1
						);
				}),
				(s = function (e, t) {
					if (
						((function (e) {
							e.length <= 0 &&
							(console.warn(
								"MicroModal: ❗Please specify at least one %c'micromodal-trigger'",
								"background-color: #f8f9fa;color: #50596c;font-weight: bold;",
								"data attribute.",
							),
								console.warn(
									"%cExample:",
									"background-color: #f8f9fa;color: #50596c;font-weight: bold;",
									'<a href="#" data-micromodal-trigger="my-modal"></a>',
								));
						})(e),
							!t)
					)
						return !0;
					for (var o in t) r(o);
					return !0;
				}),
				{
					init: function (e) {
						var o = Object.assign(
								{},
								{ openTrigger: "data-micromodal-trigger" },
								e,
							),
							n = t(document.querySelectorAll("[".concat(o.openTrigger, "]"))),
							r = (function (e, t) {
								var o = [];
								return (
									e.forEach(function (e) {
										var n = e.attributes[t].value;
										void 0 === o[n] && (o[n] = []), o[n].push(e);
									}),
										o
								);
							})(n, o.openTrigger);
						if (!0 !== o.debugMode || !1 !== s(n, r))
							for (var l in r) {
								var c = r[l];
								(o.targetModal = l), (o.triggers = t(c)), (a = new i(o));
							}
					},
					show: function (e, t) {
						var o = t || {};
						(o.targetModal = e),
						(!0 === o.debugMode && !1 === r(e)) ||
						(a && a.removeEventListeners(), (a = new i(o)).showModal());
					},
					close: function (e) {
						e ? a.closeModalById(e) : a.closeModal();
					},
				});
	return "undefined" != typeof window && (window.MicroModal = l), l;
});

!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=18)}([function(t,e,r){"use strict";function n(t){var e=t.length;return function(r){for(var n={},o=u(l(r)),i=0;i<e;i++)n[t[i]]=void 0!==o[i]?parseFloat(o[i]):1;return n}}e.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.splitColorValues=n;var i=function(t){return Object.prototype.toString.call(t).slice(8,-1)},a=/([a-z])([A-Z])/g,s="undefined"!=typeof performance&&performance.now,u=(e.camelToDash=function(t){return t.replace(a,"$1-$2").toLowerCase()},e.currentTime=s?function(){return performance.now()}:function(){return(new Date).getTime()},e.setDOMAttrs=function(t,e){for(var r in e)e.hasOwnProperty(r)&&t.setAttribute(r,e[r])},e.splitCommaDelimited=function(t){return p(t)?t.split(/,\s*/):[t]}),c=e.contains=function(t){return function(e){return p(t)&&-1!==e.indexOf(t)}},f=e.isFirstChars=function(t){return function(e){return p(t)&&0===e.indexOf(t)}},l=(e.createUnitType=function(t,e){return{test:c(t),parse:parseFloat,transform:e}},e.getValueFromFunctionString=function(t){return t.substring(t.indexOf("(")+1,t.lastIndexOf(")"))}),p=(e.isArray=function(t){return"Array"===i(t)},e.isFunc=function(t){return"Function"===i(t)},e.isNum=function(t){return"number"==typeof t},e.isObj=function(t){return"object"===(void 0===t?"undefined":o(t))},e.isString=function(t){return"string"==typeof t}),h=e.isHex=f("#"),d=e.isRgb=f("rgb"),y=e.isHsl=f("hsl");e.isColor=function(t){return h(t)||d(t)||y(t)}},function(t,e,r){"use strict";function n(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},a=r(2),s=r(3),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,t),this.scheduledUpdate=this.scheduledUpdate.bind(this),this.props=i({},this.constructor.defaultProps),this.setProps(e),this.lastUpdated=0,this.prev=this.current=e.current||e.from||0}return t.prototype.start=function(){var t=this.props,e=t.onStart,r=t._onStart;return t.passive||(this._isActive=!0,(0,a.onFrameUpdate)(this.scheduledUpdate)),this.onStart&&this.onStart(),e&&e(this),r&&r(this),this},t.prototype.stop=function(){var t=this.props,e=t.onStop,r=t._onStop;return t.passive||(this._isActive=!1,(0,a.cancelOnFrameUpdate)(this.scheduledUpdate)),this.onStop&&this.onStop(),e&&e(this),r&&r(this),this},t.prototype.complete=function(){var t=this.props,e=t.onComplete,r=t._onComplete;return this.stop(),this.onComplete&&this.onComplete(),e&&e(this),r&&r(this),this},t.prototype.scheduledUpdate=function(){this.lastUpdated=(0,a.timeSinceLastFrame)(),this.prev=this.current;var t=this.props,e=t.onUpdate,r=t.passive;return this.update&&(this.current=this.update(this.current)),e&&(e.registerAction?e.set(this.get()):e(this.get(),this)),this.fireListeners(),!r&&this._isActive&&(0,a.onFrameUpdate)(this.scheduledUpdate),this.isActionComplete&&this.isActionComplete()&&this.complete(),this},t.prototype.setProps=function(t){var e=t.onUpdate,r=n(t,["onUpdate"]);return this.props=i({},this.props,r),e&&this.output(e),this},t.prototype.output=function(t){return this.props.onUpdate=t,t.registerAction&&(t.registerAction(this),t.set(this.get())),this},t.prototype.get=function(){var t=this.props.transform;return t?t(this.current):this.current},t.prototype.getBeforeTransform=function(){return this.current},t.prototype.set=function(t){return this.current=t,this},t.prototype.getProp=function(t){return this.props[t]},t.prototype.getVelocity=function(){return(0,s.speedPerSecond)(this.current-this.prev,this.lastUpdated)},t.prototype.isActive=function(){return this._isActive},t.prototype.addListener=function(t){return this.listeners=this.listeners||[],this.numListeners=this.numListeners||0,-1===this.listeners.indexOf(t)&&(this.listeners.push(t),this.numListeners++),this},t.prototype.removeListener=function(t){var e=this.listeners?this.listeners.indexOf(t):-1;return-1!==e&&(this.numListeners--,this.listeners.splice(e,1)),this},t.prototype.fireListeners=function(){for(var t=this.get(),e=0;e<this.numListeners;e++)this.listeners[e](t,this);return this},t}();e.default=u},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(){l||(l=!0,(0,s.default)(i))}function i(t){l=!1,d=Math.max(Math.min(t-h,p),1)*y,h=t,v.process(),m.process(),g.process(),b.process()}e.__esModule=!0,e.currentFrameTimestamp=e.timeSinceLastFrame=e.cancelOnFrameEnd=e.cancelOnFrameRender=e.cancelOnFrameUpdate=e.cancelOnFrameStart=e.onFrameEnd=e.onFrameRender=e.onFrameUpdate=e.onFrameStart=void 0;var a=r(20),s=n(a),u=r(21),c=n(u),f=r(0),l=!1,p=20,h=(0,f.currentTime)(),d=0,y=1,v=(0,c.default)(o),m=(0,c.default)(o),g=(0,c.default)(o),b=(0,c.default)(o);e.onFrameStart=v.schedule,e.onFrameUpdate=m.schedule,e.onFrameRender=g.schedule,e.onFrameEnd=b.schedule,e.cancelOnFrameStart=v.cancel,e.cancelOnFrameUpdate=m.cancel,e.cancelOnFrameRender=g.cancel,e.cancelOnFrameEnd=b.cancel,e.timeSinceLastFrame=function(){return d},e.currentFrameTimestamp=function(){return h}},function(t,e,r){"use strict";e.__esModule=!0,e.stepProgress=e.speedPerSecond=e.speedPerFrame=e.smooth=e.radiansToDegrees=e.pointFromAngleAndDistance=e.getValueFromProgress=e.getProgressFromValue=e.distance=e.dilate=e.degreesToRadians=e.angle=void 0;var n=r(0),o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e=Math.pow(10,e),Math.round(t*e)/e},i={x:0,y:0,z:0},a=function(t,e){return Math.abs(t-e)},s=(e.angle=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;return u(Math.atan2(e.y-t.y,e.x-t.x))},e.degreesToRadians=function(t){return t*Math.PI/180}),u=(e.dilate=function(t,e,r){return t+(e-t)*r},e.distance=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;if((0,n.isNum)(t))return a(t,e);var r=a(t.x,e.x),o=a(t.y,e.y),s=(0,n.isNum)(t.z)?a(t.z,e.z):0;return Math.sqrt(Math.pow(r,2)+Math.pow(o,2)+Math.pow(s,2))},e.getProgressFromValue=function(t,e,r){return(r-t)/(e-t)},e.getValueFromProgress=function(t,e,r){return-r*t+r*e+t},e.pointFromAngleAndDistance=function(t,e,r){return e=s(e),{x:r*Math.cos(e)+t.x,y:r*Math.sin(e)+t.y}},e.radiansToDegrees=function(t){return 180*t/Math.PI});e.smooth=function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return o(e+r*(t-e)/Math.max(n,r))},e.speedPerFrame=function(t,e){return(0,n.isNum)(t)?t/(1e3/e):0},e.speedPerSecond=function(t,e){return e?t*(1e3/e):0},e.stepProgress=function(t,e){var r=1/(t-1),n=1-1/t,o=Math.min(e/n,1);return Math.floor(o/r)*r}},function(t,e,r){"use strict";e.__esModule=!0,e.bezier=e.blendColor=e.alpha=e.color=e.hsla=e.rgba=e.rgbUnit=e.px=e.degrees=e.percent=e.transformChildValues=e.steps=e.snap=e.smooth=e.wrap=e.nonlinearSpring=e.spring=e.generateNonIntergratedSpring=e.multiply=e.divide=e.add=e.subtract=e.interpolate=e.flow=e.pipe=e.conditional=e.clamp=e.clampMin=e.clampMax=e.applyOffset=e.appendUnit=void 0;var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o=r(3),i=r(0),a=r(10),s=r(2),u=function(t){return t},c=e.appendUnit=function(t){return function(e){return""+e+t}},f=(e.applyOffset=function(t,e){var r=d(t),n=y(e);return function(t){return n(r(t))}},e.clampMax=function(t){return function(e){return Math.min(e,t)}}),l=e.clampMin=function(t){return function(e){return Math.max(e,t)}},p=e.clamp=function(t,e){var r=l(t),n=f(e);return function(t){return r(n(t))}},h=(e.conditional=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u;return function(n,o){return t(n,o)?e(n,o):r(n,o)}},e.pipe=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];var n=e.length,o=0;return function(t){for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];var s=t;for(o=0;o<n;o++)s=e[o].apply(e,[s].concat(i));return s}}),d=(e.flow=h,e.interpolate=function(t,e,r){var n=t.length,i=n-1;return function(a){if(a<=t[0])return e[0];if(a>=t[i])return e[i];for(var s=1;s<n&&!(t[s]>a||s===i);s++);var u=(0,o.getProgressFromValue)(t[s-1],t[s],a),c=r?r[s-1](u):u;return(0,o.getValueFromProgress)(e[s-1],e[s],c)}},e.subtract=function(t){return function(e){return e-t}}),y=e.add=function(t){return function(e){return e+t}},v=(e.divide=function(t){return function(e){return e/t}},e.multiply=function(t){return function(e){return e*t}},e.generateNonIntergratedSpring=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u;return function(e,r){return function(n){var o=r-n,i=-e*(0-t(Math.abs(o)));return o<=0?r+i:r-i}}}),m=(e.spring=v(),e.nonlinearSpring=v(Math.sqrt),e.wrap=function(t,e){return function(r){var n=e-t;return((r-t)%n+n)%n+t}},e.smooth=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:50,e=0,r=0;return function(n){var i=(0,s.currentFrameTimestamp)(),a=i!==r?i-r:0,u=a?(0,o.smooth)(n,e,a,t):e;return r=i,e=u,u}},e.snap=function(t){if("number"==typeof t)return function(e){return Math.round(e/t)*t};var e=0,r=t.length;return function(n){var o=Math.abs(t[0]-n);for(e=1;e<r;e++){var i=t[e],a=Math.abs(i-n);if(0===a)return i;if(a>o)return t[e-1];if(e===r-1)return i;o=a}}},e.steps=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"start";return function(i){var a=(0,o.getProgressFromValue)(e,r,i);return(0,o.getValueFromProgress)(e,r,(0,o.stepProgress)(t,a,n))}},e.transformChildValues=function(t){var e={};return function(r){for(var n in r){var o=t[n];o&&(e[n]=o(r[n]))}return e}}),g=e.percent=c("%"),b=(e.degrees=c("deg"),e.px=c("px"),e.rgbUnit=h(p(0,255),Math.round)),O=function(t){var e=t.red,r=t.green,n=t.blue,o=t.alpha;return"rgba("+e+", "+r+", "+n+", "+(void 0===o?1:o)+")"},_=e.rgba=h(m({red:b,green:b,blue:b,alpha:M}),O),w=function(t){var e=t.hue,r=t.saturation,n=t.lightness,o=t.alpha;return"hsla("+e+", "+r+", "+n+", "+(void 0===o?1:o)+")"},P=e.hsla=h(m({hue:parseInt,saturation:g,lightness:g,alpha:M}),w),M=(e.color=function(t){return t.hasOwnProperty("red")?_(t):t.hasOwnProperty("hue")?P(t):t},e.alpha=p(0,1)),x=function(t,e,r){var n=t*t,o=e*e;return Math.sqrt(r*(o-n)+n)},F=(e.blendColor=function(t,e){var r=(0,i.isString)(t)?(0,a.color)(t):t,s=(0,i.isString)(e)?(0,a.color)(e):e,u=n({},r);return function(t){for(var e in u)u[e]=x(r[e],s[e],t);return u.red=x(r.red,s.red,t),u.green=x(r.green,s.green,t),u.blue=x(r.blue,s.blue,t),u.alpha=(0,o.getValueFromProgress)(r.alpha,s.alpha,t),u}},function(t){return function(e){var r=1-e;return(t[0]*r+t[1]*e)*r+(t[1]*r+t[2]*e)*e}}),j=function(t){return function(e){var r=1-e,n=t[1]*r+t[2]*e;return((t[0]*r+t[1]*e)*r+n*e)*r+(n*r+(t[2]*r+t[3]*e)*e)*e}};e.bezier=function(t){return 3===t.length?F(t):j(t)}},function(t,e,r){"use strict";e.__esModule=!0,e.complex=e.color=e.hsla=e.hex=e.rgba=e.rgbUnit=e.scale=e.px=e.percent=e.degrees=e.alpha=e.number=void 0;var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o=r(4),i=r(10),a=r(0),s=e.number={test:a.isNum,parse:parseFloat},u=(e.alpha=n({},s,{transform:o.alpha}),e.degrees=(0,a.createUnitType)("deg",o.degrees),e.percent=(0,a.createUnitType)("%",o.percent),e.px=(0,a.createUnitType)("px",o.px),e.scale=n({},s,{default:1}),e.rgbUnit=n({},s,{transform:o.rgbUnit}),e.rgba={test:a.isRgb,parse:i.rgba,transform:o.rgba}),c=(e.hex=n({},u,{test:a.isHex,parse:i.hex}),e.hsla={test:a.isHsl,parse:i.hsla,transform:o.hsla},e.color={parse:i.color,test:a.isColor,transform:o.color},/(-)?(\d[\d\.]*)/g),f=function(t){return"${"+t+"}"};e.complex={test:function(t){var e=t.match&&t.match(c);return(0,a.isArray)(e)&&e.length>1},parse:function(t){var e={};return t.match(c).forEach(function(t,r){return e[r]=parseFloat(t)}),e},createTransformer:function(t){var e=0,r=t.replace(c,function(){return f(e++)});return function(t){var e=r;for(var n in t)t.hasOwnProperty(n)&&(e=e.replace(f(n),t[n]));return e}}}},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var a=r(1),s=function(t){return t&&t.__esModule?t:{default:t}}(a),u=r(2),c=r(4),f=r(3),l=r(9),p=(0,c.clamp)(0,1),h={loop:function(t){return t.start()},yoyo:function(t){return t.reverse().start()},flip:function(t){return t.flip().start()}},d=function(t){function e(){return n(this,e),o(this,t.apply(this,arguments))}return i(e,t),e.prototype.onStart=function(){var t=this.props,e=t.duration,r=t.playDirection;this.elapsed=1===r?0:e,this.progress=0},e.prototype.update=function(){var t=this.props,e=t.duration,r=t.ease,n=t.from,o=t.to,i=t.playDirection;return this.isManualUpdate||(this.elapsed+=(0,u.timeSinceLastFrame)()*i),this.isManualUpdate=!1,this.progress=p((0,f.getProgressFromValue)(0,e,this.elapsed)),(0,f.getValueFromProgress)(n,o,r(this.progress))},e.prototype.isActionComplete=function(){var t=this.props,e=t.duration,r=t.playDirection,n=t.yoyo,o=t.loop,i=t.flip,a=1===r?this.elapsed>=e:this.elapsed<=0;if(a&&(n||o||i)){var s=!1;for(var u in h){var c=h[u],f=u+"Count",l=this.getProp(u),p=this.getProp(f);if(l>p){var d;this.setProps((d={},d[f]=p+1,d)),c(this),s=!0}}s&&(a=!1)}return a},e.prototype.getElapsed=function(){return this.elapsed},e.prototype.flip=function(){this.elapsed=this.props.duration-this.elapsed;var t=[this.props.to,this.props.from];return this.props.from=t[0],this.props.to=t[1],this},e.prototype.reverse=function(){return this.props.playDirection*=-1,this},e.prototype.seek=function(t){var e=this.props.duration;this.elapsed=(0,f.getValueFromProgress)(0,e,t),this.isManualUpdate=!0,this.isActive()||this.scheduledUpdate()},e}(s.default);d.defaultProps={duration:300,ease:l.easeOut,from:0,to:1,flip:0,flipCount:0,yoyo:0,yoyoCount:0,loop:0,loopCount:0,playDirection:1},e.default=function(t){return new d(t)}},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},i=r(2),a=r(0),s=function(){function t(e){n(this,t),this.render=this.render.bind(this),this.props=o({},this.constructor.defaultProps,e),this.state={},this.changedValues=[]}return t.prototype.get=function(t){return t?void 0!==this.state[t]?this.state[t]:this.read(t):this.state},t.prototype.read=function(t){if(this.onRead)return this.onRead(t)},t.prototype.set=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];if(void 0===e[1]){var n=e[0];for(var o in n)this.setValue(o,n[o])}else{var a=e[0],s=e[1];this.setValue(a,s)}return this.hasChanged&&(0,i.onFrameRender)(this.render),this},t.prototype.setValue=function(t,e){var r=this.state[t];if((0,a.isNum)(e)||(0,a.isString)(e))r!==e&&(this.state[t]=e,this.hasChanged=!0);else if((0,a.isArray)(e)){r||(this.state[t]=[]);for(var n=e.length,o=0;o<n;o++)this.state[t][o]!==e[o]&&(this.state[t][o]=e[o],this.hasChanged=!0)}else if((0,a.isObj)(e)){r||(this.state[t]={});for(var i in e)this.state[t][i]!==e[i]&&(this.state[t][i]=e[i],this.hasChanged=!0)}this.hasChanged&&-1===this.changedValues.indexOf(t)&&this.changedValues.push(t)},t.prototype.render=function(){return(arguments.length>0&&void 0!==arguments[0]&&arguments[0]||this.hasChanged)&&this.onRender&&this.onRender(),this.changedValues.length=0,this.hasChanged=!1,this},t}();e.default=s},function(t,e,r){"use strict";e.__esModule=!0;var n=["X","Y","Z"],o={x:!0,y:!0,z:!0},i=["translate","scale","rotate","skew","transformPerspective"];o.rotate=o.scale=o.transformPerspective=!0,i.forEach(function(t){return n.forEach(function(e){return o[t+e]=!0})}),e.default=o},function(t,e,r){"use strict";e.__esModule=!0,e.cubicBezier=e.anticipate=e.createAnticipateEasing=e.backInOut=e.backOut=e.backIn=e.createBackIn=e.circInOut=e.circOut=e.circIn=e.easeInOut=e.easeOut=e.easeIn=e.createExpoIn=e.linear=e.createMirroredEasing=e.createReversedEasing=void 0;var n=r(4),o=e.createReversedEasing=function(t){return function(e){return 1-t(1-e)}},i=e.createMirroredEasing=function(t){return function(e){return e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2}},a=(e.linear=function(t){return t},e.createExpoIn=function(t){return function(e){return Math.pow(e,t)}}),s=e.easeIn=a(2),u=(e.easeOut=o(s),e.easeInOut=i(s),e.circIn=function(t){return 1-Math.sin(Math.acos(t))}),c=e.circOut=o(u),f=(e.circInOut=i(c),e.createBackIn=function(t){return function(e){return e*e*((t+1)*e-t)}}),l=e.backIn=f(1.525),p=(e.backOut=o(l),e.backInOut=i(l),e.createAnticipateEasing=function(t){var e=f(t);return function(t){return(t*=2)<1?.5*e(t):.5*(2-Math.pow(2,-10*(t-1)))}});e.anticipate=p(1.525),e.cubicBezier=function(t,e,r,o){var i=(0,n.bezier)(0,t,r,1),a=(0,n.bezier)(0,e,o,1);return function(t){return a(i(t))}}},function(t,e,r){"use strict";e.__esModule=!0,e.color=e.hsla=e.rgba=e.hex=void 0;var n=r(0),o=e.hex=function(t){var e=void 0,r=void 0,n=void 0;return t.length>4?(e=t.substr(1,2),r=t.substr(3,2),n=t.substr(5,2)):(e=t.substr(1,1),r=t.substr(2,1),n=t.substr(3,1),e+=e,r+=r,n+=n),{red:parseInt(e,16),green:parseInt(r,16),blue:parseInt(n,16),alpha:1}},i=e.rgba=(0,n.splitColorValues)(["red","green","blue","alpha"]),a=e.hsla=(0,n.splitColorValues)(["hue","saturation","lightness","alpha"]);e.color=function(t){return(0,n.isRgb)(t)?i(t):(0,n.isHex)(t)?o(t):(0,n.isHsl)(t)?a(t):t}},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var a=r(1),s=function(t){return t&&t.__esModule?t:{default:t}}(a),u=function(t){function e(r){n(this,e);var i=o(this,t.call(this,r));return i.playNext=i.playNext.bind(i),i}return i(e,t),e.prototype.onStart=function(){this.props.i=0,this.playCurrent()},e.prototype.playNext=function(){var t=this.props;t.i<t.order.length-1?(this.props.i++,this.playCurrent()):this.complete()},e.prototype.playCurrent=function(){var t=this.props,e=t.i,r=t.order;r[e].props._onComplete=this.playNext,r[e].start()},e.prototype.onStop=function(){var t=this.props,e=t.i;t.order[e].stop()},e}(s.default);e.default=function(t,e){return new u({order:t,onComplete:e})}},function(t,e,r){"use strict";function n(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},u=r(1),c=function(t){return t&&t.__esModule?t:{default:t}}(u),f=r(2),l=function(t){function e(r){o(this,e);var a=(r.actions,n(r,["actions"])),s=i(this,t.call(this,a));return s.current={},s.actionKeys=[],s.addActions(r.actions),s}return a(e,t),e.prototype.addActions=function(t){var e=this;for(var r in t)!function(r){-1===e.actionKeys.indexOf(r)&&e.actionKeys.push(r),e[r]=t[r];var n=function(t){e.current[r]=t,(0,f.onFrameUpdate)(e.scheduledUpdate)};n(e[r].get()),e[r].setProps({_onStop:function(){return e.numActiveActions--}}).addListener(n)}(r)},e.prototype.onStart=function(){var t=this;this.numActiveActions=this.actionKeys.length,this.actionKeys.forEach(function(e){return t[e].start()})},e.prototype.onStop=function(){var t=this;this.actionKeys.forEach(function(e){return t[e].stop()})},e.prototype.getVelocity=function(){var t=this,e={};return this.actionKeys.forEach(function(r){return e[r]=t[r].getVelocity()}),e},e.prototype.isActionComplete=function(){return 0===this.numActiveActions},e}(c.default);l.defaultProps={passive:!0},e.default=function(t,e){return new l(s({actions:t},e))}},function(t,e,r){"use strict";e.__esModule=!0;var n=r(6),o=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=function(t,e){return(0,o.default)({duration:t,onComplete:e})}},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},s=r(1),u=function(t){return t&&t.__esModule?t:{default:t}}(s),c=function(t){function e(){return n(this,e),o(this,t.apply(this,arguments))}return i(e,t),e.prototype.onStart=function(){var t=this,e=this.props.actions;this.numActiveActions=e.length,e.forEach(function(e){e.setProps({_onStop:function(){return t.numActiveActions--}}).start()})},e.prototype.onStop=function(){this.props.actions.forEach(function(t){return t.stop()})},e.prototype.addAction=function(t){var e=this.props.actions;-1===e.indexOf(t)&&e.push(t)},e.prototype.isActionComplete=function(){return 0===this.numActiveActions},e}(u.default);e.default=function(t,e){return new c(a({actions:t},e))}},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var a=r(1),s=function(t){return t&&t.__esModule?t:{default:t}}(a),u=r(2),c=function(t){function e(){return n(this,e),o(this,t.apply(this,arguments))}return i(e,t),e.prototype.set=function(t){return this.toUpdate=t,(0,u.onFrameUpdate)(this.scheduledUpdate),t},e.prototype.update=function(){return void 0!==this.toUpdate?this.toUpdate:this.current},e.prototype.stopRegisteredAction=function(){this.action&&this.action.isActive()&&this.action.stop(),this.action=void 0},e.prototype.registerAction=function(t){return this.stopRegisteredAction(),this.action=t,this},e.prototype.onStop=function(){this.stopRegisteredAction()},e}(s.default);c.defaultProps={passive:!0},e.default=function(t,e){return new c({current:t,onUpdate:e})}},function(t,e,r){"use strict";e.__esModule=!0;var n=r(5);e.default={color:n.color,backgroundColor:n.color,outlineColor:n.color,fill:n.color,stroke:n.color,borderColor:n.color,borderTopColor:n.color,borderRightColor:n.color,borderBottomColor:n.color,borderLeftColor:n.color,borderRadius:n.px,width:n.px,height:n.px,top:n.px,left:n.px,bottom:n.px,right:n.px,rotate:n.degrees,rotateX:n.degrees,rotateY:n.degrees,rotateZ:n.degrees,scale:n.scale,scaleX:n.scale,scaleY:n.scale,scaleZ:n.scale,skewX:n.degrees,skewY:n.degrees,distance:n.px,translateX:n.px,translateY:n.px,translateZ:n.px,perspective:n.px,opacity:n.alpha}},function(t,e,r){"use strict";e.__esModule=!0;var n=r(0),o={},i={},a=["Webkit","Moz","O","ms",""],s=a.length,u=void 0,c=function(t){u=u||document.createElement("div");for(var e=0;e<s;e++){var r=a[e],c=""===r,f=c?t:r+t.charAt(0).toUpperCase()+t.slice(1);f in u.style&&(o[t]=f,i[t]=(c?"":"-")+(0,n.camelToDash)(f))}};e.default=function(t,e){var r=e?i:o;return r[t]||c(t),r[t]}},function(t,e,r){"use strict";var n=r(19),o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}(n);window.popmotion=o},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}e.__esModule=!0,e.svgPath=e.svg=e.css=e.Renderer=e.value=e.stagger=e.tween=e.trackOffset=e.pointer=e.physics=e.parallel=e.delay=e.crossFade=e.composite=e.colorTween=e.chain=e.Action=e.valueTypes=e.transform=e.easing=e.calc=e.currentFrameTimestamp=e.timeSinceLastFrame=e.cancelOnFrameEnd=e.cancelOnFrameRender=e.cancelOnFrameUpdate=e.cancelOnFrameStart=e.onFrameEnd=e.onFrameRender=e.onFrameUpdate=e.onFrameStart=void 0;var i=r(2);Object.defineProperty(e,"onFrameStart",{enumerable:!0,get:function(){return i.onFrameStart}}),Object.defineProperty(e,"onFrameUpdate",{enumerable:!0,get:function(){return i.onFrameUpdate}}),Object.defineProperty(e,"onFrameRender",{enumerable:!0,get:function(){return i.onFrameRender}}),Object.defineProperty(e,"onFrameEnd",{enumerable:!0,get:function(){return i.onFrameEnd}}),Object.defineProperty(e,"cancelOnFrameStart",{enumerable:!0,get:function(){return i.cancelOnFrameStart}}),Object.defineProperty(e,"cancelOnFrameUpdate",{enumerable:!0,get:function(){return i.cancelOnFrameUpdate}}),Object.defineProperty(e,"cancelOnFrameRender",{enumerable:!0,get:function(){return i.cancelOnFrameRender}}),Object.defineProperty(e,"cancelOnFrameEnd",{enumerable:!0,get:function(){return i.cancelOnFrameEnd}}),Object.defineProperty(e,"timeSinceLastFrame",{enumerable:!0,get:function(){return i.timeSinceLastFrame}}),Object.defineProperty(e,"currentFrameTimestamp",{enumerable:!0,get:function(){return i.currentFrameTimestamp}});var a=r(3),s=o(a),u=r(9),c=o(u),f=r(4),l=o(f),p=r(5),h=o(p),d=r(1),y=n(d),v=r(11),m=n(v),g=r(22),b=n(g),O=r(12),_=n(O),w=r(23),P=n(w),M=r(13),x=n(M),F=r(14),j=n(F),S=r(24),E=n(S),C=r(25),A=n(C),T=r(26),U=n(T),R=r(6),k=n(R),V=r(27),D=n(V),I=r(15),L=n(I),Y=r(7),X=n(Y),z=r(28),N=n(z),B=r(30),Z=n(B),H=r(33),K=n(H);e.calc=s,e.easing=c,e.transform=l,e.valueTypes=h,e.Action=y.default,e.chain=m.default,e.colorTween=b.default,e.composite=_.default,e.crossFade=P.default,e.delay=x.default,e.parallel=j.default,e.physics=E.default,e.pointer=A.default,e.trackOffset=U.default,e.tween=k.default,e.stagger=D.default,e.value=L.default,e.Renderer=X.default,e.css=N.default,e.svg=Z.default,e.svgPath=K.default},function(t,e,r){"use strict";e.__esModule=!0;var n=!("undefined"==typeof window||!window.requestAnimationFrame),o=void 0;if(n)o=function(t){return window.requestAnimationFrame(t)};else{var i=0;o=function(t){var e=(new Date).getTime(),r=Math.max(0,16.7-(e-i));i=e+r,setTimeout(function(){return t(i)},r)}}e.default=o},function(t,e,r){"use strict";function n(t){var e=[],r=[];return{schedule:function(e){t(),-1===r.indexOf(e)&&r.push(e)},cancel:function(t){var e=r.indexOf(t);-1!==e&&r.splice(e,1)},process:function(){var t=[r,e];e=t[0],r=t[1],r.length=0;for(var n=e.length,o=0;o<n;o++)e[o]()}}}e.__esModule=!0,e.default=n},function(t,e,r){"use strict";function n(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}e.__esModule=!0;var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},i=r(6),a=function(t){return t&&t.__esModule?t:{default:t}}(i),s=r(4),u=r(5);e.default=function(t){var e=t.from,r=t.to,i=n(t,["from","to"]);return(0,a.default)(o({},i,{from:0,to:1,transform:(0,s.pipe)((0,s.blendColor)(e,r),u.color.transform)}))}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=r(1),u=n(s),c=r(6),f=n(c),l=r(9),p=r(3),h=function(t){function e(){return o(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.onStart=function(){var t=this.props,e=t.duration,r=t.ease,n=t.fader;this.fader=n||(0,f.default)({to:1,duration:e,ease:r}).start()},e.prototype.update=function(){var t=this.props,e=t.from,r=t.to,n=this.fader.get(),o=e.get(),i=r.get();return(0,p.getValueFromProgress)(o,i,n)},e}(u.default);h.defaultProps={ease:l.linear},e.default=function(t){return new h(t)}},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var a=r(1),s=function(t){return t&&t.__esModule?t:{default:t}}(a),u=r(2),c=r(3),f=function(t){function e(){return n(this,e),o(this,t.apply(this,arguments))}return i(e,t),e.prototype.update=function(){var t=this.props,e=t.autoStopSpeed,r=t.acceleration,n=t.friction,o=t.velocity,i=t.spring,a=t.to,s=o,f=(0,u.timeSinceLastFrame)();if(r&&(s+=(0,c.speedPerFrame)(r,f)),n&&(s*=Math.pow(1-n,f/100)),i&&void 0!==a){s+=(a-this.current)*(0,c.speedPerFrame)(i,f)}return this.current+=(0,c.speedPerFrame)(s,f),this.props.velocity=s,this.isComplete=!1!==e&&(!s||Math.abs(s)<=e),this.isComplete&&i&&(this.current=a),this.current},e.prototype.isActionComplete=function(){return this.isComplete},e}(s.default);f.defaultProps={acceleration:0,friction:0,velocity:0,autoStopSpeed:.001},e.default=function(t){return new f(t)}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}function i(t,e){var r=t.x,n=t.y,i=e.eventToPoints,s=e.moveEvent,c=o(e,["eventToPoints","moveEvent"]),l=(0,f.default)({x:(0,u.default)(r),y:(0,u.default)(n)},a({preventDefault:!0},c)),p=function(t){l.getProp("preventDefault")&&t.preventDefault();var e=i(t);l.x.set(e.x),l.y.set(e.y)};return l.setProps({_onStart:function(){return document.documentElement.addEventListener(s,p,{passive:!l.getProp("preventDefault")})},_onStop:function(){return document.documentElement.removeEventListener(s,p)}}),l}e.__esModule=!0;var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},s=r(15),u=n(s),c=r(12),f=n(c),l=function(t){return{x:t.clientX,y:t.clientY}},p=function(t){var e=t.changedTouches;return{x:e[0].clientX,y:e[0].clientY}},h=function(t){return t.originalEvent||t.nativeEvent||t};e.default=function(t,e){return h(t).touches?i(p(t),a({moveEvent:"touchmove",eventToPoints:p},e)):i(l(t),a({moveEvent:"mousemove",eventToPoints:l},e))}},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},s=r(1),u=function(t){return t&&t.__esModule?t:{default:t}}(s),c=r(4),f=function(t){function e(){return n(this,e),o(this,t.apply(this,arguments))}return i(e,t),e.prototype.onStart=function(){var t=this.props.action;this.applyOffset=(0,c.applyOffset)(t.get(),this.current)},e.prototype.update=function(){var t=this.props.action;return this.applyOffset(t.get())},e}(u.default);e.default=function(t,e){return new f(a({action:t},e))}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=r(11),i=n(o),a=r(14),s=n(a),u=r(13),c=n(u),f=r(0);e.default=function(t,e,r){var n=(0,f.isFunc)(e);return(0,s.default)(t.map(function(t,r){var o=n?e(r):r*e;return(0,i.default)([(0,c.default)(o),t])}),{onComplete:r})}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};e.default=function(t,e){return new g(s({element:t,enableHardwareAcceleration:!0},e))};var u=r(7),c=n(u),f=r(29),l=n(f),p=r(8),h=n(p),d=r(16),y=n(d),v=r(17),m=n(v),g=function(t){function e(){return o(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.onRender=function(){var t=this.props,e=t.element,r=t.enableHardwareAcceleration;(0,l.default)(e,this.state,this.changedValues,r)},e.prototype.onRead=function(t){var e=y.default[t];if(h.default[t])return e?e.default||0:0;var r=this.props.element,n=window.getComputedStyle(r,null)[(0,m.default)(t)]||0;return e&&e.parse?e.parse(n):n},e}(c.default)},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){return F.indexOf(t)-F.indexOf(e)}function i(t,e,r,n){for(var i="",a="",u=!1,f=!1,h=r.length,d=0;d<h;d++){var y=r[d];if(s.default[y]){u=!0;for(var v in e)s.default[v]&&-1===r.indexOf(v)&&r.push(v);break}}r.sort(o);for(var m=r.length,g=0;g<m;g++){var b=r[g],O=e[b];x[b]&&(b=x[b]),c.default[b]&&((0,p.isNum)(O)||(0,p.isObj)(O))&&c.default[b].transform&&(O=c.default[b].transform(O)),s.default[b]?(a+=b+"("+O+") ",f=b===x.z||f):i+=";"+(0,l.default)(b,!0)+":"+O}u&&(!f&&n&&(a+=x.z+"(0)"),i+=";"+(0,l.default)("transform",!0)+":"+a),t.style.cssText+=i}e.__esModule=!0,e.default=i;var a=r(8),s=n(a),u=r(16),c=n(u),f=r(17),l=n(f),p=r(0),h=s.default.translate,d=s.default.translateX,y=s.default.translateY,v=s.default.translateZ,m=s.default.scale,g=s.default.scaleX,b=s.default.scaleY,O=s.default.scaleZ,_=s.default.rotate,w=s.default.rotateX,P=s.default.rotateY,M=s.default.rotateZ,x={x:"translateX",y:"translateY",z:"translateZ"},F=[h,d,y,v,m,g,b,O,_,w,P,M]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};e.default=function(t,e){return new m(s({element:t},e))};var u=r(7),c=n(u),f=r(31),l=n(f),p=r(8),h=n(p),d=r(32),y=n(d),v=r(0),m=function(t){function e(r){o(this,e);var n=i(this,t.call(this,r)),a=r.element.getBBox(),s=a.x,u=a.y,c=a.width,f=a.height;return n.elementDimensions={x:s,y:u,width:c,height:f},n}return a(e,t),e.prototype.onRender=function(){var t=this.props.element,e=(0,l.default)(this.state,this.elementDimensions);(0,v.setDOMAttrs)(t,e)},e.prototype.onRead=function(t){var e=this.props.element;if(h.default[t]){var r=y.default[t];return r?r.default:0}return e.getAttribute(t)},e}(c.default)},function(t,e,r){"use strict";function n(t,e){var r=!1,n={},i=void 0!==t.scale?t.scale||s:t.scaleX||1,u=void 0!==t.scaleY?t.scaleY||s:i||1,c=e.width*((t.originX||50)/100)+e.x,f=e.height*((t.originY||50)/100)+e.y,l=1*i*-c,p=1*u*-f,h=c/i,d=f/u,y={translate:"translate("+t.translateX+", "+t.translateY+") ",scale:"translate("+l+", "+p+") scale("+i+", "+u+") translate("+h+", "+d+") ",rotate:"rotate("+t.rotate+", "+c+", "+f+") ",skewX:"skewX("+t.skewX+") ",skewY:"skewY("+t.skewY+") "};for(var v in t)t.hasOwnProperty(v)&&(a.default[v]?r=!0:n[(0,o.camelToDash)(v)]=t[v]);if(r){n.transform="";for(var m in y)if(y.hasOwnProperty(m)){var g="scale"===m?"1":"0";n.transform+=y[m].replace(/undefined/g,g)}}return n}e.__esModule=!0,e.default=n;var o=r(0),i=r(8),a=function(t){return t&&t.__esModule?t:{default:t}}(i),s=1e-4},function(t,e,r){"use strict";e.__esModule=!0;var n=r(5);e.default={fill:n.color,stroke:n.color,scale:n.scale,scaleX:n.scale,scaleY:n.scale,opacity:n.alpha,fillOpacity:n.alpha,strokeOpacity:n.alpha}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};e.default=function(t,e){return new h(s({element:t},e))};var u=r(7),c=n(u),f=r(34),l=n(f),p=r(0),h=function(t){function e(r){o(this,e);var n=i(this,t.call(this,r)),a=r.element.getBBox(),s=a.x,u=a.y,c=a.width,f=a.height;return n.elementDimensions={x:s,y:u,width:c,height:f,pathLength:r.element.getTotalLength()},n}return a(e,t),e.prototype.onRender=function(){var t=this.elementDimensions.pathLength,e=this.props.element;(0,p.setDOMAttrs)(e,(0,l.default)(this.state,t))},e.prototype.onRead=function(t){return this.props.element.getAttribute(t)},e}(c.default)},function(t,e,r){"use strict";e.__esModule=!0;var n=function(t,e){return parseFloat(t)/100*e+"px"};e.default=function(t,e){var r={},o={length:"0",spacing:e+"px"},i=!1;for(var a in t)if(t.hasOwnProperty(a)){var s=t[a];switch(a){case"length":case"spacing":i=!0,o[a]=n(s,e);break;case"offset":r["stroke-dashoffset"]=n(-s,e);break;default:r[a]=s}}return i&&(r["stroke-dasharray"]=o.length+" "+o.spacing),r}}]);
/**
 * velocity-animate (C) 2014-2017 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Velocity=t()}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e};function i(e){return!0===e||!1===e}function o(e){return"[object Function]"===Object.prototype.toString.call(e)}function a(e){return!(!e||!e.nodeType)}function l(e){return"number"==typeof e}function s(t){if(!t||"object"!==(void 0===t?"undefined":e(t))||t.nodeType||"[object Object]"!==Object.prototype.toString.call(t))return!1;var n=Object.getPrototypeOf(t);return!n||n.hasOwnProperty("constructor")&&n.constructor===Object}function u(e){return"string"==typeof e}function c(e){return e&&l(e.length)&&o(e.velocity)}function f(e){return e&&e!==window&&l(e.length)&&!u(e)&&!o(e)&&!a(e)&&(0===e.length||a(e[0]))}function d(e){return Array.prototype.slice.call(e,0)}function v(e,t,n,r){e&&Object.defineProperty(e,t,{configurable:!r,writable:!r,value:n})}function p(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=!0,i=!1,o=void 0;try{for(var a,l=t[Symbol.iterator]();!(r=(a=l.next()).done);r=!0){var s=a.value;if(void 0!==s&&s==s)return s}}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}}var y=Date.now?Date.now:function(){return(new Date).getTime()};function g(e,t){e instanceof Element&&(e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s)"+t+"(\\s|$)","gi")," "))}var h={};function m(e,t){var n,r,i=e[0],a=e[1];u(i)?o(a)?h[i]&&(n=h,r=i,!Object.prototype.propertyIsEnumerable.call(n,r))?console.warn("VelocityJS: Trying to override internal 'registerAction' callback",i):!0===t?v(h,i,a):h[i]=a:console.warn("VelocityJS: Trying to set 'registerAction' callback to an invalid value:",i,a):console.warn("VelocityJS: Trying to set 'registerAction' name to an invalid value:",i)}m(["registerAction",m],!0);var w=400,b={fast:200,normal:400,slow:600},S={};function x(e){var t=e[0],n=e[1];u(t)?o(n)?S[t]?console.warn("VelocityJS: Trying to override 'registerEasing' callback",t):S[t]=n:console.warn("VelocityJS: Trying to set 'registerEasing' callback to an invalid value:",t,n):console.warn("VelocityJS: Trying to set 'registerEasing' name to an invalid value:",t)}function k(e,t,n,r){return t+e*(n-t)}function O(e){return Math.min(Math.max(e,0),1)}function E(e,t){return 1-3*t+3*e}function _(e,t){return 3*t-6*e}function T(e){return 3*e}function M(e,t,n){return((E(t,n)*e+_(t,n))*e+T(t))*e}function V(e,t,n){return 3*E(t,n)*e*e+2*_(t,n)*e+T(t)}function q(){for(var e=4,t=.001,n=1e-7,r=10,i=11,o=1/(i-1),a=("Float32Array"in window),l=arguments.length,s=Array(l),u=0;u<l;u++)s[u]=arguments[u];if(4===s.length){for(var c=0;c<4;++c)if("number"!=typeof s[c]||isNaN(s[c])||!isFinite(s[c]))return;var f=O(s[0]),d=s[1],v=O(s[2]),p=s[3],y=a?new Float32Array(i):new Array(i),g=!1,h="generateBezier("+[f,d,v,p]+")",m=function(e,t,n,r){return g||b(),0===e?t:1===e?n:f===d&&v===p?t+e*(n-t):t+M(w(e),d,p)*(n-t)};return m.getControlPoints=function(){return[{x:f,y:d},{x:v,y:p}]},m.toString=function(){return h},m}function w(a){for(var l=i-1,s=0,u=1;u!==l&&y[u]<=a;++u)s+=o;var c=s+(a-y[--u])/(y[u+1]-y[u])*o,d=V(c,f,v);return d>=t?function(t,n){for(var r=0;r<e;++r){var i=V(n,f,v);if(0===i)return n;n-=(M(n,f,v)-t)/i}return n}(a,c):0===d?c:function(e,t,i){var o=void 0,a=void 0,l=0;do{(o=M(a=t+(i-t)/2,f,v)-e)>0?i=a:t=a}while(Math.abs(o)>n&&++l<r);return a}(a,s,s+o)}function b(){g=!0,f===d&&v===p||function(){for(var e=0;e<i;++e)y[e]=M(e*o,f,v)}()}}m(["registerEasing",x],!0),x(["linear",k]),x(["swing",function(e,t,n){return t+(.5-Math.cos(e*Math.PI)/2)*(n-t)}]),x(["spring",function(e,t,n){return t+(1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e))*(n-t)}]);var N=q(.42,0,1,1),A=q(0,0,.58,1),L=q(.42,0,.58,1);function J(e){return-e.tension*e.x-e.friction*e.v}function I(e,t,n){var r={x:e.x+n.dx*t,v:e.v+n.dv*t,tension:e.tension,friction:e.friction};return{dx:r.v,dv:J(r)}}function j(e,t){var n={dx:e.v,dv:J(e)},r=I(e,.5*t,n),i=I(e,.5*t,r),o=I(e,t,i),a=1/6*(n.dx+2*(r.dx+i.dx)+o.dx),l=1/6*(n.dv+2*(r.dv+i.dv)+o.dv);return e.x=e.x+a*t,e.v=e.v+l*t,e}x(["ease",q(.25,.1,.25,1)]),x(["easeIn",N]),x(["ease-in",N]),x(["easeOut",A]),x(["ease-out",A]),x(["easeInOut",L]),x(["ease-in-out",L]),x(["easeInSine",q(.47,0,.745,.715)]),x(["easeOutSine",q(.39,.575,.565,1)]),x(["easeInOutSine",q(.445,.05,.55,.95)]),x(["easeInQuad",q(.55,.085,.68,.53)]),x(["easeOutQuad",q(.25,.46,.45,.94)]),x(["easeInOutQuad",q(.455,.03,.515,.955)]),x(["easeInCubic",q(.55,.055,.675,.19)]),x(["easeOutCubic",q(.215,.61,.355,1)]),x(["easeInOutCubic",q(.645,.045,.355,1)]),x(["easeInQuart",q(.895,.03,.685,.22)]),x(["easeOutQuart",q(.165,.84,.44,1)]),x(["easeInOutQuart",q(.77,0,.175,1)]),x(["easeInQuint",q(.755,.05,.855,.06)]),x(["easeOutQuint",q(.23,1,.32,1)]),x(["easeInOutQuint",q(.86,0,.07,1)]),x(["easeInExpo",q(.95,.05,.795,.035)]),x(["easeOutExpo",q(.19,1,.22,1)]),x(["easeInOutExpo",q(1,0,0,1)]),x(["easeInCirc",q(.6,.04,.98,.335)]),x(["easeOutCirc",q(.075,.82,.165,1)]),x(["easeInOutCirc",q(.785,.135,.15,.86)]);var C={};function P(e,t){return l(e)?e:u(e)?b[e.toLowerCase()]||parseFloat(e.replace("ms","").replace("s","000")):null==t?void 0:P(t)}function z(e){if(i(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'cache' to an invalid value:",e)}function F(e){if(o(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'begin' to an invalid value:",e)}function H(e,t){if(o(e))return e;null==e||t||console.warn("VelocityJS: Trying to set 'complete' to an invalid value:",e)}function R(e){var t=P(e);if(!isNaN(t))return t;null!=e&&console.error("VelocityJS: Trying to set 'delay' to an invalid value:",e)}function B(e,t){var n=P(e);if(!isNaN(n)&&n>=0)return n;null==e||t||console.error("VelocityJS: Trying to set 'duration' to an invalid value:",e)}function W(e,t,n){if(u(e))return S[e];if(o(e))return e;if(Array.isArray(e)){if(1===e.length)return r=e[0],C[r]||(C[r]=function(e,t,n){return 0===e?t:1===e?n:t+Math.round(e*r)*(1/r)*(n-t)});if(2===e.length)return function e(t,n,r){var i={x:-1,v:0,tension:parseFloat(t)||500,friction:parseFloat(n)||20},o=[0],a=null!=r,l=0,s=void 0,u=void 0;for(s=a?(l=e(i.tension,i.friction))/r*.016:.016;u=j(u||i,s),o.push(1+u.x),l+=16,Math.abs(u.x)>1e-4&&Math.abs(u.v)>1e-4;);return a?function(e,t,n){return 0===e?t:1===e?n:t+o[Math.floor(e*(o.length-1))]*(n-t)}:l}(e[0],e[1],t);if(4===e.length)return q.apply(null,e)||!1}var r;null==e||n||console.error("VelocityJS: Trying to set 'easing' to an invalid value:",e)}function $(e){if(!1===e)return 0;var t=parseInt(e,10);if(!isNaN(t)&&t>=0)return Math.min(t,60);null!=e&&console.warn("VelocityJS: Trying to set 'fpsLimit' to an invalid value:",e)}function G(e){switch(e){case!1:return 0;case!0:return!0;default:var t=parseInt(e,10);if(!isNaN(t)&&t>=0)return t}null!=e&&console.warn("VelocityJS: Trying to set 'loop' to an invalid value:",e)}function Q(e,t){if(!1===e||u(e))return e;null==e||t||console.warn("VelocityJS: Trying to set 'queue' to an invalid value:",e)}function D(e){switch(e){case!1:return 0;case!0:return!0;default:var t=parseInt(e,10);if(!isNaN(t)&&t>=0)return t}null!=e&&console.warn("VelocityJS: Trying to set 'repeat' to an invalid value:",e)}function U(e){if(l(e))return e;null!=e&&console.error("VelocityJS: Trying to set 'speed' to an invalid value:",e)}function Z(e){if(i(e))return e;null!=e&&console.error("VelocityJS: Trying to set 'sync' to an invalid value:",e)}var Y=void 0,X=void 0,K=void 0,ee=void 0,te=void 0,ne=void 0,re=void 0,ie=void 0,oe=void 0,ae=void 0,le=void 0,se=void 0,ue=void 0,ce=void 0,fe=void 0,de=void 0,ve=function(){function e(){t(this,e)}return n(e,null,[{key:"reset",value:function(){Y=!0,X=void 0,K=void 0,ee=0,te=w,ne=W("swing",w),re=60,ie=0,ae=980/60,le=!0,se=!0,ue="",ce=0,fe=1,de=!0}},{key:"cache",get:function(){return Y},set:function(e){void 0!==(e=z(e))&&(Y=e)}},{key:"begin",get:function(){return X},set:function(e){void 0!==(e=F(e))&&(X=e)}},{key:"complete",get:function(){return K},set:function(e){void 0!==(e=H(e))&&(K=e)}},{key:"delay",get:function(){return ee},set:function(e){void 0!==(e=R(e))&&(ee=e)}},{key:"duration",get:function(){return te},set:function(e){void 0!==(e=B(e))&&(te=e)}},{key:"easing",get:function(){return ne},set:function(e){void 0!==(e=W(e,te))&&(ne=e)}},{key:"fpsLimit",get:function(){return re},set:function(e){void 0!==(e=$(e))&&(re=e,ae=980/e)}},{key:"loop",get:function(){return ie},set:function(e){void 0!==(e=G(e))&&(ie=e)}},{key:"mobileHA",get:function(){return oe},set:function(e){i(e)&&(oe=e)}},{key:"minFrameTime",get:function(){return ae}},{key:"promise",get:function(){return le},set:function(e){void 0!==(e=function(e){if(i(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'promise' to an invalid value:",e)}(e))&&(le=e)}},{key:"promiseRejectEmpty",get:function(){return se},set:function(e){void 0!==(e=function(e){if(i(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'promiseRejectEmpty' to an invalid value:",e)}(e))&&(se=e)}},{key:"queue",get:function(){return ue},set:function(e){void 0!==(e=Q(e))&&(ue=e)}},{key:"repeat",get:function(){return ce},set:function(e){void 0!==(e=D(e))&&(ce=e)}},{key:"repeatAgain",get:function(){return ce}},{key:"speed",get:function(){return fe},set:function(e){void 0!==(e=U(e))&&(fe=e)}},{key:"sync",get:function(){return de},set:function(e){void 0!==(e=Z(e))&&(de=e)}}]),e}();Object.freeze(ve),ve.reset();var pe=[],ye={},ge=new Set,he=[],me=new Map,we="velocityData";function be(e){var t=e[we];if(t)return t;for(var n=e.ownerDocument.defaultView,r=0,i=0;i<he.length;i++){var o=he[i];u(o)?e instanceof n[o]&&(r|=1<<i):e instanceof o&&(r|=1<<i)}var a={types:r,count:0,computedStyle:null,cache:{},queueList:{},lastAnimationList:{},lastFinishList:{},window:n};return Object.defineProperty(e,we,{value:a}),a}var Se=window&&window===window.window,xe=Se&&void 0!==window.pageYOffset,ke={isClient:Se,isMobile:Se&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isGingerbread:Se&&/Android 2\.3\.[3-7]/i.test(navigator.userAgent),prefixElement:Se&&document.createElement("div"),windowScrollAnchor:xe,scrollAnchor:xe?window:!Se||document.documentElement||document.body.parentNode||document.body,scrollPropertyLeft:xe?"pageXOffset":"scrollLeft",scrollPropertyTop:xe?"pageYOffset":"scrollTop",className:"velocity-animating",isTicking:!1,first:void 0,last:void 0,firstNew:void 0};function Oe(e){var t=ke.last;e._prev=t,e._next=void 0,t?t._next=e:ke.first=e,ke.last=e,ke.firstNew||(ke.firstNew=e);var n=e.element;be(n).count++||function(e,t){e instanceof Element&&(e.classList?e.classList.add(t):(g(e,t),e.className+=(e.className.length?" ":"")+t))}(n,ke.className)}function Ee(e,t,n){var r=be(e);if(!1!==n&&(r.lastAnimationList[n]=t),!1===n)Oe(t);else{u(n)||(n="");var i=r.queueList[n];if(i){for(;i._next;)i=i._next;i._next=t,t._prev=i}else null===i?r.queueList[n]=t:(r.queueList[n]=null,Oe(t))}}function _e(e){var t=e._next,n=e._prev,r=null==e.queue?e.options.queue:e.queue;(ke.firstNew===e&&(ke.firstNew=t),ke.first===e?ke.first=t:n&&(n._next=t),ke.last===e?ke.last=n:t&&(t._prev=n),r)&&(be(e.element)&&(e._next=e._prev=void 0))}var Te={};function Me(e){var t=e.options,n=p(e.queue,t.queue),r=p(e.loop,t.loop,ve.loop),i=p(e.repeat,t.repeat,ve.repeat),o=8&e._flags;if(o||!r&&!i){var a=e.element,l=be(a);if(--l.count||o||g(a,ke.className),t&&++t._completed===t._total){!o&&t.complete&&(!function(e){var t=e.complete||e.options.complete;if(t)try{var n=e.elements;t.call(n,n,e)}catch(e){setTimeout(function(){throw e},1)}}(e),t.complete=null);var s=t._resolver;s&&(s(e.elements),delete t._resolver)}!1!==n&&(o||(l.lastFinishList[n]=e.timeStart+p(e.duration,t.duration,ve.duration)),function(e,t,n){if(!1!==t){u(t)||(t="");var r=be(e),i=r.queueList[t];i?(r.queueList[t]=i._next||null,n||Oe(i)):null===i&&delete r.queueList[t]}}(a,n)),_e(e)}else i&&!0!==i?e.repeat=i-1:r&&!0!==r&&(e.loop=r-1,e.repeat=p(e.repeatAgain,t.repeatAgain,ve.repeatAgain)),r&&(e._flags^=64),!1!==n&&(be(e.element).lastFinishList[n]=e.timeStart+p(e.duration,t.duration,ve.duration)),e.timeStart=e.ellapsedTime=e.percentComplete=0,e._flags&=-5}function Ve(e){var t=e[0],n=e[1],r=e[2];if((!u(t)||window[t]instanceof Object)&&(u(t)||t instanceof Object))if(u(n))if(o(r)){var i=he.indexOf(t),a=3;if(i<0&&!u(t))if(me.has(t))i=he.indexOf(me.get(t));else for(var l in window)if(window[l]===t){(i=he.indexOf(l))<0&&(i=he.push(l)-1,pe[i]={},me.set(t,l));break}if(i<0&&(i=he.push(t)-1,pe[i]={}),pe[i][n]=r,u(e[a])){var s=e[a++],c=ye[s];c||(c=ye[s]=[]),c.push(r)}!1===e[a]&&ge.add(n)}else console.warn("VelocityJS: Trying to set 'registerNormalization' callback to an invalid value:",n,r);else console.warn("VelocityJS: Trying to set 'registerNormalization' name to an invalid value:",n);else console.warn("VelocityJS: Trying to set 'registerNormalization' constructor to an invalid value:",t)}function qe(e){var t=e[0],n=e[1],r=he.indexOf(t);if(r<0&&!u(t))if(me.has(t))r=he.indexOf(me.get(t));else for(var i in window)if(window[i]===t){r=he.indexOf(i);break}return r>=0&&pe[r].hasOwnProperty(n)}function Ne(e,t){for(var n=be(e),r=void 0,i=he.length-1,o=n.types;!r&&i>=0;i--)o&1<<i&&(r=pe[i][t]);return r}function Ae(e,t,n,r){var i=ge.has(t),o=!i&&be(e);(i||o&&o.cache[t]!==n)&&(i||(o.cache[t]=n||void 0),(r=r||Ne(e,t))&&r(e,n),Ut.debug>=2&&console.info('Set "'+t+'": "'+n+'"',e))}function Le(e){if(e.indexOf("calc(")>=0){for(var t=e.split(/([\(\)])/),n=0,r=0;r<t.length;r++){var i=t[r];switch(i){case"(":n++;break;case")":n--;break;default:n&&"0"===i[0]&&(t[r]=i.replace(/^0[a-z%]+ \+ /,""))}}return t.join("").replace(/(?:calc)?\(([0-9\.]+[a-z%]+)\)/g,"$1")}return e}m(["registerNormalization",Ve]),m(["hasNormalization",qe]);var Je={};function Ie(e){var t=Je[e];return t||(Je[e]=e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}))}var je=/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/gi,Ce=/#([a-f\d])([a-f\d])([a-f\d])/gi,Pe=/(rgba?\(\s*)?(\b[a-z]+\b)/g,ze=/rgb(a?)\(([^\)]+)\)/gi,Fe=/\s+/g,He={};function Re(e,t,n,r){return"rgba("+parseInt(t,16)+","+parseInt(n,16)+","+parseInt(r,16)+",1)"}function Be(e){return e.replace(je,Re).replace(Ce,function(e,t,n,r){return Re(0,t+t,n+n,r+r)}).replace(Pe,function(e,t,n){return He[n]?(t||"rgba(")+He[n]+(t?"":",1)"):e}).replace(ze,function(e,t,n){return"rgba("+n.replace(Fe,"")+(t?"":",1")+")"})}function We(e,t,n){if("border-box"===Qe(e,"boxSizing").toString().toLowerCase()===n){var r="width"===t?["Left","Right"]:["Top","Bottom"],i=["padding"+r[0],"padding"+r[1],"border"+r[0]+"Width","border"+r[1]+"Width"],o=0,a=!0,l=!1,s=void 0;try{for(var u,c=i[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var f=u.value,d=parseFloat(Qe(e,f));isNaN(d)||(o+=d)}}catch(e){l=!0,s=e}finally{try{!a&&c.return&&c.return()}finally{if(l)throw s}}return n?-o:o}return 0}function $e(e,t){return e.getBoundingClientRect()[t]+We(e,t,!0)+"px"}function Ge(e,t){var n=be(e),r=n.computedStyle?n.computedStyle:n.window.getComputedStyle(e,null),i=0;if(n.computedStyle||(n.computedStyle=r),"none"===r.display)switch(t){case"width":case"height":return Ae(e,"display","auto"),i=$e(e,t),Ae(e,"display","none"),String(i)}if((i=r[t])||(i=e.style[t]),"auto"===i)switch(t){case"width":case"height":i=$e(e,t);break;case"top":case"left":case"right":case"bottom":var o=Qe(e,"position");if("fixed"===o||"absolute"===o){i=e.getBoundingClientRect[t]+"px";break}default:i="0px"}return i?String(i):""}function Qe(e,t,n,r){var i=be(e),o=void 0;return ge.has(t)&&(r=!0),!r&&i&&null!=i.cache[t]?o=i.cache[t]:(n=n||Ne(e,t))&&(o=n(e),i&&(i.cache[t]=o)),Ut.debug>=2&&console.info('Get "'+t+'": "'+o+'"',e),o}var De=/^#([A-f\d]{3}){1,2}$/i,Ue={function:function(e,t,n,r,i,o){return e.call(t,r,n.length,i)},number:function(e,t,n,r,i,o){return String(e)+function(e){for(var t in ye)if(ye[t].includes(e))return t;return""}(o.fn)},string:function(e,t,n,r,i,o){return Be(e)},undefined:function(e,t,n,r,i,o){return Be(Qe(t,i,o.fn)||"")}};function Ze(t,n){var r=t.tweens=Object.create(null),i=t.elements,a=t.element,s=i.indexOf(a),c=be(a),f=p(t.queue,t.options.queue),d=p(t.options.duration,ve.duration);for(var v in n)if(n.hasOwnProperty(v)){var y=Ie(v),g=Ne(a,y),h=n[v];if(!g&&"tween"!==y){Ut.debug&&console.log('Skipping "'+v+'" due to a lack of browser support.');continue}if(null==h){Ut.debug&&console.log('Skipping "'+v+'" due to no value supplied.');continue}var m=r[y]={},w=void 0,b=void 0;if(m.fn=g,o(h)&&(h=h.call(a,s,i.length,i)),Array.isArray(h)){var x=h[1],k=h[2];w=h[0],u(x)&&(/^[\d-]/.test(x)||De.test(x))||o(x)||l(x)?b=x:u(x)&&S[x]||Array.isArray(x)?(m.easing=W(x,d),b=k):b=x||k}else w=h;m.end=Ue[void 0===w?"undefined":e(w)](w,a,i,s,y,m),null==b&&!1!==f&&void 0!==c.queueList[f]||(m.start=Ue[void 0===b?"undefined":e(b)](b,a,i,s,y,m),et(y,m,d))}}var Ye=/((?:[+\-*/]=)?(?:[+-]?\d*\.\d+|[+-]?\d+)[a-z%]*|(?:.(?!$|[+-]?\d|[+\-*/]=[+-]?\d))+.|.)/g,Xe=/^([+\-*/]=)?([+-]?\d*\.\d+|[+-]?\d+)(.*)$/;function Ke(e,t){for(var n=e.length,r=[],i=[],o=void 0,a=0;a<n;a++){if(!u(e[a]))return;""===e[a]?r[a]=[""]:r[a]=d(e[a].match(Ye)),i[a]=0,o=o||r[a].length>1}for(var l=[],s=l.pattern=[],c=function(e){if(u(s[s.length-1]))s[s.length-1]+=e;else if(e){s.push(e);for(var t=0;t<n;t++)l[t].push(null)}},f=function(){if(!(o||s.length>1)){for(var r="display"===t,i="visibility"===t,a=0;a<n;a++){var u=e[a];l[a][0]=u,l[a].easing=W(r&&"none"===u||i&&"hidden"===u||!r&&!i?"at-end":"at-start",400)}return s[0]=!1,l}},v=!0,p=0;p<n;p++)l[p]=[];for(;v;){for(var y=[],g=[],h=void 0,m=!1,w=!1,b=0;b<n;b++){var S=i[b]++,x=r[b][S];if(!x){if(b)return;for(;b<n;b++){var k=i[b]++;if(r[b][k])return f()}v=!1;break}var O=x.match(Xe);if(O){if(h)return f();var E=parseFloat(O[2]),_=O[3],T=O[1]?O[1][0]+_:void 0,M=T||_;E&&!g.includes(M)&&g.push(M),_||(E?w=!0:m=!0),y[b]=T?[E,M,!0]:[E,M]}else{if(y.length)return f();if(h){if(h!==x)return f()}else h=x}}if(h)c(h);else if(g.length)if(2===g.length&&m&&!w&&g.splice(g[0]?1:0,1),1===g.length){var V=g[0];switch(V[0]){case"+":case"-":case"*":case"/":return void(t&&console.error('Velocity: The first property must not contain a relative function "'+t+'":',e))}s.push(!1);for(var q=0;q<n;q++)l[q].push(y[q][0]);c(V)}else{c("calc(");for(var N=s.length-1,A=0;A<g.length;A++){var L=g[A],J=L[0],I="*"===J||"/"===J,j=I||"+"===J||"-"===J;I&&(s[N]+="(",c(")")),A&&c(" "+(j?J:"+")+" "),s.push(!1);for(var C=0;C<n;C++){var P=y[C],z=P[1]===L?P[0]:3===P.length?l[C-1][l[C-1].length-1]:I?1:0;l[C].push(z)}c(j?L.substring(1):L)}c(")")}}for(var F=0,H=0;F<s.length;F++){var R=s[F];u(R)?H&&R.indexOf(",")>=0?H++:R.indexOf("rgb")>=0&&(H=1):H&&(H<4?s[F]=!0:H=0)}return l}function et(e,t,n,r){var i=t.start,o=t.end;if(u(o)&&u(i)){var a=Ke([i,o],e);if(!a&&r){var l=i.match(/\d\.?\d*/g)||["0"],s=l.length,c=0;a=Ke([o.replace(/\d+\.?\d*/g,function(){return l[c++%s]}),o],e)}if(a)switch(Ut.debug&&console.log("Velocity: Sequence found:",a),a[0].percent=0,a[1].percent=1,t.sequence=a,t.easing){case S["at-start"]:case S.during:case S["at-end"]:a[0].easing=a[1].easing=t.easing}}}function tt(e){if(ke.firstNew===e&&(ke.firstNew=e._next),!(1&e._flags)){var t=e.element,n=e.tweens;p(e.options.duration,ve.duration);for(var r in n){var i=n[r];if(null==i.start){var o=Qe(e.element,r);u(o)?(i.start=Be(o),et(r,i,0,!0)):Array.isArray(o)||console.warn("bad type",i,r,o)}Ut.debug&&console.log('tweensContainer "'+r+'": '+JSON.stringify(i),t)}e._flags|=1}}function nt(e){var t=e.begin||e.options.begin;if(t)try{var n=e.elements;t.call(n,n,e)}catch(e){setTimeout(function(){throw e},1)}}function rt(e){var t=e.progress||e.options.progress;if(t)try{var n=e.elements,r=e.percentComplete,i=e.options,o=e.tween;t.call(n,n,r,Math.max(0,e.timeStart+(null!=e.duration?e.duration:null!=i.duration?i.duration:ve.duration)-vt),void 0!==o?o:String(100*r),e)}catch(e){setTimeout(function(){throw e},1)}}function it(){var e=!0,t=!1,n=void 0;try{for(var r,i=lt[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){rt(r.value)}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}lt.clear();var o=!0,a=!1,l=void 0;try{for(var s,u=at[Symbol.iterator]();!(o=(s=u.next()).done);o=!0){Me(s.value)}}catch(e){a=!0,l=e}finally{try{!o&&u.return&&u.return()}finally{if(a)throw l}}at.clear()}var ot=1e3/60,at=new Set,lt=new Set,st=function(){var e=window.performance||{};if("function"!=typeof e.now){var t=e.timing&&e.timing.navigationStart?e.timing.navigationStart:y();e.now=function(){return y()-t}}return e}(),ut=function(e){return setTimeout(e,Math.max(0,ot-(st.now()-vt)))},ct=window.requestAnimationFrame||ut,ft=void 0,dt=void 0,vt=0;try{(dt=new Worker(URL.createObjectURL(new Blob(["("+function(){var e=this,t=void 0;this.onmessage=function(n){switch(n.data){case!0:t||(t=setInterval(function(){e.postMessage(!0)},1e3/30));break;case!1:t&&(clearInterval(t),t=0);break;default:e.postMessage(n.data)}}}+")()"])))).onmessage=function(e){!0===e.data?pt():it()},ke.isMobile||void 0===document.hidden||document.addEventListener("visibilitychange",function(){dt.postMessage(ke.isTicking&&document.hidden)})}catch(e){}function pt(e){if(!ft){if(ft=!0,!1!==e){var t=st.now(),n=vt?t-vt:ot,r=ve.speed,i=ve.easing,o=ve.duration,a=void 0,l=void 0;if(n>=ve.minFrameTime||!vt){for(vt=t;ke.firstNew;)tt(ke.firstNew);for(a=ke.first;a&&a!==ke.firstNew;a=a._next){var s=a.element,u=be(s);if(s.parentNode&&u){var c=a.options,f=a._flags,d=a.timeStart;if(!d){var v=null!=a.queue?a.queue:c.queue;d=t-n,!1!==v&&(d=Math.max(d,u.lastFinishList[v]||0)),a.timeStart=d}16&f?a.timeStart+=n:2&f||(a._flags|=2,c._ready++)}else _e(a)}for(a=ke.first;a&&a!==ke.firstNew;a=l){var p=a._flags;if(l=a._next,2&p&&!(16&p)){var y=a.options;if(32&p&&y._ready<y._total)a.timeStart+=n;else{var g=null!=a.speed?a.speed:null!=y.speed?y.speed:r,h=a.timeStart;if(!(4&p)){var m=null!=a.delay?a.delay:y.delay;if(m){if(h+m/g>t)continue;a.timeStart=h+=m/(m>0?g:1)}a._flags|=4,0==y._started++&&(y._first=a,y.begin&&(nt(a),y.begin=void 0))}1!==g&&(a.timeStart=h+=Math.min(n,t-h)*(1-g));var w=null!=a.easing?a.easing:null!=y.easing?y.easing:i,b=a.ellapsedTime=t-h,S=null!=a.duration?a.duration:null!=y.duration?y.duration:o,x=a.percentComplete=Ut.mock?1:Math.min(b/S,1),O=a.tweens,E=64&p;for(var _ in(a.progress||y._first===a&&y.progress)&&lt.add(a),1===x&&at.add(a),O){var T=O[_],M=T.sequence,V=M.pattern,q="",N=0;if(V){for(var A=(T.easing||w)(x,0,1,_),L=0,J=0;J<M.length-1;J++)M[J].percent<A&&(L=J);for(var I=M[L],j=M[L+1]||I,C=(x-I.percent)/(j.percent-I.percent),P=E?1-C:C,z=j.easing||w||k;N<V.length;N++){var F=I[N];if(null==F)q+=V[N];else{var H=j[N];if(F===H)q+=F;else{var R=z(P,F,H,_);q+=!0!==V[N]?R:Math.round(R)}}}"tween"!==_?(1===x&&(q=Le(q)),Ae(a.element,_,q,T.fn)):a.tween=q}else console.warn("VelocityJS: Missing pattern:",_,JSON.stringify(T[_])),delete O[_]}}}}(lt.size||at.size)&&(document.hidden?dt?dt.postMessage(""):setTimeout(it,1):it())}}ke.first?(ke.isTicking=!0,document.hidden?dt?!1===e&&dt.postMessage(!0):ut(pt):ct(pt)):(ke.isTicking=!1,vt=0,document.hidden&&dt&&dt.postMessage(!1)),ft=!1}}function yt(e,t,n){if(tt(e),void 0===t||t===p(e.queue,e.options.queue,n)){if(!(4&e._flags)){var r=e.options;0==r._started++&&(r._first=e,r.begin&&(nt(e),r.begin=void 0)),e._flags|=4}for(var i in e.tweens){var o=e.tweens[i],a=o.sequence,l=a.pattern,s="",u=0;if(l)for(var c=a[a.length-1];u<l.length;u++){var f=c[u];s+=null==f?l[u]:f}Ae(e.element,i,s,o.fn)}Me(e)}}m(["finish",function(e,t,n){var r=Q(e[0],!0),i=ve.queue,o=!0===e[void 0===r?0:1];if(c(t)&&t.velocity.animations){var a=!0,l=!1,s=void 0;try{for(var u,f=t.velocity.animations[Symbol.iterator]();!(a=(u=f.next()).done);a=!0)yt(u.value,r,i)}catch(e){l=!0,s=e}finally{try{!a&&f.return&&f.return()}finally{if(l)throw s}}}else{for(;ke.firstNew;)tt(ke.firstNew);for(var d,v=ke.first;v&&(o||v!==ke.firstNew);v=d||ke.firstNew)d=v._next,t&&!t.includes(v.element)||yt(v,r,i)}n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}],!0);var gt={isExpanded:1,isReady:2,isStarted:4,isStopped:8,isPaused:16,isSync:32,isReverse:64};function ht(e,t,n,r){void 0!==t&&t!==p(e.queue,e.options.queue,n)||(r?e._flags|=16:e._flags&=-17)}function mt(e,t,n,r){var i=0===r.indexOf("pause"),o="false"!==(r.indexOf(".")>=0?r.replace(/^.*\./,""):void 0)&&Q(e[0]),a=ve.queue;if(c(t)&&t.velocity.animations){var l=!0,s=!1,u=void 0;try{for(var f,d=t.velocity.animations[Symbol.iterator]();!(l=(f=d.next()).done);l=!0){ht(f.value,o,a,i)}}catch(e){s=!0,u=e}finally{try{!l&&d.return&&d.return()}finally{if(s)throw u}}}else for(var v=ke.first;v;)t&&!t.includes(v.element)||ht(v,o,a,i),v=v._next;n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}function wt(t,n,r,i){var o=t[0],a=t[1];if(!o)return console.warn("VelocityJS: Cannot access a non-existant property!"),null;if(void 0===a&&!s(o)){if(Array.isArray(o)){if(1===n.length){var f={},d=!0,v=!1,p=void 0;try{for(var y,g=o[Symbol.iterator]();!(d=(y=g.next()).done);d=!0){var h=y.value;f[h]=Be(Qe(n[0],h))}}catch(e){v=!0,p=e}finally{try{!d&&g.return&&g.return()}finally{if(v)throw p}}return f}var m=[],w=!0,b=!1,S=void 0;try{for(var x,k=n[Symbol.iterator]();!(w=(x=k.next()).done);w=!0){var O=x.value,E={},_=!0,T=!1,M=void 0;try{for(var V,q=o[Symbol.iterator]();!(_=(V=q.next()).done);_=!0){var N=V.value;E[N]=Be(Qe(O,N))}}catch(e){T=!0,M=e}finally{try{!_&&q.return&&q.return()}finally{if(T)throw M}}m.push(E)}}catch(e){b=!0,S=e}finally{try{!w&&k.return&&k.return()}finally{if(b)throw S}}return m}if(1===n.length)return Be(Qe(n[0],o));var A=[],L=!0,J=!1,I=void 0;try{for(var j,C=n[Symbol.iterator]();!(L=(j=C.next()).done);L=!0){var P=j.value;A.push(Be(Qe(P,o)))}}catch(e){J=!0,I=e}finally{try{!L&&C.return&&C.return()}finally{if(J)throw I}}return A}var z=[];if(s(o)){for(var F in o)if(o.hasOwnProperty(F)){var H=!0,R=!1,B=void 0;try{for(var W,$=n[Symbol.iterator]();!(H=(W=$.next()).done);H=!0){var G=W.value,Q=o[F];u(Q)||l(Q)?Ae(G,F,o[F]):(z.push('Cannot set a property "'+F+'" to an unknown type: '+(void 0===Q?"undefined":e(Q))),console.warn('VelocityJS: Cannot set a property "'+F+'" to an unknown type:',Q))}}catch(e){R=!0,B=e}finally{try{!H&&$.return&&$.return()}finally{if(R)throw B}}}}else if(u(a)||l(a)){var D=!0,U=!1,Z=void 0;try{for(var Y,X=n[Symbol.iterator]();!(D=(Y=X.next()).done);D=!0){Ae(Y.value,o,String(a))}}catch(e){U=!0,Z=e}finally{try{!D&&X.return&&X.return()}finally{if(U)throw Z}}}else z.push('Cannot set a property "'+o+'" to an unknown type: '+(void 0===a?"undefined":e(a))),console.warn('VelocityJS: Cannot set a property "'+o+'" to an unknown type:',a);r&&(z.length?r._rejecter(z.join(", ")):c(n)&&n.velocity.animations&&n.then?n.then(r._resolver):r._resolver(n))}function bt(e,t,n){tt(e),void 0!==t&&t!==p(e.queue,e.options.queue,n)||(e._flags|=8,Me(e))}m(["option",function(e,t,n,r){var i=e[0],o=r.indexOf(".")>=0?r.replace(/^.*\./,""):void 0,a="false"!==o&&Q(o,!0),l=void 0,s=e[1];if(!i)return console.warn("VelocityJS: Cannot access a non-existant key!"),null;if(c(t)&&t.velocity.animations)l=t.velocity.animations;else{l=[];for(var u=ke.first;u;u=u._next)t.indexOf(u.element)>=0&&p(u.queue,u.options.queue)===a&&l.push(u);if(t.length>1&&l.length>1){for(var f=1,d=l[0].options;f<l.length;)if(l[f++].options!==d){d=null;break}d&&(l=[l[0]])}}if(void 0===s){var v=[],y=gt[i],g=!0,h=!1,m=void 0;try{for(var w,b=l[Symbol.iterator]();!(g=(w=b.next()).done);g=!0){var S=w.value;void 0===y?v.push(p(S[i],S.options[i])):v.push(0==(S._flags&y))}}catch(e){h=!0,m=e}finally{try{!g&&b.return&&b.return()}finally{if(h)throw m}}return 1===t.length&&1===l.length?v[0]:v}var x=void 0;switch(i){case"cache":s=z(s);break;case"begin":s=F(s);break;case"complete":s=H(s);break;case"delay":s=R(s);break;case"duration":s=B(s);break;case"fpsLimit":s=$(s);break;case"loop":s=G(s);break;case"percentComplete":x=!0,s=parseFloat(s);break;case"repeat":case"repeatAgain":s=D(s);break;default:if("_"!==i[0]){var k=parseFloat(s);s===String(k)&&(s=k);break}case"queue":case"promise":case"promiseRejectEmpty":case"easing":case"started":return void console.warn("VelocityJS: Trying to set a read-only key:",i)}if(void 0===s||s!=s)return console.warn("VelocityJS: Trying to set an invalid value:"+i+"="+s+" ("+e[1]+")"),null;var O=!0,E=!1,_=void 0;try{for(var T,M=l[Symbol.iterator]();!(O=(T=M.next()).done);O=!0){var V=T.value;x?V.timeStart=vt-p(V.duration,V.options.duration,ve.duration)*s:V[i]=s}}catch(e){E=!0,_=e}finally{try{!O&&M.return&&M.return()}finally{if(E)throw _}}n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}],!0),m(["pause",mt],!0),m(["resume",mt],!0),m(["property",wt],!0),m(["reverse",function(e,t,n,r){throw new SyntaxError("VelocityJS: The 'reverse' action is built in and private.")}],!0),m(["stop",function(e,t,n,r){var i=Q(e[0],!0),o=ve.queue,a=!0===e[void 0===i?0:1];if(c(t)&&t.velocity.animations){var l=!0,s=!1,u=void 0;try{for(var f,d=t.velocity.animations[Symbol.iterator]();!(l=(f=d.next()).done);l=!0)bt(f.value,i,o)}catch(e){s=!0,u=e}finally{try{!l&&d.return&&d.return()}finally{if(s)throw u}}}else{for(;ke.firstNew;)tt(ke.firstNew);for(var v,p=ke.first;p&&(a||p!==ke.firstNew);p=v||ke.firstNew)v=p._next,t&&!t.includes(p.element)||bt(p,i,o)}n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}],!0),m(["style",wt],!0),m(["tween",function(e,t,n,i){var o=void 0;if(t){if(1!==t.length)throw new Error("VelocityJS: Cannot tween more than one element!")}else{if(!e.length)return console.info('Velocity(<element>, "tween", percentComplete, property, end | [end, <easing>, <start>], <easing>) => value\nVelocity(<element>, "tween", percentComplete, {property: end | [end, <easing>, <start>], ...}, <easing>) => {property: value, ...}'),null;t=[document.body],o=!0}var a=e[0],c={elements:t,element:t[0],queue:!1,options:{duration:1e3},tweens:null},f={},d=e[1],v=void 0,y=void 0,g=e[2],h=0;if(u(e[1])?Te&&Te[e[1]]?(y=Te[e[1]],d={},g=e[2]):(v=!0,d=r({},e[1],e[2]),g=e[3]):Array.isArray(e[1])&&(v=!0,d={tween:e[1]},g=e[2]),!l(a)||a<0||a>1)throw new Error("VelocityJS: Must tween a percentage from 0 to 1!");if(!s(d))throw new Error("VelocityJS: Cannot tween an invalid property!");if(o)for(var m in d)if(d.hasOwnProperty(m)&&(!Array.isArray(d[m])||d[m].length<2))throw new Error("VelocityJS: When not supplying an element you must force-feed values: "+m);var b=W(p(g,ve.easing),w);for(var S in y?tn(c,y):Ze(c,d),c.tweens){var x=c.tweens[S],O=x.sequence,E=O.pattern,_="",T=0;if(h++,E){for(var M=(x.easing||b)(a,0,1,S),V=0,q=0;q<O.length-1;q++)O[q].percent<M&&(V=q);for(var N=O[V],A=O[V+1]||N,L=(a-N.percent)/(A.percent-N.percent),J=A.easing||k;T<E.length;T++){var I=N[T];if(null==I)_+=E[T];else{var j=A[T];if(I===j)_+=I;else{var C=J(L,I,j,S);_+=!0===E[T]?Math.round(C):C}}}f[S]=_}}if(v&&1===h)for(var P in f)if(f.hasOwnProperty(P))return f[P];return f}],!0);var St={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgrey:11119017,darkgreen:25600,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,grey:8421504,green:32768,greenyellow:11403055,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgrey:13882323,lightgreen:9498256,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};for(var xt in St)if(St.hasOwnProperty(xt)){var kt=St[xt];He[xt]=Math.floor(kt/65536)+","+Math.floor(kt/256%256)+","+kt%256}function Ot(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375}function Et(e){return 1-Ot(1-e)}!function(e,t){x([e,function(e,n,r){return 0===e?n:1===e?r:Math.pow(e,2)*((t+1)*e-t)*(r-n)}])}("easeInBack",1.7),function(e,t){x([e,function(e,n,r){return 0===e?n:1===e?r:(Math.pow(--e,2)*((t+1)*e+t)+1)*(r-n)}])}("easeOutBack",1.7),function(e,t){t*=1.525,x([e,function(e,n,r){return 0===e?n:1===e?r:.5*((e*=2)<1?Math.pow(e,2)*((t+1)*e-t):Math.pow(e-2,2)*((t+1)*(e-2)+t)+2)*(r-n)}])}("easeInOutBack",1.7),x(["easeInBounce",function(e,t,n){return 0===e?t:1===e?n:Et(e)*(n-t)}]),x(["easeOutBounce",function(e,t,n){return 0===e?t:1===e?n:Ot(e)*(n-t)}]),x(["easeInOutBounce",function(e,t,n){return 0===e?t:1===e?n:(e<.5?.5*Et(2*e):.5*Ot(2*e-1)+.5)*(n-t)}]);var _t=2*Math.PI;function Tt(e,t){return function(n,r){if(void 0===r)return We(n,e,t)+"px";Ae(n,e,parseFloat(r)-We(n,e,t)+"px")}}!function(e,t,n){x([e,function(e,r,i){return 0===e?r:1===e?i:-t*Math.pow(2,10*(e-=1))*Math.sin((e-n/_t*Math.asin(1/t))*_t/n)*(i-r)}])}("easeInElastic",1,.3),function(e,t,n){x([e,function(e,r,i){return 0===e?r:1===e?i:(t*Math.pow(2,-10*e)*Math.sin((e-n/_t*Math.asin(1/t))*_t/n)+1)*(i-r)}])}("easeOutElastic",1,.3),function(e,t,n){x([e,function(e,r,i){if(0===e)return r;if(1===e)return i;var o=n/_t*Math.asin(1/t);return((e=2*e-1)<0?t*Math.pow(2,10*e)*Math.sin((e-o)*_t/n)*-.5:t*Math.pow(2,-10*e)*Math.sin((e-o)*_t/n)*.5+1)*(i-r)}])}("easeInOutElastic",1,.3*1.5),x(["at-start",function(e,t,n){return 0===e?t:n}]),x(["during",function(e,t,n){return 0===e||1===e?t:n}]),x(["at-end",function(e,t,n){return 1===e?n:t}]),Ve(["Element","innerWidth",Tt("width",!0)]),Ve(["Element","innerHeight",Tt("height",!0)]),Ve(["Element","outerWidth",Tt("width",!1)]),Ve(["Element","outerHeight",Tt("height",!1)]);var Mt=/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|let|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i,Vt=/^(li)$/i,qt=/^(tr)$/i,Nt=/^(table)$/i,At=/^(tbody)$/i;function Lt(e,t){return function(n,r){if(null==r)return Qe(n,"client"+e,null,!0),Qe(n,"scroll"+e,null,!0),n["scroll"+t]+"px";var i=parseFloat(r);switch(r.replace(String(i),"")){case"":case"px":n["scroll"+t]=i;break;case"%":var o=parseFloat(Qe(n,"client"+e)),a=parseFloat(Qe(n,"scroll"+e));n["scroll"+t]=Math.max(0,a-o)*i/100}}}Ve(["Element","display",function(e,t){var n=e.style;if(void 0===t)return Ge(e,"display");if("auto"===t){var r=e&&e.nodeName,i=be(e);t=Mt.test(r)?"inline":Vt.test(r)?"list-item":qt.test(r)?"table-row":Nt.test(r)?"table":At.test(r)?"table-row-group":"block",i.cache.display=t}n.display=t}]),Ve(["HTMLElement","scroll",Lt("Height","Top"),!1]),Ve(["HTMLElement","scrollTop",Lt("Height","Top"),!1]),Ve(["HTMLElement","scrollLeft",Lt("Width","Left"),!1]),Ve(["HTMLElement","scrollWidth",function(e,t){if(null==t)return e.scrollWidth+"px"}]),Ve(["HTMLElement","clientWidth",function(e,t){if(null==t)return e.clientWidth+"px"}]),Ve(["HTMLElement","scrollHeight",function(e,t){if(null==t)return e.scrollHeight+"px"}]),Ve(["HTMLElement","clientHeight",function(e,t){if(null==t)return e.clientHeight+"px"}]);var Jt=/^(b(lockSize|o(rder(Bottom(LeftRadius|RightRadius|Width)|Image(Outset|Width)|LeftWidth|R(adius|ightWidth)|Spacing|Top(LeftRadius|RightRadius|Width)|Width)|ttom))|column(Gap|RuleWidth|Width)|f(lexBasis|ontSize)|grid(ColumnGap|Gap|RowGap)|height|inlineSize|le(ft|tterSpacing)|m(a(rgin(Bottom|Left|Right|Top)|x(BlockSize|Height|InlineSize|Width))|in(BlockSize|Height|InlineSize|Width))|o(bjectPosition|utline(Offset|Width))|p(adding(Bottom|Left|Right|Top)|erspective)|right|s(hapeMargin|troke(Dashoffset|Width))|t(extIndent|op|ransformOrigin)|w(idth|ordSpacing))$/;function It(e,t){return function(n,r){if(void 0===r)return Ge(n,e)||Ge(n,t);n.style[e]=n.style[t]=r}}function jt(e){return function(t,n){if(void 0===n)return Ge(t,e);t.style[e]=n}}var Ct=/^(webkit|moz|ms|o)[A-Z]/,Pt=ke.prefixElement;if(Pt)for(var zt in Pt.style)if(Ct.test(zt)){var Ft=zt.replace(/^[a-z]+([A-Z])/,function(e,t){return t.toLowerCase()}),Ht=Jt.test(Ft)?"px":void 0;Ve(["Element",Ft,It(zt,Ft),Ht])}else if(!qe(["Element",zt])){var Rt=Jt.test(zt)?"px":void 0;Ve(["Element",zt,jt(zt),Rt])}function Bt(e){return function(t,n){if(void 0===n)return t.getAttribute(e);t.setAttribute(e,n)}}var Wt=document.createElement("div"),$t=/^SVG(.*)Element$/,Gt=/Element$/;function Qt(e){return function(t,n){if(void 0===n)try{return t.getBBox()[e]+"px"}catch(e){return"0px"}t.setAttribute(e,n)}}Object.getOwnPropertyNames(window).forEach(function(e){var t=$t.exec(e);if(t&&"SVG"!==t[1])try{var n=t[1]?document.createElementNS("http://www.w3.org/2000/svg",(t[1]||"svg").toLowerCase()):document.createElement("svg");for(var r in n){var i=n[r];!u(r)||"o"===r[0]&&"n"===r[1]||r===r.toUpperCase()||Gt.test(r)||r in Wt||o(i)||Ve([e,r,Bt(r)])}}catch(t){console.error("VelocityJS: Error when trying to identify SVG attributes on "+e+".",t)}}),Ve(["SVGElement","width",Qt("width")]),Ve(["SVGElement","height",Qt("height")]),Ve(["Element","tween",function(e,t){if(void 0===t)return""}]);var Dt,Ut=an;if(function(e){e.Actions=h,e.Easings=S,e.Sequences=Te,e.State=ke,e.defaults=ve,e.patch=sn,e.debug=!1,e.mock=!1,e.version="2.0.6",e.Velocity=an}(Dt||(Dt={})),function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e}}()<=8)throw new Error("VelocityJS cannot run on Internet Explorer 8 or earlier");if(window){var Zt=window.jQuery,Yt=window.Zepto;sn(window,!0),sn(Element&&Element.prototype),sn(NodeList&&NodeList.prototype),sn(HTMLCollection&&HTMLCollection.prototype),sn(Zt,!0),sn(Zt&&Zt.fn),sn(Yt,!0),sn(Yt&&Yt.fn)}var Xt=function(t){if(Dt.hasOwnProperty(t))switch(void 0===t?"undefined":e(t)){case"number":case"boolean":v(Ut,t,{get:function(){return Dt[t]},set:function(e){Dt[t]=e}},!0);break;default:v(Ut,t,Dt[t],!0)}};for(var Kt in Dt)Xt(Kt);Object.freeze(Ut);var en=/(\d*\.\d+|\d+\.?|from|to)/g;function tn(e,t){var n=e.tweens=Object.create(null),r=e.element;for(var i in t.tweens)if(t.tweens.hasOwnProperty(i)){var o=Ne(r,i);if(!o&&"tween"!==i){Ut.debug&&console.log("Skipping ["+i+"] due to a lack of browser support.");continue}n[i]={fn:o,sequence:t.tweens[i]}}}m(["registerSequence",function e(t){if(s(t[0]))for(var n in t[0])t[0].hasOwnProperty(n)&&e([n,t[0][n]]);else if(u(t[0])){var r=t[0],i=t[1];if(u(r))if(s(i)){Te[r]&&console.warn("VelocityJS: Replacing named sequence:",r);var o={},a=new Array(100),c=[],f=Te[r]={},d=B(i.duration);for(var v in f.tweens={},l(d)&&(f.duration=d),i)if(i.hasOwnProperty(v)){var p=String(v).match(en);if(p){var y=!0,g=!1,h=void 0;try{for(var m,b=p[Symbol.iterator]();!(y=(m=b.next()).done);y=!0){var S=m.value,x="from"===S?0:"to"===S?100:parseFloat(S);if(x<0||x>100)console.warn("VelocityJS: Trying to use an invalid value as a percentage (0 <= n <= 100):",r,x);else if(isNaN(x))console.warn("VelocityJS: Trying to use an invalid number as a percentage:",r,v,S);else for(var k in o[String(x)]||(o[String(x)]=[]),o[String(x)].push(v),i[v])c.includes(k)||c.push(k)}}catch(e){g=!0,h=e}finally{try{!y&&b.return&&b.return()}finally{if(g)throw h}}}}var O=Object.keys(o).sort(function(e,t){var n=parseFloat(e),r=parseFloat(t);return n>r?1:n<r?-1:0});O.forEach(function(e){a.push.apply(o[e])});var E=!0,_=!1,T=void 0;try{for(var M,V=c[Symbol.iterator]();!(E=(M=V.next()).done);E=!0){var q=M.value,N=[],A=Ie(q),L=!0,J=!1,I=void 0;try{for(var j,C=O[Symbol.iterator]();!(L=(j=C.next()).done);L=!0){var P=j.value,z=!0,F=!1,H=void 0;try{for(var R,$=o[P][Symbol.iterator]();!(z=(R=$.next()).done);z=!0){var G=i[R.value];G[A]&&N.push(u(G[A])?G[A]:G[A][0])}}catch(e){F=!0,H=e}finally{try{!z&&$.return&&$.return()}finally{if(F)throw H}}}}catch(e){J=!0,I=e}finally{try{!L&&C.return&&C.return()}finally{if(J)throw I}}if(N.length){var Q=Ke(N,A),D=0;if(Q){var U=!0,Z=!1,Y=void 0;try{for(var X,K=O[Symbol.iterator]();!(U=(X=K.next()).done);U=!0){var ee=X.value,te=!0,ne=!1,re=void 0;try{for(var ie,oe=o[ee][Symbol.iterator]();!(te=(ie=oe.next()).done);te=!0){var ae=i[ie.value][A];ae&&(Array.isArray(ae)&&ae.length>1&&(u(ae[1])||Array.isArray(ae[1]))&&(Q[D].easing=W(ae[1],f.duration||w)),Q[D++].percent=parseFloat(ee)/100)}}catch(e){ne=!0,re=e}finally{try{!te&&oe.return&&oe.return()}finally{if(ne)throw re}}}}catch(e){Z=!0,Y=e}finally{try{!U&&K.return&&K.return()}finally{if(Z)throw Y}}f.tweens[A]=Q}}}}catch(e){_=!0,T=e}finally{try{!E&&V.return&&V.return()}finally{if(_)throw T}}}else console.warn("VelocityJS: Trying to set 'registerSequence' sequence to an invalid value:",r,i);else console.warn("VelocityJS: Trying to set 'registerSequence' name to an invalid value:",r)}}],!0);var nn=void 0;try{nn=Promise}catch(e){}var rn=", if that is deliberate then pass `promiseRejectEmpty:false` as an option";function on(e,t){v(t,"promise",e),v(t,"then",e.then.bind(e)),v(t,"catch",e.catch.bind(e)),e.finally&&v(t,"finally",e.finally.bind(e))}function an(){var e,t=ve,n=arguments.length<=0?void 0:arguments[0],r=s(n)&&(n.p||s(n.properties)&&!n.properties.names||u(n.properties)),y=0,g=void 0,m=void 0,w=void 0,b=void 0,S=void 0,x=void 0,k=void 0;(a(this)?g=[this]:f(this)?(g=d(this),c(this)&&(b=this.velocity.animations)):r?(g=d(n.elements||n.e),y++):a(n)?(g=d([n]),y++):f(n)&&(g=d(n),y++),g&&(v(g,"velocity",an.bind(g)),b&&v(g.velocity,"animations",b)),r)?m=p(n.properties,n.p):(e=y++,m=arguments.length<=e?void 0:arguments[e]);var O="reverse"===m,E=!O&&u(m),_=E&&Te[m],T=r?p(n.options,n.o):arguments.length<=y?void 0:arguments[y];if(s(T)&&(w=T),nn&&p(w&&w.promise,t.promise)&&(S=new nn(function(e,t){k=t,x=function(t){c(t)&&t.promise?(delete t.then,delete t.catch,delete t.finally,e(t),on(t.promise,t)):e(t)}}),g&&on(S,g)),S){var M=w&&w.promiseRejectEmpty,V=p(M,t.promiseRejectEmpty);g||E?m||(V?k("Velocity: No properties supplied"+(i(M)?"":rn)+". Aborting."):x()):V?k("Velocity: No elements supplied"+(i(M)?"":rn)+". Aborting."):x()}if(!g&&!E||!m)return S;if(E){for(var q=[],N=S&&{_promise:S,_resolver:x,_rejecter:k};y<arguments.length;){var A;q.push((A=y++,arguments.length<=A?void 0:arguments[A]))}var L=m.replace(/\..*$/,""),J=h[L];if(J){var I=J(q,g,N,m);return void 0!==I?I:g||S}if(!_)return void console.error("VelocityJS: First argument ("+m+") was not a property map, a known action, or a registered redirect. Aborting.")}var j=void 0;if(s(m)||O||_){var C={},P=t.sync;if(S&&(v(C,"_promise",S),v(C,"_rejecter",k),v(C,"_resolver",x)),v(C,"_ready",0),v(C,"_started",0),v(C,"_completed",0),v(C,"_total",0),s(w)){var z=B(w.duration);j=void 0!==z,C.duration=p(z,t.duration),C.delay=p(R(w.delay),t.delay),C.easing=W(p(w.easing,t.easing),C.duration)||W(t.easing,C.duration),C.loop=p(G(w.loop),t.loop),C.repeat=C.repeatAgain=p(D(w.repeat),t.repeat),null!=w.speed&&(C.speed=p(U(w.speed),1)),i(w.promise)&&(C.promise=w.promise),C.queue=p(Q(w.queue),t.queue),w.mobileHA&&!ke.isGingerbread&&(C.mobileHA=!0),!0===w.drag&&(C.drag=!0),(l(w.stagger)||o(w.stagger))&&(C.stagger=w.stagger),O||(null!=w.display&&(m.display=w.display,console.error('Deprecated "options.display" used, this is now a property:',w.display)),null!=w.visibility&&(m.visibility=w.visibility,console.error('Deprecated "options.visibility" used, this is now a property:',w.visibility)));var $=F(w.begin),Y=H(w.complete),X=function(e){if(o(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'progress' to an invalid value:",e)}(w.progress),K=Z(w.sync);null!=$&&(C.begin=$),null!=Y&&(C.complete=Y),null!=X&&(C.progress=X),null!=K&&(P=K)}else if(!r){var ee=0;if(C.duration=B(arguments.length<=y?void 0:arguments[y],!0),void 0===C.duration?C.duration=t.duration:(j=!0,ee++),!o(arguments.length<=y+ee?void 0:arguments[y+ee])){var te=W(arguments.length<=y+ee?void 0:arguments[y+ee],p(C&&B(C.duration),t.duration),!0);void 0!==te&&(ee++,C.easing=te)}var ne=H(arguments.length<=y+ee?void 0:arguments[y+ee],!0);void 0!==ne&&(C.complete=ne),C.delay=t.delay,C.loop=t.loop,C.repeat=C.repeatAgain=t.repeat}if(O&&!1===C.queue)throw new Error("VelocityJS: Cannot reverse a queue:false animation.");!j&&_&&_.duration&&(C.duration=_.duration);var re={options:C,elements:g,_prev:void 0,_next:void 0,_flags:P?32:0,percentComplete:0,ellapsedTime:0,timeStart:0};b=[];for(var ie=0;ie<g.length;ie++){var oe=g[ie],ae=0;if(a(oe)){if(O){var le=be(oe).lastAnimationList[C.queue];if(!(m=le&&le.tweens)){console.error("VelocityJS: Attempting to reverse an animation on an element with no previous animation:",oe);continue}ae|=64&~(64&le._flags)}var se=Object.assign({},re,{element:oe,_flags:re._flags|ae});if(C._total++,b.push(se),C.stagger)if(o(C.stagger)){var ue=ln(C.stagger,oe,ie,g.length,g,"stagger");l(ue)&&(se.delay=C.delay+ue)}else se.delay=C.delay+C.stagger*ie;C.drag&&(se.duration=C.duration-C.duration*Math.max(1-(ie+1)/g.length,.75)),_?tn(se,_):O?se.tweens=m:(se.tweens=Object.create(null),Ze(se,m)),Ee(oe,se,C.queue)}}!1===ke.isTicking&&pt(!1),b&&v(g.velocity,"animations",b)}return g||S}function ln(e,t,n,r,i,o){try{return e.call(t,n,r,i,o)}catch(e){console.error("VelocityJS: Exception when calling '"+o+"' callback:",e)}}function sn(e,t){try{v(e,(t?"V":"v")+"elocity",an)}catch(e){console.warn("VelocityJS: Error when trying to add prototype.",e)}}var un,cn=an;if(function(e){e.Actions=h,e.Easings=S,e.Sequences=Te,e.State=ke,e.defaults=ve,e.patch=sn,e.debug=!1,e.mock=!1,e.version="2.0.6",e.Velocity=an}(un||(un={})),function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e}}()<=8)throw new Error("VelocityJS cannot run on Internet Explorer 8 or earlier");if(window){var fn=window.jQuery,dn=window.Zepto;sn(window,!0),sn(Element&&Element.prototype),sn(NodeList&&NodeList.prototype),sn(HTMLCollection&&HTMLCollection.prototype),sn(fn,!0),sn(fn&&fn.fn),sn(dn,!0),sn(dn&&dn.fn)}var vn=function(t){if(un.hasOwnProperty(t))switch(void 0===t?"undefined":e(t)){case"number":case"boolean":v(cn,t,{get:function(){return un[t]},set:function(e){un[t]=e}},!0);break;default:v(cn,t,un[t],!0)}};for(var pn in un)vn(pn);return Object.freeze(cn),cn});
