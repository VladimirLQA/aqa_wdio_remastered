/*
Прекондишен: перейти к форме регистрации

1: username: aaa, password: Qwerty 1
2: username: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, password: Qwerty 1aaaaaaaaaaaa
3: username: aaaa, password: Qwerty 1a
4: username: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, password: Qwerty 1aaaaaaaaaaa
5: username: aaaaaaaaaaaaaaaaaa, password: Qwerty 1aaaa
*/

import {
  LOGIN_FORM_SUCCESS_MESSAGES,
  NEGATIVE_REGISTRATION_TEST_DATA,
  VALID_REGISTRATION_TEST_DATA,
} from "../../../data/login-form/register.data";

//TODO: to run test: npm run test -- --spec="./src/tests/registration.test.ts"

describe("[UI] Registration form", async function () {
  const usernameSelector = "#userNameOnRegister";
  const passrodSelector = "#passwordOnRegister";
  const registerButton = "#register";
  const messageSelector = "#errorMessageOnRegister";
  const formSelector = ".registerForm";

  beforeEach(async function () {
    await browser.url("https://anatoly-karpovich.github.io/demo-login-form/");
    await $("#registerOnLogin").click();
  });

  context("Positive scenarios", async function () {
    VALID_REGISTRATION_TEST_DATA.forEach(({ username, password, dataDescription, message }) => {
      it(`Should register with ${dataDescription}`, async function () {
        await $(usernameSelector).setValue(username);
        await $(passrodSelector).setValue(password);
        await $(registerButton).click();
        await expect($(messageSelector)).toHaveText(message);
      });
    });
  });

  context("Negative scenarios", async function () {
    NEGATIVE_REGISTRATION_TEST_DATA.forEach(({ username, password, dataDescription, message }) => {
      it(`Should not register with ${dataDescription}`, async function () {
        await $(usernameSelector).setValue(username);
        await $(passrodSelector).setValue(password);
        await $(registerButton).click();
        await expect($(messageSelector)).toHaveText(message);
      });
    });
    it("Should not register with 41 characters in username", async function () {
      await browser.execute(async function () {
        const username = document.getElementById("userNameOnRegister");
        username?.removeAttribute("maxlength");
      });
      const form = $(formSelector);
      await form.$(usernameSelector).setValue("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      await form.$(passrodSelector).setValue("Qwerty 1aaaa");
      await form.$(registerButton).click();
      await expect(form.$(messageSelector)).toHaveText(LOGIN_FORM_SUCCESS_MESSAGES.USERNAME_MORE_THEN_40);
    });
  });
});
