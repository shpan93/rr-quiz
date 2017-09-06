import React from 'react';
import PropTypes from 'prop-types';

class SchemaStep extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    step: PropTypes.object.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    if (this.props.step) {
      return (
        <div className="step">
          <h3 className="step-headline">
            {this.props.step.text}
          </h3>
          <div className="step-elements-holder">
            <div className="step-elements">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default SchemaStep;
