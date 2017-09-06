import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Root from '../components/pages/Root';
import Survey from '../components/pages/Survey';

export default function getRoutes() {
  return (
    <Route name="Root" path="/" component={Root}>
      <Route path="survey/complete" component={Survey} />
      <Route path="survey/:step" component={Survey} />
      <IndexRedirect to="survey/1" />
    </Route>
  );
}
