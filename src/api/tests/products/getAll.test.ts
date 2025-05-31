import { STATUS_CODES } from '../../../data/api/statusCodes.ts';
import { validateResponse } from '../../../utils/validation/apiValidation.ts';
import { test } from '../../../fixtures/api/apiServices/apiServices.fixture.ts';
import { TAGS } from '../../../utils/tags.ts';
import chaiExpect from '../../../lib/_chai_expect/_chai_expect.ts';

test.describe('[API] [Products] Get All', { tag: TAGS.REGRESSION }, () => {
  let token: string;

  test.beforeEach(async ({ signInApiService }) => {
    token = await signInApiService.signInAsAdmin();
  });

  test('Should get existing products', async ({ productsApiService, productsController }) => {
    await productsApiService.create();
    const getAllProductResponse = await productsController.getAll(token);

    validateResponse(getAllProductResponse, STATUS_CODES.OK, true, null);

    const receivedProducts = getAllProductResponse.body.Products;

    chaiExpect(receivedProducts.length, 'Products array in response is empty').greaterThan(0);
  });

  test('Should get products with search param', async ({ productsApiService, productsController }) => {
    const product = await productsApiService.create();
    const response = await productsController.getAll(token, {
      search: product.name,
    });

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products).to.have.length(1);
  });

  test('Should get products with manufacturer in param', async ({
    productsApiService,
    productsController,
  }) => {
    const product = await productsApiService.create();
    const response = await productsController.getAll(token, {
      manufacturer: product.manufacturer,
    });

    const everyProductHasManufacturer = response.body.Products.every(
      (p) => p.manufacturer === product.manufacturer,
    );

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length).greaterThan(0);
    chaiExpect(everyProductHasManufacturer).to.equal(true);
  });

  test('Should get products with 2 manufacturers in param', async ({
    productsApiService,
    productsController,
  }) => {
    const [product1, product2] = await productsApiService.populate(2);

    const response = await productsController.getAll(token, {
      manufacturer: [product1.manufacturer, product2.manufacturer],
    });

    const everyProductHasManufacturer = response.body.Products.every((p) =>
      [product1.manufacturer, product2.manufacturer].includes(p.manufacturer),
    );

    validateResponse(response, STATUS_CODES.OK, true, null);
    chaiExpect(response.body.Products.length).greaterThan(0);
    chaiExpect(everyProductHasManufacturer).to.equal(true, 'Products do not have passed manufacturer');
  });

  test('Should get products sorted by price in asc order', async ({ productsController }) => {
    const response = await productsController.getAll(token, {
      sortField: 'price',
      sortOrder: 'asc',
    });

    validateResponse(response, STATUS_CODES.OK, true, null);

    const sortedResponse = response.body.Products.toSorted((p1, p2) => p1.price - p2.price);
    const isOrdered = sortedResponse.every((p, i) => p.price === response.body.Products[i].price);

    chaiExpect(isOrdered).to.equal(true, 'Products are not sorted by price in asc order');
  });

  test('Should get products sorted by price in desc order', async ({ productsController }) => {
    const response = await productsController.getAll(token, {
      sortField: 'price',
      sortOrder: 'desc',
    });

    validateResponse(response, STATUS_CODES.OK, true, null);

    const sortedResponse = response.body.Products.toSorted((p1, p2) => p2.price - p1.price);
    const isOrdered = sortedResponse.every((p, i) => p.price === response.body.Products[i].price);

    chaiExpect(isOrdered).to.equal(true, 'Products are not sorted by price in desc order');
  });

  test('Should get products sorted by manufacturer in asc order', async ({ productsController }) => {
    const response = await productsController.getAll(token, {
      sortField: 'manufacturer',
      sortOrder: 'asc',
    });

    validateResponse(response, STATUS_CODES.OK, true, null);

    const sortedResponse = response.body.Products.toSorted((p1, p2) =>
      p1.manufacturer.localeCompare(p2.manufacturer),
    );
    const isOrdered = sortedResponse.every(
      (p, i) => p.manufacturer === response.body.Products[i].manufacturer,
    );

    chaiExpect(isOrdered).to.equal(true, 'Products are not sorted by manufacturer in asc order');
  });

  test('Should get products sorted by manufacturer in desc order', async ({ productsController }) => {
    const response = await productsController.getAll(token, {
      sortField: 'manufacturer',
      sortOrder: 'desc',
    });

    validateResponse(response, STATUS_CODES.OK, true, null);
    const sortedResponse = response.body.Products.toSorted((p1, p2) =>
      p2.manufacturer.localeCompare(p1.manufacturer),
    );
    const isOrdered = sortedResponse.every(
      (p, i) => p.manufacturer === response.body.Products[i].manufacturer,
    );

    chaiExpect(isOrdered).to.equal(true, 'Products are not sorted by manufacturer in desc order');
  });

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete();
  });
});
