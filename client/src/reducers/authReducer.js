/*******************************************************
 * /client/src/reducers/authReducer.js
 *******************************************************/

import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !fieldIsEmpty(action.payload),
        user: action.payload,
      }
    default:
      return state;
  }
}  

function fieldIsEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
  return true;
}



