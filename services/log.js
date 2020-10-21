//Logging mechanism
var JL = require('jsnlog').JL;
var jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;
// Define loggers
var Loggers = {
    "JL":   JL,
    "jsnlog_nodejs": jsnlog_nodejs
};

module.exports = function(loglevel) {
    //Set LOG level for back-end
    JL("back-end.logger").setOptions({
        "level": loglevel
    });

    //Set LOG level for routes
    JL("routesjs.logger").setOptions({
        "level": loglevel
    });

    return Loggers;
}