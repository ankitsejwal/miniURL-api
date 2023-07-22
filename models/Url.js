const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const { nanoid } = require('nanoid');

const urlSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shortUrl: { type: String, unique: true, required: true },
  fullUrl: { type: String, unique: true, required: true },
  customUrl: { type: Boolean, default: false },
  visits: { type: Number, default: 0 },
  collisions: { type: Number, default: 0 },
});

const joiUrlSchema = {
  user: Joi.objectid(),
  fullUrl: Joi.string().trim().uri().min(1),
  customUrl: Joi.boolean().default(false),
  customLength: Joi.number().min(2).max(10).default(4),
};

urlSchema.statics.createShortUrl = async function (customLength) {
  let shortUrl;
  let url;
  let unique = false;
  let collision = 0;
  do {
    shortUrl = nanoid(customLength);
    // look for collision
    url = await this.findOne({ shortUrl: shortUrl });
    if (url) collision++;
    else unique = true;
    console.log(url, shortUrl, collision);
  } while (!unique);
  return { shortUrl, collision };
};

const Url = mongoose.model('Url', urlSchema);

module.exports = { Url, joiUrlSchema };
