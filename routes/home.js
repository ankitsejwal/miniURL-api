const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();
const Url = require('../models/Url');
const Collision = require('../models/collision');

router
  .get('/', async (req, res) => {
    const url = {};
    res.render('home', { url: url, hidden: 'hidden' });
  })
  .post('/', async (req, res) => {
    try {
      let url = await Url.findOne({ full: req.body.fullUrl });
      if (url) return res.render('home', { url: url, hidden: '' });

      url = new Url();
      const { error, value } = url.validateData(req.body);
      if (error) return res.send('error...');

      url.full = value.fullUrl;
      url.short = await generateShorturl();
      await url.save();
      res.render('home', { url: url, hidden: '' });
    } catch (e) {
      console.error(e);
      res.redirect('/');
    }
  });

router.get('/:url', async (req, res) => {
  try {
    const url = await Url.findOne({ short: req.params.url });
    if (!url) return res.status(404).redirect('/');
    url.clicks++;
    await url.save();
    res.redirect(url.full);
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
});

async function generateShorturl() {
  try {
    let generateUrl = nanoid(1);
    let url = await Url.findOne({ short: generateUrl });
    console.log(url);

    if (url) {
      console.log('collision detected');
      let collision = await Collision.findById('5fa09b01d8186c6c24aab049');
      collision.total++;
      await collision.save();
      generateShorturl();
    }
    return generateUrl;
  } catch (e) {
    console.error(e);
    res.redirect('/');
  }
}

module.exports = router;
