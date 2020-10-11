const fs = require("fs");
const path = require("path");


// function findById(id, notesArray) {
//     const result = notesArray.filter(notes => notes.id === id);
//     // console.log(notesArray[0]);
//     // console.log(notesArray[0].id);
//     return result;
// }

function validateNote(note) {
    console.log(note);
    if (!note.title || typeof note.title !== 'string') {
        console.log(note.title);
        console.log("title error");
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        console.log(note.text);
        console.log("text error");
        return false;
    }
    if (!note.id || typeof note.id !== 'number') {
        console.log(note.id);
        console.log("id error");
        return false;
    }
    return true;
}

function createNewNote(body, db) {
    const note = body;
    db.notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: db }, null, 2)
    );
    return note;
}

function updateNextID(db, nextID) {
    
    db.nextID = nextID;

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(db, null, 2)
    );
    return db.nextID;
}

function deleteNote(db, id) {
    const filteredItems = db.notes.filter(notes => notes.id !== id);
    db.notes = filteredItems;
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(db, null, 2)
    );
    console.log(filteredItems);
// ["a", "b", "d", "e", "f"]
    return db
}


module.exports = {
    validateNote,
    createNewNote,
    updateNextID,
    deleteNote
};