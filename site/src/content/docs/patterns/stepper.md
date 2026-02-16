---
title: Stepper
sidebar:
  order: 5
---

A multi-step wizard guides the user through a sequence of stages where only one step is visible at a time. Each step is a `<details>` element inside an exclusive disclosure group, so opening the next step automatically closes the current one.

## Basic 3-step form

```html
<div class="stepper disclosure-group" data-disclosure-group>

  <details class="disclosure disclosure--indicator-none" data-animated open>
    <summary class="disclosure__summary stepper__header">
      <span class="stepper__number">1</span>
      <span class="disclosure__label">Account Details</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner stepper__body">
        <label>
          Email
          <input type="email" placeholder="you@example.com">
        </label>
        <label>
          Password
          <input type="password">
        </label>
        <button type="button" class="stepper__next" data-step="1">Continue</button>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--indicator-none" data-animated>
    <summary class="disclosure__summary stepper__header">
      <span class="stepper__number">2</span>
      <span class="disclosure__label">Personal Info</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner stepper__body">
        <label>
          Full name
          <input type="text">
        </label>
        <label>
          Phone
          <input type="tel">
        </label>
        <button type="button" class="stepper__next" data-step="2">Continue</button>
      </div>
    </div>
  </details>

  <details class="disclosure disclosure--indicator-none" data-animated>
    <summary class="disclosure__summary stepper__header">
      <span class="stepper__number">3</span>
      <span class="disclosure__label">Confirmation</span>
    </summary>
    <div class="disclosure__content">
      <div class="disclosure__content-inner stepper__body">
        <p>Review your information and submit.</p>
        <button type="submit">Submit</button>
      </div>
    </div>
  </details>

</div>
```

The first step starts with the `open` attribute. Because the group has `data-disclosure-group` (exclusive by default), only one step can be open at a time.

## Advancing between steps with JavaScript

Use `DetailsGroup.openByIndex(n)` to move to a specific step programmatically. This is the recommended way to wire up the "Continue" buttons:

```js
import { DetailsGroup } from '@disclosures/core';

const stepper = new DetailsGroup(document.querySelector('.stepper'));

document.querySelectorAll('.stepper__next').forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentStep = Number(btn.dataset.step);
    stepper.openByIndex(currentStep); // opens the next step (0-indexed)
  });
});
```

`openByIndex` opens the target step, and the exclusive group behavior automatically closes whichever step was previously open.

### Going back

Add "Back" buttons that call `openByIndex` with a lower index:

```js
document.querySelectorAll('.stepper__back').forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentStep = Number(btn.dataset.step);
    stepper.openByIndex(currentStep - 2); // go back one step (0-indexed)
  });
});
```

## Step indicator styling

Style the numbered badges and a connecting line to give users a progress visualization:

```css
.stepper__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}

.stepper__number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #333;
  color: #999;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

/* Highlight the active step */
.disclosure[open] .stepper__number {
  background: var(--disclosure-indicator-color-open, #00ff88);
  color: #000;
}

.stepper__body {
  padding: 8px 0 16px 44px; /* align with label text */
}
```

### Progress bar

A simple CSS progress bar can sit above the stepper to show overall completion. Update its width with JavaScript as the user advances:

```html
<div class="stepper__progress">
  <div class="stepper__progress-bar" style="width: 33%"></div>
</div>
```

```css
.stepper__progress {
  height: 4px;
  background: #222;
  border-radius: 2px;
  margin-bottom: 24px;
  overflow: hidden;
}

.stepper__progress-bar {
  height: 100%;
  background: var(--disclosure-indicator-color-open, #00ff88);
  transition: width 300ms ease;
}
```

Update the bar width in the same click handler that calls `openByIndex`:

```js
const progressBar = document.querySelector('.stepper__progress-bar');
const totalSteps = 3;

function goToStep(index) {
  stepper.openByIndex(index);
  progressBar.style.width = `${((index + 1) / totalSteps) * 100}%`;
}
```

## Validation before advancing

Prevent the user from moving forward until the current step is valid by checking form inputs before calling `openByIndex`:

```js
document.querySelectorAll('.stepper__next').forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentStep = Number(btn.dataset.step);
    const currentDetails = document.querySelectorAll('.stepper details')[currentStep - 1];
    const inputs = currentDetails.querySelectorAll('input, select, textarea');

    const allValid = [...inputs].every((input) => input.reportValidity());
    if (allValid) {
      stepper.openByIndex(currentStep);
    }
  });
});
```

## Tips

- Use `disclosure--indicator-none` on stepper steps since the numbered badge replaces the default indicator.
- The `DetailsGroup.closeAll()` method is useful for resetting the stepper to its initial state.
- For long forms, consider persisting partially completed data to `localStorage` so users do not lose progress on refresh.
