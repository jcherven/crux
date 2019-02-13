/*******************************************************
 * /client/src/App.js
 *******************************************************/

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CronWrapper from './components/layout/CronWrapper';
import Reg from './components/auth/Reg';
import Login from './components/auth/Login';

// Check for client's valid auth token (login) at load
if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  const decodedJwt = jwt_decode(localStorage.jwt);
  store.dispatch(setCurrentUser(decodedJwt));
  // Check for token expiration during user's session
  const currentTime = Date.now() / 1000;
  if (decodedJwt.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={CronWrapper} />
            <div className="container">
              <Route exact path="/reg" component={Reg} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
