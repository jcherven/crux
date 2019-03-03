import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div class="card card-body bg-dark mb-3">
        <div className="col-lg-6 col-md-4 col-md-8">
          <h3>{profile.user.name}</h3>
          <Link to={`/profile/${profile.vanityUrl}`} className="btn btn-info">
            View profile
          </Link>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem;
