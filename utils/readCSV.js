const csv = require("csvtojson");
const csvFilePath = "./in.csv";

// Accepts a filter string and type then returns an object
// with an array of filters and a equal to value
// In: "!19, 20, 21"
// Out:
// {
//   title: "AGE"
//   equal: 0,
//   filters: ["19", "20", "21"]
// }
function parseFilter(filter, title) {
  const filterObj = { title };

  if (filter != "") {
    if (filter.startsWith("!")) {
      filterObj.equal = 0;
      filter = filter.substring(1);
      filterObj;
    } else {
      filterObj.equal = 1;
    }

    filterObj.filters = filter.split(", ");
  }

  return filterObj;
}

// Reads in.csv and returns an array with
// each index being an object for a crosstab
// Example:
// [
//    {
//      dateRange: "2008-2009",
//      column: "RECMJ_B",
//      control: "AGE",
//      row: "ELGMJ_B",
//      filters: [
//       {
//         title: "AGE",
//         equal: 1,
//         filters: [18, 19],
//       },
//       {
//         title: "ELGMJ_B",
//         equal: 1,
//         filters: [1],
//      },
//      ]
//    },
//     ...
// ]
async function readCSV() {
  const jsonArray = await csv().fromFile(csvFilePath);

  const formattedArray = jsonArray.map((row) => {
    const rowObj = {
      dateRange: row["Data Years"],
      column: row["Column Variable"] && row["Column Variable"],
      control: row["Control Variable"] && row["Control Variable"],
      row: row["Row Variable"],
      filters: [],
    };

    if (row["Column Filters"]) {
      rowObj.filters.push(
        parseFilter(row["Column Filters"], row["Column Variable"])
      );
    }

    if (row["Row Filters"]) {
      rowObj.filters.push(parseFilter(row["Row Filters"], row["Row Variable"]));
    }

    if (row["Control Filters"]) {
      rowObj.filters.push(
        parseFilter(row["Control Filters"], row["Control Variable"])
      );
    }

    return rowObj;
  });

  return formattedArray;
}

module.exports = {
  readCSV,
  parseFilter,
};
