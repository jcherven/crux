/**************************************
 * /.validation/expression.js
 **************************************/

const Validator = require('validator');

module.exports = function validateExprIput(data) {
  let errors = {};
  let isValid = false;

  data.expression = (data.expression) ? data.expression.trim() : "";
  data.description = (data.description) ? data.description.trim() : "";

  if ( Validator.isEmpty(data.expression.toString()) )
    errors.expression = "Cron Expression is required";
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

