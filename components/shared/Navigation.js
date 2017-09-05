import React from 'react';
import PropTypes from 'prop-types';

class Navigation extends React.PureComponent {
  static propTypes = {
    steps: PropTypes.array.isRequired,
  };

  render() {
    if (Array.isArray(this.props.steps)) {
      return (<div> :( </div>);
    }
    return null;
  }
}

export default Navigation;
