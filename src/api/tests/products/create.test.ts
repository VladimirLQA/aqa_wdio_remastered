import { PRODUCTS_CREATE_VALIDATIONS } from '../../../data/products/apiCreateBodyData.ts';
import { generateProductData } from '../../../data/products/generateProduct.ts';
import { IProduct } from '../../../data/types/product.types.ts';
import { validateResponse, validateJsonSchema } from '../../../utils/validation/apiValidation.ts';
import { PRODUCT_SCHEMA_RESPONSE } from '../../../data/jsonSchemas/products/product.schema.ts';
import { TAGS } from '../../../utils/tags.ts';
import { test } from '../../../fixtures/api/apiServices/apiServices.fixture.ts';

test.describe(`[API] [PRODUCTS] Create route`, { tag: `${TAGS.REGRESSION}` }, () => {
  const products: string[] = [];
  let token: string;

  test.before(async ({ signInApiService }) => {
    token = await signInApiService.signInAsAdmin();
  });

  test.after(async ({ productsController }) => {
    const actualProductsIds = products.filter(Boolean);
    for (const id of actualProductsIds) {
      await productsController.delete(id, token);
    }
  });

  PRODUCTS_CREATE_VALIDATIONS.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
    test(`${description}`, async ({ productsController }) => {
      const createProductsResponse = await productsController.create(
        generateProductData(params as Partial<IProduct>),
        token,
      );
      products.push(createProductsResponse.body?.Product?._id);

      validateResponse(createProductsResponse, expectedStatus, isSuccess, errorMessage);
      if (isSuccess) {
        validateJsonSchema(PRODUCT_SCHEMA_RESPONSE, createProductsResponse);
      }
    });
  });
});
