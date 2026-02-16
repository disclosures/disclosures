---
title: Accessibility
sidebar:
  order: 3
---

`@disclosures/core` inherits its accessibility from the native `<details>` and `<summary>` elements it is built on. The browser provides keyboard support, ARIA semantics, and screen reader compatibility out of the box. The library preserves all of this while adding animations.

## Keyboard navigation

Native `<details>` elements are keyboard-accessible by default:

- **Tab** moves focus between summary elements (and other focusable elements on the page).
- **Enter** or **Space** toggles the details open or closed when its summary has focus.

Because `AnimatedDetails` intercepts the summary's click event and prevents the default toggle, it re-implements the open/close behavior through its own `open()` and `close()` methods. Keyboard activation fires the same click event as a mouse click, so keyboard users get the same animated transitions.

## Focus styles

The included CSS provides visible focus indicators using `:focus-visible`:

```css
.disclosure__summary:focus-visible {
  outline: 2px solid var(--disclosure-indicator-color-open);
  outline-offset: 2px;
}
```

The `:focus-visible` pseudo-class ensures the outline only appears during keyboard navigation, not on mouse clicks. The outline color uses the same accent color as the open-state indicator for visual consistency.

## Screen readers

Native `<details>` and `<summary>` elements announce their state to screen readers automatically. When a screen reader encounters a summary, it communicates that the element is expandable and whether it is currently expanded or collapsed. No additional ARIA attributes are needed.

The indicator elements (chevron, plus/minus, arrow) use `aria-hidden="true"` in the recommended markup to prevent decorative content from being announced. Screen readers skip these indicators and rely on the native expanded/collapsed semantics instead.

## Reduced motion

The library respects the `prefers-reduced-motion: reduce` media query at two levels:

**In JavaScript**, `AnimatedDetails` checks `window.matchMedia('(prefers-reduced-motion: reduce)')` before every animation. When the user prefers reduced motion, the animation duration is set to `0`, making the transition instantaneous while still going through the same open/close logic.

**In CSS**, the indicator transitions (rotation, color changes) are disabled entirely:

```css
@media (prefers-reduced-motion: reduce) {
  .disclosure__indicator {
    transition: none;
  }
}
```

This means users who have enabled reduced motion in their operating system preferences see no animated movement at all -- details sections toggle immediately and indicators change state without transition.

## What the browser gives you for free

By building on `<details>` and `<summary>`, this library gets the following without any extra code:

- The summary is focusable and activatable via keyboard.
- Screen readers announce the element as a disclosure widget with expanded/collapsed state.
- The `open` attribute reflects the true state in the DOM, which assistive technologies can query.
- Browser find-in-page (Ctrl+F / Cmd+F) can locate text inside closed details elements in supporting browsers.

## Tips for accessible usage

**Use descriptive summary text.** The summary is the only thing screen reader users encounter before deciding to expand. Make sure it clearly communicates what the hidden content contains.

**Do not hide critical content.** If information is essential for all users to see, do not place it inside a collapsed details element. Progressive disclosure works best for supplementary content that some users need and others do not.

**Test with keyboard navigation.** Tab through your disclosures to verify that focus order is logical, that Enter/Space toggles work, and that focus is not trapped inside expanded content.

**Do not override native semantics.** Avoid adding `role`, `aria-expanded`, or other ARIA attributes to `<details>` and `<summary>` elements. The browser already provides the correct semantics. Adding redundant ARIA can confuse assistive technologies or cause double announcements.
