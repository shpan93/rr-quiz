import React from 'react';

class Component extends React.PureComponent {
  static propTypes = {

  };

  render() {
    return (
      <div className="this.props.step">
        <h3 className="this.props.step-headline">
          {this.props.step.text}
        </h3>
        <div className="this.props.step-elements-holder">
          <div className="this.props.step-elements">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
