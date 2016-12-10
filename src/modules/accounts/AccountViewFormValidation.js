const t = {
  required: 'Required'
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = t.required;
  }
  if (values.initialValue === '' || !/^\d+$/.test(values.initialValue)) {
    errors.initialValue = t.required;
  }
  if (!values.currencyId) {
    errors.currencyId = t.required;
  }
  if (!values.color) {
    errors.color = t.required;
  }
  return errors;
};

export default validate;