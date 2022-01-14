var jwt = require('jsonwebtoken');
var seed = require('../config/config').seed;

exports.verify = (req, res, next) => {
    jwt.verify(req.query.token, seed, (err, decoded) => {
        if (err)
            return res.status(401).json({
                ok: false,
                message: 'Incorrect token',
                errors: err
            });
        req.user = decoded.user;
        next();
    });
};

exports.verify_role = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE')
        next();
    else
        res.status(401).json({
            ok: false,
            message: 'Usuario con permisos insuficientes',
            errors: 'Usuario con permisos insuficientes'
        });
};
exports.verify_user_update = (req, res, next) => {

    let user = req.user;
    var id = req.params.id;

    if (user.id === id)
        next();
    else
        res.status(401).json({
            ok: false,
            message: 'Es distinto usuario',
            errors: 'Usuario con permisos insuficientes'
        });
};