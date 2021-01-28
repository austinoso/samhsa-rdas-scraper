function getAPILink(year, row, column = null, control = null, filter = null) {
  const root = "https://rdas.samhsa.gov/api/surveys/";
  const yearL = `NSDUH-${year}-RD02YR`;
  const rowL = `&row=${row}`;
  const columnL = column ? `?column=${column}` : "";
  const controlL = control ? `&control=${control}` : "";
  const filterL = filter ? `&filter=${filter}` : "";

  return (
    root +
    yearL +
    "/crosstab/" +
    columnL +
    controlL +
    filterL +
    "&format=json" +
    rowL +
    "&run_chisq=false&weight=DASWT_1"
  );
}

module.exports = {
  getAPILink,
};
