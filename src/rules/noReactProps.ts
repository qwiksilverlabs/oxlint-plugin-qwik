import { defineRule, type Fixer } from "@oxlint/plugins";

const reactSpecificProps = [
	{ from: "className", to: "class" },
	{ from: "htmlFor", to: "for" },
];

const domElementRegex = /^[a-z]/;
export const isDOMElementName = (name: string): boolean => domElementRegex.test(name);

export const noReactProps = defineRule({
	meta: {
		type: "problem",
		docs: {
			recommended: "warn",
			description: "Disallow usage of React-specific `className`/`htmlFor` props.",
			url: "https://qwik.dev/docs/advanced/eslint/#no-react-props",
		},
		fixable: "code",
		schema: [],
		messages: {
			prefer: "Prefer the `{{ to }}` prop over the deprecated `{{ from }}` prop.",
		},
	},

	create(context) {
		const modifyJsxSource = context.sourceCode
			.getAllComments()
			.some((c) => c.value.includes("@jsxImportSource"));
		if (modifyJsxSource) {
			return {};
		}

		return {
			JSXOpeningElement(node: any) {
				for (const { from, to } of reactSpecificProps) {
					const classNameAttribute = node.attributes.find(
						(attr: any) =>
							attr.type === "JSXAttribute" &&
							attr.name.type === "JSXIdentifier" &&
							attr.name.name === from,
					);

					if (classNameAttribute && classNameAttribute.type === "JSXAttribute") {
						const hasTargetProp = node.attributes.some(
							(attr: any) =>
								attr.type === "JSXAttribute" &&
								attr.name.type === "JSXIdentifier" &&
								attr.name.name === to,
						);

						const fix = !hasTargetProp
							? (fixer: Fixer) => fixer.replaceText(classNameAttribute.name, to)
							: undefined;

						context.report({
							node: classNameAttribute,
							messageId: "prefer",
							data: { from, to },
							fix,
						});
					}
				}
			},
		};
	},
});
