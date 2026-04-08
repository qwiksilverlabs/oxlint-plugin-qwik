import type { ESTree } from '@oxlint/plugins';

export function getProgramBody(node: ESTree.Node) {
	let program = node;
	while (program.type !== 'Program') {
		program = program.parent;
	}
	const body = program.body;
	return body;
}
