const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results", //make sure this is in folder not in the root
  reportPath: "./test-results",
  reportName: "Playwright Automation Report",
  pageTitle: "DriftSense App test report",
  displayDuration: false,

  metadata: {
    browser: {
      name: "chrome",
      version: "112",
    },
    device: "Local test machine",
    platform: {
      name: "ubuntu",
      version: "16.04",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      //{ label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      //{ label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});