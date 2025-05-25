import {
  LOGIN_FORM_SUCCESS_MESSAGES,
  NEGATIVE_REGISTRATION_TEST_DATA,
  VALID_REGISTRATION_TEST_DATA,
} from '../../../data/login-form/register.data';
import { test } from '../../../fixtures/base.fixture';

test.describe('[UI] Registration form', () => {
  const usernameSelector = '#userNameOnRegister';
  const passrodSelector = '#passwordOnRegister';
  const registerButton = '#register';
  const messageSelector = '#errorMessageOnRegister';
  const formSelector = '.registerForm';

  test.beforeEach(async function () {
    await browser.url('https://anatoly-karpovich.github.io/demo-login-form/');
    await $('#registerOnLogin').click();
  });

  context('Positive scenarios', () => {
    VALID_REGISTRATION_TEST_DATA.forEach(({ username, password, dataDescription, message }) => {
      it(`Should register with ${dataDescription}`, async function () {
        await $(usernameSelector).setValue(username);
        await $(passrodSelector).setValue(password);
        await $(registerButton).click();
        await expect($(messageSelector)).toHaveText(message);
      });
    });
  });

  context('Negative scenarios', () => {
    NEGATIVE_REGISTRATION_TEST_DATA.forEach(({ username, password, dataDescription, message }) => {
      it(`Should not register with ${dataDescription}`, async function () {
        await $(usernameSelector).setValue(username);
        await $(passrodSelector).setValue(password);
        await $(registerButton).click();
        await expect($(messageSelector)).toHaveText(message);
      });
    });
    it('Should not register with 41 characters in username', async function () {
      await browser.execute(() => {
        const username = document.getElementById('userNameOnRegister');
        username?.removeAttribute('maxlength');
      });
      const form = $(formSelector);
      await form.$(usernameSelector).setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      await form.$(passrodSelector).setValue('Qwerty 1aaaa');
      await form.$(registerButton).click();
      await expect(form.$(messageSelector)).toHaveText(LOGIN_FORM_SUCCESS_MESSAGES.USERNAME_MORE_THEN_40);
    });
  });
});
