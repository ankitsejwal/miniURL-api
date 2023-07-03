const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

module.exports = function (joiSchema) {
  return function (req, res, next) {
    const schema = Joi.object(joiSchema);
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    req.body = value;
    next();
  };
};
