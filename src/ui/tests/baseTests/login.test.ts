//TODO: npm run test -- --spec="./src/tests/login.test.ts"

interface ILogin {
  title: string;
  subheader: string;
  usernameLabel: string;
  passwordLabel: string;
  button: string;
}

describe("[UI] Login", () => {
  const validUserName = "tomsmith";
  const invalidUsername = "tomsmithasdasd";
  const validPassword = "SuperSecretPassword!";
  const invalidPassword = "SuperSecretPassword!asdasd";
  const successNotification = "You logged into a secure area!";
  const failedNotification = "Your username is invalid!";
  const successLogoutNotification = "You logged out of the secure area!";

  const loginLinkSelector = 'a[href="/login"]'; //a[@href="/login"]
  const passwordInputSelector = "#password"; //input[@id="password"]
  const usernameInputSelector = "#username"; //input[@id="username"]
  const loginButtonSelector = '//button[@class="radius"]'; //.radius
  const loginNotificationSelector = "#flash"; //*[@id="flash"]
  const logoutButtonSelector = 'a[href="/logout"]'; //a[contains(@class, "button")]
  const loginPageSelectors: ILogin = {
    title: "h2",
    subheader: ".subheader", ////*[@class="subheader"]
    usernameLabel: 'label[for="username"]', //label[@for="username"]
    passwordLabel: 'label[for="password"]', //label[@for="password"]
    button: ".radius",
  };

  const loginPageData: ILogin = {
    title: "Login Page",
    subheader:
      "This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.",
    passwordLabel: "Password",
    usernameLabel: "Username",
    button: "Login",
  };

  beforeEach(async function () {
    await browser.url("https://the-internet.herokuapp.com/");
    const loginLink = $(loginLinkSelector);
    await loginLink.click();
  });

  it("Should login with valid credentials", async function () {
    // await browser.pause(5000);
    // await browser.setTimeout({
    //   pageLoad: 10000,
    //   script: 60000,
    //   implicit: 5000,
    // });
    await $(usernameInputSelector).setValue(validUserName);
    await $(passwordInputSelector).setValue(validPassword);
    await $(loginButtonSelector).click();
    const actualText = await $(loginNotificationSelector).getText();
    //' You logged into a secure area!\n×'
    expect(actualText).toContain(successNotification);
  });

  it("Should not login with invalid credentials", async function () {
    await $(usernameInputSelector).setValue(invalidUsername);
    await $(passwordInputSelector).setValue(invalidPassword);
    await $(loginButtonSelector).click();
    const actualText = await $(loginNotificationSelector).getText();
    expect(actualText).toContain(failedNotification);
  });

  it("Should logout after login", async function () {
    await $(usernameInputSelector).setValue(validUserName);
    await $(passwordInputSelector).setValue(validPassword);
    await $(loginButtonSelector).click();
    await $(logoutButtonSelector).click();
    const actualText = await $(loginNotificationSelector).getText();
    expect(actualText).toContain(successLogoutNotification);
  });

  it.skip("Should have valid login page layout", async function () {
    const actualTitle = await $(loginPageSelectors.title).getText();
    const actualSubheader = await $(loginPageSelectors.subheader).getText();
    expect(actualTitle).toBe(loginPageData.title);
    expect(actualSubheader).toBe(loginPageData.subheader);
  });

  it("Should have valid login page layout", async function () {
    const actualData: ILogin = {
      title: await $(loginPageSelectors.title).getText(),
      subheader: await $(loginPageSelectors.subheader).getText(),
      passwordLabel: await $(loginPageSelectors.passwordLabel).getText(),
      usernameLabel: await $(loginPageSelectors.usernameLabel).getText(),
      button: (await $(loginPageSelectors.button).getText()).trim(),
    };
    expect(actualData).toMatchObject({ ...loginPageData });
  });
});
