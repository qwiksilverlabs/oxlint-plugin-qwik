import { defineConfig, type OxlintConfig } from 'oxlint';

export const recommended: OxlintConfig = defineConfig({
	overrides: [
		{
			files: ['**/*.tsx', '**/*.jsx', '**/*.ts', '**/*.js'],
			plugins: ['react'],
			jsPlugins: ['oxlint-plugin-qwik'],
			rules: {
				'qwik/jsx-a-tag': 'warn',
				'qwik/jsx-img': 'warn',
				'qwik/use-method-usage': 'error',
				'qwik/no-react-props': 'error',
				'qwik/no-use-visible-task': 'warn',
				'qwik/jsx-no-script-url': 'warn',
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
				'qwik/jsx-img': 'error',
				'qwik/use-method-usage': 'error',
				'qwik/no-react-props': 'error',
				'qwik/no-use-visible-task': 'warn',
				'qwik/jsx-no-script-url': 'error',
				'qwik/prefer-classlist': 'error',
				'qwik/loader-location': 'error',

				'react/jsx-key': 'error',
				'react/jsx-no-script-url': 'error',
			},
		},
	],
});
