/* local authentication */
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, models) {

    /* 
    *  Maintaining persistent login sessions
    *  serialized  authenticated user to the session
    */
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialized when subsequent requests are made
    passport.deserializeUser((id, done) => {
        models.User.findOne({
            _id: id
        }, '-user.password', (err, user) => {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (request, email, password, done) => {
            process.nextTick(() => {
                var emailStr = email.substring(0, 40);
                var passWordStr = password.substring(0, 40);

                models.User.findOne({ 'user.email': emailStr })
                    .then(user => {
                        if (!user) {
                            return done(null, false, { msg: "User not exist." });
                        } else if (!user.verifyPassword(passWordStr)) {
                            return done(null, false, { msg: "Wrong password entered." });
                        }
                        return done(null, user);
                    })
                    .catch(error => {
                        return done(error, false, { msg: "Error found logging in." });
                    });
            });
        }));
};
