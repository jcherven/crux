/*******************************************************
 * /client/src/components/layout/CronWrapper.js
 *******************************************************/

import React, { Component } from 'react';

class CronWrapper extends Component {

  /**
   * Copies the currently displayed cron expression
   **/
  copyExpr() {

  };

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">

                <div className="form-row justify-content-center">
                  <div className="form-group col-md-16">
                    <div className="input-group mx-auto mb-3">
                      <code className="bg-dark display-3 p-3">
                        0,30 6 * * 1-5
                      </code>
                      <div className="input-group-append">
                        <button
                          className="btn btn-info"
                          id="copy-button"
                          type="button"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                </div>
                <p className="lead">
                  Crux rocks tonic magic
                </p>
                <hr />
                <a
                  href="#"
                  className="btn btn-lg btn-info mr-2"
                >
                  Gimme
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CronWrapper;
