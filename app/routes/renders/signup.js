module.exports = (app, servs) => {

    app.get("/signup", (request, response) => {
        servs.log.JL("routesjs.logger").debug("Get SignUp page.");

        response.setHeader('Cache-Control', 'no-cache');
        response.render('signup.html', {});
    });
};