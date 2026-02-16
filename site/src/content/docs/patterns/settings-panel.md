---
title: Settings Panel
sidebar:
  order: 2
---

Collapsible panels are a natural fit for settings pages, dashboards, and admin interfaces where groups of related controls need to stay organized without overwhelming the user. The `disclosure--panel` variant gives each section a bordered, card-like appearance with a distinct open state.

## Basic panel

Apply the `disclosure--panel` variant alongside the base `disclosure` class. The panel automatically changes its background color when opened to give the user clear visual feedback.

```html
<details class="disclosure disclosure--panel disclosure--indicator-chevron" data-animated>
  <summary class="disclosure__summary">
    <span class="disclosure__indicator"></span>
    <span class="disclosure__label">Notification Preferences</span>
  </summary>
  <div class="disclosure__content">
    <div class="disclosure__content-inner">
      <label>
        <input type="checkbox" checked> Email notifications
      </label>
      <label>
        <input type="checkbox"> SMS notifications
      </label>
      <label>
        Push frequency
        <select>
          <option>Immediate</option>
          <option>Hourly digest</option>
          <option>Daily digest</option>
        </select>
      </label>
    </div>
  </div>
</details>
```

## Non-exclusive group

Settings panels typically let users have multiple sections open at once so they can compare or fill in values across categories. Use `data-disclosure-group="false"` (or omit the attribute entirely) to allow independent open/close behavior:

```html
<div class="disclosure-group" data-disclosure-group="false">

  <details class="disclosure disclosure--panel disclosure--indicator-chevron" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">Profile</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <label>
          Display name
          <input type="text" value="Jane Doe">
        </label>
        <label>
          Bio
          <textarea rows="3">Software engineer and open-source enthusiast.</textarea>
        </label>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--panel disclosure--indicator-chevron" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">Notification Preferences</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <label>
          <input type="checkbox" checked> Email notifications
        </label>
        <label>
          <input type="checkbox"> SMS notifications
        </label>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--panel disclosure--indicator-chevron" data-animated>
    <summary class="disclosure__summary">
      <span class="disclosure__indicator"></span>
      <span class="disclosure__label">Privacy & Security</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner">
        <label>
          <input type="checkbox" checked> Two-factor authentication
        </label>
        <label>
          Session timeout
          <select>
            <option>15 minutes</option>
            <option selected>1 hour</option>
            <option>Never</option>
          </select>
        </label>
      </div>
    </div>
  </details>

</div>
```

Setting `data-disclosure-group="false"` still registers the container as a group (useful for batch operations like `closeAll`) but disables the exclusive accordion behavior.

## CSS tokens

The panel variant exposes four custom properties:

| Token | Default | Description |
|---|---|---|
| `--disclosure-panel-bg` | `#1a1a1a` | Background color when closed |
| `--disclosure-panel-bg-open` | `#161616` | Background color when open |
| `--disclosure-panel-border` | `#333` | Border color |
| `--disclosure-panel-padding` | `8px 16px` | Inner padding of the panel |

Override these at any scope to adapt the panels to your design system:

```css
.settings-page {
  --disclosure-panel-bg: #ffffff;
  --disclosure-panel-bg-open: #f9fafb;
  --disclosure-panel-border: #d1d5db;
  --disclosure-panel-padding: 12px 20px;
}
```

## Tips

- **Open a section by default** by adding the `open` attribute to the `<details>` element. The animation will still run when the user closes it.
- **Nest panels** for sub-categories. Inner panels inherit the token values from their parent unless you override them at a deeper scope.
- **Combine with form validation** -- listen for the `toggle` event on each `<details>` element to validate inputs when a panel closes.
