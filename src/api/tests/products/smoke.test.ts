import { STATUS_CODES } from '../../../data/api/statusCodes.ts';
import { generateProductData } from '../../../data/products/generateProduct.ts';
import ProductsController from '../../controllers/products.controller.ts';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation.ts';
import { PRODUCT_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/product.schema.ts';
import { SignInApiService } from '../../service/index.ts';
import { IProduct, IProductFromResponse } from '../../../data/types/product.types.ts';
import { TAGS } from '../../../utils/tags.ts';
import { PRODUCTS_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/products.schema.ts';
import { API_ERROR_MESSAGES } from '../../../data/errorMessages.ts';
import { expect as chaiExpect } from 'chai';

describe(`[API] [Products] Smoke run ${TAGS.SMOKE}`, () => {
  let id = '',
    productData: IProduct,
    token: string,
    createdProduct: IProductFromResponse;

  before(async () => {
    token = await SignInApiService.signInAsAdmin();
  });

  after(async () => {
    const product = await ProductsController.get(id, token);
    if (product.status === STATUS_CODES.OK) {
      // const response = await ProductsController.delete(product.body.Product._id, token);
      // chaiExpect(response.status).to.equal(STATUS_CODES.DELETED);
    }
  });

  it('Should create product with smoke data', async () => {
    productData = generateProductData();

    const createProductResponse = await ProductsController.create(productData, token);
    id = createProductResponse.body.Product._id;
    createdProduct = createProductResponse.body.Product;

    validateResponse(createProductResponse, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductResponse);
    chaiExpect(createdProduct).to.containSubset({ ...productData });
  });

  it('Should get created product', async () => {
    const createProductResponse = await ProductsController.get(id, token);

    validateResponse(createProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductResponse);

    createdProduct = createProductResponse.body.Product;
    chaiExpect(createdProduct).to.containSubset({ ...productData });
  });

  it('Should get all products and contain created', async () => {
    const productsResponse = await ProductsController.getAll(token);

    validateResponse(productsResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCTS_SCHEMA_RESPONSE, productsResponse);

    const products = productsResponse.body.Products;
    chaiExpect(products.length).greaterThan(0);

    const product = products.find((p) => p._id === id);
    chaiExpect(product).to.containSubset({ ...createdProduct });
  });

  it('Should update created product', async () => {
    productData = generateProductData();
    const updatedProductResponse = await ProductsController.update(productData, id, token);

    validateResponse(updatedProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, updatedProductResponse);

    createdProduct = updatedProductResponse.body.Product;
    chaiExpect(createdProduct).to.containSubset({ ...productData });
  });

  it('Should delete created product', async () => {
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
