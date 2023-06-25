const router = require('express').Router();
const { User } = require('../models/User');
const validate = require('../middleware/validate');

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', validate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', validate, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already exists');
    user = new User(req.body);
    await user.save();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', validate, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', validate, async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('user does not exist');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
