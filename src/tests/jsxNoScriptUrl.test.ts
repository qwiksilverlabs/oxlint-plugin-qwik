import { jsxNoScriptUrl } from '@rules/jsxNoScriptUrl';
import { ruleTester } from '.';

ruleTester.run('jsx-no-script-url', jsxNoScriptUrl, {
	valid: [
		{
			name: 'Good practice',
			code: `<button onClick$={() => alert('open the door please')}>ring</button>`,
		},
		{
			name: 'Spaces between protocol letters do not match',
			code: `<a href={"j a v a s c r i p t:"}>ring</a>`,
		},
		{
			name: 'Control chars other than carriage return, newline, and tab do not match',
			code: String.raw`<a href={"ja\u0000vascript:"}>ring</a>`,
		},
		{
			name: 'Space before colon does not match',
			code: `<a href={"javascript :"}>ring</a>`,
		},
	],

	invalid: [
		{
			name: 'Bad practice',
			code: `<button onClick$="javascript:alert('open the door please')">ring</button>`,
			errors: [{ messageId: 'noJSURL' }],
		},
		{
			name: 'Mixed case with leading control chars and embedded whitespace still matches',
			code: String.raw`<a href={" \u0000Ja\r\nVa\tSc\rRi\tPt:"}>ring</a>`,
			errors: [{ messageId: 'noJSURL' }],
		},
	],
});
