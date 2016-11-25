var FacebookStrategy = require('passport-facebook');

var User = require('../models/users');
var configAuth = require('./config');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebook.clientID,
        clientSecret: configAuth.facebook.clientSecret,
        callbackURL: configAuth.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'email']
    },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {

                // if(!req.user)  below process runs else directly using session data +++++

                User.findOne({ fb_Id: profile.id }, function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    if (res) {
                        return done(null, res);
                    } else {
                        var newUser = new User();
                        
                        newUser.fb_Id = profile.id;
                        newUser.token = token;
                        newUser.username = profile.displayName;
                        newUser.email = profile.emails[0].value;

                        newUser.save(function (err) {
                            if (err) {
                                throw new Error(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
                // if(req.user) fetching data from req.user and +++++++ lines
            });
        }

    ));
};