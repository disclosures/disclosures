---
title: Data Table
sidebar:
  order: 3
---

Expandable rows in a data table let users scan a compact list of records and drill into details on demand. Each row is a disclosure component whose summary is styled as a table row using CSS Grid, and whose content area reveals additional information when expanded.

## Structure

The outer container acts as the table. Each `<details>` element represents a row. The `disclosure__summary` uses CSS Grid to align its children into columns, and the `disclosure__content` holds the expanded detail view.

```html
<div class="data-table" role="table" aria-label="Recent orders">

  <!-- Header row -->
  <div class="data-table__header" role="row">
    <span role="columnheader">Order</span>
    <span role="columnheader">Date</span>
    <span role="columnheader">Status</span>
    <span role="columnheader">Total</span>
  </div>

  <!-- Expandable rows -->
  <details class="disclosure disclosure--indicator-chevron" data-animated role="row">
    <summary class="disclosure__summary data-table__row">
      <span class="disclosure__indicator"></span>
      <span>#1042</span>
      <span>2025-04-12</span>
      <span class="badge badge--shipped">Shipped</span>
      <span>$84.00</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner data-table__detail">
        <p><strong>Items:</strong> Widget A (x2), Gadget B (x1)</p>
        <p><strong>Tracking:</strong> 1Z999AA10123456784</p>
        <p><strong>Shipping address:</strong> 123 Main St, Springfield</p>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--indicator-chevron" data-animated role="row">
    <summary class="disclosure__summary data-table__row">
      <span class="disclosure__indicator"></span>
      <span>#1041</span>
      <span>2025-04-10</span>
      <span class="badge badge--processing">Processing</span>
      <span>$29.50</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner data-table__detail">
        <p><strong>Items:</strong> Accessory C (x1)</p>
        <p><strong>Estimated ship date:</strong> 2025-04-14</p>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--indicator-chevron" data-animated role="row">
    <summary class="disclosure__summary data-table__row">
      <span class="disclosure__indicator"></span>
      <span>#1040</span>
      <span>2025-04-08</span>
      <span class="badge badge--delivered">Delivered</span>
      <span>$142.00</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner data-table__detail">
        <p><strong>Items:</strong> Widget A (x1), Premium Kit (x1)</p>
        <p><strong>Delivered:</strong> 2025-04-11</p>
      </div>
    </div>
  </details>

</div>
```

## Aligning columns with CSS Grid

The key to making the summary look like a table row is applying `display: grid` with a column template that matches the header:

```css
.data-table__header,
.data-table__row {
  display: grid;
  grid-template-columns: 28px 1fr 1fr 100px 80px;
  align-items: center;
  gap: 8px;
  padding: 12px 8px;
}

.data-table__header {
  font-weight: bold;
  border-bottom: 2px solid #333;
}

.data-table__row {
  border-bottom: 1px solid #222;
}

.data-table__detail {
  padding: 12px 8px 12px 36px;
  background: #111;
  border-bottom: 1px solid #222;
}
```

The first column (`28px`) reserves space for the chevron indicator. Adjust the template to suit your data.

:::tip
Use `grid-template-columns` on `disclosure__summary` to keep column values perfectly aligned across rows. The indicator span occupies the first column, so account for it in your template.
:::

## Status badges

Style the status badges however your design system requires. A simple approach:

```css
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 600;
}

.badge--shipped    { background: #1e3a5f; color: #93c5fd; }
.badge--processing { background: #3b3316; color: #fcd34d; }
.badge--delivered  { background: #14362c; color: #6ee7b7; }
```

## Accessibility notes

- Add `role="table"` to the outer container and `role="row"` to each `<details>` element to communicate the table semantics to assistive technology.
- Include `role="columnheader"` on the header cells.
- The native `<details>`/`<summary>` semantics provide built-in expand/collapse announcements, so no additional `aria-expanded` attributes are needed.
