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
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <h4>loading...</h4>
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6 text-light">
              <Link to='/profiles' className="btn btn-info mb-3 float-left">
                Back to profiles
              </Link>
            </div>
            <div className="col-md-6 text-light">
              <ProfileHeader profile={profile} />
              <ProfileCronExps cronExps={profile.cronExps}/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
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
