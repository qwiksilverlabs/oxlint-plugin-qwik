import { defineRule } from "@oxlint/plugins";

const isJavaScriptProtocol =
	// oxlint-disable-next-line no-control-regex
	/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

export const jsxNoScriptUrl = defineRule({
	meta: {
		type: "problem",
		docs: {
			recommended: "error",
			description: "Disallow javascript: URLs.",
			url: "https://qwik.dev/docs/advanced/eslint/#jsx-no-script-url",
		},
		schema: [],
		messages: {
			noJSURL:
				"For security, don't use javascript: URLs. Use event handlers instead if you can.",
		},
	},

	create(context) {
		return {
			JSXAttribute(node) {
				if (node.name.type === "JSXIdentifier" && node.value) {
					let staticValue;

					switch (node.value.type) {
						case "Literal":
							staticValue = node.value.value;
							break;

						case "JSXExpressionContainer":
							const expr = node.value.expression;

							if (expr.type === "Literal") {
								staticValue = expr.value;
							} else if (expr.type === "TemplateLiteral" && expr.quasis.length > 0) {
								staticValue = expr.quasis[0]?.value.cooked;
							}
							break;
					}

					if (typeof staticValue === "string" && isJavaScriptProtocol.test(staticValue)) {
						context.report({
							node: node.value,
							messageId: "noJSURL",
						});
					}
				}
			},
		};
	},
});
