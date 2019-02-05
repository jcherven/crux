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
 * @route       GET /api/profile
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
 * @route       Get /api/profile/all
 * @desc        Retrieve all profiles
 * @access      Public
 **************************************/
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfiles =  "No profiles found.";
        return res.status(404).json(errors);
      } else
        res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profile: "No profile found." })
    );
});

/**************************************
 * @route       GET /api/profile/vanityUrl/:vanityUrl
 * @desc        Retrieve profile by user's vanity URL
 * @access      Public
 **************************************/
router.get('/vanityurl/:vanityUrl', (req, res) => {
  const errors = {};
  Profile.findOne({ vanityUrl: req.params.vanityUrl })
    .populate('user', ['name', 'vanityUrl'])
    .then(profile => {
      if (!profile) {
        errors.UrlNoProfile = "Profile not found with that URL";
        res.status(404).json(errors);
      } else
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**************************************
 * @route       GET api/profile/user/:user_id
 * @desc        Retrieve profile by Crux user ID
 * @access      Public
 **************************************/
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'vanityUrl'])
    .then(profile => {
      if (!profile) {
        errors.IdNoProfile = "User not found; cannot retrieve profile";
        res.status(404).json(errors);
      } else
        res.status(404).json(errors);
    })
    .catch(err => res.status(404).json({profile: "Profile not found with this user ID"}));
});

/**************************************
 * @route       POST /api/profile
 * @desc        Create or update current user's profile
 * @access      Private
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
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;

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

/**************************************
 * @route       DELETE /api/profile
 * @desc        Delete currently authenticated user and profile
 * @access      Private
 **************************************/
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id })
      .then(() => {
        User.findOneAndDelete({ _id:req.user.id })
          .then(() => res.json({ success:true }))
      });
  }
);

module.exports = router;
