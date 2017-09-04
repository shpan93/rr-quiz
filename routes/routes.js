import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Root from '../components/pages/Root';
import MainPage from '../components/pages/MainPage';

export default function getRoutes() {
  return (
    <Route name="Root" path="/" component={Root}>
      <IndexRoute component={MainPage} />
    </Route>
  );
}
