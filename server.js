const express = require('express');
const path = require('path');
const notes = require('./routes/notes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(__dirname + '/public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', notes)



// GET Route for homepage
app.get('/', (req, res) => {
  let options = {
    root: path.join(__dirname, 'public')
  }
  res.sendFile('/index.html',options)
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  let options = {
    root: path.join(__dirname, 'public')
  }
  res.sendFile('/notes.html', options);
});

// GET Route for feedback page
app.get('*', (req, res) =>
  res.status(404).redirect('./404.html')
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
