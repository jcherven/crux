/**************************************
 * /.validation/profile.js
 **************************************/

const Validator = require('validator');

module.exports = function validateProfileIput(data) {
  let errors = {};
  let isValid = false;

  data.vanityUrl = (data.vanityUrl) ? data.vanityUrl.trim() : "";

  if ( Validator.isEmpty(data.vanityUrl.toString()) )
    errors.vanityUrl = "Custom URL string is required";
  if ( !Validator.isLength(data.vanityUrl.toString(), {min:3, max:64}) )
    errors.vanityUrl = "Custom URL string must be between 3 and 64 characters";

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

