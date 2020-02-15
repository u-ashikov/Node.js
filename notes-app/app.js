const getNotes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('Adding a new note with title ' + argv.title);
        console.log('Adding a new note with body ' + argv.body);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing all notes.',
    handler: function () {
        console.log('Listing all the notes..')
    }
});

yargs.command({
    command: 'read',
    describe: 'Reading a note.',
    handler: function () {
        console.log('Reading a note...');
    }
});

yargs.parse();