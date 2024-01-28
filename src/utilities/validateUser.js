const Joi = require("joi");

const validate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    password: Joi.string().min(3).max(25).trim(true).required(),
  });
  return userSchema.validate(data);
};

module.exports = {
  validate,
};
