/**
 * Requires
 */
var express     = require('express');
var Doctor      = require('../models/doctor');
var authentification    = require('../middlewares/authentification');
var verify      = authentification.verify;

/**
 * Init variables
 */
var app         = express();
var verify      = authentification.verify;

/**
 * Get all doctors
 */
app.get('/', (req, res) => {
    let from = Number(req.query.from) || 0;
    Doctor.find({})
        .skip(from)
        .limit(5)
        .populate('user', 'name email')
        .populate('hospital')
        .exec()
        .then( doctors => {
            Doctor.count({})
            .exec()
            .then( count =>  res.status(200).json( { ok: true, doctors, count } ) ) 
        })
        .catch( errors => res.status(500).json({ ok: false, message: 'Error en la base de datos', errors }) );
});



/**
 * Create a doctor
 */
app.post('/', verify, (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        user: req.user._id,
        hospital: req.body.hospital
    });
    doctor.save()
        .then(newDoctor => res.status(200).json({  ok: true, doctor: newDoctor }) )
        .catch( err => res.status(500).json({ ok: false, message: 'Error interno al crear el médico', errors: err }) );
});

/**
 * Update a doctor
 */
app.put('/:id', verify, (req, res) => {
    Doctor.findById(req.params.id)
        .exec()
        .then( doctor => {
            if (doctor) {
                doctor.name = req.body.name;
                doctor.user = req.user._id;
                doctor.hospital = req.body.hospital;
                return doctor.save();
            } 
            return res.status(400).json({ ok: false, message: `El médico con id: ${ req.params.id } no existe` });
        })
        .then( updatedDoctor =>  res.status(200).json({ ok: true, doctor: updatedDoctor }) )
        .catch( err => res.status(500).json({ ok: false, message: 'Error interno al actualizar el médico', errors: err.message }) );
});

/**
 * Delete doctor
 */
app.delete('/:id', verify, (req, res) => {
    Doctor.findByIdAndRemove(req.params.id).exec()
        .then( deletedDoctor => {
            if (deletedDoctor)
                return res.status(200).json({ ok: true, doctor: deletedDoctor });
            return res.status(400).json({ ok: false, message: `El doctor con id: ${ req.params.id } no existe` });
		})
		.catch( err => res.status(500).json({ ok: false,  message: 'Error interno al borrar hospital', errors: err }) );
});


module.exports = app;