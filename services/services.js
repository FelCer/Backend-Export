// Require Passport (login middleware)
var passport = require('passport');

module.exports = function (config, models) {

    // Log-ing methods
    var log = require('./log.js')(config.server.log);
    require('./passport.js')(passport, models);

    return {
        "log": log,
        "passport": passport
    };
};