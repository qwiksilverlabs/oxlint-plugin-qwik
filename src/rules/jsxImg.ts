import { defineRule, type ESTree } from "@oxlint/plugins";

export const jsxImg = defineRule({
	meta: {
		defaultOptions: [],
		type: "problem",
		docs: {
			description:
				"For performance reasons, always provide width and height attributes for <img> elements, it will help to prevent layout shifts.",
			recommended: "warn",
		},
		fixable: "code",
		schema: [],
		messages: {
			noLocalSrc: `Local images can be optimized by importing using ESM, like this:

  import {{importName}} from '{{importSrc}}';
  <{{importName}} />

See https://qwik.dev/docs/integrations/image-optimization/#responsive-images`,
			noWidthHeight:
				'Missing "width" or "height" attribute.\nFor performance reasons, always provide width and height attributes for <img> elements, it will prevent layout shifts, boosting performance and UX.',
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
									const importSrc = `~/media${literal.value}?jsx`;
									const importName = imgImportName(literal.value);
									context.report({
										node: src,
										messageId: "noLocalSrc",
										data: {
											importSrc,
											importName,
										},
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
								node: node as any,
								messageId: "noWidthHeight",
							});
						}
					}
				}
			},
		};
	},
});

function imgImportName(value: string) {
	const dot = value.lastIndexOf(".");
	const slash = value.lastIndexOf("/");
	value = value.substring(slash + 1, dot);
	return `Img${toPascalCase(value)}`;
}

function toPascalCase(value: string) {
	return `${value}`
		.toLowerCase()
		.replace(new RegExp(/[-_]+/, "g"), " ")
		.replace(new RegExp(/[^\w\s]/, "g"), "")
		.replace(new RegExp(/\s+(.)(\w*)/, "g"), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
		.replace(new RegExp(/\w/), (s) => s.toUpperCase());
}
