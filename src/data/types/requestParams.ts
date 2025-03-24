import { MANUFACTURERS } from './product.types';

export interface IProductRequestParams {
  search?: string;
  manufacturer?: typeof MANUFACTURERS | string | typeof MANUFACTURERS[];
  sortField?: ('name' | 'price' | 'createdOn' | 'manufacturer') | string;
  sortOrder?: 'asc' | 'desc';
}
