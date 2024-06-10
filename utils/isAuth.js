const isAuth = (req, res, next) => {

    const loggedIn = req.session.user;
    if (loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = isAuth;