/**************************************
 * /server.js
 **************************************/

const express = require('express');

require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const expression = require('./routes/api/expression');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serve up static assets for heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
app.use('/api/expression', expression);

//default route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Crux API server listening at port ${port}`));
