import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { hideSecretData } from '../string/hide';
import { getElementSelector } from '../helpers';

/*
  https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators
*/
export function logStep<This, Args extends any[], Return>(stepName: string) {
  return function (
    target: (this: This, ...args: Args) => Promise<Return>,
    _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>,
  ) {
    return async function (this: This, ...args: Args): Promise<Return> {
      let res: any;
      try {
        allure.startStep(stepName);
        res = await target.apply(this, args);
        allure.endStep();
        return res;
      } catch (e) {
        allure.endStep(Status.FAILED);
        throw e;
      }
    };
  };
}

export const getArgumentWithSecretProperty = (args: object[]) =>
  args.find((el) =>
    typeof el === 'object' && 'isSecretValue' in el) as { isSecretValue: boolean } | undefined;

export const getValueOfSecret = (arg: { isSecretValue: boolean } | undefined) =>
  arg && arg.isSecretValue;

export const replaceStepNameParts = (stepName: string, args: any[]) => {
  const [selectorOrElement, value, ..._opt] = args;
  const secretArgument = getArgumentWithSecretProperty(args);

  return stepName
    .replace('{selector}', `"${getElementSelector(selectorOrElement)}"`)
    .replace('{text}', `"${getValueOfSecret(secretArgument) ? hideSecretData(value) : value}"`);
};

export function logAction<This, Args extends any[], Return>(stepName: string) {
  return function (
    target: (this: This, ...args: Args) => Promise<Return>,
    _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>,
  ) {
    return async function (this: This, ...args: Args): Promise<Return> {
      const newStepName = replaceStepNameParts(stepName, args);

      try {
        allure.startStep(newStepName);
        const result = await target.apply(this, args);
        allure.endStep();
        return result;
      } catch (error) {
        allure.endStep(Status.FAILED);
        throw error;
      }
    };
  };
}
