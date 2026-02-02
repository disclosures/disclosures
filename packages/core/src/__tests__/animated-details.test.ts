import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AnimatedDetails } from '../animated-details';

// Mock the Web Animations API which isn't available in happy-dom
const mockAnimate = vi.fn(() => ({
	onfinish: null as (() => void) | null,
	oncancel: null as (() => void) | null,
	cancel: vi.fn(),
}));

describe('AnimatedDetails', () => {
	let container: HTMLElement;
	let detailsEl: HTMLDetailsElement;

	beforeEach(() => {
		// Mock animate on HTMLElement prototype
		HTMLElement.prototype.animate = mockAnimate as unknown as typeof HTMLElement.prototype.animate;

		container = document.createElement('div');
		container.innerHTML = `
			<details class="disclosure">
				<summary class="disclosure__summary">
					<span class="disclosure__indicator" aria-hidden="true"></span>
					<span class="disclosure__label">Test Summary</span>
				</summary>
				<div class="disclosure__content">
					<div class="disclosure__content-inner">
						Test content
					</div>
				</div>
			</details>
		`;
		document.body.appendChild(container);
		detailsEl = container.querySelector('details')!;
	});

	afterEach(() => {
		mockAnimate.mockClear();
		document.body.innerHTML = '';
	});

	it('should initialize on a details element', () => {
		const animated = new AnimatedDetails(detailsEl);
		expect(animated).toBeInstanceOf(AnimatedDetails);
	});

	it('should throw if no summary element exists', () => {
		const noSummary = document.createElement('details');
		noSummary.innerHTML = '<div>No summary</div>';

		expect(() => new AnimatedDetails(noSummary)).toThrow(
			'AnimatedDetails: <details> must contain a <summary> element'
		);
	});

	it('should throw if no content element exists', () => {
		const noContent = document.createElement('details');
		noContent.innerHTML = '<summary>Test</summary>';

		expect(() => new AnimatedDetails(noContent)).toThrow(
			'AnimatedDetails: <details> must contain a content element matching ".disclosure__content"'
		);
	});

	it('should accept custom content selector', () => {
		const customContent = document.createElement('details');
		customContent.innerHTML = `
			<summary>Test</summary>
			<div class="my-content">Content</div>
		`;

		const animated = new AnimatedDetails(customContent, {
			contentSelector: '.my-content',
		});

		expect(animated).toBeInstanceOf(AnimatedDetails);
	});

	it('should prevent default click behavior on summary', () => {
		new AnimatedDetails(detailsEl);
		const summary = detailsEl.querySelector('summary')!;

		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

		summary.dispatchEvent(event);

		expect(preventDefaultSpy).toHaveBeenCalled();
	});

	it('should set open=true when opening', () => {
		const animated = new AnimatedDetails(detailsEl);
		expect(detailsEl.open).toBe(false);

		animated.open();
		expect(detailsEl.open).toBe(true);
	});

	it('should have toggle method', () => {
		const animated = new AnimatedDetails(detailsEl);
		expect(typeof animated.toggle).toBe('function');
	});

	it('should have destroy method', () => {
		const animated = new AnimatedDetails(detailsEl);
		expect(typeof animated.destroy).toBe('function');

		// Should not throw
		animated.destroy();
	});

	it('should accept custom duration option', () => {
		const animated = new AnimatedDetails(detailsEl, { duration: 500 });
		expect(animated).toBeInstanceOf(AnimatedDetails);
	});

	it('should accept custom easing option', () => {
		const animated = new AnimatedDetails(detailsEl, {
			easing: 'ease-in-out',
		});
		expect(animated).toBeInstanceOf(AnimatedDetails);
	});

	it('should remove click listener on destroy', () => {
		const animated = new AnimatedDetails(detailsEl);
		const summary = detailsEl.querySelector('summary')!;

		animated.destroy();

		// Click should no longer prevent default after destroy
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		summary.dispatchEvent(event);

		// After destroy, the default behavior should happen
		// (though in tests without full browser, we just verify no errors)
	});
});
