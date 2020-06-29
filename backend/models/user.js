/**
 * Requires
 */
var mongoose        = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/**
 * Types
 */
var Schema = mongoose.Schema;

/**
 * Object for allow values
 */
var validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
};

/**
 * New schema
 */
var user_schema = new Schema(
    {
        name: { 
            type: String, 
            required: [true, 'El nombre es necesario'] 
        },
        email: { 
            type: String, 
            unique: true, 
            required: [true, 'El email es requerido']
        },
        password: {
            type: String,
            required: [true, 'El password es necesario']
        },
        img: { 
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true,
            default: 'USER_ROLE',
            enum: validRoles
        },
        google: {
            type: Boolean,
            default: false
        }
    },
    { 
        collection: 'Users'
    });

/**
 * Pluggin to show more information about unique fields rules
 */
user_schema.plugin(uniqueValidator, { message: '{PATH} debe ser único' } );

module.exports = mongoose.model('User', user_schema);