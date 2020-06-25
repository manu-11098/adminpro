/**
 * Requires
 */
var express             = require('express');
var User                = require('../models/user');
var bcrypt              = require('bcryptjs');
var authentification    = require('../middlewares/authentification');


/**
 * Init variables
 */
var app         = express();
var verify      = authentification.verify;

app.get('/', (req, res) => {
    User.find({}, 'id name email img role')
        .exec()
        .then( users => res.status(200).json( { ok: true, users } ) )
        .catch( errors => res.status(500).json({ ok: false, message: 'Error en la base de datos', errors }) );
});



/**
 * Add user
 */
app.post('/', verify, (req, res) => {
    var body = req.body;

    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    user.save()
        .then( newUser => res.status(200).json( { ok: true, newUser } ) )
        .catch( errors => res.status(400).json( { ok: false, message: 'Error al crear el usario', errors } ) );

});



/**
 * Update user
 */
app.put('/:id', verify, (req, res) => { 
    User.findById(req.params.id).exec()
        .then(user => {
            if ( user ) {
                user.name = req.body.name;
                user.email = req.body.email;
                user.role = req.body.role;
                return user.save();
            }
            return res.status(500).json( { ok: false, message: `El usuario con id: ${ req.params.id } no existe` } );
        })
        .then( updatedUser => { 
            updatedUser.password = '*'
            res.status(200).json( { ok: true, updatedUser } ) 
        } )
        .catch( errors => res.status(500).json( { ok: false, message: 'Error al actualizar el usuario', errors } ) );
});

/**
 * Delete user
 */
app.delete('/:id', verify, (req, res) => {
    User.findByIdAndRemove(req.params.id).exec()
        .then( deletedUser => { 
            if (deletedUser)
                return res.status(200).json({ ok: true, deletedUser })
            return res.status(400).json({ ok: false, message: `El usuario con id: ${req.params.id} no existe` });
        })
        .catch( errors => res.status(500).json({ ok: false,  message: 'Error interno al borrar usuario', errors }) );
});

module.exports = app;
