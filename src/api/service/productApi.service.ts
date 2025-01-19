import { STATUS_CODES } from '../../data/api/statusCodes';
import { productResponseSchema } from '../../data/jsonSchemas/product.schema';
import { generateProductData } from '../../data/products/generateProduct';
import { IProduct, IProductFromResponse } from '../../data/types/product.types';
import { validateJsonSchema, validateResponse } from '../../utils/validation/apiValidation';
import productsController from '../controllers/products.controller';

class ProductApiService {
  private createdProducts: IProductFromResponse[] = [];
  constructor(private controller = productsController) {}

  async create(token: string, customData?: Partial<IProduct>) {
    const response = await this.controller.create(generateProductData(customData), token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, response);
    this.createdProducts.push(response.body.Product);
    return response.body.Product;
  }

  getCreatedProduct(id?: string) {
    if (!this.createdProducts.length) throw new Error('No product was created');
    if (id) {
      const foundProduct = this.createdProducts[this.findProductIndex(id)];
      if (!foundProduct) throw new Error('No product was found');
      return foundProduct;
    }
    const foundProduct = this.createdProducts.at(-1) as IProductFromResponse;
    return foundProduct;
  }

  removeStoredProduct(id?: string) {
    const index = id ? this.findProductIndex(id) : this.createdProducts.length - 1;
    this.createdProducts.splice(index, 1);
  }

  async delete(token: string) {
    for (const product of this.createdProducts) {
      const response = await this.controller.delete(product._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
    this.createdProducts = [];
  }

  private findProductIndex(id: string) {
    return this.createdProducts.findIndex((p) => p._id === id);
  }
}

export default new ProductApiService();
