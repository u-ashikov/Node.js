const fs = require('fs');
const getNotes = require('./notes');
const chalk = require('chalk');

fs.appendFileSync("notes.txt", 'This is new text, appended to the file.');

var notes = getNotes();

console.log(chalk.red.underline.bgBlack(notes));