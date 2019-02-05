const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExprSchema({
  expression: [
    {
      second: {
        type: String,
        required: true,
        default: '*',
      },
      minute: {
        type: String,
        required: true,
        default: '*',
      },
      hour: {
        type: String,
        required: true,
        default: '*',
      },
      dayOfMonth: {
        type: String,
        required: true,
        default: '*',
      },
      month: {
        type: String,
        required: true,
        default: '*',
      },
      dayOfWeek: {
        type: String,
        required: true,
        default: '*',
      },
      year: {
        type: String,
        required: true,
        default: '*',
      },
    }
  ],
  description: {
    type: String,
    required: true,
  },
});

module.exports = Post = mongoose.model('expression', ExprSchema);
