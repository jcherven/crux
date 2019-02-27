/*******************************************************
 * /client/src/components/create-profile/EditProfile.js
 *******************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';

import { createProfile, getCurrentProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      vanityUrl: '',
      bio: '',
      website: '',
      github: '',
      twitter: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.vanityUrl = !profile.vanityUrl ? '' : profile.vanityUrl;
      profile.website = !profile.website ? '' : profile.website;
      profile.github = !profile.github ? '' : profile.github;
      profile.twitter = !profile.twitter ? '' : profile.twitter;
      profile.bio = !profile.bio ? '' : profile.bio;

      this.setState({
        vanityUrl: profile.vanityUrl,
        website: profile.website,
        github: profile.github,
        twitter: profile.twitter,
        bio: profile.bio
      })
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const profileData = {
      vanityUrl: this.state.vanityUrl,
      bio: this.state.bio,
      website: this.state.website,
      github: this.state.github,
      twitter: this.state.twitter,
    }

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder='Website URL'
            name="website"
            icon='fas fa-external-link-alt'
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
          />
          <InputGroup
            placeholder='Twitter @ Username'
            name="twitter"
            icon='fab fa-twitter'
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="GitHub username"
            name="github"
            icon='fab fa-github'
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />
        </div>
      )
    } else {}

    return (
      <div className='create-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto text-light">
              <h1 className="display-4 text-center">Edit your Profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Vanity URL"
                  name="vanityUrl"
                  value={this.state.vanityUrl}
                  onChange={this.onChange}
                  error={errors.vanityUrl}
                  info="Required. A unique Vanity URL for your Crux profile (Minimum of 3 characters)."
                />
                <TextAreaFieldGroup
                  placeholder="Brief Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Optional. Keep it under 160 characters (like a Twitter bio)."
                />

              <div className="mb-3">
                <button type='button' className='btn btn-outline-secondary' onClick={() =>
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))
                }>
                Optional Web/Service Links
                </button>
              </div>
              {socialInputs}
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
