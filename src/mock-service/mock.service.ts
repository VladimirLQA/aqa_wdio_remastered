//  * @param {String|Function=}    filterOptions.method            filter resource by HTTP method
//  * @param {Object|Function=}    filterOptions.headers           filter resource by specific request headers
//  * @param {Object|Function=}    filterOptions.responseHeaders   filter resource by specific response headers
//  * @param {String|Function=}    filterOptions.postData          filter resource by request postData
//  * @param {Number|Function=}    filterOptions.statusCode        filter resource by response statusCode

import { Method } from 'axios';
import { STATUS_CODES } from '../data/api/statusCodes';

export interface IMocRequestkOptions<T = any> {
  method?: Method;
  headers?: Record<string, any>;
  responseHeaders?: Record<string, any>;
  postData?: T;
  statusCode?: STATUS_CODES;
}

export interface IMockResponseOptions<T = any> {
  responseData: T;
  params?: {
    statusCode?: STATUS_CODES;
    cookies?: Record<string, any>;
    headers?: Record<string, any>;
  };
  once?: boolean;
}
class MockService {
  async modifyResponse<T, U>(info: {
    url: string;
    requestOptions?: IMocRequestkOptions<T>;
    responseOptions?: IMockResponseOptions<U>;
  }) {
    const { url, requestOptions, responseOptions } = info;
    const mock = await this.mock(url, requestOptions);
    return mock.respond(
      responseOptions!.responseData,
      responseOptions?.params as object,
      responseOptions?.once,
    );
  }

  private async mock(url: string, options?: IMocRequestkOptions) {
    return await browser.mock(url, options);
  }
}

export default new MockService();
