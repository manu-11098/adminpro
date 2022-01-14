/**
 * Requires
 */
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/**
 * Init variables
 */
var app = express();

app.use(cors());

/**
 * Body parser
 * parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Routes
 */
var appRoutes = require('./routes/index');
app.use('/', appRoutes);

/**
 * Conection db
 */
mongoose.connection.openUri('mongodb://dev:dev@127.0.0.1:27017/hospitaldb', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});


// Server index config
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));

app.listen(3000, () => console.log('Express server running in port 3000: \x1b[32m%s\x1b[0m', 'online'));

