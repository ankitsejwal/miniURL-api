const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 25 },
  email: { type: String, required: true, min: 5, max: 50 },
  password: { type: String, required: true, min: 5, max: 100 },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

userSchema.methods.genAuthToken = function () {
  const payload = {
    _id: this.id,
    iat: new Date().getTime(),
  };
  return jwt.sign(payload, process.env.JWT_PVT_KEY, {
    subject: 'user',
    expiresIn: '24h',
    issuer: 'sejw.al',
    audience: 'api.sejw.al',
  });
};

userSchema.methods.sendResponse = function (message) {
  const token = this.genAuthToken();
  const decoded = jwt.decode(token);
  const expiresAt = decoded.exp;
  const user = _.omit(this.toObject(), ['password']);

  return { message, token, expiresAt, user };
};

const User = mongoose.model('User', userSchema);

const joiUserSchema = {
  name: Joi.string().required().min(3).max(25),
  email: Joi.string().required().min(5).max(50),
  password: Joi.string().required().min(5).max(100),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
  inviteCode: Joi.string().min(3).max(10).required(),
};

const joiAuthSchema = {
  email: Joi.string().required().min(5).max(50),
  password: Joi.string().required().min(5).max(100),
};

module.exports = { User, joiUserSchema, joiAuthSchema };
