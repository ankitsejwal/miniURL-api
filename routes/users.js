const router = require('express').Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, joiUserSchema } = require('../models/User');
const validate = require('../middleware/validate');

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get('/:id', validate('id'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'user does not exist' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post('/', validate(joiUserSchema), async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: 'user already exists' });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    user = new User(req.body);
    await user.save();
    const token = user.genAuthToken();
    user = _.omit(user, ['password']);
    res.status(200).header('miniURL-auth-token', token).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put('/:id', validate('id'), validate(joiUserSchema), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'user does not exist' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete('/:id', validate('id'), async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).json({ message: 'user does not exist' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
