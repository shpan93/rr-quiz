import axios from 'axios';
import { push } from 'react-router-redux';
import * as constants from './constants';

export function saveContent(payload) {
  return {
    type: constants.SAVE_CONTENT,
    payload,
  };
}

export function fetchContent() {
  return (dispatch) => {
    return axios.get('http://localhost:8080/survey-api/en').then(({ data }) => {
      dispatch(saveContent(data));
    });
  };
}

export function sendSurvey(data) {
  return (dispatch) => {
    return axios.post('http://localhost:8080/survey-api', data).then(() => {
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
