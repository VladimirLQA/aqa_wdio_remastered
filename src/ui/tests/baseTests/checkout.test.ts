//TODO: npm run test -- --spec="./src/tests/checkout.test.ts"

const url = "https://anatoly-karpovich.github.io/demo-shopping-cart/";

describe("Shopping cart", async function () {
  const addToCartSelector = (productName: string) =>
    `//div[@class="card-body" and ./*[.="${productName}"]]//button[@name="add-to-card"]`;
  beforeEach(async function () {
    await browser.url(url);
  });

  it("Should checkout with 3 products", async function () {
    const products = [
      {
        name: "Product 1",
        price: 100,
      },
      {
        name: "Product 3",
        price: 500,
      },
      {
        name: "Product 5",
        price: 1000,
      },
    ];

    const totalPrice = products.reduce((total, product) => product.price + total, 0);
    for (const product of products) {
      await $(addToCartSelector(product.name)).click();
    }
    await expect($("#badge-number")).toHaveText(String(products.length));
    await $("#shopping-cart-btn").click();
    await expect($("#amount-of-products-in-cart")).toHaveText(String(products.length));
    await expect($("#total-price")).toHaveText(`$${totalPrice.toFixed(2)}`);
    await $("#continue-to-checkout-button").click();
    await expect($(".text-muted")).toHaveText(`$${totalPrice.toFixed(2)}`);
    await expect($(".badge.rounded-pill")).toHaveText(String(products.length));
  });
});
