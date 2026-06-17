import { defineRule, type Rule } from '@oxlint/plugins';

export const useMethodUsage: Rule = defineRule({
	meta: {
		type: 'problem',
		docs: {
			description: 'Detect invalid use of use hooks.',
			category: 'Variables',
			recommended: true,
			url: 'https://qwik.dev/docs/advanced/eslint/#use-method-usage',
		},
		messages: {
			useWrongFunction: 'Calling use* methods in wrong function.',
		},
		fixable: undefined,
		hasSuggestions: false,
		schema: [],
		defaultOptions: undefined,
		deprecated: false,
	},

	createOnce(context) {
		return {
			'CallExpression[callee.name=/^use[A-Z]/]'(node) {
				let parent = node.parent;

				while (parent) {
					const type = parent.type;

					switch (type) {
						case 'VariableDeclarator':
						case 'VariableDeclaration':
						case 'ExpressionStatement':
						case 'MemberExpression':
						case 'BinaryExpression':
						case 'UnaryExpression':
						case 'ReturnStatement':
						case 'BlockStatement':
						case 'ChainExpression':
						case 'Property':
						case 'ObjectExpression':
						case 'CallExpression':
						case 'TSAsExpression':
							break;
						case 'ArrowFunctionExpression':
						case 'FunctionExpression': {
							const pp = parent.parent;
							if (
								(pp.type === 'VariableDeclarator' &&
									pp.id?.type === 'Identifier' &&
									pp.id.name.startsWith('use')) ||
								(pp.type === 'CallExpression' &&
									pp.callee.type === 'Identifier' &&
									(pp.callee.name === 'component$' ||
										pp.callee.name === 'renderHook'))
							)
								return;

							context.report({
								node,
								messageId: 'useWrongFunction',
							});
							return;
						}
						case 'FunctionDeclaration':
							if (!parent.id?.name.startsWith('use')) {
								context.report({
									node,
									messageId: 'useWrongFunction',
								});
							}
							return;
						default:
							context.report({
								node,
								messageId: 'useWrongFunction',
							});
							return;
					}

					parent = parent.parent;
				}
			},
		};
	},
});
