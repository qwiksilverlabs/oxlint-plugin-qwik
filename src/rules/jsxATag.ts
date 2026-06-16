import { defineRule, type ESTree, type Rule } from '@oxlint/plugins';

export const jsxATag: Rule = defineRule({
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'Enforces best practices for <a> elements to ensure accessibility and SEO.',
			recommended: true,
			url: 'https://qwik.dev/docs/advanced/eslint/#jsx-a',
		},
		messages: {
			noHref: 'Missing href attribute on <a> element. Add an href to make the link functional and improve SEO.',
			emptyHref: 'Empty href attribute on <a> element. Provide a valid URL.',
			missingAriaLabel:
				'Missing accessible label on <a> element. Add text content or an ariaLabel attribute.',
		},
		fixable: undefined,
		hasSuggestions: false,
		schema: [],
		defaultOptions: undefined,
		deprecated: false,
	},
	createOnce(context) {
		return {
			JSXElement(node) {
				const { name, attributes } = node.openingElement;

				if (name.type !== 'JSXIdentifier' || name.name !== 'a') return;
				if (attributes.some((attr) => attr.type === 'JSXSpreadAttribute')) return;

				const attrMap = new Map<string, ESTree.JSXAttribute>();

				for (const attribute of attributes) {
					if (
						attribute.type !== 'JSXAttribute' ||
						attribute.name.type !== 'JSXIdentifier'
					)
						continue;
					attrMap.set(attribute.name.name, attribute);
				}

				if (!attrMap.has('href')) {
					context.report({ node, messageId: 'noHref' });
					return;
				}

				const hrefValue = attrMap.get('href')!.value;
				if (!hrefValue || (hrefValue.type === 'Literal' && hrefValue.value === '')) {
					context.report({ node, messageId: 'emptyHref' });
					return;
				}

				if (attrMap.has('ariaLabel')) return;

				const hasTextContent = (children: ESTree.JSXElement['children']): boolean =>
					children.some((child) => {
						if (child.type === 'JSXText') return child.value.trim() !== '';
						if (child.type === 'JSXElement') return hasTextContent(child.children);
						return false;
					});

				if (!hasTextContent(node.children)) {
					context.report({ node, messageId: 'missingAriaLabel' });
				}
			},
		};
	},
});
