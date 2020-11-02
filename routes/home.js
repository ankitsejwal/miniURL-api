const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

router
  .get("/", async (req, res) => {
    const urls = await Url.find();
    res.render("index", { urls: urls });
  })
  .post("/", async (req, res) => {
    await Url.create({
      full: req.body.fullUrl,
    });
    res.redirect("/");
  });

router.get("/:Url", async (req, res) => {
  const url = await Url.findOne({ short: req.params.Url });
  if (url === null) return res.sendStatus(404);
  url.clicks++;

  await url.save();

  res.redirect(url.full);
});

module.exports = router;
