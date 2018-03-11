import React from 'react';
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
      <label htmlFor="email">Email</label>
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
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
    props.history.push('/new/second');
  },
  displayName: 'BasicForm', // helps with React DevTools
})(MyInnerForm);

const FirstForm = props =>
  <div className="App">
    <EnhancedForm history={props.history}/>
  </div>

export default FirstForm;
