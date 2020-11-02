const express = require("express");
const mongoose = require("mongoose");
const home = require("./routes/home");

mongoose
  .connect(
    `mongodb+srv://covid:${process.env.MONGO_PASSWORD}@cluster0.xlq5u.mongodb.net/urls?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("database connected"))
  .catch((err) => console.error(err));

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/", home);

app.listen(process.env.PORT || 5000);
