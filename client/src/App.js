/*******************************************************
 * /client/src/App.js
 *******************************************************/

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CronWrapper from './components/layout/CronWrapper';
import Reg from './components/auth/Reg';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
