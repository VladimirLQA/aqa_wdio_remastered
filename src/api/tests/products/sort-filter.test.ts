import { jest } from '../../../config/runners/jestRunners';
import { IProductFromResponse } from '../../../data/types/product.types';
import { TAGS } from '../../../utils/tags';
import { ProductApiService, SignInApiService } from '../../service/index';

jest.describe(`[API] [Products] Sort and filtering tests ${TAGS.REGRESSION}`, () => {
  let p1: IProductFromResponse,
    p2: IProductFromResponse,
    p3: IProductFromResponse,
    p4: IProductFromResponse,
    p5: IProductFromResponse;

  jest.before(async () => {
    await SignInApiService.signInAsAdmin();
    await ProductApiService.populate(5);
    [p1, p2, p3, p4, p5] = ProductApiService.getCreatedProducts();
  });
});
