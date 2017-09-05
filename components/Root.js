import React from 'react';
import PropTypes from 'prop-types';
import { Router, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Root extends React.PureComponent {
  static defaultProps = {
    isServer: false,
    muiTheme: null,
  };

  static propTypes = {
    isServer: PropTypes.bool,
    store: PropTypes.object.isRequired,
    renderProps: PropTypes.object.isRequired,
    muiTheme: PropTypes.object,
  };

  render() {
    const RouterComponent = this.props.isServer ? RouterContext : Router;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Provider store={this.props.store}>
          <RouterComponent {...this.props.renderProps} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}
