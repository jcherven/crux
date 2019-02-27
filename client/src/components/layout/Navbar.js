/*******************************************************
 * /client/src/components/layout/Navbar.js
 *******************************************************/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  /**
   *
   **/
  onLogoutClick(event){
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    /**
     *
     **/
    const authenticatedMenu = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/dashboard">
            {user.name}
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    )

    /**
     *
     **/
    const guestMenu = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/Reg"
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/Login"
          >
            Login
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link
            className="navbar-brand"
            to="/"
          >
            Crux
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon">
            </span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="mobile-nav"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              </li>
            </ul>
            {isAuthenticated ? authenticatedMenu : guestMenu}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
