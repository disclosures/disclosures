---
title: Theming
sidebar:
  order: 3
---

Disclosures uses CSS custom properties (tokens) for all visual values. Override these tokens to theme disclosures without writing new CSS rules.

## CSS token reference

All tokens are defined on `:root` and can be overridden at any scope.

### Animation

| Token | Default | Description |
|---|---|---|
| `--disclosure-duration` | `300ms` | Transition duration for indicator rotation and color changes |
| `--disclosure-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Easing curve for transitions |

### Indicator

| Token | Default | Description |
|---|---|---|
| `--disclosure-indicator-size` | `20px` | Width and height of the indicator area |
| `--disclosure-indicator-color` | `#666` | Indicator color when closed |
| `--disclosure-indicator-color-open` | `#00ff88` | Indicator color when open |

### Spacing

| Token | Default | Description |
|---|---|---|
| `--disclosure-padding-x` | `0` | Horizontal padding on the summary |
| `--disclosure-padding-y` | `8px` | Vertical padding on the summary |
| `--disclosure-content-padding` | `8px` | Top and bottom padding on the content inner area |
| `--disclosure-indicator-gap` | `8px` | Gap between the indicator and the label |

### Panel variant

| Token | Default | Description |
|---|---|---|
| `--disclosure-panel-bg` | `#1a1a1a` | Background color when closed |
| `--disclosure-panel-bg-open` | `#161616` | Background color when open |
| `--disclosure-panel-border` | `#333` | Border color |
| `--disclosure-panel-padding` | `8px 16px` | Inner padding |

### FAQ variant

| Token | Default | Description |
|---|---|---|
| `--disclosure-faq-border` | `#333` | Horizontal rule color between items |
| `--disclosure-faq-font-size` | `18px` | Summary font size |
| `--disclosure-faq-content-padding` | `16px 0 0 24px` | Content area padding |

## Dark theme example

The default tokens ship with dark-friendly values. If your site already uses a dark background, the defaults work out of the box. To fine-tune:

```css
:root {
  --disclosure-indicator-color: #888;
  --disclosure-indicator-color-open: #4ade80;
  --disclosure-panel-bg: #0f0f0f;
  --disclosure-panel-bg-open: #0a0a0a;
  --disclosure-panel-border: #2a2a2a;
  --disclosure-faq-border: #2a2a2a;
}
```

## Light theme example

Override the tokens to match a light color scheme:

```css
:root {
  --disclosure-indicator-color: #999;
  --disclosure-indicator-color-open: #16a34a;
  --disclosure-panel-bg: #f5f5f5;
  --disclosure-panel-bg-open: #ffffff;
  --disclosure-panel-border: #ddd;
  --disclosure-faq-border: #ddd;
}
```

## Scoped overrides

Tokens can be overridden on any ancestor element, not just `:root`. This lets you theme different sections of a page independently:

```css
.dark-section {
  --disclosure-panel-bg: #111;
  --disclosure-panel-border: #444;
}

.light-section {
  --disclosure-panel-bg: #fafafa;
  --disclosure-panel-border: #ccc;
}
```

## Choosing a stylesheet

The package ships two CSS files:

| File | What it includes | When to use |
|---|---|---|
| `styles.css` | Tokens + base styles + variants + indicator styles + accessibility | You want the full out-of-the-box experience. Import this and override tokens as needed. |
| `tokens.css` | Only the `:root` custom property definitions | You want to write your own CSS from scratch but still use the token system for consistency. |

### Import examples

```js
// Full styles (recommended starting point)
import '@disclosures/core/styles.css';

// Tokens only (bring your own CSS)
import '@disclosures/core/tokens.css';
```

Or via CDN:

```html
<!-- Full styles -->
<link rel="stylesheet" href="https://unpkg.com/@disclosures/core/dist/styles.css">

<!-- Tokens only -->
<link rel="stylesheet" href="https://unpkg.com/@disclosures/core/dist/tokens.css">
```
