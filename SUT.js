const path = require('path');

let projectBasedDir = __dirname;

module.exports = {

    testSpecFolder: path.join(projectBasedDir, '/tests/specs/**/*.spec.js'),
    outputFolder: path.join(projectBasedDir,'output'),
    //Issue for configuring dynamic bootstrap: https://github.com/codecept-js/CodeceptJS/issues/2437
    bootstrapFile: "./../run_server.js",
    configFolder: path.join(projectBasedDir, '/configs'),
    IObject: path.join(projectBasedDir,'/steps_file.js'),
    pageFactory: path.join(projectBasedDir,'/tests/pageFactory.js')
}
