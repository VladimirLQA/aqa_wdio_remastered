import { browser } from '@wdio/globals';
import { borderColors } from '../data/ui/inputs';

export const addCustomCommands = () => {
  browser.addCommand(
    'toHaveInputBorder',
    async function (
      this: WebdriverIO.Element,
      options: { mode: 'dark' | 'light'; type: 'valid' | 'invalid' },
    ) {
      const { mode, type } = options;
      const elementClass = await this.getAttribute('class');
      const elementCss = (await this.getCSSProperty('border-color')).parsed.hex;

      const expectedClass = type === 'valid' ? 'is-valid' : 'is-invalid';
      const expectedBorderColor = borderColors[mode][type];

      if (!elementClass.includes(expectedClass) || elementCss !== expectedBorderColor) {
        throw new Error(
          `Element "${this.selector}" should have border-color "${expectedBorderColor}" and class "${expectedClass}", but got "${elementCss}" and "${elementClass}"`,
        );
      }
    },
    true, // only for elements
  );
};

// TODO to extend expect matchers (example)
// export const addCustomMatchers = () => {
//   expect.extend({
//     async toHaveInputBorder(element: WebdriverIO.Element, type: 'valid' | 'invalid') {
//       const $el = await element;
//       const elementClass = await $el.getElementAttribute((await $el.getElement()).elementId, 'class');
//       const elementCss = (await $el.getCSSProperty('border-color')).value;

//       const expectedClass = type === 'valid' ? 'is-valid' : 'is-invalid';
//       const expectedBorderColor = borderColors[type];

//       const pass = elementClass.includes(expectedClass) && expectedBorderColor === elementCss;

//       return {
//         message: () =>
//           pass
//             ? `expected element with selector "${$el.selector}" not to have border-color "${expectedBorderColor}" and class "${expectedClass}"`
//             : `expected element with selector "${$el.selector}" to have border-color "${expectedBorderColor}" and class "${expectedClass}"`,
//         pass,
//       };
//     }
//   });

//   browser.addCommand(
//     'toHaveInputBorder',
//     async function (this: WebdriverIO.Element, type: 'valid' | 'invalid') {
//       return expect(this).toHaveInputBorder(type);
//     },
//     true
//   );
// };
