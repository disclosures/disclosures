---
title: FAQ
sidebar:
  order: 1
---

A frequently asked questions section is one of the most common use cases for disclosure components. The `disclosure--faq` variant provides ready-made styling for question-and-answer lists, and combining it with the `disclosure--indicator-plus` indicator gives users a familiar plus/minus toggle.

## Basic FAQ item

Each FAQ item is a `<details>` element with the `disclosure` base class, the `disclosure--faq` variant, and a `disclosure--indicator-*` modifier for the toggle icon.

```html
<details class="disclosure disclosure--faq disclosure--indicator-plus" data-animated>
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">What is @disclosures/core?</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      <p>A framework-agnostic library for animated, accessible disclosure components built on native &lt;details&gt; and &lt;summary&gt; elements.</p>
    </div>
  </div>
</details>
```

Adding `data-animated` opts the element into smooth height transitions via the auto-init script. Without it, the browser's default instant open/close behavior applies.

## Accordion mode

In most FAQs only one answer should be visible at a time. Wrap the items in a container with `data-disclosure-group` to create an exclusive accordion -- opening one item automatically closes the others.

Set `data-disclosure-group="false"` if you want a non-exclusive group where multiple answers can remain open simultaneously.

```html
<div class="disclosure-group" data-disclosure-group>

  <details class="disclosure disclosure--faq disclosure--indicator-plus" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">What is @disclosures/core?</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <p>A zero-dependency library for animated disclosure elements. It works with vanilla HTML, React, Vue, Svelte, or any framework.</p>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--faq disclosure--indicator-plus" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">Do I need a framework to use it?</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <p>No. The core package is pure HTML, CSS, and JavaScript. Framework wrappers are optional additions.</p>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--faq disclosure--indicator-plus" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">Is it accessible?</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <p>Yes. It builds on native &lt;details&gt;/&lt;summary&gt; semantics, supports keyboard navigation, and respects the <code>prefers-reduced-motion</code> media query.</p>
      </div>
    </div>
  </details>

</div>
```

### Programmatic accordion control

If you need finer control, use the JavaScript API instead of (or alongside) the `data-disclosure-group` attribute:

```js
import { initDetailsGroup } from '@disclosures/core';

const faqContainer = document.querySelector('.faq-group');
const cleanup = initDetailsGroup(faqContainer, { exclusive: true });

// Later, tear down listeners:
// cleanup();
```

Or use the `DetailsGroup` class for methods like `openByIndex` and `closeAll`:

```js
import { DetailsGroup } from '@disclosures/core';

const group = new DetailsGroup(document.querySelector('.faq-group'));
group.openByIndex(0); // open the first question
```

## CSS tokens

The FAQ variant exposes three custom properties you can override to match your design system:

| Token | Default | Description |
|---|---|---|
| `--disclosure-faq-border` | `#333` | Color of the horizontal rule between items |
| `--disclosure-faq-font-size` | `18px` | Font size of the question text |
| `--disclosure-faq-content-padding` | `16px 0 0 24px` | Padding around the answer content |

Override them on the container or at `:root` scope:

```css
.my-faq {
  --disclosure-faq-border: #e5e7eb;
  --disclosure-faq-font-size: 1.125rem;
  --disclosure-faq-content-padding: 12px 0 0 20px;
}
```

## Indicator choice

The example above uses `disclosure--indicator-plus` for the classic +/- toggle. You can swap it for any indicator variant:

- `disclosure--indicator-chevron` -- right-pointing triangle that rotates on open
- `disclosure--indicator-arrow` -- down arrow that flips on open
- `disclosure--indicator-none` -- no indicator at all
