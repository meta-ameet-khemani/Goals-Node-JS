function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('success_msg', 'Please login first ...');
        res.redirect('/user/login');
    }
}

module.exports = {
    isAuthenticated: isAuthenticated
}