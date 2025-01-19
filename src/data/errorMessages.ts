export const ERROR_MESSAGES = {
  ["PRODUCT_NOT_FOUND"]: (productId: string) => `Product with id \'${productId}\' wasn\'t found`,
} as const;
