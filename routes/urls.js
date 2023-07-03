const router = require('express').Router();
const { Url, joiUrlSchema } = require('../models/Url');
const validateBody = require('../middleware/validateBody');
const validateID = require('../middleware/validateID');

router.get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).send(urls);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', validateID, async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);
    if (!url) return res.status(404).send('url does not exists');
    res.status(200).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

// fix req.body
router.post('/', validateBody(joiUrlSchema), async (req, res) => {
  try {
    const fullUrl = req.body.fullUrl;
    let url = await Url.findOne({ fullUrl: fullUrl });
    // if fullUrl already exists return the saved shortUrl
    if (url) return res.status(200).send(url.shortUrl);

    const { shortUrl, collision } = await Url.createShortUrl(req.body.shortUrlLength);
    req.body.shortUrl = shortUrl;
    req.body.collision = collision;

    // add short url to value object
    url = new Url(req.body);
    await url.save();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', validateID, validateBody(joiUrlSchema), async (req, res) => {
  try {
    const url = await Url.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!url) return res.status(404).send('url does not exist');
    res.status(200).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', validateID, async (req, res) => {
  try {
    const url = await Url.findByIdAndRemove(req.params.id);
    if (!url) return res.status(404).send('url does not exists');
    res.status(200).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
