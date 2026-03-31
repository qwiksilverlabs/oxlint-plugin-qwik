import { jsxNoScriptUrl } from "@rules/jsxNoScriptUrl";
import { ruleTester } from ".";

ruleTester.run("jsx-no-script-url", jsxNoScriptUrl, {
	valid: [
		{
			name: "Good practice",
			code: `<button onClick$={() => alert('open the door please')}>ring</button>`,
		},
	],

	invalid: [
		{
			name: "Bad practice",
			code: `<button onClick$="javascript:alert('open the door please')">ring</button>`,
			errors: [{ messageId: "noJSURL" }],
		},
	],
});
