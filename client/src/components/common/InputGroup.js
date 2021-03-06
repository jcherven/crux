/*******************************************************
 * /client/src/components/common/InputGroup.js
 *******************************************************/

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  iconColor,
  type,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className={classnames("input-group-text", iconColor)}>
          <i className={icon}></i>
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", { 'is-invalid': error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error &&
        <div className="invalid-feedback">{error}</div>
      }
    </div>
  )
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
  type: 'text',
}

export default InputGroup;
