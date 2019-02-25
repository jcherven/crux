/*******************************************************
 * /client/src/components/create-profile/CreateProfile.js
 *******************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valityUrl: '',
      website: '',
      github: '',
      gitlab: '',
      bitbucket: '',
      twitter: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const profileData = {
      handle: this.state.handle,
      website: this.state.website,
      github: this.state.github,
      gitlab: this.state.gitlab,
      bitbucket: this.state.bitbucket,
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
          <InputGroup
            placeholder="Bitbucket username"
            name="bitbucket"
            icon='fab fa-bitbucket'
            value={this.state.bitbucket}
            onChange={this.onChange}
            error={errors.bitbucket}
          />
          <InputGroup
            placeholder="GitLab username"
            name="gitlab"
            icon='fab fa-gitlab'
            value={this.state.gitlab}
            onChange={this.onChange}
            error={errors.gitlab}
          />
        </div>
      )
    } else {}

    return (
      <div className='create-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto text-light">
              <h1 className="display-4 text-center">Create a Profile</h1>
              <p className="lead text-center">
                enter profile info
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Vanity URL"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Required. A unique Vanity URL for your Crux profile."
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect (mapStateToProps, { createProfile })(withRouter(CreateProfile));
