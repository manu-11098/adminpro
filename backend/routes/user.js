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

/**
 * Get all users
 */
app.get('/', (req, res) => {
    let from = Number(req.query.from) || 0;
    User.find({}, 'name email img role')
        .skip(from)
        .limit(5)
        .exec()
        .then( users => { 
            User.count({})
                .exec()
                .then( count => res.status(200).json( { ok: true, users, count } ) ) 
        } )
        .catch( errors => res.status(500).json({ ok: false, message: 'Error en la base de datos', errors }) );
});

/**
 * Add user
 */
app.post('/', verify, (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        img: req.body.img,
        role: req.body.role
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
            return res.status(200).json( { ok: true, updatedUser } ) 
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
