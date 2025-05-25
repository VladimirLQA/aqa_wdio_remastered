import { SignInApiService } from './index.ts';
import { STATUS_CODES } from '../../data/api/statusCodes.ts';
import { PRODUCT_SCHEMA_RESPONSE } from '../../data/jsonSchemas/products/product.schema.ts';
import { generateProductData } from '../../data/products/generateProduct.ts';
import { IProduct, IProductFromResponse } from '../../data/types/product.types.ts';
import { validateJsonSchema, validateResponse } from '../../utils/validation/apiValidation.ts';
import ProductsController from '../controllers/products.controller.ts';
import { isID } from '../../utils/helpers.ts';

class ProductApiService {
  private createdProducts: IProductFromResponse[] = [];

  constructor(
    private controller = new ProductsController(),
    private signInApiService = SignInApiService,
  ) {}

  async create(customData: Partial<IProduct> = {}, token?: string) {
    const authToken = token ?? (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.create(generateProductData(customData), authToken);

    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, response);
    this.createdProducts.push(response.body.Product);
    return response.body.Product;
  }

  async populate(amount: number, customData: Partial<IProduct> = {}, token?: string) {
    await Promise.all(Array.from({ length: amount }, () => this.create(customData, token)));
  }

  getCreatedProduct(idOrName?: string): IProductFromResponse {
    if (idOrName) {
      if (isID(idOrName)) return this.findProductByID(idOrName);
      else return this.findProductByName(idOrName);
    }
    return this.getLastCreatedProduct();
  }

  private getLastCreatedProduct() {
    return this.createdProducts.at(-1) as IProductFromResponse;
  }

  getCreatedProducts() {
    if (!this.createdProducts.length) throw new Error('No product was created');
    return this.createdProducts;
  }

  async delete(id?: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());

    if (id) await this.deleteProduct(id, authToken);
    else await this.deleteProducts(this.createdProducts, authToken);
  }

  async deleteProduct(id: string, token: string) {
    const response = await this.controller.delete(id, token);
    await expect(response.status).toBe(STATUS_CODES.DELETED);
  }

  async deleteProducts(products: IProductFromResponse[], token: string) {
    for (const product of products) {
      const response = await this.controller.delete(product._id, token);
      await expect(response.status).toBe(STATUS_CODES.DELETED);
    }
    this.createdProducts = [];
  }

  private findProductByID(id: string) {
    const foundProduct = this.createdProducts[this.findProductIndexByID(id)];
    if (!foundProduct) throw new Error(`No product with id "${id}" was found`);
    return foundProduct;
  }

  private findProductByName(name: string) {
    const foundProduct = this.createdProducts[this.findProductIndexByName(name)];
    if (!foundProduct) throw new Error(`No product with name "${name}" was found`);
    return foundProduct;
  }

  private findProductIndexByID(id: string) {
    return this.createdProducts.findIndex((p) => p._id === id);
  }

  private findProductIndexByName(name: string) {
    return this.createdProducts.findIndex((p) => p.name === name);
  }
}

export default new ProductApiService();
