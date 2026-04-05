import { eslintCompatPlugin } from "@oxlint/plugins";
import { jsxATag } from "@rules/jsxATag";
import { jsxImg } from "@rules/jsxImg";
import { jsxNoScriptUrl } from "@rules/jsxNoScriptUrl";
import { loaderLocation } from "@rules/loaderLocation";
import { noReactProps } from "@rules/noReactProps";
import { noUseVisibleTask } from "@rules/noUseVisibleTask";
import { preferClasslist } from "@rules/preferClasslist";
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
		"prefer-classlist": preferClasslist,
		"loader-location": loaderLocation,
	},
});

export default plugin;
