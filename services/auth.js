module.exports = {
    auth: function (request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        } else {
            return response.redirect(401, '/login');
        }
    }
};