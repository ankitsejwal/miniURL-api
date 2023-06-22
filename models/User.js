const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 25 },
  email: { type: String, required: true, min: 5, max: 50 },
  password: { type: String, required: true, min: 5, max: 50 },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
