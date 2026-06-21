---
name: Babel types pnpm override
description: Prevent react-native-worklets web bundling from breaking due to @babel/types@8.x
---

# Rule
Always pin `@babel/types` and `@babel/generator` to `^7.29.x` in root `package.json` pnpm.overrides.

**Why:** react-native-worklets@0.5.1 Babel plugin creates NumericLiteral nodes with negative values directly, which @babel/types@8.0.0 now disallows (requires t.valueToNode() instead). Without the override, any install that pulls in @babel/types@8.x causes "WorkletsBabelPluginError: NumericLiterals must be non-negative" web bundling failure.

**How to apply:** In root `package.json`:
```json
"pnpm": {
  "overrides": {
    "@babel/types": "^7.29.7",
    "@babel/generator": "^7.29.7"
  }
}
```
