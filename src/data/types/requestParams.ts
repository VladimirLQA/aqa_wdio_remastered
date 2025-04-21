import { ObtainTypeValues } from './helper.types.ts';
import { MANUFACTURERS } from './product.types.ts';

export interface IProductRequestParams {
  search?: string;
  manufacturer?: ObtainTypeValues<typeof MANUFACTURERS> | string | ObtainTypeValues<typeof MANUFACTURERS>[];
  sortField?: ('name' | 'price' | 'createdOn' | 'manufacturer') | string;
  sortOrder?: 'asc' | 'desc';
}
