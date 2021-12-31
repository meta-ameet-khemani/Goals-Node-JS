const UserSchema = require('../model/user');
const LocalStrategy = require('passport-local');

module.exports = function(passport) {
    passport.use(new LocalStrategy((username, password, done) => {
        UserSchema.findOne({username: username}, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false, { message: 'Incorrect Username' });
            // if (!user.verifyPassword(password)) {
            if (!(user.password == password)) {
                return done(null, false, { message: 'Incorrect Password' });
            }
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        UserSchema.findById(id, function(err, user) {
            done(err, user);
        });
    });
}