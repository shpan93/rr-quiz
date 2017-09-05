import React from 'react';
import axios from 'axios';
import FormBuilder from '../form/FormBuilder';

class MainPage extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  state = {
    data: null,
  };

  componentDidMount() {
    axios.get('http://localhost:8080/survey-api/en').then(({data}) => {
      this.setState({
        data,
      });
    });
  }

  render() {
    if (this.state.data) {
      return <FormBuilder schema={this.state.data.schema} />
    }

    return (
      <div>dsdsdsd</div>
    );
  }
}

export default MainPage;
