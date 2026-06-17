import { defineRule, type Rule } from '@oxlint/plugins';

const DEFAULT_CLASSNAMES = ['cn', 'clsx', 'classnames'] as const;

export const preferClasslist: Rule = defineRule({
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'Enforce using the classlist prop over importing a classnames helper. The classlist prop accepts an object `{ [class: string]: boolean }` just like classnames.',
			recommended: false,
			url: 'https://qwik.dev/docs/advanced/eslint/#prefer-classlist',
		},
		messages: {
			preferClasslist:
				'The classlist prop should be used instead of {{ classnames }} to efficiently set classes based on an object.',
		},
		fixable: undefined,
		hasSuggestions: false,
		schema: [
			{
				type: 'object',
				properties: {
					classnames: {
						type: 'array',

						description: 'An array of names to treat as `classnames` functions',
						default: [...DEFAULT_CLASSNAMES],
						items: {
							type: 'string',
							minItems: 1,
							uniqueItems: true,
						},
					},
				},
				additionalProperties: false,
			},
		],
		defaultOptions: [{ classnames: [...DEFAULT_CLASSNAMES] }],
		deprecated: false,
	},
	createOnce(context) {
		return {
			JSXAttribute(node) {
				const { classnames } = (context.options?.[0] as
					| { classnames: string[] }
					| undefined) ?? { classnames: [...DEFAULT_CLASSNAMES] };

				const name =
					node.name.type === 'JSXIdentifier' ? node.name.name : node.name.namespace.name;

				if (name !== 'class') return;
				if (node.value?.type !== 'JSXExpressionContainer') return;

				const { expression } = node.value;

				if (
					expression.type === 'CallExpression' &&
					expression.callee.type === 'Identifier' &&
					classnames.includes(expression.callee.name)
				) {
					context.report({
						node,
						messageId: 'preferClasslist',
						data: {
							classnames: expression.callee.name,
						},
					});
				}
			},
		};
	},
});
