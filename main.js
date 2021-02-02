var fs = require("fs");
const { getCrosstabFromLink } = require("./utils/rdasApi");
const { createCSV, createDirName } = require("./utils/createCSV");
const { readCSV } = require("./utils/readCSV");
const { getAPILink, buildFilter } = require("./utils/makeAPILink");

async function main() {
  const csvData = await readCSV();

  for (let i = 0; i < csvData.length; i++) {
    const row = csvData[i];

    var dir = createDirName(row);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const filterString = buildFilter(row.filters);
    const apiLink = getAPILink(
      row.dateRange,
      row.row,
      row.column,
      row.control,
      filterString
    );

    const rowData = await getCrosstabFromLink(apiLink);

    if (rowData.errorCode) {
      console.warn(
        `There was an error with the data input while fetching the link ${apiLink}`,
        rowData
      );
    } else {
      createCSV(`./${dir}/${row.dateRange}.csv`, {
        ...rowData,
        year: row.dateRange,
      });
    }
  }
}

main();
