const express = require("express");
const mongoose = require("mongoose");
const home = require("./routes/home");
const expressLayouts = require("express-ejs-layouts");

mongoose
  .connect(
    `mongodb+srv://covid:${process.env.MONGO_PASSWORD}@cluster0.xlq5u.mongodb.net/urlshortener?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(console.log("database connected"))
  .catch((err) => console.error(err));

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", home);

app.listen(process.env.PORT || 5000);
