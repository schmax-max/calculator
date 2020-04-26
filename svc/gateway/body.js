const Joi = require("@hapi/joi");
exports.body = Joi.object({
  core: Joi.object().required(),
  links: Joi.object(),
  refs: Joi.object().required(),
}).unknown(true);
