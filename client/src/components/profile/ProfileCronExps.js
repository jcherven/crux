import React, { Component } from 'react';

class ProfileCronExps extends Component {
  render() {
    const { cronExps } = this.props;

    const cronExpItems = cronExps.map(crontab => (
      <li key={crontab._id} className="list-group-item">
          <code className="bg-dark p-3">
            <span>{crontab.machineCron.minute}</span>
            <span> </span>
            <span>{crontab.machineCron.hour}</span>
            <span> </span>
            <span>{crontab.machineCron.dayOfMonth}</span>
            <span> </span>
            <span>{crontab.machineCron.month}</span>
            <span> </span>
            <span>{crontab.machineCron.dayOfWeek}</span>
          </code>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <h4>Saved Cron Expressions</h4>
          <ul className="list-group">{cronExpItems}</ul>
        </div>
      </div>
    )
  }
}

export default ProfileCronExps;
