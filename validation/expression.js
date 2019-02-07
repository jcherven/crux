/**************************************
 * /.validation/expression.js
 **************************************/

const Validator = require('validator');

module.exports = function validateExprIput(data) {
  let errors = {};
  let warnings = {};
  let isValid = false;
  let noWarnings = false;

  data.minute = (data.minute) ? data.minute.trim() : "*";
  data.hour = (data.hour) ? data.hour.trim() : "*";
  data.dayOfMonth = (data.dayOfMonth) ? data.dayOfMonth.trim() : "*";
  data.month = (data.month) ? data.month.trim() : "*";
  data.dayOfWeek = (data.dayOfWeek) ? data.dayOfWeek.trim() : "?";

  data.description = (data.description) ? data.description.trim() : "";

  if ( Validator.equals(data.minute.toString(), "*") )
    warnings.minute = "This expression will trigger every minute!";

  if ( Validator.equals(data.hour.toString(), "*") )
    warnings.hour = "This expression will trigger every hour!";

  if ( Validator.equals(data.hour.toString(), "*") )
    warnings.dayOfMonth = "This expression will trigger day at 00:00!";

  if ( Validator.equals(data.hour.toString(), "*") )
    warnings.month = "This expression will trigger every month!";

  if ( Validator.equals(data.hour.toString(), "*") )
    warnings.dayOfWeek = "This expression will trigger every day!";

  if ( Validator.isEmpty(data.description.toString()) )
    errors.description = "Description is required";

  if (
    errors === '' ||
    errors === undefined ||
    errors === null ||
    Object.keys(errors).length === 0
  )
    isValid = true;

  return {
    errors,
    warnings,
    isValid: isValid,
    noWarnings: noWarnings,
  };
};

