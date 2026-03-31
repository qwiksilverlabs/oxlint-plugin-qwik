import { eslintCompatPlugin } from "@oxlint/plugins";
import { jsxATag } from "@rules/jsxATag";
import { jsxImg } from "@rules/jsxImg";
import { useMethodUsage } from "@rules/useMethodUsage";

const plugin = eslintCompatPlugin({
	meta: {
		name: "qwik",
	},
	rules: {
		"jsx-a-tag": jsxATag,
		"jsx-img": jsxImg,
		"use-method-usage": useMethodUsage,
	},
});

export default plugin;
