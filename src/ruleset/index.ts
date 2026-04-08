import { defineConfig } from 'oxlint';

export const recommended = defineConfig({
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
	},
});

export const strict = defineConfig({
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
	},
});
