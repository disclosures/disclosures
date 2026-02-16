---
title: AnimatedDetails
sidebar:
  order: 1
---

`AnimatedDetails` wraps a native `<details>` element with smooth open/close animations using the Web Animations API.

## Constructor

```ts
new AnimatedDetails(el: HTMLDetailsElement, options?: AnimatedDetailsOptions)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| el | `HTMLDetailsElement` | The `<details>` element to animate |
| options | `AnimatedDetailsOptions` | Optional configuration (see below) |

## Options

`AnimatedDetailsOptions`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `300` | Animation duration in milliseconds |
| `easing` | `string` | `'cubic-bezier(0.4, 0, 0.2, 1)'` | CSS easing function |
| `contentSelector` | `string` | `'.disclosure__content'` | Selector for the content wrapper element |

### Example

```ts
import { AnimatedDetails } from '@disclosures/core';

const el = document.querySelector('details');
const instance = new AnimatedDetails(el, {
  duration: 400,
  easing: 'ease-in-out',
});
```

## Methods

### `open(): void`

Open the details element with animation.

```ts
instance.open();
```

### `close(): void`

Close the details element with animation.

```ts
instance.close();
```

### `toggle(): void`

Toggle the details element between open and closed states.

```ts
instance.toggle();
```

### `destroy(): void`

Remove all event listeners and deregister the instance from the instance registry. Call this when removing the element from the DOM to avoid memory leaks.

```ts
instance.destroy();
```

## Static Methods

### `AnimatedDetails.getInstance(el: HTMLDetailsElement): AnimatedDetails | undefined`

Retrieve the `AnimatedDetails` instance associated with a given element, if one exists.

```ts
const el = document.querySelector('details');
const instance = AnimatedDetails.getInstance(el);

if (instance) {
  instance.open();
}
```

## Instance Registry

On construction, each `AnimatedDetails` instance is stored in a `WeakMap` keyed by its DOM element. This registry is how other parts of the library discover whether a `<details>` element has animated behavior.

```ts
import { instanceRegistry } from '@disclosures/core';
// WeakMap<HTMLDetailsElement, AnimatedDetails>
```

- **Used internally by `DetailsGroup`** to provide animated accordion behavior. When a group needs to close a sibling, it checks the registry for an instance and calls `instance.close()` instead of toggling the DOM attribute directly.
- **Cleaned up automatically** when `destroy()` is called.
- **WeakMap** ensures garbage collection is not blocked if the DOM element is removed without calling `destroy()`.
