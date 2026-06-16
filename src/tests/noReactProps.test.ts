import { ruleTester } from '.';
import { noReactProps } from '@rules/noReactProps';

ruleTester.run('no-react-props', noReactProps, {
	valid: [
		{
			name: 'Uses "class" instead of "className"',
			code: `<div class="foo" />`,
		},
		{
			name: 'Uses "for" instead of "htmlFor"',
			code: `<label for="name">Name</label>`,
		},
		{
			name: 'Unrelated props are allowed',
			code: `<input type="text" id="name" />`,
		},
		{
			name: 'Spread attributes are ignored',
			code: `<div {...props} className="foo" />`,
		},
		{
			name: 'Component (uppercase) with className is ignored',
			code: `<MyComponent className="foo" />`,
		},
		{
			name: 'JSXMemberExpression with className is ignored',
			code: `<Foo.Bar className="foo" />`,
		},
	],
	invalid: [
		{
			name: 'className should be class',
			code: `<div className="foo" />`,
			errors: [{ messageId: 'preferClass' }],
			output: `<div class="foo" />`,
		},
		{
			name: 'htmlFor should be for',
			code: `<label htmlFor="name">Name</label>`,
			errors: [{ messageId: 'preferFor' }],
			output: `<label for="name">Name</label>`,
		},
		{
			name: 'Both className and htmlFor reported',
			code: `<label className="foo" htmlFor="name">Name</label>`,
			errors: [{ messageId: 'preferClass' }, { messageId: 'preferFor' }],
			output: `<label class="foo" for="name">Name</label>`,
		},
		{
			name: 'className on a native element with other valid props',
			code: `<input type="text" className="bar" />`,
			errors: [{ messageId: 'preferClass' }],
			output: `<input type="text" class="bar" />`,
		},
	],
});
