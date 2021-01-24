const fs = require('fs')
const chalk = require('chalk')

const success = chalk.green
const bold = chalk.bold
const error = chalk.red
const warning = chalk.keyword('orange')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (! duplicateNote) {
        notes.push({ title, body })
        saveNotes(notes)
        console.log(success.inverse('Note added successfully:'), notes);
    }
    else {
        console.log(error.inverse('Note title taken'));
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const bufferData = fs.readFileSync("notes.json")
        const dataJson = bufferData.toString()
        return JSON.parse(dataJson)
    } catch (exception) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length === notesToKeep.length) {
        console.log(chalk.bgRed('Note not found.'))
    }
    else {
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('Removed note titled: ' + bold.underline(title)));
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length > 0) {
        console.log(chalk.inverse("Your notes"));
        notes.forEach((note, index) => console.log(++index + '. ' + note.title))
    }
    else {
        console.log(error("No notes found..."));
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }
    else {
        console.log(error.inverse('No note found.'));
    }
}

module.exports = {
    addNote: addNote,
    removeNote,
    listNotes,
    readNote
};