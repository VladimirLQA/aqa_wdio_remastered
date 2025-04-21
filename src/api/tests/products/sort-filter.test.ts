import { IProductFromResponse } from '../../../data/types/product.types.ts';
import { TAGS } from '../../../utils/tags.ts';
import { ProductApiService, SignInApiService } from '../../service/index.ts';

describe(`[API] [Products] Sort and filtering tests ${TAGS.REGRESSION}`, () => {
  let p1: IProductFromResponse,
    p2: IProductFromResponse,
    p3: IProductFromResponse,
    p4: IProductFromResponse,
    p5: IProductFromResponse;

  before(async () => {
    await SignInApiService.signInAsAdmin();
    await ProductApiService.populate(5);
    [p1, p2, p3, p4, p5] = ProductApiService.getCreatedProducts();
  });
});
