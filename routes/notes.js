const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    console.info("Notes.get called")
})

notes.post('/notes', (req, res, next) => {
    res.send("Received write request")
    console.info("Notes.post called")
})

notes.use('/notes', (req, res) => {
    console.info("Notes.delete called")
    console.info(req.path)

    const path = parseInt(req.path.slice(1));
    const test = /\b\d+\b/;
    
    if(test.test(path) ){
        console.info("true")
        next()
    }else{
        res.status(404).send("Invalid request")
        // throw new Error("Invalid request")
    }

})

notes.delete('/notes', (req, res) => {
    
})





module.exports = notes;