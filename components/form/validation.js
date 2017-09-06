export default class ElementValidation {
  constructor(value, validation) {
    this._value = value;
    this._validation = validation;
  }

  get value() {
    return this._value;
  }

  get validation() {
    return this._validation;
  }

  isValid() {
    return this.isValidRequired() && this.isValidPattern() && this.isValidLength();
  }

  isValidLength() {
    const value = this.value;
    const validation = this.validation;

    if (validation.length) {
      return !value || value.length !== validation.length;
    }

    if (validation.minLength) {
      return !value || isValidLength(value, validation.minLength);
    }

    if (validation.maxLength) {
      return !value || isValidLength(value, validation.maxLength);
    }

    return true;
  }

  isValidRequired() {
    if (this.validation.required) {
      return this.value;
    }

    return true;
  }

  isValidPattern() {
    if (this.validation && this.validation.pattern) {
      switch (this.validation.pattern) {
        case 'email': {
          return isValidEmail(this.value);
        }
        case 'postCode': {
          return isValidPostCode(this.value);
        }
        case 'digits': {
          return isValidDigit(parseInt(this.value, 10), this.validation);
        }
        case 'phonenumber': {
          return isPhoneNumber(this.value);
        }
        default: {
          return true;
        }
      }
    }

    return true;
  }
}

function isValidLength(value, min, max) {
  if (!value || (!isNaN(min) && value.length < min) || (!isNaN(max) && value.length < max)) {
    return false;
  }

  return true;
}

function isValidEmail(value) {
  const emailRegexPattern = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
  return emailRegexPattern.test(value);
}

function isPhoneNumber(value) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value);
}

function isValidPostCode(value) {
  return /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test(value);
}

function isValidDigit(value, validation) {
  return /\d/.test(value) && isValidDigitValidation(value, validation);
}

function isValidDigitValidation(value, validation) {
  if (validation && Object.hasOwnProperty.call(validation, 'greaterThan')) {
    return value > validation.greaterThan;
  }

  return true;
}
