import { STATUS_CODES } from '../../../data/api/statusCodes';
import { MANUFACTURERS } from '../../../data/types/product.types';
import { validateResponse } from '../../../utils/validation/apiValidation';
import productsController from '../../controllers/products.controller';
import productApiService from '../../service/productApi.service';
import signInApiService from '../../service/signInApiService.service';

describe('[API] [Products] Get All', () => {
  beforeEach(async () => {
    await signInApiService.signInAsAdmin();
  });

  it('Should get created product', async () => {
    await productApiService.create(signInApiService.getToken());
    const getAllProductResponse = await productsController.getAll(signInApiService.getToken());
    await expect(getAllProductResponse.status).toBe(STATUS_CODES.OK);
    validateResponse(getAllProductResponse, STATUS_CODES.OK, true, null);
    const receivedProducts = getAllProductResponse.body.Products;
    await expect(receivedProducts.length).toBeGreaterThan(0);
  });

  it('Should get products with search param', async () => {
    const product = await productApiService.create(signInApiService.getToken());
    const response = await productsController.getAll(signInApiService.getToken(), {
      search: product.name,
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    await expect(response.body.Products).toHaveLength(1);
  });

  it('Should get products with manufacturer in param', async () => {
    const product = await productApiService.create(signInApiService.getToken());
    const response = await productsController.getAll(signInApiService.getToken(), {
      manufacturer: product.manufacturer,
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    await expect(response.body.Products.length).toBeGreaterThan(0);
    await expect(response.body.Products.every((p) => p.manufacturer === product.manufacturer)).toBe(true);
  });

  it('Should get products with 2 manufacturers in param', async () => {
    const product1 = await productApiService.create(signInApiService.getToken(), {
      manufacturer: MANUFACTURERS.AMAZON,
    });
    const product2 = await productApiService.create(signInApiService.getToken(), {
      manufacturer: MANUFACTURERS.APPLE,
    });

    const response = await productsController.getAll(signInApiService.getToken(), {
      manufacturer: [product1.manufacturer, product2.manufacturer],
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    await expect(response.body.Products.length).toBeGreaterThan(0);
    await expect(
      response.body.Products.every(
        (p) => p.manufacturer === product1.manufacturer || p.manufacturer === product2.manufacturer,
      ),
    ).toBe(true);
  });

  it('Should get products sorted by price in asc order', async () => {
    const response = await productsController.getAll(signInApiService.getToken(), {
      sortField: 'price',
      sortOrder: 'asc',
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    const sortedResponse = response.body.Products.toSorted((p1, p2) => p1.price - p2.price);
    await expect(sortedResponse.every((p, i) => p.price === response.body.Products[i].price)).toBe(true);
  });

  it('Should get products sorted by price in desc order', async () => {
    const response = await productsController.getAll(signInApiService.getToken(), {
      sortField: 'price',
      sortOrder: 'desc',
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    const sortedResponse = response.body.Products.toSorted((p1, p2) => p2.price - p1.price);
    await expect(sortedResponse.every((p, i) => p.price === response.body.Products[i].price)).toBe(true);
  });

  it('Should get products sorted by manufacturer in asc order', async () => {
    const response = await productsController.getAll(signInApiService.getToken(), {
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
    await expect(isOrdered).toBe(true);
  });

  it('Should get products sorted by manufacturer in desc order', async () => {
    const response = await productsController.getAll(signInApiService.getToken(), {
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
    await expect(isOrdered).toBe(true);
  });

  afterEach(async () => {
    await productApiService.delete(signInApiService.getToken());
  });
});
