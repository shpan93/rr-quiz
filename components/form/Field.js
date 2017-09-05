import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  TextField
} from 'material-ui';
import ElementValidation from './validation';

const renderTextField = ({
                           input,
                           label,
                           meta: { touched, error },
                           ...custom
                         }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class Navigation extends React.PureComponent {
  static propTypes = {
    element: PropTypes.object.isRequired,
    stepId: PropTypes.string.isRequired,
  };

  elements = {
    string: {
      component: renderTextField,
    },
  };

  isElementValid = (value) => {
    const valid = new ElementValidation(value, this.props.element.validation).isValid();
    return valid ? undefined : 'invalid';
  };

  getElement(type) {
    return this.elements[type] ? this.elements[type] : null;
  }

  renderField() {
    const element = this.getElement(this.props.element.type);
    if (element) {
      const elementProps = element.getProps ? element.getProps(this.props.element) : {};
      return (
        <Field
          key={this.props.element.id}
          name={`${this.props.stepId}.${this.props.element.id}`}
          component={element.component}
          validate={[this.isElementValid]}
          {...elementProps}
        />
      );
    }

    return `Invalid field ${this.props.element.type}`;
  }

  renderTextWithField() {
    const textList = this.props.element.text.split(' ');
    return textList.map((textEl, i) => {
      if (textEl === '{element}') {
        return this.renderField();
      }

      return (
        <span key={i}>{textEl} </span>
      );
    });
  }

  render() {
    if (this.props.element) {
      return (
        <div className="input-wrapper">
          {this.renderTextWithField()}
        </div>
      );
    }

    return null;
  }
}

export default Navigation;
