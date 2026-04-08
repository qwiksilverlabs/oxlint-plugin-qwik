import { defineRule } from '@oxlint/plugins';
import { propName } from '../utils';

export const preferClasslist = defineRule({
	meta: {
		type: 'problem',
		docs: {
			recommended: false,
			description:
				'Enforce using the classlist prop over importing a classnames helper. The classlist prop accepts an object `{ [class: string]: boolean }` just like classnames.',
			url: 'https://qwik.dev/docs/advanced/eslint/#prefer-classlist',
		},
		schema: [
			{
				type: 'object',
				properties: {
					classnames: {
						type: 'array',

						description: 'An array of names to treat as `classnames` functions',
						default: ['cn', 'clsx', 'classnames'],
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
		messages: {
			preferClasslist:
				'The classlist prop should be used instead of {{ classnames }} to efficiently set classes based on an object.',
		},
	},
	create(context) {
		const modifyJsxSource = context.sourceCode
			.getAllComments()
			.some((c) => c.value.includes('@jsxImportSource'));
		if (modifyJsxSource) {
			return {};
		}

		const classnames = (context.options?.[0] as { classnames?: string[] } | undefined)
			?.classnames ?? ['cn', 'clsx', 'classnames'];

		return {
			JSXAttribute(node) {
				if (['class', 'className'].indexOf(propName(node)) === -1) {
					return;
				}

				if (node.value?.type === 'JSXExpressionContainer') {
					const expr = node.value.expression;

					if (
						expr.type === 'CallExpression' &&
						expr.callee.type === 'Identifier' &&
						classnames.indexOf(expr.callee.name) !== -1
					) {
						context.report({
							node,
							messageId: 'preferClasslist',
							data: {
								classnames: expr.callee.name,
							},
						});
					}
				}
			},
		};
	},
});
