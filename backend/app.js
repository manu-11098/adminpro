/**
 * Requires
 */ 
var express     = require('express');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');

/**
 * Init variables
 */ 
var app = express();

/**
 * Body parser
 * parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Routes
 */ 
var appRoutes       = require('./routes/app');
var userRoutes      = require('./routes/user');
var loginRoutes     = require('./routes/login');

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);


/**
 * Conection db
 */ 
mongoose.connection.openUri('mongodb://dev:dev@192.168.99.101:27017/hospitaldb', {useNewUrlParser: true}, (err, res) => {
    if ( err ) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});


app.listen(3000, () => console.log('Express server running in port 3000: \x1b[32m%s\x1b[0m', 'online') );

