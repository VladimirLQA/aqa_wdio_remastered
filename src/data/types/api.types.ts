import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

export interface IRequestOptions {
  baseURL: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T> {
  status: number;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  body: T;
}

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}

export interface ISorting<T extends string> {
  sortField: T;
  sortOrder: TSortOrder;
}

export interface IPagination {
  page: number;
  limit: number;
  search: string;
  total: number;
}

export enum ESortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type TSortOrder = `${ESortOrder}`;

export type CustomersSortField = 'createdOn' | 'email' | 'name' | 'country';

export type OrderSortFields =
  | 'createdOn'
  | '_id'
  | 'email'
  | 'price'
  | 'delivery'
  | 'status'
  | 'assignedManager';
