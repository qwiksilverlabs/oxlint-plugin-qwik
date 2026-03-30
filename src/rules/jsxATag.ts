import { defineRule } from "@oxlint/plugins";

export const jsxATag = defineRule({
	meta: {
		defaultOptions: [],
		type: "problem",
		docs: {
			description: "For a perfect SEO score, always provide href attribute for <a> elements.",
			recommended: "warn",
			url: "https://qwik.dev/docs/advanced/dollar/",
		},
		fixable: "code",
		schema: [],
		messages: {
			noHref: "For a perfect SEO score, always provide href attribute for <a> elements.",
		},
	},
	createOnce(context) {
		return {
			JSXElement(node) {
				if (
					node.openingElement.name.type === "JSXIdentifier" &&
					node.openingElement.name.name === "a"
				) {
					const hasSpread = node.openingElement.attributes.some(
						(attr) => attr.type === "JSXSpreadAttribute",
					);

					if (!hasSpread) {
						const hasHref = node.openingElement.attributes.some(
							(attr) =>
								attr.type === "JSXAttribute" &&
								attr.name.type === "JSXIdentifier" &&
								attr.name.name === "href",
						);

						if (!hasHref) {
							context.report({
								node: node as any,
								messageId: "noHref",
							});
						}
					}
				}
			},
		};
	},
});
