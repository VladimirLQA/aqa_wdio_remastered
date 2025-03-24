import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/products/generateProduct';
import ProductsController from '../../controllers/products.controller';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { productResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { SignInApiService } from '../../service/index';
import { IProduct, IProductFromResponse } from '../../../data/types/product.types';
import { TAGS } from '../../../utils/tags';

describe(`[API] [Products] Smoke run ${TAGS.SERIAL}`, async () => {
  let id = '', productData: IProduct, token: string, createdProduct: IProductFromResponse;

  before(async () => {
    token = await SignInApiService.signInAsAdmin();
  });

  after(async () => {
    const product = await ProductsController.get(id, token);
    if (product.status === STATUS_CODES.OK) {
      const response = await ProductsController.delete(product.body.Product._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  });

  it('Should create product with smoke data', async () => {
    productData = generateProductData();
    const createProductResponse = await ProductsController.create(productData, token);

    validateResponse(createProductResponse, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, createProductResponse);

    id = createProductResponse.body.Product._id;
    createdProduct = createProductResponse.body.Product;
    expect(createdProduct).toMatchObject({ ...productData });
  });

});
