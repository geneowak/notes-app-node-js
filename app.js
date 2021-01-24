const chalk = require('chalk')
const { demandCommand } = require('yargs')
const yargs = require('yargs')
const log = console.log
const notes = require('./notes.js')
const info = chalk.cyan

// Customize yargs version
// yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
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
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler({title}) {
        notes.removeNote(title)
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title:{
            type: 'string',
            demandCommand: true,
            describe: 'Title of the note'
        }
    },
    handler({title}) {
        notes.readNote(title)
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'Listing notes.',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()