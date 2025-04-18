import { jest } from '../../../config/runners/jestRunners';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/products/generateProduct';
import ProductsController from '../../controllers/products.controller';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { PRODUCT_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/product.schema';
import { SignInApiService } from '../../service/index';
import { IProduct, IProductFromResponse } from '../../../data/types/product.types';
import { TAGS } from '../../../utils/tags';
import { PRODUCTS_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/products.schema';
import { API_ERROR_MESSAGES } from '../../../data/errorMessages';
import { fileBailOnFailure } from '../../../utils/helpers';

jest.describe(`[API] [Products] Smoke run ${TAGS.SERIAL}`, () => {
  fileBailOnFailure();
  let id = '',
    productData: IProduct,
    token: string,
    createdProduct: IProductFromResponse;

  jest.before(async () => {
    token = await SignInApiService.signInAsAdmin();
  });

  jest.after(async () => {
    const product = await ProductsController.get(id, token);
    if (product.status === STATUS_CODES.OK) {
      const response = await ProductsController.delete(product.body.Product._id, token);
      await expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  });

  jest.it('Should create product with smoke data', async () => {
    productData = generateProductData();

    const createProductResponse = await ProductsController.create(productData, token);
    id = createProductResponse.body.Product._id;
    createdProduct = createProductResponse.body.Product;

    validateResponse(createProductResponse, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductResponse);
    await expect(createdProduct).toMatchObject({ ...productData });
  });

  jest.it('Should get created product', async () => {
    const createProductResponse = await ProductsController.get(id, token);

    validateResponse(createProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductResponse);

    createdProduct = createProductResponse.body.Product;
    await expect(createdProduct).toMatchObject({ ...productData });
  });

  jest.it('Should get all products and contain created', async () => {
    const productsResponse = await ProductsController.getAll(token);

    validateResponse(productsResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCTS_SCHEMA_RESPONSE, productsResponse);

    const products = productsResponse.body.Products;
    await expect(products.length).toBeGreaterThan(0);

    const product = products.find((p) => p._id === id);
    await expect(product).toMatchObject({ ...createdProduct });
  });

  jest.it('Should update created product', async () => {
    productData = generateProductData();
    const updatedProductResponse = await ProductsController.update(productData, id, token);

    validateResponse(updatedProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, updatedProductResponse);

    createdProduct = updatedProductResponse.body.Product;
    await expect(createdProduct).toMatchObject({ ...productData });
  });

  jest.it('Should delete created product', async () => {
    const updatedProductResponse = await ProductsController.delete(id, token);

    validateResponse(updatedProductResponse, STATUS_CODES.DELETED);

    const createProductResponse = await ProductsController.get(id, token);
    validateResponse(
      createProductResponse,
      STATUS_CODES.NOT_FOUND,
      false,
      API_ERROR_MESSAGES['PRODUCT NOT FOUND'](id),
    );
  });
});
