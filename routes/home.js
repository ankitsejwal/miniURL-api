const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

router
  .get("/", async (req, res) => {
    const url = {
      full: "https://www.lynda.com/",
      short: "rew",
    };
    res.render("home", { url: url });
  })
  .post("/", async (req, res) => {
    let url = await Url.findOne({ full: req.body.fullUrl });
    if (url) return res.render("home", { url: url });

    url = new Url();

    const { error, value } = url.validateData(req.body);

    if (error) return res.send("error...");

    url.full = value.fullUrl;
    await url.save();

    res.render("home", { url: url });
  });

router.get("/:url", async (req, res) => {
  const url = await Url.findOne({ short: req.params.url });
  if (!url) return res.status(404).redirect("/");
  url.clicks++;
  await url.save();

  res.redirect(url.full);
});

module.exports = router;
