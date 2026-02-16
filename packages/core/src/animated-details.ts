/**
 * Options for AnimatedDetails
 */
export interface AnimatedDetailsOptions {
	/** Animation duration in milliseconds (default: 300) */
	duration?: number;
	/** CSS easing function (default: 'cubic-bezier(0.4, 0, 0.2, 1)') */
	easing?: string;
	/** Selector for the content wrapper element (default: '.disclosure__content') */
	contentSelector?: string;
}

/**
 * Registry mapping DOM elements to their AnimatedDetails instances.
 * Used by DetailsGroup to call animated close/open instead of direct DOM manipulation.
 */
export const instanceRegistry = new WeakMap<HTMLDetailsElement, AnimatedDetails>();

const DEFAULT_OPTIONS: Required<AnimatedDetailsOptions> = {
	duration: 300,
	easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
	contentSelector: '.disclosure__content',
};

/**
 * AnimatedDetails provides smooth height transitions for <details> elements.
 *
 * @example
 * ```ts
 * const details = document.querySelector('details');
 * new AnimatedDetails(details);
 * ```
 */
export class AnimatedDetails {
	private el: HTMLDetailsElement;
	private summary: HTMLElement;
	private content: HTMLElement;
	private animation: Animation | null = null;
	private isClosing = false;
	private isExpanding = false;
	private options: Required<AnimatedDetailsOptions>;
	private boundOnClick: (e: Event) => void;

	constructor(el: HTMLDetailsElement, options?: AnimatedDetailsOptions) {
		this.el = el;
		this.options = { ...DEFAULT_OPTIONS, ...options };

		const summary = el.querySelector('summary');
		if (!summary) {
			throw new Error('AnimatedDetails: <details> must contain a <summary> element');
		}
		this.summary = summary;

		const content = el.querySelector(this.options.contentSelector);
		if (!content) {
			throw new Error(
				`AnimatedDetails: <details> must contain a content element matching "${this.options.contentSelector}"`
			);
		}
		this.content = content as HTMLElement;

		this.boundOnClick = (e) => this.onClick(e);
		this.summary.addEventListener('click', this.boundOnClick);
		instanceRegistry.set(el, this);
	}

	/**
	 * Get the AnimatedDetails instance for a given element, if one exists.
	 */
	static getInstance(el: HTMLDetailsElement): AnimatedDetails | undefined {
		return instanceRegistry.get(el);
	}

	/**
	 * Handle click on summary element
	 */
	private onClick(e: Event): void {
		e.preventDefault();
		this.el.style.overflow = 'hidden';

		if (this.isClosing || !this.el.open) {
			this.open();
		} else if (this.isExpanding || this.el.open) {
			this.close();
		}
	}

	/**
	 * Open the details element with animation
	 */
	open(): void {
		this.el.style.height = `${this.el.offsetHeight}px`;
		this.el.open = true;
		window.requestAnimationFrame(() => this.expand());
	}

	/**
	 * Close the details element with animation
	 */
	close(): void {
		this.shrink();
	}

	/**
	 * Toggle the details element open/closed
	 */
	toggle(): void {
		if (this.el.open) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Expand animation
	 */
	private expand(): void {
		this.isExpanding = true;
		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		const duration = this.getAnimationDuration();

		this.animation = this.el.animate({ height: [startHeight, endHeight] }, { duration, easing: this.options.easing });

		this.animation.onfinish = () => this.onAnimationFinish(true);
		this.animation.oncancel = () => {
			this.isExpanding = false;
		};
	}

	/**
	 * Shrink animation
	 */
	private shrink(): void {
		this.isClosing = true;
		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight = `${this.summary.offsetHeight}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		const duration = this.getAnimationDuration();

		this.animation = this.el.animate({ height: [startHeight, endHeight] }, { duration, easing: this.options.easing });

		this.animation.onfinish = () => this.onAnimationFinish(false);
		this.animation.oncancel = () => {
			this.isClosing = false;
		};
	}

	/**
	 * Get animation duration, respecting prefers-reduced-motion
	 */
	private getAnimationDuration(): number {
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return 0;
		}
		return this.options.duration;
	}

	/**
	 * Animation finish handler
	 */
	private onAnimationFinish(open: boolean): void {
		this.el.open = open;
		this.animation = null;
		this.isExpanding = false;
		this.isClosing = false;
		this.el.style.height = '';
		this.el.style.overflow = '';
	}

	/**
	 * Remove event listeners and cleanup
	 */
	destroy(): void {
		this.summary.removeEventListener('click', this.boundOnClick);
		if (this.animation) {
			this.animation.cancel();
		}
		instanceRegistry.delete(this.el);
	}
}
