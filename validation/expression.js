/**************************************
 * /.validation/expression.js
 **************************************/

const Validator = require('validator');

module.exports = function validateExprIput(data) {
  let errors = {};
  let isValid = false;

  data.second = (data.second) ? data.second.trim() : "";
  data.minute = (data.minute) ? data.minute.trim() : "";
  data.hour = (data.hour) ? data.hour.trim() : "";
  data.dayOfMonth = (data.dayOfMonth) ? data.dayOfMonth.trim() : "";
  data.month = (data.month) ? data.month.trim() : "";
  data.dayOfWeek = (data.dayOfWeek) ? data.dayOfWeek.trim() : "";

  data.description = (data.description) ? data.description.trim() : "";

  if ( Validator.isEmpty(data.second.toString()) )
    errors.second = "Expression <second> is missing";

  if ( Validator.isEmpty(data.minute.toString()) )
    errors.minute = "Expression <minute> is missing";

  if ( Validator.isEmpty(data.hour.toString()) )
    errors.hour = "Expression <hour> is missing";

  if ( Validator.isEmpty(data.dayOfMonth.toString()) )
    errors.dayOfMonth = "Expression <dayOfMonth> is missing";

  if ( Validator.isEmpty(data.month.toString()) )
    errors.month = "Expression <month> is missing";

  if ( Validator.isEmpty(data.dayOfWeek.toString()) )
    errors.dayOfWeek = "Expression <dayOfWeek> is missing";

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
    isValid: isValid
  };
};

