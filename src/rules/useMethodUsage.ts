import { defineRule } from "@oxlint/plugins";

export const useMethodUsage = defineRule({
	meta: {
		type: "problem",
		docs: {
			description: "Detect invalid use of use hooks.",
			category: "Variables",
			recommended: true,
			url: "https://qwik.dev/docs/advanced/eslint/#use-method-usage",
		},
		messages: {
			useWrongFunction: "Calling use* methods in wrong function.",
		},
	},

	create(context) {
		const sourceCode = context.sourceCode;

		const modifyJsxSource = sourceCode
			.getAllComments()
			.some((c) => c.value.includes("@jsxImportSource"));

		if (modifyJsxSource) {
			return {};
		}

		return {
			"CallExpression[callee.name=/^use[A-Z]/]"(node) {
				let parent = node.parent;

				while (parent) {
					const type = parent.type;

					switch (type) {
						case "VariableDeclarator":
						case "VariableDeclaration":
						case "ExpressionStatement":
						case "MemberExpression":
						case "BinaryExpression":
						case "UnaryExpression":
						case "ReturnStatement":
						case "BlockStatement":
						case "ChainExpression":
						case "Property":
						case "ObjectExpression":
						case "CallExpression":
						case "TSAsExpression":
							break;
						case "ArrowFunctionExpression":
						case "FunctionExpression":
							if (parent.parent.type === "VariableDeclarator") {
								if (
									parent.parent.id?.type === "Identifier" &&
									parent.parent.id.name.startsWith("use")
								) {
									return;
								}
							}
							if (parent.parent.type === "CallExpression") {
								if (
									parent.parent.callee.type === "Identifier" &&
									(parent.parent.callee.name === "component$" ||
										parent.parent.callee.name === "renderHook")
								) {
									return;
								}
							}
							context.report({
								node,
								messageId: "useWrongFunction",
							});
							return;
						case "FunctionDeclaration":
							if (!parent.id?.name.startsWith("use")) {
								context.report({
									node,
									messageId: "useWrongFunction",
								});
							}
							return;
						default:
							context.report({
								node,
								messageId: "useWrongFunction",
							});
							return;
					}

					parent = parent.parent;
				}
			},
		};
	},
});
