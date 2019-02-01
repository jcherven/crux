/**************************************
 * /routes/api/users.js
 **************************************/

const express = require('express');

require('dotenv').config();
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const serverKey = process.env.serverKey;

const User = require('../../models/User');

// Require input validation scripts
const validateRegInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/**************************************
 * @route       GET api/users/test
 * @desc        Tests users route
 * @access      Public
***************************************/
router.get('/test', (req, res) => res.json({msg: "Users routing successfully"}));

/**************************************
 * @route       POST api/users/register
 * @desc        register new user
 * @access      Public
  ***************************************/
router.post('/reg', (req, res) => {
  const { errors, isValid } = validateRegInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email  })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      };
    });
});

/**************************************
 * @route       POST api/users/signin
 * @desc        user sign in
 * @access      Public
 ***************************************/
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({email: "Email isn't validating"});
      };
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name };
            jwt.sign(
              payload,
              serverKey,
              { expiresIn: '3hr' },
              (err, token) => {
                res.json({
                  loginSuccessful: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: "Password isn't validating" });
          };
        });
    });
});

/**************************************
 * @route       GET api/users/current
 * @desc        Return currently logged in user
 * @access      Private
 ***************************************/
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
