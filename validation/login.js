/**************************************
 * /validation/login.js
 **************************************/

const Validator = require('validator')

module.exports = function validateLoginInput(data) {
  let errors = {};
  let isValid = false;

  data.email = (data.email) ? data.email.trim() : "";
  data.password = (data.password) ? data.password.trim() : "";

  if ( Validator.isEmpty(data.email.toString()) )
    errors.email = "Email is required";

  if ( Validator.isEmpty(data.password.toString()) )
    errors.password = "Password is required";

  if (errors === '' ||
    errors === undefined ||
    errors === null ||
    Object.keys(errors).length === 0)
      isValid = true;

  return {
    errors,
    isValid: isValid
  };
};
