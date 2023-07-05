const router = require('express').Router();
const _ = require('lodash');
const { User } = require('../models/User');

router.get('/', async (req, res) => {
  const errorMessage = 'username and password combination is incorrect';
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send(errorMessage);
  if (user.password !== req.body.password) return res.status(401).send(errorMessage);

  // if user is authenticated send token in header
  const token = user.genAuthToken();
  user = _.omit(user, ['password']);
  res.status(200).header('miniUrl-auth-token', token).send(user);
});

module.exports = router;
