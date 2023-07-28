const router = require('express').Router();

router.get('/:miniURL', async (req, res) => {
  try {
    const miniURL = req.params.miniURL;
    const url = await Url.findOne({ miniURL: miniURL });
    if (!url) return res.status(404).json({ message: 'url does not exists' });
    res.status(200).json(url);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
