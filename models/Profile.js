const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  urlString: {
    type: String,
    required: true,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.export = Profile = mongoose.model('profile', ProfileSchema);
