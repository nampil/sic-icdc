const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const subSchema = new Schema({
    endpoint: {
        type: String,
        required: true
    },
    expirationTime: {
        type: Number
    },
    p256dhKey: {
        type: String,
    },
    authKey: {
        type: String,
    },

});

module.exports = mongoose.model('Sub', subSchema);