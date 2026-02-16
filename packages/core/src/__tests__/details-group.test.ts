import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initDetailsGroup, DetailsGroup } from '../details-group';
import { AnimatedDetails, instanceRegistry } from '../animated-details';

// Mock the Web Animations API
const mockAnimate = vi.fn(() => ({
	onfinish: null as (() => void) | null,
	oncancel: null as (() => void) | null,
	cancel: vi.fn(),
}));
HTMLElement.prototype.animate = mockAnimate as unknown as typeof HTMLElement.prototype.animate;

describe('initDetailsGroup', () => {
	let container: HTMLElement;

	beforeEach(() => {
		container = document.createElement('div');
		container.innerHTML = `
			<details>
				<summary>Item 1</summary>
				<div>Content 1</div>
			</details>
			<details>
				<summary>Item 2</summary>
				<div>Content 2</div>
			</details>
			<details>
				<summary>Item 3</summary>
				<div>Content 3</div>
			</details>
		`;
		document.body.appendChild(container);
	});

	it('should return a cleanup function', () => {
		const cleanup = initDetailsGroup(container);
		expect(typeof cleanup).toBe('function');
	});

	it('should close other details when one opens in exclusive mode', () => {
		initDetailsGroup(container, { exclusive: true });

		const details = container.querySelectorAll('details');
		const [first, second, third] = details;

		// Open first
		first.open = true;
		first.dispatchEvent(new Event('toggle'));
		expect(first.open).toBe(true);

		// Open second - should close first
		second.open = true;
		second.dispatchEvent(new Event('toggle'));
		expect(second.open).toBe(true);
		expect(first.open).toBe(false);

		// Open third - should close second
		third.open = true;
		third.dispatchEvent(new Event('toggle'));
		expect(third.open).toBe(true);
		expect(second.open).toBe(false);
	});

	it('should allow multiple open when exclusive is false', () => {
		initDetailsGroup(container, { exclusive: false });

		const details = container.querySelectorAll('details');
		const [first, second] = details;

		first.open = true;
		first.dispatchEvent(new Event('toggle'));

		second.open = true;
		second.dispatchEvent(new Event('toggle'));

		expect(first.open).toBe(true);
		expect(second.open).toBe(true);
	});

	it('should use custom selector', () => {
		const customContainer = document.createElement('div');
		customContainer.innerHTML = `
			<details class="accordion-item">
				<summary>Item 1</summary>
				<div>Content 1</div>
			</details>
			<details class="accordion-item">
				<summary>Item 2</summary>
				<div>Content 2</div>
			</details>
		`;

		initDetailsGroup(customContainer, {
			exclusive: true,
			detailsSelector: '.accordion-item',
		});

		const details = customContainer.querySelectorAll('.accordion-item');
		const [first, second] = details as NodeListOf<HTMLDetailsElement>;

		first.open = true;
		first.dispatchEvent(new Event('toggle'));

		second.open = true;
		second.dispatchEvent(new Event('toggle'));

		expect(first.open).toBe(false);
		expect(second.open).toBe(true);
	});
});

describe('DetailsGroup', () => {
	let container: HTMLElement;

	beforeEach(() => {
		container = document.createElement('div');
		container.innerHTML = `
			<details>
				<summary>Item 1</summary>
				<div>Content 1</div>
			</details>
			<details>
				<summary>Item 2</summary>
				<div>Content 2</div>
			</details>
			<details>
				<summary>Item 3</summary>
				<div>Content 3</div>
			</details>
		`;
		document.body.appendChild(container);
	});

	it('should create a DetailsGroup instance', () => {
		const group = new DetailsGroup(container);
		expect(group).toBeInstanceOf(DetailsGroup);
	});

	it('should open details by index', () => {
		const group = new DetailsGroup(container, { exclusive: false });

		group.openByIndex(1);

		const details = container.querySelectorAll('details');
		expect(details[1].open).toBe(true);
	});

	it('should close all details', () => {
		const group = new DetailsGroup(container, { exclusive: false });

		const details = container.querySelectorAll('details');
		details[0].open = true;
		details[1].open = true;

		group.closeAll();

		expect(details[0].open).toBe(false);
		expect(details[1].open).toBe(false);
		expect(details[2].open).toBe(false);
	});

	it('should have destroy method', () => {
		const group = new DetailsGroup(container);
		expect(typeof group.destroy).toBe('function');
		group.destroy();
	});
});

describe('DetailsGroup with AnimatedDetails instances', () => {
	let container: HTMLElement;

	function makeAnimatedContainer() {
		container = document.createElement('div');
		container.innerHTML = `
			<details class="disclosure">
				<summary class="disclosure__summary">Item 1</summary>
				<div class="disclosure__content">Content 1</div>
			</details>
			<details class="disclosure">
				<summary class="disclosure__summary">Item 2</summary>
				<div class="disclosure__content">Content 2</div>
			</details>
			<details class="disclosure">
				<summary class="disclosure__summary">Item 3</summary>
				<div class="disclosure__content">Content 3</div>
			</details>
		`;
		document.body.appendChild(container);

		const details = container.querySelectorAll<HTMLDetailsElement>('details');
		details.forEach((el) => new AnimatedDetails(el));
		return details;
	}

	beforeEach(() => {
		mockAnimate.mockClear();
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('should call animated close on siblings in exclusive mode', () => {
		const details = makeAnimatedContainer();
		initDetailsGroup(container, { exclusive: true });

		const instance1 = instanceRegistry.get(details[0])!;
		const closeSpy = vi.spyOn(instance1, 'close');

		// Open first
		details[0].open = true;
		details[0].dispatchEvent(new Event('toggle'));

		// Open second - should trigger animated close on first
		details[1].open = true;
		details[1].dispatchEvent(new Event('toggle'));

		expect(closeSpy).toHaveBeenCalled();
	});

	it('should fall back to direct DOM when no instance exists', () => {
		container = document.createElement('div');
		container.innerHTML = `
			<details>
				<summary>Item 1</summary>
				<div>Content 1</div>
			</details>
			<details>
				<summary>Item 2</summary>
				<div>Content 2</div>
			</details>
		`;
		document.body.appendChild(container);

		initDetailsGroup(container, { exclusive: true });

		const details = container.querySelectorAll('details');

		details[0].open = true;
		details[0].dispatchEvent(new Event('toggle'));

		details[1].open = true;
		details[1].dispatchEvent(new Event('toggle'));

		// Falls back to direct DOM, so open = false immediately
		expect(details[0].open).toBe(false);
	});

	it('should use animated open in openByIndex', () => {
		const details = makeAnimatedContainer();
		const group = new DetailsGroup(container, { exclusive: false });

		const instance1 = instanceRegistry.get(details[1])!;
		const openSpy = vi.spyOn(instance1, 'open');

		group.openByIndex(1);

		expect(openSpy).toHaveBeenCalled();
	});

	it('should use animated close in closeAll', () => {
		const details = makeAnimatedContainer();
		const group = new DetailsGroup(container, { exclusive: false });

		// Open some details first
		details[0].open = true;
		details[1].open = true;

		const closeSpy0 = vi.spyOn(instanceRegistry.get(details[0])!, 'close');
		const closeSpy1 = vi.spyOn(instanceRegistry.get(details[1])!, 'close');

		group.closeAll();

		expect(closeSpy0).toHaveBeenCalled();
		expect(closeSpy1).toHaveBeenCalled();
	});
});
