import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormBuilder from '../form/FormBuilder';
import Navigation from '../shared/Navigation';

class MainPage extends React.PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
    }).isRequired,
  };
  static defaultProps = {};

  state = {
    data: null,
  };

  componentDidMount() {
    axios.get('http://localhost:8080/survey-api/en').then(({ data }) => {
      this.setState({
        data,
      });
    });
  }

  render() {
    if (this.state.data) {
      return (
        <div id="survey" className="page">
          <FormBuilder schema={this.state.data.schema} step={parseInt(this.props.params.step)} />
        </div>
      );
    }

    return (
      <div>Loading</div>
    );
  }
}

export default MainPage;
