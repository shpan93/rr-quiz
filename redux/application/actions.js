import { push } from 'react-router-redux';
import * as constants from './constants';
import { getGetRequest, getPostRequest } from '../../utils/api';

export function saveContent(payload) {
  return {
    type: constants.SAVE_CONTENT,
    payload,
  };
}

export function fetchContent() {
  return (dispatch) => {
    return getGetRequest('survey-api/en').then(({ data }) => {
      dispatch(saveContent(data));
    });
  };
}

export function sendSurvey(data) {
  return (dispatch) => {
    return getPostRequest('survey-api', data).then(() => {
      dispatch(push('/survey/complete'));
    });
  };
}

export function getTranslation(id) {
  return (_, getState) => {
    const tsl = getState().application.translations[id];
    return tsl || `Missing translation ${this.props.id}`;
  };
}
