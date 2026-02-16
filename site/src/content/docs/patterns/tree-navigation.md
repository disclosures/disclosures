---
title: Tree Navigation
sidebar:
  order: 4
---

A file-system tree or category browser can be built by nesting disclosure components. Each expandable node is a `<details>` element, and leaf nodes are plain elements styled to match.

## Basic file tree

```html
<div class="tree" role="tree">

  <details class="disclosure disclosure--indicator-chevron" data-animated role="treeitem">
    <summary class="disclosure__summary tree__node">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">src/</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner tree__children">

        <details class="disclosure disclosure--indicator-chevron" data-animated role="treeitem">
          <summary class="disclosure__summary tree__node">
            <span class="disclosure__indicator"></span>
            <span class="disclosure__label">components/</span>
          </summary>
          <div class="disclosure__content">
            <div class="disclosure__content-inner tree__children">
              <div class="tree__leaf" role="treeitem">Header.tsx</div>
              <div class="tree__leaf" role="treeitem">Footer.tsx</div>
            </div>
          </div>
        </details>

        <details class="disclosure disclosure--indicator-chevron" data-animated role="treeitem">
          <summary class="disclosure__summary tree__node">
            <span class="disclosure__indicator"></span>
            <span class="disclosure__label">utils/</span>
          </summary>
          <div class="disclosure__content">
            <div class="disclosure__content-inner tree__children">
              <div class="tree__leaf" role="treeitem">format.ts</div>
              <div class="tree__leaf" role="treeitem">validate.ts</div>
            </div>
          </div>
        </details>

        <div class="tree__leaf" role="treeitem">index.ts</div>

      </div>
    </div>
  </details>

  <details class="disclosure disclosure--indicator-chevron" data-animated role="treeitem">
    <summary class="disclosure__summary tree__node">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">public/</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner tree__children">
        <div class="tree__leaf" role="treeitem">favicon.svg</div>
        <div class="tree__leaf" role="treeitem">robots.txt</div>
      </div>
    </div>
  </details>

  <div class="tree__leaf" role="treeitem">package.json</div>
  <div class="tree__leaf" role="treeitem">tsconfig.json</div>

</div>
```

## Leaf nodes

Leaf nodes do not need to be `<details>` elements -- they have nothing to expand. Style them as simple `<div>` or `<span>` elements that line up with the labels of their sibling branch nodes:

```css
.tree__leaf {
  padding: 4px 0 4px 28px; /* 28px = indicator size + gap, to align with labels */
  cursor: default;
}
```

## Tree lines and icons

Add connector lines and folder/file icons with CSS pseudo-elements to give the tree a classic explorer look:

```css
.tree__children {
  position: relative;
  padding-left: 16px;
  margin-left: 10px;
  border-left: 1px solid #333;
}

/* Folder icon for branch nodes */
.tree__node .disclosure__label::before {
  content: "\1F4C1"; /* folder emoji, or use an SVG background */
  margin-right: 6px;
}

.disclosure[open] > .disclosure__summary .disclosure__label::before {
  content: "\1F4C2"; /* open folder */
}

/* File icon for leaf nodes */
.tree__leaf::before {
  content: "\1F4C4"; /* page emoji */
  margin-right: 6px;
}
```

Replace the emoji with SVG backgrounds or an icon font for a production-quality look.

## Depth-based visual differentiation

Deeply nested trees benefit from visual cues that communicate the current depth. Use a nesting counter or CSS custom properties to shift colors, font sizes, or indentation:

```css
.tree {
  counter-reset: depth;
}

.tree__children {
  counter-increment: depth;
}

/* Lighten the tree line color at deeper levels */
.tree__children .tree__children {
  border-left-color: #444;
}

.tree__children .tree__children .tree__children {
  border-left-color: #555;
}
```

:::note
Deeply nested trees work well with depth-based visual differentiation. Consider limiting the nesting depth in your UI or switching to a flat list with breadcrumb navigation for trees deeper than four or five levels.
:::

## Accessibility

- Use `role="tree"` on the root container and `role="treeitem"` on each node (both branches and leaves).
- The native `<details>`/`<summary>` elements provide keyboard expand/collapse behavior automatically.
- For additional keyboard navigation (arrow keys to move between siblings, Home/End to jump), add a small JavaScript handler on the tree container.
