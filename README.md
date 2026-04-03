<p align="center">
    <img src="./.github/assets/mascot.png" width="150">
</p>

<h1 align="center">oxlint-plugin-qwik</h1>

> [!WARNING]
> THIS PLUGIN IS A WORK IN PROGRESS!

A set of Oxlint rules to help developers write better Qwik code.

This project is a port of [`eslint-plugin-qwik`](https://github.com/QwikDev/qwik/tree/main/packages/eslint-plugin-qwik).

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

## Available rules

A list of rules that we are currently based is in [here](https://qwik.dev/docs/advanced/eslint/).

- ✅: Supported
- 🚫: Not in progress
- ⌛️: In progress
- ⚓: Native support

|        Rule         | Status |
| :-----------------: | :----: |
|  use-method-usage   |   ✅   |
| valid-lexical-scope |   🚫   |
|   loader-location   |   🚫   |
|   no-react-props    |   ✅   |
|  prefer-classlist   |   🚫   |
|  jsx-no-script-url  |   ✅   |
|       jsx-key       |   ⚓   |
|    unused-server    |   🚫   |
|       jsx-img       |   ✅   |
|        jsx-a        |   ✅   |
| no-use-visible-task |   ✅   |

## Contributing

This project welcomes contributions of all types. Before you start work on a feature that you would like to contribute, please read our [Contributor's Guide](https://github.com/qwiksilverlabs/contribute).
