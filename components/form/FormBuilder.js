import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui';
import { reduxForm, Field } from 'redux-form';
import ElementValidation from './validation';


export class FormBuilder extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
  };

  invokers = {
    string: this.renderInput,
  };

  renderInput(stepId, element) {
    const textList = element.text.split(' ');
    const elements = textList.map((textEl) => {
      if(textEl === '{element}'){
        const isElementValid = (value) => {
          const valid = new ElementValidation(value, element.validation).isValid();
          return valid;
        };
        return <Field key={element.id} name={`${stepId}.${element.id}`} component={TextField} validate={[isElementValid]}/>;
      }

      return (
        <span>{textEl} </span>
      );
    })
    return (
      <div className="input-wrapper">
        {elements}
      </div>
    );
  }

  renderElement(segmentId, element) {
    const invoker = this.invokers[element.type];
    if (invoker) {
      return invoker.call(this, segmentId, element);
    }

    return null;
  }

  renderStep(segment) {
    return (
      <div>Segment</div>
    );
  }

  renderSteps() {
    if (this.props.schema) {
      return this.props.schema.steps.map((step) => {
        return (
          <div className="wizard" key={step.id}>
            {step.text}

            {step.elements.map((element) => {
              return this.renderElement(step.id, element);
            })}
          </div>
        );
      });
    }

    return null;
  }

  render() {
    return <div>
      {this.renderSteps()}
    </div>;
  }
}

export default reduxForm({
  form: 'myForm',
})(FormBuilder);
