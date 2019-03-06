import React, { Component } from 'react';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div>
        <div className='row'>
          <div className='col-md-12 text-light'>
            <card className='card card-body bg-info text-white mb-3'>
              <div className='row'>
                <div className='text-center col-md-12'>
                  <h3 className='display-4 text-center'>
                    {profile.user.name}
                  </h3>
                  <p>
                    {profile.website = !profile.website ? null : (
                      <a
                        className='text-white p-2'
                        href={profile.website}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className="fas fa-external-link-alt fa-2x" />
                      </a>
                    )}

                    {profile.twitter = !profile.twitter ? null : (
                      <a
                        className='text-white p-2'
                        href={`https://www.twitter.com/${profile.twitter}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className="fab fa-twitter fa-2x" />
                      </a>
                    )}
                    {profile.github = !profile.github ? null : (
                      <a
                        className='text-white p-2'
                        href={`https://github.com/${profile.github}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <i className="fab fa-github fa-2x" />
                      </a>
                    )}
                    {profile.bio = !profile.bio ? (<span></span>) : (
                      <p>{profile.bio}</p>
                    )}
                  </p>

                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader;
