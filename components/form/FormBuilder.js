/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import SchemaStep from './SchemaStep';
import { media } from '../../utils/browser';
import { sendSurvey, getTranslation } from '../../redux/application/actions';


export class FormBuilder extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getTranslation: PropTypes.func.isRequired,
    sendSurvey: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.navigateBack = ::this.navigateBack;
    this.navigateForward = ::this.navigateForward;
    this.handleEnterPress = ::this.handleEnterPress;
  }

  state = {
    validSteps: {},
  };

  componentWillMount() {
    this.checkStep(this.props.step, this.props.schema);
  }

  checkStep(step, schema) {
    if (!this.isValidStep(step, schema)) {
      this.props.push('/survey/1');
    }
  }

  isStepValidated(step) {
    return step !== 1 ? this.state.validSteps[this.props.schema.steps[step - 1].id] : true;
  }

  isValidStep(step, schema) {
    return step &&
      !isNaN(step) &&
      this.isValidSchema(schema) &&
      step <= schema.steps.length &&
      step > 0
      && this.isStepValidated(step);
  }


  isMobile() {
    return media(0, 769);
  }

  isValidSchema(schema) {
    return schema && typeof schema === 'object' && Array.isArray(schema.steps);
  }

  navigate(step) {
    this.props.push(`/survey/${step}`);
  }

  isLastStep() {
    return this.props.step === this.props.schema.steps.length;
  }

  navigateForward() {
    this.props.handleSubmit(::this.onSubmit)();
  }

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
          {step.label}
        </StepButton>
        {this.isMobile() ?
          <StepContent>
            {this.renderSchemaStep(step)}
          </StepContent> : <span />}
      </Step>
    );
  }

  renderSchemaStep(step) {
    return (
      <SchemaStep step={step}>
        {step.elements.map((element) => {
          return (
            <Field key={`${step.id}.${element.id}`} stepId={step.id} element={element} />
          );
        })}
        {this.renderStepActions()}
      </SchemaStep>
    );
  }

  renderDesktopSteps() {
    const activeStep = this.props.schema.steps[this.props.step - 1];
    return (
      <div className="steps">
        {this.renderSchemaStep(activeStep)}
      </div>
    );
  }

  renderStepActions() {
    const step = this.props.step;
    return (
      <div className="btn-holder align-center">
        {step > 1 && (
          <FlatButton
            label={this.props.getTranslation('form.back')}
            disabled={step === 1}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.navigateBack}
          />
        )}
        <RaisedButton
          label={this.isLastStep() ?
            this.props.getTranslation('form.submit') : this.props.getTranslation('form.next')}
          primary={true}
          onClick={this.navigateForward}
          style={{ marginRight: 12 }}
        />
      </div>
    );
  }

  renderStepper() {
    return (
      <div className="stepper">
        <Stepper
          activeStep={this.props.step - 1}
          orientation={this.isMobile() ? 'vertical' : 'horizontal'}
        >
          {this.props.schema.steps.map(::this.renderStep)}
        </Stepper>
      </div>
    );
  }

  onSubmit(values) {
    if (this.isLastStep()) {
      this.props.sendSurvey(values);
    } else {
      this.setState({
        validSteps: {
          ...this.state.validSteps,
          [this.props.schema.steps[this.props.step].id]: true,
        },
      });
      this.navigate(this.props.step + 1);
    }
  }

  handleEnterPress(event) {
    if (event.which === 13 || event.keyCode === 13) {
      this.navigateForward();
    }
  }

  render() {
    if (this.isValidStep(this.props.step, this.props.schema)) {
      return (
        <form noValidate className="form" onKeyDown={this.handleEnterPress}>
          {this.renderStepper()}
          {!this.isMobile() ? this.renderDesktopSteps() : null}
        </form>
      );
    }

    return null;
  }
}

const wrappedFormBuilder = reduxForm({
  form: 'myForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FormBuilder);

export default connect((state) => {
  return {
    schema: state.application.schema,
  };
}, { push, getTranslation, sendSurvey })(wrappedFormBuilder);
