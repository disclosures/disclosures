---
title: DetailsGroup
sidebar:
  order: 2
---

`DetailsGroup` coordinates multiple `<details>` elements so they behave as an accordion or grouped disclosure set.

## Function: initDetailsGroup

```ts
initDetailsGroup(container: HTMLElement, options?: DetailsGroupOptions): () => void
```

A convenience function that creates a `DetailsGroup` and returns a cleanup function. Call the returned function to remove all listeners when the group is no longer needed.

### Example

```ts
import { initDetailsGroup } from '@disclosures/core';

const container = document.querySelector('.faq-list');
const cleanup = initDetailsGroup(container, { exclusive: true });

// Later, when removing the group:
cleanup();
```

## Options

`DetailsGroupOptions`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `exclusive` | `boolean` | `true` | Only one details element can be open at a time |
| `detailsSelector` | `string` | `'details'` | Selector for child details elements within the container |

## Class: DetailsGroup

```ts
new DetailsGroup(container: HTMLElement, options?: DetailsGroupOptions)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| container | `HTMLElement` | The parent element containing `<details>` elements |
| options | `DetailsGroupOptions` | Optional configuration (see above) |

### Methods

#### `openByIndex(index: number): void`

Open a specific details element by its index within the group. If the element has an `AnimatedDetails` instance registered in the `instanceRegistry`, the animated `open()` method is used. Otherwise the `open` attribute is set directly.

```ts
const group = new DetailsGroup(container);
group.openByIndex(0); // Open the first item
```

#### `closeAll(): void`

Close all details elements in the group. Uses animated `close()` on elements that have `AnimatedDetails` instances; falls back to removing the `open` attribute for non-animated elements.

```ts
group.closeAll();
```

#### `destroy(): void`

Remove all event listeners from the container. Call this when the group is removed from the DOM.

```ts
group.destroy();
```

## Animated Behavior

`DetailsGroup` is designed to work seamlessly with `AnimatedDetails`. When details elements within the group have `AnimatedDetails` instances (registered in the `instanceRegistry`), the group automatically uses `instance.open()` and `instance.close()` for smooth transitions.

If a details element does not have an `AnimatedDetails` instance, the group falls back to direct DOM manipulation (setting or removing the `open` attribute).

This means you can mix animated and non-animated details within the same group, and each will behave appropriately.

### Example: Animated Accordion

```ts
import { AnimatedDetails, initDetailsGroup } from '@disclosures/core';

const container = document.querySelector('.accordion');

// Create animated instances for each details element
container.querySelectorAll('details').forEach((el) => {
  new AnimatedDetails(el);
});

// Group them as an exclusive accordion
const cleanup = initDetailsGroup(container, { exclusive: true });
```
