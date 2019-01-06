const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    relatives: [{
        type: String
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Member', memberSchema);