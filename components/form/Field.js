import React from 'react';
import PropTypes from 'prop-types';
import { Field as ReduxFormField } from 'redux-form';
import { TextField, AutoComplete, SelectField, MenuItem } from 'material-ui';
import ElementValidation from './validation';

class Field extends React.PureComponent {
  static propTypes = {
    element: PropTypes.object.isRequired,
    stepId: PropTypes.string.isRequired,
  };

  elements = {
    string: {
      component: this.renderTextField,
    },
    number: {
      component: this.renderTextField,
      getProps: () => {
        return {
          style: {
            maxWidth: 100,
          },
        };
      },
    },
    autocomplete: {
      component: this.renderAutoComplete,
    },
    select: {
      component: this.renderSelectField,
    },
  };

  renderTextField(field) {
    const {
      input,
      label,
      meta: { touched, error },
      elementProps,
      ...custom
    } = field;

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        style={{
          maxWidth: 200,
        }}
        {...input}
        {...custom}
      />
    );
  }

  renderAutoComplete(field) {
    return (
      <AutoComplete
        searchText={field.input.value}
        dataSource={field.elementProps.options}
        dataSourceConfig={{ text: 'label', value: 'value' }}
        filter={AutoComplete.caseInsensitiveFilter}
        onUpdateInput={field.input.onChange}
        maxSearchResults={7}
        openOnFocus={true}
      />
    );
  }

  renderSelectField(field) {
    const {
      input,
      label,
      meta: { touched, error },
      elementProps,
      ...custom
    } = field;

    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => {
          input.onChange(value);
        }}
        style={{
          maxWidth: 90,
          marginLeft: 10,
          marginRight: 10,
        }}
        {...custom}
      >
        {elementProps.options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value} primaryText={option.label} />
          );
        })}
      </SelectField>
    );
  }

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
        <div className="field-wrapper" key={this.props.element.id}>
          <ReduxFormField
            name={`${this.props.stepId}.${this.props.element.id}`}
            component={element.component}
            validate={[this.isElementValid]}
            elementProps={this.props.element}
            {...elementProps}
          />
        </div>
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

export default Field;
