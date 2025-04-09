import { logAction } from '../../utils/reporter/decorators';

export type ActionContext = {
  isSecretValue?: boolean;
};

type SelectorOrLocator = string | WebdriverIO.Element;

function isStringSelector(selector: SelectorOrLocator): selector is string {
  return typeof selector === 'string';
}

export abstract class ActionsPage {
  async findElement(selector: SelectorOrLocator): Promise<WebdriverIO.Element> {
    return isStringSelector(selector) ? $(selector).getElement() : selector;
  }

  async findArrayOfElements(selector: SelectorOrLocator) {
    return await $$(selector).getElements();
  }

  async waitForDisplayed(selector: SelectorOrLocator, reverse = false, timeout = 30000) {
    const element = await this.findElement(selector);
    await element.waitForDisplayed({
      reverse,
      timeout,
    });
    return element;
  }

  @logAction('Click on element with selector {selector}')
  async click(selector: string) {
    const element = await this.waitForDisplayed(selector);
    await element.waitForEnabled();
    await element.isClickable();
    await element.click();
  }

  @logAction('Set {text} into element with selector {selector}')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setValue(selector: SelectorOrLocator, value: string | number, _context?: ActionContext) {
    const input = await this.waitForDisplayed(selector);
    await input.setValue(value);
  }

  @logAction('Select dropdown value from {selector}')
  async selectDropdownValue(selector: SelectorOrLocator, value: string | number) {
    const select = await this.waitForDisplayed(selector);
    await select.selectByVisibleText(value);
  }

  @logAction('Get value from {selector}')
  async getValue(selector: SelectorOrLocator) {
    const element = await this.waitForDisplayed(selector);
    const value = await element.getValue();
    return value;
  }

  @logAction('Get text from {selector}')
  async getText(selector: SelectorOrLocator) {
    const element = await this.waitForDisplayed(selector);
    const text = await element.getText();
    return text;
  }

  @logAction('Open page')
  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }

  async getCookie(cookieName: string) {
    return (await browser.getCookies(cookieName))[0];
  }
}
