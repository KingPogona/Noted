const router = require('express').Router();

const {validateNote, createNewNote, updateNextID, deleteNote} = require('../../lib/notes.js');
const db = require('../../db/db.json');




router.get('/notes', (req, res) => {
    let results = db.notes;

    res.json(results);
});

// router.get('/notes/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const result = findById(id, notes);
//     // console.log(typeof id);
//     if (result) {
//         res.json(result);
//     } else {
//         res.sendStatus(404);
//     }
// });

router.get('/nextID', (req, res) => {
    let result = db.nextID;

    res.json(result);
});

router.post('/notes', (req, res) => {
    let nextID = db.nextID
    // set id based on nextID
    req.body.id = nextID;
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note was not properly formatted.');
    } else {
        const note = createNewNote(req.body, db);
        updateNextID(db, nextID + 1);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = deleteNote(db, id);
    if (result) {
        
        res.json('The note was deleted successfully.');
    } else {
        res.sendStatus(404);
    }
});


module.exports  = router;