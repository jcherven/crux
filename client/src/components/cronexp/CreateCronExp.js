/*******************************************************
 * /client/src/components/cronexp/CreateCronExp.js
 *******************************************************/

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputGroup from '../common/InputGroup';
import CronNaturalFieldGroup from '../common/CronNaturalFieldGroup';
import { createCronExp } from '../../actions/profileActions';

class CreateCronExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machineMinute: '*',
      machineHour: '*',
      machineDom: '*',
      machineMonth: '*',
      machineDow: '*',
      humanMinute: 'every minute',
      humanHour: 'every hour',
      humanDom: 'every day',
      humanMonth: 'every month',
      humanDow: 'every day of the week',
      disabled: false,
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const cronExpData = {
      machineMinute: this.state.machineMinute,
      machineHour: this.state.machineHour,
      machineDom: this.state.machineDom,
      machineMonth: this.state.machineMonth,
      machineDow: this.state.machineDow,
      humanMinute: this.state.humanMinute,
      humanHour: this.state.humanHour,
      humanDom: this.state.humanDom,
      humanMonth: this.state.humanMonth,
      humanDow: this.state.humanDow,
    }

    this.props.createCronExp(cronExpData, this.props.history);
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const { errors } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="machineCronDisplay">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="form-row justify-content-center">
                <div className="form-group col-md-16">
                  <div className="input-group mx-auto mb-3">

                    <code className="bg-dark display-3 p-3">
                      <span
                        className="machineMinute text-primary"
                        value={this.state.machineMinute}
                      >
                        {this.state.machineMinute}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="machineHour text-success"
                        value={this.state.machineHour}
                      >
                        {this.state.machineHour}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="machineDom text-info"
                        value={this.state.machineDom}
                      >
                        {this.state.machineDom}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="machineMonth text-warning"
                        value={this.state.machineMonth}
                      >
                        {this.state.machineMonth}
                      </span>
                      <span className="cron-space"> </span>
                      <span
                        className="machineDow text-danger"
                        value={this.state.machineDow}
                      >
                        {this.state.machineDow}
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

            {/* Cron expression editing area */}
            <div className="col-md-6 m-auto">
              <form onSubmit={this.onSubmit}>

                {/* Minute Row */}
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="minute"
                      name="machineMinute"
                      icon="fas fa-stopwatch"
                      iconColor="bg-primary"
                      value={this.state.machineMinute}
                      onChange={this.onChange}
                      error={errors.minute}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="human readable minute"
                      bgColor="bg-primary"
                      name="humanMinute"
                      value={this.state.humanMinute}
                      onChange={this.onChange}
                      error={errors.humanMinute}
                    />
                  </div>
                </div>

                {/* Hour Row */}
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="hour"
                      name="machineHour"
                      icon="far fa-clock"
                      iconColor="bg-success"
                      value={this.state.machineHour}
                      onChange={this.onChange}
                      error={errors.machineHour}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="human readable hour"
                      bgColor="bg-success"
                      name="humanHour"
                      value={this.state.humanHour}
                      error={errors.humanHour}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                {/* Day of Month Row */}
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="day of month"
                      name="machineDom"
                      icon="fas fa-calendar-day"
                      iconColor="bg-info"
                      value={this.state.machineDom}
                      onChange={this.onChange}
                      error={errors.machineDom}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="human readable day of month"
                      bgColor="bg-info"
                      name="humanDom"
                      value={this.state.humanDom}
                      error={errors.humanDom}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                {/* Month Row */}

                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="month"
                      name="machineMonth"
                      icon="far fa-calendar"
                      iconColor="bg-warning"
                      value={this.state.machineMonth}
                      onChange={this.onChange}
                      error={errors.machineMonth}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="human readable month"
                      bgColor="bg-warning"
                      name="humanMonth"
                      value={this.state.humanMonth}
                      error={errors.humanMonth}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                {/* Month Row */}
                <div className="row">
                  <div className="col-md-4">
                    <InputGroup
                      placeholder="day of the week"
                      name="machineDow"
                      icon="fas fa-calendar-week"
                      iconColor="bg-danger"
                      value={this.state.machineDow}
                      onChange={this.onChange}
                      error={errors.machineDow}
                    />
                  </div>
                  <div className="col-md-8">
                    <CronNaturalFieldGroup
                      placeholder="human readable day of week"
                      bgColor="bg-danger"
                      name="humanDow"
                      value={this.state.humanDow}
                      error={errors.humanDow}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <input
                  className="btn btn-info btn-block mt-4"
                  type="submit"
                  value={isAuthenticated ? "Save this crontab to your profile" : "Register an account to save this crontab"}
                  disabled={isAuthenticated ? '' : 'disabled'}
                />
                <small></small>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateCronExp.propTypes = {
  createCronExp: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { createCronExp })(withRouter(CreateCronExp))
