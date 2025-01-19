//TODO: npm run test -- --spec="./src/tests/waits.test.ts"

describe('Dynamically loaded elements', async () => {
  const dynamicLoadingSelector = 'a[href="/dynamic_loading"]'; //a[.='Dynamic Loading']
  const linkSelector = (linkName: string) => `a[href="/${linkName}"]`;
  const example1Selector = 'a[href*="1"]'; //a[contains(@href, '1')]
  const example2Selector = 'a[href*="2"]'; //a[contains(@href, '2')]
  const startButtonSelector = 'div#start button'; //div[@id="start"]/button
  const finishLabelSelector = '//div[@id="finish"]/h4'; //'#finish > h4'

  beforeEach(async function () {
    await browser.url('https://the-internet.herokuapp.com/');
  });
  it('Should wait for Example 1 element', async function () {
    const loginLink = $(dynamicLoadingSelector);
    await loginLink.click();
    // await $(example1Selector).waitForExist({
    //   timeout: 5000,
    //   interval: 300,
    //   timeoutMsg: `Example 1 element does not exist after 5 seconds`,
    //   reverse: false,
    // });
    await $(example1Selector).waitForDisplayed({
      timeout: 5000,
      interval: 500,
      timeoutMsg: `Element is not displayed after 2 seconds`,
      reverse: false,
    });
    await $(example1Selector).click();
    const startButton = $(startButtonSelector);
    await startButton.waitForDisplayed();
    await startButton.click();
    await $(finishLabelSelector).waitForDisplayed();
    const actualText = await $(finishLabelSelector).getText();
    expect(actualText).toBe('Hello World!');
  });

  it('Should wait for element enabled', async function () {
    await $(linkSelector('dynamic_controls')).click();
    const enableButtonSelector = 'form#input-example button'; //form[@id="input-example"]/button
    const enableButton = $(enableButtonSelector);
    await enableButton.click();
    const input = $('form#input-example input');
    await input.waitForEnabled();
    await expect(input).toBeEnabled();
    await enableButton.click();
    await enableButton.waitForClickable();
    await expect(enableButton).toBeClickable();
  });

  it('sda', async function () {
    const dynamicLoading = $(linkSelector('dynamic_loading'));
    await dynamicLoading.click();
    await $(example1Selector).waitForDisplayed({
      timeout: 5000,
      interval: 500,
      timeoutMsg: `Element is not displayed after 2 seconds`,
      reverse: false,
    });

    await $(example2Selector).click();

    await browser.waitUntil(
      async () => {
        const button = $('div#start button');
        const isClickable = await button.isClickable();
        const isExisting = await button.isExisting();
        const isDisplayed = await button.isDisplayed();
        return isClickable && isExisting && isDisplayed;
      },
      {
        timeout: 5000,
        timeoutMsg: 'Button is not clickable',
        interval: 500,
      }
    );
  });

  it('Checkbox', async function () {
    await $(linkSelector('checkboxes')).click();
    await $('form#checkboxes').waitForDisplayed();
    const firstCheckboxSelector = 'form#checkboxes input:first-child'; //form#checkboxes input:nth-of-type(1) input
    const checkbox = $(firstCheckboxSelector);
    // const checked = await checkbox.getAttribute("checked");

    await checkbox.click();
    // const checkedAfter = await checkbox.getAttribute("checked");
    await expect(checkbox).toBeChecked();
  });

  it('Checkbox with custom function', async function () {
    await $(linkSelector('checkboxes')).click();
    await $('form#checkboxes').waitForDisplayed();
    const firstCheckboxSelector = 'form#checkboxes input:first-child'; //form#checkboxes input:nth-of-type(1) input
    const lastCheckboxSelector = 'form#checkboxes input:last-child'; //form#checkboxes input:nth-of-type(1) input
    await checkCheckbox(firstCheckboxSelector, true);
    await checkCheckbox(lastCheckboxSelector, false);
    await expect($(firstCheckboxSelector)).toBeChecked();
    await expect($(lastCheckboxSelector)).not.toBeChecked();
  });

  it.only('Dropdown', async function () {
    await $(linkSelector('dropdown')).click();
    const select = $('select#dropdown');
    await select.waitForDisplayed();
    // await select.selectByVisibleText("Option 1");
    // await select.selectByAttribute("value", 2);
    await select.selectByIndex(1);
    await browser.pause(2000);
  });
});

async function checkCheckbox(checkboxSelector: string, toBeChecked: boolean) {
  const checkbox = $(checkboxSelector);
  const isCheckedBefore = await checkbox.getAttribute('checked');
  if (toBeChecked) {
    //if isCheckedBefore === true => return
    //if isCheckedBefore === false => click on checkbox and check for checked attribute
    if (isCheckedBefore) return;

    await checkbox.click();
    await browser.waitUntil(async () => await checkbox.getAttribute('checked'));
  } else {
    if (!isCheckedBefore) return;

    await checkbox.click();
    // await expect(checkbox).not.toBeChecked();
    await browser.waitUntil(async () => !(await checkbox.getAttribute('checked')));
  }
}
