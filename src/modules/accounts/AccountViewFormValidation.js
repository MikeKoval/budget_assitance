const t = {
  required: 'Field required'
};

const validate = (values) => {
  const errors = {};
  if (!values.get('name')) {
    errors.name = t.required;
  }
  if (!values.get('currency')) {
    errors.currency = t.required;
  }
  if (!values.get('color')) {
    errors.color = t.required;
  }
  return errors;
};

export default validate;