var express = require('express');
var bcrypt 	= require('bcryptjs');
var User 	= require('../models/user');
var jwt 	= require('jsonwebtoken');
var seed 	= require('../config/config').seed;

/**
 * Variables
 */
var app = express();


// Routes
/**
 * Normal authentification
 */
app.post('/', (req, res) => {
	// res.status(200).json( { ok: true, message: 'Login post correcto', body: req.body } );
	var promise = User.findOne( { email: req.body.email }).exec();

	promise.then( user => { 
		if ( !user ) 
			return res.status(400).json( { ok: false, message: `Error with email: ${ req.body.email } not find`} );
		return user;
	})
	.then( user => {
		if (!bcrypt.compareSync(req.body.password, user.password)) 
			return res.status(400).json( { ok: false, message: `User with password: ${req.body.password} not match`} );
		user.password = '*';
		return user;
	})
	.then( user => {
		var token = jwt.sign( { user } , seed, { expiresIn: 14400 });
		return res.status(200).json({ ok: true, user, token } );
	})
	.catch( errors => res.status(500).json( { ok: false, message: 'Error al buscar usuarios', errors} ) );
});


module.exports = app;