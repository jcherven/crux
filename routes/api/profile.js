/**************************************
 * /routes/api/profile.js
 **************************************/

const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');

/**************************************
 * @route       GET api/profile/test
 * @desc        Tests profile route
 * @access      Public
 **************************************/
router.get('/test', (req, res) => res.json({msg: "Profile routing successfully"}));

/**************************************
 * @route       GET api/profile
 * @desc        Retrieve a user's profile if it exists
 * @access      Private
 **************************************/
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

/**************************************
 * @route   POST api/profile
 * @desc    Create or update current user's profile
 * @access  Private
 **************************************/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.name = req.user.name;

    if (req.body.vanityUrl) profileFields.vanityUrl = req.body.vanityUrl;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {    // Update if profile exists
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {        // Create if profile !exists
          Profile.findOne({ vanityUrl: profileFields.vanityUrl }).then(profile => {
            if (profile) {
              errors.vanityUrl = 'This custom URL string has already been taken';
              res.staus(400).json(errors);
            }
            new Profile(profileFields).save().then(profile => res.json(profile));
          })
        };
      });
  }
);

module.exports = router;
