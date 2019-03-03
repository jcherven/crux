import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCronExps from './ProfileCronExps';

import { getProfileByVanityUrl } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.vanityUrl) {
      this.props.getProfileByVanityUrl(this.props.match.params.vanityUrl);
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCronExps />
      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByVanityUrl: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfileByVanityUrl })(Profile);
