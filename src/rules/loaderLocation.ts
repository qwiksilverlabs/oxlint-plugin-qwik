import { defineRule, type ESTree } from '@oxlint/plugins';
import { normalize } from 'pathe';
import { getProgramBody } from '../utils';

export const ROUTE_FNS: Record<string, boolean> = {
	loader$: true,
	routeLoader$: true,
	routeAction$: true,
	routeHandler$: true,
};

export const LINTER_FNS: Record<string, boolean> = {
	...ROUTE_FNS,
	action$: true,
	globalAction$: true,
};

export const loaderLocation = defineRule({
	meta: {
		type: 'problem',
		docs: {
			description: 'Detect declaration location of loader$.',
			recommended: true,
			url: 'https://qwik.dev/docs/advanced/eslint/#loader-location',
		},
		schema: [
			{
				type: 'object',
				properties: {
					routesDir: {
						type: 'string',
						default: 'src/routes',
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			invalidLoaderLocation: `'{{fnName}}() are typically declared in route boundary files such as layout.tsx, index.tsx and plugin.tsx inside the {{routesDir}} directory
(docs: https://qwik.dev/docs/route-loader/).

This {{fnName}}() is declared outside of the route boundaries. This may be useful when you want to create reusable logic or a library. In such a case, it is essential that this function is re-exported from within the router boundary otherwise it will not run.
(docs: https://qwik.dev/docs/re-exporting-loaders/).

If you understand this, you can disable this warning with:
// eslint-disable-next-line qwik/loader-location
`,
			missingExport:
				'The return of `{{fnName}}()` needs to be exported in the same module, like this\n```\nexport const {{id}} = {{fnName}}(() => { ... });\n```',
			wrongName:
				'The named export of `{{fnName}}()` needs to follow the `use*` naming convention. It must start with `use`, like this:\n```\nexport const {{fixed}} = {{fnName}}(() => { ... });\n```\nInstead it was named:\n```\nexport const {{id}} = ...\n```',
			recommendedValue:
				'For `{{fnName}}()` it is recommended to inline the arrow function. Instead of:\n```\nexport const {{id}} = {{fnName}}({{arg}});\n```\nDo this:\n```\nexport const {{id}} = {{fnName}}(() => { ...logic here... });\n```\nThis will help the optimizer make sure that no server code is leaked to the client build.',
		},
	},
	create(context) {
		const routesDir =
			(context.options?.[0] as { routesDir: string } | undefined)?.routesDir ?? 'src/routes';
		const path = normalize(context.filename);
		const isLayout = /\/layout(|!|-.+)\.(j|t)sx?$/.test(path);
		const isIndex = /\/index(|!|@.+)\.(j|t)sx?$/.test(path);
		const isPlugin = /\/plugin(|@.+)\.(j|t)sx?$/.test(path);
		const isInsideRoutes = new RegExp(`/${routesDir}/`).test(path);

		const canContainLoader = isInsideRoutes && (isIndex || isLayout || isPlugin);

		return {
			CallExpression(node) {
				if (node.callee.type !== 'Identifier') {
					return;
				}

				const fnName = node.callee.name;

				if (!LINTER_FNS[fnName]) {
					return;
				}

				if (!canContainLoader && ROUTE_FNS[fnName]) {
					context.report({
						node: node.callee,
						messageId: 'invalidLoaderLocation',
						data: {
							routesDir,
							fnName,
							path,
						},
					});
					return;
				}
				const variableDeclarator = node.parent;
				if (variableDeclarator.type !== 'VariableDeclarator') {
					context.report({
						node: node.callee,
						messageId: 'missingExport',
						data: {
							fnName,
							id: 'useStuff',
						},
					});
					return;
				}
				if (variableDeclarator.id.type !== 'Identifier') {
					context.report({
						node: node.callee,
						messageId: 'missingExport',
						data: {
							fnName,
							id: 'useStuff',
						},
					});
					return;
				}
				if (!variableDeclarator.id.name.startsWith('use')) {
					const fixed =
						'use' +
						variableDeclarator.id.name[0]!.toUpperCase() +
						variableDeclarator.id.name.slice(1);
					context.report({
						node: variableDeclarator.id,
						messageId: 'wrongName',
						data: {
							fnName,
							id: variableDeclarator.id.name,
							fixed,
						},
					});
					return;
				}
				if (!isExported(variableDeclarator)) {
					context.report({
						node: variableDeclarator.id,
						messageId: 'missingExport',
						data: {
							fnName,
							id: variableDeclarator.id.name,
						},
					});
					return;
				}
				if (node.arguments.length > 0 && node.arguments[0]?.type === 'Identifier') {
					context.report({
						node: node.arguments[0],
						messageId: 'recommendedValue',
						data: {
							fnName,
							id: variableDeclarator.id.name,
							arg: node.arguments[0].name,
						},
					});
					return;
				}
			},
		};
	},
});

function isExported(variableDeclarator: ESTree.Node): boolean {
	if (variableDeclarator.parent?.parent?.type === 'ExportNamedDeclaration') {
		return true;
	}

	if (variableDeclarator.type === 'VariableDeclarator') {
		const id = variableDeclarator.id;
		if ('name' in id) {
			const name = id.name;
			const body = getProgramBody(variableDeclarator);
			for (let idx = 0; idx < body.length; idx++) {
				const node = body[idx];
				if (node?.type == 'ExportNamedDeclaration') {
					const specifiers = node.specifiers;
					for (let specIdx = 0; specIdx < specifiers.length; specIdx++) {
						const exportNode = specifiers[specIdx];
						if (exportNode?.type == 'ExportSpecifier') {
							if (
								exportNode.exported.type == 'Identifier' &&
								exportNode.exported.name === name
							) {
								return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}
