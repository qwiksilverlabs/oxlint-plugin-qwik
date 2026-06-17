import { eslintCompatPlugin, type Plugin } from '@oxlint/plugins';
import { jsxATag } from '@rules/jsxATag';
import { jsxImgTag } from '@rules/jsxImgTag';
import { loaderLocation } from '@rules/loaderLocation';
import { noReactProps } from '@rules/noReactProps';
import { noUseVisibleTask } from '@rules/noUseVisibleTask';
import { preferClasslist } from '@rules/preferClasslist';
import { useMethodUsage } from '@rules/useMethodUsage';
import { defineConfig, type OxlintConfig } from 'oxlint';

const plugin: Plugin = eslintCompatPlugin({
	meta: {
		name: 'qwik',
	},
	rules: {
		'jsx-a-tag': jsxATag,
		'jsx-img-tag': jsxImgTag,
		'use-method-usage': useMethodUsage,
		'no-react-props': noReactProps,
		'no-use-visible-task': noUseVisibleTask,
		'prefer-classlist': preferClasslist,
		'loader-location': loaderLocation,
	},
});

export default plugin;

export const recommended: OxlintConfig = defineConfig({
	overrides: [
		{
			files: ['**/*.tsx', '**/*.jsx', '**/*.ts', '**/*.js'],
			plugins: ['react'],
			jsPlugins: ['oxlint-plugin-qwik'],
			rules: {
				'qwik/jsx-a-tag': 'warn',
				'qwik/jsx-img-tag': 'warn',
				'qwik/use-method-usage': 'error',
				'qwik/no-react-props': 'error',
				'qwik/no-use-visible-task': 'warn',
				'qwik/prefer-classlist': 'warn',
				'qwik/loader-location': 'warn',

				'react/jsx-key': 'error',
				'react/jsx-no-script-url': 'error',
			},
		},
	],
});

export const strict: OxlintConfig = defineConfig({
	overrides: [
		{
			files: ['**/*.tsx', '**/*.jsx', '**/*.ts', '**/*.js'],
			plugins: ['react'],
			jsPlugins: ['oxlint-plugin-qwik'],
			rules: {
				'qwik/jsx-a-tag': 'error',
				'qwik/jsx-img-tag': 'error',
				'qwik/use-method-usage': 'error',
				'qwik/no-react-props': 'error',
				'qwik/no-use-visible-task': 'warn',
				'qwik/prefer-classlist': 'error',
				'qwik/loader-location': 'error',

				'react/jsx-key': 'error',
				'react/jsx-no-script-url': 'error',
			},
		},
	],
});
