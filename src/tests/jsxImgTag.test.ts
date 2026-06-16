import { jsxImgTag } from '@rules/jsxImgTag';
import { ruleTester } from '.';

ruleTester.run('jsx-img-tag', jsxImgTag, {
	valid: [
		{
			code: '<img src="https://example.com/photo.jpg" alt="A photo" width={800} height={600} />',
		},
		{
			code: '<img src="//cdn.example.com/photo.jpg" alt="A photo" width={800} height={600} />',
		},
		{ code: '<img src={photo} alt="A photo" width={800} height={600} />' },

		{ code: '<img {...props} />' },
		{ code: '<picture><source srcSet="img.webp" /></picture>' },
		{ code: '<Image src="/photo.jpg" alt="A photo" width={800} height={600} />' },
	],
	invalid: [
		{
			code: '<img alt="A photo" width={800} height={600} />',
			errors: [{ messageId: 'noSrc' }],
		},
		{
			code: '<img src="" alt="A photo" width={800} height={600} />',
			errors: [{ messageId: 'emptySrc' }],
		},
		{
			code: '<img src="" />',
			errors: [
				{ messageId: 'noAlt' },
				{ messageId: 'noWidth' },
				{ messageId: 'noHeight' },
				{ messageId: 'emptySrc' },
			],
		},
		{
			code: '<img src="/photo.jpg" alt="A photo" width={800} height={600} />',
			errors: [{ messageId: 'noLocalSrc' }],
		},
		{
			code: '<img src="/photo.jpg" />',
			errors: [
				{ messageId: 'noAlt' },
				{ messageId: 'noWidth' },
				{ messageId: 'noHeight' },
				{ messageId: 'noLocalSrc' },
			],
		},
		{
			code: '<img src="https://example.com/photo.jpg" width={800} height={600} />',
			errors: [{ messageId: 'noAlt' }],
		},
		{
			code: '<img src="https://example.com/photo.jpg" alt="A photo" height={600} />',
			errors: [{ messageId: 'noWidth' }],
		},
		{
			code: '<img src="https://example.com/photo.jpg" alt="A photo" width={800} />',
			errors: [{ messageId: 'noHeight' }],
		},
		{
			code: '<img src="https://example.com/photo.jpg" alt="A photo" />',
			errors: [{ messageId: 'noWidth' }, { messageId: 'noHeight' }],
		},
		{
			code: '<img src="https://example.com/photo.jpg" />',
			errors: [{ messageId: 'noAlt' }, { messageId: 'noWidth' }, { messageId: 'noHeight' }],
		},
		{
			code: '<img src="https://example.com/photo.jpg" alt="" width={800} height={600} />',
			errors: [{ messageId: 'emptyAlt' }],
		},
		{
			code: '<img src="https://example.com/photo.jpg" alt="" />',
			errors: [
				{ messageId: 'emptyAlt' },
				{ messageId: 'noWidth' },
				{ messageId: 'noHeight' },
			],
		},
	],
});
