import { jsxATag } from '@rules/jsxATag';
import { ruleTester } from '.';

ruleTester.run('jsx-a-tag', jsxATag, {
	valid: [
		{
			name: 'Standard a tag with href and text content',
			code: `<a href="https://example.com">Link</a>`,
		},
		{
			name: 'A tag with spread attributes',
			code: `<a {...props}>Spread Link</a>`,
		},
		{
			name: 'A tag with ariaLabel and no text content',
			code: `<a href="/home" ariaLabel="Home"><img src="icon.png" /></a>`,
		},
		{
			name: 'A tag with nested text content',
			code: `<a href="/page"><span>Click here</span></a>`,
		},
		{
			name: 'A tag with dynamic href',
			code: `<a href={url}>Dynamic Link</a>`,
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
			code: `<a class="btn" target="_blank">Missing Href</a>`,
			errors: [{ messageId: 'noHref' }],
		},
		{
			name: 'A tag with empty string href',
			code: `<a href="">Empty Href</a>`,
			errors: [{ messageId: 'emptyHref' }],
		},
		{
			name: 'A tag with no text content and no ariaLabel',
			code: `<a href="/home"><img src="icon.png" /></a>`,
			errors: [{ messageId: 'missingAriaLabel' }],
		},
		{
			name: 'A tag with whitespace-only text content and no ariaLabel',
			code: `<a href="/home">   </a>`,
			errors: [{ messageId: 'missingAriaLabel' }],
		},
	],
});
