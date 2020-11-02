const mongoose = require("mongoose");
const shortId = require("shortid");

const urlSchema = mongoose.Schema({
  short: {
    type: String,
    default: shortId.generate,
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

module.exports = mongoose.model("Url", urlSchema);
