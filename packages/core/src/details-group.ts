/**
 * Options for initDetailsGroup
 */
export interface DetailsGroupOptions {
	/** Only one details can be open at a time (default: true) */
	exclusive?: boolean;
	/** Selector for details elements within the container (default: 'details') */
	detailsSelector?: string;
}

const DEFAULT_OPTIONS: Required<DetailsGroupOptions> = {
	exclusive: true,
	detailsSelector: 'details',
};

/**
 * Initialize a group of details elements as an accordion.
 * When exclusive mode is enabled, opening one details will close all others.
 *
 * @example
 * ```ts
 * const group = document.querySelector('.faq-group');
 * initDetailsGroup(group, { exclusive: true });
 * ```
 */
export function initDetailsGroup(container: HTMLElement, options?: DetailsGroupOptions): () => void {
	const opts = { ...DEFAULT_OPTIONS, ...options };

	if (!opts.exclusive) {
		return () => {};
	}

	const details = container.querySelectorAll<HTMLDetailsElement>(opts.detailsSelector);
	const controllers: AbortController[] = [];

	details.forEach((detail) => {
		const controller = new AbortController();
		controllers.push(controller);

		detail.addEventListener(
			'toggle',
			() => {
				if (detail.open) {
					details.forEach((other) => {
						if (other !== detail && other.open) {
							other.open = false;
						}
					});
				}
			},
			{ signal: controller.signal }
		);
	});

	return () => {
		controllers.forEach((controller) => controller.abort());
	};
}

/**
 * DetailsGroup class for more control over accordion behavior
 */
export class DetailsGroup {
	private container: HTMLElement;
	private cleanup: () => void;

	constructor(container: HTMLElement, options?: DetailsGroupOptions) {
		this.container = container;
		this.cleanup = initDetailsGroup(container, options);
	}

	/**
	 * Open a specific details by index
	 */
	openByIndex(index: number): void {
		const details = this.container.querySelectorAll<HTMLDetailsElement>('details');
		if (details[index]) {
			details[index].open = true;
		}
	}

	/**
	 * Close all details in the group
	 */
	closeAll(): void {
		const details = this.container.querySelectorAll<HTMLDetailsElement>('details');
		details.forEach((detail) => {
			detail.open = false;
		});
	}

	/**
	 * Remove event listeners and cleanup
	 */
	destroy(): void {
		this.cleanup();
	}
}
