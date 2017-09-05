import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { reduxForm } from 'redux-form';
import Field from './Field';


export class FormBuilder extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
  };

  navigate(step) {
    this.props.push(`/survey/${step}`);
  }

  isLastStep() {
    return this.props.step === this.props.schema.steps.length;
  }

  navigateForward() {
    this.props.handleSubmit(::this.onSubmit)();
    // if (this.isLastStep()) {
    //   this.props.handleSubmit(::this.onSubmit);
    // } else {
    //   this.navigate(this.props.step + 1);
    // }
  };

  navigateBack = () => {
    if (this.props.step > 1) {
      this.navigate(this.props.step - 1);
    }
  };

  renderStep(step, i) {
    return (
      <Step key={step.id}>
        <StepButton
          onClick={() => {
            this.navigate(i + 1);
          }}
        >
          {step.text}
        </StepButton>
        <StepContent>
          {step.elements.map((element) => {
            return (
              <Field stepId={step.id} element={element} />
            );
          })}
          {this.renderStepActions()}
        </StepContent>
      </Step>
    );
  }

  renderStepActions() {
    const step = this.props.step;
    return (
      <div style={{ margin: '12px 0' }}>
        {step > 1 && (
          <FlatButton
            label="Back"
            disabled={step === 1}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.navigateBack}
          />
        )}
        <RaisedButton
          label={this.isLastStep() ? 'Submit' : 'Next'}
          primary={true}
          onClick={::this.navigateForward}
          style={{ marginRight: 12 }}
        />
      </div>
    );
  }

  renderSteps() {
    if (this.props.schema && Array.isArray(this.props.schema.steps)) {
      return (
        <Stepper
          activeStep={this.props.step - 1}
          linear={false}
          orientation="vertical"
        >
          {this.props.schema.steps.map(::this.renderStep)}
        </Stepper>
      );
    }

    return null;
  }

  onSubmit(values) {
    if (this.isLastStep()) {
      console.log(values)
    } else {
      this.navigate(this.props.step + 1);
    }
  }

  render() {
    return (
      <form  noValidate ref="form">
        {this.renderSteps()}
      </form>
    );
  }
}

const wrappedFormBuilder = reduxForm({
  form: 'myForm',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(FormBuilder);

export default connect(null, { push })(wrappedFormBuilder);

