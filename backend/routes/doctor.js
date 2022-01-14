/**
 * Requires
 */
var express = require('express');
var Doctor = require('../models/doctor');
var DoctorController = require('../controllers/doctor.controller')
var authentification = require('../middlewares/authentification');
var verify = authentification.verify;

/**
 * Init variables
 */
var app = express();
var verify = authentification.verify;

/**
 * Get all doctors
 */
app.get('/', DoctorController.get);

/**
 * Get by id
 */
app.get('/:id', async (req, res) => {
    try {
        let doctor = await Doctor.findById(req.params.id)
            .populate('user', 'name email img')
            .populate('hospital')
            .exec();

        if (doctor)
            res.status(200).json({ ok: true, doctor });
        else
            res.status(401).json({ ok: false, message: `El doctor con id: ${req.params.id} no existe` });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar el doctor', error })
    }
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
        .then(newDoctor => res.status(200).json({ ok: true, newDoctor }))
        .catch(err => res.status(500).json({ ok: false, message: 'Error interno al crear el médico', errors: err }));
});

/**
 * Update a doctor
 */
app.put('/:id', verify, async (req, res) => {
    try {
        let doctor = await Doctor.findById(req.params.id).exec();
        if (doctor) {
            doctor.name = req.body.name;
            doctor.user = req.user._id;
            doctor.hospital = req.body.hospital;
            updatedDoctor = await doctor.save();
            res.status(200).json({ ok: true, updatedDoctor });
        } else
            res.status(401).json({ ok: false, message: `El doctor con id: ${req.params.id} no existe` });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar el doctor', error });
    }
});

/**
 * Delete doctor
 */
app.delete('/:id', verify, (req, res) => {
    Doctor.findByIdAndRemove(req.params.id).exec()
        .then(deletedDoctor => {
            if (deletedDoctor)
                res.status(200).json({ ok: true, deletedDoctor });
            else
                res.status(400).json({ ok: false, message: `El doctor con id: ${req.params.id} no existe` });
        })
        .catch(err => res.status(500).json({ ok: false, message: 'Error interno al borrar hospital', errors: err }));
});


module.exports = app;