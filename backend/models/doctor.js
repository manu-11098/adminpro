/**
 * Requires
 */
var mongoose = require('mongoose');

/**
 * Types
 */
var Schema = mongoose.Schema;

var doctor_schema = new Schema({
    name: {
        type: String, 
        required: [true, 'El nombre es necesario']
    }, 
    img: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [ true, 'El hospital es un campo obligatorio']
    }
}, 
{ collection: 'Doctors'});

module.exports = mongoose.model('Doctor', doctor_schema);


