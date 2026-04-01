<p align="center">
    <img src="./.github/assets/mascot.png" width="150">
</p>

<h1 align="center">oxlint-plugin-qwik</h1>

> [!WARNING]
> THIS PLUGIN IS A WORK IN PROGRESS!

A set of Oxlint rules to help developers write better Qwik code

## Usage

```sh
npm add -D oxlint-plugin-qwik
pnpm add -D oxlint-plugin-qwik
yarn add -D oxlint-plugin-qwik
bun add -D oxlint-plugin-qwik
```

## Configurations

```typescript
import { defineConfig } from "oxlint";

export default defineConfig({
	jsPlugins: ["oxlint-plugin-qwik"],
	rules: {
		// override rules
		// "qwik/jsx-img": "error",
	},
});
```
