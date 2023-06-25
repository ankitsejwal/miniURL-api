const mongoose = require('mongoose');
const Joi = require('joi');
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
  user: Joi.ObjectId(),
  fullUrl: Joi.string().trim().uri().min(1),
  customUrl: Joi.boolean().default(false),
  shortUrlLength: Joi.number().min(2).max(10).default(4),
};

urlSchema.static.createShortUrl = async function (shortUrlLength) {
  let shortUrl;
  let url;
  let unique = false;
  let collision = 0;
  do {
    shortUrl = nanoid(shortUrlLength);
    // look for collision
    url = await Url.findOne({ shortUrl: shortUrl });
    if (url) {
      collision++;
    } else {
      unique = true;
    }
  } while (!unique);
  return { shortUrl: shortUrl, collision: collision };
};

const Url = mongoose.model('Url', urlSchema);

module.exports = { Url, joiUrlSchema };
