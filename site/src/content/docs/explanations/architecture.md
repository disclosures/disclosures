---
title: Architecture
sidebar:
  order: 2
---

`@disclosures/core` works by enhancing native `<details>` and `<summary>` elements, not by replacing them with custom components. The browser owns the semantics. The library adds smooth animations and group coordination on top.

## Native foundation

Every disclosure in this library is a real `<details>` element with a real `<summary>`. This means the browser provides accessibility, keyboard handling, and the open/close toggle behavior for free. The library intercepts and enhances that behavior rather than reimplementing it.

## AnimatedDetails

`AnimatedDetails` is the core class. It attaches to a `<details>` element and replaces the browser's instant show/hide toggle with a smooth height transition powered by the Web Animations API (WAAPI).

### How it works

When the user clicks a summary, `AnimatedDetails` intercepts the click and prevents the browser's default toggle. Then it runs one of two animation flows depending on the current state.

### The expand flow

1. **Capture current height.** Record the element's `offsetHeight` (just the summary, since the element is closed).
2. **Set `open = true`.** This makes the content visible in the DOM so we can measure the target height.
3. **On the next animation frame, animate.** Use WAAPI to animate the element's height from the captured start height to the full expanded height (summary height + content height).
4. **Clean up.** When the animation finishes, remove inline `height` and `overflow` styles so the element returns to normal flow.

### The shrink flow

1. **Capture current height.** Record the element's `offsetHeight` (summary + content, since the element is open).
2. **Animate.** Use WAAPI to animate from the current height down to just the summary height.
3. **Set `open = false`.** After the animation completes, close the element so screen readers and the DOM reflect the collapsed state.
4. **Clean up.** Remove inline styles.

The key difference between expand and shrink is _when_ the `open` attribute changes. On expand, `open` is set immediately (before the animation) so the content can be measured. On shrink, `open` is set at the end (after the animation) so the content stays visible while it animates out.

### Animation cancellation

If a user clicks while an animation is in progress, the current animation is cancelled and the new one begins from wherever the height currently is. This makes rapid toggling feel responsive rather than laggy.

## The instance registry

The library maintains a `WeakMap<HTMLDetailsElement, AnimatedDetails>` called `instanceRegistry`. When an `AnimatedDetails` is constructed, it registers itself. When it is destroyed, it removes itself.

This registry exists so that `DetailsGroup` can coordinate sibling elements properly. When one details element opens and the group needs to close the others, it looks up each sibling in the registry:

- **If an `AnimatedDetails` instance exists**, call its `close()` method. The sibling animates shut smoothly.
- **If no instance exists** (a plain, non-animated `<details>`), fall back to setting `open = false` directly.

Without the registry, the group would have to set `open = false` directly on all siblings, causing them to snap shut instantly even if they have animation support.

Using a `WeakMap` means the registry does not prevent garbage collection. When a `<details>` element is removed from the DOM and has no other references, both the element and its `AnimatedDetails` instance can be collected normally.

## DetailsGroup

`DetailsGroup` turns a container of `<details>` elements into an accordion. It listens for native `toggle` events on each child. When a details element opens, the group iterates through all other details elements in the container and closes any that are open.

The closing logic uses the instance registry: if a sibling has an `AnimatedDetails` instance, it calls `close()` for an animated transition. Otherwise it sets `open = false` directly.

Cleanup is handled through `AbortController`. Each toggle listener is registered with a signal, and the group's `destroy()` method aborts all controllers at once.

## Auto-init

The `autoInit` function scans the DOM for elements with specific data attributes and instantiates the appropriate classes:

- `details[data-animated]` elements become `AnimatedDetails` instances.
- `[data-disclosure-group]` containers are initialized with `initDetailsGroup`. The attribute value controls exclusive mode: omitting the value or setting it to anything other than `"false"` enables exclusive (accordion) behavior.

Each initialized element is marked with a `data-disclosure-initialized` attribute to prevent double initialization. This makes it safe to call `autoInit` multiple times, for example after dynamically adding new disclosure elements to the page.

Auto-init runs automatically on `DOMContentLoaded` when the module is imported. In SSR environments where `document` is not available, the auto-init is skipped entirely.

## No framework dependencies

The entire library operates on native DOM elements and browser APIs. There are no framework imports, no virtual DOM, no reactive state systems. This means it works in any environment that has a DOM: vanilla HTML pages, server-rendered applications, or as a foundation layer beneath framework-specific wrappers.
