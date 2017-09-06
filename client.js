import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Root from './components/Root';
import configureStore from './redux/configureStore';
import getRoutes from './routes/routes';
import './sass/common.scss';

const { store, history } = configureStore(browserHistory, window.App);
const muiTheme = getMuiTheme({
  fontFamily: 'ffpronarrow, sans-serif',
  palette: {
    textColor: '#02b875',
    primary1Color: '#02b875',
  },
});

match({
  history,
  routes: getRoutes(store),
}, (error, redirectLocation, renderProps) => {
  render(
    <Root store={store} renderProps={renderProps} muiTheme={muiTheme} />
    , document.getElementById('app'));
});
