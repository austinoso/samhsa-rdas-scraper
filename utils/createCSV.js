const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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
    };

    data.push(dataFromCell);
  }

  return data;
}

// Returns headers for CSV using api titles
function getHeaders(apiData) {
  const headers = [
    { id: "row", title: apiData.row.title },
    { id: "totalPercent", title: "Total %" },
    { id: "totalPercentSE", title: "Total % SE" },
    { id: "totalPercentCILower", title: "Total % CI (lower)" },
    { id: "totalPercentCIUpper", title: "Total % CI (upper)" },
    { id: "rowPercent", title: "Row %" },
    { id: "rowPercentSE", title: "Row % SE" },
    { id: "rowPercentLower", title: "Row % CI (lower)" },
    { id: "rowPercentUpper", title: "Row % CI (upper)" },
    { id: "columnPercent", title: "Column %" },
    { id: "columnPercentSE", title: "Column % SE" },
    { id: "columnPercentLower", title: "Column % CI (lower)" },
    { id: "columnPercentUpper", title: "Column % CI (upper)" },
    { id: "wCount", title: "Weighted Count" },
    { id: "countSE", title: "Count SE" },
  ];

  if (apiData.column)
    headers.unshift({ id: "column", title: apiData.column.title });
  if (apiData.control)
    headers.unshift({ id: "control", title: apiData.control.title });

  return headers;
}

function createCSV(filename = "out.csv", apiData) {
  const csvWriter = createCsvWriter({
    path: filename,
    header: getHeaders(apiData),
  });

  const data = getDataFromCells(apiData);
  csvWriter.writeRecords(data).then(() => console.log("Done"));
}

module.exports = {
  createCSV,
};
