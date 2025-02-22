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
