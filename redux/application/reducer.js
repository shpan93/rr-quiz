import initialState from './initialState';
import * as constants from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ACTION_TYPE: {
      return state;
    }
    default:
      return state;
  }
};
