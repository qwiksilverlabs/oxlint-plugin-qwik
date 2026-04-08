import { type ESTree } from '@oxlint/plugins';

export function propName(node: ESTree.JSXAttribute) {
	if (node.name.type === 'JSXNamespacedName')
		return `${node.name.namespace.name}:${node.name.name.name}`;

	return node.name.name;
}
