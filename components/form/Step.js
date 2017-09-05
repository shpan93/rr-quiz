import React from 'react';
import PropTypes from 'prop-types';

export default class FormBuilder extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
  };

  renderStep(segment) {
    return (
      <div>Segment</div>
    );
  }

  render() {
    return (<div>FormBuilder</div>);
  }
}
