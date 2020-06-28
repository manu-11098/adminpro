/**
 * Requires
 */
var mongoose = require('mongoose');

/**
 * Types
 */
var Schema = mongoose.Schema;

/**
 * New schema
 */
var hospital_schema = new Schema({
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
        ref: 'User'
    }
}, 
{ 
    collection: 'Hospitals'
});


module.exports = mongoose.model('Hospital', hospital_schema);