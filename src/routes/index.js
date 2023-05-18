const express = require("express");
const router = express.Router();
const path = require("path");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const views = path.join(__dirname, "/../public/views");

router.get("/", isLoggedIn, (req, res) => {
    res.sendFile(views + "/matches.html");
});

router.get("/perfil", isLoggedIn, (req, res) => {
    res.sendFile(views + "/perfil.html");
});

router.get("/register", (req, res) => {
    res.sendFile(views + "/register.html");
});

module.exports = { router };
