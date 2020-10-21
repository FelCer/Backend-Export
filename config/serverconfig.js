var enviroment;
/* Detect enviroment */
if (process.env.APP_NAME == "pro") {
    enviroment = "pro";
} else if (process.env.APP_NAME == "pre") {
    enviroment = "pre";
} else {
    enviroment = "dev";
}

// Determine LOG level
var logLevel;
if (enviroment == "pro") {
    logLevel = 5000;
} else {
    logLevel = 2000;
}

const Config = {
    "log": logLevel,
    "enviroment": enviroment
};

module.exports = Config;