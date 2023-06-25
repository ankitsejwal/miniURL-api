const validateSchema = require('../middleware/validateSchema');
const router = require('express').Router();

router.get('/:shorturl', validateSchema, async (req, res) => {
  try {
    const shortUrl = req.params.shorturl;
    const url = await Url.findOne({ shortUrl: shortUrl });
    if (!url) return res.status(404).send('url does not exists');
    res.status(200).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
