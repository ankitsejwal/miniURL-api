const mongoose = require('mongoose');
const Joi = require('joi');

const urlSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shortUrl: { type: String, unique: true, required: true },
  fullUrl: { type: String, unique: true, required: true },
  clicks: { type: Number, default: 0 },
});

const joiUrlSchema = {
  createdBy: Joi.ObjectId(),
  full: Joi.string().trim().uri().min(1),
};

urlSchema.methods.validateData = function (data) {
  const schema = Joi.object({
    fullUrl: Joi.string().trim().uri().min(1),
  });

  return schema.validate(data);
};

const Url = mongoose.model('Url', urlSchema);

module.exports = { Url, joiUrlSchema };
