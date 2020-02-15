const fs = require('fs');
const chalk = require('chalk');

function save(title, body) {
    var allNotes = getNotes();

    var note = { title, body };

    var duplicateNotes = allNotes.filter(function (note) {
        return note.title == title;
    });

    if (duplicateNotes && duplicateNotes.length != 0) {
        console.log(chalk.red('Note with title ' + title + ' already exists!'));
    } else {
        allNotes.push(note);

        storeNotes(allNotes);

        console.log(chalk.green('Note saved successfully!'));
    }
}

function getNotes() {
    try {
        var notesDataBuffer = fs.readFileSync('notes.json');
        var allNotes = JSON.parse(notesDataBuffer.toString());

        return allNotes;
    } catch (error) {
        return [];
    }
}

function storeNotes(allNotes) {
    fs.writeFileSync('notes.json', JSON.stringify(allNotes));
}

module.exports = {
    save
}