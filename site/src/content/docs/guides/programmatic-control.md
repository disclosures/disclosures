---
title: Programmatic Control
sidebar:
  order: 4
---

Every disclosure element can be controlled from JavaScript. The library exposes two levels of API: `AnimatedDetails` for individual elements and `DetailsGroup` / `initDetailsGroup` for coordinated groups.

## AnimatedDetails

### Constructor

```js
import { AnimatedDetails } from '@disclosures/core';

const el = document.querySelector('details');
const instance = new AnimatedDetails(el, {
  duration: 300,                        // animation duration in ms
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // CSS easing function
  contentSelector: '.disclosure__content',  // selector for the content wrapper
});
```

All options are optional. The defaults shown above are used when an option is omitted.

The `<details>` element must contain a `<summary>` and an element matching `contentSelector`, otherwise the constructor throws an error.

### Instance methods

#### `open()`

Opens the disclosure with an animated height transition.

```js
instance.open();
```

#### `close()`

Closes the disclosure with an animated height transition.

```js
instance.close();
```

#### `toggle()`

Opens the disclosure if it is closed, or closes it if it is open.

```js
instance.toggle();
```

#### `destroy()`

Removes the click listener from the summary element, cancels any in-progress animation, and removes the instance from the registry.

```js
instance.destroy();
```

After calling `destroy()`, the `<details>` element reverts to default browser toggle behavior.

### Instance registry

Every `AnimatedDetails` constructor call registers the instance in a global `WeakMap` keyed by the DOM element. You can retrieve an existing instance without keeping your own reference:

```js
import { AnimatedDetails } from '@disclosures/core';

const el = document.querySelector('details');
new AnimatedDetails(el);

// Later, elsewhere in your code:
const instance = AnimatedDetails.getInstance(el);
if (instance) {
  instance.toggle();
}
```

The registry is also used internally by `DetailsGroup` to trigger animated transitions instead of toggling the `open` attribute directly.

### Reduced motion

`AnimatedDetails` respects the `prefers-reduced-motion: reduce` media query. When the user prefers reduced motion, the animation duration is set to `0` so the transition is instant while still following the same open/close code path.

## DetailsGroup

### Constructor

```js
import { DetailsGroup } from '@disclosures/core';

const container = document.querySelector('.accordion');
const group = new DetailsGroup(container, {
  exclusive: true,         // only one open at a time (default)
  detailsSelector: 'details', // selector for child details (default)
});
```

### Methods

#### `openByIndex(n)`

Opens the item at the given zero-based index. In exclusive mode, any currently open item closes first. If the element has an `AnimatedDetails` instance, the animated `open()` method is used.

```js
group.openByIndex(0); // open the first item
group.openByIndex(2); // open the third item (first closes automatically)
```

#### `closeAll()`

Closes every `<details>` element in the group. Animated instances close with a transition.

```js
group.closeAll();
```

#### `destroy()`

Removes all toggle event listeners that the group attached.

```js
group.destroy();
```

## initDetailsGroup (functional API)

`initDetailsGroup` is a lighter alternative to the class. It returns a cleanup function instead of an object with methods.

```js
import { initDetailsGroup } from '@disclosures/core';

const container = document.querySelector('.accordion');
const cleanup = initDetailsGroup(container, { exclusive: true });

// When you no longer need the group behavior:
cleanup();
```

Use this when you only need the exclusive-close behavior and do not need `openByIndex` or `closeAll`.

## Combining APIs

A typical setup creates animated instances first, then wraps them in a group:

```js
import { AnimatedDetails, DetailsGroup } from '@disclosures/core';

const container = document.querySelector('.faq');

// Animate each details element
container.querySelectorAll('details').forEach((el) => {
  new AnimatedDetails(el);
});

// Coordinate them as an exclusive group
const group = new DetailsGroup(container);

// Open the second item programmatically
group.openByIndex(1);

// Later, tear everything down
group.destroy();
container.querySelectorAll('details').forEach((el) => {
  AnimatedDetails.getInstance(el)?.destroy();
});
```
