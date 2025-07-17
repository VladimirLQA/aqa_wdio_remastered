import { apiConfig } from '../../config/apiConfig.ts';
import {
  IProduct,
  IProductRequestParams,
  IProductResponse,
  IProductsResponse,
  IRequestOptions,
} from '../../data/types/index.ts';
import { AxiosApiClient } from '../apiClients/axios.apiClient.ts';
import { logStep } from '../../utils/reporter/decorators.ts';
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
      url: apiConfig.ENDPOINTS.PRODUCTS,
      baseURL: apiConfig.BASE_URL,
    };

    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Update Product via API')
  async update(productData: IProduct, productId: string, token: string) {
    if (!productId) throw new Error('Product ID is required and cannot be null or undefined');

    const options: IRequestOptions = {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      data: productData,
      url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(productId),
      baseURL: apiConfig.BASE_URL,
    };

    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Get Product by id via API')
  async get(productId: string, token: string) {
    // if (!productId) throw new Error('Product ID is required and cannot be null or undefined');

    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(productId),
      baseURL: apiConfig.BASE_URL,
    };

    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Get All Products via API')
  async getAllWithParams(token: string, params?: IProductRequestParams) {
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
      url: apiConfig.ENDPOINTS.PRODUCTS + urlParams,
      baseURL: apiConfig.BASE_URL,
    };

    return await this.apiClient.send<IProductsResponse>(options);
  }

  @logStep('Get All Products (All) via API')
  async getAll(token: string) {
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      url: apiConfig.ENDPOINTS.PRODUCTS_ALL,
      baseURL: apiConfig.BASE_URL,
    };

    return await this.apiClient.send<IProductsResponse>(options);
  }

  @logStep('Delete Product by id via API')
  async delete(productId: string, token: string) {
    if (!productId) throw new Error('Product ID is required and cannot be null or undefined');

    const options: IRequestOptions = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(productId),
      baseURL: apiConfig.BASE_URL,
    };

    return await this.apiClient.send(options);
  }
}

export default new ProductsController();
