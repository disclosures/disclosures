---
title: Framework Integration
sidebar:
  order: 5
---

`@disclosures/core` is framework-agnostic. It operates on plain DOM elements, so it works with any framework that gives you access to the underlying `<details>` element. The general pattern is the same everywhere:

1. Get a ref to the `<details>` DOM element.
2. Instantiate `AnimatedDetails` (and optionally a `DetailsGroup`) in the component's mount lifecycle.
3. Call `destroy()` in the component's unmount lifecycle.

## React

Use a `ref` and `useEffect` to manage the lifecycle:

```jsx
import { useRef, useEffect } from 'react';
import { AnimatedDetails } from '@disclosures/core';

function Disclosure({ title, children }) {
  const detailsRef = useRef(null);

  useEffect(() => {
    const instance = new AnimatedDetails(detailsRef.current);
    return () => instance.destroy();
  }, []);

  return (
    <details ref={detailsRef} className="disclosure">
      <summary className="disclosure__summary">
        <span className="disclosure__indicator" />
        <span className="disclosure__label">{title}</span>
      </summary>
      <div className="disclosure__content">
        <div className="disclosure__content-inner">{children}</div>
      </div>
    </details>
  );
}
```

For groups, wrap multiple disclosures in a container and instantiate `DetailsGroup` on the container ref:

```jsx
import { useRef, useEffect } from 'react';
import { AnimatedDetails, DetailsGroup } from '@disclosures/core';

function AccordionGroup({ items }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const details = containerRef.current.querySelectorAll('details');
    details.forEach((el) => new AnimatedDetails(el));

    const group = new DetailsGroup(containerRef.current);

    return () => {
      group.destroy();
      details.forEach((el) => AnimatedDetails.getInstance(el)?.destroy());
    };
  }, []);

  return (
    <div ref={containerRef}>
      {items.map((item, i) => (
        <details key={i} className="disclosure">
          <summary className="disclosure__summary">
            <span className="disclosure__indicator" />
            <span className="disclosure__label">{item.title}</span>
          </summary>
          <div className="disclosure__content">
            <div className="disclosure__content-inner">{item.content}</div>
          </div>
        </details>
      ))}
    </div>
  );
}
```

:::note
For React and shadcn/ui users, the `@disclosures/shadcn-disclosures` package (in `packages/shadcn-disclosures`) provides ready-made React components so you do not need to write the ref/effect wiring yourself.
:::

## Vue

Use a template ref with `onMounted` and `onUnmounted`:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { AnimatedDetails } from '@disclosures/core';

const detailsRef = ref(null);
let instance;

onMounted(() => {
  instance = new AnimatedDetails(detailsRef.value);
});

onUnmounted(() => {
  instance?.destroy();
});
</script>

<template>
  <details ref="detailsRef" class="disclosure">
    <summary class="disclosure__summary">
      <span class="disclosure__indicator" />
      <span class="disclosure__label"><slot name="title" /></span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <slot />
      </div>
    </div>
  </details>
</template>
```

## Svelte

Use `bind:this` with `onMount` and `onDestroy`:

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { AnimatedDetails } from '@disclosures/core';

  export let title;

  let detailsEl;
  let instance;

  onMount(() => {
    instance = new AnimatedDetails(detailsEl);
  });

  onDestroy(() => {
    instance?.destroy();
  });
</script>

<details bind:this={detailsEl} class="disclosure">
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">{title}</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      <slot />
    </div>
  </div>
</details>
```

## Other frameworks

The pattern applies to any component system:

| Framework | Get the element | Mount hook | Unmount hook |
|---|---|---|---|
| React | `useRef` | `useEffect` | `useEffect` return |
| Vue | `ref` + template ref | `onMounted` | `onUnmounted` |
| Svelte | `bind:this` | `onMount` | `onDestroy` |
| Solid | `ref` callback | `onMount` | `onCleanup` |
| Lit | `this.renderRoot.querySelector` | `firstUpdated` | `disconnectedCallback` |
| Vanilla JS | `document.querySelector` | Script execution / `DOMContentLoaded` | Manual cleanup |

The key requirement is that the DOM element exists before you pass it to `new AnimatedDetails()`. In frameworks with asynchronous rendering, make sure you instantiate in the post-render lifecycle hook, not during setup or construction.
