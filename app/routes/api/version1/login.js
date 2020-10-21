module.exports = (app, servs) => {

    app.post('/api/v1/login', (request, response) => {
        servs.log.JL('routesjs.logger').debug('POST v1/login');

        response.setHeader('Cache-Control', 'no-cache');

        servs.passport.authenticate('login', (error, user, info) => {
            if (error) {
                servs.log.JL("routesjs.logger").error("Error loging-in: " + error);
                // response status 404
                response.statusCode = 404;
                return response.json({
                    "msg": info.msg,
                    "data": {}
                });
            }

            if (!user) {
                servs.log.JL("routesjs.logger").debug("Unauthorized user");
                // response status 401
                response.statusCode = 401;
                return response.json({
                    "msg": info.msg,
                    "data": {}
                });
            }

            servs.log.JL("routesjs.logger").debug("User found");
            // Redirect to header page
            request.logIn(user, (error) => {

                if (error) {
                    response.statusCode = 404;
                    return response.json({
                        "msg": "Error found logging in.",
                        "data": {}
                    });
                }

                response.statusCode = 200;
                return response.json({
                    "msg": "login-authenticated",
                    "data": user
                });
            })
        })(request, response);
    });
}