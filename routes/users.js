const router = require('express').Router();
const { User } = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.value.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.value.email });
    if (user) return res.status(400).send('user already exists');
    user = new User(req.value);
    await user.save();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.value.id, req.value, { new: true });
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.value.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
