import { mock } from 'webdriverio/build/commands/browser';
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
    // browser.setupInterceptor();
  });

  it('', async () => {
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/');

    mock.respond([{
      title: 'Injected (non) completed Todo',
      order: null,
      completed: false
    }, {
      title: 'Injected completed Todo',
      order: null,
      completed: true
    }], {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });

    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/');

    await $('#todo-list li').waitForExist();
    console.log(await $$('#todo-list li').map((el) => el.getText()));
    // outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
  });

  it.only('Mock response', async () => {
    const mock = await browser.mock('**', {
      method: 'GET',
    });

    mock.respond(
      {
        Products: [],
      },
      {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
        },

      },
    );

    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();

    // mock.on('overwrite', ({ response }) => {
    //   console.log(response.content);

    // });

    await homePageService.openProductsPage();
    await browser.pause(2000);

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
    // await browser.execute(() => {
    //   const originalFetch = window.fetch;

    //   window.fetch = async (url, config) => {
    //     console.log(`url - ${url}`);
    //     if (url.toString().includes('/api/products')) {
    //       return Promise.resolve(new Response(
    //         JSON.stringify({
    //           'Products': [
    //           ],
    //           'sorting': {
    //             'sortField': 'createdOn',
    //             'sortOrder': 'desc'
    //           },
    //           'IsSuccess': true,
    //           'ErrorMessage': null
    //         }),
    //         { status: 200 }
    //       ));
    //     }
    //     return originalFetch(url, config);
    //   };
    // });

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

    // await browser.networkAddIntercept({ phases: ['beforeRequestSent'], urlPatterns: [{ type: 'string', pattern: 'https://aqa-course-project.app//api/products?sortField=createdOn&sortOrder=desc' }] });

    // await homePageService.openProductsPage();

    // await browser.networkProvideResponse({
    //   request: 'https://aqa-course-project.app//api/products?sortField=createdOn&sortOrder=desc',
    //   body: { type: 'string', value: JSON.stringify({ Products: [] }) }
    // });

    // await browser.pause(5000);

  });
});