---
title: CSS Tokens
sidebar:
  order: 4
---

`@disclosures/core` uses CSS custom properties (tokens) for theming. Override any token on a parent element or `:root` to customize the appearance without touching structural CSS.

## Token Reference

| Token | Default | Description |
|-------|---------|-------------|
| `--disclosure-duration` | `300ms` | Animation duration |
| `--disclosure-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Animation easing |
| `--disclosure-indicator-size` | `20px` | Indicator width/height |
| `--disclosure-indicator-color` | `#666` | Indicator color (closed) |
| `--disclosure-indicator-color-open` | `#00ff88` | Indicator color (open) |
| `--disclosure-padding-x` | `0` | Summary horizontal padding |
| `--disclosure-padding-y` | `8px` | Summary vertical padding |
| `--disclosure-content-padding` | `8px` | Content area padding |
| `--disclosure-indicator-gap` | `8px` | Gap between indicator and label |
| `--disclosure-panel-bg` | `#1a1a1a` | Panel variant background |
| `--disclosure-panel-bg-open` | `#161616` | Panel variant background (open) |
| `--disclosure-panel-border` | `#333` | Panel variant border color |
| `--disclosure-panel-padding` | `8px 16px` | Panel variant padding |
| `--disclosure-faq-border` | `#333` | FAQ variant border color |
| `--disclosure-faq-font-size` | `18px` | FAQ variant font size |
| `--disclosure-faq-content-padding` | `16px 0 0 24px` | FAQ variant content padding |

## Stylesheet Imports

Two CSS files are available depending on your needs:

### Full Styles

Includes tokens, structural CSS, indicator variants, and style variants:

```css
@import '@disclosures/core/styles.css';
```

### Tokens Only

Provides only the custom property definitions. Use this when you want to bring your own structural CSS but keep the token-based theming:

```css
@import '@disclosures/core/tokens.css';
```

## Overriding Tokens

Override tokens at any level of the DOM tree. Tokens cascade normally, so you can scope overrides to specific containers.

### Global Override

```css
:root {
  --disclosure-duration: 200ms;
  --disclosure-indicator-color: #999;
  --disclosure-indicator-color-open: #3b82f6;
  --disclosure-panel-bg: #0d0d0d;
  --disclosure-panel-border: #444;
}
```

### Scoped Override

```css
.my-sidebar .disclosure {
  --disclosure-duration: 150ms;
  --disclosure-indicator-size: 16px;
  --disclosure-content-padding: 4px;
}

.my-faq {
  --disclosure-faq-font-size: 22px;
  --disclosure-faq-border: #555;
  --disclosure-faq-content-padding: 20px 0 0 32px;
}
```

### Per-Element Override (Inline)

```html
<details
  class="disclosure disclosure--panel"
  style="--disclosure-panel-bg: #1e293b; --disclosure-panel-border: #475569;"
>
  <!-- ... -->
</details>
```
