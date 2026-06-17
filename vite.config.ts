import { defineConfig, type UserConfig } from 'vite-plus';

export const config: UserConfig = defineConfig({
	staged: {
		'*': 'vp check --fix',
	},
	pack: {
		entry: ['./src/index.ts'],
		format: ['esm'],
		dts: true,
		clean: true,
		exports: true,
	},
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts'],
	},
	lint: {
		options: {
			typeAware: true,
			typeCheck: true,
		},
		ignorePatterns: ['dist/**', 'node_modules/**'],
	},
	fmt: {
		useTabs: true,
		tabWidth: 4,
		printWidth: 100,
		endOfLine: 'lf',
		bracketSameLine: true,
		singleQuote: true,
		ignorePatterns: ['dist/**', 'node_modules/**'],
		overrides: [
			{
				files: ['*.yml', '*.yaml'],
				options: {
					tabWidth: 2,
					useTabs: false,
				},
			},
		],
	},
});

export default config;
