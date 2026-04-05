import { ruleTester } from ".";
import { loaderLocation } from "@rules/loaderLocation";

ruleTester.run("loader-location", loaderLocation, {
	valid: [
		{
			name: "Valid routeLoader$ in index.tsx",
			code: `export const useMyLoader = routeLoader$(() => { return { data: 1 }; });`,
			filename: "src/routes/index.tsx",
		},
		{
			name: "Valid routeLoader$ in layout.tsx",
			code: `export const useMyLoader = routeLoader$(() => { return { success: true }; });`,
			filename: "src/routes/layout.tsx",
		},
		{
			name: "Valid routeLoader$ with separate export statement",
			code: `
                const useMyLoader = routeLoader$(() => {});
                export { useMyLoader };
            `,
			filename: "src/routes/index.tsx",
		},
	],

	invalid: [
		{
			name: "Invalid routeLoader$ declared outside of routes boundary",
			code: `export const useMyLoader = routeLoader$(() => {});`,
			filename: "src/components/button.tsx",
			errors: [{ messageId: "invalidLoaderLocation" }],
		},
		{
			name: "Invalid routeLoader$ in non-boundary file inside routes (utils.tsx)",
			code: `export const useMyLoader = routeLoader$(() => {});`,
			filename: "src/routes/utils.tsx",
			errors: [{ messageId: "invalidLoaderLocation" }],
		},
		{
			name: "Assigned but not exported routeLoader$",
			code: `const useMyLoader = routeLoader$(() => {});`,
			filename: "src/routes/index.tsx",
			errors: [{ messageId: "missingExport" }],
		},
		{
			name: "Exported variable name does not start with 'use'",
			code: `export const myLoader = routeLoader$(() => {});`,
			filename: "src/routes/index.tsx",
			errors: [
				{
					messageId: "wrongName",
					data: { fnName: "routeLoader$", id: "myLoader", fixed: "useMyLoader" },
				},
			],
		},
		{
			name: "Argument is an identifier instead of inline arrow function",
			code: `
                const myLogic = () => {};
                export const useMyLoader = routeLoader$(myLogic);
            `,
			filename: "src/routes/index.tsx",
			errors: [
				{
					messageId: "recommendedValue",
					data: { fnName: "routeLoader$", id: "useMyLoader", arg: "myLogic" },
				},
			],
		},
		{
			name: "Fails in default routes dir when custom routesDir option is set to src/app",
			code: `export const useMyLoader = routeLoader$(() => {});`,
			filename: "src/routes/index.tsx",
			options: [{ routesDir: "src/app" }],
			errors: [{ messageId: "invalidLoaderLocation" }],
		},
	],
});
