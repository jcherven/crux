/*******************************************************
 * /client/src/components/common/CronNaturalFieldGroup.js
 *******************************************************/

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CronNaturalFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
}) => {
  return (
    <div>
      <input
        className={classnames("form-control form-control-lg", { 'is-invalid': error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled
      />
      {error &&
        <div className="invalid-feedback">{error}</div>
      }
    </div>
  )
}

CronNaturalFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

CronNaturalFieldGroup.defaultProps = {
  type: 'text',
}

export default CronNaturalFieldGroup;
