/**
 * Requires
 */
var express             = require('express');
var User                = require('../models/user');
var Doctor              = require('../models/doctor');
var Hospital            = require('../models/hospital');

/**
 * Variables
 */
var app = express();

/**
 * Search into specific collection
 */
app.get('/all/:value', (req, res) => {
	const value = req.params.value;
    const userPromise     = User.find( {}, 'name email role' )
                                .or([{ name: { $regex: value, $options: 'i' } }, { email: { $regex: value, $options: 'i' } } ] )
                                .exec();
    const doctorPromise   = Doctor.find( { name: { $regex: value, $options: 'i' } } )
								  .populate('user', 'name email role')
								  .populate('hospital')
								  .exec();
    const hospitalPromise = Hospital.find( { name: { $regex: value, $options: 'i' } } )
                                	.populate('user', 'name email role')
                                	.exec();

	Promise.all([userPromise, doctorPromise, hospitalPromise])
	       .then( data => res.status(200).json({ ok: true,  users: data[0], doctors: data[1], hospitals: data[2] }) )
		   .catch( err => res.status(500).json({ ok: false, message: 'Error en la base de datos', errors: err }) );									
	
});

/**
 * Search into specific collection
 */
app.get('/collections/:collection/:value', (req, res) => {
    const value = req.params.value;
    const collection = req.params.collection;

    let promise;

    switch(collection) {
        case 'users':   promise = User.find({}, 'name email role')
                            .or([{ name: { $regex: value, $options: 'i' }}, { email: { $regex: value, $options: 'i' }}])
                            .exec();
                        break;
        case 'doctors': promise = Doctor
                            .find( { name: { $regex: value, $options: 'i' }})
                            .populate('user', 'name email role')
                            .populate('hospital')
                            .exec();
                        break;
        case 'hospitals': promise = Hospital
                            .find( { name: { $regex: value, $options: 'i' }})
                            .populate('user', 'name email role')
                            .exec();
                        break;
        default: 
            return res.status(400).json({ ok: false, message: 'Unknow collection', errors: 'Unknow collection' } );

        
    }

    promise
        .then( data => res.status(200).json({ ok: true,  [collection]: data }) )
        .catch( err => res.status(500).json({ ok: false, message: 'Error en la base de datos', errors: err }) );

});


module.exports = app;