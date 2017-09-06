import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Translation extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    id: null,
    text: null,
  };

  render() {
    if (this.props.text) {
      return (
        <span>{this.props.text}</span>
      );
    }

    return `Missing translation ${this.props.id}`;
  }
}

export default connect((state, ownProps) => {
  return {
    text: state.application.translations[ownProps.id],
  };
})(Translation);
