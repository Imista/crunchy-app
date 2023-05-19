function isLoggedIn(req, res, next) {
    if (req.cookies.username) next();
    else res.redirect("/inicio");
}

module.exports = { isLoggedIn };
