import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	exports: true,
	format: "esm",
	entry: ["src/index.ts", "src/ruleset/index.ts"],
});
