const homeHandler = require('./home');
const staticFilesHandler = require('./static-files');
const catHandler = require('./cat');
const breedHandler = require('./breed');

module.exports = [homeHandler, staticFilesHandler, catHandler, breedHandler];