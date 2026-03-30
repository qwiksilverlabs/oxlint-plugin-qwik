import { eslintCompatPlugin } from "@oxlint/plugins";
import { jsxATag } from "@rules/jsxATag";
import { jsxImg } from "@rules/jsxImg";

const plugin = eslintCompatPlugin({
	meta: {
		name: "qwik",
	},
	rules: {
		"jsx-a-tag": jsxATag,
		"jsx-img": jsxImg,
	},
});

export default plugin;
