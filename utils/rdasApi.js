const fetch = require("node-fetch");

// Fetches and returns json API data from SAMHSA API
async function getCrosstabFromLink(link) {
  const res = await fetch(link);
  const data = await res.json();

  return data.results;
}

module.exports = {
  getCrosstabFromLink,
};
