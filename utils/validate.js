import Validator from 'validator';
import isEmpty from 'is-empty';

export const registerValidator = (data) => {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'FirstName is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'LastName is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!Validator.isLowercase(data.email)) {
    errors.email = 'Email must be in lowercase';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};
