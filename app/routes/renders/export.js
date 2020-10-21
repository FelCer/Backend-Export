module.exports = (app, servs) => {

    app.get("/export", (request, response) => {
        servs.log.JL("routesjs.logger").debug("Get Exports page.");

        response.setHeader('Cache-Control', 'no-cache');
        response.render('export.html', {});
    });
};