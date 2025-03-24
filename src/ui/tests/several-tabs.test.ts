describe('Tabs testing', () => {
  it('Controlling tabs', async () => {
    await browser.newWindow('https://anatoly-karpovich.github.io/aqa-course-project/#', { type: 'tab' });
    await browser.newWindow('https://google.com', { type: 'tab' });
    await browser.newWindow('https://github.com', { type: 'tab' });

    // Отримуємо список усіх вкладок
    const [salesPortalTab, googleTab, gitHubTab] = await browser.getWindowHandles();
    const tabs = await browser.getWindowHandles();

    // Перевіряємо кількість вкладок
    expect(tabs.length).toBe(3);

    // Переключаємося між вкладками та перевіряємо URL
    await browser.switchToWindow(googleTab);
    await expect(browser).toHaveUrl('https://google.com/');

    await browser.switchToWindow(gitHubTab);
    await expect(browser).toHaveUrl('https://github.com/');
  });

  xit('Open tab', async () => {
    await browser.executeScript('window.open("https://google.com");', []);
  });
});