/**************************************
 * /validation/register.js
 **************************************/

const Validator = require('validator')

module.exports = function validateRegInput(data) {
  let errors = {};
  let isValid = false;

  data.name = (data.name) ? data.name.trim() : "";
  data.email = (data.email) ? data.email.trim() : "";
  data.password = (data.password) ? data.password.trim() : "";
  data.passwordConfirm = (data.passwordConfirm) ? data.passwordConfirm.trim() : "";

  if ( Validator.isEmpty(data.name.toString()) )
    errors.name = "Name is required"

  if ( !Validator.isLength(data.name.toString(), {min: 3, max: 64}) )
    errors.name = "Name must be at least 3 characters";

  if ( Validator.isEmpty(data.email.toString()) )
    errors.email = "Email is required";

  if ( !Validator.isEmail(data.email.toString()) )
    errors.email = "Valid email address required";

  if ( Validator.isEmpty(data.password.toString()) )
    errors.password = "Password is required";

  if ( !Validator.isLength(data.password.toString(), {min: 8, max: 256}) )
    errors.password = "Password must be at least 8 characters";

  if ( Validator.isEmpty(data.passwordConfirm.toString()) )
    errors.passwordConfirm = "Please confirm your entered password";

  if ( !Validator.equals(data.password.toString(), data.passwordConfirm.toString()) )
    errors.passwordConfirm = "Password and confirmation must match";

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
