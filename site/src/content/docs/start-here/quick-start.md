---
title: Quick Start
sidebar:
  order: 2
---

This guide walks through a minimal working example. By the end you will have a single animated disclosure that opens and closes with a smooth height transition.

## HTML structure

Every disclosure follows the same BEM markup pattern built on the native `<details>` element:

```html
<details class="disclosure disclosure--indicator-chevron">
  <summary class="disclosure__summary">
    <span class="disclosure__indicator" aria-hidden="true"></span>
    <span class="disclosure__label">Click to expand</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      <p>This content animates in and out.</p>
    </div>
  </div>
</details>
```

### Class reference

| Class | Element | Purpose |
|-------|---------|---------|
| `disclosure` | `<details>` | Root element |
| `disclosure__summary` | `<summary>` | Clickable header row |
| `disclosure__indicator` | `<span>` | Visual open/close icon (add `aria-hidden="true"`) |
| `disclosure__label` | `<span>` | Label text inside the summary |
| `disclosure__content` | `<div>` | Outer wrapper -- **required for animation** |
| `disclosure__content-inner` | `<div>` | Inner wrapper that holds your content |

The `disclosure__content` wrapper is required because the animation measures its height to compute the transition. Without it, `AnimatedDetails` will throw an error at initialization.

## JavaScript initialization

Import the class and pass it a `<details>` element:

```js
import { AnimatedDetails } from '@disclosures/core';

const el = document.querySelector('details');
new AnimatedDetails(el);
```

That is all that is needed. Clicks on the summary now animate the content height open and closed.

## Full working example

Copy and paste this into an HTML file to try it locally:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Disclosures Quick Start</title>
  <link rel="stylesheet" href="https://unpkg.com/@disclosures/core/dist/styles.css">
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 600px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  </style>
</head>
<body>

  <details class="disclosure disclosure--indicator-chevron">
    <summary class="disclosure__summary">
      <span class="disclosure__indicator" aria-hidden="true"></span>
      <span class="disclosure__label">What is Disclosures?</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <p>A lightweight library for animated disclosure components
        with smooth height transitions.</p>
      </div>
    </div>
  </details>

  <script type="module">
    import { AnimatedDetails } from 'https://unpkg.com/@disclosures/core/dist/index.js';

    document.querySelectorAll('details').forEach((el) => {
      new AnimatedDetails(el);
    });
  </script>

</body>
</html>
```

## Next steps

- Use [Auto-Initialization](/start-here/auto-init/) to skip writing any JavaScript
- Explore indicator variants (`disclosure--indicator-chevron`, `disclosure--indicator-plus`, `disclosure--indicator-arrow`) and style variants (`disclosure--panel`, `disclosure--faq`) provided in `styles.css`
