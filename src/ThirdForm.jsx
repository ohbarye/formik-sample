import React, { Component } from 'react';
import './App.css';
import { withFormik } from 'formik';
import DisplayFormikState from './DisplayFormikState';
import Yup from 'yup';

const MyInnerForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: 'block' }}>
        Email
      </label>
      <input
        id="email"
        placeholder="Enter your email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.email && touched.email ? 'text-input error' : 'text-input'}
      />
      {errors.email &&
      touched.email && <div className="input-feedback">{errors.email}</div>}

      <button type="submit" disabled={!dirty || Object.keys(errors).length > 0 || isSubmitting}>
        Submit
      </button>

      <DisplayFormikState {...props} />
    </form>
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'BasicForm', // helps with React DevTools
})(MyInnerForm);

class ThirdForm extends Component {
  render() {
    return (
      <div className="App">
        <EnhancedForm />
      </div>
    );
  }
}

export default ThirdForm;
