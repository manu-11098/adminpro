/**
 * Requires
 */ 
var express     = require('express');
var mongoose    = require('mongoose');

/**
 * Init variables
 */ 
var app = express();


/**
 * Conection db
 */ 
mongoose.connection.openUri('mongodb://dev:dev@192.168.99.101:27017/hospitaldb', {useNewUrlParser: true}, (err, res) => {
    if ( err ) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

app.get('/', (request, response, next) => {
	response.status(200).json({ ok : true, message: 'Petición realizada correctamente'});
});

app.listen(3000, () => console.log('Express server running in port 3000: \x1b[32m%s\x1b[0m', 'online') );

