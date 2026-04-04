import { defineRule, type ESTree } from "@oxlint/plugins";

export const jsxImg = defineRule({
	meta: {
		defaultOptions: [],
		type: "suggestion",
		docs: {
			description:
				"Enforces explicit 'width' and 'height' attributes on <img> elements to prevent Cumulative Layout Shift (CLS), and recommends ESM imports for local images to enable optimization.",
			recommended: "warn",
			url: "https://qwik.dev/docs/integrations/image-optimization/#responsive-images",
		},
		schema: [],
		messages: {
			noLocalSrc: `Importing via ESM is suggested because using public images will bypass the image optimization phase`,
			noWidthHeight: `Missing "width" or "height" attribute`,
		},
	},
	createOnce(context) {
		return {
			JSXElement(node) {
				if (
					node.openingElement.name.type === "JSXIdentifier" &&
					node.openingElement.name.name === "img"
				) {
					const hasSpread = node.openingElement.attributes.some(
						(attr) => attr.type === "JSXSpreadAttribute",
					);

					if (!hasSpread) {
						const src = node.openingElement.attributes.find(
							(attr) =>
								attr.type === "JSXAttribute" &&
								attr.name.type === "JSXIdentifier" &&
								attr.name.name === "src",
						) as ESTree.JSXAttribute | undefined;

						if (src && src.value) {
							const literal =
								src.value.type === "Literal"
									? src.value
									: src.value.type === "JSXExpressionContainer" &&
										  src.value.expression.type === "Literal"
										? src.value.expression
										: undefined;
							if (literal && typeof literal.value === "string") {
								const isLocal = literal.value.startsWith("/");
								if (isLocal) {
									context.report({
										node: src,
										messageId: "noLocalSrc",
									});
									return;
								}
							}
						}

						const hasWidth = node.openingElement.attributes.some(
							(attr) =>
								attr.type === "JSXAttribute" &&
								attr.name.type === "JSXIdentifier" &&
								attr.name.name === "width",
						);

						const hasHeight = node.openingElement.attributes.some(
							(attr) =>
								attr.type === "JSXAttribute" &&
								attr.name.type === "JSXIdentifier" &&
								attr.name.name === "height",
						);
						if (!hasWidth || !hasHeight) {
							context.report({
								node,
								messageId: "noWidthHeight",
							});
						}
					}
				}
			},
		};
	},
});
