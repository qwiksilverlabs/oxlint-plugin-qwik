import { ruleTester } from '.';
import { noReactProps } from '@rules/noReactProps';

ruleTester.run('no-react-props', noReactProps, {
	valid: [
		{
			name: 'Good practice',
			code: `<MyReactComponent class="foo" for="#password" />;`,
		},
	],

	invalid: [
		{
			name: 'Bad practice',
			code: `<MyReactComponent className="foo" htmlFor="#password" />;`,
			output: `<MyReactComponent class="foo" for="#password" />;`,
			errors: [{ messageId: 'prefer' }, { messageId: 'prefer' }],
		},
	],
});
