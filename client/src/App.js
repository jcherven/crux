import React, { Component } from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CronWrapper from './components/layout/CronWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <CronWrapper />
        <Footer />
      </div>
    );
  }
}

export default App;
