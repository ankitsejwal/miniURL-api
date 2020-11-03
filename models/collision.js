const mongoose = require("mongoose");

const collisionSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Collision", collisionSchema);
