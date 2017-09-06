import React from 'react';
import PropTypes from 'prop-types';
import { fetchContent } from '../../redux/application/actions';

class Survey extends React.PureComponent {
  static reduxAction = fetchContent;

  static propTypes = {
    children: PropTypes.element,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <div id="survey" className="page">
        {this.props.children}
      </div>
    );
  }
}

export default Survey;
