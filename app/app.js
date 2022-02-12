const express = require("express");
const app = express();


//payme
app.use("/", require("./payment/Router.Payme"));

//click
app.use("/", require("./payment/Router.Click"))


module.exports = app;