import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import Root from './components/Root';
import configureStore from './redux/configureStore';
import getRoutes from './routes/routes';
import { getTheme } from './utils/environment';
import './sass/common.scss';

const { store, history } = configureStore(browserHistory, window.App);

match({
  history,
  routes: getRoutes(store),
}, (error, redirectLocation, renderProps) => {
  render(
    <Root store={store} renderProps={renderProps} muiTheme={getTheme()} />
    , document.getElementById('app'));
});
