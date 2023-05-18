const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const { router } = require("./routes");
const app = express();

app.set("views", path.join(__dirname, "public", "views"));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

module.exports = app;
