const rimraf = require("rimraf");
const dotenv = require("dotenv");
const fs = require("fs");

module.exports = {
  bootstrap: function (done) {
    //Delete output file
    let outputPath = `${process.cwd()}/output`;
    if (fs.existsSync(outputPath)) {
      rimraf.sync(outputPath, { rmdir: true }, (err) => {
        if (err) {
          console.log("Error: ", error.message);
        }
        console.log("Deleted output folder!");
      });
    }
    fs.mkdirSync(`${outputPath}`);
    done();
  },
};
