const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, joiAuthSchema } = require('../models/User');
const validate = require('../middleware/validate');

router.post('/', validate(joiAuthSchema), async (req, res) => {
  const errorMessage = 'username and password combination is incorrect';
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: errorMessage });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ message: errorMessage });

  // if user is authenticated send token in header
  const token = user.genAuthToken();
  user = _.omit(user.toObject(), ['password']);
  res.status(200).json({
    message: 'Authentication successful',
    token,
    user,
  });
});

module.exports = router;
