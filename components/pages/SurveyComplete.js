import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SchemaStep from '../form/SchemaStep';

class SurveyComplete extends React.PureComponent {
  static propTypes = {
    schema: PropTypes.shape({
      complete: PropTypes.object,
    }).isRequired,
  };

  render() {
    return (
      <div className="wrapper survey-complete">
        <SchemaStep step={this.props.schema.complete} />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    schema: state.application.schema,
  };
})(SurveyComplete);
