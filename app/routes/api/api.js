module.exports = (app, models, servs) => {
    require("./version1/login.js")(app, servs);
    require("./version1/signup.js")(app, models, servs);
}