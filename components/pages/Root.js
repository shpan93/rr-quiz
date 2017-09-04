import React from 'react';
import PropTypes from 'prop-types';

export default class Root extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <div className="root">
        <div className="route-wr">
          {this.props.children}
        </div>

      </div>
    );
  }
}
