const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function createDirName(eRow) {
  const { row, column, control } = eRow;

  let dirName = row;

  if (column) dirName += ` x ${column}`;
  if (control) dirName += ` x ${control}`;

  return dirName;
}

//returns api cell data in a format best for CSV
function getDataFromCells(apiData) {
  const data = [];

  for (let i = 0; i < apiData.cells.length; i++) {
    const cell = apiData.cells[i];

    const row = cell.row_option
      ? apiData.row.options.find((option) => option.key === cell.row_option)
          .title
      : "Overall";

    const column = cell.column_option
      ? apiData.column.options.find(
          (option) => option.key === cell.column_option
        ).title
      : "Overall";

    const control = cell.control_option
      ? apiData.control.options.find(
          (option) => option.key === cell.control_option
        ).title
      : "Overall";

    const dataFromCell = {
      row,
      column,
      control,
      wCount: cell.count.weighted,
      countSE: cell.count.standard_error,
      totalPercent: cell.total.percent,
      totalPercentSE: cell.total.standard_error,
      totalPercentCILower: cell.total.confidence_interval[0],
      totalPercentCIUpper: cell.total.confidence_interval[1],
      rowPercent: cell.row.percent,
      rowPercentSE: cell.row.standard_error,
      rowPercentLower: cell.row.confidence_interval[0],
      rowPercentUpper: cell.row.confidence_interval[1],
      columnPercent: cell.column.percent,
      columnPercentSE: cell.column.standard_error,
      columnPercentLower: cell.column.confidence_interval[0],
      columnPercentUpper: cell.column.confidence_interval[1],
      year: apiData.year,
    };

    data.push(dataFromCell);
  }

  return data;
}

// Returns headers for CSV using api titles
function getHeaders(apiData) {
  const headers = [
    { id: "row", title: apiData.row.key },
    { id: "totalPercent", title: "totalPercent" },
    { id: "totalPercentSE", title: "totalPercentSE" },
    { id: "totalPercentCILower", title: "totalPercentCILower" },
    { id: "totalPercentCIUpper", title: "totalPercentCIUpper" },
    { id: "rowPercent", title: "rowPercent" },
    { id: "rowPercentSE", title: "rowPercentSE" },
    { id: "rowPercentLower", title: "rowPercentLower" },
    { id: "rowPercentUpper", title: "rowPercentUpper" },
    { id: "columnPercent", title: "columnPercent" },
    { id: "columnPercentSE", title: "columnPercentSE" },
    { id: "columnPercentLower", title: "columnPercentLower" },
    { id: "columnPercentUpper", title: "columnPercentUpper" },
    { id: "wCount", title: "wCount" },
    { id: "countSE", title: "countSE" },
    { id: "year", title: "yearRange" },
  ];

  if (apiData.column)
    headers.unshift({ id: "column", title: apiData.column.key });
  if (apiData.control)
    headers.unshift({ id: "control", title: apiData.control.key });

  return headers;
}

function createCSV(filePath = "./out.csv", inData) {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: getHeaders(inData),
  });

  const data = getDataFromCells(inData);
  csvWriter
    .writeRecords(data)
    .then(() => console.log(`Created .csv at ${filePath}`));
}

module.exports = {
  createCSV,
  createDirName,
};
