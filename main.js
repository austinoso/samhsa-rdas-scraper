const { getCrosstabFromLink } = require("./utils/rdasApi");
const { createCSV } = require("./utils/createCSV");
const { getAPILink } = require("./utils/makeAPILink");

const link =
  "https://rdas.samhsa.gov/api/surveys/NSDUH-2008-2009-RD02YR/crosstab/?column=AGE&control=ELGMJ_B&filter=AGE%3D18%2C19%26ELGMJ_B%3D1&format=json&row=RECMJ_B&run_chisq=false&weight=DASWT_1";

const link2 =
  "https://rdas.samhsa.gov/api/surveys/NSDUH-2008-2009-RD02YR/crosstab/?column=PINC2&format=json&row=ALCEVER&run_chisq=false&weight=DASWT_1";

function main() {
  const apiLink = getAPILink(
    "2008-2009",
    "RECMJ_B",
    "AGE",
    "ELGMJ_B",
    "AGE%3D18%2C19%26ELGMJ_B%3D1"
  );

  getCrosstabFromLink(apiLink).then((data) => {
    createCSV("out.csv", data);
  });
}

main();
