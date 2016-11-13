const t = {
  required: 'Field required'
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = t.required;
  }
  if (!values.currency) {
    errors.currency = t.required;
  }
  if (!values.color) {
    errors.color = t.required;
  }
  return errors;
};

export default validate;