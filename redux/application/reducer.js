import initialState from './initialState';
import * as constants from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SAVE_CONTENT: {
      return {
        ...state,
        translations: action.payload.translations,
        schema: action.payload.schema,
      };
    }
    default:
      return state;
  }
};
