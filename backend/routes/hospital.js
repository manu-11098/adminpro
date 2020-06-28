/**
 * Requires
 */
var express             = require('express');
var Hospital            = require('../models/hospital');
var authentification    = require('../middlewares/authentification');


/**
 * Init variables
 */
var app         = express();
var verify      = authentification.verify;

/**
 * Get all hospitals
 */
app.get('/', (req, res) => {
    let from = Number(req.query.from) || 0;
    Hospital.find({})
        .skip(from)
        .limit(5)
		.populate('user', 'name email')
        .exec()
        .then( hospitals => {
            Hospital.count({})
            .exec()
            .then( count => res.status(200).json( { ok: true, hospitals, count } ) ) 
        } )
        .catch( errors => res.status(500).json({ ok: false, message: 'Error en la base de datos', errors }) );
});


/**
 * Add hospital
 */
app.post('/', verify, (req, res) => {
    var hospital = new Hospital({
		name: req.body.name,
		user: req.user._id
    });

    hospital.save()
        .then( newHospital => res.status(200).json( { ok: true, newHospital } ) )
        .catch( errors => res.status(400).json( { ok: false, message: 'Error al crear hospital', errors } ) );
});

/**
 * Update hospital
 */
app.put('/:id', verify, (req, res) => { 
    Hospital.findById(req.params.id).exec()
        .then(hospital => {
            if ( hospital ) {
                hospital.name = req.body.name;
                hospital.user = req.user._id;
                return hospital.save();
            }
            return res.status(500).json( { ok: false, message: `El hospital con id: ${ req.params.id } no existe` } );
        })
        .then( updatedHospital => res.status(200).json( { ok: true, updatedHospital } ) )
        .catch( errors => res.status(500).json( { ok: false, message: 'Error al actualizar el hospital', errors } ) );
});

/**
 * Delete hospital
 */
app.delete('/:id', verify, (req, res) => {
    Hospital.findByIdAndRemove(req.params.id).exec()
        .then( deletedHospital => { 
            if (deletedHospital)
                return res.status(200).json({ ok: true, deletedHospital })
            return res.status(400).json({ ok: false, message: `El hospital con id: ${req.params.id} no existe` });
        })
        .catch( errors => res.status(500).json({ ok: false,  message: 'Error interno al borrar hospital', errors }) );
});


module.exports = app;