/* Configuration project */
var config = require('./config/config');

/**Models in data base */
var models = require('./app/models/models');

// Services (libraries, utils, etc.)
var servs = require('./services/services.js')(config, models);

/* Templating system */
var express = require('express');
/* Mongoose client */
var mongoose = require('mongoose');
/* Cookies and body parser */
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
/* Express sessions */
var session = require('express-session');
/* Http server */
var http = require('http');

var app = express();
var server = http.createServer(app);

var MongoStore = require('connect-mongo')(session);

app.enable('trust proxy');

app.set('view cache', true);

// Enable page 'etag' for caching
app.enable('etag');
app.set('etag', 'weak');

app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true,
    //limit: '10mb'
}));
app.use(bodyParser.json({
    limit: '10mb'
}));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));
app.use('/modules', express.static(__dirname + '/node_modules/'));

mongoose.connect(config.database.url, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => { servs.log.JL("back-end.logger").debug(`Database is connected.`) })
    .catch((error) => { servs.log.JL("back-end.logger").error(error) });

// Re-use mongoose conection
app.use(session({
    key: 'mysession',
    secret: 'h37ffyh318bhg3',
    resave: true, // Renew expiration time when using it
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 1 * 48 * 60 * 60 // = 48h to delete
    }),
    cookie: {
        secure: (config.server.enviroment == "dev") ? true : false,
        httpOnly: true,
        expires: true,
        maxAge: 1 * 24 * 60 * 60 * 1000 // = 24h to expire
    }
}));

app.use(servs.passport.initialize());
app.use(servs.passport.session());

const port = 8880;

require("./app/routes/routes.js")(app, models, servs);

server.listen(port, () => {
    console.log(`NodeJS version: ${process.version}`);
    console.log(`Open run project http://localhost:${port}`);
});