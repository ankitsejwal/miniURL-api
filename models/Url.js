const mongoose = require('mongoose');
const Joi = require('joi');

const urlSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shortUrl: { type: String, unique: true, required: true },
  fullUrl: { type: String, unique: true, required: true },
  customUrl: { type: Boolean, default: false },
  clicks: { type: Number, default: 0 },
  collisions: { type: Number, default: 0 },
});

const joiUrlSchema = {
  user: Joi.ObjectId(),
  full: Joi.string().trim().uri().min(1),
  customUrl: Joi.boolean().default(false),
  shortUrlLength: Joi.number().min(2).max(10).default(4),
};

const Url = mongoose.model('Url', urlSchema);

module.exports = { Url, joiUrlSchema };
