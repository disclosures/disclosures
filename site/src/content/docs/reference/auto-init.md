---
title: Auto-Init
sidebar:
  order: 3
---

The auto-init module provides a zero-JavaScript-authoring path for setting up animated disclosures and accordion groups using data attributes alone.

## Function: autoInit

```ts
autoInit(): void
```

Scans the DOM and initializes disclosure components based on data attributes:

- `details[data-animated]` becomes an `AnimatedDetails` instance
- `[data-disclosure-group]` becomes an `initDetailsGroup` call (exclusive by default, unless the attribute value is `"false"`)

Each initialized element receives a `data-disclosure-initialized` attribute to prevent double-initialization on subsequent calls.

## Data Attributes

| Attribute | Element | Description |
|-----------|---------|-------------|
| `data-animated` | `<details>` | Enables animated open/close via `AnimatedDetails` |
| `data-disclosure-group` | container | Groups child `<details>` elements as an exclusive accordion |
| `data-disclosure-group="false"` | container | Groups child `<details>` without exclusive behavior (multiple can be open) |
| `data-disclosure-initialized` | any | Set automatically after initialization; prevents double-init |

## Usage

### Auto-Import (Recommended)

Import the auto module to run `autoInit()` on `DOMContentLoaded` with no additional code:

```js
import '@disclosures/core/auto';
```

This is ideal for script tags or entry points where you want everything to "just work."

### Manual Call

If you need to control when initialization happens (for example, after dynamically inserting content), import and call `autoInit` directly:

```js
import { autoInit } from '@disclosures/core';

// After adding new disclosure elements to the DOM:
autoInit();
```

Because `autoInit` checks for `data-disclosure-initialized`, calling it multiple times is safe. Only new, uninitialized elements will be set up.

## Example: HTML-Only Setup

```html
<link rel="stylesheet" href="@disclosures/core/styles.css" />
<script type="module">
  import '@disclosures/core/auto';
</script>

<!-- Animated details -->
<details class="disclosure disclosure--indicator-chevron" data-animated>
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">Click to expand</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      Content goes here.
    </div>
  </div>
</details>

<!-- Exclusive accordion group -->
<div data-disclosure-group>
  <details class="disclosure" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__label">Section 1</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">First section content.</div>
    </div>
  </details>
  <details class="disclosure" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__label">Section 2</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">Second section content.</div>
    </div>
  </details>
</div>
```
