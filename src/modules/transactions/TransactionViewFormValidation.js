const t = {
  required: 'Required'
};

const validate = (values) => {
  const errors = {};
  if (!values.accountId) {
    errors.accountId = t.required;
  }
  if (!values.categoryId) {
    errors.categoryId = t.required;
  }
  if (!values.amount) {
    errors.amount = t.required;
  }
  return errors;
};

export default validate;