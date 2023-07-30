const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const { nanoid } = require('nanoid');

const urlSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  miniURL: { type: String, unique: true, required: true },
  fullUrl: { type: String, required: true },
  customUrl: { type: Boolean, default: false },
  visits: { type: Number, default: 0 },
  collision: { type: Number, default: 0 },
});

const joiUrlSchema = {
  user: Joi.objectid(),
  fullUrl: Joi.string().trim().uri().min(1),
  customUrl: Joi.boolean().default(false),
  customLink: Joi.alternatives().conditional('customUrl', {
    is: true,
    then: Joi.string().trim().min(2).required(),
    otherwise: Joi.optional(),
  }),
  customLength: Joi.number().min(2).max(6).default(3),
};

urlSchema.statics.generateCustomURL = async function (customLink) {
  if (!customLink) return new Error('no custom link was provided');
  const url = await this.findOne({ miniURL: customLink });
  if (url) return new Error('custom URL already exists');
  return { miniURL: customLink, collision: 0 };
};

urlSchema.statics.generateMiniURL = async function (customLength) {
  let miniURL;
  let url;
  let unique = false;
  let collision = 0;
  do {
    miniURL = nanoid(customLength);
    // look for collision
    url = await this.findOne({ miniURL });
    if (url) {
      collision++;
    } else {
      unique = true;
      break;
    }
  } while (!unique);
  return { miniURL, collision };
};

const Url = mongoose.model('Url', urlSchema);

module.exports = { Url, joiUrlSchema };
