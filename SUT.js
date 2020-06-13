const path = require('path');

let projectBasedDir = __dirname;

module.exports = {

    testSpecFolder: path.join(projectBasedDir, '/tests/specs/**/*.spec.js'),
    outputFolder: path.join(projectBasedDir,'output'),
    bootstrapFile: "./../run_server.js", // if use dynamic function to get path (e.g. process.cwd()) get error could not find bootstrapFile
    configFolder: path.join(projectBasedDir, '/configs'),
    IObject: path.join(projectBasedDir,'/steps_file.js'),
    pageFactory: path.join(projectBasedDir,'/tests/pageFactory.js')
}