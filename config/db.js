var configDb;

var mongoDatabase = 'company';
var mongoHost = 'localhost';
var mongoPort = '27017';
var mongoURL = 'mongodb://' + mongoHost + '/' + mongoDatabase;

configDb = {
    'url': mongoURL,
    'dbname': mongoDatabase,
    'host': mongoHost,
    'port': mongoPort
};

module.exports = configDb;