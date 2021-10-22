const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    console.info("Notes.get called")
})

notes.post('/', (req, res, next) => {
    console.info("Notes.post called")

    if (req.body) {
        console.info("Valid write request")
        next()
    } else {
    res.error('Error in adding tip');
    }
}, async function (req, res, next) {
    
    const { title, text} = req.body;
    const notes = JSON.parse( await readFromFile('./db/db.json'))
   
    const newNote = {
        title,
        text,
        id: uuidv4()
      };
    
      notes.push(newNote)
    
    writeToFile('./db/db.json', notes)

    console.info("Note added successfully");
    res.send(`Note added successfully`);

})

notes.delete('/:id', (req, res, next) => {
    console.info("Notes.delete called")
  
    if(req.params.id){
        console.info("Valid delete request")
        next()
    }else{
        console.info("Invalid delete request " + req.originalUrl)
        res.status(404).send("Invalid request")
        // throw new Error("Invalid request")
    }

}, async function (req, res, next) {

    const newid = req.params.id
    const notes = JSON.parse( await readFromFile('./db/db.json'))

    const note = notes.findIndex( ({id}) => id === newid)

    notes.splice(note,1)

    await writeToFile('./db/db.json', notes)

    res.send("Delete request processed")
    console.info("Delete processed")

})




module.exports = notes;