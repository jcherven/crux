/**************************************
 * /.validation/profile.js
 **************************************/

const Validator = require('validator');
// A small NPM package that parses valid Github usernames by regex
const GhRegex = require('github-username-regex');

module.exports = function validateProfileIput(data) {
  let errors = {};
  let isValid = false;

  data.vanityUrl = (data.vanityUrl) ? data.vanityUrl.trim() : "";
  data.website = (data.website) ? data.website.trim() : "";
  data.githubUserName = (data.githubUserName) ? data.githubUserName.trim() : "";

  if ( Validator.isEmpty(data.vanityUrl.toString()) )
    errors.vanityUrl = "Custom URL string is required";
  if ( !Validator.isLength(data.vanityUrl.toString(), {min:3, max:64}) )
    errors.vanityUrl = "Custom URL string must be between 3 and 64 characters";
  if ( !Validator.isURL(data.website.toString()) )
    errors.website = "Provided website is not a resolvable URL";
  if ( !GhRegex.test(data.githubUserName.toString()) )
    errors.githubUserName = "Github username is not formed validly";

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

