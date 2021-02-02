# SAMHSA Restricted-use Data Analysis System Scraper

Scraper built in NodeJS for SAMHSA's Restricted-use Data Analysis System. Created as an easier method of obtaining data opposed to running a crosstab.

## Setup Instructions

1.  Clone or [download](https://github.com/austinoso/samhsa-rdas-scraper/archive/main.zip) this repo.

2.  Install the latest version of [node](https://nodejs.org/en/download/).

3.  Run `npm install` in your terminal to install all dependencies

---

## Running Instructions

### 1. The in.csv

The in.csv file should contain the input variables for each call to the API.

- Data Years: The 2-Year data set you're targeting
- Row Variable: The key row variable
- Column Variable: The key column variable (optional)
- Control Variable: The key control variable (optional)
- Row, Column, and Control Filters: Filters for their respective variable. (must be a number, optional)

### 2. Execution

To execute the program rn `node main.js` or with npm `npm start`.

You can also create a .bat file `<FILENAME HERE>.bat` and paste either of those commands as an easier single-click method of executing the code.

## Contributors

- [Barret Montgomery](https://www.linkedin.com/in/barrett-montgomery-b378167a/)
