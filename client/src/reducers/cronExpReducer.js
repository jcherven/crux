/*******************************************************
 * /client/src/reducers/cronExpReducer.js
 *******************************************************/

import { GET_CRON_EXP } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CRON_EXP:
      return action.payload;
    default:
      return state;
  }
}


