const router = require('express').Router();
const { Url } = require('../models/Url');
const validateSchema = require('../middleware/validateSchema');

router.get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).send(urls);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', validateSchema, async (req, res) => {
  try {
    const url = await Url.findById(req.value.id);
    if (!url) return res.status(404).send('url does not exists');
    res.status(200).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', validateSchema, async (req, res) => {
  try {
    const fullUrl = req.value.fullUrl;
    let url = await Url.findOne({ fullUrl: fullUrl });
    // if fullUrl already exists return the saved shortUrl
    if (url) return res.status(200).send(url.shortUrl);

    const { shortUrl, collision } = await Url.createShortUrl(req.value.shortUrlLength);
    req.value.shortUrl = shortUrl;
    req.value.collision = collision;

    // add short url to value object
    url = new Url(req.value);
    await url.save();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const url = await Url.findByIdAndUpdate(req.value.id, req.value, { new: true });
    if (!url) return res.status(404).send('url does not exist');
    res.status(200).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const url = await Url.findByIdAndRemove(req.value.id);
    if (!url) return res.status(404).send('url does not exists');
    res.status(200).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
