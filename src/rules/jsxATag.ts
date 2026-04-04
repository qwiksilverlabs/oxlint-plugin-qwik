import { defineRule } from "@oxlint/plugins";

export const jsxATag = defineRule({
	meta: {
		defaultOptions: [],
		type: "suggestion",
		docs: {
			description: "For a perfect SEO score, always provide href attribute for <a> elements.",
			recommended: "warn",
		},
		fixable: "code",
		schema: [],
		messages: {
			noHref: "Missing href attribute in the <a> element",
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
								node,
								messageId: "noHref",
							});
						}
					}
				}
			},
		};
	},
});
