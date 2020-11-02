const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

router
  .get("/", async (req, res) => {
    const urls = await Url.find();
    res.render("home", { urls: urls });
  })
  .post("/", async (req, res) => {
    let url = await Url.findOne({ full: req.body.fullUrl });
    if (url) return res.send("url already exists");

    url = new Url();

    const { error, value } = url.validateData(req.body);

    if (error) return res.send("error...");

    url.full = value.fullUrl;
    await url.save();

    res.redirect("/");
  });

router.get("/:Url", async (req, res) => {
  const url = await Url.findOne({ short: req.params.Url });
  if (url === null) return res.status(404).redirect("/");
  url.clicks++;

  await url.save();
  res.redirect(url.full);
});

module.exports = router;
