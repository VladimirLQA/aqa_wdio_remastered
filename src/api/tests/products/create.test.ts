import { PRODUCTS_CREATE_VALIDATIONS } from '../../../data/products/apiCreateBodyData.ts';
import { generateProductData } from '../../../data/products/generateProduct.ts';
import { IProduct } from '../../../data/types/product.types.ts';
import { validateResponse, validateJsonSchema } from '../../../utils/validation/apiValidation.ts';
import ProductsController from '../../controllers/products.controller.ts';
import { SignInApiService } from '../../service/index.ts';
import { PRODUCT_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/product.schema.ts';
import { TAGS } from '../../../utils/tags.ts';

describe(`[API] [PRODUCTS] Create route ${TAGS.REGRESSION}`, () => {
  const products: string[] = [];
  before(async () => {
    await SignInApiService.signInAsAdmin();
  });

  after(async () => {
    for (const id of products) {
      await ProductsController.delete(id, SignInApiService.getToken());
    }
  });

  PRODUCTS_CREATE_VALIDATIONS.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
    it(`${description}`, async () => {
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
