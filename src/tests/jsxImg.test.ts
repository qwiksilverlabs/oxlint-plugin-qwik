import { jsxImg } from "@rules/jsxImg";
import { ruleTester } from ".";

ruleTester.run("jsx-img", jsxImg, {
	valid: [
		{
			name: "Serving images from local",
			code: `import Image from '~/media/image.png';<Image />`,
		},
		{
			name: "Has width and height attribute",
			code: `<img width="200" height="600" src="https://avatars.githubusercontent.com/u/271006721" />`,
		},
	],

	invalid: [
		{
			name: "Missing width and height attributes",
			code: `<img src="https://avatars.githubusercontent.com/u/271006721" />`,
			errors: [{ messageId: "noWidthHeight" }],
		},
		{
			name: "Serving images from public",
			code: `<img src="/image.png" />`,
			errors: [{ messageId: "noLocalSrc" }],
		},
	],
});
