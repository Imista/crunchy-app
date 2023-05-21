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

router.get("/carta", isLoggedIn, (req, res) => {
    res.sendFile(views + "/carta.html");
});

router.get("/busqueda", isLoggedIn, (req, res) => {
    res.sendFile(views + "/busqueda.html");
});

router.get("/inicio", (req, res) => {
    res.sendFile(views + "/inicio.html");
});

router.get("/ingreso", (req, res) => {
    res.sendFile(views + "/ingreso.html");
});
router.get("/registro", (req, res) => {
    res.sendFile(views + "/registro.html");
});

module.exports = { router };
