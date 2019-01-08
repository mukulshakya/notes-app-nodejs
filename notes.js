const fs = require('fs');


var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync("notes-json.js");
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync("notes-json.js",JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title: title,
        body: body
    }

    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    var notes = fetchNotes();

    try {
        console.log(`Listing ${notes.length} Note(s)`);
        console.log("---");
        for(var i=0; i<notes.length; i++) {
            console.log("Title : "+notes[i].title);
            console.log("Body : "+notes[i].body);
            console.log("---");
        }
    }
    catch (e) {
        console.log("error : File Not Found!");
    }
};

var removeNote = (title) => {
    var notes = fetchNotes();

    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return filteredNotes.length == notes.length;
};

var getNote = (title) => {
    console.log("Getting Note "+title);

    var notes = fetchNotes();
    var count = 0;
    var found = 0;

    try {
        for(var i=0; i<notes.length; i++) {
            if(notes[i].title === title) {
                found = i;
                count++;
                break;
            }
        }
        if(count === 0) {
            console.log("Invalid Title!");
        }
        console.log("Showing Note");
        console.log("---");
        console.log("Title : "+notes[found].title);
        console.log("Body : "+notes[found].body);
    } 
    catch (e) {
        console.log("error : File Not Found!");
    }
};

var removeAll = () => {
    var notes = fetchNotes();
    if(notes.length === 0) {
        return false;
    }
    else {
        notes = [];
        saveNotes(notes);
        return true;
    }
}

module.exports = {
    addNote: addNote,
    getAll: getAll,
    removeNote: removeNote,
    getNote: getNote,
    removeAll: removeAll
};