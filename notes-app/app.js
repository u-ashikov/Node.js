const notes = require('./notes');
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
        notes.save(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.remove(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing all notes.',
    handler: function () {
        notes.list();
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