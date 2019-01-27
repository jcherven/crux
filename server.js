const express = require('express');
const mongoose = require('mongoose');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then( () => console.log(`MongoDB Connected`))
  .catch( err => console.log(err) );

app.get('/', (req, res) => res.send(`SANCHECK`));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Crux server running at http://localhost:${port}`));
