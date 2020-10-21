module.exports = (app, models, servs) => {

    app.post('/api/v1/signup', (request, response) => {
        servs.log.JL("routesjs.logger").debug("Post v1/signup");

        response.setHeader('Cache-Control', 'no-cache');

        // User data object
        var data = {};

        /* Validate email */
        if (!request.body || !request.body.email) {
            servs.log.JL("routesjs.logger").error("Email mandatory.");
            response.statusCode = 404;
            return response.json({
                "msg": "Email mandatory."
            });
        }


        // Validate password
        if (!request.body || !request.body.password) {
            servs.log.JL("routesjs.logger").error("Password mandatory.");
            response.statusCode = 404;
            return response.json({
                "msg": "Password mandatory."
            });
        }

        data.email = request.body.email.substring(0, 40)
        data.password = request.body.password.substring(0, 40);

        // Validate if user exists
        models.User.findOne({ 'user.email': data.email })
            .then(user => {

                if (user) {
                    servs.log.JL("routesjs.logger").debug("User already exists.");
                    response.statusCode = 404;
                    return response.json({
                        "msg": "User already exists."
                    });
                }

                // Create new user
                var newUser = new models.User();
                newUser.user.password = newUser.generateHash(data.password);
                newUser.user.email = data.email;
                newUser.save()
                    .then(() => {
                        servs.log.JL("routesjs.logger").debug("User saved successfully.");
                        return response.redirect(201, '/export');
                    })
                    .catch(error => {
                        servs.log.JL("routesjs.logger").error("Error saving user: " + error);
                        response.statusCode = 500;
                        return response.json({
                            "msg": "Error saving user."
                        });
                    })
            })
            .catch(error => {
                servs.log.JL("routesjs.logger").error("Error searching user: " + error);
                response.statusCode = 500;
                return response.json({
                    "msg": "Error searching user."
                });
            });
    });
};