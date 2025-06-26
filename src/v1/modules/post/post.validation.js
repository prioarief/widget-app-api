const Joi = require("joi");
const validation = require("../../helpers/validation");

class PostValidation {
  static get(req) {
    const schema = Joi.object({
      communityId: Joi.number().min(1).required()
    })

    return validation(schema, req)
  }
}

module.exports = PostValidation