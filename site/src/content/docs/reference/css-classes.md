---
title: CSS Classes
sidebar:
  order: 5
---

`@disclosures/core` uses a BEM-based class naming convention. All classes are prefixed with `disclosure` to avoid collisions with other stylesheets.

## Base Classes

| Class | Description |
|-------|-------------|
| `.disclosure` | Root `<details>` element |
| `.disclosure__summary` | Summary/trigger element |
| `.disclosure__indicator` | Visual indicator (chevron, plus, etc.) |
| `.disclosure__label` | Text label within summary |
| `.disclosure__content` | Content wrapper (required for animation) |
| `.disclosure__content-inner` | Inner content container (padding applied here) |
| `.disclosure-group` | Container for grouped details elements |

### Base Structure

```html
<details class="disclosure">
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">Label text</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      Content goes here.
    </div>
  </div>
</details>
```

## Indicator Variants

Modifier classes on the root `.disclosure` element control which indicator style is rendered.

| Class | Description |
|-------|-------------|
| `.disclosure--indicator-chevron` | Rotating chevron (&#9656; rotates 90 degrees when open) |
| `.disclosure--indicator-plus` | Plus/minus toggle (+ when closed, - when open) |
| `.disclosure--indicator-arrow` | Rotating arrow (&#8595; rotates 180 degrees when open) |
| `.disclosure--indicator-none` | Hidden indicator (no visual toggle) |

### Example

```html
<details class="disclosure disclosure--indicator-plus">
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">Expandable item</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">...</div>
  </div>
</details>
```

## Style Variants

| Class | Description |
|-------|-------------|
| `.disclosure--default` | Minimal styling with no background or border |
| `.disclosure--panel` | Boxed sections with background and border |
| `.disclosure--faq` | Question-list style with bottom borders |

### Panel Variant

```html
<details class="disclosure disclosure--panel disclosure--indicator-chevron">
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">Panel heading</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      Panel content with background and border styling.
    </div>
  </div>
</details>
```

### FAQ Variant

```html
<div class="disclosure-group">
  <details class="disclosure disclosure--faq disclosure--indicator-plus">
    <summary class="disclosure__summary">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">What is this library?</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        A framework-agnostic progressive disclosure library.
      </div>
    </div>
  </details>
</div>
```

## State

Disclosure state is driven by the native `<details>` element's `[open]` attribute. No JavaScript class toggling is needed.

- **`[open]` attribute** on `<details>` controls the open/closed state. This is the standard HTML behavior.
- **`.disclosure__indicator`** transitions both `color` and `transform` when the parent `<details>` has the `[open]` attribute. The specific transition depends on the indicator variant.
- **`focus-visible` outline** is applied to `.disclosure__summary` for keyboard accessibility, ensuring a visible focus ring when navigating with the keyboard.

### State Selectors in Custom CSS

```css
/* Target open disclosures */
.disclosure[open] {
  /* styles for open state */
}

/* Target the indicator when open */
.disclosure[open] .disclosure__indicator {
  /* indicator open styles are handled by the library,
     but you can override here */
}

/* Keyboard focus ring */
.disclosure__summary:focus-visible {
  outline: 2px solid var(--disclosure-indicator-color-open);
  outline-offset: 2px;
}
```
