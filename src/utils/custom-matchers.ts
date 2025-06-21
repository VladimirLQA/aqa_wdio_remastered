import { browser } from '@wdio/globals';
import { borderColors } from '../data/ui/inputs.ts';

export const addCustomCommands = () => {
  browser.addCommand(
    'toHaveInputBorder',
    async function (
      this: WebdriverIO.Element,
      { mode, type }: { mode: 'dark' | 'light'; type: 'valid' | 'invalid' },
    ) {
      const expectedClass = type === 'valid' ? 'is-valid' : 'is-invalid';
      const expectedBorderColor = borderColors[mode][type];
      const elementCss = await this.getCSSProperty('border-color');
      const elementClass = await this.getAttribute('class');
      const pass = elementClass.includes(expectedClass) && elementCss.parsed.hex === expectedBorderColor;
      if (!pass) {
        throw new Error(
          `Element "${JSON.stringify(this.selector)}}" should have border-color "${expectedBorderColor}" and class "${expectedClass}", but got "${elementCss.parsed.hex}" and "${elementClass}"`,
        );
      }
    },
    true,
  );
};
