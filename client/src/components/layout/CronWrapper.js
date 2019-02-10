/*******************************************************
 * /client/src/components/layout/CronWrapper.js
 *******************************************************/

import React, { Component } from 'react';

class CronWrapper extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Crontab Magic
                </h1>
                <p className="lead">Crux rocks tonic magic</p>
                <hr />
                <a href="register.html" className="btn btn-lg btn-info mr-2">Gimme</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CronWrapper;
