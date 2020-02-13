const fs = require('fs');
const getNotes = require('./notes');

fs.appendFileSync("notes.txt", 'This is new text, appended to the file.');

var notes = getNotes();
console.log(notes);