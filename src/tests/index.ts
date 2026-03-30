import { RuleTester } from "oxlint/plugins-dev";
import * as vitest from "vitest";

RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export const ruleTester = new RuleTester({
	languageOptions: {
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
});
