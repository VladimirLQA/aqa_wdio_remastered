import { ObtainTypeValues } from './helper.types';
import { MANUFACTURERS } from './product.types';

export interface IProductRequestParams {
  search?: string;
  manufacturer?: ObtainTypeValues<typeof MANUFACTURERS> | string | ObtainTypeValues<typeof MANUFACTURERS>[];
  sortField?: ('name' | 'price' | 'createdOn' | 'manufacturer') | string;
  sortOrder?: 'asc' | 'desc';
}
