/*******************************************************
 * /client/src/components/auth/Login.js
 *******************************************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Prevent a logged in user from reaching this login page again
   * Handle a user logout click;
   **/
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  /**
   * If authentication is successful, redirect to the cron wrapper
   **/
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  /**
   * Display text as it's entered
   **/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handle login submission
   **/
  onSubmit(event) {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto text-light">
              <h1 className="display-4 text-center">
                Log In
              </h1>
              <p className="lead text-center">
                Log in to your Crux profile to save your favorite crontab expressions
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <button
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login);
