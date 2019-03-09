/**************************************
 * /cronMagic/naturalizeCronExp.js
 **************************************/

const cronstrue = require('cronstrue');

module.exports = function naturalizeCronExp(data) {
  let naturalized = {};
  let errors = {};
  let warnings = {};
  let isValid = false;

  data.minute = (data.minute) ?
    data.minute.trim() :
    `$(data.minute) * * * *`;

  data.hour = (data.hour) ?
    data.hour.trim() :
    `* $(data.hour) * * *`;

  data.dayOfMonth = (data.dayOfMonth) ?
    data.dayOfMonth.trim() :
    `* * $(data.dayOfMonth) * *`;

  data.month = (data.month) ?
    data.month.trim() :
    `* * * $(data.month) *`;

  data.dayOfWeek = (data.dayOfWeek) ?
    data.dayOfWeek.trim() :
    `* * * * $(data.dayOfWeek)`;

  naturalized.minute = cronstrue.toString(data.minute);
  naturalized.hour = cronstrue.toString(data.hour);
  naturalized.dayOfMonth = cronstrue.toString(data.dayOfMonth);
  naturalized.month = cronstrue.toString(data.month);
  naturalized.dayOfWeek = cronstrue.toString(data.dayOfWeek);

  if (
    errors === '' ||
    errors === undefined ||
    errors === null ||
    Object.keys(errors).length === 0
  )
    isValid = true;

  return {
    naturalized,
    errors,
    warnings,
    isValid: isValid,
  };
};

