import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { hideSecretData } from '../string/hide.ts';
import { camelCaseToReadableString, getElementSelector } from '../helpers.ts';
import logger from '../logger/index.ts';

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
        allure.startStep(`Step: ${stepName}`);
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
  args.find((el) => typeof el === 'object' && 'isSecretValue' in el) as
    | { isSecretValue: boolean }
    | undefined;

export const getValueOfSecret = (arg: { isSecretValue: boolean } | undefined) => arg && arg.isSecretValue;

export const replaceStepNameParts = (stepName: string, args: any[]) => {
  const [selectorOrElement, value, ..._opt] = args;
  const secretArgument = getArgumentWithSecretProperty(args);

  return stepName
    .replace('{selector}', `"${getElementSelector(selectorOrElement)}"`)
    .replace('{text}', `"${getValueOfSecret(secretArgument) ? hideSecretData(value) : value}"`)
    .replace('{url}', `"${selectorOrElement}"`)
    .replace(
      '{cookies}',
      `"${Array.isArray(selectorOrElement) && (selectorOrElement as unknown as string[]).join(' ; ')}"`,
    )
    .replace('{cookie}', `"${selectorOrElement}"`);
};

export function logAction<This extends object, Args extends any[], Return>(action?: string) {
  return function (
    target: (this: This, ...args: Args) => Promise<Return>,
    _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>,
  ) {
    return async function (this: This, ...args: Args): Promise<Return> {
      const pageName: string = this.constructor.name;
      const actionName = action || camelCaseToReadableString(<string>_context.name);
      const actionDescription: string = ` -- I ${actionName} on the '${pageName}' page`;
      // TODO add console logs based on cli args
      const newStepName = replaceStepNameParts(actionDescription, args);
      logger.info(newStepName);
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
