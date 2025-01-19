export const isWebElement = (value: WebdriverIO.Element | string): value is WebdriverIO.Element => {
  return (
    value !== undefined && value !== null && (value as WebdriverIO.Element).selector !== undefined
  );
};

export const getElementSelector = (item: WebdriverIO.Element | string) => {
  if (isWebElement(item)) {
    return item.selector.toString();
  } else {
    return item;
  }
};