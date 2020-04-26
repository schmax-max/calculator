module.exports = { validate };

function validate(input, schema) {
  const { error } = schema.validate(input);
  if (error) {
    console.log(error.toString());
    return false;
  } else {
    return true;
  }
}
