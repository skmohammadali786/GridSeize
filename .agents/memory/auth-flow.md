---
name: GridSeize auth flow
description: How authentication state is managed and persisted
---

# Pattern
- AppContext starts with isAuthenticated=false, user=null, authLoading=true
- On mount: reads @gridseize_auth_user from AsyncStorage, sets state, sets authLoading=false
- login(user): sets state + persists to AsyncStorage
- logout(): clears state + removes from AsyncStorage
- app/index.tsx: shows dark view (#0F172A) while authLoading, then redirects to /(auth)/splash or /(tabs)

**Why:** Needed so new users see the full onboarding flow, returning users are auto-logged in.
