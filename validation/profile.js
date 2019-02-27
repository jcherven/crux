/**************************************
 * /.validation/profile.js
 **************************************/

const Validator = require('validator');

module.exports = function validateProfileInput(data) {
  let errors = {};
  let isValid = false;

  data.vanityUrl = (data.vanityUrl) ? data.vanityUrl.trim() : "";
  data.website = (data.website) ? data.website.trim() : "";
  data.githubUserName = (data.githubUserName) ? data.githubUserName.trim() : "";

  if ( Validator.isEmpty(data.vanityUrl.toString()) )
    errors.vanityUrl = "Custom URL string is required";
  if ( !Validator.isLength(data.vanityUrl.toString(), {min:3, max:32}) )
    errors.vanityUrl = "Custom URL string must be between 3 and 32 characters";

  if ( !Validator.isEmpty(data.website.toString()) && !Validator.isURL(data.website.toString()) )
    errors.website = "Provided website is not a resolvable URL";

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

