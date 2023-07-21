const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

module.exports = function (joiSchema) {
  return function (req, res, next) {
    if (joiSchema === 'id') {
      const schema = Joi.object({ id: Joi.objectid() });
      const { value, error } = schema.validate({ id: req.params.id });
      if (error) return res.status(400).json(error.details[0].message);
      req.params.id = value.id;
      next();
    } else {
      const schema = Joi.object(joiSchema);
      const { value, error } = schema.validate(req.body);
      if (error) return res.status(400).json(error.details[0].message);
      req.body = value;
      next();
    }
  };
};
