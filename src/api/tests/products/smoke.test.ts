import { STATUS_CODES } from '../../../data/api/statusCodes.ts';
import { generateProductData } from '../../../data/products/generateProduct.ts';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation.ts';
import { PRODUCT_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/product.schema.ts';
import { IProduct, IProductFromResponse } from '../../../data/types/product.types.ts';
import { TAGS } from '../../../utils/tags.ts';
import { PRODUCTS_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/products.schema.ts';
import { API_ERROR_MESSAGES } from '../../../data/errorMessages.ts';
import { expect as chaiExpect } from 'chai';
import { test } from '../../../fixtures/api/apiServices/apiServices.fixture.ts';

test.describe(`[API] [Products] Smoke run `, { tag: TAGS.SMOKE }, () => {
  let id = '',
    productData: IProduct,
    token: string,
    createdProduct: IProductFromResponse;

  test.before(async ({ signInApiService }) => {
    token = await signInApiService.signInAsAdmin();
  });

  test.after(async ({  productsController }) => {
    const product = await productsController.get(id, token);
    if (product.status === STATUS_CODES.OK) {
      const response = await productsController.delete(product.body.Product._id, token);
      chaiExpect(response.status).to.equal(STATUS_CODES.DELETED);
    }
  });

  test('Should create product with smoke data', async ({ productsController }) => {
    productData = generateProductData();

    const createProductResponse = await productsController.create(productData, token);
    id = createProductResponse.body.Product._id;
    createdProduct = createProductResponse.body.Product;

    validateResponse(createProductResponse, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductResponse);
    chaiExpect(createdProduct).to.containSubset({ ...productData });
  });

  test('Should get created product', async ({ productsController }) => {
    const createProductResponse = await productsController.get(id, token);

    validateResponse(createProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductResponse);

    createdProduct = createProductResponse.body.Product;
    chaiExpect(createdProduct).to.containSubset({ ...productData });
  });

  test('Should get all products and contain created', async ({ productsController }) => {
    const productsResponse = await productsController.getAll(token);

    validateResponse(productsResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCTS_SCHEMA_RESPONSE, productsResponse);

    const products = productsResponse.body.Products;
    chaiExpect(products.length).greaterThan(0);

    const product = products.find((p) => p._id === id);
    chaiExpect(product).to.containSubset({ ...createdProduct });
  });

  test('Should update created product', async ({ productsController }) => {
    productData = generateProductData();
    const updatedProductResponse = await productsController.update(productData, id, token);

    validateResponse(updatedProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, updatedProductResponse);

    createdProduct = updatedProductResponse.body.Product;
    chaiExpect(createdProduct).to.containSubset({ ...productData });
  });

  test('Should delete created product', async ({ productsController }) => {
    const updatedProductResponse = await productsController.delete(id, token);

    validateResponse(updatedProductResponse, STATUS_CODES.DELETED);

    const createProductResponse = await productsController.get(id, token);
    validateResponse(
      createProductResponse,
      STATUS_CODES.NOT_FOUND,
      false,
      API_ERROR_MESSAGES['PRODUCT NOT FOUND'](id),
    );
  });
});
