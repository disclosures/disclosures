---
title: Installation
sidebar:
  order: 1
---

## Package manager

Install `@disclosures/core` with the package manager of your choice:

```bash
# npm
npm install @disclosures/core

# pnpm
pnpm add @disclosures/core

# yarn
yarn add @disclosures/core
```

## CDN

Load the library directly from unpkg. No build step required.

```html
<!-- Styles -->
<link rel="stylesheet" href="https://unpkg.com/@disclosures/core/dist/styles.css">

<!-- Library (exposes the global `Disclosures` object) -->
<script src="https://unpkg.com/@disclosures/core/dist/index.global.js"></script>
```

After loading the script, the `Disclosures` global is available:

```js
const el = document.querySelector('details');
new Disclosures.AnimatedDetails(el);
```

## Import via bundler

If you use a bundler (Vite, webpack, esbuild, etc.), import the module and the stylesheet:

```js
import { AnimatedDetails } from '@disclosures/core';
import '@disclosures/core/styles.css';
```

## Auto-initialization

For a zero-JS-authoring setup, import the auto-init entry point instead. It scans the DOM for `data-animated` attributes and initializes everything automatically:

```js
import '@disclosures/core/auto';
import '@disclosures/core/styles.css';
```

See [Auto-Initialization](/start-here/auto-init/) for full details.

## Choosing a stylesheet

The package ships two CSS files:

| File | What it includes |
|------|-----------------|
| `styles.css` | Design tokens, base component styles, indicator variants, style variants (panel, FAQ), and accessibility rules |
| `tokens.css` | Only the CSS custom property definitions (design tokens) |

Import **`styles.css`** for the full out-of-the-box experience. Import **`tokens.css`** if you want to bring your own styles but still use the library's custom properties as a starting point.

```js
// Full styles (recommended to start)
import '@disclosures/core/styles.css';

// Tokens only (bring your own component styles)
import '@disclosures/core/tokens.css';
```
