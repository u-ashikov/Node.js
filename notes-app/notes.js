const fs = require('fs');
const chalk = require('chalk');

function save(title, body) {
    var allNotes = getNotes();

    var note = { title, body };

    var duplicateNotes = allNotes.filter(function (note) {
        return note.title === title;
    });

    if (duplicateNotes && duplicateNotes.length !== 0) {
        console.log(chalk.red('Note with title ' + title + ' already exists!'));
    } else {
        allNotes.push(note);

        storeNotes(allNotes);

        console.log(chalk.green('Note saved successfully!'));
    }
}

function remove(title) {
    var allNotes = getNotes();

    if (!allNotes || allNotes.length == 0) {
        console.log(chalk.red('There are no notes!'));
        return;
    }

    var existingNotes = allNotes.filter(function (note) {
        return note.title === title;
    });

    if (!existingNotes || existingNotes.length == 0) {
        console.log(chalk.red('No such note with title ' + title + '!'));
        return;
    }

    allNotes = allNotes.filter(function (note) {
        return note.title !== title;
    });

    storeNotes(allNotes);

    console.log(chalk.green('Note with title ' + title + ' successfully removed!'));
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
    save,
    remove
}