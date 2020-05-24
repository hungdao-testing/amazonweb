const fs = require("fs");
const path = require("path");
const constants = require("./../../fixtures/constants");
const basePath = process.cwd();

exports.fetchDataFile = function (fileName) {
  return JSON.parse(
    fs.readFileSync(path.join(basePath, constants.dataPath, fileName), "utf-8")
  );
};

// function fetchDataFile(fileName) {
//   return JSON.parse(
//     fs.readFileSync(path.join(basePath, constants.dataPath, fileName), "utf-8")
//   );
// }

// let data = fetchDataFile("valid_search.json");
// console.log(data.keyword);
