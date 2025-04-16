
// Middleware to check if the user is logged in
// and redirect to the login page if not

exports.requireLogin = (req, res, next) => {
    if (req.cookies && req.cookies.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.redirectIfLoggedIn = (req, res, next) => {
    if (req.cookies && req.cookies.userId) {
        return res.redirect('/profile');
    }
    next();
};
