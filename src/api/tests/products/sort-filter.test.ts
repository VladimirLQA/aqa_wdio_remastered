import { IProductFromResponse } from '../../../data/types/product.types';
import { TAGS } from '../../../utils/tags';
import { SignInApiService } from '../../service';

describe(`[API] [Products] Sort and filtering tests ${TAGS.REGRESSION}`, () => {
  let p1: IProductFromResponse,
    p2: IProductFromResponse,
    p3: IProductFromResponse,
    p4: IProductFromResponse,
    p5: IProductFromResponse;
  before(async () => {
    await SignInApiService.signInAsAdmin();
  });
});
