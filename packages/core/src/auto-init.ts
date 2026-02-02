import { AnimatedDetails } from './animated-details';
import { initDetailsGroup } from './details-group';

const INITIALIZED_ATTR = 'data-disclosure-initialized';

/**
 * Auto-initialize all disclosure elements on the page.
 * Call this function to initialize:
 * - All <details data-animated> elements as AnimatedDetails
 * - All [data-disclosure-group] containers as accordion groups
 */
export function autoInit(): void {
	// Initialize animated details
	document.querySelectorAll<HTMLDetailsElement>('details[data-animated]').forEach((el) => {
		if (!el.hasAttribute(INITIALIZED_ATTR)) {
			new AnimatedDetails(el);
			el.setAttribute(INITIALIZED_ATTR, 'true');
		}
	});

	// Initialize details groups
	document.querySelectorAll<HTMLElement>('[data-disclosure-group]').forEach((el) => {
		if (!el.hasAttribute(INITIALIZED_ATTR)) {
			const exclusive = el.dataset.disclosureGroup !== 'false';
			initDetailsGroup(el, { exclusive });
			el.setAttribute(INITIALIZED_ATTR, 'true');
		}
	});
}

// Auto-run on DOMContentLoaded
if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', autoInit);
	} else {
		autoInit();
	}
}
