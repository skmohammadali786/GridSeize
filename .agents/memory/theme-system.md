---
name: Theme system
description: How light/dark theme is managed in the GridSeize mobile app.
---

ThemeContext (`contexts/ThemeContext.tsx`) manages the app's color scheme.

**Rule:** ThemeProvider must wrap everything in `app/_layout.tsx` — it goes *above* QueryClientProvider and AppProvider. useColors() imports from ThemeContext (not from React Native's useColorScheme).

**Why:** AppContext and other providers don't depend on theme, but useColors is used everywhere. Putting ThemeProvider outermost avoids any ordering issues.

**How to apply:** When adding new screens, just call `const colors = useColors()` — it automatically reads the current theme. To let users change theme, import `useTheme()` from `contexts/ThemeContext` and call `setTheme('light' | 'dark')`. Theme persists to AsyncStorage under key `@gridseize_theme`.

Default theme is `'light'` (not system).
