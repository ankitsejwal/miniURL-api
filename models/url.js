const mongoose = require("mongoose");
const Joi = require("joi");

const urlSchema = new mongoose.Schema({
  short: {
    type: String,
    required: true,
  },
  full: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

urlSchema.methods.validateData = function (data) {
  const schema = Joi.object({
    fullUrl: Joi.string().trim().uri().min(1),
  });

  return schema.validate(data);
};

module.exports = mongoose.model("Url", urlSchema);
