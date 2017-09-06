import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '../form/FormBuilder';
import { fetchContent } from '../../redux/application/actions';

class Survey extends React.PureComponent {
  static reduxAction = fetchContent;

  static propTypes = {
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div id="survey" className="page">
        <div className="wrapper">
          <FormBuilder step={parseInt(this.props.params.step, 10)} />
        </div>
      </div>
    );
  }
}

export default Survey;
