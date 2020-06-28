var jwt 	            = require('jsonwebtoken');
var seed 	            = require('../config/config').seed;

exports.verify = ( req, res, next ) => {
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