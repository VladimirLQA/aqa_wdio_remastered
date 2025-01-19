//TODO: npm run test -- --spec="./src/tests/array.test.ts"

describe("Array", async function () {
  beforeEach(async function () {
    await browser.url("https://the-internet.herokuapp.com/");
  });

  it("Test 1", async function () {
    const arrayOfLinks = await $$("ul a").getElements();
    // for (const link of arrayOfLinks) {
    //   const text = await link.getText();
    //   console.log(text);
    // }
    // await arrayOfLinks.forEach(async (link) => {
    //   const text = await link.getText();
    //   console.log(text);
    // });
    const element = await arrayOfLinks.find<WebdriverIO.Element>(async (link) => (await link.getText()) === "Entry Ad");
    const text = await element.getText();
    console.log(text);
    const arrayOfNames = await arrayOfLinks.map(async (link) => await link.getText());
    console.log(arrayOfNames);
  });
});
