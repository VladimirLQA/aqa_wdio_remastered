const BASE_URL = `https://anatoly-karpovich.github.io/aqa-course-project/#`;

describe('should log when doing a certain action', () => {
  it('should trigger the console event', async () => {
    const mocked = await browser.mock('**' + '/api/login', {
      method: 'post',
    });
    mocked.respond(
      {
        IsSuccess: false,
        ErrorMessage: 'Incorrect credentials',
      },
      {
        statusCode: 404,
        headers: {
          'x-custom-header': 'foobar',
        },
      },
    );
    await browser.url(BASE_URL);
    await browser.$(`button[type="submit"]`).click();
  });
});
