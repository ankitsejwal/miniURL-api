const router = require('express').Router();
const { User } = require('../models/User');

router.get('/', async (req, res) => {
  req.body.email;
  req.body.password;

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('user not found');

  if (user.password !== req.body.password)
    return res.status(403).send('username password combination is incorrect');

  res.status(200).header('miniUrl-auth-token', 'token').send(user);
});

module.exports = router;
