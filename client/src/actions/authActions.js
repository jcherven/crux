/*******************************************************
 * /client/src/actions/authActions.js
 *******************************************************/

import { GET_ERRORS } from './types';
import axios from 'axios';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/reg', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );


};
