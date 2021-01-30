var fs = require("fs");
const { getCrosstabFromLink } = require("./utils/rdasApi");
const { createCSV, createDirName } = require("./utils/createCSV");
const { readCSV } = require("./utils/readCSV");
const { getAPILink, buildFilter } = require("./utils/makeAPILink");

const link =
  "https://rdas.samhsa.gov/api/surveys/NSDUH-2008-2009-RD02YR/crosstab/?column=AGE&control=ELGMJ_B&filter=AGE%3D18%2C19%26ELGMJ_B%3D1&format=json&row=RECMJ_B&run_chisq=false&weight=DASWT_1";

const link2 =
  "https://rdas.samhsa.gov/api/surveys/NSDUH-2008-2009-RD02YR/crosstab/?column=PINC2&format=json&row=ALCEVER&run_chisq=false&weight=DASWT_1";

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
