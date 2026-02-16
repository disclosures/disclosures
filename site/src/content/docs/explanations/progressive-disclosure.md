---
title: Progressive Disclosure
sidebar:
  order: 1
---

Progressive disclosure is a design pattern that shows only essential information upfront, revealing additional details on demand. Instead of presenting everything at once, you let users choose what to explore further.

## Why it matters

Interfaces that dump all their content on the user at once create cognitive overload. Progressive disclosure solves this by:

- **Reducing cognitive load.** Users see only what they need to get oriented. The rest is available but not competing for attention.
- **Making interfaces scannable.** When summaries are visible and details are tucked away, users can quickly survey the full scope of a page and jump to what they care about.
- **Letting users control information density.** Some users want the overview; others want every detail. Progressive disclosure serves both without separate views or navigation.

## The `<details>` element

The HTML `<details>` element is the web platform's built-in progressive disclosure primitive. Paired with `<summary>`, it gives you collapsible sections with no JavaScript required:

```html
<details>
  <summary>Shipping policy</summary>
  <p>We ship within 3-5 business days...</p>
</details>
```

The browser handles toggling, keyboard interaction, and screen reader semantics natively. This is the foundation that `@disclosures/core` builds on.

## What this library adds

`@disclosures/core` enhances `<details>` with smooth height animations using the Web Animations API, while preserving the native element's accessibility and keyboard behavior. The browser still owns the semantics. The library just makes the open/close transition feel polished rather than instantaneous.

## The depth model

Progressive disclosure works in layers. This library supports a depth model with three levels:

- **Level 1 -- Summary visible, details hidden.** The default collapsed state. The summary gives users enough context to decide whether to expand.
- **Level 2 -- Details revealed.** The user has opened the section. The content is now visible alongside the summary.
- **Level 3 -- Nested details within details.** Details sections can contain their own collapsible children, creating a hierarchy of progressive disclosure for deeply structured content like documentation trees or multi-step forms.

## Design guidelines

**Keep summaries scannable.** A summary should communicate what the section contains in a few words. If users cannot tell whether to expand, the summary is not doing its job.

**Make content worth revealing.** Every expandable section implies a cost: the user has to click to see more. Make sure what they find is valuable and relevant to the summary that led them there.

**Use appropriate depth.** One level of disclosure handles most cases. Two levels work well for structured content like FAQs with sub-questions. Three levels should be rare -- if you find yourself nesting that deeply, consider whether the information architecture needs rethinking.

**Group related disclosures.** When multiple collapsible sections appear together (an FAQ list, a settings panel), use `DetailsGroup` with exclusive mode so opening one section closes the others. This keeps the page from growing unbounded as users explore.
