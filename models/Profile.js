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
    max: 32
  },
  website: {
    type: String,
  },
  githubUserName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);
