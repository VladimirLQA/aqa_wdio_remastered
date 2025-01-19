//TODO: npm run test -- --spec="./src/api/tests/Products/create.test.ts"

import _ from "lodash";
import { STATUS_CODES } from "../../../data/api/statusCodes";
import { generateProductData } from "../../../data/products/generateProduct";
import ProductsController from "../../controllers/products.controller";
import { validateJsonSchema, validateResponse } from "../../../utils/validation/apiValidation";
import { productResponseSchema } from "../../../data/jsonSchemas/product.schema";
import { SignInApiService } from "../../service/signInApiService.service";

describe("[API] [Products] Post", async function () {
  const signInApiService = new SignInApiService();

  let id = "";

  beforeEach(async function () {
    await signInApiService.signInAsAdmin();
  });

  it("Should create product with smoke data", async function () {
    const productData = generateProductData();
    const createProductResponse = await ProductsController.create(productData, signInApiService.getToken());
    expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);
    validateResponse(createProductResponse, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, createProductResponse);
    id = createProductResponse.body.Product._id;
    const createdProduct = createProductResponse.body.Product;
    expect(createdProduct).toMatchObject({ ...productData });
  });

  afterEach(async function () {
    const response = await ProductsController.delete(id, signInApiService.getToken());
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});
