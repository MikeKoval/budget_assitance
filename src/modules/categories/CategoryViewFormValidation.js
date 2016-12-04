const t = {
  required: 'Required'
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = t.required;
  }
  if (!values.type) {
    errors.type = t.required;
  }
  return errors;
};

export default validate;