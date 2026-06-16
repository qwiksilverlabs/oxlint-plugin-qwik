import { defineRule, type Rule } from '@oxlint/plugins';

export const noReactProps: Rule = defineRule({
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallows React-specific props in Qwik JSX.',
			recommended: true,
			url: 'https://qwik.dev/docs/advanced/eslint/#no-react-props',
		},
		messages: {
			preferClass: 'Use "class" instead of "className".',
			preferFor: 'Use "for" instead of "htmlFor".',
		},
		fixable: 'code',
		hasSuggestions: true,
		schema: [],
		defaultOptions: undefined,
		deprecated: false,
	},
	createOnce(context) {
		return {
			JSXElement(node) {
				const { name, attributes } = node.openingElement;

				if (
					!name ||
					name.type === 'JSXMemberExpression' ||
					(name.type === 'JSXIdentifier' &&
						name.name.charAt(0) !== name.name.charAt(0).toLowerCase())
				)
					return;

				if (attributes.some((attr) => attr.type === 'JSXSpreadAttribute')) return;

				for (const attribute of attributes) {
					if (
						attribute.type !== 'JSXAttribute' ||
						attribute.name.type !== 'JSXIdentifier'
					)
						continue;

					const { name } = attribute.name;

					switch (name) {
						case 'htmlFor':
							context.report({
								node: attribute,
								messageId: 'preferFor',
								fix: (fixer) => fixer.replaceText(attribute.name, 'for'),
							});
							break;
						case 'className':
							context.report({
								node: attribute,
								messageId: 'preferClass',
								fix: (fixer) => fixer.replaceText(attribute.name, 'class'),
							});
							break;
						default:
							continue;
					}
				}
			},
		};
	},
});
