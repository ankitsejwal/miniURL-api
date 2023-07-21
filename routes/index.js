const router = require('express').Router();

router.get('/:shorturl', async (req, res) => {
  try {
    const shortUrl = req.params.shorturl;
    const url = await Url.findOne({ shortUrl: shortUrl });
    if (!url) return res.status(404).json('url does not exists');
    res.status(200).json(url);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
