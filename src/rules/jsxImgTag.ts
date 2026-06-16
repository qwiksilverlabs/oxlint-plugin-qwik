import { defineRule, type ESTree, type Rule } from '@oxlint/plugins';

export const jsxImgTag: Rule = defineRule({
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'Enforces best practices for <img> elements to ensure accessibility and performance.',
			recommended: true,
			url: 'https://qwik.dev/docs/advanced/eslint/#jsx-img',
		},
		messages: {
			noAlt: 'Missing alt attribute on <img> element. Add alt text to describe the image for screen readers.',
			emptyAlt:
				'Empty alt attribute on <img> element. Provide descriptive alt text, or use role="presentation" for decorative images.',
			noWidth:
				'Missing width attribute on <img> element. Add width to prevent layout shift (CLS).',
			noHeight:
				'Missing height attribute on <img> element. Add height to prevent layout shift (CLS).',
			noSrc: 'Missing src attribute on <img> element',
			emptySrc:
				'Empty src attribute on <img> element. Provide a valid image URL or import the image using ESM.',
			noLocalSrc:
				'Serving images from public are not optimized. Import images using ESM instead.',
		},
		fixable: undefined,
		hasSuggestions: true,
		schema: [],
		defaultOptions: undefined,
		deprecated: false,
	},
	createOnce(context) {
		return {
			JSXElement(node) {
				const { name, attributes } = node.openingElement;

				if (name.type !== 'JSXIdentifier' || name.name !== 'img') return;
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

				const srcAttribute = attrMap.get('src');
				const altAttribute = attrMap.get('alt');

				if (!srcAttribute) {
					context.report({ node, messageId: 'noSrc' });
					return;
				}
				if (!altAttribute) {
					context.report({ node, messageId: 'noAlt' });
				} else if (
					altAttribute.value?.type === 'Literal' &&
					altAttribute.value.value === ''
				) {
					context.report({ node, messageId: 'emptyAlt' });
				}
				if (!attrMap.has('width')) context.report({ node, messageId: 'noWidth' });
				if (!attrMap.has('height')) context.report({ node, messageId: 'noHeight' });

				const srcValue = srcAttribute.value;

				if (!srcValue || (srcValue.type === 'Literal' && srcValue.value === '')) {
					context.report({ node, messageId: 'emptySrc' });
					return;
				}
				if (
					srcValue.type === 'Literal' &&
					typeof srcValue.value === 'string' &&
					srcValue.value.startsWith('/') &&
					!srcValue.value.startsWith('//')
				)
					context.report({ node, messageId: 'noLocalSrc' });
			},
		};
	},
});
