---
title: Nested Disclosures
sidebar:
  order: 2
---

Disclosures can be nested inside other disclosures to create multi-level hierarchies. Each level operates independently with its own `AnimatedDetails` instance, so opening or closing a parent does not interfere with the state of its children.

## Basic nested structure

```html
<!-- Level 1 -->
<details data-animated class="disclosure disclosure--panel">
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">Getting started</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">

      <!-- Level 2 -->
      <details data-animated class="disclosure disclosure--default">
        <summary class="disclosure__summary">
          <span class="disclosure__indicator"></span>
          <span class="disclosure__label">Installation</span>
        </summary>
        <div class="disclosure__content">
          <div class="disclosure__content-inner">
            <p>Install with npm or your preferred package manager.</p>

            <!-- Level 3 -->
            <details data-animated class="disclosure disclosure--default">
              <summary class="disclosure__summary">
                <span class="disclosure__indicator"></span>
                <span class="disclosure__label">Troubleshooting</span>
              </summary>
              <div class="disclosure__content">
                <div class="disclosure__content-inner">
                  <p>If you encounter issues, check the FAQ.</p>
                </div>
              </div>
            </details>

          </div>
        </div>
      </details>

    </div>
  </div>
</details>
```

Each `<details data-animated>` element gets its own `AnimatedDetails` instance through auto-init. The instances do not know about each other -- they animate their own height independently.

## How nesting works

When a parent disclosure is closed, the browser hides the entire subtree. Child disclosures retain their open/closed state in the DOM. When the parent is reopened, children reappear in whatever state they were in before.

Because `AnimatedDetails` animates height based on the total content height (summary + content), the parent animation automatically accounts for the current expanded size of any open children.

## Visual depth differentiation

Use CSS to make nesting levels visually distinct. Common approaches include progressively lighter backgrounds, increased indentation, or smaller typography at deeper levels.

```css
/* Level 1: full panel */
.disclosure--panel {
  background: var(--disclosure-panel-bg);
  border: 1px solid var(--disclosure-panel-border);
  padding: var(--disclosure-panel-padding);
}

/* Level 2: indented, no border */
.disclosure--panel .disclosure--default {
  margin-left: 16px;
  padding-left: 8px;
  border-left: 2px solid var(--disclosure-panel-border);
}

/* Level 3: further indented, lighter text */
.disclosure--default .disclosure--default {
  margin-left: 16px;
  padding-left: 8px;
  border-left: 2px solid var(--disclosure-panel-border);
  opacity: 0.85;
}
```

## JavaScript initialization

If you are using `autoInit()` or the CDN auto-init script, nested disclosures with `data-animated` are initialized automatically. No special configuration is needed.

For manual initialization, instantiate each `<details>` element individually:

```js
import { AnimatedDetails } from '@disclosures/core';

document.querySelectorAll('details').forEach((el) => {
  new AnimatedDetails(el);
});
```

The order of initialization does not matter. Each instance only manages its own element.

## Tips

- **Keep nesting shallow.** Three levels is a practical maximum. Deeper nesting makes content hard to discover and navigate.
- **Use clear visual hierarchy.** Without visual cues, users cannot tell which level they are looking at. Indentation, borders, or background changes all work well.
- **Combine with groups sparingly.** A `DetailsGroup` with `exclusive: true` only coordinates its direct children. If you place a group inside a nested disclosure, it governs the items at that level without affecting parent or grandparent disclosures.
- **Test keyboard navigation.** Nested disclosures produce a deeper tab order. Make sure the flow feels logical for keyboard and screen reader users.
