export const errorMessages = {
  productNotFound: (productId: string) => `Product with id '${productId}' wasn't found`,
} as const;
