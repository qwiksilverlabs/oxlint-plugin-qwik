import { resolve } from "node:path";
import { defineConfig } from "vite-plus";

export default defineConfig({
	pack: {
		entry: ["./src/index.ts", "./src/ruleset/index.ts"],
		format: ["esm"],
		dts: true,
		clean: true,
	},
	resolve: {
		alias: {
			"@rules": resolve(import.meta.dirname, "src/rules"),
		},
	},
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
	},
	lint: {
		options: {
			typeAware: true,
			typeCheck: true,
		},
		ignorePatterns: ["dist/**", "fixtures/**", "node_modules/**"],
	},
	fmt: {
		useTabs: true,
		tabWidth: 4,
		printWidth: 100,
		endOfLine: "lf",
		bracketSameLine: true,
		bracketSpacing: true,
		ignorePatterns: ["dist/**", "fixtures/**", "node_modules/**"],
		overrides: [
			{
				files: ["*.yml", "*.yaml"],
				options: {
					tabWidth: 2,
					useTabs: false,
				},
			},
		],
	},
});
