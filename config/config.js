const db = require('./db');
const serverConfig = require('./serverconfig');

const config = {
    "database": db,
    "server": serverConfig
};

module.exports = config;