const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  });

  notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
        title,
        text,
        id: crypto.randomUUID(),

    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;
