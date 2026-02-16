---
title: Auto-Initialization
sidebar:
  order: 3
---

Auto-initialization lets you set up animated disclosures and accordion groups with data attributes alone. No JavaScript authoring required.

## How it works

Import the auto-init entry point (or load it via CDN) and the library scans the DOM for two data attributes:

| Attribute | Element | What it does |
|-----------|---------|-------------|
| `data-animated` | `<details>` | Creates an `AnimatedDetails` instance for the element |
| `data-disclosure-group` | any container | Calls `initDetailsGroup` on all `<details>` children. Exclusive (accordion) by default |

Each element is marked with `data-disclosure-initialized` after setup, so calling `autoInit()` more than once (or importing the script twice) will not double-initialize anything.

## Setup

### With a bundler

```js
import '@disclosures/core/auto';
import '@disclosures/core/styles.css';
```

### With a CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@disclosures/core/dist/styles.css">
<script src="https://unpkg.com/@disclosures/core/dist/index.global.js"></script>
<script>
  Disclosures.autoInit();
</script>
```

The bundler import auto-runs on `DOMContentLoaded` (or immediately if the DOM is already ready). The CDN approach requires you to call `Disclosures.autoInit()` yourself after the script loads.

## Single animated disclosure

Add `data-animated` to any `<details>` element:

```html
<details class="disclosure disclosure--indicator-chevron" data-animated>
  <summary class="disclosure__summary">
    <span class="disclosure__indicator" aria-hidden="true"></span>
    <span class="disclosure__label">Expand me</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      <p>Animated content here.</p>
    </div>
  </div>
</details>
```

## Accordion group (exclusive)

Wrap multiple disclosures in a container with `data-disclosure-group`. By default the group is exclusive -- opening one item closes the others:

```html
<div data-disclosure-group>
  <details class="disclosure disclosure--faq disclosure--indicator-plus" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator" aria-hidden="true"></span>
      <span class="disclosure__label">Question one</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <p>Answer one.</p>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--faq disclosure--indicator-plus" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator" aria-hidden="true"></span>
      <span class="disclosure__label">Question two</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <p>Answer two.</p>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--faq disclosure--indicator-plus" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator" aria-hidden="true"></span>
      <span class="disclosure__label">Question three</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <p>Answer three.</p>
      </div>
    </div>
  </details>
</div>
```

## Non-exclusive group

Set the attribute value to `"false"` to allow multiple items to be open at the same time:

```html
<div data-disclosure-group="false">
  <!-- Multiple details can be open simultaneously -->
</div>
```

## Preventing double initialization

Every element that auto-init processes receives a `data-disclosure-initialized` attribute. If you dynamically add new disclosures to the page after the initial load, you can safely call `autoInit()` again -- it will skip elements that already have the attribute:

```js
import { autoInit } from '@disclosures/core';

// Add new elements to the DOM...
autoInit(); // Only initializes new, uninitialized elements
```
