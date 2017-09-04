import React from 'react';
import PropTypes from 'prop-types';
import { Router, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default class Root extends React.PureComponent {
  static defaultProps = {
    isServer: false,
  };

  static propTypes = {
    isServer: PropTypes.bool,
    store: PropTypes.object.isRequired,
    renderProps: PropTypes.object.isRequired,
  };

  render() {
    const RouterComponent = this.props.isServer ? RouterContext : Router;
    return (
      <Provider store={this.props.store}>
        <RouterComponent {...this.props.renderProps} />
      </Provider>
    );
  }
}
