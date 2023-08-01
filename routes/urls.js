const router = require('express').Router();
const { Url, joiUrlSchema } = require('../models/Url');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).json(urls);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get('/:id', auth, validate('id'), async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);
    if (!url) return res.status(404).json({ message: 'url does not exists' });
    res.status(200).json(url);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post('/', auth, validate(joiUrlSchema), async (req, res) => {
  try {
    let miniURL;
    if (req.body.customUrl) miniURL = await Url.generateCustomURL(req.body.customLink);
    else miniURL = await Url.generateMiniURL(req.body.customLength);

    req.body.user = req.user._id;
    req.body.miniURL = miniURL.miniURL;
    req.body.collision = miniURL.collision;

    // add short url to value object
    const url = new Url(req.body);
    await url.save();
    res.status(200).json(url);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put('/:id', auth, validate('id'), validate(joiUrlSchema), async (req, res) => {
  try {
    const url = await Url.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!url) return res.status(404).json({ message: 'url does not exist' });
    res.status(200).json(url);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete('/:id', auth, validate('id'), async (req, res) => {
  try {
    const url = await Url.findByIdAndRemove(req.params.id);
    if (!url) return res.status(404).json({ message: 'url does not exists' });
    res.status(200).json(url);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
