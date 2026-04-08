import { jsxATag } from '@rules/jsxATag';
import { ruleTester } from '.';

ruleTester.run('jsx-a-tag', jsxATag, {
	valid: [
		{
			name: 'Standard a tag with href',
			code: `<a href="https://example.com">Link</a>`,
		},
		{
			name: 'A tag with spread attributes',
			code: `<a {...props}>Spread Link</a>`,
		},
	],

	invalid: [
		{
			name: 'A tag completely missing href',
			code: `<a>Missing Href</a>`,
			errors: [{ messageId: 'noHref' }],
		},
		{
			name: 'A tag with other attributes but no href',
			code: `<a className="btn" target="_blank">Missing Href</a>`,
			errors: [{ messageId: 'noHref' }],
		},
	],
});
