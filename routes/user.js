const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isAuthenticated } = require('./filter');

router.get(
    '/login', 
    (req, res) => {
        res.render('login');
    }
);

router.post(
    '/login', 
    (req, res, next) => {
        passport.authenticate(
            'local',
            {
                successRedirect: '/',
                failureRedirect: '/user/login'
            }
        )(req, res, next);
    }
);

router.get(
    '/register', 
    (req, res) => {
        res.render('register');
    }
);

router.post(
    '/register',
    isAuthenticated, 
    (req, res) => {
        req.flash('success_msg', 'You are registered....');
        res.redirect('/');
        // res.send('Register User API');
    }
);

router.get(
    '/logout', 
    isAuthenticated,
    (req, res) => {
        req.logout();
        res.redirect('/user/login');
    }
);

module.exports = router;