const Joi = require("@hapi/joi");
exports.params = Joi.object({
  type: Joi.string(),
}).unknown(true);

// .valid('publishers', 'slugs', 'curators', 'photos')
