const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 25 },
  email: { type: String, required: true, min: 5, max: 50 },
  password: { type: String, required: true, min: 5, max: 100 },
});

userSchema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_PVT_KEY);
};

const User = mongoose.model('User', userSchema);

const joiUserSchema = {
  name: Joi.string().required().min(3).max(25),
  email: Joi.string().required().min(5).max(50),
  password: Joi.string().required().min(5).max(100),
  repeat_password: Joi.ref('password'),
};

const joiAuthSchema = {
  email: Joi.string().required().min(5).max(50),
  password: Joi.string().required().min(5).max(100),
};

module.exports = { User, joiUserSchema, joiAuthSchema };
