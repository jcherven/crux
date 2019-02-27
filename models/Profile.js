/**************************************
 * /models/Profile.js
 **************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  vanityUrl: {
    type: String,
    required: true,
    min:3,
    max: 32,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  github: {
    type: String,
  },
  twitter: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);
