import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Root from '../components/pages/Root';
import Survey from '../components/pages/Survey';
import SurveySteps from '../components/pages/SurveySteps';
import SurveyComplete from '../components/pages/SurveyComplete';

export default function getRoutes() {
  return (
    <Route name="Root" path="/" component={Root}>
      <Route path="survey" component={Survey}>
        <Route path="complete" component={SurveyComplete} />
        <Route path=":step" component={SurveySteps} />
      </Route>
      <IndexRedirect to="survey/1" />
    </Route>
  );
}
