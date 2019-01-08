const notes = require('./notes.js');
const yargs = require("yargs");


const titleOptions = {
                        describe: "Title of Note",
                        demand: true,
                        alias: "t"
                    }
const bodyOptions = {
                        describe: "Body of Note",
                        demand: true,
                        alias: "b"
                    }
const argv = yargs
                .command('add','Add New Note',{
                    title: titleOptions,
                    body: bodyOptions 
                })
                .command('remove','Remove a Note',{
                    title: titleOptions
                })
                .command('read','Read a Note',{
                    title: titleOptions
                })
                .command('list','List All Notes')
                .help()
                .argv;
                
var command = argv._[0];


if(command === "add") {
    var result = notes.addNote(argv.title, argv.body);
    if(result === undefined) {
        console.log("Note Already Exists!");
    }
    else {
        console.log("Note Added");
        console.log("---");
        console.log("Title : "+result.title);
        console.log("Body : "+result.body);
    }
}
else if(command === "remove") {
    var result = notes.removeNote(argv.title);
    var message = result ? "Invalid Title" : `Removed Note ${argv.title}`;
    console.log(message);
}
else if(command === "read") {
    notes.getNote(argv.title);
}
else if(command === "list") {
    notes.getAll();
}
else if(command === "delete") {
    var result = notes.removeAll();
    var message = result ? "All Note(s) Removed" : "No Notes Found!";
    console.log(message);
}
