/*******************************************************
 * /client/src/actions/profileActions.js
 *******************************************************/

import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER } from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfileByVanityUrl = (vanityUrl) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/vanityUrl/${vanityUrl}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const createCronExp = (cronExpData, history) => dispatch => {
  axios
    .post('/api/profile/cronexp', cronExpData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      }))
}

export const deleteAccount = () => dispatch => {
  if (window.confirm('Delete this account? You sure? It will be gone forever.')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      ).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        }))
  }
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
