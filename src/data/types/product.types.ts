import { IResponseFields } from './api.types.ts';
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
