const Joi = require("@hapi/joi");
const { body } = require("./body");
const { params } = require("./params");
const { validate } = require("./validate");

module.exports = { gateway };

function gateway(input, type) {
  if (type === "body") {
    return validate(input, body);
  } else if (type === "params") {
    console.log("here?");
    return validate(input, params);
  } else {
    return validate(input.params, params) && validate(input.body, body);
  }
}
