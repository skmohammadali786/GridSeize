---
name: Settings screens
description: Which settings sub-screens exist and the ScreenHeader API constraint.
---

All settings sub-routes under `app/settings/` are real files (no missing routes crash).

**ScreenHeader API:** The component does NOT have a `right` prop. Use `rightLabel` (string) + `onRightPress` (function) for right-side actions. `rightIcon` (Ionicons key name) is also supported.

**Why:** Using `right={<JSX>}` will silently not render. Must use rightLabel or rightIcon props.

Settings files that exist: index, _layout, notifications, privacy, security, theme, map, language, devices, wearables, data-export, data-backup, help, faq (→ redirects to help), support, about.

faq.tsx simply does `<Redirect href="/settings/help" />` to avoid duplication.
