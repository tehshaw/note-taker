const express = require('express');
const path = require('path');
const notes = require('./routes/notes');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', notes)

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile('./index.html')
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile('./notes.html')
);

// GET Route for feedback page
app.get('*', (req, res) =>
  res.sendFile('./404.html')
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
