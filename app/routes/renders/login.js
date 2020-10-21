module.exports = (app, servs) => {

    app.get("/", (request, response) => {
        servs.log.JL("routesjs.logger").debug("Get Login page.");

        response.setHeader('Cache-Control', 'no-cache');
        response.render('login.html', {});
    });
};