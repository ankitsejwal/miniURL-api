const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, joiAuthSchema } = require('../models/User');
const validate = require('../middleware/validate');

router.post('/', validate(joiAuthSchema), async (req, res) => {
  const errorMessage = 'username and password combination is incorrect';
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json(errorMessage);
  // const match = await bcrypt.compare(req.body.password, req.body.password);
  if (req.body.password !== user.password) return res.status(401).json(errorMessage);

  // if user is authenticated send token in header
  const token = user.genAuthToken();
  user = _.omit(user, ['password']);
  res.status(200).header('miniUrl-auth-token', token).json(user);
});

module.exports = router;
