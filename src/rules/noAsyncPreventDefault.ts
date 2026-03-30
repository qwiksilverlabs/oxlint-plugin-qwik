import { defineRule } from "@oxlint/plugins";

export const noAsyncPreventDefault = defineRule({
	meta: {
		type: "suggestion",
		docs: {
			description: "Detect preventDefault in $(()=>{}) Async Functions.",
			recommended: true,
			url: "https://qwik.dev/docs/components/events/#preventdefault--stoppropagation",
		},
		messages: {
			noAsyncPreventDefault:
				"This is an asynchronous function and does not support preventDefault. \nUse preventDefault attributes instead",
		},
	},
	createOnce(context) {
		return {
			"CallExpression[callee.property.name='preventDefault']"(node) {
				let parent = node.parent;
				while (parent) {
					if (
						parent.type === "CallExpression" &&
						parent.callee &&
						parent.callee.type === "Identifier" &&
						parent.callee.name === "$"
					) {
						context.report({
							node,
							messageId: "noAsyncPreventDefault",
						});
						break;
					}
					parent = parent.parent;
				}
			},
		};
	},
});
