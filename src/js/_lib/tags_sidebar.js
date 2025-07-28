class TagsShrinkEffect {
	constructor(tagsContainerId, sidebarId) {
		this.tagsContainer = document.querySelector(tagsContainerId);
		this.sidebar = document.querySelector(sidebarId);

		if (!this.tagsContainer || !this.sidebar) {
			console.error("Required elements (tagsContainer or sidebar) not found.");
			this.isValid = false;
			return;
		}
		this.isValid = true;
		this.tagsToFade = this.tagsContainer.querySelectorAll('span');

		// Configuration: Offsets from the point the sidebar becomes sticky at the top
		this.SHRINK_START_OFFSET = 50;  // Start shrinking 50px after sidebar top hits viewport top
		this.SHRINK_END_OFFSET = 300;   // Fully shrunk 300px after sidebar top hits viewport top

		this.MIN_TAGS_HEIGHT = 0;       // Minimum height of the tags container when shrunk
		this.INITIAL_TAG_OPACITY = 1;
		this.MIN_TAG_OPACITY = 0;

		this.SHRINK_RANGE = this.SHRINK_END_OFFSET - this.SHRINK_START_OFFSET;

		if (this.SHRINK_RANGE <= 0) {
			console.error("Shrink range (END_OFFSET - START_OFFSET) must be positive.");
			this.isValid = false;
			return;
		}

		this.initialTagsHeight = 0;
		this.activationPoint = 0; // ScrollY position when the sidebar's top edge aligns with the viewport's top

		// Bind methods
		this._handleScroll = this._updateOnScroll.bind(this);
		this._handleResize = this._onResize.bind(this);

		// Initialize
		this._initialize();
	}

	_initialize() {
		if (!this.isValid) return;

		// Determine the point at which the sidebar becomes sticky at the top
		// For a `position: sticky; top: 0;` element, this is its natural offsetTop.
		this.activationPoint = this.sidebar.offsetTop;

		this._captureInitialHeight();
		// Set initial height explicitly for CSS transition to work from 'auto'
		this.tagsContainer.style.height = `${this.initialTagsHeight}px`;

		this._updateOnScroll(); // Set initial state based on current scroll position

		window.addEventListener('scroll', this._handleScroll, { passive: true });
		window.addEventListener('resize', this._handleResize, { passive: true });
		console.log("Tags shrink effect initialized and active.");

		this.tagsContainer.classList.add('tags-shrink-effect'); // Add a class to the sidebar for potential styling
	}

	_captureInitialHeight() {
		// Temporarily set height to 'auto' to measure its natural content height
		const originalHeightStyle = this.tagsContainer.scrollHeight;
		this.tagsContainer.style.height = 'auto';
		this.initialTagsHeight = this.tagsContainer.scrollHeight;
		// Restore original style or let _updateOnScroll set it based on current scroll
		this.tagsContainer.style.height = originalHeightStyle;
	}

	_updateOnScroll() {
		if (!this.isValid) return;

		const scrollY = window.scrollY;
		// Calculate scroll position relative to when the sidebar (and thus tagsContainer) is at the top.
		const scrollRelativeToActivation = scrollY - this.activationPoint;
		let progress = 0;

		if (scrollRelativeToActivation <= this.SHRINK_START_OFFSET) {
			progress = 0;
		} else if (scrollRelativeToActivation >= this.SHRINK_END_OFFSET) {
			progress = 1;
		} else {
			progress = (scrollRelativeToActivation - this.SHRINK_START_OFFSET) / this.SHRINK_RANGE;
		}
		progress = Math.max(0, Math.min(1, progress)); // Clamp progress

		// Apply styles
		const currentTagsHeight = this.initialTagsHeight - (this.initialTagsHeight - this.MIN_TAGS_HEIGHT) * progress;
		this.tagsContainer.style.height = `${currentTagsHeight}px`;

		const currentTagOpacity = this.INITIAL_TAG_OPACITY - (this.INITIAL_TAG_OPACITY - this.MIN_TAG_OPACITY) * progress;
		this.tagsToFade.forEach(tagEl => {
			tagEl.style.opacity = currentTagOpacity;
			tagEl.style.visibility = currentTagOpacity < 0.05 ? 'hidden' : 'visible';
			tagEl.style.pointerEvents = currentTagOpacity < 0.05 ? 'none' : 'auto';
		});
	}

	_onResize() {
		if (!this.isValid) return;

		// Recalculate activation point and initial height as layout might change
		this.activationPoint = this.sidebar.offsetTop;
		this._captureInitialHeight();

		// Re-apply styles based on new dimensions and current scroll
		this._updateOnScroll();
	}
}
