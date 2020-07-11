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
var verify_role = authentification.verify_role;
var verify_user_update = authentification.verify_user_update

/**
 * Get all users
 */
app.get('/', (req, res) => {
    let from = Number(req.query.from) || 0;
    User.find({}, 'name email img role google')
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
app.post('/', (req, res) => {
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
app.put('/:id', [verify, verify_user_update], async (req, res) => { 

    try {
        let user = await User.findById(req.params.id).exec();
        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.role = req.body.role;
            user = await user.save();
            res.status(200).json({ ok: true, user });
        } else 
            res.status(401).json( { ok: false, message: `El user con id: ${ req.params.id } no existe` } );
    } catch ( error ){
        res.status(500).json( { ok: false, message: 'Error al actualizar el user', error } );
    }

});

/**
 * Delete user
 */
app.delete('/:id', [verify, verify_role], (req, res) => {
    User.findByIdAndRemove(req.params.id).exec()
        .then( deletedUser => { 
            if (deletedUser)
                res.status(200).json({ ok: true, deletedUser });
            else
                res.status(400).json({ ok: false, message: `El usuario con id: ${req.params.id} no existe` });
        })
        .catch( errors => res.status(500).json({ ok: false,  message: 'Error interno al borrar usuario', errors }) );
});

module.exports = app;
