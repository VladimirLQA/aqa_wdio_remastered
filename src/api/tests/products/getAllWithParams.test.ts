import { STATUS_CODES } from '../../../data/api/statusCodes.ts';
import { validateResponse } from '../../../utils/validation/apiValidation.ts';
import { test } from '../../../fixtures/api/apiServices/apiServices.fixture.ts';
import { TAGS } from '../../../utils/tags.ts';
import chaiExpect from '../../../lib/_chai_expect/_chai_expect.ts';
import {
  ESortOrder,
  ESortProductsFields,
  IProduct,
  IProductFromResponse,
} from '../../../data/types/index.ts';
import { faker } from '@faker-js/faker';
import { genericSort } from '../../../utils/sort-algorithm.ts';

test.describe('[API] [Products] Get All', { tag: TAGS.REGRESSION }, () => {
  let token: string;
  let product1: IProduct;
  let product2: IProduct;
  let product3: IProduct;
  let product4: IProduct;
  let product5: IProduct;

  test.before(async ({ signInApiService, productsApiService }) => {
    token = await signInApiService.signInAsAdmin();
    [product1, product2, product3, product4, product5] = await productsApiService.populate(5);
  });

  test('Should get existing products', async ({ productsApiService, productsController }) => {
    await productsApiService.create();
    const getAllProductResponse = await productsController.getAllWithParams(token);

    validateResponse(getAllProductResponse, STATUS_CODES.OK, true, null);

    const receivedProducts = getAllProductResponse.body.Products;

    chaiExpect(receivedProducts.length, 'Products array in response is empty').greaterThan(0);
  });

  test('Should get products with search param', async ({ productsController }) => {
    const response = await productsController.getAllWithParams(token, {
      search: product1.name,
    });

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products).to.have.length(1);
    chaiExpect(response.body.Products[0]).to.containSubset(product1);
  });

  test('Should get products with manufacturer in param', async ({ productsController }) => {
    const response = await productsController.getAllWithParams(token, {
      manufacturer: product2.manufacturer,
    });

    const everyProductHasManufacturer = response.body.Products.every(
      (p) => p.manufacturer === product2.manufacturer,
    );

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length).greaterThan(0);
    chaiExpect(everyProductHasManufacturer, 'Products do not have passed manufacturer').to.equal(true);
  });

  test('Should get products with 2 manufacturers in param', async ({ productsController }) => {
    const response = await productsController.getAllWithParams(token, {
      manufacturer: [product3.manufacturer, product2.manufacturer],
    });

    const everyProductHasManufacturer = response.body.Products.every((p) =>
      [product3.manufacturer, product2.manufacturer].includes(p.manufacturer),
    );

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length).greaterThan(0);
    chaiExpect(everyProductHasManufacturer, 'Products do not have passed manufacturer').to.equal(true);
  });

  for (const sortField of Object.values(ESortProductsFields)) {
    for (const sortOrder of Object.values(ESortOrder)) {
      test(
        `Should get products sorted by "${sortField}" in "${sortOrder}" order`,
        { tag: [TAGS.REGRESSION] },
        async function ({ productsController }) {
          const products = (
            await productsController.getAllWithParams(token, {
              sortField,
              sortOrder,
            })
          ).body.Products;

          const sortedResponse = genericSort(products, sortField, sortOrder);
          const isSorted = sortedResponse.every(
            (p, i) =>
              p[sortField as keyof IProductFromResponse]
              === products[i][sortField as keyof IProductFromResponse],
          );

          chaiExpect(
            isSorted,
            `Sorted products should match the expected order for field "${sortField}"`,
          ).to.equal(true);
        },
      );
    }
  }

  for (const searchField of Object.values(ESortProductsFields).slice(0, -1)) {
    test(`Should get product searched with "${searchField}"`, async ({ productsController }) => {
      const searchValue = product1[searchField as keyof IProduct];

      const response = await productsController.getAllWithParams(token, {
        search: String(searchValue),
      });

      validateResponse(response, STATUS_CODES.OK, true, null);
      chaiExpect(
        response.body.Products.some(
          (p) => p[searchField as keyof IProductFromResponse] === searchValue,
          `Product does not contain search value "${searchValue}" in field "${searchField}"`,
        ),
      ).to.equal(true);
    });
  }

  test('Should get product matching partial name search', async ({ productsController }) => {
    const partialName = product4.name.slice(3, product4.name.length - 2);
    const response = await productsController.getAllWithParams(token, {
      search: partialName,
    });

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(
      response.body.Products.some((p) => p.name === product4.name),
      `Product does not contain search value "${partialName}" in field "name"`,
    ).to.equal(true);
  });

  test('Should get products filtered by manufacturer and search', async ({ productsController }) => {
    const response = await productsController.getAllWithParams(token, {
      search: product5.name,
      manufacturer: product5.manufacturer,
    });

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length, 'Products array in response is empty').greaterThan(0);
    chaiExpect(response.body.Products[0].manufacturer, 'Product does not have passed manufacturer').to.equal(
      product5.manufacturer,
    );
    chaiExpect(response.body.Products[0].name, 'Product does not have passed name').to.equal(product5.name);
  });

  test('Should get empty list with fake search value', async ({ productsController }) => {
    const fakeSearchValue = faker.database.mongodbObjectId() + Date.now();
    const response = await productsController.getAllWithParams(token, {
      search: fakeSearchValue,
    });

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length, 'Products array in response is not empty').to.equal(0);
  });

  test('Should get empty list of products with invalid value in manufacturer field', async ({
    productsController,
  }) => {
    const response = await productsController.getAllWithParams(token, {
      manufacturer: 'InvalidManufacturer',
    });

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length, 'Products array in response is not empty').to.equal(0);
  });

  test('Should get all products without parameters', async ({ productsController }) => {
    const response = await productsController.getAll(token);

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length, 'Products array in response is empty').greaterThan(0);
  });

  test.after(async ({ productsApiService }) => {
    await productsApiService.delete();
  });
});
