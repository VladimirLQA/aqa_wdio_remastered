import { STATUS_CODES } from '../../data/api/statusCodes';
import homePageService from '../services/homePage.service';
import signInPageService from '../services/signInPage.service';

export async function mockResponseWithBrowser() {
  await browser.execute(() => {
    const originalFetch = window.fetch;

    window.fetch = async (url, config) => {
      if (url.toString().includes('/api/products')) {
        return Promise.resolve(new Response(
          JSON.stringify({
            'Products': [
            ],
            'sorting': {
              'sortField': 'createdOn',
              'sortOrder': 'desc'
            },
            'IsSuccess': true,
            'ErrorMessage': null
          }),
          { status: 200 }
        ));
      }
      return originalFetch(url, config);
    };
  });
}
describe('Mocking', () => {
  before(async () => {
    browser.setupInterceptor();
  });

  it('Mock response', async () => {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();

    // await $(`[name="Products"]`).mock;

    // await mockResponseWithBrowser();
    // await browser.pause(4000);
    // browser.expectRequest('GET', 'https://aqa-course-project.app//api/products?sortField=createdOn&sortOrder=desc', 201).respondWith({
    //   status: STATUS_CODES.OK,
    //   body: {
    //     'Products': [
    //     ],
    //     'sorting': {
    //       'sortField': 'createdOn',
    //       'sortOrder': 'desc'
    //     },
    //     'IsSuccess': true,
    //     'ErrorMessage': null
    //   }
    // });
    await browser.execute(() => {
      const originalFetch = window.fetch;

      window.fetch = async (url, config) => {
        console.log(`url - ${url}`);
        if (url.toString().includes('/api/products')) {
          return Promise.resolve(new Response(
            JSON.stringify({
              'Products': [
              ],
              'sorting': {
                'sortField': 'createdOn',
                'sortOrder': 'desc'
              },
              'IsSuccess': true,
              'ErrorMessage': null
            }),
            { status: 200 }
          ));
        }
        return originalFetch(url, config);
      };
    });

    await homePageService.openProductsPage();
    // const productsMock = await browser.mock('**api/products', {
    //   method: 'get'
    // });

    // const response = {
    //   ErrorMessage: null,
    //   IsSuccess: true,
    //   Products: [],
    //   sorting: {
    //     'sortField': 'createdOn',
    //     'sortOrder': 'desc'
    //   }
    // };

    // // productsMock.respond(response, { statusCode: STATUS_CODES.OK });

    // browser.networkProvideResponse({
    //   request: 'https://aqa-course-project.app//api/products?sortField=createdOn&sortOrder=desc',
    //   body: response
    // });

    // await homePageService.openProductsPage();

    // await browser.pause(5000);

  });
});