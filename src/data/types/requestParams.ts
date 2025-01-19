import { MANUFACTURERS } from "./product.types";

export interface IProductRequestParams {
  search?: string;
  manufacturer?: MANUFACTURERS | string | MANUFACTURERS[];
  sortField?: ("name" | "price" | "createdOn" | "manufacturer") | string;
  sortOrder?: "asc" | "desc";
}
