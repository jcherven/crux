const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');

// @route       GET api/users/test
// @desc        Tests users route
// @access      Public
router.get('/test', (req, res) => res.json({msg: "Users routing successfully"}));

// @route       GET api/users/register
// @desc        register new user
// @access      Public
router.post('/reg', (req, res) => {
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
        })
      };
    });
});

// @route       GET api/users/signin
// @desc        user sign in
// @access      Public
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({email: "no matching email"});
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name };
            jwt.sign(
              payload,
              keys.serverKey,
              { expiresIn: '3hr' },
              (err, token) => {
                res.json({
                  loginSuccessful: true,
                  token: 'Bearer ' + token
                });
              })
          } else {
            return res.status(400).json({ password: "Password isn't validating" });
          }
        })
    })
})
module.exports = router;
