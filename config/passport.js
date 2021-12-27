const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const config = require('../config/database');
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { 
                    return done(err); 
                }
                if (!user) { 
                    return done(null, false, { message: 'No User Found' });
                }
                // if (!user.verifyPassword(password)) { 
                //     return done(null, false, { message: 'Incorrect Password' });
                // }
                bcrypt.compare(
                    password,
                    user.password,
                    (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Wrong Password' });
                        }
                    } 
                );
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}
