const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

router.post(
    '/',
    body('name').notEmpty(),
    body('email').isEmail(),
    body("email").custom(email => {
        return User.find({
            email: email
        }).then(user => {
            if (user.length > 0) {
                return Promise.reject('Email already in use');
            }
        });
    }),
    body('username').notEmpty(),
    body("username").custom(username => {
        return User.find({
            username: username
        }).then(user => {
            if (user.length > 0) {
                return Promise.reject('Username already taken');
            }
        });
    }),
    body('password').custom((value, { req }) => {
        if (value !== req.body.confPassword) {
            throw new Error('Confirm Password does not match Password');
        }
        return true;
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render(
                'register',
                {
                    errors: errors.errors
                }
            );
        } else {
            try {
                const salt = await bcrypt.genSaltSync(10);
                const password = await bcrypt.hash(req.body.password, salt);
                req.body.password = password;
                await User.create(req.body)
                    .then((user) => {
                        console.log('User created: ', user);
                        // res.status(200).json({success: true, data: JSON.stringify(user)});
                        res.redirect('/user/login');
                    })
                    .catch((err) => {
                        console.log('Error in creating user: ', err);
                        // res.status(500).json({success: false, data: JSON.stringify(err)});
                        res.render(
                            'register',
                            {
                                errors: [err]
                            }
                        );
                    });
            } catch (err) {
                console.log('Error in hashing password: ', err);
                err.msg = 'Please try again';
                err.param = 'Internal Error';
                res.render(
                    'register',
                    {
                        errors: [err]
                    }
                );
            }
        }
    }
);

router.get(
    '/login', 
    (req, res) => {
        res.render(
            'login',
            {
                message: req.flash('error')
            }
        );
    }
);

router.post(
    '/login', 
    passport.authenticate(
        'local', 
        {
            successRedirect: '/', 
            failureRedirect: '/user/login',
            failureFlash: true,
            // failureMessage: 'Wrong Username/Password'
        }
    ),
    function(req, res) {
        res.render('user');
    }
);

router.get(
    '/register', 
    (req, res) => {
        res.render('register');
    }
);

router.get(
    '/logout', 
    (req, res) => {
        req.logOut();
        res.redirect('/user/login');
    }
);

module.exports = router;