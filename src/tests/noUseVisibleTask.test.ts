import { ruleTester } from ".";
import { noUseVisibleTask } from "@rules/noUseVisibleTask";

ruleTester.run("no-use-visible-task", noUseVisibleTask, {
	valid: [],

	invalid: [
		{
			name: "Bad practice",
			code: `useVisibleTask$(() => { console.log('Blocks main thread'); });`,
			errors: [{ messageId: "noUseVisibleTask" }],
		},
	],
});
