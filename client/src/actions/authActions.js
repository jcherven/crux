/*******************************************************
 * /client/src/actions/authActions.js
 *******************************************************/

import { GET_ERRORS } from './types';
import axios from 'axios';

export const registerUser = (userData) => dispatch => {
  axios
    .post('/api/users/reg', userData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );


};
