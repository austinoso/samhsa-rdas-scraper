# SAMHSA Restricted-use Data Analysis System Scraper

Scraper built in NodeJS for SAMHSA's Restricted-use Data Analysis System. Created as an easier method of obtaining data opposed to running a crosstab.

## Setup Instructions

1.  Clone or [download](https://github.com/austinoso/samhsa-rdas-scraper/archive/main.zip) this repo

2.  Extract the files to a location of your choice

3.  Install the latest version of [node](https://nodejs.org/en/download/)

4.  In Windows, search for 'cmd' to find command prompt, if in Mac OS, search for your terminal

5.  In command prompt type 'cd <filepath where you extracted the package>, and press enter

6.  After the correct filepath is selected, type `npm install` and press enter to install all dependencies

---

## Running Instructions

### 1. The in.csv

The in.csv file should contain the input variables for each call to the API

- Data Years: The 2-Year data set you're targeting
- Row Variable: The key row variable
- Column Variable: The key column variable (optional)
- Control Variable: The key control variable (optional)
- Row, Column, and Control Filters: Filters for their respective variable. (must be a number, optional)

### 2. Execution

To execute the program run `node main.js` in command prompt / terminal or with npm `npm start`

You can also create a .bat file `<FILENAME HERE>.bat` and paste either of those commands as an easier single-click method of executing the code

## Troubleshooting

For help understanding console commands in Windows: https://www.digitaltrends.com/computing/how-to-use-command-prompt/

For help completing these steps in a macOS: https://macpaw.com/how-to/use-terminal-on-mac

For help troubleshooting issues with NodeJS: https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line

## Contributors

- [Barret Montgomery](https://www.linkedin.com/in/barrett-montgomery-b378167a/)
