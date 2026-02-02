# Disclosures

Animated disclosure components with smooth height transitions, accessible by default.

## Features

- Smooth animated expand/collapse transitions
- Respects `prefers-reduced-motion`
- Keyboard accessible (Tab, Enter/Space)
- Multiple indicator styles (chevron, plus, arrow, none)
- Multiple variants (default, panel, faq)
- Exclusive accordion groups
- Zero dependencies
- Works with any framework or vanilla JS

## Installation

```bash
npm install @disclosures/core
```

## Quick Start

### With a bundler

```js
import { AnimatedDetails, initDetailsGroup } from '@disclosures/core';
import '@disclosures/core/styles.css';

// Initialize a single details element
const details = document.querySelector('details');
new AnimatedDetails(details);

// Or auto-initialize all details with data-animated
import '@disclosures/core/auto';
```

### Via CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@disclosures/core/dist/styles.css">
<script src="https://unpkg.com/@disclosures/core/dist/index.global.js"></script>
<script>
  const details = document.querySelector('details');
  new Disclosures.AnimatedDetails(details);
</script>
```

### HTML Structure

```html
<details class="disclosure">
  <summary class="disclosure__summary">
    <span class="disclosure__indicator" aria-hidden="true"></span>
    <span class="disclosure__label">Click to expand</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      Your content here
    </div>
  </div>
</details>
```

## API

### AnimatedDetails

```ts
new AnimatedDetails(element: HTMLDetailsElement, options?: AnimatedDetailsOptions)
```

Options:
- `duration` - Animation duration in ms (default: 300)
- `easing` - CSS easing function (default: 'cubic-bezier(0.4, 0, 0.2, 1)')
- `contentSelector` - Selector for content wrapper (default: '.disclosure__content')

Methods:
- `open()` - Programmatically open the details
- `close()` - Programmatically close the details
- `toggle()` - Toggle open/closed state
- `destroy()` - Remove event listeners and cleanup

### initDetailsGroup

```ts
initDetailsGroup(container: HTMLElement, options?: DetailsGroupOptions)
```

Options:
- `exclusive` - Only one details can be open at a time (default: true)
- `detailsSelector` - Selector for details elements (default: 'details')

## CSS Customization

Override CSS custom properties to customize appearance:

```css
:root {
  --disclosure-duration: 300ms;
  --disclosure-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --disclosure-indicator-size: 20px;
  --disclosure-indicator-color: #666;
  --disclosure-indicator-color-open: #00ff88;
}
```

Or import just the tokens and build your own styles:

```js
import '@disclosures/core/tokens.css';
```

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). Uses the Web Animations API.

## License

MIT
