const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/test
// @desc        Tests profile route
// @access      Public
router.get('/test', (req, res) => res.json({msg: "Profile routing successfully"}));

// @route       GET api/profile
// @desc        Retrieve a user's profile if it exists
// @access      Private
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.profileNotFound = "User profile not found";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
