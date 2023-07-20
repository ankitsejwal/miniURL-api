const router = require('express').Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, joiUserSchema } = require('../models/User');
const validate = require('../middleware/validate');

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', validate('id'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', validate(joiUserSchema), async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already exists');
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // req.body.password = hashedPassword;
    user = new User(req.body);
    await user.save();
    const token = user.genAuthToken();
    user = _.omit(user, ['password']);
    res.status(200).header('miniUrl-auth-token', token).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', validate('id'), validate(joiUserSchema), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', validate('id'), async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
