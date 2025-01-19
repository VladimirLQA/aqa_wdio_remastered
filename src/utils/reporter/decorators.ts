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

export function logAction<This, Args extends any[], Return>(stepName: string) {
  return function (
    target: (this: This, ...args: Args) => Promise<Return>,
    _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>,
  ) {
    return async function (this: This, ...args: Args): Promise<Return> {
      const [selectorOrElement, value, ..._opt] = args;

      const isSecretArgument = args.find((el) => typeof el === 'object' && 'isSecretValue' in el);
      const isSecretValue = isSecretArgument ? isSecretArgument.isSecretValue : false;

      const newStepName = stepName
        .replace('{selector}', `"${getElementSelector(selectorOrElement)}"`)
        .replace('{text}', `"${isSecretValue ? hideSecretData(value) : value}"`);

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