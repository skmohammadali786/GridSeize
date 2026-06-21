---
name: White flash on navigation back
description: How to prevent white flash when navigating back in Expo Router Stack
---

# Rule
Every Stack navigator must set contentStyle.backgroundColor to prevent the white flash on back navigation.

**Why:** React Native Stack defaults to white background. When popping a screen, the Stack shows its own background briefly.

**How to apply:**
- Root Stack in app/_layout.tsx: useColors() inside RootLayoutNav(), pass contentStyle: { backgroundColor: colors.background }
- Auth _layout.tsx: contentStyle: { backgroundColor: colors.primary } (dark) for dark screens; override per-screen for light screens (login, signup, etc.)
- All sub-layouts (settings, community, activity, profile, map, chat, premium, ai-coach, rewards, challenges, teams, alliances, events, safety, routes, home): same pattern with colors.background
