/**
 * Requires
 */
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

/**
 * Variables
 */
var app = express();

// default options
app.use(fileUpload());


app.all('/:type/:id', (req, res) => {
	let id = req.params.id;
	let type = req.params.type;


	if (!['hospital', 'user', 'doctor'].includes(type.toLowerCase())) {
        return res.status(400).json({
            ok: false,
            message: 'No valid type.',
            errors: {
                message: 'Debe introducir un tipo válido'
            }
        });
	}
	

	if (!req.files) {
		return res.status(400).json({
			ok: false,
			message: 'No files were uploaded.',
			errors: {
				message: 'Seleccione una imagen'
			}
		});
	}

	let file = req.files.img;
	let extension = file.name.split('.').slice(-1) + "";

	if (!['png', 'jpg', 'gif', 'jpeg'].includes(extension.toLowerCase())) {
		return res.status(400).json({
			ok: false,
			message: 'La extensión no es valida.',
			errors: {
				message: 'Debe seleccionar una imagen válida'
			}
		});
	}

	// Rename file
	let fileName = `${ id }-${ new Date().getMilliseconds() }.${extension}`;
	let path = `./uploads/${type}/${ fileName }`;

	file.mv(path, function (err) {
		if (err)
			return res.status(500).json({
				ok: false,
				message: 'Error al mover el archivo.',
				errors: err
			});

		Promise.resolve(type)
			.then(type => {
				switch (type) {
					case "user":
						return User.findById(id).exec();
					case "doctor":
						return Doctor.findById(id).exec();
					case "hospital":
						return Hospital.findById(id).exec();
				}
			}).then(data => {
				let oldFile = data.img;
				if (fs.existsSync(oldFile)) 
					fs.unlinkSync( oldFile );
				data.img = path;
				return data.save();
			}).then(newData => {
				if (newData.password)
					newData.password = ';)';
				res.status(200).json({
					ok: true,
					message: `Imagen de ${type} actualizada`,
					[type]: newData
				});
			}).catch(err => {
				res.status(400).json({
					ok: false,
					message: `${type} not found`,
					errors: err
				});
			});
	});
});

module.exports = app;