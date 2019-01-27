const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const expressions = require('./routes/api/expressions');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then( () => console.log(`======== MongoDB Connected ========`))
  .catch( err => console.log(err) );

app.get('/', (req, res) => res.send(`SANCHECK`));

// user routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/expressions', expressions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Crux server running at http://localhost:${port}`));
