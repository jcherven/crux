import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CronNaturalFieldGroup from '../common/CronNaturalFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CronExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: '*',
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      naturalMinute: 'every minute',
      naturalHour: 'every hour',
      naturalDom: 'every day',
      naturalMonth: 'every month',
      naturalDow: 'every day of the week',
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-cron-exp">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="form-row justify-content-center">
                <div className="form-group col-md-16">
                  <div className="input-group mx-auto mb-3">
                    <code className="bg-dark display-3 p-3">
                      <span
                        className="minute"
                        value={this.state.minute}
                      >
                        {this.state.minute}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="hour"
                        value={this.state.hour}
                      >
                        {this.state.hour}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="dayOfWeek"
                        value={this.state.dayOfMonth}
                      >
                        {this.state.dayOfMonth}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="month"
                        value={this.state.month}
                      >
                        {this.state.month}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="dayOfWeek"
                        value={this.state.dayOfWeek}
                      >
                        {this.state.dayOfWeek}
                      </span>
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

            </div>
            <div className="col-md-6 m-auto">
              <form onSubmit={this.onSubmit}>

                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="minute"
                      bgColor="bg-primary"
                      name="minute"
                      icon="fas fa-stopwatch"
                      value={this.state.minute}
                      onChange={this.onChange}
                      error={errors.minute}
                    />
                  </div>
                  <div
                    className="col-md-8"
                  >
                    <CronNaturalFieldGroup
                      placeholder="minute"
                      name="naturalMinute"
                      value={this.state.naturalMinute}
                      error={errors.naturalMinute}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="hour"
                      name="hour"
                      icon="far fa-clock"
                      value={this.state.hour}
                      onChange={this.onChange}
                      error={errors.hour}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="hour"
                      name="naturalHour"
                      value={this.state.naturalHour}
                      error={errors.naturalHour}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="day of month"
                      name="dayOfMonth"
                      icon="fas fa-calendar-day"
                      value={this.state.dayOfMonth}
                      onChange={this.onChange}
                      error={errors.dayOfMonth}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="day of month"
                      name="naturalDom"
                      value={this.state.naturalDom}
                      error={errors.naturalDom}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="month"
                      name="month"
                      icon="far fa-calendar"
                      value={this.state.month}
                      onChange={this.onChange}
                      error={errors.month}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="month"
                      name="naturalMonth"
                      value={this.state.naturalMonth}
                      error={errors.naturalMonth}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="day of the week"
                      name="dayOfWeek"
                      icon="fas fa-calendar-week"
                      value={this.state.dayOfWeek}
                      onChange={this.onChange}
                      error={errors.dayOfWeek}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="day of week"
                      name="naturalDow"
                      value={this.state.naturalDow}
                      error={errors.naturalDow}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <input
                  className="btn btn-info btn-block mt-4"
                  type="submit"
                  value="Save this cron expression"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CronExp.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps)(withRouter(CronExp))
