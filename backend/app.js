/**
 * Requires
 */ 
var express     = require('express');
var cors        = require('cors');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');

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
var appRoutes       = require('./routes/app');
var userRoutes      = require('./routes/user');
var doctorRoutes    = require('./routes/doctor');
var hospitalRoutes  = require('./routes/hospital');
var loginRoutes     = require('./routes/login');
var searchRoutes    = require('./routes/search');
var uploadRoutes    = require('./routes/upload');
var imageRoutes     = require('./routes/images');

app.use('/images', imageRoutes);
app.use('/upload', uploadRoutes);
app.use('/search', searchRoutes);
app.use('/login', loginRoutes);
app.use('/doctor', doctorRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);


/**
 * Conection db
 */ 
mongoose.connection.openUri('mongodb://dev:dev@192.168.99.101:27017/hospitaldb', {useNewUrlParser: true}, (err, res) => {
    if ( err ) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});


// Server index config
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));

app.listen(3000, () => console.log('Express server running in port 3000: \x1b[32m%s\x1b[0m', 'online') );

