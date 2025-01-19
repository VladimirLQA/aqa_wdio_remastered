//TODO: npm run test -- --spec="./src/tests/table.test.ts"

const table = [
  {
    "Last Name": "Smith",
    "First Name": "John",
    Email: "jsmith@gmail.com",
    Due: "$50.00",
    "Web Site": "http://www.jsmith.com",
  },
  {
    "Last Name": "Bach",
    "First Name": "Frank",
    Email: "fbach@yahoo.com",
    Due: "$51.00",
    "Web Site": "http://www.frank.com",
  },
  {
    "Last Name": "Doe",
    "First Name": "Jason",
    Email: "jdoe@hotmail.com",
    Due: "$100.00",
    "Web Site": "http://www.jdoe.com",
  },
  {
    "Last Name": "Conway",
    "First Name": "Tim",
    Email: "tconway@earthlink.net",
    Due: "$50.00",
    "Web Site": "http://www.timconway.com",
  },
];

describe("Tables", async function () {
  beforeEach(async function () {
    await browser.url("https://the-internet.herokuapp.com/");
    await $('[href="/tables"]').click();
  });

  it("Table parse", async function () {
    const tableSelector = "#table1";
    const headersSelector = `${tableSelector} .header`;

    const headersElements = await $$(headersSelector).getElements();
    const headers = await headersElements.map(async (element) => await element.getText());
    headers.pop();
    const tableData: Record<string, string>[] = [];
    const rows = await $$(`${tableSelector} tbody tr`).getElements();
    await rows.forEach(async (row) => {
      const cells = await row.$$("td").getElements();
      const cellsTexts = await cells.map(async (cell) => await cell.getText());
      const rowObject = headers.reduce((obj, header, i) => {
        obj[header] = cellsTexts[i];
        return obj;
      }, {} as Record<string, string>);
      tableData.push(rowObject);
    });
    expect(tableData.length).toEqual(table.length);
    table.forEach((expected, i) => {
      expect(expected).toMatchObject(tableData[i]);
    });
  });
});
