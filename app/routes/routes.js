// One routes file for each page or api
module.exports = (app, models, servs) => {
    // Api request
    require("./api/api.js")(app, models, servs);
    /* Routes, pages render */
    require("./renders/login")(app, servs);
    require("./renders/signup")(app, servs);
    require("./renders/export")(app, servs);
};