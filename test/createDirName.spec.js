const assert = require("assert");
const { createDirName } = require("../utils/createCSV");

describe("#createDirName() 3", () => {
  it("should return filterObj with equal === 1", () => {
    const row = {
      row: "first",
      column: "second",
      control: "third",
    };
    const name = createDirName(row);
    assert.strictEqual(name, "first x second x third");
  });
});

describe("#createDirName() 2", () => {
  it("should return filterObj with equal === 1", () => {
    const row = {
      row: "first",
      column: "second",
    };
    const name = createDirName(row);
    assert.strictEqual(name, "first x second");
  });
});
