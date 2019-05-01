const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,


    },
    tel: {
        type: String,
        default: ''
    },
    email: {
        type: String,
    },
    bdate: {
        type: Date,

    },
    gender: {
        type: String,

    },
    relatives: [{
        type: String
    }],
    serveIn: [{
        type: String
    }],

    how: {
        type: String
    },
    discipleship: {
        type: Boolean,
        default: false
    },
    baptized: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Member', memberSchema);