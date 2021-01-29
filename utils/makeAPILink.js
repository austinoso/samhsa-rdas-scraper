function buildFilter(filters) {
  // Filters is an array of objects
  // with keys pointing to an array of filters
  // filtersObj = [
  //    {
  //    title: "AGE",
  //    equal: 1  // (1 for yes 0 for no)
  //    filters: [18, 21, 32]
  //    }
  //    This filter would filter "AGE", equal to [18, 21, 32]
  // ]

  let filtersArray = [];

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];

    let filterString = "";
    filterString += filter.title;

    if (filter.equal === 0) filterString += "!";

    for (let k = 0; k < filter.filters.length; k++) {
      const filterVar = filter.filters[k];

      if (k === 0) {
        filterString += `%3D${filterVar}`;
      } else {
        filterString += `%2C${filterVar}`;
      }
    }
    filtersArray.push(filterString);
  }

  const completedString = filtersArray.join("%26");

  return completedString;
}

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
  buildFilter,
};
