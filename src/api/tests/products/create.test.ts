import { PRODUCTS_CREATE_VALIDATIONS } from '../../../data/products/apiCreateBodyData';
import { generateProductData } from '../../../data/products/generateProduct';
import { IProduct } from '../../../data/types/product.types';
import { validateResponse, validateJsonSchema } from '../../../utils/validation/apiValidation';
import ProductsController from '../../controllers/products.controller';
import { SignInApiService } from '../../service/index';
import { PRODUCT_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/product.schema';
import { TAGS } from '../../../utils/tags';
import { jest } from '../../../config/runners/jestRunners';

jest.describe(`[API] [PRODUCTS] Create route ${TAGS.REGRESSION}`, () => {
  const products: string[] = [];
  jest.before(async () => {
    await SignInApiService.signInAsAdmin();
  });

  jest.after(async () => {
    for (const id of products) {
      await ProductsController.delete(id, SignInApiService.getToken());
    }
  });

  PRODUCTS_CREATE_VALIDATIONS.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
    jest.it(`${description}`, async () => {
      const createProductsResponse = await ProductsController.create(
        generateProductData(params as Partial<IProduct>),
        SignInApiService.getToken(),
      );
      products.push(createProductsResponse.body?.Product?._id);

      validateResponse(createProductsResponse, expectedStatus, isSuccess, errorMessage);
      if (isSuccess) {
        validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductsResponse);
      }
    });
  });
});
