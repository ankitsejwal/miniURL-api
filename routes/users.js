const router = require('express').Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, joiUserSchema } = require('../models/User');
const validateBody = require('../middleware/validateBody');
const validateID = require('../middleware/validateID');

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', validateID, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', validateBody(joiUserSchema), async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already exists');
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    user = new User(req.body);
    await user.save();
    const token = user.genAuthToken();
    user = _.omit(user, ['password']);
    res.status(200).header('miniUrl-auth-token', token).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', validateID, validateBody(joiUserSchema), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', validateID, async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
