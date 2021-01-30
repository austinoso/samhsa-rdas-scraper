const assert = require("assert");
const { parseFilter } = require("../utils/readCSV");

describe("#parseFilter() equal", () => {
  it("should return filterObj with equal === 1", () => {
    const filters = "19, 20, 21";

    const filterObj = parseFilter(filters);
    assert.strictEqual(filterObj.equal, 1);
  });
});

describe("#parseFilter() filters", () => {
  it("should return an filterObj with filters === [19,20,21]", () => {
    const filters = "19, 20, 21";

    const filterObj = parseFilter(filters);
    assert.deepStrictEqual(filterObj.filters, ["19", "20", "21"]);
  });
});

describe("#parseFilter() equal", () => {
  it("should return filterObj with equal === 0", () => {
    const filters = "!19, 20, 21";

    const filterObj = parseFilter(filters);
    assert.strictEqual(filterObj.equal, 0);
  });
});

describe("#parseFilter() equal", () => {
  it("should return filterObj with equal === 0", () => {
    const filters = "!19, 20, 21";

    const filterObj = parseFilter(filters);
    assert.deepStrictEqual(filterObj.filters, ["19", "20", "21"]);
  });
});
