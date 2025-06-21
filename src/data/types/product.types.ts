import { IPagination, IResponseFields, ISorting } from './api.types.ts';
import { ObtainTypeValues } from './helper.types.ts';

export interface IProduct {
  name: string;
  manufacturer: ObtainTypeValues<typeof MANUFACTURERS>;
  price: number;
  amount: number;
  notes?: string;
}

export const MANUFACTURERS = {
  APPLE: 'Apple',
  SAMSUNG: 'Samsung',
  GOOGLE: 'Google',
  MICROSOFT: 'Microsoft',
  SONY: 'Sony',
  XIAOMI: 'Xiaomi',
  AMAZON: 'Amazon',
  TESLA: 'Tesla',
} as const;

export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export interface IProductInOrder extends IProduct {
  _id: string;
  received: boolean;
}

export interface IProductResponseSorted extends IProductsResponse, IPagination {
  sorting: ISorting<TSortProductsFields>;
  manufacturer: (typeof MANUFACTURERS)[];
}

export interface ITopProduct {
  name: string;
  sales: number;
}

export enum ESortProductsFields {
  NAME = 'name',
  PRICE = 'price',
  MANUFACTURER = 'manufacturer',
  CREATED_ON = 'createdOn',
}

export type TSortProductsFields = `${ESortProductsFields}`;

export type TTableFields = 'Name' | 'Price' | 'Manufacturer' | 'Created On';

export interface IProductRequestParams {
  search?: string;
  manufacturer?: ObtainTypeValues<typeof MANUFACTURERS> | string | ObtainTypeValues<typeof MANUFACTURERS>[];
  sortField?: TSortProductsFields | string;
  sortOrder?: 'asc' | 'desc';
}
