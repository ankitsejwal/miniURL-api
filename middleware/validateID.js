const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

module.exports = function (req, res, next) {
  const schema = Joi.object({ id: Joi.objectid() });
  const { value, error } = schema.validate({ id: req.params.id });
  if (error) return res.status(400).send(error.details[0].message);
  // reassign req.params.id from value
  req.params.id = value.id;
  next();
};
