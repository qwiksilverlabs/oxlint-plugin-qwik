import { eslintCompatPlugin } from "@oxlint/plugins";
import { jsxATag } from "@rules/jsxATag";
import { jsxImg } from "@rules/jsxImg";
import { jsxNoScriptUrl } from "@rules/jsxNoScriptUrl";
import { noReactProps } from "@rules/noReactProps";
import { noUseVisibleTask } from "@rules/noUseVisibleTask";
import { useMethodUsage } from "@rules/useMethodUsage";

const plugin = eslintCompatPlugin({
	meta: {
		name: "qwik",
	},
	rules: {
		"jsx-a-tag": jsxATag,
		"jsx-img": jsxImg,
		"use-method-usage": useMethodUsage,
		"no-react-props": noReactProps,
		"no-use-visible-task": noUseVisibleTask,
		"jsx-no-script-url": jsxNoScriptUrl,
	},
});

export default plugin;

export const recommendedRules = {
	"qwik/jsx-a-tag": "warn",
	"qwik/jsx-img": "warn",
	"qwik/use-method-usage": "error",
	"qwik/no-react-props": "error",
	"qwik/no-use-visible-task": "warn",
	"qwik/jsx-no-script-url": "warn",

	"react/jsx-key": "error",
};

export const strictRules = {
	"qwik/jsx-a-tag": "error",
	"qwik/jsx-img": "error",
	"qwik/use-method-usage": "error",
	"qwik/no-react-props": "error",
	"qwik/no-use-visible-task": "warn",
	"qwik/jsx-no-script-url": "error",

	"react/jsx-key": "error",
};
