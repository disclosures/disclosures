---
title: Accordion Groups
sidebar:
  order: 1
---

Accordion groups let you coordinate multiple disclosure elements so they behave as a unit. The most common pattern is **exclusive mode**, where opening one item automatically closes any other open item in the group.

## Exclusive mode (default)

By default, `initDetailsGroup` and `DetailsGroup` operate in exclusive mode. Only one `<details>` element inside the container can be open at a time.

### JavaScript setup

Use the functional API:

```js
import { initDetailsGroup } from '@disclosures/core';

const container = document.querySelector('.faq-list');
const cleanup = initDetailsGroup(container, { exclusive: true });

// Later, when you no longer need the group:
cleanup();
```

Or use the class-based API for more control:

```js
import { DetailsGroup } from '@disclosures/core';

const container = document.querySelector('.faq-list');
const group = new DetailsGroup(container);
```

### Data attribute setup

If you use the auto-init script (CDN or `autoInit()`), add `data-disclosure-group` to a container element. Exclusive mode is the default:

```html
<div data-disclosure-group>
  <details data-animated>
    <summary>Item one</summary>
    <div class="disclosure__content">First answer.</div>
  </details>
  <details data-animated>
    <summary>Item two</summary>
    <div class="disclosure__content">Second answer.</div>
  </details>
  <details data-animated>
    <summary>Item three</summary>
    <div class="disclosure__content">Third answer.</div>
  </details>
</div>
```

## Non-exclusive mode

Set `exclusive: false` to allow multiple items to be open simultaneously. This is useful when you want grouped styling but independent open/close behavior.

### JavaScript

```js
initDetailsGroup(container, { exclusive: false });
```

### Data attribute

Set the attribute value to `"false"`:

```html
<div data-disclosure-group="false">
  <!-- details elements here -->
</div>
```

When `exclusive` is `false`, the group does not attach any toggle listeners. Items open and close independently.

## DetailsGroup class methods

The `DetailsGroup` class provides imperative control over the group:

```js
const group = new DetailsGroup(container);

// Open the second item (zero-indexed)
group.openByIndex(1);

// Close every item in the group
group.closeAll();

// Remove all event listeners and tear down the group
group.destroy();
```

| Method | Description |
|---|---|
| `openByIndex(n)` | Opens the item at index `n`. In exclusive mode, any other open item closes automatically. |
| `closeAll()` | Closes every `<details>` in the group. |
| `destroy()` | Removes all toggle listeners the group attached. |

## Animated groups

If the `<details>` elements inside a group also have `AnimatedDetails` instances (created manually or via `data-animated`), the group will use the instance registry to trigger animated open/close transitions instead of toggling the `open` attribute directly. You do not need any extra configuration for this -- it happens automatically through the instance registry.

```js
import { AnimatedDetails, DetailsGroup } from '@disclosures/core';

const container = document.querySelector('.accordion');

// First, create animated instances for each details element
container.querySelectorAll('details').forEach((el) => {
  new AnimatedDetails(el);
});

// Then create the group -- it will detect existing instances
const group = new DetailsGroup(container);
```

When `group.openByIndex(n)` or `group.closeAll()` is called, the group checks the instance registry for each element. If an `AnimatedDetails` instance exists, it calls `instance.open()` or `instance.close()` so the transition animates smoothly. If no instance exists, it falls back to setting the `open` property directly.
