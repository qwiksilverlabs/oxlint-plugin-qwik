import { ruleTester } from ".";
import { preferClasslist } from "@rules/preferClasslist";

const goodPractice = `
import { component$ } from '@builder.io/qwik';
import styles from './MyComponent.module.css';
 
export default component$((props) => {
  // Array syntax example
  return <div class={[
    styles.container, 
    'p-8', 
    props.isHighAttention ? 'text-green-500' : 'text-slate-500',
    { active: true}
  ]}>Hello world</div>;
 
  // Object syntax example
  return <div class={{  
    'text-green-500': props.isHighAttention,
    'p-4': true
  }}>Hello world</div>;
});
`.trim();

const badPractice = `
import { component$ } from '@builder.io/qwik';
import classnames from 'classnames';
import styles from './MyComponent.module.css';
 
export default component$((props) => {
  return <div class={classnames(
    styles.container, 
    'p-8', 
    {
      'text-green-500' : props.isHighAttention,
      'text-slate-500' : !props.isHighAttention,
    },
    { active: true}
  )}>Hello world</div>;
});
`.trim();

ruleTester.run("prefer-classlist", preferClasslist, {
	valid: [
		{
			name: "Good practice",
			code: goodPractice,
		},
	],

	invalid: [
		{
			name: "Bad practice",
			code: badPractice,
			errors: [{ messageId: "preferClasslist" }],
		},
	],
});
