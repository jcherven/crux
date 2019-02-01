/**************************************
 * /server.js
 **************************************/

const express = require('express');

require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const expressions = require('./routes/api/expressions');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then( () => console.log(`======== MongoDB Connected ========\n`))
  .catch( err => console.log(err) );

// Passport middleware config
app.use(passport.initialize());
require('./config/passport')(passport);

// user routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/expressions', expressions);

const port = process.env.PORT;

app.listen(port, () => console.log(`Crux server listening at port ${port}`));
