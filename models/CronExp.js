/**************************************
 * /models/CronExp.js
 **************************************/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*************************************************************
 * Field Name 	    Allowed Values    Allowed Special Characters
 * Seconds          0-59 	            , - *
 * Minutes 	        0-59 	            , - *
 * Hours 	          0-23 	            , - *
 * Day-of-month     1-31 	            , - *
 * Month 	          1-12 	            , - *
 * Day-of-Week 	    1-7 	            , - * #
 * Year (Optional)  empty, 1970-2199  , - *
 *
 * Character key:
 *   *       All values; every <field>
 *   x-n     Range of x to n; e.g., 10-12 means 10,11,12
 *   ,       List delimiter; e.g., 1,2,4,7
 *   x#n     (week field only) Counter for week number; e.g.,
 *             5#2 means second Fri of month
 *************************************************************/

const CronExprSchema = new Schema({
  minute: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  dayOfMonth: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  naturalMinute: {
    type: String,
  },
  naturalHour: {
    type: String,
  },
  naturalDom: {
    type: String,
  },
  naturalMonth: {
    type: String,
  },
  naturalDow: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('cronExp', CronExprSchema);
