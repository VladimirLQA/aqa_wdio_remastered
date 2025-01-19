interface ILoginFormTestData {
  username: string;
  password: string;
  dataDescription: string;
  message: string;
}

export enum LOGIN_FORM_SUCCESS_MESSAGES {
  SUCCESSFULLY_REGISTERED = "Successfully registered! Please, click Back to return on login page",
  USERNAME_LESS_THEN_3 = "Username should contain at least 3 characters",
  USERNAME_MORE_THEN_40 = "Username can't exceed 40 characters",
}

export const VALID_REGISTRATION_TEST_DATA: ILoginFormTestData[] = [
  {
    username: "aaa",
    password: "Qwerty 1",
    dataDescription: "min valid data",
    message: LOGIN_FORM_SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
  },
  {
    username: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    password: "Qwerty 1aaaaaaaaaaaa",
    dataDescription: "max valid data",
    message: LOGIN_FORM_SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
  },
  {
    username: "aaaa",
    password: "Qwerty 1a",
    dataDescription: "min valid data + 1",
    message: LOGIN_FORM_SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
  },
  {
    username: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    password: "Qwerty 1aaaaaaaaaaa",
    dataDescription: "max valid data - 1",
    message: LOGIN_FORM_SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
  },
  {
    username: "aaaaaaaaaaaaaaaaaa",
    password: "Qwerty 1aaaa",
    dataDescription: "smoke data",
    message: LOGIN_FORM_SUCCESS_MESSAGES.SUCCESSFULLY_REGISTERED,
  },
];

export const NEGATIVE_REGISTRATION_TEST_DATA: ILoginFormTestData[] = [
  {
    username: "aa",
    password: "Qwerty 1aaaa",
    dataDescription: "min username - 1",
    message: LOGIN_FORM_SUCCESS_MESSAGES.USERNAME_LESS_THEN_3,
  },
];
