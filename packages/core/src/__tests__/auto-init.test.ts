import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { autoInit } from '../auto-init';

describe('autoInit', () => {
	let container: HTMLElement;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('should initialize elements with data-animated attribute', () => {
		container.innerHTML = `
			<details data-animated class="disclosure">
				<summary class="disclosure__summary">
					<span class="disclosure__label">Test</span>
				</summary>
				<div class="disclosure__content">
					<div class="disclosure__content-inner">Content</div>
				</div>
			</details>
		`;

		autoInit();

		const details = container.querySelector('details')!;
		expect(details.hasAttribute('data-disclosure-initialized')).toBe(true);
	});

	it('should not double-initialize elements', () => {
		container.innerHTML = `
			<details data-animated class="disclosure">
				<summary class="disclosure__summary">
					<span class="disclosure__label">Test</span>
				</summary>
				<div class="disclosure__content">
					<div class="disclosure__content-inner">Content</div>
				</div>
			</details>
		`;

		autoInit();
		autoInit();
		autoInit();

		const details = container.querySelector('details')!;
		expect(details.getAttribute('data-disclosure-initialized')).toBe('true');
	});

	it('should initialize disclosure groups', () => {
		container.innerHTML = `
			<div data-disclosure-group>
				<details>
					<summary>Item 1</summary>
					<div>Content 1</div>
				</details>
				<details>
					<summary>Item 2</summary>
					<div>Content 2</div>
				</details>
			</div>
		`;

		autoInit();

		const group = container.querySelector('[data-disclosure-group]')!;
		expect(group.hasAttribute('data-disclosure-initialized')).toBe(true);
	});

	it('should support non-exclusive groups', () => {
		container.innerHTML = `
			<div data-disclosure-group="false">
				<details>
					<summary>Item 1</summary>
					<div>Content 1</div>
				</details>
				<details>
					<summary>Item 2</summary>
					<div>Content 2</div>
				</details>
			</div>
		`;

		autoInit();

		const group = container.querySelector('[data-disclosure-group]')!;
		expect(group.hasAttribute('data-disclosure-initialized')).toBe(true);
	});
});
