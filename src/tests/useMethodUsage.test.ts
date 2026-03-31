import { useMethodUsage } from "@rules/useMethodUsage";
import { ruleTester } from ".";

const useWrongFunctionGood = `
export const Counter = component$(() => {
  const count = useSignal(0);
});
`.trim();

const useWrongFunctionGood2 = `
export const useCounter = () => {
  const count = useSignal(0);
  return count;
};
`.trim();

const useWrongFunctionBad = `
export const Counter = (() => {
  const count = useSignal(0);
});
`.trim();

ruleTester.run("use-method-usage", useMethodUsage, {
	valid: [
		{
			name: "call inside component",
			code: useWrongFunctionGood,
		},
		{
			name: "call inside hook",
			code: useWrongFunctionGood2,
		},
	],

	invalid: [
		{
			name: "call not inside component or hook",
			code: useWrongFunctionBad,
			errors: [{ messageId: "useWrongFunction" }],
		},
	],
});
