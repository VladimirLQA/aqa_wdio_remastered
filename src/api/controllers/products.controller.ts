import { apiConfig } from '../../config/apiConfig.ts';
import { IProduct, IProductResponse, IProductsResponse } from '../../data/types/product.types.ts';
import { IRequestOptions } from '../../data/types/api.types.ts';
import { AxiosApiClient } from '../apiClients/axios.apiClient.ts';
import { logStep } from '../../utils/reporter/decorators.ts';
import { IProductRequestParams } from '../../data/types/requestParams.ts';
import { convertRequestParams } from '../../utils/request.ts';

class ProductsController {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep('Create Product via API')
  async create(productData: IProduct, token: string) {
    const options: IRequestOptions = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      data: productData,
      url: apiConfig.endpoints.Products,
      baseURL: apiConfig.baseUrl,
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Update Product via API')
  async update(productData: IProduct, productId: string, token: string) {
    const options: IRequestOptions = {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      data: productData,
      url: apiConfig.endpoints['Get Product By Id'](productId),
      baseURL: apiConfig.baseUrl,
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Get Product by id via API')
  async get(productId: string, token: string) {
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      // TODO prevent requst sending if productID is null or undefined
      url: apiConfig.endpoints['Get Product By Id'](productId),
      baseURL: apiConfig.baseUrl,
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Get All Products via API')
  async getAll(token: string, params?: IProductRequestParams) {
    let urlParams = '';
    if (params) {
      urlParams = convertRequestParams(params as Record<string, string>);
    }
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      url: apiConfig.endpoints.Products + urlParams,
      baseURL: apiConfig.baseUrl,
    };
    return await this.apiClient.send<IProductsResponse>(options);
  }

  @logStep('Delete Product by id via API')
  async delete(productId: string, token: string) {
    const options: IRequestOptions = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      url: apiConfig.endpoints['Get Product By Id'](productId),
      baseURL: apiConfig.baseUrl,
    };
    return await this.apiClient.send(options);
  }
}

export default ProductsController;
