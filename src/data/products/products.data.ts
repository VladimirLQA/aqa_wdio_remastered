export const PRODUCT_TABLE_HEADERS = {
  NAME: 'Name',
  PRICE: 'Price',
  MANUFACTURER: 'Manufacturer',
  CREATED_ON: 'Created On',
} as const;

export const PRODUCTS_TOAST_MESSAGES = {
  CREATED: `Product was successfully created`,
  UPDATED: `Product was successfully updated`,
  DELETED: `Product was successfully deleted`,
  'ASSIGNED TO ORDER': `Not allowed to delete product, assigned to the order`,
  'ALREADY EXIST': (name?: string) => `Product with name '${name}' already exists`,
};
